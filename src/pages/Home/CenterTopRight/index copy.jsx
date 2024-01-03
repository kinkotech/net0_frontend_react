import React, { useState, useEffect } from 'react';
import { Statistic } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import api from '@/api/index';
import './index.scss';

function CenterTopRight({date, serverId}) {
	console.log(date, serverId,'----')
	let [list, setList] = useState([]);

	useEffect(() => {
		getUsageByDay(date, serverId)
		
    }, [date, serverId])

	// 碳结构右侧数据
	const getUsageByDay = async function(date, serverId) {
		await api.GetUsageByDay(date, serverId).then(res=>{
			setList(res)
		})
	}


    return (
		<div className="prediction-center-right">
			<Swiper
				modules={[Autoplay]}
				direction="vertical"
				loop={true}
				slidesPerView={4}
				autoplay={{
					delay: 1100, // ms
				}}
			>
				{
					list.map((item, i) => {
						return (
							<SwiperSlide key={i}>
								<div className="prediction-center-right-li" key={i}>
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
							</SwiperSlide>
						);
					})
				}
			</Swiper>
		</div>
	)
}

export default CenterTopRight;