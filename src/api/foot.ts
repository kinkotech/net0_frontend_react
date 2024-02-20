
import request from '@/utils/request';

export default class footApi {
    // 获取碳足迹 水气电 数据
    static async GetWEC(data?: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getWEC',
                ...data
            }
        })
    }

    // 本地导入
    // static async UploadFile(formData) {
    //     return request({ 
    //         url: `${store.state.baseUrl}/api/v1/net0/upload_file/`,
    //         method: 'post',
    //         processData: false,
    //         data: formData
    //     })
    // }
}