import { useState, useEffect } from 'react';
import api from '@/api/index';
import G6 from '@antv/g6';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {getNowDate} from '@/utils/utils';
import CenterTopRight from '../CenterTopRight';
import './index.scss';


function CenterTop(props) {
	let [date] = useState(getNowDate());
	let [serverId, setServerId] = useState('a00000000000000');
	let [list, setList] = useState([]);
	let [graph, setGraph] = useState(null);

	const dateFormat = 'YYYY-MM-DD';
	// let defaultDate = getNowDate();

	useEffect(() => {
		props.getDate(date);
		// 由于图表需要获取数据，因此会将初始化代码放入useEffect中进行更新，这造成了重复的初始化新的图表对象，并创建画布进行二次渲染
		graph && graph.destroy();
		getGraph(serverId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverId])

	const getCarbonMap = function() {
		const container = document.getElementById('carbonMapBox');

		if (!container) return;

		const width = container.scrollWidth;
		const height = container.scrollHeight;

		let graph = null;
		graph = new G6.Graph({
			container: 'carbonMapBox',
			width,
			height,
			fitView: true,
			maxZoom: 3, // 最大缩放比例 （解决 只有一个节点时，节点变得超大）
			layout: {
				type: 'force',
				preventOverlap: true,
				// 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
				nodeStrength: (d) => {
					if (d.level === 2) {
						return -100;
					}
					if (d.level === 3) {
						return -250;
					}
					if (d.level === 4) {
						return -250;
					}
					if (d.level === 5) {
						return -150;
					}
					return -200
				},
				// 边的作用力，范围是 0 到 1，默认根据节点的出入度自适应
				// edgeStrength: (d) => {
				//     return 0.1;
				// },
			},
			modes: {
				default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
			},
			defaultEdge: {
				size: 1,
				color: '#ccc'
			}
		});

		graph.node(node => {
			// 需要动画的样式
			if (node.master === true) {
				if (node.level === 5) {
					return {
						type: 'circle-animate',
						size: 12,
						style:{
							fill: 'rgba(255, 255, 255, 0.5)',
							stroke: '#fff'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#ccc',
							},
						},
					}
				} else if (node.level === 2) {
					return {
						type: 'circle-animate',
						size: 50,
						style:{
							fill: 'rgba(227, 118, 158, 0.12)',
							stroke: '#FEA3B4'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
								fontSize: 14,
							},
						},
					}
				} else if (node.level === 3) {
					return {
						type: 'circle-animate',
						size: 30,
						style:{
							fill: 'rgba(223, 201, 255, 0.12)',
							stroke: '#BDB4FE'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
							},
						},
					}
				} else if (node.level === 4) {
					return {
						type: 'circle-animate',
						size: 25,
						style:{
							fill: 'rgba(255, 255, 255, 0.5)',
							stroke: '#FDDCAB'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
							},
						},
					}
				}
			} else {
				// 不需要的动画样式
				if (node.level === 5) {
					return {
						size: 12,
						style:{
							fill: 'rgba(255, 255, 255, 0.5)',
							stroke: '#fff'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#ccc',
							},
						},
					}
				} else if (node.level === 2) {
					return {
						size: 50,
						style:{
							fill: 'rgba(227, 118, 158, 0.12)',
							stroke: '#FEA3B4'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
								fontSize: 14,
							},
						},
					}
				} else if (node.level === 3) {
					return {
						size: 30,
						style:{
							fill: 'rgba(223, 201, 255, 0.12)',
							stroke: '#BDB4FE'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
							},
						},
					}
				} else if (node.level === 4) {
					return {
						size: 25,
						style:{
							fill: 'rgba(255, 255, 255, 0.5)',
							stroke: '#FDDCAB'
						},
						labelCfg: {
							position: 'center',
							style: {
								fill: '#fff',
							},
						},
					}
				}
			}
			// 电试院的样式
			if (node.level === 1) {
				return {
					type: 'background-animate',
					color: 'rgba(11, 207, 200, 0.3)',
					size: 90,
					style:{
						fill: 'rgba(11, 207, 200, 0.3)',
						stroke: '#0BCFC8'
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
			return {}
		});
		graph.paint();
		graph.data(list);
		graph.render();
		

		function refreshDragedNodePosition(e) {
			const model = e.item.get('model');
			model.fx = e.x;
			model.fy = e.y;
		}
		graph.on('node:dragstart', (e) => {
			graph.layout();
			refreshDragedNodePosition(e);
		});
		graph.on('node:drag', (e) => {
			refreshDragedNodePosition(e);
		});

		// 节点点击
		graph.on('node:click', async (e) => {
			let id = e.item._cfg.model.id;
			let level = e.item._cfg.model.level;
			let child = e.item._cfg.model.child;
			let nodeText = e.item._cfg.model.label;
			// level == 1 不可点击
			// 无子节点 不可点击
			if (level === 1) return;
			if (!child) return;

			let nodes = {
				id,
				nodeText,
				level
			}
			setServerId(id)
			props.getNodes(nodes);
		});

		if (typeof window !== 'undefined')
		window.onresize = () => {
			if (!graph || graph.get('destroyed')) return;
			if (!container || !container.scrollWidth || !container.scrollHeight) return;
			graph.changeSize(container.scrollWidth, container.scrollHeight);
		};

		setGraph(() => graph)
	}

	const getGraph = async function(serverId) {
		let params = {
			server_id: serverId,
		}
		await api.Graph(params).then(res=>{
			setList(() => {
				list = res;
				getCarbonMap()
			})
		})
	}

	// 时间切换
	const onChange = (date, dateString) => {
		props.getDate(dateString)
	};

	// 刷新
	const refresh = function() {
		setServerId('a00000000000000');
		let nodes = {
			id: 'a00000000000000',
			nodeText: '电试院',
			level: 1
		}
		props.getNodes(nodes);
	}


    return (
		<div className='center-top h-100'>
			<div id='carbonMapBox' className='h-100'></div>
			<div className="refresh-icon pointer" onClick={refresh}>
				<iconpark-icon size="100%" color="#0BCFC8" name="refresh-9mhn0n62"></iconpark-icon>
			</div>
			<DatePicker 
				onChange={onChange}
				defaultValue={dayjs(date, dateFormat)}
				format={dateFormat}
				allowClear={false}
				size='large'
				superNextIcon
				className='w-100 kiko-date'/>
			<div className='right h-100'>
				<CenterTopRight date={date} serverId={serverId}/>
			</div>
		</div>
	)
}

export default CenterTop;