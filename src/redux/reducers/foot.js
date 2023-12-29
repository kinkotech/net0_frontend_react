const initialState = {
	sidebarFold: true, // 菜单
	start: '', // 开始时间
	end: '', // 结束时间
	park_id: '1', // 默认园区id （电试院）
	weg_park_id: '1', // 水电煤默认园区id （电试院）
	timeUnit: 'CST', // 时间单位
};

export default function footReducer(state = initialState, action) {
	switch (action.type) {
		// 菜单是否收起
		case 'SET_SIDEBAR_FOLD':
			return { ...state, sidebarFold: !state.sidebarFold };
		// 设置开始时间
		case 'SET_START':
			return {...state, start: action.value}
		// 设置结束时间
		case 'SET_END':
			return {...state, end: action.value}
		// 修改park_id
		case 'SET_PARK_ID':
			return {...state, park_id: action.value}
		default:
			return state;
	}
}
