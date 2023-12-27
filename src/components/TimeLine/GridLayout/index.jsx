import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { connect } from 'react-redux';
import './index.scss';

const ReactGridLayout = WidthProvider(RGL);

// https://www.jianshu.com/p/fb20bc2cfb0d 参考api地址

class GridLayout extends React.PureComponent {
	
	static defaultProps = {
		className: "layout",
		items: 1,
		rowHeight: 15,
		cols: 24
	};

	constructor(props) {
		super(props);
		const layout = this.generateLayout();

		this.state = { 
			layout,
			// xData: ['2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12', '2024-01']
		 };


		 console.log(this)
	}

	generateDOM() {
		return _.map(_.range(this.props.items), function (i) {
			return (
				<div key={i} >
					<span className="text"></span>
				</div>
			);
		});
	}

	generateLayout() {
		let xIndex = 11; // 默认从第11个下标开始
		let containWidth = 12; // 默认显示12个月
		const p = this.props;
		// 默认情况下，调整大小图标仅显示在右下（东南）角。 
		// 's' - South handle (bottom-center)
		// 'w' - West handle (left-center)
		// 'e' - East handle (right-center)
		// 'n' - North handle (top-center)
		// 'sw' - Southwest handle (bottom-left)
		// 'nw' - Northwest handle (top-left)
		// 'se' - Southeast handle (bottom-right)
		// 'ne' - Northeast handle (top-right)

		// const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
		const availableHandles = [ "w", "e"]

		return _.map(new Array(p.items), function (item, i) {
			return {
				x: xIndex,
				y: 2,
				w: containWidth,
				h: 2,
				i: '0', // 元素的id
				minW: 1,
				resizeHandles: availableHandles
			};
		});
	}
	// 拖拽停止
	onDragStop(layout) {
		console.log(layout,'onDragStop')
		let startIndex = layout[0].x;
		let endIndex = layout[0].x + layout[0].w - 1;
		this.getStartIndex(startIndex);
		this.getEndIndex(endIndex)
		// redux方法
		this.setStart(this.xData[startIndex]);
		this.setEnd(this.xData[endIndex])
	}

	// 缩放停止
	onResizeStop(layout) {
		console.log(layout,'onResizeStop')
		let startIndex = layout[0].x;
		let endIndex = layout[0].x + layout[0].w - 1;
		this.getStartIndex(startIndex);
		this.getEndIndex(endIndex)
		// redux方法
		this.setStart(this.xData[startIndex]);
		this.setEnd(this.xData[endIndex])
	}

	render() {
		return (
			<ReactGridLayout
				layout={this.state.layout}
				onDragStop={this.onDragStop}
				onResizeStop={this.onResizeStop}
				{...this.props}
			>
				{this.generateDOM()}
			</ReactGridLayout>
		);
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout);
