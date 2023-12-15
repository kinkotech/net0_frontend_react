import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import { Select } from 'antd';
import Echarts from '@/components/Echarts';

const BottomRight = function () {
    let [checked, setChecked] = useState(false);
    let [unit, setUnit] = useState('kgCO₂e');
    let [unitList, setUnitList] = useState([
        { value: 'tCO₂e', label: 'tCO₂e' },
        { value: 'kgCO₂e', label: 'kgCO₂e' }
    ]);
    let [option, setOption] = useState({})

    useEffect(() => {
        getCarbonTrendSingle('2023-01', '2023-12')
    }, [unit])

    // 获取数据
    const getCarbonTrendSingle = async (start, end) => {
        // type ● single: 只查看本周期数据;● comparison:包含去年同期对比
        let params = {
            park_id: 0,
            start,
            end,
            type: 'single',
            unit: unit
        }
        await api.GetCarbonTrend(params).then(res=>{
            getOptions(res)
        })
    }

    // 同期对比
    const getCarbonTrendComparison = async (start, end) => {
        // type 
        // ● single: 只查看本周期数据;
        // ● comparison:包含去年同期对比
        let params = {
            park_id: 0,
            start,
            end,
            type: 'comparison',
            unit: unit
        }
        await api.GetCarbonTrend(params).then(res=>{
            getOptions1(res)
        })
    }

    // 图表option
    const getOptions = (res) => {
        let _this = this;
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];

        res.forEach(el => {
            if(el.name == 'date') {
                xAxisData = el.value;
            } else if (el.name == '直接排放') {
                data1 = el.value;
            } else if (el.name == '购买能源排放') {
                data2 = el.value;
            } else if (el.name == '上下游排放') {
                data3 = el.value;
            }
        })

        let options = {
            tooltip: {
            trigger: 'axis',
                show: true,
                formatter(params) {
                    let total = 0;
                    let tipList = params.map((seg) => {
                        let { value, seriesName, color } = seg;
                        if (typeof(value) == 'object') {
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
            color: ['#0BCFC8', '#B596FC', '#4565F7'],
            legend: {
                bottom: '5%',
                icon: 'circle',
                itemGap: 25,
                itemWidth: 12,
                itemHeight: 9,
                textStyle: {
                    fontSize: 12,
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
                data: xAxisData,
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
                        if (i == 0) {
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
            series: [
            {
                name: '直接排放',
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
                data: data1
            },
            {
                name: '购买能源排放',
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
                data: data2
            },
            {
                name: '上下游排放',
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
                data: data3
            },
            ]
        }
        setOption(options)
    }

    // 环比option
    const getOptions1 = (res)=> {
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        
        res.forEach(el => {
            if(el.name == 'date') {
                xAxisData = el.value;
            } else if (el.name == '上周期') {
                data1 = el.value;
            } else if (el.name == '本周期') {
                data2 = el.value;
            }
        })
        this.options1 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
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
                },
            },
            color: ['#FFCF5F', '#999'],
            grid: {
                left: '3%',
                right: '3%',
                top: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
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
                            if (i == 0) {
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
                }
            ],
            yAxis: [
                {
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
                        alignWithLabel: true,
                    }
                }
            ],
            series: [
                {
                    name: '本期',
                    barWidth: '15%',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data2
                },
                {
                    name: '上期',
                    barWidth: '15%',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data1
                }
            ]
        }
    }

    const getTipDot = function({ radius = 5, color = "red" } = {}) {
		return `<span style='width:${radius * 2}px;height:${radius * 2}px;display:inline-block;border-radius: ${radius}px;background:${color};margin:0px 3px;'></span>`
	}


    // 单位切换
    const changeUnit = (val) => {
        setUnit(val)
        // if(checked) {
        //     getCarbonTrendComparison(this.footBoard.start, this.footBoard.end);
        //     getOptions1()
        // } else {
        //     getCarbonTrendSingle(this.footBoard.start, this.footBoard.end);
        //     getOptions()
        // }
    }


    return (
        <div className="card d-flex flex-column w-100 h-100">
            <div className="top">
                <ConTitle title="碳足迹趋势" fontSize=".18rem" showPopver={true} popverContent="popver" />
                <div className="top-right">
                    {/* <a-checkbox v-model="checked" @change="changeChecked">环比</a-checkbox> */}
                    {/* <a-select
                    v-model="unit"
                    style="width: 1.5rem"
                    @change="handleChange"
                    className="kinko-selection"
                    >
                    <a-select-option :value="item" v-for="item in selectUnit" :key="item">{{ item }}</a-select-option>
                </a-select> */}
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
                <Echarts id='footCenter' option={option} />
                {/* {
                checked ? 
                <Echart
                :options="options1"
                height="100%"
                width="100%"
                id="board-middle-chart1"
                v-if="checked"
                ></Echart>
                :
                <Echart
                :options="options"
                height="100%"
                width="100%"
                id="board-middle-chart"
                ></Echart>
             } */}
            </div>
        </div>
    )
}

export default BottomRight;