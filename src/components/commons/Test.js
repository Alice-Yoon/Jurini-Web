import styled from 'styled-components';
import React, { useState, useEffect } from 'react'; 

function Test({date, today}){

    // 각 newArr의 요소마다 Test컴포넌트가 실행됨
    console.log(date);
    console.log(today);

    return(
        <div>
            <div>{date}</div>
        </div>
    )
}

export default Test;