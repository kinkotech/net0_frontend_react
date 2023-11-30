import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import 'antd/dist/reset.css';
import { MainLayout } from "@/layout/MainLayout";
import {
    Link,
} from "react-router-dom";
import * as echarts from 'echarts';
import api from '@/api/index';
import './index.scss'


function Home() {
    let [count, setCount] = useState(0);

    useEffect(() => {
        console.log(11)
        getCarbonByDay()
    })

    async function getCarbonByDay() {
        await api.GetCarbonByDay('2023-11-30').then(res=>{
            console.log(res)
        })
    }

    return (
        <MainLayout>
            <div className='home d-flex flex-column w-100 h-100'>
                {/* 上 */}
                <div className='d-flex' style={{flex: 1.3,marginBottom: '.2rem'}}>
                    <div style={{flex: 1}}>
                        <div></div>
                        <div>碳排放预测</div>
                        <div className='d-flex'>
                            <div className='border flex-1'>1</div>
                            <div className='border flex-1'>2</div>
                        </div>
                    </div>
                    <div className='border' style={{flex: 2,margin: '0 .2rem'}}>中</div>
                    <div className='border flex-1'>右</div>
                </div>
                {/* 下 */}
                <div className='d-flex flex-1'>
                    <div className='border flex-1'>左</div>
                    <div className='border' style={{flex: 2,margin: '0 .2rem'}}>中</div>
                    <div className='border flex-1'>右</div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;
