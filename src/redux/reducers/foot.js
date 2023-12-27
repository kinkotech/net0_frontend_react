const initialState = {
	sidebarFold: true, // 菜单
	start: '', // 开始时间
	end: '', // 结束时间
	park_id: 0, // 默认园区id （全部园区）
	weg_park_id: '1' // 水电煤默认园区id （电试院）
};

export default function footReducer(state = initialState, action) {
	
	switch (action.type) {
		// 菜单是否收起
		case 'SET_SIDEBAR_FOLD':
			return { ...state, sidebarFold: !state.sidebarFold };
		case 'SET_START':
			return {...state, start: action.value}
		case 'SET_END':
			return {...state, end: action.value}
		default:
			return state;
	}
}
