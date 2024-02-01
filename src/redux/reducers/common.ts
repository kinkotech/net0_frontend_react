export interface commonVo {
	timeUnit?: string
    isFullScreen?: number
    defaultServerId?: string
    token?: string
}
const initialState: commonVo = {
	timeUnit: 'CST', // 时间单位
    isFullScreen: 0, // 是否全屏
    defaultServerId: 'a00000000000000', // 默认的server_id
    token: '' // 登录token
};

export default function commonReducer(
	state = initialState,
	action: {type: String, value: String}
) {
	const { type } = action;
	switch (type) {
		default:
			return state;
	}
}
