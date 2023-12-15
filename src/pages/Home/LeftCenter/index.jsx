import React, { useState, useEffect, useRef } from 'react';
import { Select, Statistic } from 'antd';
import KikoProgress from '@/components/KikoProgress';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import './index.scss';


function LeftCenter({date}) {
	let [list, setList] = useState([]);
	let [allValue, setAllValue] = useState(0);
	let [listHeight, setListHeight] = useState(0);
	let [selectUnit] = useState('碳排放(kgCO₂e)'); // 下拉框数据
	let [unit, setUnit] = useState('kgCO₂e');
	// select list
	let [selectList] = useState(
		[
			{ value: 'kWh', label: '能源(kWh)' },
			{ value: 'MWh', label: '能源(MWh)' },
			{ value: 'tCO₂e', label: '碳排放(tCO₂e)' },
			{ value: 'kgCO₂e', label: '碳排放(kgCO₂e)' }
		]
	);
	let [sortText, setSortText] = useState('正序');

	const contentEl = useRef(null);
	const topEl = useRef(null);
	
	useEffect(() => {
		if (date) {
			getParkByDay(date);
			getHeight();
		}
    }, [date, unit])

	// 获取内容高度
	const getHeight = function() {
		let contentH = contentEl.current.offsetHeight;
		let topH = topEl.current.offsetHeight;
		let h = contentH - topH - 60;
		setListHeight(h)
	}
	// 获取列表内容
	const getParkByDay = async function(date) {
		let params = {
			day_str: date,
			unit
		}
		await api.GetParkByDay(params).then(res=>{
			let arr = res.building_info;
			arr.sort(sortAscending('value'));
			setAllValue(res.total);
			setList(arr);
		})
	}

	// 切换单位
	const changeSelectList = function(value) {
		setUnit(value)
	}

	// 根据传过来的字段进行排序 正序
	const sortAscending = function(key) {
		return (x, y) => {
			return y[key] - x[key]
		}
	}

	// 根据传过来的字段进行排序 倒序
	const sortDescending = function(key) {
		return (x, y) => {
			return x[key] - y[key]
		}
	}

	// 排序
	const sort = function() {
		let str = '';
		let arr = list;
		if (sortText === '正序') {
			str = '倒序';
			arr.sort(sortDescending('value'))
		} else {
			str = '正序';
			arr.sort(sortAscending('value'))
		}
		setSortText(str);
		setList(arr);
	}

    return (
		<div className='left-center h-100' ref={contentEl}>
			<div className="top d-flex" ref={topEl}>
				<ConTitle title="园区汇总（天）" fontSize=".18rem" showPopver={true} popverContent="园区汇总总值由列表中各建筑物能耗数据或碳排放数据加和获得。"/>
				<div className="right">
					<div className="sort d-flex" onClick={sort}>
						<span className="s1">{ sortText }</span>
						<div className="sort-icon">
							<iconpark-icon size="100%" color="#999" name={sortText === '正序' ? 'SortDescending' : 'SortAscending'}></iconpark-icon>
						</div>
					</div>
					<Select
						className='kinko-selection'
						defaultValue={selectUnit}
						style={{ width: 140}}
						onChange={changeSelectList}
						options={selectList}
						/>
				</div>
			</div>
			<div>
				<Statistic value={allValue} valueStyle={{color: '#fff'}} suffix={unit}/>
			</div>
			<div className='left-center-list' style={{height: listHeight}}>
				{
					list.map((el, i) => {
						return (
							<KikoProgress name={el.name} percent={el.percent} value={el.value} color={el.color} key={el.name}/>
						)
					})
				}
			</div>
		</div>
	)
}

export default LeftCenter;