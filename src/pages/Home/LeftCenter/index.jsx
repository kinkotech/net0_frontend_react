import React, { useState, useEffect } from 'react';
import { Select, Statistic } from 'antd';
import KikoProgress from '@/components/KikoProgress';
import api from '@/api/index';


function LeftCenter() {
	let [date, setDate] = useState('2023-12-04');
	let [list, setList] = useState([]);
	let [allValue, setAllValue] = useState(0);
	
	useEffect(() => {
		getParkByDay(date)
    }, [date])

	const getParkByDay = async function(date) {
		let params = {
			day_str: date,
			unit: ''
		}
		await api.GetParkByDay(params).then(res=>{
			console.log(res)
			setAllValue(res.total)
			setList(() => res.building_info)
			
		})
	}

    return (
		<div className='left-center'>
			<div>园区汇总（天）</div>
			<div>
				<Statistic value={allValue} valueStyle={{color: '#fff'}}/>
			</div>
			<div className='left-center-list'>
				<div>
					9号楼
				</div>
				<div>
					{
						list.map((el, i) => {
							return (
								<KikoProgress name={el.name} percent={el.percent} value={el.value} color={el.color} key={el.name}/>
							)
						})
					}
				</div>
				<div>
					<Statistic value={112893} valueStyle={{color: '#fff'}}/>
				</div>
			</div>
		</div>
	)
}

export default LeftCenter;