import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { FootLayout } from '@/pages/Foot/index';

const FootIndex = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<div>
			FootIndex
		</div>
	)
}

export default FootIndex;

