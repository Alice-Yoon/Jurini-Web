import React from 'react';
import styled from 'styled-components';

function CalendarCard(props) {

    const symbol = props.symbol;
    const data = props.data[symbol];

    return (
        <div className={props.className}>
            {/* <span className="co_name">{data.name}-</span> */}
            <span className="co_symbol">{symbol}</span>
        </div>
    )
}

export default styled(CalendarCard)`
    border: 1px solid blue;
    /* margin: 5px 0; */
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
