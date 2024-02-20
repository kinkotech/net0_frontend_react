import React, { useEffect, useState } from 'react';
import api from '@/api/index';
import Echarts from '@/components/Echarts';
import { connect } from 'react-redux';

const colors: any[] = [];
const xColors: any[] = [];
for(let i = 0; i < 24; i++) {
    colors.push('#0BCFC8');
    xColors.push('rgba(255, 255, 255, .85)')
}

interface Props {
	park_id?: string;
    setStart?: any;
    setEnd?: any;
    startIndex?: any;
    endIndex?: any;
    getXData?: any
}

const TimeChart: React.FC<Props> = ({park_id, setStart, setEnd, startIndex, endIndex, getXData}) => {
    let [option, setOption] = useState({});
    let [colorList] = useState(colors);
    let [xFontcolor] = useState(xColors);

    useEffect(() => {
        getParams(24);
    },[startIndex, endIndex, park_id])

    /**
     * 获取柱形图的开始日期和结束日期
     * @param {Number} totalMonth 获取最近totalMonth个月
     */
    const getParams = (totalMonth: any) => {
        let dataArr = [];
        let data = new Date();
        let start = '';
        let end = '';
        data.setMonth(data.getMonth() + 1 + 1, 1)//获取到当前月份的后一个月,设置月份
        for (let i = 0; i < totalMonth; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            let m: any = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            dataArr.push(data.getFullYear() + "-" + m)
        }
        start = dataArr[totalMonth - 1];
        end = dataArr[0];
        getEmissionTimeline(start, end);
    }

    // 柱形图options
    const getOptions = (data: any, xAxisData: any) => {
        let option = {
            grid: {
                left: 0,
                right: 0,
                top: '10%',
                bottom: '75%',
            },
            backgroundColor:'rgba(128, 128, 128, 0)',
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color:'rgba(255, 255, 255, .12)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    fontSize: 10,
                    textStyle: {
                        color: function(value: any, index: number) {
                            console.log(value)
                            if (index < startIndex || index > endIndex) {
                                xFontcolor[index] = 'rgba(255, 255, 255, .12)';
                            } else {
                                xFontcolor[index] = 'rgba(255, 255, 255, .85)';
                            }
                            return xFontcolor[index]
                        }
                    },
                    formatter(data: any, i: number) {
                        let text = data;
                        let arr = text.split('-');
                        // 第一个数据加上 年 月
                        if (i === 0) {
                            return `${arr[0]}-${arr[1]}`
                        } else {
                            // 针对每年的1月特殊处理
                            if (text.indexOf('01') > -1) {
                                return `${arr[0]}-${arr[1]}`
                            } else {
                                text = `${Number(arr[1])}月`;
                                return [`${text}`];
                            }
                        }
                    }
                }
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [
                {
                    data,
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle:{
                        color:function(params: any){
                            return colorList[params.dataIndex]
                        }
                    },
                }
            ]
        }
        setOption(option);
        modifyColor(option, startIndex, endIndex, data)
    }

    // 获取数据
    const getEmissionTimeline = async (start: any, end: any) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetEmissionTimeline(params).then((res: any)=>{
            getOptions(res.value, res.key);
            // 传参给父元素
            getXData(res.key)
            // redux方法 初始化
            setStart(res.key[startIndex]);
            setEnd(res.key[endIndex]);
            
        })
    }

    /**
     * 
     * @param {Number} startIndex 开始时间的位置
     * @param {Number} endIndex 结束时间的位置
     * @returns 返回柱形图颜色
     */
    const modifyColor = (option: any, startIndex: any, endIndex: any, data: any) => {
        let colorList: any[] = [];
        let xFontcolor = [];
        for(let i = 0; i < 24; i++) {
            if (i < startIndex || i > endIndex) {
                colorList[i] = 'rgba(153,153,153, .2)';
                xFontcolor[i] = 'rgba(255, 255, 255, .12)';
            } else {
                colorList[i] = '#0BCFC8';
                xFontcolor[i] = 'rgba(255, 255, 255, .85)';
            }
        }
        setOption({
            ...option,
            series: [
                {
                    data,
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle:{
                        color:function(params: any){
                            return colorList[params.dataIndex]
                        }
                    },
                }
            ]
        })
    }

    return (
        <div className='w-100' style={{height: '50px'}}>
            <Echarts
            option={option}
            id="time-chart"
            />
        </div>
    )
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state: any) {
    return {
        start: state.foot.start,
        end: state.foot.end,
        park_id: state.foot.park_id
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setStart: (value: any) => dispatch({ type: 'SET_START', value}),
        setEnd: (value: any) => dispatch({ type: 'SET_END', value})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeChart);