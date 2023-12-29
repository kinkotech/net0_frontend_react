import { useState, useEffect } from 'react';
import api from '@/api/index';
import ConTitle from '@/components/ConTitle';
import Echarts from '@/components/Echarts';
import * as echarts from 'echarts';
import { connect } from 'react-redux';

const BottomLeft = function ({start, end, park_id}) {
    let [unit, setUnit] = useState('');
    let [option, setOption] = useState({});
    let [number, setNumber] = useState(0);
    let [sum, setSum] = useState(0);
    let [max, setMax] = useState(0);

    useEffect(() => {
        if (!start || !end) return;
        getActivityComparison(start, end, park_id);

        // 下左图表
        const boardBLChart = echarts.init(document.getElementById('board-b-l-chart'));
        boardBLChart && boardBLChart.resize();
    }, [start, end])

    // 获取数据
    const getActivityComparison = async (start, end, park_id) => {
        let params = {
            park_id,
            start,
            end,
        }
        await api.GetActivityComparison(params).then(res=>{
            let result = res;
            let key = result.key;
            let data = [];

            setUnit(res.unit);

            result.value.forEach((el, i) => {
                data.push({
                    value: el,
                    name: key[i]
                })
            });

            let sum = 0;
            let max = 0;
            data.forEach(item => {
                sum += item.value;
                if(item.value >= max) max = item.value;
            })

            // 放大规则
            let number = Math.round(max * 0.5);
            data = data.map(item => {
                return {
                    value: number + item.value,
                    name: item.name
                }
            })
            setNumber(number);
            setSum(sum);
            setMax(max);
            getOptions(data);
        })
    }

    const getOptions = (data) => {
        let options = {
            color: ['#12B76A', '#4E5BA6', '#0BA5EC','#2E90FA', '#6172F3', '#7A5AF8', '#EE46BC', '#9E77ED', '#FB6514', '#F63D68'],
            // tooltip: {
            //     trigger: 'item',
            //     formatter: function (param){
            //         let {color, name, value} = param;
            //         return `${getTipDot({ color })}${name}：${(value - number).toFixed(2)} ${unit}`
            //     }
            // },
            legend: {
                itemWidth: 6,
                itemHeight: 6,
                right: 'right',
                top: 'center',
                icon: 'circle',
                itemGap: 5,
                textStyle: {
                    fontSize: 12,
                    color: '#fff',
                },
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                }
            },
            series: [
                {
                    type: 'pie',
                    label: {
                        show: false
                    },
                    radius: ['30%', '80%'],
                    center: ['40%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5,
                        normal: {
                            borderWidth: 5,
                            borderColor: '#1e1e1e'
                        }
                    },
                    data
                }
            ]
        }
        setOption(options)
    }


    return (
        <div className="bottom-left d-flex flex-column w-100 h-100">
            <ConTitle title="范围类别排放量占比" fontSize=".18rem" showPopver={true} popverContent="popverContent"/>
            <div className="content flex-1">
                <Echarts
                option={option}
                id="board-b-l-chart"
                />
            </div>
        </div>
    )
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state) {
    return {
        sidebarFold: state.foot.sidebarFold,
        start: state.foot.start,
        end: state.foot.end,
        park_id: state.foot.park_id
    };
}

export default connect(mapStateToProps)(BottomLeft);