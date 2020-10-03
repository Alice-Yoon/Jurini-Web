import React from 'react';
import styled from 'styled-components';

function CalendarCard(props) {
    return (
        <div className={props.className}>
            {props.symbol}
        </div>
    )
}

export default styled(CalendarCard)`
    border: 1px solid blue;
    /* margin: 5px 0; */
`;
