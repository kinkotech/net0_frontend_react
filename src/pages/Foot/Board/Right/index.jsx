import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';
import api from '@/api/index';
import { connect } from 'react-redux';
import './index.scss';

const Right = ({start, end, park_id}) => {
    console.log(start,end,'000')
    let [rightTopValue, setRightTopValue] = useState({});
    let [rightBottomValue, setRightBottomValue] = useState([]);
    let [rightCenterValue, setRightCenterValue] = useState({});
    let [trendUp, setTrendUp] = useState(null);
    let [currentYear] = useState('');
    let [preStart, setPreStart] = useState();
    let [preEnd, setPreEnd] = useState();

    useEffect(() => {
        if (!start || !end) return;
        setPreStart(`${start.split('-')[0]-1}-${start.split('-')[1]}`);
        setPreEnd(`${end.split('-')[0]-1}-${end.split('-')[1]}`);
        getCycleComparison(start, end);
        getEnergyTarget(start, end);
        getGreenEnergy(start, end);
    }, [start, end])

    // 本周期总排放量/上一周期总排放量/周期波动
    const getCycleComparison = async (start, end) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetCycleComparison(params).then(res=>{
            setRightCenterValue(res);
            let trendUp = null;
            if(res.trend_symbol.indexOf('-') > -1) {
                trendUp = false
            } else {
                trendUp = true
            }
            setTrendUp(trendUp)
        })
    }

    // 零碳园区能源系统指标
    const getEnergyTarget = async (start, end) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetEnergyTarget(params).then(res=>{
            setRightBottomValue(res)
        })
    }
    
    // 绿色能源占比
    const getGreenEnergy = async (start, end) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetGreenEnergy(params).then(res=>{
            setRightTopValue(res)


            // setTimeout(() => {
            //     // 计算绿色电力占比 圆圈的大小
            //     if (document.querySelector('.right-circle .ant-progress-inner')) {
            //         document.querySelector('.right-circle .ant-progress-inner').style.width = '0.7rem';
            //         document.querySelector('.right-circle .ant-progress-inner').style.height = '0.7rem';
            //     }
            // }, 0);
                
        })
    }

    return (
        <div className="foot-page-right border w-100 h-100">
            <div className="title fw-600">碳足迹评测</div>
            <div className="right-bottom h-100">
                <div className="right-bottom-con1">
                    <div className="item0">
                        <Statistic
                            title="绿色电力占比"
                            value={rightTopValue.percen}
                            valueStyle={{ color: '#12B76A',fontSize:'.36rem',fontWeight: 600 }}
                            suffix='%'
                            />
                        {/* <a-progress type="circle" :percent="rightTopValue.percent" :width="progressSize" strokeColor="#12B76A" className="right-circle">
                            <template #format="percent">
                                <div className="icon">
                                    <iconpark-icon size="100%" color="#12B76A" name="TypeThunderbolt"></iconpark-icon>
                                </div>
                            </template>
                        </a-progress> */}
                    </div>
                    <div className="item1">
                        <div className="text">相当于减少tCO₂排放</div>
                        <div className="p">
                            <Statistic
                                value={rightTopValue.reduce}
                                valueStyle={{ color: '#12B76A',fontSize:'.36rem',fontWeight: 600 }}
                                suffix={rightTopValue.unit}
                                />
                            <div className="type-fire-icon">
                                <iconpark-icon size="100%" color="#12B76A" name="TypeFire" className="icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-bottom-con2">
                        <div className="item1">
                            <div>本周期总排放量({ start }至{ end })</div>
                            <div className="center">
                                <Statistic
                                    value={rightCenterValue.emission}
                                    valueStyle={{ color: rightCenterValue.emission-rightCenterValue.last_emission > 0 ? '#EF8F8F' : '#12B76A',fontSize:'.3rem',fontWeight: 600 }}
                                    suffix='tCO₂e'
                                    />
                            </div>
                        </div>
                        <div className="item1">
                            <div>上一周期总排放量({ preStart }至{ preEnd })</div>
                            <div className="center">
                                <Statistic
                                    value={rightCenterValue.last_emission}
                                    valueStyle={{ color: rightCenterValue.last_emission-rightCenterValue.emission > 0 ? '#EF8F8F' : '#12B76A',fontSize:'.3rem',fontWeight: 600 }}
                                    suffix='tCO₂e'
                                    />
                            </div>
                        </div>
                        <div className="item1">
                            <div>周期环比</div>
                            <div className="flex item1-zqbd">
                                <div className="num">
                                    <Statistic
                                    value={rightCenterValue.trend}
                                    valueStyle={{ color: trendUp ? '#EF8F8F' : '#12B76A',fontSize:'.3rem',fontWeight: 600 }}
                                    />
                                    <div className={trendUp ? 'icon up' : 'icon'}>
                                        <iconpark-icon size="100%" color={trendUp ? '#EF8F8F' : '#12B76A'} name="down-one"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="right-bottom-center">
                    <div className="right-bottom-center-title">
                        <div className="text">
                            <div>零碳园区能源系统{currentYear}年度指标</div>
                        </div>
                        <div className="right-bottom-center-right">实际/目标</div>
                    </div>
                    <div className="right-bottom-center-con h-100">
                        {
                            rightBottomValue.map((item, i) => {
                                return (
                                    <div className="right-bottom-center-con-item" key={i}>
                                        <div className="right-bottom-center-con-item-left">
                                            <div className="right-bottom-center-con-item-icon">
                                                <iconpark-icon size="100%" color="#0BA5EC" name={item.icon}/>
                                            </div>
                                            <div className="name">{ item.title }</div>
                                        </div>
                                        <div className="right-bottom-center-con-item-right"><span className={item.num =='有' ? 'blue span fw-600' : 'span fw-600'}>{ item.num }</span> / { item.total }</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
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
        setSidebarFold: () => dispatch({ type: 'SET_SIDEBAR_FOLD' })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Right);