import React, { useState, useEffect } from 'react';
import { List, Statistic } from 'antd';
import api from '@/api/index';
import './index.scss';

let scrollInterval = '';
class CenterTopRight extends React.Component {

	state = {
		data: [],
		listMarginTop: "0",
		animate: false,
	}

	async componentDidMount() {
		await this.getUsageByDay()
	}

	// 碳结构右侧数据
	getUsageByDay = async function(date, serverId) {
		await api.GetUsageByDay(date, serverId).then(res=>{
			this.setState({
				data: res
			}, () => {
				this.startScrollUp()
			})
		})
	}

	scrollUp = e => {
		this.state.data.push(this.state.data[0]);
		let height = document.getElementById("scrollList").getElementsByTagName("li")[0].scrollHeight + 1;
		this.setState({
			animate: true,
			listMarginTop: "-" + height + "px",
		});
		setTimeout(() => {
			this.state.data.shift();
			this.setState({
				animate: false,
				listMarginTop: "0",
			});
			this.forceUpdate();
		}, 2000)
	}

	scrollDown = e => {
		let ulNode = document.getElementById("scrollList").getElementsByTagName("ul")[0];
		ulNode.firstChild.classList.remove("opacityAnimation");
		this.setState({
			animate: true,
			listMarginTop: ulNode.lastChild.scrollHeight + "px"
		});
		setTimeout(() => {
			this.state.data.unshift(this.state.data[this.state.data.length - 1]);
			ulNode.firstChild.classList.add("opacityAnimation");
			this.state.data.pop();
			this.setState({
				animate: false,
				listMarginTop: "0",
			});
			this.forceUpdate();
		}, 1000)
	}

	startScrollUp = e => {
		this.endScroll();
		this.scrollUp();
		scrollInterval = setInterval(this.scrollUp, 3000);
	}

	startScrollDown = e => {
		this.endScroll();
		this.scrollDown();
		scrollInterval = setInterval(this.scrollDown, 3000);
	}

	endScroll = e => {
		clearInterval(scrollInterval);
	}

	render() {
		return (
			<div className="listContainer h-100">
				<List
					itemLayout="horizontal"
					id="scrollList"
					style={{ marginTop: this.state.listMarginTop }}
					className={this.state.animate ? "animate" : ''}
					dataSource={this.state.data}
					renderItem={item => (
						<List.Item>
							<div className="prediction-center-right-li">
								<div className="text">
									<Statistic
										value={item.value}
										precision={2}
										valueStyle={{ color: 'rgba(255, 255, 255, 0.87)',fontSize:'.2rem' }}
										suffix={item.unit}
										/>
									<div className="prediction-center-right-li-name">{ item.name }</div>
								</div>
								<div className="icon"><iconpark-icon size="100%" color={item.color} name={item.icon}></iconpark-icon></div>
							</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}
export default CenterTopRight;