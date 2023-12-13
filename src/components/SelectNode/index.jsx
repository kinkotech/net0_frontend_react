import React, { useState } from 'react';
import './index.scss'

const SelectNode = function({nodeName, level}) {
	
	return (
		<div className="node-name">
            <div className={'circle color'+level}><span></span></div>
            { nodeName }
        </div>
	)
}

export default SelectNode
