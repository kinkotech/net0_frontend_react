import React, { useState } from 'react';
import { Modal } from 'antd';
import Carousel from '../Carousel';
import Info from '@/assets/svg/Info.svg';
import InfoWhite from '@/assets/svg/Info-white.svg';
import './index.scss';

interface Props {
	url?: string
}
const Help: React.FC<Props> = (prop: Props) => {
	const { url } = prop;
	const [isModalOpen, setIsModalOpen] = useState(false);
	let [iconName, setIconName] = useState(Info)

	const showModal = () => {
		setIsModalOpen(true);
		setIconName(InfoWhite)
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="help pointer" onMouseOver={showModal}>
				<img src={iconName} className='w-100' />
			</div>
			<Modal open={isModalOpen} footer={null} width='70%' onCancel={handleCancel} maskClosable={false}>
				{
					url ?
					<img src={url} alt="" className='w-100' />
					:
					<Carousel />
				}
			</Modal>
		</>
	);
};

export default Help;