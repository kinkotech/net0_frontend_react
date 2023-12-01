import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import api from '@/api/index';
import './index.scss'
import LeftTop from './LeftTop';
import LeftCenter from './LeftCenter';
import LeftBottom from './LeftBottom';
import CenterTop from './CenterTop';
import CenterBottom from './CenterBottom';
import RightTop from './RightTop';
import RightBottom from './RightBottom';


function Home() {
    let [loading0, setLoading0] = useState(false);

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
                        <LeftTop/>1
                    </div>
                    <div className='border' style={{flex: 2,margin: '0 .2rem'}}>
                        <CenterTop/>2
                    </div>
                    <div className='border flex-1'>
                        <RightTop/>
                    </div>
                </div>
                {/* 下 */}
                <div className='d-flex flex-1'>
                    <div className='border flex-1'>
                        <LeftBottom/>
                    </div>
                    <div className='border' style={{flex: 2,margin: '0 .2rem'}}>
                        <CenterBottom/>
                    </div>
                    <div className='border flex-1'>
                        <RightBottom/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;
