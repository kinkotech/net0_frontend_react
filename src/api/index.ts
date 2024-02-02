import request from '@/utils/request';

export default class api {
    // 总碳排放量
    static async GetCarbonByDay(day_str?: string, park_id?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getCarbonByDay',
                day_str,
                park_id
            }
        })
      }
    // 新能源产电量
    static async GetElectricityByDay(day_str?: string) {
      return request({
        method: 'post',
        data: {
            cmd: 'getElectricityByDay',
            day_str
        }
    })
    }
    // 园区汇总
    static async GetParkByDay(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getParkByDay',
                ...data
            }
        })
    }
    // 园区碳排放源类型占比
    static async GetEnergyTypeByDay(day_str?: string, park_id?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getEnergyTypeByDay',
                day_str,
                park_id
            }
        })
    }
    // 节点列表
    static async GetServerByDay(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getServerByDay',
                ...data
            }
        })
    }
    // 节点包含设备数量
    static async GetEquipmentByDay(server_id?: string, day_str?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getEquipment',
                day_str,
                server_id
            }
        })
    }
    /**
     * 未来预测
     * @param {*} type 可选值3，7，24。分别代表未来3天预测，未来7天预测，24h预测。默认为24h预测。
     * @param {*} date 
     * @param {*} data_type :数据类型，可选值为'usage'或'carbon'
     * @returns 
     */
    static async GetPredict(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getPredict',
                ...data
            }
        })
    }
    /**
     * 未来预测 预测准确率
     * @returns 
     */
    static async GetModelPredictionAccuracy() {
        return request({
            method: 'post',
            data: {
                cmd: 'getModelPredictionAccuracy'
            }
        })
    }
    /**
     * 碳节点
     */
    static async Graph(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getGraph',
                ...data
            }
        })
    }
    // 碳节点 右侧
    static async GetUsageByDay(day_str?: string, server_id?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getUsageByDay',
                day_str,
                server_id
            }
        })
    }
    /***
     * 碳减排策略
     * 数据监测
     */
    // 目标排放量
    static async GetTargetEmissions(data?: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getTargetEmissions',
                ...data
            }
        })
    }
    // 今日减排
    static async GetCutEmissions(day_str?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getCutEmissions',
                day_str
            }
        })
    }
    // 负载示意图
    static async GetLoadDiagram(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getLoadDiagram',
                ...data
            }
        })
    }
    /***
     * 碳减排策略
     * 日策略
     */
    // 日策略
    static async GetDayStrategy(data?: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getDayStrategy',
                ...data
            }
        })
    }
    // 日策略 需求端
    static async GetDayDemand() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getDayDemand'
            }
        })
    }
    // 日策略 供给端
    static async GetDaySupply() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getDaySupply'
            }
        })
    }
     // 日策略 左侧节点图
     static async GetStrategyByServer(data?: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getStrategyByServer',
                ...data
            }
        })
    }
    // 获取光伏发电量
    static async GetPhotovoltaic() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getPhotovoltaic'
            }
        })
    }
    /**
     * 年度看板
     * @param {*} startDate 
     * @param {*} endDate 
     * @returns 
     */
    static async GetYearCarbon(data?: any) {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getYearCarbon',
                ...data
            }
        })
    }
    // 经济效益分析-新增投资
    static async GetYearInvestment() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getYearInvestment'
            }
        })
    }
    // 环境及社会效益分析
    static async GetYearSocial() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getYearSocial'
            }
        })
    }
    // 经济效益分析-运行管理-管理端
    static async GetYearManagement() {
        return request({ 
            method: 'post',
            data: {
                cmd: 'getYearManagement'
            }
        })
    }
    // 经济效益分析-运行管理-供给端
    static async GetYearSupply() {
        return request({
            method: 'post',
            data: {
                cmd: 'getYearSupply'
            }
        })
    }
    /**
     *  碳减排策略设置 获取
     * @returns 
     */
    static async GetUpdateConfigItems() {
        return request({
            method: 'post',
            data: {
                cmd: 'getConfigItems'
            }
        })
    }
    // 碳减排策略-数据检测-拓扑图-获取拓扑图节点编号
    static async GetTopologyName() {
        return request({
            method: 'post',
            data: {
                cmd: 'getTopologyName'
            }
        })
    }
    // 数据类型排放量对比
    static async GetFactorComparison(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getFactorComparison',
                ...data
            }
        })
    }
    // 本周期总排放量/上一周期总排放量/周期波动
    static async GetCycleComparison(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getCycleComparison',
                ...data
            }
        })
    }
    // 零碳园区能源系统指标
    static async GetEnergyTarget(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getEnergyTarget',
                ...data
            }
        })
    }
    // 绿色能源占比
    static async GetGreenEnergy(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getGreenEnergy',
                ...data
            }
        })
    }
    // 碳减排策略设置 提交
    // type: 'form',
    static async PostUpdateConfigItems(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'updateConfigItems',
                ...data
            }
        })
    }
    /**
     * 碳足迹
     * @param {*} type 
     * 
     * 获取卡片页选项
     * 
     *  Fuel:  现场燃烧使用页签,
        Fugitive: 逸散性排放页签,
        Energy: 能源购买页签,
        Material: 原材料投入,
        Logistics: 入场物流/出场物流页签,
        Business: 差旅页签,
        Employee: 员工通勤(上下班往返)页签,
        Waste: 废弃物和水页签
     * @returns 
     */
    static async GetCarbonFootPrintFactor(type?: string) {
        return request({
            method: 'post',
            data: {
                cmd: 'getCarbonFootPrintFactor',
                type
            }
        })
    }
    /**
     * 年累积
     * @param {*} data 
     * @returns 
     */
    static async GetScopeTotal(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getScopeTotal',
                ...data
            }
        })
    }
    /**
     * 获取指定园区直接排放值
     * @param {*} data 
     * @returns 
     */
    static async GetScope1(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getScope1',
                ...data
            }
        })
    }
    /**
     *  获取指定园区购买能源排放值
     * @param {*} data 
     * @returns 
     */
    static async GetScope2(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getScope2',
                ...data
            }
        })
    }
    /**
     *  获取指定园区上下游排放值
     * @param {*} data 
     * @returns 
     */
    static async GetScope3(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getScope3',
                ...data
            }
        })
    }
    /**
     * 提交碳足迹
     * type: 'form',
     */
    static async CreateCarbonReport(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'createCarbonReport',
                ...data
            }
        })
    }
    /**
     * 更新报告/更新草稿
     * type: 'form',
     */
    static async UpdateCarbonReport(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'updateCarbonReport',
                ...data
            }
        })
    }
    /**
     * 修改草稿名称
     * type: 'form',
     */
    static async UpdateDraftName(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'updateDraftName',
                ...data
            }
        })
    }
    /**
     * 报告列表
     */
    static async GetReport(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getCarbonReport',
                ...data
            }
        })
    }
    /**
     * 草稿列表
     */
    static async GetDraftReport() {
        return request({
            method: 'post',
            data: {
                cmd: 'getDraftReport',
            }
        })
    }
    /**
     * 编辑草稿
     */
    static async EditDraftReport(data?: any) {
        return request({
            method: 'post',
            data: {
                cmd: 'getDraftReport',
                ...data
            }
        })
    }
    /**
     * 园区列表
     */
    static async GetPark() {
        return request({
            method: 'post',
            data: {
                cmd: 'getPark'
            }
        })
    }
    /**
     * 删除碳足迹列
     */
    static async DeleteCarbonReport(report_id?: number | string) {
        return request({
            method: 'DELETE',
            data: {
                cmd: 'deleteCarbonReport',
                report_id
            }
        })
    }
    /**
     * 创建草稿/另存为新草稿
     * type: 'form',
     */
    static async CreateDraftReport(data?: any) {
        return request({
            method: 'put',
            
            data: {
                cmd: 'createDraftReport',
                ...data
            }
        })
    }
    /**
     * 获取碳足迹报告详情
     * type: 'form',
     */
    static async GetReportDetail(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getReportDetail',
                ...data
            }
        })
    }
    /**
     *  获取指定时间指定园区碳排放量时间线
     * type: 'form',
     */
    static async GetEmissionTimeline(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getEmissionTimeline',
                ...data
            }
        })
    }
    /**
     *  碳足迹测评-数据看板-数据类型排放量对比
     * type: 'form',
     */
    static async GetParkComparison(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getParkComparison',
                ...data
            }
        })
    }
    /**
     *  碳足迹测评-数据看板-碳足迹趋势图
     * type ● single: 只查看本周期数据;● comparison:包含去年同期对比
     * type: 'form',
     */
    static async GetCarbonTrend(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getCarbonTrend',
                ...data
            }
        })
    }
    /**
     *  碳足迹测评-数据看板-活动类别排放量占比
     * type: 'form',
     */
    static async GetActivityComparison(data?: any) {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getActivityComparison',
                ...data
            }
        })
    }
    /**
     *  实施园区配电拓扑图
     * type: 'form',
     */
    static async GetTopologyDiagram() {
        return request({
            method: 'post',
            
            data: {
                cmd: 'getTopologyDiagram',
            }
        })
    }
}  