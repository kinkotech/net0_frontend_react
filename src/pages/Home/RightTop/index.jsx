import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import './index.scss';


function RightTop({nodeText, date}) {
	let [serverId, setServerId] = useState();
	let [list, setList] = useState([]);
	let [carbonUnit, setCarbonUnit] = useState('');

	useEffect(() => {
		if(date) {
			getServerByDay(date, serverId)
		}
	}, [date, serverId])

	const getServerByDay = async function(date, server_id) {
		let params = {
			server_id,
			day_str: date,
			unit: carbonUnit
		}
		await api.GetServerByDay(params).then(res=>{
			setList(() => res.data)
		})
	}

	const back = function () { }


	return (
		<div className="right-top h-100">
			<div className="con h-100">
				<div className="title fw-600">节点列表（日累积）</div>
				<div className="top">
					<div className="cursor" onClick={back}>
						{
							nodeText != '电试院' &&
							<span className="arrar">&lt;</span>
						}
						<span className="text1">选中节点：</span>
					</div>
					{/* <SelectNode :nodeName="nodeText" :level="level"/> */}
				</div>
				<div className="bottom w-100">
					<div className="header">
						<span className="name">节点名称</span>
						<div className="header-carbon">
							<span>碳排放</span>
							<span>{ carbonUnit }</span>
						</div>
						<div className="header-unit electricity">
							<span>能耗</span>
							{/* <a-select
                            v-model="unit"
                            style="width: 1.3rem;margin-left: .1rem;"
                            @change="changeUnit"
                            className="kinko-selection"
                            >
                            <a-select-option :value="item" v-for="item in unitList" :key="item">{{ item }}</a-select-option>
                        </a-select> */}
						</div>
					</div>
					<ul className="ul-list w-100">
						{
							list.map((item, i) => {
								return (
									<li key={i}>
										<div className="left">
											<span className="circle"></span>
											<span className="text">{ item.name }</span>
										</div>
										<div className="middle">
											<div>{ item.carbon_value }</div>
											{/* <div :className="item.carbon_percent.indexOf('-') ? 'rise' : 'descend'">{{ item.percent }}</div> */}
										</div>
										<div className="right">
											<div>{ item.value }</div>
											{/* <div :className="item.percent.indexOf('-') ? 'rise' : 'descend'">{{ item.percent }}</div> */}
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