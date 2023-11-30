import request from '@/utils/request';

export default class loginApi {
    static async Login(data) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'login',
                ...data
            }
        })
    }
}