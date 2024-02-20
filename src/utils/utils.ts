/**
 * 
 * @param {String} str 时间
 * @returns 获取str 的 年/月/日
 */
export function getNowDate(str?: string){
    var date = str ? new Date(str) : new Date();
    var year = date.getFullYear();
    var month: string | number = date.getMonth() + 1;
    var day: string | number = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate
}

/****
 * 获取当前的年-月-日 时:分:秒
 */
export function getNowHour(){
    var date = new Date();
    var year = date.getFullYear();
    var month: string | number = date.getMonth() + 1;
    var day: string | number = date.getDate();
    let h: string | number = date.getHours();
    let m: string | number = date.getMinutes();
    let s: string | number = date.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var nowDate = year + "-" + month + "-" + day + ' ' + h + ':' + m + ':' + s;
    return nowDate
}
/****
 * 获取指定时间的年-月-日 时:分:秒
 */
export function getDateHour(time?: any){
    var date = new Date(time);
    var year = date.getFullYear();
    var month: string | number = date.getMonth() + 1;
    var day: string | number = date.getDate();
    let h: string | number = date.getHours();
    let m: string | number = date.getMinutes();
    let s: string | number = date.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var nowDate = year + "-" + month + "-" + day + ' ' + h + ':' + m + ':' + s;
    return nowDate
}
/**
 * 
 * @param {*} key 
 * @param {*} desc 为true是升序排序，false是降序排序
 */
export function compare(key?: any, desc?: string){
    return (a: any[], b: any[]) => {
        let val1 = a[key];
        let val2 = b[key];
        if (desc) {
            // 升序（从小到大）
            return val1 - val2;
        } else {
            // 降序（从大到小）
            return val2 - val1;
        }
    }
}