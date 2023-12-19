import React, { useState, useEffect, useRef } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import { Select, Checkbox } from 'antd';
import Echarts from '@/components/Echarts';
import { connect } from 'react-redux';
import './index.scss';

const FootCenter = function (props) {
    const { sidebarFold, start, end } = props;

    let [checked, setChecked] = useState(false);
    let [unit, setUnit] = useState('kgCO₂e');
    let [unitList, setUnitList] = useState([
        { value: 'tCO₂e', label: 'tCO₂e' },
        { value: 'kgCO₂e', label: 'kgCO₂e' }
    ]);
    let [option, setOption] = useState({
        tooltip: {
            trigger: 'axis',
                show: true,
                formatter(params) {
                    let total = 0;
                    let tipList = params.map((seg) => {
                        let { value, seriesName, color } = seg;
                        if (typeof(value) === 'object') {
                            value = value[1]
                        }
                        total += value * 100;
                        return `${getTipDot({ color })}${seriesName}：${value}`;
                    })
                    total = total / 100;
                    return `<div>${params[0].axisValueLabel}（总计：${total}）<div>`
                         + tipList.join('<br/>');
                }
            },
            legend: {
                bottom: '5%',
                icon: 'circle',
                itemGap: 25,
                itemWidth: 12,
                itemHeight: 9,
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                },
            },
            grid: {
                left: '3%',
                right: '3%',
                top: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [],
                axisLine: {
                    lineStyle: {
                        color:'rgba(255, 255, 255, .12)'
                    }
                },
                axisLabel: {
                    color: 'rgba(255, 255, 255, .87)',
                    interval: 0,
                    fontSize: 12,
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
            },
            yAxis: {
                type: 'value',
                position: 'right',
                // 网格线
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, .12)'
                    }
                },
                minInterval:1,
                axisLabel: {
                    color: 'rgba(255, 255, 255, .6)',
                    interval: 0,
                    fontSize: 12
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                }
            },
            series: []
    });
    let [xAxis] = useState({
        type: 'category',
        data: [],
        axisLine: {
            lineStyle: {
                color:'rgba(255, 255, 255, .12)'
            }
        },
        axisLabel: {
            color: 'rgba(255, 255, 255, .87)',
            interval: 0,
            fontSize: 12,
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
        }
    });

    let [option1, setOption1] = useState({});

    // const centerRef = useRef(null);

    useEffect(() => {
        getCarbonTrend(start, end);

        
        // window.addEventListener('resize', () => {
        //     console.log('resize')
        // })

        // console.log(centerRef)
    }, [unit, checked, sidebarFold])

    const getChart = (a) => {
        console.log(a)
    }

    // 获取数据
    const getCarbonTrend = async (start, end) => {
        // type ● single: 只查看本周期数据;● comparison:包含去年同期对比
        let params = {
            park_id: 0,
            start,
            end,
            type: !checked ? 'single' : 'comparison',
            unit: unit
        }
        await api.GetCarbonTrend(params).then(res=>{
            !checked ? getOptions(res) : getOption1(res)
        })
    }

    // 图表option
    const getOptions = (res) => {
        let xAxisData = [];
        let series = [];

        res.forEach(el => {
            if(el.name === 'date') {
                xAxisData = el.value;
            } else {
                series.push({
                    name: el.name,
                    type: 'bar',
                    stack: '总量',
                    barWidth: '40%',
                    label: {
                        show: false,
                        formatter:function(val){
                            if(val.value){
                                return val.value
                            }else{
                                return ''
                            }
                        }
                    },
                    data: el.value
                })
            }
        })

        let options = {
            ...option,
            color: ['#0BCFC8', '#B596FC', '#4565F7'],
            xAxis: {
                ...xAxis,
                data: xAxisData
            },
            series
        }
        setOption(options)
    }

    // 环比option
    const getOption1 = (res)=> {
        let xAxisData = [];
        let series = [];
        
        res.forEach(el => {
            if(el.name === 'date') {
                xAxisData = el.value;
            } else {
                series.push({
                    name: el.name === '上周期' ? '本期' : '上期',
                    barWidth: '15%',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: el.value
                })
            }

        })
        let option1 = {
            ...option,
            xAxis: {
                ...xAxis,
                data: xAxisData
            },
            color: ['#FFCF5F', '#999'],
            series
        }
        console.log(option1.series.length)
        setOption1(option1)
    }

    const getTipDot = function({ radius = 5, color = "red" } = {}) {
		return `<span style='width:${radius * 2}px;height:${radius * 2}px;display:inline-block;border-radius: ${radius}px;background:${color};margin:0px 3px;'></span>`
	}

    // 单位切换
    const changeUnit = (val) => {
        setUnit(val)
    }
    // 勾选框状态切换
    const changeChecked = () => {
        setChecked(!checked)
    }

    return (
        <div className="card d-flex flex-column w-100 h-100">
            <div className="top d-flex">
                <ConTitle title="碳足迹趋势" fontSize=".18rem" showPopver={true} popverContent="popver" />
                <div className="top-right">
                    <Checkbox checked={checked} onChange={changeChecked}>环比</Checkbox>
                    <Select
                        className='kinko-selection'
                        defaultValue={unit}
                        style={{ width: '1.5rem' }}
                        onChange={changeUnit}
                        options={unitList}
                    />
                </div>
            </div>
            <div className="content flex-1">
                {/* 默认显示 */}
                {
                    !checked &&
                    <Echarts id='footCenter' option={option}/>
                }
                {/* 环比 */}
                {
                    checked &&
                    <Echarts id='footCenter1' option={option1}/>
                }
            </div>
        </div>
    )
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state) {
    return {
        sidebarFold: state.foot.sidebarFold,
        start: state.foot.start,
        end: state.foot.end
    };
}

export default connect(mapStateToProps)(FootCenter);