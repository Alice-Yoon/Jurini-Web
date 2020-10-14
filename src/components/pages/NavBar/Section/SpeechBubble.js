import React, {useState} from 'react'
import styled from 'styled-components'

function SpeechBubble(props) {

    const [isSpeechShow, setIsSpeechShow] = useState(true);

    const closeSpeechBubble = () => {
        setIsSpeechShow(false)
    }

    if(isSpeechShow) {
        return (
            <div className={props.className}>
                <div className="top"></div>
                <span onClick={closeSpeechBubble} className="closeBtn">X </span>
                <span><strong>주린이달력 앱</strong>을 다운받고,<br/> 
                    내 주식으로 달력을 커스텀하세요!</span>
            </div>
        )
    } else {
        return null
    }
}

export default styled(SpeechBubble)`
    background: linear-gradient(135deg, #FFB39B 4.17%, #FF8399 125%);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    color: #fff;
    padding: 8px;
    border-radius: 10px;
    position: relative;

    & {
        .top {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #FFB39B;

            background: inherit;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
            z-index: -100;
        }
        .closeBtn {
            position: absolute;
            top: 7px;
            right: 10px;
            font-size: 12px; 
            cursor: pointer;
        }
    }
    animation: bounce 0.8s infinite linear;
    @keyframes bounce {
        0%   { transform: translateY(0); }
        50%  { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;