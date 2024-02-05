import { useEffect, useState } from 'react';
import { Dropdown, Space, Select, Input, DatePicker, Table } from 'antd';
// import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { FootLayout } from '@/pages/Foot/index';
import Title from '@/components/Title';
import Percent from '@/components/Percentage';
import api from '@/api/index';
import { useNavigate} from 'react-router-dom';

import './index.scss';
const { RangePicker } = DatePicker;

const FootList = () => {
	const navigate = useNavigate();

	const [parkList] = useState(JSON.parse(localStorage.getItem('PARK_LIST')));
	const [defaultParkValue] = useState('电试院');
    let [park_id, setPark_id] = useState(1);
	let [timeString, setTimeString] = useState([]);
	let [reporter, setReporter] = useState('')
	const [unitList] = useState([{
		value: '碳排放总量(tCO₂e)'
	},{
		value: '碳排放总量(kgCO₂e)'
	}]);
    let [unit, setUnit] = useState('碳排放总量(tCO₂e)');
	let [dataSource, setDataSource] = useState([]);

	const items = [
		{
		  key: '1',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
			  1st menu item
			</a>
		  ),
		},
		{
		  key: '2',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
			  2nd menu item (disabled)
			</a>
		  ),
		//   icon: <SmileOutlined />,
		  disabled: true,
		},
		{
		  key: '3',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
			  3rd menu item (disabled)
			</a>
		  ),
		  disabled: true,
		},
		{
		  key: '4',
		  danger: true,
		  label: 'a danger item',
		},
	];

	const columns = [
		{
			dataIndex: 'key',
			key: 'key'
		},
		{
		  title: '园区',
		  key: 'name',
		  dataIndex: 'name',
		  sorter: (a, b) => a.name.length - b.name.length,
		//   sortDirections: ['descend'],
		},
		{
		  title: '统计月份',
		  key: 'month',
		  dataIndex: 'month',
		//   defaultSortOrder: 'descend',
		  sorter: (a, b) => a.age - b.age,
		},
		{
		  title: '报告者姓名',
		  key: 'reporter',
		  dataIndex: 'reporter',
		  sorter: (a, b) => a.age - b.age,
		},
		{
			title: '碳排放组成',
			key: 'percentage',
			dataIndex: 'percentage',
			sorter: (a, b) => a.age - b.age,
			render: (record) => {
				return <Percent list={record}/>
			}
		},
		{
			title: '碳排放总量',
			key: 'num',
			dataIndex: 'num',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: '操作',
			key: 'action',
			dataIndex: '',
			render: () => {
				return <div className='action w-100'>
					<span className='theme-color pointer'>详情</span>
					<span className='theme-color pointer'>编辑</span>
					<span className='pointer'>删除</span>
				</div>
			}
		},
	]
	
	useEffect(() => {
		let params = {
			// 筛选
			filter_info: {
				park_id,
				start: timeString[0],
				end: timeString[1],
				reporter
			},
			// 排序
			// order_by: order_by || {},
			// pageSize: this.pagination.defaultPageSize,
			// page: this.page,
			unit
		}
		getReport(params)
	}, [park_id, timeString, reporter, unit])

	// 碳足迹报告创建接口
	const getReport = async (params) => {
		await api.GetReport(params).then(res=>{
			if (res) {
				let data = res.data
				const dataSource = data.map((item, index) => ({ ...item, key: (index+1).toString() }));
				setDataSource(dataSource);
				// this.pagination.total = res.total;
			}
		})
	}

	// 园区切换
	const changePark = (value, option) => {
        setPark_id(option.id)
    }
	// 时间切换
	const changePicker = (time, timeString) => {
		console.log(time, timeString)
		setTimeString(timeString)
	}

	// 单位切换
	const unitChange = (value, option) => {
        
    }
	// 报告者
	const reporterChange = (e) => {
		setReporter(e.target.value)
	}

	// 分页切换
	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	// 上传
	const uploadClick = () => {}
	// 添加
	const goAdd = () => {
		navigate('/addFoot/create', {replace: false})
	}

	return (
		<FootLayout>
			<div className="list w-100 h-100">
				<div className="top">
					<Title title="碳足迹" color={'black'}></Title>
					<div className="btns">
						<div className="btn" onClick={uploadClick}>
							<div className="icon">
								<iconpark-icon size="100%" color="#1E1E1E" name="Input"></iconpark-icon>
							</div>
							<span>导入</span>
						</div>
						<Dropdown
							menu={{
							items,
							}}
						>
							<a onClick={(e) => e.preventDefault()}>
							<Space>
								草稿
								{/* <DownOutlined /> */}
							</Space>
							</a>
						</Dropdown>
					<div className="addIcon d-flex pointer" onClick={goAdd}>
						<div className="icon">
							<iconpark-icon size="100%" color="#fff" name="Add"></iconpark-icon>
						</div>
						添加
					</div>
					</div>
				</div>
				{/* 筛选条件 */}
				<div className="filter-condition">
					<ul>
						<li>
							<span className="title">园区</span>
							<div className="flex-1">
								<Select
									defaultValue={defaultParkValue}
									style={{width: '100%',marginLeft: '12px' }}
									onChange={changePark}
									options={parkList}
								/>
							</div>
						</li>
						<li>
							<span className="title">起止时间</span>
							<div className="filter-condition-right flex-1">
								<RangePicker picker="month" onChange={changePicker}/>
							</div>
						</li>
						<li>
							<span className="title">报告者</span>
							<div className="flex-1">
								<Input placeholder="请输入" value={reporter} onChange={reporterChange}/>
								{/* <a-input v-model="reporter" @change="reporterChange(reporter)" placeholder="请输入" style="width: 100%;margin-left: 12px;"/> */}
							</div>
						</li>
						<li>
							<span className="title">数据显示</span>
							<div className="flex-1">
								<Select
									defaultValue={unit}
									style={{width: '100%',marginLeft: '12px'}}
									onChange={unitChange}
									options={unitList}
								/>
							</div>
						</li>
					</ul>
				</div>
				<div className="table">
					<Table dataSource={dataSource} columns={columns} rowKey={(record) => record.id} />
				</div>
				<div className="page-footer">
					<div className="page-footer-con">
						{/* <div>共 {{ pagination.total }} 条记录</div> */}
						{/* <a-config-provider :locale="zh_CN">
							<a-pagination
							size="small"
							:total="pagination.total"
							:defaultPageSize="pagination.defaultPageSize"
							:pageSizeOptions="pagination.pageSizeOptions"
							show-size-changer
							@change="onChangePagination"
							@showSizeChange="onShowSizeChange"/>
						</a-config-provider> */}
					</div>
				</div>
				{/* <!-- 详情 --> */}
				{/* <a-drawer
					width="75%"
					placement="right"
					:closable="false"
					:visible="visible"
					@close="onClose"
					>
					<Detail :type="type" :id="id" :unit="unit" @close="onClose" @onDelete="onDelete(arguments)"/>
				</a-drawer>
				<!-- 导入 -->
				<a-modal v-model="uploadVisible" title="本地导入" :footer="null" className="upload">
					<Upload :defaultFileList="defaultFileList" @close="colseUpload"/>
				</a-modal>
				<!-- 删除 -->
				<a-modal v-model="deleteVisible" :footer="null" :closable="false" className="delete-modal">
					<div className="detlete-modal">
						<div className="title">确定删除？</div>
						<div className="content">删除后无法恢复</div>
						<div className="btns">
							<div className="cancle-btn pointer" onClick="deleteVisible=false">取消</div>
							<div className="delete-btn pointer" onClick="confirmDelete">删除</div>
						</div>
					</div>
				</a-modal> */}
				{/* <!-- 编辑草稿名称 --> */}
				{/* <DraftModal :draftVisible="draftVisible" :draftName="draftName" @draftName="getGraftName" @ok="draftOk" @cancel="draftCancel"/> */}
			</div>
        </FootLayout>
	)
}

export default FootList;

