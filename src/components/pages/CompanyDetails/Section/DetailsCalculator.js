import React from 'react';
import styled from 'styled-components';

import calculator from '../../../../assets/img/calculator_dummy.png';

function DetailsCalculator(props) {
    return (
        <div className={props.className}>
            <img src={calculator} alt="calculator-dummy" />
        </div>
    )
}

export default styled(DetailsCalculator)`
    /* border: 1px solid blue; */
    flex:1;
    display: flex;
    justify-content: center;

    & {
        img {
            width: 60%;
            height: 40%;
        }
    }
`;
