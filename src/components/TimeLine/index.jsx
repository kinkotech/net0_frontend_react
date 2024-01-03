import { useState, useEffect } from 'react';
import GridLayout from "./GridLayout";
import TimeChart from "./TimeChart";
import './index.scss';

const TimeLine = function() {
	let [startIndex, setStartIndex] = useState(11);
	let [endIndex, setEndIndex] = useState(22);
	let [xData, setXData] = useState([]);

	useEffect(() => {
	}, [])

	// 获取开始下标
	const getStartIndex = (i) => {
		setStartIndex(i)
	}

	// 获取结束下标
	const getEndIndex = (i) => {
		setEndIndex(i)
	}
	// 获取x轴坐标key
	const getXData = (xData) => {
		setXData(xData)
	}
	
	return (
		<div className="time-line w-100">
			<div className="grid w-100">
				<GridLayout getStartIndex={index => getStartIndex(index)} getEndIndex={index => getEndIndex(index)} xData={xData}/>
			</div>
			<div className="time-chart w-100">
				<TimeChart startIndex={startIndex} endIndex={endIndex} getXData={xData => getXData(xData)}/>
			</div>
		</div>
	)
}

export default TimeLine;
