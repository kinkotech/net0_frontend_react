import React, { useState } from 'react'
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { useNavigate, useRoutes } from 'react-router-dom'
import './index.scss'
const { Header, Content, Sider } = Layout

const menuList = [{
	key: 0,
	label: '碳排放预测',
	keyPath: '/'
},{
	key: 1,
	label: '碳足迹评测',
	keyPath: '/foot'
},{
	key: 2,
	label: '碳减排策略',
	keyPath: '/reduction'
}]
const titleMenu: MenuProps['items'] = menuList.map((item, index) => ({
	key: item.key,
	label: `${item.label}`,
	keyPath: `${item.keyPath}`
}))
console.log(titleMenu,'titleMenu')

const HeaderPage: React.FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	// 获得路由表
	const navigate = useNavigate()
	// 面包屑名称
	const [breadcrumbName, setBreadcrumbName] = useState('home')
	// 点击菜单
	const handleSiderClick: MenuProps['onClick'] = ({key, keyPath}) => {
		console.log(key, keyPath)
		// const name = keyPath.reverse().join('/') || ''
		// setBreadcrumbName(name)
		// if (key !== 'home' && key !== 'about') return
		// 路由跳转
		let path = menuList[Number(key)].keyPath
		navigate(path, {
			replace: false,
			state: {
				id: path,
			},
		})
	}

	return (
		<Layout className='layout-page'>
			<Header className='header'>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['0']}
					items={titleMenu}
					onClick={handleSiderClick}
				/>
			</Header>
		</Layout>
	)
}

export default HeaderPage
