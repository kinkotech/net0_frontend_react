import { useState, useEffect } from 'react';
import api from '@/api/index';
import { connect } from 'react-redux';
import './index.scss';

interface Props {
    server_id: string,
    dayDeviceType: any
}

interface Item {
    text: string;
    color: string;
}

const TopologyMap = function(prop: Props) {
    let {server_id, dayDeviceType} = prop;

    let [legend, setLegend] = useState<Item[]>([]);
    let [data, setData] = useState({})
    let [donutColorMap, setDonutColorMap] = useState({})

    useEffect(() => {
        getStrategyByServer(server_id)
    }, [server_id])

    // 默认显示 优化值 的内容
    const getStrategyByServer = async (server_id: string) => {
        let params = {
            server_id
        }
        await api.GetStrategyByServer(params).then((res:any)=>{

            let data = res.data;
            
            data.nodes.forEach((el: any, i: number) => {
                let sum = 0;
                let arr = Object.values(el.donutAttrs);
                // 如果sum=0，需手动赋值为页面展示使用，但是要在tooltip里归0
                arr.forEach((value: any) => {
                    sum = sum + value;
                })
                data.nodes[i].isSumZero = sum; // 标记是否全为0
                if (sum == 0) {
                    for(let j in data.nodes[i].donutAttrs) {
                        data.nodes[i].donutAttrs[j] = 1; // 随意的Number只为占位
                    }
                }

                // donutAttrs只有一个数据时,需手动添加一条数据为页面展示使用，但是要在tooltip里去掉
                if(arr.length == 1) {
                    data.nodes[i].donutAttrs['test'] = 0.000000000000000000000000000000000001; // 随意的key只为占位,数值极限小是为了不被显示出来
                }
            })

            // 甜甜圈全部色系
            let donutColorMapStr:any = {}
            dayDeviceType.name.forEach((el: any, i: number) => {
                donutColorMapStr[el] = dayDeviceType.color[i];
            })
            setDonutColorMap(donutColorMapStr)

            setData(data)
            let legendArr: Item[] = [];
            // 图例颜色
            res.legend.forEach((item: any) => {
                let index = dayDeviceType.name.indexOf(item)
                legendArr.push({
                    text: item,
                    color: dayDeviceType.color[index]
                })
            })
            console.log(legendArr)
            setLegend(legendArr)
        })
    }

	return (
        <div className='carbon-map w-100'>
            <div id="carbonMapContainer" className="w-100"></div>
            <ul>
                {
                    legend.map((item:any, index) => {
                        return (
                            <li key={index}>
                                <span style={{background: item.color}} className="circle"></span>
                                <span>{ item.text }</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
	)
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state: any) {
    return {
        server_id: state.common.defaultServerId,
        dayDeviceType: state.reduction.dayDeviceType
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setServer_id: () => dispatch({ type: 'SET_SERVER_ID' })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TopologyMap);
