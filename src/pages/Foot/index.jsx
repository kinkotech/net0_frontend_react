import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { MainLayout } from "@/layout/MainLayout";
import LeftMenu from '@/components/LeftMenu';
import './index.scss';


export const FootLayout = (props) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<MainLayout>
			<div className='bg d-flex w-100 h-100'>
				<LeftMenu/>
				<div className='foot-main flex-1 d-flex flex-column'>
					{props.children}
				</div>
			</div>
		</MainLayout>
	)
}

