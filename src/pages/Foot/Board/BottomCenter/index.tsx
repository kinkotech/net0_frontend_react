import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import Echarts from '@/components/Echarts';
import * as echarts from 'echarts';
import { connect } from 'react-redux';

interface Props {
	start?: string;
    end?: string;
    park_id?: string
}

const BottomCenter: React.FC<Props> = function ({start, end, park_id}) {
    let [unit, setUnit] = useState('');
    let [option, setOption] = useState({});
    console.log(unit)

    useEffect(() => {
        if (!start || !end) return;
        getFactorComparison(start, end, park_id);

        // 图表自适应方法
        const BoardBCChart = document.getElementById('board-b-c-chart') && echarts.init(document.getElementById('board-b-c-chart'));
        BoardBCChart && BoardBCChart.resize();
    }, [start, end, park_id])

    // 获取数据
    const getFactorComparison = async (start: any, end: any, park_id: any) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetFactorComparison(params).then((res: any)=>{
            setUnit(res.unit);
            getOptions(res.value, res.key)
        })
    }

    const getOptions = (data: any, xData: any) => {
        let options = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0%',
                right: '8%',
                top:'5%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'log',
                min: 1,
                logBase: 10,
                axisLine: {
                    show: false
                },
                splitLine: {
                    "show": false
                },
                // 坐标轴刻度XY如何转为科学计数法（a*10的n次方的形式）
                axisLabel: {
                    fontSize: 12,
                    formatter: function(value: any){
                        let indexList = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
                        if (Math.abs(value) > 10){
                            if (value === 0)
                                return '0'
                                // 检查是否已经转化为科学计数了
                                // else if ((value + '').indexOf('e') > 0)
                                //   return (value + '').replace(/e/, 'E')
                            else
                                {
                                    let res = value.toString()
                                    let numN1 = 0
                                    let numN2 = 1
                                    let num1 = 0
                                    let num2 = 0
                                    let t1 = 1
                                    // 计入小数点前后有多少位
                                    for (let k = 0; k < res.length; k++){
                                        if (res[k] === '.')
                                            t1 = 0;
                                        if (t1)
                                            num1++;
                                        else
                                            num2++;
                                    }
                                // 均转换为科学计数法表示
                                if (Math.abs(value) < 1) {
                                    // 小数点后一位开始计算
                                    for (let i = 2; i < res.length; i++){
                                        if (res[i] === '0')
                                            numN2++; //记录10的负指数值（默认值从1开始）
                                        else if (res[i] === '.')
                                            continue;
                                        else
                                            break;
                                    }
                                    let v: any = parseFloat(value);
                                    // 10的numN2次方
                                    v = v * Math.pow(10, numN2);
                                    v = v.toFixed(1) //四舍五入 仅保留一位小数位数
                                    let char = indexList[Number(numN2)];

                                    let str = v.toString() !== '1' ? `${v.toString()}*` : '';

                                    return str + '10' + char;
                                } else if (num1 > 1) {
                                    numN1 = num1 - 1;
                                    let v: any = parseFloat(value);
                                    v = v / Math.pow(10, numN1);
                                    if (num2 > 1)
                                        v = v.toFixed(1);
                                        let char = indexList[Number(numN1)];

                                        let str = v.toString() !== '1' ? `${v.toString()}*` : '';

                                        return str + '10' + char;
                                }
                            }
                        }
                        else
                            return value
                    }
                },
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: 'rgba(255, 255, 255, .87)',
                    fontSize: 12
                },
                // 是否显示坐标轴刻度
                axisTick: {
                    show: false
                },
                data: xData
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    barWidth: '30%',
                    itemStyle:{
                        color: '#2276FC'
                    },
                    data
                }
            ]
        }
        setOption(options)
    }


    return (
        <div className="bottom-left d-flex flex-column w-100 h-100">
            <ConTitle title="活动类型碳足迹对比" showPopver={true} popverContent="popverContent"/>
            <div className="content flex-1">
                <Echarts
                option={option}
                id="board-b-c-chart"
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
        end: state.foot.end,
        park_id: state.foot.park_id
    };
}

export default connect(mapStateToProps)(BottomCenter);