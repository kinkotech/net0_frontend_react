import { useState } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import LeftMenu from '@/components/LeftMenu';
import Icon from '@/components/Icon';
import './index.scss';

export const FootLayout = (props) => {
	const [list] = useState([
        {
            label: '园区类型',
            key: '/foot/parkType',
            icon: <Icon iconName={'Dashboard'} color={'rgba(255, 255, 255, 0.4)'}/>,
        },
        {
            label: '企业',
            key: 'enterprise',
            icon: <Icon iconName={'Dashboard'} color={'rgba(255, 255, 255, 0.4)'}/>,
            children: [{
                label: '数据看板',
                key: '/foot',
            },{
                label: '水电煤看板',
                key: '/foot/waterElectricityGas',
            },{
                label: '碳足迹报告',
                key: '/foot/list',
            }]
        },
        {
            label: '员工',
            key: 'staff',
            icon: <Icon iconName={'peoples'} color={'rgba(255, 255, 255, 0.4)'}/>,
            children: [{
                label: '碳普惠',
                key: '/staff'
            }]
        }
    ])

	return (
		<MainLayout>
			<div className='bg d-flex w-100 h-100'>
				<LeftMenu type='foot' list={list}/>
				<div className='foot-main flex-1 d-flex flex-column'>
					{props.children}
				</div>
			</div>
		</MainLayout>
	)
}

