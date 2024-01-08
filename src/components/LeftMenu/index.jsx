import { Menu } from 'antd';
import { useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import './index.scss';

const LeftMenu = function(props) {
    const { type, list,  sidebarFold, setSidebarFold } = props;

    const navigate = useNavigate()

    const addFoot = function() {
        
    }

    const openSetting = function() {
        
    }

    const changeMenu = (e) => {
        if(e.key === '/staff') return;
        navigate(e.key, {replace: false})
    };

    return (
        <div className="left-menu h-100">
            <div className={sidebarFold ? 'arrow-icon' : 'arrow-icon collapsed'} onClick={setSidebarFold}>
                <iconpark-icon  size="18" color="#fff" name='ArrowDownSmall' className="arrow"></iconpark-icon>
            </div>
            {/* <transition> */}
                {
                    sidebarFold &&
                    <div className="menu">
                        {
                            type==='foot' ?
                            <div className="menu-btn pointer" onClick={addFoot}>
                                <div className="menu-btn-icon">
                                    <iconpark-icon size="100%" color="#fff" name="Add"></iconpark-icon>
                                </div>
                                <span>添加碳足迹</span>
                            </div>
                            :
                            <div className="menu-btn pointer" onClick={openSetting}>
                                <span>设置碳减排策略</span>
                            </div>
                        }
                        <Menu
                            theme={'dark'}
                            onClick={changeMenu}
                            style={{
                                width: '100%',
                                background: '#1E1E1E',
                                fontSize: '.2rem',
                                color: 'rgba(255, 255, 255, 0.4)'
                            }}
                            defaultOpenKeys={['enterprise', 'staff']}
                            selectedKeys={[window.location.pathname]}
                            mode="inline"
                            items={list}
                        />
                    </div>
                }
            {/* </transition> */}
            {/* <a-drawer
                placement="right"
                :closable="false"
                :visible="showSetting"
                :width="drawerWidth"
                @close="onClose"
                >
                <Setting :showCancel="true" @cancel="onClose" @confirm="confirm"/>
            </a-drawer> */}
            
        </div>
    )
}

// 使用connect函数将state和dispatch映射为props
function mapStateToProps(state) {
    return {
        sidebarFold: state.foot.sidebarFold
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSidebarFold: () => dispatch({ type: 'SET_SIDEBAR_FOLD' })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);