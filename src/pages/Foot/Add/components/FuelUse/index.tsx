// 主体信息
import { useState } from 'react';
import {
	Input,
	Form,
	Radio,
	Select
  } from 'antd';
import './index.scss';

const { Option } = Select;

type Props = {
	value: any;
	onChange?: (any: any) => void
}

const FuelUse = (props: Props) => {
	let { value = {}, onChange } = props;

	const rules = {
        park_id: [{required: true}]
    }

	const [number, setNumber] = useState(0);
	const [currency, setCurrency] = useState('rmb');
	const triggerChange = (changedValue: any) => {
		onChange?.({
		number,
		currency,
		...value,
		...changedValue,
		});
	};
	const onNumberChange = (e: any) => {
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
	const onCurrencyChange = (newCurrency: any) => {
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

