import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import api from '@/api/index';


function CenterBottom() {
	let [selectValue, setSelectValue] = useState('24小时');
	let [selectDate, setSelectDate] = useState('2023-12-01');
	let [server_id, setServer_id] = useState('');
	let [dataType, setDataType] = useState('carbon');
	let [unit, setUnit] = useState('');
	let [carbonUnit, setCarbonUnit] = useState('');
	let [chartData, setChartData] = useState({
		line1: [],
		line2: [],
		date: []
	})
	let [maxValue, setMaxValue] = useState('');
	let [option, setOption] = useState({})
	let [date1, setDate1] = useState([]);
	let [date2, setDate2] = useState([]);

	// 未来预测
	async function getPredict() {

		let type = selectValue.replace('天', '');
		let date = selectDate.replaceAll('/', '-');
		let params = {}
		if (server_id) {
			params = {
				day_str: date,
				type: type==1 ? 24 : type,
				dataType: dataType,
				server_id: server_id,
				park_id: 1,
				unit: dataType == 'usage' ? unit : carbonUnit
			}
		} else {
			params = {
				day_str: date,
				type: type==1 ? 24 : type,
				dataType: dataType,
				park_id: 1,
				unit: dataType == 'usage' ? unit : carbonUnit
			}
		}
		await api.GetPredict(params).then(res=>{

			let data = res;
			data.forEach(el => {
				if(el.name == '预测值') {
					setChartData({
						...chartData,
						line1: el.value
					})
				} else {
					setChartData({
						...chartData,
						line2: el.value
					})
				}
			})
			
		})
	}

	// 获取折线图
	function getOption() {
		let _this = this;
		if(selectValue != '24小时') {
			// setChartData({
			// 	...chartData,
			// 	date: [...new Set([...date1, ...date2])]
			// })
		} else {
			// setChartData({
			// 	...chartData,
			// 	date: [...date1, ...date2]
			// })
		}

		// let allData = [...chartData.line1, ...chartData.line2]
		// setMaxValue(Math.max.apply(null,allData))

		setOption({
			tooltip: {
				trigger: 'axis',
				// formatter: function (params) { // params 为一个数组，数组的每个元素 包含了 该折线图的点 所有的参数信息，比如 value(数值)、seriesName（系列名）、dataIndex（数据项的序号）
				// 	let dateIndex = 0; // 当前指示点的 日期序号
					
				// 	let tipList = params.map((seg) => {
				// 		let { value, seriesName, dataIndex, color } = seg;
				// 		if (seriesName == 'name3' || seriesName == 'name4') return
				// 		dateIndex = dataIndex;
				// 		return `${_this.getTipDot({ color })}${seriesName}：${value}`
				// 	})

				// 	tipList.unshift(`${_this.chartData.date[dateIndex]}`)
				// 	return tipList.join('<br/>')
				// }
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '3%',
				top: '3%',
				bottom: '15%',
				containLabel: true
			},
			xAxis: [{
				nameTextStyle: {
					fontSize: 12,
					padding: [30, 0, 0, 30]    // 四个数字分别为上右下左与原位置距离
				},
				type: 'category',
				// 设置 x 轴的数据, 使用 日期 在数据中的 序列号 来表示 横坐标数值。
				// data: chartData.date.map((seg, index) => {
				// 	return index
				// }),
				data: [],
				splitLine: {
					show:false
				},
				axisLine: {
					show: false,
					lineStyle: {
						color:'rgba(255, 255, 255, .87)'
					}
				},
				// 设置 x 轴的 展示标签， 使其根据 当前标签的序列号转换为 日期
				axisLabel: {
					// formatter: function (params) {
					// 	return chartData.date[params]
					// },
					color: 'rgba(255, 255, 255, .87)',
					fontSize: 12,
					interval: 0,
				},
				boundaryGap: false, // 两边的留白
			},
			{
				type: 'value',
				splitLine:{
					show: false
				},
				min: 0,
				// max: chartData.date.length-1,
				max: 10,
				boundaryGap: false, // 两边的留白
				axisPointer: { // tooltip不显示
					type: 'none'
				},
				show: false // 第二个x轴不显示
			}],
			yAxis: {
				type: 'value',
				position: 'right',
				opacity: 1,
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
				axisLabel: {
					color: 'rgba(255, 255, 255, .87)',
					interval: 0,
					fontSize: 12
				},
			},
			series: [
				// 第一条线
				{
					z: -1,
					name: "预测值",
					type: "line",
					smooth: false,
					showSymbol: false,
					data: [],
					areaStyle: {
						color: '#F04438',
						opacity: .4,
						origin: 'end',
					},
					itemStyle: {
						normal: {
							color: 'rgba(240,68,56,.6)',
							lineStyle: {
								color: "#36BFFA",
								type: 'dashed',
								width: 2
							},
						},
					},
				},
				// 第二条线
				{
					z: -1, // 使yAxis的splitLines显示在顶部
					name: "实际值",
					type: "line",
					smooth: false,
					showSymbol: false,
					data: [],
					areaStyle: {
						color: '#32D583',
						opacity: .4,
						origin: 'end',
					},
					itemStyle: {
						normal: {
							color: 'rgba(50,213,131,.6)',
							lineStyle: {
								color: "#36BFFA",
								width: 2
							},
						},
					},
				},
				{
					type:'line',
					smooth: false,
					markLine: {
						symbol: 'none',
						data: [[
							{coord:[(date1.length-1).toString(), 0]},
							{coord:[(date1.length-1).toString(), maxValue]}
						]],
						itemStyle: {
							normal: {
								lineStyle: {
									width: 1,
									color: '#DFDFDD',
								}
							}
						},
					}
				}
			]
		})
		// 计算虚线多出来的部分，前面用-占位
		// let lineData4 = [];
		// lineData4 = chartData.line1.slice(chartData.line2.length-1)
		// for (let i=0; i < this.chartData.line2.length-1; i++ ) {
		// 	lineData4.unshift('-')
		// }

		// this.option.series[0].data = chartData.line1; // 预测值
		// this.option.series[1].data = chartData.line2; // 实际值
		// // 计算两个数据的最大值，组成二维数据
		// let line3Data = [];
		// chartData.line1.forEach((item, i) => {
		// 	if (item - chartData.line2[i] >= 0) {
		// 		line3Data.push([i, item])
		// 	} else {
		// 		line3Data.push([i, chartData.line2[i]])
		// 	}
		// })

		let line3Data = []

		// 计算交点
		let scatterData = getIntersectionPoint({
			line1: chartData.line1,
			line2: chartData.line2,
			date: chartData.date
		})
		// 把交点添加到第三条线之间，形成另一条x轴的线
		scatterData.forEach((el, index) => {
			line3Data.forEach((item, i) => {
				if(parseInt(el[0]) == item[0]) {
					line3Data.splice(i+1, 0, el)
				}
			})
		})

		// 占位处理
		line3Data.forEach((item, i) => {
			if(!item[1]) {
				item[1] = 0;
			}
		})

		// 使用areaStyle和背景一样的颜色，盖住重叠颜色问题
		option.series.push({
			z:-1, // 使yAxis的splitLines显示在顶部 重要部分!!!
			name: 'name3',
			type: 'line',
			smooth: false,
			symbol: "none", // 去掉折线上面的小圆点
			data: line3Data,
			xAxisIndex: 1,
			itemStyle: {
				normal: {
					lineStyle: {
						color: "#36BFFA",
						type: 'dashed', // 设置为虚线
						width: .88
					},
				},
			},
			areaStyle: {
				color: '#1e1e1e',
				opacity: 1,
				origin: 'end', // 填充折线外的区域
			},
		})

		option.series.push({
			z: -1,
			name: 'name4',
			type: 'line',
			smooth: false,
			showSymbol: false,
			data: [],
			itemStyle: {
				normal: {
					lineStyle: {
						color: "#36BFFA",
						type: 'dashed', // 设置为虚线
						width: .1
					},
				},
			},
			areaStyle: {
				color: '#1e1e1e',
				opacity: 1,
				origin: 'end', // 填充折线外的区域
			},
		})

	}

	// 计算两个线段交点，通过传入 两条线段、四个端点 的 横纵坐标 值，来计算两者交点的坐标
	function segmentsIntr({ a, b, c, d } = {}) {
		let denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y)
		let x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) +
			(b.y - a.y) * (d.x - c.x) * a.x -
			(d.y - c.y) * (b.x - a.x) * c.x) / denominator
		let y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) +
			(b.x - a.x) * (d.y - c.y) * a.y -
			(d.x - c.x) * (b.y - a.y) * c.y) / denominator
		return [x, y]
	}
	// 判断两条线段是否有交点, a1、b1 为两条线在 x1 处的值；a2、b2 为两条线在 x2 处的值；
	// 只要不是一条线段的两个点都高于另一个点就会有交点；
	function ifHaveIntersectionPoint(a1, b1, a2, b2) {
		return (+a1 > +b1) != (+a2 > +b2)
	}
	// 是否执行后续的计算 ？ 不是最后一个点，且有交点时
	function ifCalculatePoint(idx, lth, [a1, b1, a2, b2] = []) {
		return idx !== (lth - 1) && ifHaveIntersectionPoint(a1, b1, a2, b2)
	}
	// 获取两线所有交点
	function getIntersectionPoint({ line1, line2, date } = {}) {
		// 交点数组
		let intersectionPointList = []
		date.map((seg, idx) => {
			// 分别是两条线在相邻两处的数值，用于通过比较大小，来确定此段内是否有交点
			let valueGroup = [line1[idx], line2[idx], line1[idx + 1], line2[idx + 1]]
			if (ifCalculatePoint(idx, date.length, valueGroup)) {
				let dotGroup = {
					a: { x: idx, y: line1[idx] },
					b: { x: idx + 1, y: line1[idx + 1] },
					c: { x: idx, y: line2[idx] },
					d: { x: idx + 1, y: line2[idx + 1] }
				}
				// 计算交点的位置
				let intersectionPoint = segmentsIntr(dotGroup)
				intersectionPointList.push(intersectionPoint)
			}
		})
		return intersectionPointList;
	}
	// 前一天
	function getBeforeOneDay() {
		let date = new Date(new Date(this.selectDate).getTime() - 24*60*60*1000);
		let m = date.getMonth() + 1;
		let d = date.getDate();
		this.beforeOneDay = `${m}/${d}`;
	}
	// 后一天
	function getAfterOneDay() {
		let date = new Date(new Date(this.selectDate).getTime() + 24*60*60*1000);
		let m = date.getMonth() + 1;
		let d = date.getDate();
		this.afterOneDay = `${m}/${d}`;
	}
	// 获取前面n天的日期
	function getBeforeDate() {
		setDate1([])
		if (this.selectValue != '24小时') {
			let y = Number(this.selectDate.split('/')[0]); // //当前年
			let m = Number(this.selectDate.split('/')[1]); // //当前月
			let d = Number(this.selectDate.split('/')[2]); // 当前日

			let data = new Date(y, m-1, 0);
			let time = (data.getDate() > 9 ? data.getDate() : '0' + data.getDate());// 上一月最后一天
			
			let str = 0;
			let n = 0; // 未来n天
			if (this.selectValue == '3天') {
				// 3天
				n = Number(this.selectValue.slice(0, 1));
			} else {
				// 7天
				n = 14;
			}
			for (let i = 0; i < n + 1; i++) {
				if (d - i <= 0) {
					str = `${m - 1}/${d - i + time}`;
				} else {
					str = `${m}/${d - i}`;
				}
				setDate1(date1.unshift(str))
			}
		} else {
			// 24小时
			for(let i = 0; i < 25; i++) {
				setDate1(date1.push(`${i}:00`))
			}
			setDate1(date1[24] = `0:00`)
		}
	}
	// 获取未来n天的日期
	function getEndDate() {
		this.date2 = [];
		if (this.selectValue != '24小时') {
			let y = Number(this.selectDate.split('/')[0]); // //当前年
			let m = Number(this.selectDate.split('/')[1]); // //当前月
			let d = Number(this.selectDate.split('/')[2]); // 当前日

			let data = new Date(y, m, 0);
			let time = (data.getDate() > 9 ? data.getDate() : '0' + data.getDate());// 本月最后一天
			
			let str = 0;
			let n = Number(this.selectValue.slice(0, 1)) + 1; // 未来n天
			for (let i = 0; i < n; i++) {
				if (d + i > time) {
					str = `${m + 1}/${d + i - time}`;
				} else {
					str = `${m}/${d + i}`;
				}
				this.date2.push(str)
			}
		} else {
			for(let i = 1; i < 24; i++) {
				this.date2.push(`${i}:00`)
			}
		}
	}

	useEffect(() => {
		getPredict()
		getOption()
    })


    return (
		<div id='centerBottomMain' style={{width: '100%',height: '100%'}}></div>
	)
}

export default CenterBottom;