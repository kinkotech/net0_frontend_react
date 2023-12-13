import React, { useState } from 'react'
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { MainLayout } from "@/layout/MainLayout"
const { Header, Content, Sider } = Layout

const siderMenu: MenuProps['items'] = [
	{
		key: 'home',
		icon: <UserOutlined />,
		label: '人员管理',
	},
	{
		key: 'about',
		icon: <NotificationOutlined />,
		label: '关于系统',
	},
	{
		key: 'info',
		icon: <LaptopOutlined />,
		label: '信息管理',
		children: [
			{
				key: 'info-detail',
				label: '信息详情',
			},
			{
				key: 'info-look',
				label: '信息查询',
			},
		],
	},
	{
		key: 'statistics',
		icon: <NotificationOutlined />,
		label: '数量统计',
	},
]

const Reduction: React.FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<MainLayout>
			<div>hhhhhhhh</div>
		</MainLayout>
	)
}

export default Reduction;

