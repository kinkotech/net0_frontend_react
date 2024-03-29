import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import Echarts from '@/components/Echarts';
import * as echarts from 'echarts';
import { connect } from 'react-redux';

interface Props {
	start?: string;
    end?: string
}

const BottomRight: React.FC<Props> = function ({start, end}) {
    let [unit, setUnit]: any = useState('kgCO₂e');
    let [option, setOption] = useState({})

    useEffect(() => {
        if (!start || !end) return;
        getParkComparison(start, end);

        // 图表自适应方法
        const BoardBRChart = document.getElementById('board-b-r-chart') && echarts.init(document.getElementById('board-b-r-chart'));
        BoardBRChart && BoardBRChart.resize();
    }, [start, end])

    // 获取数据
    const getParkComparison = async (start: any, end: any) => {
        let params = {
            start,
            end
        }
       
        await api.GetParkComparison(params).then((res: any)=>{
            let value = res.value;
            let indicatorList: any[] = [];
            console.log(unit)
            setUnit(res.unit)

            res.key.forEach((el: any) => {
                indicatorList.push({
                    name: el,
                    // max
                })
            })
            getOptions(indicatorList, value)
        })
    }

    const getOptions = (indicatorList: any, data: any) => {
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
                    lineStyle: {
                        width: 4
                    },
                    data
                }
            ]
        }
        setOption(options)
    }


    return (
        <div className="bottom-left d-flex flex-column w-100 h-100">
            <ConTitle title="园区高碳排活动周期对比" showPopver={true} popverContent="popverContent"/>
            <div className="content flex-1">
                <Echarts
                option={option}
                id="board-b-r-chart"
                />
            </div>
        </div>
    )
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state: any) {
    return {
        sidebarFold: state.foot.sidebarFold,
        start: state.foot.start,
        end: state.foot.end
    };
}

export default connect(mapStateToProps)(BottomRight);