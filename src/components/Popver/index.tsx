import { Popover } from 'antd';
import parse from 'html-react-parser';
import './index.scss';
import { useState } from 'react';
import ycz from '@/assets/svg/ycz.svg';
import zsz from '@/assets/svg/zsz.svg';
import gs from '@/assets/svg/gs.svg';

type Props = {
    help?: boolean;
    helpObj?: any;
    con?: any
}

const PopverPage = function(props: Props) {
    let {help=false, helpObj, con} = props;

    let [color, setColor] = useState('#999');

    // i内容
    const content = (
        <div className="popover-con">{con && parse(con)}</div>
    )
    // ？号内容
    const helpContent = (
        <div className="help-popover-con">
            <div className="top">
                <div className="con1">
                    <div className="title">电试院</div>
                    <div className="date">测试时间：2022-01-10 至{ helpObj && helpObj.date }</div>
                </div>
                <div className="con2">
                    <div className="p">
                        <span className="text">MAPE</span>
                        <span className="value">{ helpObj && helpObj.MEPA }</span>
                    </div>
                    <div className="p">
                        <span className="text">模型预测正确率</span>
                        <span className="value">{ helpObj &&helpObj.pre_acc }</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="title">模型预测正确率测试</div>
                <div>
                    测试方法：MAPE(平均绝对百分比误差lean Absolute Percentage Error)
                </div>
                <div className="p1">
                    <span className="text">预测值：</span>
                    <div className="icon">
                        <img src={ycz} alt="" />
                    </div>
                </div>
                <div className="p2">
                    <span className="text">真实值：</span>
                    <div className="icon">
                        <img src={zsz} alt="" />
                    </div>
                </div>
                <div className="p3">
                    <img src={gs} alt="" />
                </div>
                <p></p>
                <p>范围[0,+∞)，MAPE 为0%表示完美模型，MAPE 大于 100 %则表示劣质模型。</p>
            </div>
        </div>
    )

    // popver显示/隐藏
    const handleHoverChange = (open: boolean) => {
        let str = '';
        str = open ? '#fff' : '#999';
        setColor(str);
    };

	return (
        <Popover
            content={help ? helpContent : content}
            onOpenChange={handleHoverChange}
            >
            <div className="icon pointer">
                {/* <IconPark className="iconpark-icon" style={{ color, marginRight: '.1rem', fontSize: 12 }} iconName={help ? 'Question' : 'Info-bjej4ag7'}></IconPark> */}
            </div>
        </Popover>
	)
}

export default PopverPage;
