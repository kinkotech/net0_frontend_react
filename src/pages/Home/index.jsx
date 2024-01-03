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
import api from '@/api/index';

function Home() {
    let [node, setNode] = useState({});
    let [date, setDate] = useState('');
    let [parkList, setParkList] = useState([]);
    let [pageH, setPageH] = useState(document.getElementById('root').offsetHeight);

    useEffect(() => {
        
		getPark();
    }, [pageH])

    // 获取碳节点
    const getNodes = function(node) {
        setNode(node)
    }

    // 获取时间
    const getDate = function(date) {
        setDate(date)
    }

    const getPark = async function() {
        await api.GetPark().then(res=>{
            localStorage.setItem('PARK_LIST', JSON.stringify(res));
            setParkList(res)
        })
    }

    const getScreen = function(screen) {
        setTimeout(() => {
            setPageH(document.getElementById('root').offsetHeight)
        }, 150);
    }

    return (
        <datav.FullScreenContainer>
            <MainLayout>
                <div className='home bg d-flex flex-column w-100' >
                    {/* 上 */}
                    <div className='d-flex' style={{height: pageH *.5,marginBottom: '.2rem'}}>
                        <div className='d-flex flex-column' style={{flex: 1}}>
                            <div style={{height: '2.5rem'}}>
                                <LeftTop date={date} parkList={parkList} getScreen={screen => getScreen(screen)}/>    
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
                    <div className='d-flex' style={{height: pageH *.4 }}>
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
