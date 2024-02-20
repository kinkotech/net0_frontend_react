import { useEffect } from 'react';
import * as echarts from 'echarts';

type Props =  {
    id?: any;
    option?: any
}

function Echarts(props: Props) {
    let {id, option} = props;
    useEffect(() => {
        init();
    }, [option])

    function init() {
        let chartDom: HTMLElement | null = document.getElementById(id);
        // 断言 chartDom 不为 null
        let chartElement: HTMLElement = chartDom!;
        //获取之前的echarts的实例
        let myChart = echarts.getInstanceByDom(chartElement);
        //没有就初始化echarts实例
        if (!myChart) {
            myChart = echarts.init(chartElement);
        }
		// 绘制图表
		myChart.setOption(option);
	}

    return (
        <div id={id} style={{width: '100%',height: '100%'}}></div>
    )
}

export default Echarts;