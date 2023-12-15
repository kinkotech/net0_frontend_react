import React, { useEffect, useState } from 'react'
import SubMenu from './SubMenu';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu, theme } from 'antd';
  
import './index.scss';
const { Header, Content, Footer, Sider } = Layout;

const LeftMenu = function() {
    const [collapsed, setCollapsed] = useState(true);
    let [type, setType] = useState('foot');
    const [list, setList] = useState([
        {
            label: '园区类型',
            key: 'parkType',
            icon: 'Dashboard',
            color: 'rgba(255, 255, 255, 0.4)',
            path: '/foot/parkType',
        },
        {
            label: '企业',
            key: 'enterprise',
            icon: 'Dashboard',
            color: 'rgba(255, 255, 255, 0.4)',
            children: [{
                label: '数据看板',
                key: '1-1',
                icon: 'Dashboard',
                color: 'rgba(255, 255, 255, 0.4)',
                path: '/foot/board',
            },{
                label: '水电煤看板',
                key: '1-2',
                icon: 'Dashboard',
                color: 'rgba(255, 255, 255, 0.4)',
                path: '/foot/waterElectricityGas'
            },{
                label: '碳足迹报告',
                key: '1-3',
                icon: 'Dashboard',
                color: 'rgba(255, 255, 255, 0.4)',
                path: '/foot/list',
            }]
        },
        {
            label: '员工',
            key: 'staff',
            icon: 'peoples',
            color: 'rgba(255, 255, 255, 0.4)',
            children: [{
                label: '碳普惠',
                key: '2-1',
                icon: 'Dashboard',
                color: 'rgba(255, 255, 255, 0.4)'
            }]
        },
        ])

    useEffect(() => {
		
    }, [])

    const toggleCollapsed = function() {

    }

    const addFoot = function() {
        
    }

    const openSetting = function() {
        
    }

    return (
        <div className="left-menu h-100">
      	<div className={collapsed ? 'arrow-icon' : 'arrow-icon collapsed'} onClick={toggleCollapsed}>
          <iconpark-icon  size="18" color="#fff" name='ArrowDownSmall' className="arrow"></iconpark-icon>
        </div>
        {/* <transition> */}
            {
                collapsed &&
                <div className="menu">
                    {
                        type=='foot' ?
                        <div className="menu-btn pointer" onClick={addFoot}>
                            <div className="menu-btn-icon">
                                <iconpark-icon size="100%" color="#fff" name="Add"></iconpark-icon>
                            </div>
                            <span>添加碳足迹</span>
                        </div>
                        :
                        <div className="menu-btn pointer" onClick={openSetting}>
                            <span>设置碳减排策略</span>
                        </div>
                    }
                    <Sider collapsible onCollapse={(value) => setCollapsed(value)}>
                        <div className="demo-logo-vertical" />
                        <Menu theme="dark" defaultSelectedKeys={['1-1']} mode="inline" items={list} expandIcon={''}/>
                    </Sider>
                </div>
            }
        {/* </transition> */}
		{/* <a-drawer
			placement="right"
			:closable="false"
			:visible="showSetting"
			:width="drawerWidth"
			@close="onClose"
			>
			<Setting :showCancel="true" @cancel="onClose" @confirm="confirm"/>
		</a-drawer> */}
        
    </div>
    )
}

export default LeftMenu;