import { Layout, Menu, Dropdown} from 'antd';
import { useNavigate} from 'react-router-dom';
import IconPark from '@/components/IconPark';
import './index.scss';
const { Header } = Layout;

const HeaderPage = () => {
	// 获得路由表
	const navigate = useNavigate();

	// 点击菜单
	const handleSiderClick = (e: any) => {
		// 路由跳转
		navigate(e.key, {replace: false})
	}

	// menu菜单
	function getItem(
		label?: string,
		key?: any,
		path?: string,
		icon?: string,
		children?: any[]
		) {
		return {
			key,
			icon,
			children,
			label,
			path
		};
	}
	let name = window.location.pathname;
	let footPath = '/foot';
	if (name === '/foot/waterElectricityGas' || name === '/foot' || name === '/foot/parkType' || name === '/foot/list' || name === 'staff') {
		footPath = name;
	}
	const menuItems = [
		getItem('碳排放预测', '/'),
		getItem('碳足迹评测', footPath),
		getItem('碳减排策略', '/reduction')
	]
	// dropdown
	const dropdownItems = [
		{
		  key: '1',
		  label: (
			<div>退出登录</div>
		  ),
		}
	]

	// 退出登录
	const logout = () => {
		localStorage.clear();
		navigate('/login', {replace: false})
	}

	return (
		<Layout className='layout-page'>
			<Header className='header'style={{background: '#222',position: 'relative'}}>
				<div className="left">
					<div className="logo">
						<IconPark className="iconpark-icon" style={{ color: '#0BCFC8', marginRight: '.1rem', fontSize: '100%' }} iconName='logo'></IconPark>
					</div>
					<div className="text fw-600">零碳园区</div>
				</div>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={[window.location.pathname]}
					selectedKeys={[window.location.pathname]}
					items={menuItems}
					onClick={handleSiderClick}
					style={{height: '100%',background: '#222',position: 'absolute',right: '10%', top: 0}}
				/>
				<div className="avatar">
					<Dropdown
						menu={{
							items: dropdownItems,
							onClick: logout
						}}
						placement="bottomLeft"
						trigger={['click']}
					>
						<IconPark className="iconpark-icon" style={{ color: '#A1A1A1', marginRight: '.1rem', fontSize: '100%' }} iconName='User'></IconPark>
					</Dropdown>
				</div>
			</Header>
		</Layout>
	)
}

export default HeaderPage
