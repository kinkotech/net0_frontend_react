import React, { useState } from 'react';
import { Popover } from 'antd';
import './index.scss';

const PopverPage = function({helpColor}) {
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    )
	return (
        <Popover content={content} title="Title">
            <div className="icon pointer">
                <iconpark-icon
                    name="Question"
                    color='#999'
                    size="24"
                >
                </iconpark-icon>
            </div>
        </Popover>
	)
}

export default PopverPage;
