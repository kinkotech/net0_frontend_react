import React from 'react';
import { List, Statistic } from 'antd';
import api from '@/api/index';
import IconPark from '@/components/IconPark';
import './index.scss';

let scrollInterval: any = '';
class CenterTopRight extends React.Component {

	state = {
		data: [],
		listMarginTop: "0",
		animate: false,
	}

	async componentDidMount() {
		await this.getUsageByDay()
	}

	componentWillUnmount() {
		clearInterval(scrollInterval);
	}

	// 碳结构右侧数据
	getUsageByDay = async function(date?: string, serverId?: string) {
		await api.GetUsageByDay(date, serverId).then(()=>{
			// this.setState({
			// 	data: res
			// }, () => {
			// 	this.startScrollUp()
			// })
		})
	}

	scrollUp() {
		this.state.data.push(this.state.data[0]);
		const element = document.getElementById('scrollList');
		let height = element && element.getElementsByTagName("li")[0].scrollHeight + 1;
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

	// scrollDown() {
	// 	const element = document.getElementById('scrollList');
	// 	let ulNode = element && element.getElementsByTagName("ul")[0];
	// 	ulNode.firstChild.classList.remove("opacityAnimation");
	// 	this.setState({
	// 		animate: true,
	// 		listMarginTop: ulNode.lastChild.scrollHeight + "px"
	// 	});
	// 	setTimeout(() => {
	// 		this.state.data.unshift(this.state.data[this.state.data.length - 1]);
	// 		ulNode.firstChild.classList.add("opacityAnimation");
	// 		this.state.data.pop();
	// 		this.setState({
	// 			animate: false,
	// 			listMarginTop: "0",
	// 		});
	// 		this.forceUpdate();
	// 	}, 1000)
	// }

	startScrollUp() {
		this.endScroll();
		this.scrollUp();
		scrollInterval = setInterval(this.scrollUp, 3000);
	}

	// startScrollDown = e => {
	// 	this.endScroll();
	// 	this.scrollDown();
	// 	scrollInterval = setInterval(this.scrollDown, 3000);
	// }

	endScroll() {
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
					renderItem={(item: any) => (
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
								<div className="icon">
									<IconPark className="iconpark-icon" style={{ color: item.color, fontSize: '100%' }} iconName={item.icon}></IconPark>
								</div>
							</div>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}
export default CenterTopRight;