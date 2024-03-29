import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';
import api from '@/api/index';
import { connect } from 'react-redux';
import './index.scss';

type Props = {
    start?: string;
    end?: string;
    park_id?: string;
}

const FootTop: React.FC<Props> = function(props: Props) {
    let {start, end, park_id} = props;

    let [scopeTotal, setScopeTotal]: any = useState({});
    let [scope1, setScope1]: any = useState({});
    let [scope2, setScope2]: any = useState({});
    let [scope3, setScope3]: any = useState({});

    useEffect(() => {
        if (!start || !end) return;
        getScopeTotal(start, end, park_id);
        getScope1(start, end, park_id)
        getScope2(start, end, park_id)
        getScope3(start, end, park_id)
    }, [start, end, park_id])

    //年累积
    const getScopeTotal = async (start: string, end: string, park_id?: string) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetScopeTotal(params).then(res=>{
            setScopeTotal(res)
        })
    }

    //scope1
    const getScope1 = async (start?: string, end?: string, park_id?: string) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetScope1(params).then(res=>{
            setScope1(res)
        })
    }

    //scope2
    const getScope2 = async (start: string, end: string, park_id?: string) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetScope2(params).then(res=>{
            setScope2(res)
        })
    }

    //scope3
    const getScope3 = async (start: string, end: string, park_id?: string) => {
        let params = {
            park_id,
            start,
            end
        }
        await api.GetScope3(params).then(res=>{
            setScope3(res)
        })
    }

    return (
        <div className="board-top h-100">
            {/* 年累积 */}
            <div className="border">
                <div className="text d-flex fw-600">
                    <div>{ scopeTotal.name }</div>
                    <div className="bottom">
                        {
                            scopeTotal.percent && scopeTotal.percent.map((el: any, index: number) => {
                                return (
                                    <span className={'color' + index} style={{width: el+'%'}} key={index}></span>
                                )
                            })
                        }
                    </div>
                </div>
                <Statistic
                    value={scopeTotal.value}
                    precision={2}
                    valueStyle={{ color: '#fff',fontSize:'.26rem' }}
                    suffix={scopeTotal.unit}
                    />
            </div>
            {/* scope1 */}
            <div className="border">
                <div className="text d-flex fw-600">
                    <div>{ scope1.name }</div>
                    <div className="bottom">
                        {
                            scope1.percent && scope1.percent.map((el: any, index: number) => {
                                return (
                                    <span className={'color' + index} style={{width: el+'%'}} key={index}></span>
                                )
                            })
                        }
                    </div>
                </div>
                <Statistic
                    value={scope1.value}
                    precision={2}
                    valueStyle={{ color: '#fff',fontSize:'.26rem' }}
                    suffix={scope1.unit}
                    />
            </div>
            {/* scope2 */}
            <div className="border">
                <div className="text d-flex fw-600">
                    <div>{ scope2.name }</div>
                    <div className="bottom">
                        {
                            scope2.percent && scope2.percent.map((el: any, index: number) => {
                                return (
                                    <span className={'color' + index} style={{width: el+'%'}} key={index}></span>
                                )
                            })
                        }
                    </div>
                </div>
                <Statistic
                    value={scope2.value}
                    precision={2}
                    valueStyle={{ color: '#fff',fontSize:'.26rem' }}
                    suffix={scope2.unit}
                    />
            </div>
            {/* scope3 */}
            <div className="border">
                <div className="text d-flex fw-600">
                    <div>{ scope3.name }</div>
                    <div className="bottom">
                        {
                            scope3.percent && scope3.percent.map((el: any, index: number) => {
                                return (
                                    <span className={'color' + index} style={{width: el+'%'}} key={index}></span>
                                )
                            })
                        }
                    </div>
                </div>
                <Statistic
                    value={scope3.value}
                    precision={2}
                    valueStyle={{ color: '#fff',fontSize:'.26rem' }}
                    suffix={scope3.unit}
                    />
            </div>
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
        setSidebarFold: () => dispatch({ type: 'SET_SIDEBAR_FOLD' })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FootTop);