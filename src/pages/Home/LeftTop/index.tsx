import { useState, useEffect } from 'react';
import { Select, Statistic } from 'antd';
import api from '@/api/index';
import './index.scss';

type Props = {
	date?: string;
	parkList?: any;
	getScreen?: any
}

function LeftTop(props: Props) {
	let {date, parkList, getScreen} = props;
	// 总碳排放量
	let [carbon, setCarbon] = useState(0);
	let [carbonTrend, setCarbonTrend] = useState('');
	let [carbonUnit, setCarbonUnit] = useState('');
	// 新能源产电量
	let [electricit, setElectricit] = useState(0);
	let [electricitTrend, setElectricitTrend] = useState('');
	let [electricitUnit, setElectricitUnit] = useState('');

	let [defauleParkList] = useState('电试院');
	let [nowDate, setNowDate] = useState('');
	let [screen, setScreen] = useState('FullScreen');

	useEffect(() => {
		if (date) {
			getCurrentDate(date)
			getCarbonByDay(date);
			getElectricityByDay(date);
		}
    }, [date])

	// 获取选择的时间
	const getCurrentDate = function(date: any) {
		let d = date.split('-');
		setNowDate(`${d[0]}年${d[1]}月${d[2]}日`)
	}

	const getCarbonByDay = async function(date: any) {
		await api.GetCarbonByDay(date).then((res: any)=>{
			setCarbon(res.today);
			setCarbonTrend(res.trend);
			setCarbonUnit(res.unit);
		})
	}

	const getElectricityByDay = async function(date: any) {
		await api.GetElectricityByDay(date).then((res: any)=>{
			setElectricit(res.today);
			setElectricitTrend(res.trend);
			setElectricitUnit(res.unit);
		})
	}

	const handleChange = (value: any) => {
		console.log(`selected ${value}`);
		
	};

	// 全屏
	const fullScreen = function(element: any) {
		if (element.requestFullscreen) {
			element.requestFullscreen(); return true
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen(); return true
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen(); return true
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen(); return true
		}
	}

	// 取消全屏
	const unFullScreen = function() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if ((document as any).mozCancelFullScreen) {
			(document as any).mozCancelFullScreen();
		}
		else if ((document as any).webkitCancelFullScreen) {
			(document as any).webkitCancelFullScreen();
		}
		else if ((document as any).msExitFullscreen) {
			(document as any).msExitFullscreen();
		}
	}

	// 切换全屏
	const changeScreen = function async() {
		let str = '';
		if (screen === 'FullScreen') {
			str = 'UnFullScreen';
			fullScreen(document.documentElement);
		} else {
			str = 'FullScreen';
			unFullScreen();
		}
		setScreen(str)
		getScreen(str);
	}

    return (
		<div className='left-top d-flex flex-column h-100'>
			<div className='left-top-top d-flex'>
				<Select
					className='kinko-selection-white '
					defaultValue={defauleParkList}
					style={{ width: 100 }}
					onChange={handleChange}
					options={parkList}
					disabled
					/>
				<div className="full-screen-icon" onClick={changeScreen}>
					{/* <div className="icon"><iconpark-icon size="100%" color="#999" name={screen}></iconpark-icon></div> */}
				</div>
				<div className="now-date">{ nowDate }</div>
			</div>
			<div className='left-top-center'>碳排放预测</div>
			<div className='left-top-bottom d-flex flex-1'>
				<div className='left-top-bottom-con d-flex flex-column border'>
					<div className='flex-1'>总碳排放量（日累积）</div>
					<div className='flex-1'>
						<Statistic value={carbon} valueStyle={{color: '#fff'}} suffix={carbonUnit}/>
					</div>
					<div className={carbonTrend.indexOf('+') > -1 || carbonTrend === '0%' ? 'descend flex-1' : 'rise flex-1'}>较昨天 {carbonTrend}</div>
				</div>
				<div className='left-top-bottom-con d-flex flex-column border'>
					<div className='flex-1'>新能源产电量（天）</div>
					<div className='flex-1'>
						<Statistic value={electricit} valueStyle={{color: '#fff'}} suffix={electricitUnit}/>
					</div>
					<div className={electricitTrend.indexOf('-') > -1 || carbonTrend === '0%' ? 'descend flex-1' : 'rise flex-1'}>较昨天 {electricitTrend}</div>
				</div>
			</div>
		</div>
	)
}

export default LeftTop;