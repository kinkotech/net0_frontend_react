import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import api from '@/api/index';
import { Select } from 'antd';



function CenterBottom() {
	let [selectDate, setSelectDate] = useState('2023-12-05'); // 选择的日期
	let [type, setType] = useState(24);
	let [dataType, setDataType] = useState('usage');

	let [intervalX, setIntervalX] = useState(2); // x轴间距是否隔开
	let [chartOption, setChartOption] = useState({}); // option
	let [chartXAxis, setChartXAxis] = useState([]); // x轴坐标数据
	let [selectValue, setSelectValue] = useState('24小时'); // 下拉框数据
	let [selectList, setSelectList] = useState(
		[
			{ value: '24小时', label: '24小时' },
			{ value: '7天', label: '7天' }
		]
	); // select list
	let [date1, setDate1] = useState([]); // 前面n天的日期
	let [date2, setDate2] = useState([]);
	let [beforeOneDay, setBeforeOneDay] = useState('');
	let [afterOneDay, setAfterOneDay] = useState('');

	let [dataList, setDataList] = useState({
		prediction: [],
		reality: []
	}) 
	// let [predictionList, setPredictionList] = useState([]); // 预测值
	// let [realityList, setRealityList] = useState([]); // 实际值
	let predictionListRef = useRef();

	useEffect(() => {
		getPredict(selectDate, type, dataType);
		
    }, [selectDate, type, dataType])

	const init = function() {
		var myChart = echarts.init(document.getElementById('centerBottomMain'));
		myChart.clear();
		setChartXAxis(() => {
			if (date1 && date2) {
				chartXAxis = [...date1, ...date2];
				myChart.setOption(chartOption);
			}
		})
	}

	// 接口获取数据
	const getPredict = async function(date, type, dataType) {
		let params = {
			day_str: date,
			type: type == '24小时' ? 24 : 7,
			dataType,
			park_id: 1,
			unit: ''
		}
		await api.GetPredict(params).then(res=>{
			let data = res;
			let data1 = [];
			let data2 = [];
			data.forEach(el => {
				if(el.name == '预测值') {
					data1 = el.value;
				} else {
					data2 = el.value;
				}
			})
			setDataList(() => {
				getBeforeDate();
				getEndDate()
				getOption();
				init();
				return {
					prediction: data1,
					reality: data2
				}
				
			})
		})
	}

	// 获取option
	const getOption = function() {
		console.log(dataList.prediction)
		if (!dataList.prediction || !dataList.reality) return;

		let maxValue = Math.max.apply(null, [...dataList.prediction, ...dataList.reality]);
		setChartOption(() => {
			chartOption = {
				tooltip: {
					trigger: 'axis',
					formatter: function (params) { // params 为一个数组，数组的每个元素 包含了 该折线图的点 所有的参数信息，比如 value(数值)、seriesName（系列名）、dataIndex（数据项的序号）
						let dateIndex = 0; // 当前指示点的 日期序号
						
						let tipList = params.map((seg) => {
							let { value, seriesName, dataIndex, color } = seg;
							if (seriesName == 'name3' || seriesName == 'name4') return
							dateIndex = dataIndex;
							return `${getTipDot({ color })}${seriesName}：${value}`
						})

						tipList.unshift(`${chartXAxis[dateIndex]}`)
						return tipList.join('<br/>')
					}
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
					data: chartXAxis && chartXAxis.map((seg, index) => {
						return index
					}),
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
						formatter: function (params) {
							return chartXAxis && chartXAxis[params]
						},
						color: 'rgba(255, 255, 255, .87)',
						fontSize: 12,
						interval: intervalX,
					},
					boundaryGap: false, // 两边的留白
				},
				{
					type: 'value',
					splitLine:{
						show: false
					},
					min: 0,
					max: chartXAxis && chartXAxis.length-1,
					boundaryGap: false, // 两边的留白
					axisPointer: { // tooltip不显示
						type: 'none'
					},
					// show: false // 第二个x轴不显示
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
						data: dataList.prediction,
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
						data: dataList.reality,
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
								{coord:[date1 && (date1.length-1).toString(), 0]},
								{coord:[date1 && (date1.length-1).toString(), maxValue]}
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
			}
		})
	}

	const getBeforeDate = function() {
		let arr = [];
		if (selectValue != '24小时') {
			let y = Number(selectDate.split('-')[0]); // //当前年
			let m = Number(selectDate.split('-')[1]); // //当前月
			let d = Number(selectDate.split('-')[2]); // 当前日

			let data = new Date(y, m-1, 0);
			let time = (data.getDate() > 9 ? data.getDate() : '0' + data.getDate());// 上一月最后一天
			
			let str = 0;
			let n = 0; // 未来n天
			if (selectValue == '3天') {
				// 3天
				n = Number(selectValue.slice(0, 1));
			} else {
				// 7天
				n = 14;
			}
			for (let i = 0; i < n + 1; i++) {
				if (d - i <= 0) {
					if (m != 1) {
						str = `${m - 1}/${d - i + time}`;
					} else {
						str = `12/${d - i + time}`;
					}
				} else {
					str = `${m}/${d - i}`;
				}
				
				arr.unshift(str)
			}
		} else {
			// 24小时
			for(let i = 0; i < 24; i++) {
				arr.push(`${i}:00`)
			}
		}
		setDate1((prevState) => {
			date1 = arr;
		})
		
	}

	// 获取未来n天的日期
	const getEndDate = function() {
		let arr = [];
		if (selectValue != '24小时') {
			let y = Number(selectDate.split('-')[0]); // //当前年
			let m = Number(selectDate.split('-')[1]); // //当前月
			let d = Number(selectDate.split('-')[2]); // 当前日

			let data = new Date(y, m, 0);
			let time = (data.getDate() > 9 ? data.getDate() : '0' + data.getDate());// 本月最后一天
			
			let str = 0;
			let n = Number(selectValue.slice(0, 1)) + 1; // 未来n天
			for (let i = 0; i < n; i++) {
				if (d + i > time) {
					if (m != 12) {
						str = `${m + 1}/${d + i - time}`;
					} else {
						str = `01/${d + i - time}`;
					}
				} else {
					str = `${m}/${d + i}`;
				}
				arr.push(str)
			}
		} else {
			for(let i = 1; i < 24; i++) {
				arr.push(`${i}:00`)
			}
		}
		setDate2((prevState) => {
			date2 = arr;
		})
	}

	const getTipDot = function({ radius = 5, color = "red" } = {}) {
		return `<span style='width:${radius * 2}px;height:${radius * 2}px;display:inline-block;border-radius: ${radius}px;background:${color};margin:0px 3px;'></span>`
	}

	// 切换下拉框内容
	const handleChange = (value) => {
		setType(() => {
			type = value;
			getPredict(selectDate, type, dataType)
		});
	};


    return (
		<div className='d-flex flex-column w-100 h-100'>
				<Select
					className='kinko-selection-white'
					defaultValue={selectValue}
					style={{ width: 120 }}
					onChange={handleChange}
					options={selectList}
					/>
			<div className='flex-1 h-100' id='centerBottomMain'></div>
		</div>
	)
}

export default CenterBottom;