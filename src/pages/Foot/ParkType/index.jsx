import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { FootLayout } from '@/pages/Foot/index';

const ParkType = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<FootLayout>
			ParkType
		</FootLayout>
	)
}

export default ParkType;

