import { useEffect, useState } from 'react';
import api from '@/api/index';
import Echarts from '@/components/Echarts';
import { connect } from 'react-redux';

const colors = [];
const xColors = [];
for(let i = 0; i < 24; i++) {
    colors.push('#0BCFC8');
    xColors.push('rgba(255, 255, 255, .85)')
}
const TimeChart = ({park_id, setStart, setEnd, startIndex, endIndex, getXData}) => {
    let [option, setOption] = useState({});
    let [colorList, setColorList] = useState(colors);
    let [xFontcolor, setxFontcolor] = useState(xColors);

    useEffect(() => {
        getParams(24);
    },[startIndex, endIndex])

    /**
     * 获取柱形图的开始日期和结束日期
     * @param {Number} totalMonth 获取最近totalMonth个月
     */
    const getParams = (totalMonth) => {
        let dataArr = [];
        let data = new Date();
        let start = '';
        let end = '';
        data.setMonth(data.getMonth() + 1 + 1, 1)//获取到当前月份的后一个月,设置月份
        for (let i = 0; i < totalMonth; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            let m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            dataArr.push(data.getFullYear() + "-" + m)
        }
        start = dataArr[totalMonth - 1];
        end = dataArr[0];
        getEmissionTimeline(start, end);
    }

    // 柱形图options
    const getOptions = (data, xAxisData) => {
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
                        color: function(value, index) {
                            if (index < startIndex || index > endIndex) {
                                xFontcolor[index] = 'rgba(255, 255, 255, .12)';
                            } else {
                                xFontcolor[index] = 'rgba(255, 255, 255, .85)';
                            }
                            return xFontcolor[index]
                        }
                    },
                    formatter(data, i) {
                        let text = data;
                        let arr = text.split('-');
                        // 第一个数据加上 年 月
                        if (i == 0) {
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
                        color:function(params){
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
    const getEmissionTimeline = async (start, end) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetEmissionTimeline(params).then(res=>{
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
    const modifyColor = (option, startIndex, endIndex, data) => {
        let colorList = [];
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
                        color:function(params){
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
function mapStateToProps(state) {
    return {
        start: state.foot.start,
        end: state.foot.end,
        park_id: state.foot.park_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setStart: (value) => dispatch({ type: 'SET_START', value}),
        setEnd: (value) => dispatch({ type: 'SET_END', value})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeChart);