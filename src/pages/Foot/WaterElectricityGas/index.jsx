import { useState, useEffect } from 'react'
import { FootLayout } from '@/pages/Foot/index';
import { connect } from 'react-redux';
import Echarts from '@/components/Echarts';
import footApi from '@/api/foot';
import { Statistic } from 'antd';
import TimeLine from '@/components/TimeLine';
import Title from '@/components/Title';
import * as echarts from 'echarts';
import './index.scss';

const WaterElectricityGas = ({start, end, park_id, sidebarFold}) => {
	let [electricity, setElectricity] = useState({
		unit: '',
		total: 0,
		option: {}
	});
	let [gas, setGas] = useState({
		unit: '',
		total: 0,
		option: {}
	});
	let [water, setWater] = useState({
		unit: '',
		total: 0,
		option: {}
	});

	useEffect(() => {
		if (!start || !end) return;
		getWEC(start, end, park_id);

		// 图表自适应方法
        const chart1 = document.getElementById('chart1') && echarts.init(document.getElementById('chart1'));
        chart1 && chart1.resize();

        const chart2 = document.getElementById('chart2') && echarts.init(document.getElementById('chart2'));
        chart2 && chart2.resize();

		const chart3 = document.getElementById('chart3') && echarts.init(document.getElementById('chart3'));
        chart3 && chart3.resize();

	}, [start, end, park_id, sidebarFold])

	// 获取数据
	const getWEC = async(start, end, park_id) => {
		let data = ['electricity', 'gas', 'water']

		for(let i = 0;i<data.length; i++) {
			let option = {};
			let unit = '';
			let total = 0;
			let param = {
                park_id,
                type: data[i],
                start,
                end
            }
			await footApi.GetWEC(param).then(res=>{
				if (res) {
					option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							},
							// formatter(params) {
							// 	let tipList = params.map((seg) => {
							// 		let { value, seriesName, color } = seg;
							// 		if (typeof(value) == 'object') {
							// 			value = value[1]
							// 		}
							// 		return `${_this.getTipDot({ color })}${seriesName}：${value}`;
							// 	})
							// 	return `<div>${params[0].axisValueLabel}<div>`
							// 		+ tipList.join('<br/>') + _this.electricity.unit;
							// }
						},
						grid: {
							left: '10%',
							right: '5%',
							top: '5%',
							bottom: '8%',
							// containLabel: true
						},
						yAxis: {
							type: 'value',
							boundaryGap: [0, 0.01],
							splitLine: {
								show: false
							},
							axisLabel: {
								fontSize: 12,
								color: '#fff'
							},
						},
						xAxis: {
							type: 'category',
							axisLabel: {
								interval: 0,
								// rotate: -40,
								fontSize: 12,
								color: '#fff',
								formatter(data, i) {
									let arr = data.split('-');
									arr = [arr[1], arr[0]];
									arr[0] = Number(arr[0]) + '月';
									// 第一个数据加上 年 月
									if (i === 0) {
										return arr.join("\n");
									} else {
										// 针对每年的1月特殊处理
										if (data.indexOf('01') > -1) {
											return arr.join("\n");
										} else {
											return [`${arr[0]}`];
										}
									}
								}
							},
							axisLine: {
								show: false,
							},
							// 是否显示坐标轴刻度
							axisTick: {
								show: false
							},
							data: res.key
						},
						color: ['#2276FC'],
						series: [
							{
								name: '数量',
								type: 'bar',
								barWidth: '50%',
								data: res.value
							}
						]
					}
					unit = res.unit;
					res.value.forEach(el => {
						// 精度问题 先*再/
						el = el * 100;
						total += el;
					});
					total = total / 100;
					switch (data[i]) {
						case "electricity":
							setElectricity({
								option,
								total,
								unit
							})
							break;
						case "gas":
							setGas({
								option,
								total,
								unit
							})
							break;
						case "water":
							setWater({
								option,
								total,
								unit
							})
							break;
					}
				}
			})
			
		}
	}

	const popverContent = `<p className='info5'></p>
	<p>该报告结合了公用事业账单数据、天气数据和排放因素，为您的企业提供了能源和水使用的全面细分数据看板。</p>
	<p>帮助您的企业了解何时、何地以及使用了多少能源和水，以便告知在哪些方面实现最大的减排目标，并评估实施节能措施后所实现的节约情况。</p>`;

	return (
		<FootLayout>
			<div className="page w-100 h-100">
				<Title title="水电煤看板" fontSize=".18rem" color={'white'} showPopver={true} popverContent={popverContent} showSelect={true}/>
				<TimeLine/>
				<div className="page-right border">
					<div className="page-right-left">
							<div className="page-right-left-title">
								<div className="page-right-left-title-icon">
									<iconpark-icon size="100%" color="rgb(253, 176, 34)" name="TypeBulb" className="icon"></iconpark-icon>
									<span>电</span>
								</div>
							</div>
							<div className="page-right-left-chart">
								<Echarts
									option={electricity.option}
									id='chart1'
									>
								</Echarts>
							</div>
							<div className="page-right-left-bottom">
								<Statistic
									value={electricity.total}
									valueStyle={{ color: '#fff',fontSize:'.5rem',fontWeight: 600 }}
									/>
								<div className="page-right-left-bottom-text">市电（{ electricity.unit }）</div>
							</div>
					</div>
					<div className="page-right-right">
						<div className="page-right-right-top">
								<div className="page-right-right-top-title">
									<div className="page-right-right-top-title-icon">
										<iconpark-icon size="100%" color="#0BCFC8" name="TypeFire" className="icon"></iconpark-icon>
										<span>气</span>
									</div>
								</div>
								<div className="page-right-right-top-chart">
									<div className='page-right-right-top-chart-con'>
										<Echarts
											option={gas.option}
											id="chart2"
											>
										</Echarts>
									</div>
									<div className="page-right-right-top-chart-right flex-1">
										<Statistic
											value={gas.total}
											valueStyle={{ color: '#fff',fontSize:'.5rem',fontWeight: 600 }}
											/>
										<div className="page-right-right-top-chart-right-text">天然气（{ gas.unit }）</div>
									</div>
								</div>
						</div>
						<div className="page-right-right-bottom">
								<div className="page-right-right-bottom-title">
									<div className="page-right-right-bottom-title-icon">
										<iconpark-icon size="100%" color="#53B1FD" name="TypeWater" className="icon"></iconpark-icon>
										<span>水</span>
									</div>
								</div>
								<div className="page-right-right-bottom-chart">
									<div className='page-right-right-bottom-chart-con'>
										<Echarts
											option={water.option}
											id="chart3"
											>
										</Echarts>
									</div>
									<div className="page-right-right-bottom-chart-right flex-1">
										<Statistic
											value={water.total}
											valueStyle={{ color: '#fff',fontSize:'.5rem',fontWeight: 600 }}
											/>
										<div className="page-right-right-top-chart-right-text">水（{ water.unit }）</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		</FootLayout>
	)
}
// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state) {
    return {
        start: state.foot.start,
		end: state.foot.end,
		park_id: state.foot.park_id,
		sidebarFold: state.foot.sidebarFold,
    };
}
export default connect(mapStateToProps)(WaterElectricityGas);

