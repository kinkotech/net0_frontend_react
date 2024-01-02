export interface reductionVo {
	dayDeviceType: object
}
const initialState: reductionVo = {
	// 日策略设备类型
	dayDeviceType: {
		name: [], // '综合设备', '照明设备', '电梯设备', '空调设备', '动力设备', '水泵设备', '机房设备', '充电桩设备', '洗碗机设备', '其他设备'
        color: ['#2E90FA', '#C8A1FF', '#F670C7', '#8098F9', '#988AFB', '#FFAC8F', '#6CE9A6', '#FB6514', '#12B76A', '#DB1B60']
	}
};

export default function reductionReducer(
	state = initialState,
	action: {type: String, value: String}
) {
	const { type, value } = action;
	switch (type) {
		default:
			return state;
	}
}
