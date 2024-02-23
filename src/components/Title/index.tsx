import React, { useState } from 'react';
import { Select } from 'antd';
import Popver from '../Popver';
import { connect } from 'react-redux';
import Help from '../Help';
import './index.scss';

type Props = {
    color?: string;
    title?: string;
    popverContent?: string;
    currentTime?: string;
    showPopver?: boolean;
    showHelp?: boolean;
    helpImgUrl?: string;
    showSelect?: boolean;
    setParkId?: any;
}

const Title: React.FC<Props> = function(props: Props) {
    let {color, title,popverContent, currentTime, showPopver, showHelp=false, helpImgUrl, showSelect, setParkId} = props;

    let [screen, setScreen] = useState('FullScreen');
    const [parkList] = useState(JSON.parse(localStorage.getItem('PARK_LIST')?.toString() ?? ""));
    let [defaultValue, setDefaultValue] = useState('电试院');

    // 全屏
    const fullScreen = (element: any) => {
        if (element.requestFullscreen) {
            element.requestFullscreen(); return true
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen(); return true
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(); return true
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen(); return true
        }
    }

    // 取消全屏
    const unFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        }
        else if ((document as any).webkitCancelFullScreen) {
            (document as any).webkitCancelFullScreen();
        }
        else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    }

    // 切换全屏
    const changeScreen = () => {
        let str = ''
        if (screen == 'FullScreen') {
            str = 'UnFullScreen';
            fullScreen(document.documentElement);
        } else {
            str = 'FullScreen';
            unFullScreen();
        }
        setScreen(str)
    }

    const changePark = (value: string, option: any) => {
        setDefaultValue(value)
        setParkId(option.id)
    }
    
	return (
        <div className={color==='white' ? 'page-title white': 'page-title black'}>
            <div className="page-title-left">
                <div className="fw-600">{ title }</div>
                {
                    showSelect &&
                    <Select
                        className='kinko-selection'
                        defaultValue={defaultValue}
                        style={{minWidth: '115px',width: '1.6rem' }}
                        onChange={changePark}
                        options={parkList}
                        disabled
                    />
                }
                <div className="screen-icon pointer" onClick={changeScreen}>
                    <div className="icon">
                        <iconpark-icon size="100%" color="#999" name={screen}></iconpark-icon>
                    </div>
                </div>
                <div v-if="showCurrentTime" className="time">{ currentTime }</div>
                {
                    showPopver &&
                    <Popver con={popverContent}/>
                }
                {
                    showHelp &&
                    <Help url={helpImgUrl}/>
                }
            </div>
        </div>
	)
}
// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state: any) {
    return {
        park_id: state.foot.park_id
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setParkId: (value: string) => dispatch({ type: 'SET_PARK_ID', value})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
