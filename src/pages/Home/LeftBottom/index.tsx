import { useState, useEffect } from 'react';
import api from '@/api/index';
import Echarts from '@/components/Echarts';
import './index.scss';

type Props = {
    date?: string;
}

function LeftBottom(props: Props) {
	let {date} = props;

	let [option, setOption] = useState({});

	useEffect(() => {
		// if (date) {
			getEnergyTypeByDay(date || '2023-12-01')
		// }
		
    },[date])

	function init(total: number, unit: string, list: any[]) {
		// 绘制图表
		setOption({
			title: [
				{
					subtext: unit,
					subtextStyle: {
						color: '#fff',
						fontSize: 14,
					},
					left: '21%',
					top: '55%',
					itemGap: 0 //主副标题之间的间距
				}
			],
			graphic: {
				type: 'text',
				left: '23.5%',
				top: "38%",
				style: {
					text: '总排碳',
					textAlign: 'center',
					fill: '#fff',
					fontSize: 14,
					fontWeight: 500
				}
			},
			color: ['#C8A1FF', '#D81B60', '#DC6803', '#2276FC', '#3E4784', '#0086C9', '#6938EF', '#DD2590', '#E31B54', '#77D0BB', '#C5DB6C'],
			tooltip: {
				trigger: 'item'
			},
			legend: {
				itemWidth: 9,
				itemHeight: 9,
				orient: 'vertical',
				left: '55%',
				y: 'center',
				icon: 'circle',
				formatter: function(name: string) {	// 添加
					let value; 
					for (let i = 0; i < list!.length; i++) {
						if (list![i]['name'] === name) {
							value = list![i]['value'];
						}
					}
					var arr = [
					'{a|' + name + '}',
					'{b|' + value + '%}'
					]
					return arr.join('  ')
				},
				textStyle: {	// 添加
					rich: {
						a: {
							fontSize: 12,
							width: 30,
							height:90,
							color: '#fff'
						},
						b: {
							fontSize: 12,
							width: 35,
							height: 25,
							color: '#fff'
						},
					}
				}
			},
			series: [
				{
					type: 'pie',
					radius: ['40%', '50%'],
					center: ['28%', '50%'],
					//中间文字显示
					label: {
						show: true,
						fontWeight:'bolder',
						position: 'center',
						color: '#fff',
						formatter: JSON.stringify(total),
						fontSize: 22,
					},
					labelLine: {
						length: 3
					},
					data: list
				}
			]
		});
	}

	async function getEnergyTypeByDay (date: any) {
		await api.GetEnergyTypeByDay(date).then((res: any)=>{
			let arr: any[] = [];
			res.key.forEach((item: any, i: number) => {
				arr.push({
					name: item,
					value: res.value[i]
				})
			})
			init(res.total, res.unit, arr);
		})
	}
	
    return (
		<div className='left-bottom h-100 d-flex flex-column'>
			<div className='left-bottom-title'>园区碳排放源类型占比（天）</div>
			<div className='flex-1'>
				<Echarts id='leftBottomMain' option={option}/>
			</div>
		</div>
	)
}

export default LeftBottom;