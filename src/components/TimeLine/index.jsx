import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui';

const TimeLine = () => {
    useEffect(() => {
        console.log($('.draggable'))
        // $('.draggable').draggable()
    })

    return (
        <div>
            <div className='draggable'>dfsfsdfsdf</div>
        </div>
    )
}

export default TimeLine;