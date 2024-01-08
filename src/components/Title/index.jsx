import { useState } from 'react';
import { Select } from 'antd';
import Popver from '../Popver';
import { connect } from 'react-redux';
import Help from '../Help';
import './index.scss';

const Title = function({color, title,popverContent, currentTime, showPopver, showHelp=false, helpImgUrl, showSelect, setParkId}) {
    let [screen, setScreen] = useState('FullScreen');
    const [parkList] = useState(JSON.parse(localStorage.getItem('PARK_LIST')));
    let [defaultValue, setDefaultValue] = useState('电试院');

    // 全屏
    const fullScreen = (element) => {
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
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // 切换全屏
    const changeScreen = () => {
        let str = ''
        if (screen == 'FullScreen') {
            str = 'UnFullScreen';
            fullScreen(document.documentElement);
            // this.$store.commit('SET_FULL_SCREEN', 1);
        } else {
            str = 'FullScreen';
            unFullScreen();
            // this.$store.commit('SET_FULL_SCREEN', 0);
        }
        setScreen(str)
    }

    const changePark = (value, option) => {
        setDefaultValue(value)
        setParkId(option.id)
        // parkList.forEach((el) => {
        //     if (el.id == id) {
        //         this.parkValue = el.value
        //     }
        // })
        // this.park_id = id;
        // if (this.showAll) {
        //     this.$store.state.footBoard.park_id = id;
        //     this.$store.state.footBoard.weg_park_id = id;
        // }
        // this.$emit('parkId', id)
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
function mapStateToProps(state) {
    return {
        park_id: state.foot.park_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setParkId: (value) => dispatch({ type: 'SET_PARK_ID', value})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
