import ReactDOM from 'react-dom/client';
import Routes from '@/routes';
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd';

// 语言汉化
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import store from './redux/store';
import { Provider } from 'react-redux';

// 适配flex
import '@/common/flexible.js';

// icon-park
import '@/common/iconpark_icons.js';

// antd
import 'antd/dist/reset.css';

// 引入全局css
import '@/assets/scss/style.scss';
import '@/assets/scss/index.scss';

dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	// <React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<Provider store={store}>
				<RouterProvider router={Routes} />
			</Provider>
		</ConfigProvider>
	// </React.StrictMode>
);