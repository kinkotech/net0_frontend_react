import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { FootLayout } from '@/pages/Foot/index';

const WaterElectricityGas = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<FootLayout>
			WaterElectricityGas
		</FootLayout>
	)
}

export default WaterElectricityGas;

