import { useEffect, useState } from 'react'
import Title from '@/components/Title';
import { ReductionLayout } from '@/pages/Reduction/index';
import { Select, Statistic } from 'antd';
import Echarts from '@/components/Echarts';
import { connect } from 'react-redux';
import * as echarts from 'echarts';
import helpImgUrl from '@/assets/img/help.png';
import Popver from '@/components/Popver';
import TopologyMap from '@/components/TopologyMap';
import reductionApi from '@/api/reduction';
import api from '@/api/index';
import {getNowDate} from '@/utils/utils';
import './index.scss';

// x轴坐标
let date = [];
for(let i=0;i<24; i++) {
    date.push(`${i}:00`)
}

const ReductionDay = ({timeUnit, dayDeviceTypeColor, server_id='a00000000000000'}) => {
	let [option, setOption] = useState({
		tooltip: {
			trigger: 'axis'
		},
		color: [],
		legend: {
			show: false
		},
		grid: {
			left: '0%',
			right: '5%',
			top: '8%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: date,
			axisLine: {
				lineStyle: {
					color:'rgba(255, 255, 255, .4)'
				}
			},
			axisLabel: {
				color: '#999',
				fontSize: 12,
			}
		},
		yAxis: {
			type: 'value',
			position: 'right',
			// 网格线
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 255, 255, .4)'
				}
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				fontSize: 12,
			}
		},
		series: []
	})
	let [lightOptions] = useState({
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			bottom: '2%',
			icon: 'circle',
			itemGap: 25,
			itemWidth: 10,
			itemHeight:10,
			textStyle: {
				fontSize: 12,
			}
		},
		grid: {
			left: '2%',
			right: '8%',
			top: '8%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				color: '#999',
				fontSize: 12,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 255, 255, .12)'
				}
			},
			boundaryGap: false
		},
		yAxis: {
			type: 'value',
			position: 'right',
			axisLabel: {
				color: 'rgba(255, 255, 255, .85)',
				fontSize: 12,
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 255, 255, .12)'
				}
			},
		},
		series: [
			{
				name: '预测值',
				type: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: 'rgb(128, 255, 165)'
					},
					{
						offset: 1,
						color: 'rgb(1, 191, 236)'
					}
					])
				},
				emphasis: {
					focus: 'series'
				},
				data: []
			},
			{
				name: '实际值',
				type: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: 'rgb(0, 221, 255)'
					},
					{
						offset: 1,
						color: 'rgb(77, 119, 255)'
					}
					])
				},
				emphasis: {
					focus: 'series'
				},
				data: []
			},
		]
	})
	let [dayActive, setDayActive] = useState(true);
	// 环境
	let [environment, setEnvironment] = useState({
		humidness: 0, // 湿度
		temperature: 0, // 温度
		rad: 0, // 日照量
	})
	let [rightTitle, setRightTitle] = useState('电试院');
	let [rightTitleLight] = useState('光伏产能');
	let [selectValue, setSelectValue] = useState('comparison');
	let [unit, setUnit] = useState('');
	let [lightUnit] = useState('');
	let [deviceType, setDeviceType] = useState(['综合设备', '照明设备', '空调设备']); // 默认的设备类型
	let [dayDeviceTypeName, setDayDeviceTypeName] = useState([]);
	let [dayDemandList, setDayDemandList] = useState([]);
	let [daySupplyList, setDaySupplyList] = useState([]);

	const selectList = [{
		value: 'comparison',
		label: '日综合对比',
		color: ['#0BCFC8', '#FD853A', '#6200EE']
	},{
		value: 'dashboard',
		label: '日实测值'
	}, {
		value: 'normal',
		label: '日预测值'
	}, {
		value: 'optimize',
		label: '日推荐值'
	}]
	const comparisonLegend = [{
		color: '#0BCFC8',
		type: 'actual_value',
		name: '实测值'
	},{
		color: '#FD853A',
		type: 'predict_value',
		name: '预测值'
	},{
		color: '#6200EE',
		type: 'strategy_value',
		name: '优化值'
	}]
	const popverCon1 = `<p class="info9"></p>
	<p>通过使用深度强化学习的高效探索方法推演出零碳智慧园区碳减排的策略的模型，尤其涉及基于园区配电网建模后设定多目标后的优化决策。</p>
	<p>强化学习属于机器学习领域，是一种解决复杂的非线性问题，例如序列决策问题的重要方法。强化学习将序列决策问题建模为外部环境，将决策算法视为智能体，智能体通过试错学习改进决策策略，使得该策略在序列决策过程中能获得最大的累积收益。</p>`;
	const popverCon2 = `<p>日策略优化曲线，使用强化学习为每类（9大类）设备，制定的推荐能源使用计划，从而获得最优的碳排放计划曲线。</p>
	<p>不优化的曲线，是由碳排放预测模块给出的24小时，电力碳排放曲线。</p>
	<p>日策略的实测值，是电表的实时更新数据。</p>`;
	const popverCon3 = '使用LSTM模型预测的24小时内的光伏预测数据，与实际的光伏数据的对比';

	useEffect(() => {
		getDayDeviceType();
		getDayStrategy(server_id, selectValue, deviceType);
		getDayDemand();
		getDaySupply();
		getEnvironment()
	}, [server_id, selectValue, deviceType])

	// 切换下拉框
	const changeDay = (val, item) => {
		setSelectValue(val);
		getDayStrategy(server_id, val, deviceType)
	}
	// 需求侧
	const getDayDemand = async () => {
		await api.GetDayDemand().then(res=>{
			setDayDemandList(res)
		})
	}
	// 供给端
	const getDaySupply = async () => {
		await api.GetDaySupply().then(res=>{
			setDaySupplyList(res)
		})
	}
	// 环境
	const getEnvironment = async () => {
		await reductionApi.GetEnvironment().then(res=>{
			setEnvironment(res)
		})
	}
	// 获取设备类型
	const getDayDeviceType = async () => {
		await reductionApi.GetDeviceList().then(res=>{
			setDayDeviceTypeName(res.data);
		})
	}
	// 柱形图
	const getDayStrategy = async (server_id, type, device) => {
		let params = {
			day_str: getNowDate(),
			server_id,
			type,
			device
		}
		await api.GetDayStrategy(params).then(res=>{
			let arr = res.data;
			setUnit(res.unit)
			if (type == 'comparison') {
				arr.forEach(el => {
					el.type = 'line';
					el.smooth = true;
					el.showSymbol = false;

					if (el.name == 'actual_value') { // 真实值
						el.data = el.value;
						el.name= '实测值';
					} else if (el.name == 'predict_value') { // 预测值
						el.data = el.value;
						el.name= '预测值';
					} else if (el.name == 'strategy_value') { // 优化值
						el.data = el.value;
						el.name= '优化值';
					}
				})
				
				setOption({
					...option,
					color: selectList[0].color,
					series: arr
				})
			} else {
				arr.forEach(el => {
					if (el.name != '优化曲线') {
						el.data = el.value;
						el.type = 'bar';
						el.barWidth = '35%';
						el.stack = 'total';
						el.emphasis = {
							focus: 'series'
						};
						// 根据设备名称显示对应颜色
						let index = dayDeviceTypeName.indexOf(el.name)
						el.itemStyle = {
							normal: {
								color: dayDeviceTypeColor[index]
							}
						}
					}
				})
				setOption({
					...option,
					series: arr
				})
			}
		})
	}

	const getItem = () => {}

	// 获取graph的item
	const getGraphItem = (item) => {
		console.log(selectValue)
		setRightTitle(item.label)
		getDayStrategy(item.id, selectValue, deviceType)
	}

	return (
		<ReductionLayout>
			<div className="day-page w-100 h-100">
				<Title title="日策略" fontSize=".18rem" color={'white'} showHelp={true} helpImgUrl={helpImgUrl} showSelect={true}/>
				<div className="day-page-con border w-100 h-100">
					<div className="center ">
						<div className="barContaniner">
							<div className="barContaniner-left">
								<div className="barContaniner-left-title">
									<div>一楼一策（按用能设备统计）</div>
									<Popver con={popverCon1}/>
								</div>
								<TopologyMap item={getItem} dayDeviceTypeName={dayDeviceTypeName} getGraphItem={getGraphItem}/>
							</div>
							<div className="barContaniner-right w-100">
								<div className="barContaniner-right-title">
									<div className="d-flex barContaniner-right-title-left">
										<div>{ `${dayActive ? rightTitle+'日策略' : rightTitleLight}` }趋势图</div>
										<Popver con={!dayActive ? popverCon3 : popverCon2}/>
									</div>
									<div className="barContaniner-right-title-right">
										<Select
											className='kinko-selection'
											defaultValue={selectValue}
											style={{ width: '1.5rem' }}
											onChange={changeDay}
											options={selectList}
										/>
										<div className={!dayActive ? 'barContaniner-right-btn active pointer' : 'barContaniner-right-btn pointer'}>
											<div className="barContaniner-right-btn-icon">
												<iconpark-icon size="100%" color={!dayActive ? '#fff' : '#999'} name="BlockChartLine"></iconpark-icon>
											</div>
											<div>光伏产能</div>
										</div>
										<div className="config-icon pointer">
											<iconpark-icon size="100%" color="#fff" name="config-ahf7pg8n"></iconpark-icon>
										</div>
									</div>
								</div>
								<div className="w-100 h-100 barContaniner-right-content">
									{
										dayActive ?
										<>
											<Echarts id='reduction-day-chart' option={option}/>
											<div className="unit">{ unit }</div>
											{
												selectValue == 'comparison' ?
												<ul className="barContaniner-right-content-legend">
													{
														comparisonLegend.map((item, i) => {
															return (
																<li key={item.name}>
																	<span style={{background: item.color}} className="circle"></span>
																	<span>{ item.name }</span>
																</li>
															)
														})
													}
													
												</ul>
												:
												<ul className="barContaniner-right-content-legend device-type-legend">
													{
														deviceType.map((item, i) => {
															return (
																<li key={item}>
																	<span style={{background: dayDeviceTypeColor[i]}} className="circle"></span>
																	<span>{ item }</span>
																</li>
															)
														})
													}
												</ul>
											}
											<div className="name-text">{ timeUnit }</div>
										</>
										:
										<>
											<Echarts id='reduction-day-light-chart' option={lightOptions}/>
											<div className="unit">{ lightUnit }</div>
											<div className="light-name-text">{ timeUnit }</div>
										</>
									}
									
								</div>
								{/* <ul className="config-con" v-if="showConfigCon" @click.stop>
									<a-checkbox-group @change="onChangeDeviceType" :default-value="deviceType">
										<li v-for="(item, i) in $store.state.dayDeviceType.name" :key="i">
											<a-checkbox :value="item">
												{{ item }}
											</a-checkbox>
										</li>
									</a-checkbox-group>
								</ul> */}
							</div>
						</div>
					</div>
					<div className="bottom h-100">
						<div className="bottom-con h-100">
							<div className="text">需求侧</div>
							<div className="box h-100">
								{
									dayDemandList.map((item, i) => {
										return (
											<div className="box-con h-100">
												<div className="p1">
													<div className="name">{ item.title }</div>
												</div>
												<div className="box-con-ul">
													<div className="box-con-ul-li">
														<div className="box-con-ul-li-title">{ item.value_label }({ item.value_unit })</div>
														<div className="box-con-ul-li-value">
															<Statistic
																value={item.value}
																valueStyle={{ color: '#fff',fontSize:'.3rem',fontWeight: 700 }}
																suffix='%'
																/>
														</div>
													</div>
													<div className="box-con-ul-li right">
														<div className="box-con-ul-li-title">{ item.carbon_label }({ item.carbon_unit })</div>
														<div className="box-con-ul-li-value">
															<Statistic
																value={item.carbon_value}
																valueStyle={{ color: '#fff',fontSize:'.3rem',fontWeight: 700 }}
																suffix='%'
																/>
															<div className={item.trend_label == '+' ? 'box-con-ul-li-value-scope up' : 'box-con-ul-li-value-scope down'}>
																<span className="triangle"></span>
																<span className="box-con-ul-li-value-scope-value">{ item.trend_value }{ item.trend_unit }</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="bottom-con2 h-100">
							<div className="text">供给侧</div>
							<div className="box h-100">
								{
									daySupplyList.map((item, i) => {
										return (
											<div className="box-con h-100 flex-1" key={item.title}>
												<div className="p1">
													<div className="name">{ item.title }</div>
													<div className="icon">
														{
															item.title == '可再生能源' &&
															<iconpark-icon size="100%" color="#36BFFA" name="TypePurchasedEnergy"/>
														}
														{
															item.title == '光伏' &&
															<iconpark-icon size="100%" color="#FDB022" name="TypeThunderbolt"/>
														}
													</div>
												</div>
												{
													item.data.map((el, j) => {
														return (
															<div className="p2" key={el.key}>
																<div className="name">{ el.key }</div>
																<div className="right">
																	<div className="value">{ el.value }</div>
																	<div className="unit">{ el.unit }</div>
																</div>
															</div>
														)
													})
												}
												
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="bottom-con3 h-100">
							<div className="text">
								<div>模型参数</div>
							</div>
							<div className="box h-100">
								<div className="box-con h-100" style={{flex: 1}}>
									<div className="p1">
										<div className="name">环境</div>
										<div className="icon">
											<iconpark-icon size="100%" color="#32D583" name="TypeFugitiveEmission"></iconpark-icon>
										</div>
									</div>
									<div className="p2">
										<div className="name">温度</div>
										<div className="right">
											<div className="value">{ environment.temperature }</div>
											<div className="unit">℃</div>
										</div>
									</div>
									<div className="p2">
										<div className="name">湿度</div>
										<div className="right">
											<div className="value">{ environment.humidness }</div>
											<div className="unit">%</div>
										</div>
									</div>
									<div className="p2">
										<div className="name">日照量</div>
										<div className="right">
											<div className="value">{ environment.rad }</div>
											<div className="unit">W/㎡</div>
										</div>
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

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state) {
    return {
        timeUnit: state.common.timeUnit,
		dayDeviceTypeColor: state.reduction.dayDeviceTypeColor
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // setDayDeviceTypeName: (value) => dispatch({ type: 'SET_DAY_DEVICE_TYPE_NAME', value })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReductionDay);

