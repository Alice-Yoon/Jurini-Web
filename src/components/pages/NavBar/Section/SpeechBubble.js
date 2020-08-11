import React from 'react'
import styled from 'styled-components'

function SpeechBubble(props) {
    return (
        <div className={props.className}>
            <span>주린이 달력 앱을 다운로드 하시면 본인이 가지고 있는<br/> 
                주식에 따른 달력을 커스터마이징 할 수 있어요!</span>
        </div>
    )
}

export default styled(SpeechBubble)`
    background-color: #B9B8FF;
    box-shadow: 0 2px 7px rgba(0,0,0,0.5);
    color: #000;
    padding: 5px;
    border-radius: 5px;

    animation: bounce 0.8s infinite linear;
    @keyframes bounce {
        0%   { transform: translateY(0); }
        50%  { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;