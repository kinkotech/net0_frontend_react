import { useState, useEffect } from 'react';
import api from '@/api/index';
import Echarts from '@/components/Echarts';

function RightBottom(props: {date?: string}) {
	let {date} = props;

	let [option, setOption] = useState({});
	let [server_id] = useState();

	async function getEquipmentByDay (server_id?: string, date?: string) {
		await api.GetEquipmentByDay(server_id, date).then((res: any)=>{
			let arr = res;
			let xAxis: any[] = [];

			arr.forEach((el: any) => {
				xAxis.push(el.name);
			});

			setOption({
				title: {
					text: '节点包含设备数量',
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					top: '13%',
					bottom: '3%',
					containLabel: true
				},
				yAxis: {
					type: 'value',
					name: '数量',
					nameTextStyle: {
						fontSize: 12,
					},
					boundaryGap: [0, 0.01],
					position: 'right',
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255, 255, 255, .12)'
						}
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false
					},
				},
				xAxis: {
					type: 'category',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: 'rgba(255, 255, 255, .87)',
						interval: 0,
						fontSize: 12
					},
					data: xAxis
				},
				series: [
					{
						name: '数量',
						type: 'bar',
						barWidth:'45%',
						itemStyle:{
							color:function(){
								return '#2276FC'
							}
						},
						data: arr
					}
				]
			});
			
		})
	}

	useEffect(() => {
		if (date) {
			getEquipmentByDay(server_id, date)
		}
    },[server_id, date])


    return (
		<Echarts id='rightBottomMain' option={option}/>
	)
}

export default RightBottom;