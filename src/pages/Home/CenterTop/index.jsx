import React, { useState, useEffect } from 'react';
import api from '@/api/index';
import G6 from '@antv/g6'


function CenterTop() {
	let [serverId, setServerId] = useState();
	let [list, setList] = useState([]);
	let [graph, setGraph] = useState(null);

	useEffect(() => {
		getGraph(serverId)
    }, [serverId])

	const getCarbonMap = function() {
		const container = document.getElementById('carbonMapBox');

		if (!container) return;

		const width = container.scrollWidth;
		const height = container.scrollHeight || 500;

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
					if (d.level == 2) {
						return -100;
					}
					if (d.level == 3) {
						return -250;
					}
					if (d.level == 4) {
						return -250;
					}
					if (d.level == 5) {
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
			if (node.master == true) {
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
		console.log(list,'list')
		graph.data(list);
		graph.render();

		function refreshDragedNodePosition(e) {
			const model = e.item.get('model');
			model.fx = e.x;
			model.fy = e.y;
		}
		graph.on('node:dragstart', (e) => {
			this.graph.layout();
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
			if (level == 1) return;
			if (!child) return;

			// let nodes = {
			// 	id,
			// 	nodeText,
			// 	level
			// }
			// this.$emit('node', nodes);
		});

		if (typeof window !== 'undefined')
		window.onresize = () => {
			if (!graph || graph.get('destroyed')) return;
			if (!container || !container.scrollWidth || !container.scrollHeight) return;
			graph.changeSize(container.scrollWidth, container.scrollHeight);
		};

		setGraph(() => graph)
	}

	const init = function() {

	}

	const getGraph = async function(serverId) {
		let params = {
			server_id: serverId,
		}
		await api.Graph(params).then(res=>{
			console.log(res)
			setList(() => {
				list = res;
				getCarbonMap()
				init()
			})
		})
	}


    return (
		<div>
			<div id='carbonMapBox'></div>
		</div>
	)
}

export default CenterTop;