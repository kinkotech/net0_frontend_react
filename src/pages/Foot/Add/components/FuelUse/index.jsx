// 主体信息
import React, { useState } from 'react';
import {
	Input,
	Checkbox,
	Col,
	ColorPicker,
	Form,
	InputNumber,
	Radio,
	Rate,
	Row,
	Select,
	Slider,
	Space,
	Switch,
	Upload,
  } from 'antd';
import './index.scss';

const { Option } = Select;


const FuelUse = ({ value = {}, onChange }) => {
	const rules = {
        park_id: [{required: true}]
    }

	const [number, setNumber] = useState(0);
	const [currency, setCurrency] = useState('rmb');
	const triggerChange = (changedValue) => {
		onChange?.({
		number,
		currency,
		...value,
		...changedValue,
		});
	};
	const onNumberChange = (e) => {
		const newNumber = parseInt(e.target.value || '0', 10);
		if (Number.isNaN(number)) {
		return;
		}
		if (!('number' in value)) {
		setNumber(newNumber);
		}
		triggerChange({
		number: newNumber,
		});
	};
	const onCurrencyChange = (newCurrency) => {
		if (!('currency' in value)) {
		setCurrency(newCurrency);
		}
		triggerChange({
		currency: newCurrency,
		});
	};

	return (
		<div>
			<Form.Item>
				<Radio.Group>
					<Radio value="a">item 1</Radio>
					<Radio value="b">item 2</Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="park_id" label="园区" rules={rules.park_id}>
                <Select placeholder='请选择'>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
			<Form.Item name="park_id" label="园区" rules={rules.park_id}>
				<span>
					<Input
						type="text"
						value={value.number || number}
						onChange={onNumberChange}
						style={{
						width: 100,
						}}
					/>
					<Select
						value={value.currency || currency}
						style={{
						width: 80,
						margin: '0 8px',
						}}
						onChange={onCurrencyChange}
					>
						<Option value="rmb">RMB</Option>
						<Option value="dollar">Dollar</Option>
					</Select>
				</span>
            </Form.Item>
		</div>
	)
}

export default FuelUse;

