import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import api from '@/api/index';
import './index.scss';

function LeftBottom({date}) {

	function init(total, unit, list) {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('leftBottomMain'));
		// 绘制图表
		myChart.setOption({
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
				formatter: function(name) {	// 添加
					let value; 
					for (let i = 0; i < list.length; i++) {
						if (list[i]['name'] === name) {
							value = list[i]['value'];
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
							height: 20,
							color: '#fff'
						},
						b: {
							fontSize: 12,
							width: 35,
							height: 20,
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
					label: {
						normal: {
							show: true,
							fontWeight:'bolder',
							position: 'center',
							color: '#fff',
							formatter: JSON.stringify(total),
							textStyle: {
								fontSize: 22,
								color: '#fff',
							},
						},
						emphasis: {//中间文字显示
							show: true,
						}
					},
					labelLine: {
						normal: {
							length: 3
						}
					},
					data: list
				}
			]
		});
	}

	async function getEnergyTypeByDay (date) {
		await api.GetEnergyTypeByDay(date).then(res=>{
			let arr = [];
			res.key.forEach((item, i) => {
				arr.push({
					name: item,
					value: res.value[i]
				})
			})
			init(res.total, res.unit, arr);
		})
	}

	useEffect(() => {
		if (date) {
			getEnergyTypeByDay(date)
		}
		
    },[date])

    return (
		<div className='left-bottom h-100 d-flex flex-column'>
			<div className='left-bottom-title'>园区碳排放源类型占比（天）</div>
			<div className='flex-1' id='leftBottomMain' style={{width: '100%',height: '100%'}}></div>
		</div>
	)
}

export default LeftBottom;