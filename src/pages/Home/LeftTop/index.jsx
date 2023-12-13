import React, { useState, useEffect } from 'react';
import { Select, Statistic } from 'antd';
import api from '@/api/index';
import './index.scss';

function LeftTop({date}) {
	// 总碳排放量
	let [carbon, setCarbon] = useState(0);
	let [carbonTrend, setCarbonTrend] = useState('');
	let [carbonUnit, setCarbonUnit] = useState('');
	// 新能源产电量
	let [electricit, setElectricit] = useState(0);
	let [electricitTrend, setElectricitTrend] = useState('');
	let [electricitUnit, setElectricitUnit] = useState('');

	useEffect(() => {
		if (date) {
			getCarbonByDay(date);
			getElectricityByDay(date);
		}
    }, [date])

	const getCarbonByDay = async function(date) {
		await api.GetCarbonByDay(date).then(res=>{
			setCarbon(res.today);
			setCarbonTrend(res.trend);
			setCarbonUnit(res.unit);
		})
	}

	const getElectricityByDay = async function(date) {
		await api.GetElectricityByDay(date).then(res=>{
			setElectricit(res.today);
			setElectricitTrend(res.trend);
			setElectricitUnit(res.unit);
		})
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
		
	};

    return (
		<div className='left-top d-flex flex-column h-100'>
			<div className='left-top-top'>
				<Select
					className='kinko-selection-white '
					defaultValue="lucy"
					style={{ width: 120 }}
					onChange={handleChange}
					options={[
						{ value: 'jack', label: 'Jack' },
						{ value: 'lucy', label: 'Lucy' },
						{ value: 'Yiminghe', label: 'yiminghe' },
						{ value: 'disabled', label: 'Disabled', disabled: true },
					]}
					/>
			</div>
			<div className='left-top-center'>碳排放预测</div>
			<div className='left-top-bottom d-flex flex-1'>
				<div className='left-top-bottom-con d-flex flex-column border'>
					<div className='flex-1'>总碳排放量（日累积）</div>
					<div className='flex-1'>
						<Statistic value={carbon} valueStyle={{color: '#fff'}} suffix={carbonUnit}/>
					</div>
					<div className={carbonTrend.indexOf('+') > -1 || carbonTrend === '0%' ? 'descend flex-1' : 'rise flex-1'}>较昨天 +97.9%</div>
				</div>
				<div className='left-top-bottom-con d-flex flex-column border'>
					<div className='flex-1'>新能源产电量（天）</div>
					<div className='flex-1'>
						<Statistic value={electricit} valueStyle={{color: '#fff'}} suffix={electricitUnit}/>
					</div>
					<div className={electricitTrend.indexOf('-') > -1 || carbonTrend === '0%' ? 'descend flex-1' : 'rise flex-1'}>较昨天 +97.9%</div>
				</div>
			</div>
		</div>
	)
}

export default LeftTop;