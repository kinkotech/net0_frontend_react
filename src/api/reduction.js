
import request from '@/utils/request';

export default class reductionApi {
    // 碳减排策略-数据监测-数据类型
    static async GetEmissionRank(data) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getEmissionRank',
                ...data
            }
        })
    }
    // 获取当日环境信息
    static async GetEnvironment() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getEnvironment'
            }
        })
    }
    // 碳减排策略数据检测拓扑图下方
    static async GetTopologyLoad(data) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getTopologyLoad',
                ...data
            }
        })
    }
    // 设备类型
    static async GetDeviceList(data) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getDeviceList',
                ...data
            }
        })
    }
}