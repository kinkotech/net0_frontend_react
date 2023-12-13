import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import './index.scss'
import LeftTop from './LeftTop';
import LeftCenter from './LeftCenter';
import LeftBottom from './LeftBottom';
import CenterTop from './CenterTop';
import CenterBottom from './CenterBottom';
import RightTop from './RightTop';
import RightBottom from './RightBottom';
import * as datav from '@jiaminghi/data-view-react';

function Home() {
    let [node, setNode] = useState({});
    let [date, setDate] = useState('');

    useEffect(() => {
		
    }, [])

    // 获取碳节点
    const getNodes = function(node) {
        setNode(node)
    }

    // 获取时间
    const getDate = function(date) {
        setDate(date)
    }

    return (
        <datav.FullScreenContainer>
            <MainLayout>
                <div className='home d-flex flex-column w-100 h-100'>
                    {/* 上 */}
                    <div className='d-flex' style={{flex: 1.3,marginBottom: '.2rem'}}>
                        <div className='d-flex flex-column' style={{flex: 1}}>
                            <div style={{height: '2.5rem'}}>
                                <LeftTop date={date}/>    
                            </div>
                            <div className='border' style={{flex: 1}}>
                                <LeftCenter date={date}/>
                            </div>
                        </div>
                        <div style={{flex: 2,margin: '0 .2rem'}}>
                            {/* 通过 getNodes获取子组件传过来的值*/}
                            <CenterTop getNodes={nodes => getNodes(nodes)} getDate={date => getDate(date)}/>
                        </div>
                        <div className='border flex-1'>
                            <RightTop date={date} node={node}/>
                        </div>
                    </div>
                    {/* 下 */}
                    <div className='d-flex flex-1'>
                        <div className='border flex-1'>
                            <LeftBottom date={date} node={node}/>
                        </div>
                        <div className='border' style={{flex: 2,margin: '0 .2rem'}}>
                            <CenterBottom selectDate={date} node={node}/>
                        </div>
                        <div className='border flex-1'>
                            <RightBottom date={date} node={node}/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </datav.FullScreenContainer>
    );
}

export default Home;
