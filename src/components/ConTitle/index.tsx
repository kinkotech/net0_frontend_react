import { Popover } from 'antd';
import './index.scss';

type Props = {
    showPopver?: boolean;
    popverContent?: string;
    title?: string
}

const ConTitle = function(props: Props) {
    let {showPopver, popverContent, title} = props;
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
