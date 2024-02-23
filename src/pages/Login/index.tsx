import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';
import api from '@/api/login';

import './index.scss'
import logo from '@/assets/img/login/logo.png';
import loginBg from '@/assets/svg/login-box-bg.svg';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

const Login: React.FC = () => {
	const navigate = useNavigate()

	// 登录
	const onFinish = async (values: any) => {
		await api.Login(values).then((res: any)=>{
			if (res.token) {
				localStorage.setItem('token', res.token);
				message.success('登录成功');
				navigate('/', {replace: false})
			} else {
				message.error(res.message);
			}
		})
	};
	
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className="login w-100 h-100 d-flex">
			<div className="login-left d-flex flex-1 flex-column">
			<div className="login-left-logo">
				<img src={logo} alt="" />
			</div>
			<div className="login-left-con d-flex flex-column flex-1">
				<div className="login-left-con-img">
					<img src={loginBg} alt="" className="icon"/>
				</div>
				<div className="login-left-con-text">
				<p className="p1">企业碳足迹管理系统</p>
				<p className="p2">输入您的个人详细信息开始使用！</p>
				</div>
			</div>
			</div>
			<div className="login-right d-flex flex-column flex-1">
				<div className="text">登录</div>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className="login-form"
				>
					<Form.Item<FieldType>
						name="username"
						rules={[{ required: true, message: '请输入用户名' }]}
						>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
					</Form.Item>
					<Form.Item<FieldType>
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
						>
						<Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码"/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login;