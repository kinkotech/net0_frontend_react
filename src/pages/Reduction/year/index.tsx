import { useState, useEffect } from 'react';
import { Select, Statistic } from 'antd';
import Echarts from '@/components/Echarts';
// import Title from '@/components/title/index.vue';
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// import fontSize from "@/mixins/fontSize";
// import getTipDot from '@/mixins/getTipDot';
// import reductionYearChartResize from "@/mixins/reductionYearChartResize";
import api from '@/api/index';
// import Picker from './picker';
import { ReductionLayout } from '@/pages/Reduction/index';
import './index.scss';

const FootIndex = () => {
	
	let [option, setOption] = useState({});
	let [unit, setUnit] = useState([]);
	let [startDate, setStartDate] = useState('');
	let [endDate, setEndDate] = useState('');
	let [axisData, setAxisData] = useState([]);
	let [value0, setValue0] = useState([]);
	let [value1, setValue1] = useState([]);
	let [value2, setValue2] = useState([]);
	let [value3, setValue3] = useState([]);
	let [value4, setValue4] = useState([]);
	let [selectUnit] = useState(
		[
			{ value: 'tCO₂e', label: 'tCO₂e' },
			{ value: 'kgCO₂e', label: 'kgCO₂e' }
		]
	);
	// 经济效益分析-新增投资
	let [cardList, setCardList] = useState([]);
	// 环境及社会效益分析
	let [getYearSocialData] = useState([]);
	// 经济效益分析-运行管理 管理端
	let [getYearManagementData] = useState([]);
	// 经济效益分析-运行管理 供给端
	let [getYearSupplyData] = useState([]);

	useEffect(() => {
		if (startDate) {
			init();
			getYearInvestment();
		}
		
	}, [ cardList, startDate ])

	const getYearCarbon = async () => {
		let params = {
			start: startDate,
			end: endDate,
			unit
		}
		await api.GetYearCarbon(params).then((res: any)=>{
			let data = res.line;
			data.forEach((item: any) => {
				if (item.name == 'date') {
					setAxisData(item.data)
				}else if (item.name == '去年碳排放实际值') {
					setValue0(item.value)
				}else if (item.name == '去年年度碳排放平均值') {
					setValue1(item.value)
				}else if (item.name == '今年年度碳排放计划平均值') {
					value2 = item.value
					setValue2(item.value)
				}else if (item.name == '今年碳排放计划曲线') {
					setValue3(item.value)
				}else if (item.name == '今年碳排放实际值') {
					setValue4(item.value)
				}
			})
		})
	}

	const init = () => {
		// let _this = this;
		// let allYAxisArr = [...value1, ...value2, ...value0, ...value3, ...value4].sort();
		// let minYAxis = allYAxisArr[0] - (allYAxisArr[0] * 0.1); // y轴最小范围
		// let maxYAxis = allYAxisArr[allYAxisArr.length - 1] + (allYAxisArr[allYAxisArr.length - 1] * 0.1); // y轴最大范围
		
		let data: any = [];
		axisData.forEach((item: any, i) => {
			data.push({
				name: new Date(item).toString(),
				value: [
					item.replaceAll('-', '/'),
					value0[i]
				]
			})
		})
		setOption({
			tooltip: {
				trigger: 'axis',
				formatter: function (params: any) { // params 为一个数组，数组的每个元素 包含了 该折线图的点 所有的参数信息，比如 value(数值)、seriesName（系列名）、dataIndex（数据项的序号）
					let tipList = params.map((seg: any) => {
						let { value, seriesName, color } = seg;
						if (typeof(value) == 'object') {
							value = value[1]
						}
						// return `
						// 	${getTipDot({ color })}${seriesName}：${value}`
					})
					return `<div>${params[0].axisValueLabel}：<div>` + tipList.join('<br/>')
				},
				axisPointer: {
					animation: false
				}
			},
			grid: {
				left: '5%',
				right: '13%',
				top: '5%',
				bottom: '10%',
				containLabel: true,
			},
			legend: {
				orient: 'vertical',
				align: 'left',
				left: 'right',
				top: 'center',
				icon: 'circle',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 18,
				textStyle: {
					fontSize: 12,
					color: '#fff',
				},
			},
			xAxis: {
				type: 'category',
				splitLine: {
					show: false
				},
				axisLabel: {
					color: '#fff',
					interval: 0,
					fontSize: 12,
					formatter: function(data: any){
						let text: string | number = new Date(data).getMonth() + 1;
						let md = `${data.split('/')[1]}/${data.split('/')[2]}`; // 月/日
						if (text == 1) {
							if (md !== '01/01') {
								text = ''
							}
						}
						if (text == 2) {
							if (md !== '02/01') {
								text = ''
							}
						}
						if (text == 3) {
							if (md !== '03/01') {
								text = ''
							}
						}
						if (text == 4) {
							if (md !== '04/01') {
								text = ''
							}
						}
						if (text == 5) {
							if (md !== '05/01') {
								text = ''
							}
						}
						if (text == 6) {
							if (md !== '06/01') {
								text = ''
							}
						}
						if (text == 7) {
							if (md !== '07/01') {
								text = ''
							}
						}
						if (text == 8) {
							if (md !== '08/01') {
								text = ''
							}
						}
						if (text == 9) {
							if (md !== '09/01') {
								text = ''
							}
						}
						if (text == 10) {
							if (md !== '10/01') {
								text = ''
							}
						}
						if (text == 11) {
							if (md !== '11/01') {
								text = ''
							}
						}
						if (text == 12) {
							if (md !== '12/01') {
								text = ''
							}
						}
						if (text) {
							return [`${text}月`];
						}
					},
					
				},
				axisLine: {
					show: false,
				},
			},
			yAxis: {
				type: 'value',
				boundaryGap: true,
				// min: minYAxis,
				// max: maxYAxis,
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, .12)'
					}
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#999',
					interval: 0,
					fontSize: 12
				},
			},
			series: [
				{
					name: '去年年度碳排放平均值',
					type: 'line',
					showSymbol: false,
					data: value1,
					itemStyle: {
						normal: {
							color: "rgba(226,184,86,.3)",
							lineStyle: {
								color: "rgba(226,184,86,.3)",
							},
						},
					},
				},
				{
					name: '去年碳排放实际值',
					type: 'line',
					showSymbol: false,
					data,
					itemStyle: {
						normal: {
							color: "rgba(50,213,131,.3)",
							lineStyle: {
								color: "rgba(50,213,131,.3)",
							},
						},
					},
				},
				
				{
					name: '今年年度碳排放计划平均值',
					type: 'line',
					showSymbol: false,
					data: value2,
					itemStyle: {
						normal: {
							color: "#4472C4",
							lineStyle: {
								color: "#4472C4",
							},
						},
					},
				},
				{
					name: '今年碳排放计划曲线',
					type: 'line',
					showSymbol: false,
					data: value3,
					itemStyle: {
						normal: {
							color: "#FD853A",
							lineStyle: {
								color: "#FD853A",
							},
						},
					},
				},{
					name: '今年碳排放实际值',
					type: 'line',
					showSymbol: false,
					data: value4,
					itemStyle: {
						normal: {
							color: "#0BCFC8",
							lineStyle: {
								color: "#0BCFC8",
							},
						},
					},
				}
			]
		});
		
	}

	// 切换单位
	const handleChange = (val: any) => {
		setUnit(val)
		getYearCarbon()
		init()
	}

	// 经济效益分析-新增投资
	const getYearInvestment = async () => {
		await api.GetYearInvestment().then((res: any)=>{
			setCardList(res)
		})
	}
	
	return (
		<ReductionLayout>
			<div className="year-page w-100 h-100">
				{/* <Title title="title" className="year-pages"></Title> */}
				<div className="year-page-con border w-100 h-100">
					<div className="center">
						<div className="year-picker w-100">
							{/* <Picker @dateValue="getDateValue"/> */}
							<Select
								className='kinko-selection-white'
								defaultValue={unit}
								style={{ width: 100 }}
								onChange={handleChange}
								options={selectUnit}
								/>
						</div>
						<div className="con h-100">
							<Echarts id='reduction-year-chart' option={option}/>
							<div className="unit">碳排放{ unit }</div>
						</div>
					</div>
					<div className="bottom">
						<div className="li add w-100 h-100">
							<div className="left">
								<div className="title">经济效益分析-新增投资</div>
								<div className="list h-100">
									{
										cardList.map((item: any) => {
											return (
												<div className="card">
													<div className="name lr">{ item.title }</div>
													<div className="right-card h-100">
														
														{
															item.data.map((el: any) => {
																return (
																	<div className="item w-100">
																		<div className="text ">{ el.name }</div>
																		<div>
																			<Statistic value={el.value} valueStyle={{color: '#fff', fontSize: '.2rem',fontWeight: 600}} suffix={el.unit}/>
																		</div>
																	</div>
																)
															})
														}
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
							<div className="right">
								<div className="title">环境及社会效益分析</div>
								<div className="list w-100 h-100">
									{
										getYearSocialData.map((item: any) => {
											return (
												<div className="card2">
													<div className="item">
														<div className="icon">
															<iconpark-icon size="100%" color={item.color1} name={item.icon1}></iconpark-icon>
														</div>
														<div className="name">{ item.title1 }</div>
													</div>
													<div className="item">
														<div className="icon-small">
															<div className="icon-small-icon">
																<iconpark-icon size="100%" color={item.color2} name={item.icon2}></iconpark-icon>
															</div>
															<span className="text">{ item.title2 }</span>
														</div>
														<div className="text">
															<Statistic value={item.value} valueStyle={{color: '#fff', fontSize: '.2rem',textAlign: 'right'}} suffix={item.unit}/>
														</div>
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<div className="li management w-100 h-100">
							<div className="title">经济效益分析-运行管理</div>
							<div className="li-con w-100 h-100">
								<div className="left">
									<div className="management-con h-100">
										<div className="management-con-title blue1 h-100">
											<div className="lr">需求侧</div>
										</div>
											{
												getYearManagementData.map((item: any) => {
													return (
														<>
															{
																item.title == '空调' &&
																<div className="card card1 blue2 h-100">
																	<div className="name lr" >{ item.title }</div>
																	<div className="right-card h-100">
																	{
																		item.data.map((el: any) => {
																			return (
																				<div className="item w-100">
																					<div className="text">{ el.key }</div>
																					<div>
																						<Statistic value={el.value} valueStyle={{color: '#fff', fontSize: '.2rem'}} suffix={el.unit}/>
																					</div>
																				</div>
																			)
																		})
																	}
																	</div>
																</div>
															}
														</>
													)
												})
											}
											<div className="management-con-right h-100">
												{
													getYearManagementData.map((item: any) => {
														return (
															<>
																{
																	item.title != '空调' &&
																	<div className="card card2 blue2">
																		<div className="name lr">{ item.title }</div>
																		<div className="right-card h-100">
																			{
																				item.data.map((el: any) => {
																					<div className="item w-100">
																						<div className="text">{ el.key }</div>
																						<div>
																							<Statistic value={el.value} valueStyle={{color: '#fff', fontSize: '.2rem'}} suffix={el.unit}/>
																						</div>
																					</div>
																				})
																			}
																		</div>
																	</div>
																}
															</>
														)
													})
												}
											</div>
									</div>
								</div>
								<div className="right">
									<div className="management-con h-100">
										<div className="management-con-title green1 h-100">
											<div className="lr">供给侧</div>
										</div>
										{
											getYearSupplyData.map((item: any) => {
												return (
													<div className="card card3 green2 h-100">
														<div className="name lr" >{ item.title }</div>
														<div className="right-card h-100">
															{
																item.data.map((el: any) => {
																	return (
																		<div className="item w-100">
																			<div className="text">{ el.key }</div>
																			<div>
																				<Statistic value={el.value} valueStyle={{color: '#fff', fontSize: '.2rem'}} suffix={el.unit}/>
																			</div>
																		</div>
																	)
																})
															}
														</div>
													</div>
												)
											})
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ReductionLayout>
	)
}

export default FootIndex;

