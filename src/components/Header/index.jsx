import { Layout, Menu} from 'antd';
import { useNavigate} from 'react-router-dom';
import './index.scss';
const { Header } = Layout;

const HeaderPage = () => {
	// 获得路由表
	const navigate = useNavigate();

	// 点击菜单
	const handleSiderClick = (e) => {
		// 路由跳转
		navigate(e.key, {replace: false})
	}

	function getItem(label, key, path, icon, children) {
		return {
			key,
			icon,
			children,
			label,
			path
		};
	}
	let name = window.location.pathname;
	let footPath = '/foot/board';
	if (name === '/foot/waterElectricityGas' || name === '/foot/board' || name === '/foot/parkType' || name === '/foot/list' || name === 'staff') {
		footPath = name;
	}
	const items = [
		getItem('碳排放预测', '/'),
		getItem('碳足迹评测', footPath),
		getItem('碳减排策略', '/reduction')
	]
	console.log(items)

	return (
		<Layout className='layout-page'>
			<Header className='header'>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={window.location.pathname}
					selectedKeys={window.location.pathname}
					items={items}
					onClick={handleSiderClick}
				/>
			</Header>
		</Layout>
	)
}

export default HeaderPage
