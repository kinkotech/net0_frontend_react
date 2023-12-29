import { useState } from 'react'
import { FootLayout } from '@/pages/Foot/index';
import Top from './Top';
import Center from './Center';
import BottomLeft from './BottomLeft';
import BottomCenter from './BottomCenter';
import BottomRight from './BottomRight';
import Right from './Right';
import TimeLine from '@/components/TimeLine';
import Title from '@/components/Title';
import './index.scss';

const FootBoard = () => {
	const popverContent = `<p className='info4'></p>
	<div className='scroll-list'>
		<p>全面的产品碳足迹评估是零碳产品建设的第一步，精准定位碳排关键环节，制定针对性的减排措施。</p>
		<p>我们的碳足迹评测遵循ISO14040, ISO14067, <span className="blue">《温室气体核算体系》</span>（Greenhouse Gas Protocol）, 以及<span className="blue">《国家企业温室气体核算指南》</span>等标准。</p>
		<p>主要采用IPCC排放评估模型，即</p>
		<p className='center bold'>碳排放=排放系数×活动水平</p>
		<p>碳足迹统计范围包括，范围1的现场排放，范围2的购买能源排放，范围3的 上下游价值链排放。 其中，</p>
		<p>范围1:现场排放又可以分为几大类别，包括但不限于：现场燃料燃烧，过程逸散性排放。</p>
		<p>范围2:购买能源，指的是电力和其他二次能源产生的间接温室气体排放，需要统计的是电力总消耗量与购买的热力、蒸汽、冷力的数量; 购买能源的排放实际产生于电力（或热力等）生产设施。</p>
		<p>范围3:上下游价值链的排放，是除了范围2之外的其他间接温室气体排放。范围三的排放是一家公司活动的结果，但并不是产生于该公司拥有或控制的排放源。范围3所含的统计类别，包括但不限于，原材料投入，运输物流，员工通勤，商务差旅，废弃物和水，以及售出产品和服务的使用等。</p>
	</div>`;

	return (
		<FootLayout>
			<Title title="数据看板" fontSize=".18rem" color={'white'} showPopver={true} popverContent={popverContent} showSelect={true}/>
			<TimeLine/>
			<div className='flex-1 d-flex'>
				<div className='flex-1 d-flex flex-column'>
					<div style={{flex: 1}}><Top/></div>
					<div className='border' style={{flex: 4}}><Center/></div>
					<div className='bottom d-flex' style={{flex: 2}}>
						<div className='border flex-1'><BottomLeft/></div>
						<div className='border flex-1'><BottomCenter/></div>
						<div className='border flex-1'><BottomRight/></div>
					</div>
				</div>
				<Right/>
			</div>
		</FootLayout>
	)
}

export default FootBoard;

