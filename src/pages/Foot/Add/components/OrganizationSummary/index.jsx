// 主体信息
import React, { useState } from 'react';
import {
    DatePicker,
    Form,
    Input,
    Select
  } from 'antd';
import './index.scss';

const OrganizationSummary = () => {
    const rules = {
        park_id: [{required: true}],
        reporter: [{required: true}],
        month: [{required: true}]
    }

	return (
		<div className='organization-summary w-100'>
            <Form.Item name="park_id" label="园区" rules={rules.park_id}>
                <Select placeholder='请选择'>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="reporter"
                label="报告者姓名"
                rules={rules.reporter}
            >
                <Input placeholder='请输入'/>
            </Form.Item>
            <Form.Item name="month" label="测评月份" rules={rules.month}>
                <DatePicker picker="month" className='w-100'/>
            </Form.Item>
		</div>
	)
}

export default OrganizationSummary;

