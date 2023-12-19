import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import Echarts from '@/components/Echarts';

const BottomRight = function () {
    let [unit, setUnit] = useState('kgCO₂e');
    let [option, setOption] = useState({})

    useEffect(() => {
        getParkComparison('2023-01', '2023-12')
    }, [])

    // 获取数据
    const getParkComparison = async (start, end) => {
        let params = {
            start,
            end
        }
       
        await api.GetParkComparison(params).then(res=>{
            let value = res.value;
            let indicatorList = [];
            setUnit(res.unit)
            let max = Math.max.apply(null, value);
            res.key.forEach(el => {
                indicatorList.push({
                    name: el,
                    max
                })
            })
            getOptions(indicatorList, value)
        })
    }

    const getOptions = (indicatorList, value) => {
        let options = {
            color: ['#FFCF5F', '#D81B60'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                bottom: '-2%',
                itemWidth: 12,
                itemHeight: 2,
                itemGap: 14,
                textStyle: {
                    fontSize: 12,
                    color: '#fff',
                },
            },
            radar: [
                {
                    indicator: indicatorList,
                    center: ['50%', '45%'],
                    radius: '70%', // //雷达图半径
                    splitNumber: 4,
                    nameGap: 0, // 指示器名称和指示器轴的距离
                    name: {
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 12
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.06)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.06)'
                        }
                    }
                },
            ],
            series: [
                {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                },
                data: value
                }
            ]
        }
        setOption(options)
    }


    return (
        <div className="bottom-left d-flex flex-column w-100 h-100">
            <ConTitle title="园区高碳排活动周期对比" fontSize=".18rem" showPopver={true} popverContent="popverContent"/>
            <div className="content flex-1">
                <Echarts
                option={option}
                id="board-b-r-chart"
                />
            </div>
        </div>
    )
}

export default BottomRight;