import { useState, useEffect } from 'react';
import {
    Form,
  } from 'antd';
import OrganizationSummary from './components/OrganizationSummary';
// import FuelUse from './components/FuelUse';
// import FugitiveEmission from './components/FugitiveEmission';
// import PurchasedEnergy from './components/OutboundLogistics';
// import MaterialInputs from './components/MaterialInputs';
// import InboundLogistics from './components/InboundLogistics';
// import OutboundLogistics from './components/OutboundLogistics';
// import BusinessTrave from './components/BusinessTrave';
// import WasteAndWater from './components/WasteAndWater';
// import CustomerApportionment from './components/CustomerApportionment';
// import ProductApportionment from './components/ProductApportionment';
import api from '@/api/index';
import './index.scss';

const FootAdd = () => {
	const [list, setList] = useState([{
		key: '11',
		icon: 'doc-detail',
		color: '#0BCFC8',
		title: '主体信息',
		subTitle: 'Organization Summary',
		show: true,
		conList: []
	},{
		key: '0',
		icon: 'TypeFire',
		color: '#999',
		title: '现场燃料使用',
		subTitle: 'On-site fuel use',
		show: false,
		conList: [{}]
	},{
		key: '1',
		icon: 'TypeFugitiveEmission',
		color: '#999',
		title: '逸散性排放',
		subTitle: 'Fugitive Emission',
		show: false,
		conList: []
	},{
		key: '2',
		icon: 'TypePurchasedEnergy',
		color: '#999',
		title: '能源购买',
		subTitle: 'Purchased Energy',
		show: false,
		conList: []
	},{
		key: '3',
		icon: 'TypeMaterialInputs',
		color: '#999',
		title: '原材料投入',
		subTitle: 'Material Inputs',
		show: false,
		conList: []
	},{
		key: '4',
		icon: 'TypeOutboundLogistics',
		color: '#999',
		title: '入场物流',
		subTitle: 'Inbound Logistics',
		show: false,
		conList: []
	},{
		key: '5',
		icon: 'TypeInboundLogistics',
		color: '#999',
		title: '出场物流',
		subTitle: 'Outbound Logistics',
		show: false,
		conList: []
	},{
		key: '6',
		icon: 'TypeBusinessTravel',
		color: '#999',
		title: '差旅',
		subTitle: 'Business Trave',
		show: false,
		conList: []
	},{
		key: '7',
		icon: 'TypeEmployeeCommuting',
		color: '#999',
		title: '员工通勤（上下班往返）',
		subTitle: 'Employee Commuting',
		show: false,
		conList: []
	},{
		key: '8',
		icon: 'TypeWater',
		color: '#999',
		title: '废弃物和水',
		subTitle: 'Waste and Water',
		show: false,
		conList: []
	},{
		key: '9',
		icon: 'TypeCustomerApportionment',
		color: '#999',
		title: '客户分摊',
		subTitle: 'Customer Apportionment',
		show: false,
		conList: []
	},{
		key: '10',
		icon: 'TypeProductApportionment',
		color: '#999',
		title: '产品分摊',
		subTitle: 'Product Apportionment',
		show: false,
		conList: []
	}])

	useEffect(() => {

	}, [])

	// 获取卡片页选项
	const getCarbonFootPrintFactor = async(type: any, newList: any, i: number) => {
		await api.GetCarbonFootPrintFactor(type).then(res=>{
			if (res) {
				newList[i].conList.push({res})
				setList(list)
			}
		})
	}
	

	const closeOrOpen = (el: any, i: number) => {
		console.log(el)
		list.forEach((item, index) => {
			if(i == index) {
				item.show = !item.show;
			}
		})
	}
	const addCon = (i: number, title: any) => {
		let type = '';
		let newList = list;
		switch (title) {
			case '现场燃料使用':
				type = 'Fuel';
				break;
			case '逸散性排放':
				type = 'Fugitive';
				break;
			case '能源购买':
				type = 'Energy';
				break;
			case '原材料投入':
				type = 'Material';
				break;
			case '入场物流':
				type = 'Logistics';
				break;
			case '出场物流':
				type = 'Logistics';
				break;
			case '差旅':
				type = 'Business';
				break;
			case '员工通勤（上下班往返）':
				type = 'Employee';
				break;
			case '废弃物和水':
				type = 'Waste';
				break;
		}
		if(title == '客户分摊' || title == '产品分摊') {
			newList[i].conList.push({})
		} else {
			getCarbonFootPrintFactor(type, newList, i);
		}
		newList[i].show = true;
		
		setList(newList)
	}

	// const reduceCon = (ii, conI) => {
	// 	this.getModule(ii)

	// 	// 对应模块的数组减去一个
	// 	this[this.moduleType].splice(conI, 1);
	// 	// 数组循环的值先清空，通过后面的addCon再次添加
	// 	list[ii].conList = [];

	// 	for(let i = 0; i < this[this.moduleType].length; i++) {
	// 		this.addCon(ii, this.mpduleName)
	// 	}
	// }


	return (
		<div>
			
			
			{/* <FugitiveEmission/>
			<PurchasedEnergy/>
			<MaterialInputs/>
			<InboundLogistics/>
			<OutboundLogistics/>
			<BusinessTrave/>
			<WasteAndWater/>
			<CustomerApportionment/>
			<ProductApportionment/> */}
			<div className="foot-add w-100">
				{
					list.map((item, i) => {
						return (
						<div className="foot-add-list" key={i}>
							<div className="foot-add-list-header">
								<div className="foot-add-list-header-left">
									<div className="arrow pointer" onClick={()=> closeOrOpen(item, i)}>
										{/* <iconpark-icon
											size="100%"
											color="#999999"
											name="ArrowDownSmall"
											className={item.show ? 'up-icon' : 'down-icon'}
										></iconpark-icon> */}
									</div>
									<span className={item.conList.length > 0 ? 'foot-add-list-header-left-icon bg-blue' : 'foot-add-list-header-left-icon'}>
										{/* <iconpark-icon size="100%" color={item.conList.length > 0 ? '#0BCFC8' : '#999'} name={item.icon}></iconpark-icon> */}
									</span>
									<div className="foot-add-list-header-left-text">
										<div className="foot-add-list-header-left-text-title fw-600">{ item.title }</div>
										<div className="foot-add-list-header-left-text-sub-title">{ item.subTitle }</div>
									</div>
								</div>
								{
									item.title != '主体信息' &&
									<div className="add-icon" onClick={()=> addCon(i, item.title)}>
										{/* <iconpark-icon size="100%" color="#999999" name="Add"/> */}
									</div>
								}
							</div>
							<Form labelCol={{
									span: 6,
								}}
								wrapperCol={{
									span: 12,
								}}
								layout="horizontal"
								style={{maxWidth: '70%'}}>
								{
									item.title == '主体信息' &&
									<OrganizationSummary/>
								}
								{
									item.title == '现场燃料使用' &&
									list[i].conList.map(() => {
										return (
											// <FuelUse/>
											<div>22</div>
										)
									})
								}
							</Form>
						</div>
						)
						})
					}
				
			</div>
		</div>
	)
}

export default FootAdd;

