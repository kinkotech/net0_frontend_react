import { useState, useEffect, useRef } from 'react';
import api from '@/api/index';
import SelectNode from '@/components/SelectNode';
import { Select } from 'antd';
import './index.scss';

type Props = {
	node?: any;
	date?: string;
}

function RightTop(props: Props) {
	let {node, date} = props;

	let [list, setList] = useState([]);
	let [carbonUnit, setCarbonUnit] = useState('');
	// 能耗单位
	let [unit, setUnit] = useState('kWh');
	let [unitList] = useState([
		{ value: 'kWh', label: 'kWh' },
		{ value: 'MWh', label: 'MWh' }
	]);
	let [listHeight, setListHeight] = useState(0);

	const contentEl = useRef<HTMLInputElement>(null);
	const headerEl = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(date) {
			getServerByDay(date, node.id, unit);
			getHeight()
		}
	}, [date, node, unit])

	const getServerByDay = async function(date: string, server_id: string, unit: string) {
		let params = {
			server_id,
			day_str: date,
			unit
		}
		await api.GetServerByDay(params).then((res: any)=>{
			setCarbonUnit(res.carbon_unit)
			setList(() => res.data)
		})
	}

	const back = function () { }

	// 能耗单位切换
	const changeUnit = function(value: string) {
		setUnit(value)
	}

	// 计算滚动条高度
	const getHeight = function() {
		let contentH: any = contentEl.current?.offsetHeight;
		let headerH: any = headerEl.current?.offsetHeight;
		let h = contentH - headerH;
		setListHeight(h)
	}


	return (
		<div className="right-top h-100">
			<div className="con h-100">
				<div className="title fw-600">节点列表（日累积）</div>
				<div className="top">
					<div className="cursor" onClick={back}>
						{
							node.nodeText !== '电试院' &&
							<span className="arrar">&lt;</span>
						}
						<span className="text1">选中节点：</span>
					</div>
					<SelectNode nodeName={node.nodeText || '电试院'} level={node.level || 1}/>
				</div>
				<div className="bottom w-100" ref={contentEl}>
					<div className="header" ref={headerEl}>
						<span className="name">节点名称</span>
						<div className="header-carbon">
							<span>碳排放</span>
							<span>{ carbonUnit }</span>
						</div>
						<div className="header-unit electricity">
							<span>能耗</span>
							<Select
								className='kinko-selection'
								defaultValue={unit}
								style={{ width: 90,marginLeft: '.05rem' }}
								onChange={changeUnit}
								options={unitList}
								/>
						</div>
					</div>
					<ul className="ul-list w-100" style={{height: listHeight}}>
						{
							list.map((item: any, i) => {
								return (
									<li key={i}>
										<div className="left">
											<span className="circle"></span>
											<span className="text">{ item.name }</span>
										</div>
										<div className="middle">
											<div>{ item.carbon_value }</div>
											<div className={item.carbon_percent.indexOf('-') ? 'rise' : 'descend'}>{ item.percent }</div>
										</div>
										<div className="right">
											<div>{ item.value }</div>
											<div className={item.percent.indexOf('-') ? 'rise' : 'descend'}>{ item.percent }</div>
										</div>
									</li>
								)
							})
						
							
						}
					</ul>
				</div>
			</div>
		</div >
	)
}

export default RightTop;