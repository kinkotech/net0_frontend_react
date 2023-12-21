import React, { useState } from 'react'
import { Flex, Layout, Menu, theme } from 'antd'
import { MainLayout } from "@/layout/MainLayout";
import { FootLayout } from '@/pages/Foot/index';
import Top from './Top';
import Center from './Center';
import BottomLeft from './BottomLeft';
import BottomCenter from './BottomCenter';
import BottomRight from './BottomRight';
import Right from './Right';
import TimeLine from '@/components/TimeLine';
import './index.scss';

const FootBoard = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<FootLayout>
			{/* <div className='time-line'>time line1</div> */}
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

