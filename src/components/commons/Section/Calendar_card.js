import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CalendarCard(props) {
    // comment-out 된것들 : 회사이름 - 자리가 모자라서 일단 숨김.
    // const data = props.data[symbol];

    const {symbol, selectedKeysArr_dividend, selectedKeysArr_payment} = props;

    const [background, setBackground] = useState('');
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        if (selectedKeysArr_dividend?.includes(symbol)) {
            // 배당락일
            setBackground('#EAFFE3')
            setTextColor('#218439')
        } else if(selectedKeysArr_payment?.includes(symbol)) {
            // 배당지급일
            setBackground('#FFECDA')
            setTextColor('#FF7373')
        }
    }, [])



    return (
        <div className={props.className} style={{backgroundColor: background, color: textColor}}>
            <span className="co_symbol">{symbol}</span>
        </div>
    )
}

export default styled(CalendarCard)`
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    padding-left: 10px;
    font-weight: 500;
    font-size: 15px;

    & {
        .co_symbol {
            /* border: 1px solid green; */
        }
    }
`;
