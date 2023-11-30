import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/scss/index.scss';
import Routes from '@/routes';
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd';

// 语言汉化
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, NavLink } from 'react-router-dom';

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import '@/assets/scss/style.scss';

dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<Provider store={store}>
				<RouterProvider router={Routes} />
			</Provider>
		</ConfigProvider>
	</React.StrictMode>
);