import { useEffect } from 'react';
import * as echarts from 'echarts';

function Echarts({id, option}) {
    useEffect(() => {
        init();
    }, [option])

    function init() {
        let chartDom = document.getElementById(id);
        //获取之前的echarts的实例
        let myChart = echarts.getInstanceByDom(chartDom);
        //没有就初始化echarts实例
        if (!myChart) {
            myChart = echarts.init(chartDom);
        }
		// 绘制图表
		myChart.setOption(option);
	}

    return (
        <div id={id} style={{width: '100%',height: '100%'}}></div>
    )
}

export default Echarts;