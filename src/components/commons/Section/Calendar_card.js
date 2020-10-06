import React from 'react';
import styled from 'styled-components';

function CalendarCard(props) {

    const symbol = props.symbol;

    // comment-out 된것들 : 회사이름 - 자리가 모자라서 일단 숨김.
    // const data = props.data[symbol];

    return (
        <div className={props.className}>
            {/* <span className="co_name">{data.name}-</span> */}
            <span className="co_symbol">{symbol}</span>
        </div>
    )
}

export default styled(CalendarCard)`
    border: 1px solid blue;
    display: flex;
    align-items: center;

    & {
        /* .co_name {
            border: 1px solid red;
            white-space: nowrap;
            overflow: hidden;
            max-width: 80%;
            text-overflow: ellipsis;
        } */
        .co_symbol {
            /* border: 1px solid green; */
        }
    }
`;
