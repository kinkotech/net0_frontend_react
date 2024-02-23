import request from '@/utils/request';

export default class loginApi {
    static async Login(data: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'login',
                ...data
            }
        })
    }
}