import { useState } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import LeftMenu from '@/components/LeftMenu';
// import Icon from '@/components/Icon';
import './index.scss';

type Props = {
    children?: any
}

export const ReductionLayout = (props: Props) => {
	const [list] = useState([
        {
            label: '日策略',
            key: '/reduction',
            // icon: <Icon iconName={'Dashboard'} color={'rgba(255, 255, 255, 0.4)'}/>,
            icon: ''
        },
        {
            label: '年度看板',
            key: '/reduction/year',
            // icon: <Icon iconName={'peoples'} color={'rgba(255, 255, 255, 0.4)'}/>
            icon: ''
        },
        {
            label: '数据监测',
            key: '/reduction/board',
            // icon: <Icon iconName={'peoples'} color={'rgba(255, 255, 255, 0.4)'}/>
            icon: ''
        },
        {
            label: '设置',
            key: '/reduction/setting',
            // icon: <Icon iconName={'peoples'} color={'rgba(255, 255, 255, 0.4)'}/>
            icon: ''
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

