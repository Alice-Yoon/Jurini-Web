import React from 'react';
import styled from 'styled-components';

import chart from '../../../../assets/img/chart_dummy.png';

function DetailsChart(props) {
    return (
        <div className={props.className}>
            <img src={chart} alt="chart-dummy" />
        </div>
    )
}

export default styled(DetailsChart)`
    /* border: 1px solid green; */
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    & {
        img {
            width: 100%;
            height: 300px;
        }
    }
`;
