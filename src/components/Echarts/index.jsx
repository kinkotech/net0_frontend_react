import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

function Echarts({id, option}) {

    useEffect(() => {
        init()
    }, [option])

    function init() {
		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById(id));
		// 绘制图表
		myChart.setOption(option);
	}

    return (
        <div id={id} style={{width: '100%',height: '100%'}}></div>
    )
}

export default Echarts;