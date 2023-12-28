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

	return (
		<FootLayout>
			<Title title="数据看板" fontSize=".18rem" color={'white'} showPopver={true} showSelect={true}/>
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

