import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import api from '@/api/index';



function CenterBottom() {
	let [date, setDate] = useState('2023-12-04');
	
	useEffect(() => {
		getPredict(date)
    }, [date])

	const getPredict = async function(date) {
		let params = {
			day_str: date,
			type: 24,
			dataType: 'usage',
			park_id: 1,
			unit: ''
		}
		await api.GetPredict(params).then(res=>{
			console.log(res)
			
		})
	}


    return (
		<div>12312</div>
	)
}

export default CenterBottom;