import { useState, useEffect } from 'react';
import api from '@/api/index';
import { connect } from 'react-redux';
import G6 from '@antv/g6';
import './index.scss';

interface Props {
    server_id: string,
    dayDeviceTypeName: any,
    dayDeviceTypeColor: any,
    getGraphItem: any;
    item: any
}

type Item = {
    text: string;
    color: string;
}

const TopologyMap = function(props: Props) {
    let {server_id, dayDeviceTypeName, dayDeviceTypeColor, getGraphItem} = props;
    let [legend, setLegend] = useState<Item[]>([]);
    // let [setGraphObj] = useState(null);

    useEffect(() => {
        if(dayDeviceTypeName.length === 0) return;
        getStrategyByServer(server_id)
        
    }, [server_id, dayDeviceTypeName])


    // 配置tooltip
    const tooltip = new G6.Tooltip({
        getContent (e:any) {
            let isSumZero = e.item.getModel().isSumZero;
            let donutAttrs = e.item.getModel().donutAttrs;
            let donutColorMap = e.item.getModel().donutColorMap;
            
            interface DonutObj {
                key: string,
                value: any
            }
            let donutColorMapArr:DonutObj[] = [];

            Object.keys(donutColorMap).forEach((item) =>{
                // 根据设备名称显示对应颜色
                let index = dayDeviceTypeName.indexOf(item);

                donutColorMapArr.push({
                    key: item,
                    value: dayDeviceTypeColor[index]
                })
            })
            let keysArr = Object.keys(donutAttrs);
            let valuesArr = Object.values(donutAttrs);

            const outDiv:any = document.createElement('div');
            outDiv.style.width = '1.8rem';
            outDiv.style.zIndex = 9999;
            outDiv.style.left = 0;
            outDiv.style.top = 0;
            outDiv.innerHTML = `
                <div>
                    <div style='font-size: .18rem'>${e.item.getModel().label}</div>
                    <ul>
                        ${
                            keysArr.map((item, i) => {
                                let colorIndex = dayDeviceTypeName.indexOf(item);
                                let color = dayDeviceTypeColor[colorIndex];
                                if (!color) {
                                return ''
                                } else {
                                    return `<li style='font-size: .16rem;margin-top:.12rem'>
                                            <span 
                                                style='display:inline-block;width:.1rem;height:.1rem;border-radius:100%;
                                                background:${color}'></span>
                                            <span>${item}: ${isSumZero === 0 ? 0 : valuesArr[i]}</span>
                                        </li>`
                                }
                                
                            }).join('')
                        }
                    </ul>
                </div>`
            return outDiv
        },
        itemTypes: ['node']
    })

     // Background Animation
    G6.registerNode(
        'background-animate',
        {
            afterDraw(cfg:any, group:any) {
            const r = cfg.size / 2;
            const back1 = group.addShape('circle', {
                zIndex: -3,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.8,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back1-shape',
            });
            const back2 = group.addShape('circle', {
                zIndex: -2,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.8,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back2-shape',
            });
            const back3 = group.addShape('circle', {
                zIndex: -1,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.8,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back3-shape',
            });
            group.sort(); // Sort according to the zIndex
            back1.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 0,
                    repeat: true, // repeat
                },
            ); // no delay
            back2.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 1000,
                    repeat: true, // repeat
                },
            ); // 1s delay
            back3.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 2000,
                    repeat: true, // repeat
                },
            ); // 3s delay
            },
        },
        'donut',
    );

    const init = (data:any, donutColorMap: any) => {
        const container = document.getElementById('carbonMapContainer');
        let graph:any = null;
    
        if (!container) return;
    
        const width = container.scrollWidth;
        const height = container.scrollHeight;
        graph = new G6.Graph({
            container: 'carbonMapContainer',
            width,
            height,
            fitView: true,
            maxZoom: 3, // 最大缩放比例
            plugins: [tooltip],
            defaultNode: {
                type: 'donut',
                donutColorMap,
                color: 'rgba(255, 255, 255, 0.5)',
            },
            modes: {
                default: ['drag-canvas', 'zoom-canvas', 'drag-node']
            },
            layout: {
                type: 'force',
                preventOverlap: true,
                linkDistance: (d:any) => {
                    if (d.target.level === 1) {
                        return 80;
                    }
                    if (d.target.level === 2) {
                        return 100;
                    }
                },
                // 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
                nodeStrength: (d:any) => {
                    if (d.level === 2) {
                        return -100;
                    }
                    return 1
                },
                // 边的作用力，范围是 0 到 1，默认根据节点的出入度自适应
                edgeStrength: () => {
                    return .1;
                },
            }
        });
    
        graph.node((node:any) => {
            if (node.level === 1) {
                return {
                    type: 'background-animate',
                    size: 90,
                    style:{
                        fill: '#1E1E1E'
                    },
                    labelCfg: {
                        position: 'center',
                        style: {
                            fill: '#fff',
                            fontSize: 18,
                            fontWeight: 700
                        },
                    },
                }
            }
            if (node.level === 2) {
                return {
                    size: 35,
                    style:{
                        fill: '#1E1E1E',
                        lineWidth: 1,
                        stroke: '#1E1E1E'
                    },
                    labelCfg: {
                        position: 'center',
                        style: {
                            fill: '#fff',
                            fontSize: 12,
                        },
                    },
                }
            }
            return {}
        });
        graph.data(data);
        graph.render();
    
        function refreshDragedNodePosition(e:any) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        }
        graph.on('node:dragstart', (e:any) => {
            graph.layout();
            refreshDragedNodePosition(e);
        });
        graph.on('node:drag', (e:any) => {
            refreshDragedNodePosition(e);
        });
    
        // 节点点击
        graph.on('node:click', (e:any) => {
            let id = e.item._cfg.model.id;
            let label = e.item._cfg.model.label;
            getGraphItem({
                id,
                label
            })
            // this.server_id  = id;
    
            // this.$emit('item', {
            //     id,
            //     label
            // });
        })
    
        if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
        };

        // setGraphObj(graph);
    }

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
                if (sum === 0) {
                    for(let j in data.nodes[i].donutAttrs) {
                        data.nodes[i].donutAttrs[j] = 1; // 随意的Number只为占位
                    }
                }

                // donutAttrs只有一个数据时,需手动添加一条数据为页面展示使用，但是要在tooltip里去掉
                if(arr.length === 1) {
                    data.nodes[i].donutAttrs['test'] = 0.000000000000000000000000000000000001; // 随意的key只为占位,数值极限小是为了不被显示出来
                }
            })

            // 甜甜圈全部色系
            let donutColorMapStr:any = {}
            dayDeviceTypeName.forEach((el: any, i: number) => {
                donutColorMapStr[el] = dayDeviceTypeColor[i];
            })
            // 判断是否已经渲染数据，如果有则不做任何渲染
            const container = document.getElementById('carbonMapContainer');
            if (container && container.innerHTML) return;

            init(data, donutColorMapStr);

            let legendArr: Item[] = [];
            // 图例颜色
            res.legend.forEach((item: any) => {
                let index = dayDeviceTypeName.indexOf(item)
                legendArr.push({
                    text: item,
                    color: dayDeviceTypeColor[index]
                })
            })
            setLegend(legendArr)
        })
    }

	return (
        <div className='carbon-map w-100'>
            <div id="carbonMapContainer" className="w-100"></div>
            <ul className='legend'>
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
        dayDeviceTypeColor: state.reduction.dayDeviceTypeColor
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setServer_id: () => dispatch({ type: 'SET_SERVER_ID' })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TopologyMap);
