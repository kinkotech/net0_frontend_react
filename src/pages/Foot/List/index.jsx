import React, { useState } from 'react'
import { Dropdown, Space, Select, Input, DatePicker, Table } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { FootLayout } from '@/pages/Foot/index';
import Title from '@/components/Title';
import './index.scss';
const { RangePicker } = DatePicker;

const FootList = () => {
	const [parkList] = useState(JSON.parse(localStorage.getItem('PARK_LIST')));
    let [defaultValue, setDefaultValue] = useState('电试院');
	const [unitList] = useState([{
		value: '碳排放总量(tCO₂e)'
	},{
		value: '碳排放总量(kgCO₂e)'
	}]);
    let [unit, setUnit] = useState('碳排放总量(tCO₂e)');

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
		  icon: <SmileOutlined />,
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
			dataIndex: 'index',
		  },
		{
		  title: '园区',
		  dataIndex: 'name',
		  sorter: (a, b) => a.name.length - b.name.length,
		//   sortDirections: ['descend'],
		},
		{
		  title: '统计月份',
		  dataIndex: 'age',
		//   defaultSortOrder: 'descend',
		  sorter: (a, b) => a.age - b.age,
		},
		{
		  title: '报告者姓名',
		  dataIndex: 'address',
		  sorter: (a, b) => a.age - b.age,
		},
		{
			title: '碳排放组成',
			dataIndex: 'address',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: '碳排放总量',
			dataIndex: 'address',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: '操作',
			dataIndex: 'address',
			sorter: (a, b) => a.age - b.age,
		},
	]

	const data = [
		{
		  key: '1',
		  name: 'John Brown',
		  age: 32,
		  address: 'New York No. 1 Lake Park',
		},
		{
		  key: '2',
		  name: 'Jim Green',
		  age: 42,
		  address: 'London No. 1 Lake Park',
		},
		{
		  key: '3',
		  name: 'Joe Black',
		  age: 32,
		  address: 'Sydney No. 1 Lake Park',
		},
		{
		  key: '4',
		  name: 'Jim Red',
		  age: 32,
		  address: 'London No. 2 Lake Park',
		},
	];

	// 园区切换
	const changePark = (value, option) => {
        
    }

	// 单位切换
	const unitChange = (value, option) => {
        
    }

	// 分页切换
	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<FootLayout>
			<div className="list w-100 h-100">
				<div className="top">
					<Title title="碳足迹" color={'black'}></Title>
					<div className="btns">
						<div className="btn" onClick="uploadClick">
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
								<DownOutlined />
							</Space>
							</a>
						</Dropdown>
					<div className="addIcon d-flex pointer" onClick="goAdd">
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
									defaultValue={defaultValue}
									style={{width: '100%',marginLeft: '12px' }}
									onChange={changePark}
									options={parkList}
								/>
							</div>
						</li>
						<li>
							<span className="title">起止时间</span>
							<div className="filter-condition-right flex-1">
								<RangePicker picker="month" />
							</div>
						</li>
						<li>
							<span className="title">报告者</span>
							<div className="flex-1">
								<Input placeholder="请输入" />
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
					<Table columns={columns} dataSource={data} onChange={onChange} />
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

