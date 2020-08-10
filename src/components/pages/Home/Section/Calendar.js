import React from 'react';
import styled from 'styled-components';

import calendar from '../../../../assets/img/calendar_dummy.png';

function Calendar(props) {
    return (
        <div className={props.className}>
            <img src={calendar} alt="calendar_dummy" />
        </div>
    )
}

export default styled(Calendar)`
    width: 100%;
    height: 100%;

`;