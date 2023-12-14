import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import api from '@/api/index';
import { Select } from 'antd';
import SelectNode from '@/components/SelectNode';
import './index.scss';

function CenterBottom({node, selectDate}) {
	let [type, setType] = useState('24小时');
	let [dataType, setDataType] = useState('carbon');
	let [intervalX, setIntervalX] = useState(2); // x轴间距是否隔开
	let [selectValue, setSelectValue] = useState('24小时'); // 下拉框数据
	// select list
	let [selectList] = useState(
		[
			{ value: '24小时', label: '24小时' },
			{ value: '7天', label: '7天' }
		]
	);
	let [beforeOneDay, setBeforeOneDay] = useState('');
	let [afterOneDay, setAfterOneDay] = useState('');

	let [dataList, setDataList] = useState({
		prediction: [], // 预测值
		reality: [] // 实际值
	})
	let [tab, setTab] = useState([
		{
			text: '碳排放',
			type: 'carbon',
			isActive: true
		},
		{
			text: '能耗',
			type: 'usage',
			isActive: false
		}
	])
	// 碳排放单位
	let [carbonUnit, setCarbonUnit] = useState('kgCO₂e');
	let [carbonUnitList] = useState([
		{ value: 'kgCO₂e', label: 'kgCO₂e' },
		{ value: 'tCO₂e', label: 'tCO₂e' }
	]);
	// 能耗单位
	let [unit, setUnit] = useState('kWh');
	let [unitList] = useState([
		{ value: 'kWh', label: 'kWh' },
		{ value: 'MWh', label: 'MWh' }
	]);

	useEffect(() => {
		if(selectDate) {
			dataType === 'carbon' ? getPredict(selectDate, type, dataType, carbonUnit, node.id) : getPredict(selectDate, type, dataType, unit, node.id);
		}
    }, [selectDate, type, dataType, carbonUnit, unit, node])


	// 接口获取数据
	const getPredict = async function(date, type, dataType, unit, server_id) {
		let params = {}
		if (server_id) {
			params = {
				day_str: date,
				type: type=='24小时' ? 24 : type,
				dataType,
				server_id,
				park_id: 1,
				unit
			}
		} else {
			params = {
				day_str: date,
				type: type==1 ? 24 : type,
				dataType,
				park_id: 1,
				unit
			}
		}
		const res = await api.GetPredict(params);
		let obj = {};
		res.forEach(el => {
			if(el.name == '预测值') {
				obj.prediction = el.value;
			} else {
				obj.reality = el.value;
			}
		})
		setDataList(() => {
			dataList = obj;
			getOption();
			return {...obj}
		});
		
	}

	// 获取option
	const getOption = function() {
		let myChart = echarts.init(document.getElementById('centerBottomMain'));
		let maxValue = Math.max.apply(null, [...dataList.prediction, ...dataList.reality]);
		let date1 = getBeforeDate();
		let date2 = getEndDate();
		// x 轴坐标
		let chartXAxis = [...date1, ...date2];

		let chartOption = {
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
					data: dataList.prediction,
					areaStyle: {
						color: '#F04438',
						opacity: .4,
						origin: 'end',
					},
					itemStyle: {
						color: 'rgba(240,68,56,.6)'
					},
					lineStyle: {
						color: "#36BFFA",
						type: 'dashed',
						width: 2
					}
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
						color: 'rgba(50,213,131,.6)'
					},
					lineStyle: {
						color: "#36BFFA",
						width: 2
					}
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
						lineStyle: {
							width: 1,
							color: '#DFDFDD',
						}
					}
				}
			]
		}

		// 计算虚线多出来的部分，前面用-占位
		let lineData4 = [];
		lineData4 = dataList.prediction.slice(dataList.reality.length-1)
		for (let i=0; i < dataList.reality.length-1; i++ ) {
			lineData4.unshift('-')
		}

		// 计算两个数据的最大值，组成二维数据
		let line3Data = [];
		dataList.prediction.forEach((item, i) => {
			if (item - dataList.reality[i] >= 0) {
				line3Data.push([i, item])
			} else {
				line3Data.push([i, dataList.reality[i]])
			}
		})

		// 计算交点
		let scatterData = getIntersectionPoint({
			line1: dataList.prediction,
			line2: dataList.reality,
			date: chartXAxis
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

		chartOption.series.push({
			z:-1, // 使yAxis的splitLines显示在顶部 重要部分!!!
			name: 'name3',
			type: 'line',
			smooth: false,
			symbol: "none", // 去掉折线上面的小圆点
			data: line3Data,
			xAxisIndex: 1,
			lineStyle: {
				color: "#36BFFA",
				type: 'dashed', // 设置为虚线
				width: .88
			},
			areaStyle: {
				color: '#1e1e1e',
				opacity: 1,
				origin: 'end', // 填充折线外的区域
			},
		})

		chartOption.series.push({
			z: -1,
			name: 'name4',
			type: 'line',
			smooth: false,
			showSymbol: false,
			data: lineData4,
			lineStyle: {
				color: "#36BFFA",
				type: 'dashed', // 设置为虚线
				width: .1
			},
			areaStyle: {
				color: '#1e1e1e',
				opacity: 1,
				origin: 'end', // 填充折线外的区域
			},
		})



		myChart.setOption(chartOption);
	}

	// 获取前面n天的日期
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
			for(let i = 0; i < 25; i++) {
				arr.push(`${i}:00`)
			}
			arr[24] = '0:00';
		}
		return arr;
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
		return arr
	}

	const getTipDot = function({ radius = 5, color = "red" } = {}) {
		return `<span style='width:${radius * 2}px;height:${radius * 2}px;display:inline-block;border-radius: ${radius}px;background:${color};margin:0px 3px;'></span>`
	}

	// 切换下拉框内容
	const handleChange = (value) => {
		setType(value);
		setSelectValue(value);
		value == '7天' ? setIntervalX(0) : setIntervalX(2);
	}

	// 计算两个线段交点，通过传入 两条线段、四个端点 的 横纵坐标 值，来计算两者交点的坐标
	const segmentsIntr = function({ a, b, c, d } = {}) {
		let denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y)
		let x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) +
			(b.y - a.y) * (d.x - c.x) * a.x -
			(d.y - c.y) * (b.x - a.x) * c.x) / denominator;
		let y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) +
			(b.x - a.x) * (d.y - c.y) * a.y -
			(d.x - c.x) * (b.y - a.y) * c.y) / denominator;
		return [x, y]
	}

	// 判断两条线段是否有交点, a1、b1 为两条线在 x1 处的值；a2、b2 为两条线在 x2 处的值；
	// 只要不是一条线段的两个点都高于另一个点就会有交点；
	const ifHaveIntersectionPoint = function(a1, b1, a2, b2) {
		return (+a1 > +b1) != (+a2 > +b2)
	}

	// 是否执行后续的计算 ？ 不是最后一个点，且有交点时
	const ifCalculatePoint = function(idx, lth, [a1, b1, a2, b2] = []) {
		return idx !== (lth - 1) && ifHaveIntersectionPoint(a1, b1, a2, b2)
	}

	// 获取两线所有交点
	const getIntersectionPoint = function({ line1, line2, date } = {}) {
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

	// 能耗/碳排放
	const changeTab = function(e, type, i) {
		let arr = tab;
		arr.forEach((item, index) => {
			item.isActive = false
			if (i == index) {
				item.isActive = true;
			}
		})
		setDataType(type);
		type === 'carbon' ? setCarbonUnit('kgCO₂e') : setUnit('kWh');
		setTab(arr)
	}

	// 碳排放单位切换
	const changeCarbonUnit = function(value) {
		if (dataType == 'usage') {
			setUnit(value)
		} else {
			setCarbonUnit(value)
		}
	}

	// 能耗单位切换
	const changeUnit = function(value) {
		if (dataType == 'usage') {
			setUnit(value)
		} else {
			setCarbonUnit(value)
		}
	}

    return (
		<div className="container border w-100 h-100 d-flex flex-column">
			<div className="content-header w-100 d-flex">
				<span className="content-title fw-600 d-flex">
					<div>未来</div>
					<Select
						className='kinko-selection'
						defaultValue={selectValue}
						style={{ width: 100 }}
						onChange={handleChange}
						options={selectList}
						/>
					<div>预测</div>
					<SelectNode nodeName={node.nodeText || '电试院'} level={node.level || 1}/>
					{/* // <Popver :con="popverCon"/> */}
					{/* <Popver :con="popverCon2"/> */}
				</span>
				<div className="tabs">
					<div className="tabs-con right-tabs">
						{
							tab.map((item, index) => {
								return (
									<div className={item.isActive ? 'item active' : 'item'} key={index} onClick={(e)=> changeTab(e, item.type, index)}>{item.text}</div>
								)
							})
						}
					</div>
					{
						dataType == 'carbon' &&
						<Select
							className='kinko-selection'
							defaultValue={carbonUnit}
							style={{ width: 120,marginLeft: '.5rem' }}
							onChange={changeCarbonUnit}
							options={carbonUnitList}
							/>
					}
					{
						dataType == 'usage' &&
						<Select
							className='kinko-selection'
							defaultValue={unit}
							style={{ width: 120,marginLeft: '.5rem' }}
							onChange={changeUnit}
							options={unitList}
							/>
					}
				</div>
			</div>
			<div className='flex-1' id='centerBottomMain'></div>
			<div className="legend w-100">
				<div className="con"><span className="color1"></span>实际值</div>
				<div className="con"><span className="color2"></span>预测值</div>
			</div>
			<div className="date w-100">
				<div className="d left">
					<div className="text">{ beforeOneDay }</div>
				</div>
				<div className="d center">
					{/* <div className="text">{{ parseInt(selectDate.split('/')[1]) }}/{{ parseInt(selectDate.split('/')[2]) }}</div> */}
				</div>
				<div className="d right">
					<div className="text">{ afterOneDay }</div>
				</div>
			</div>
		</div>
	)
}

export default CenterBottom;