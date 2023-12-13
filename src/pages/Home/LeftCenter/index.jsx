import React, { useState, useEffect, useRef } from 'react';
import { Select, Statistic } from 'antd';
import KikoProgress from '@/components/KikoProgress';
import api from '@/api/index';
import './index.scss';


function LeftCenter({date}) {
	let [list, setList] = useState([]);
	let [allValue, setAllValue] = useState(0);
	let [listHeight, setListHeight] = useState(0);

	const contentEl = useRef(null);
	const topEl = useRef(null);
	
	useEffect(() => {
		if (date) {
			getParkByDay(date);
			getHeight();
		}
    }, [date])

	const getHeight = function() {
		let contentH = contentEl.current.offsetHeight;
		let topH = topEl.current.offsetHeight;
		let h = contentH - topH - 90;
		setListHeight(h)
	}

	const getParkByDay = async function(date) {
		let params = {
			day_str: date,
			unit: ''
		}
		await api.GetParkByDay(params).then(res=>{
			setAllValue(res.total)
			setList(() => res.building_info)
		})
	}

    return (
		<div className='left-center h-100' ref={contentEl}>
			<div ref={topEl}>园区汇总（天）</div>
			<div>
				<Statistic value={allValue} valueStyle={{color: '#fff'}}/>
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