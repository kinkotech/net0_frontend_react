import { Tabs } from 'antd'
import { FootLayout } from '@/pages/Foot/index';
import img1 from '@/assets/img/parkType_img01.jpg';
import img2 from '@/assets/img/parkType_img02.jpg';
import img3 from '@/assets/img/parkType_img03.jpg';
import img4 from '@/assets/img/parkType_img04.jpg';
// import Title from '@/components/title/index.vue';
import './index.scss';

const TabPane = Tabs.TabPane;

const ParkType = () => {
	const items = [
		{
			key: '1',
			label: '生产制造型园区',
			children: `生产制造型园区是指以生产制造为主体的园区，主要建筑多以车间、厂房为主。工业领域是我国实现“双碳”的关键领域，其碳排放来源主要在生产制造环节，其次是建筑能源和交通物流。</br></br>
			生产制造型园区的主要碳排放场景包括生产碳排放、交通碳排放和建筑碳排放。`,
			img: img1
		},{
			key: '2',
			label: '物流仓储型园区',
			children: `物流仓储型园区是指衔接多种运输方式，成规模并且具备物流运输、货物仓储等多种功能的空间聚集体，包括物流中心、配送中心、运输枢纽设施、运输组织及管理中心和物流信息中心，以及适应城市物流管理与运作需要的物流基础设施。</br></br>
			物流仓储型园区的主要碳排放场景包括交通碳排放和建筑碳排放。`,
			img: img2
		},{
			key: '3',
			label: '商务办公型园区',
			children: `商务办公型园区以商务办公功能为主，形成一定的产业集群和规模效应，包括办公区、商务独栋、研发中心、商场、会展、文化中心等，并提供工作、就餐、休息、培训、娱乐、健身、医疗、展示等诸多空间。</br></br>
			商务办公型园区的主要碳排放场景包括交通碳排放和建筑碳排放。`,
			img: img3
		},{
			key: '4',
			label: '特色功能型园区',
			children: `特色功能型园区包括医院、景区、场馆等专业化场景的园区，面向医患、游客等群体提供不同服务，分别承载医疗、旅游、文化等多种功能，业态丰富。特色功能型园区作为保障民生的公共基础设施，是城市重点用能单位，节能降碳空间巨大，通过开展节能减排行动，加强节能管理，促进合理用能，提供能源利用效率，助力节约型社会建设。</br></br>
			特色功能型园区的主要碳排放场景包括生活碳排放、交通碳排放和建筑碳排放。`,
			img: img4
		}
	]

	return (
		<FootLayout>
			<div className="park-type w-100">
			{/* <Title :title="title"></Title> */}
			<div className="park-type-top">
				<div className="park-type-top-title">园区类型</div>
				<div className="park-type-top-content">
					依据产业结构、功能类型、碳排放场景等因素将园区划分为生产制造型园区、物流仓储型园区、商务办公型园区和特色功能型园区四大类。
				</div>
			</div>
			<div className="park-type-tab">
				{/* <Tabs defaultActiveKey="1" items={items}/> */}
				<Tabs defaultActiveKey="1">
					{
						items.map((item) => {
							return (
								<TabPane tab={<span className="customLabelColor">{item.label}</span>} key={item.key}>
									<div className="park-type-tab-content">
										<div className="park-type-tab-content-left">
											<div className="park-type-tab-content-left-title">{ item.label }</div>
											<div className="park-type-tab-content-left-content" dangerouslySetInnerHTML={{__html: item.children}}/>
										</div>
										<div className="park-type-tab-content-right">
											<img src={item.img} alt="" className="img"/>
										</div>
									</div>
								</TabPane>
							)
						})
					}
				</Tabs>
			</div>
		</div>
		</FootLayout>
	)
}

export default ParkType;

