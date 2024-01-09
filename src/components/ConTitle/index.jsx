import { Popover } from 'antd';
import './index.scss';

const ConTitle = function({showPopver, popverContent, title}) {
	return (
        <div className="con-title fw-600">
            <div style={{fontSize: '.2rem'}}>{ title }</div>
            {
                showPopver &&
                <Popover content={popverContent}/>
            }
        </div>
	)
}

export default ConTitle;
