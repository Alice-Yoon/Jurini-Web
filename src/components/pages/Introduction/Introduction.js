import React from 'react';
import styled from 'styled-components';

import introduction_dummy from '../../../assets/img/introduction_dummy.png';

function Introduction(props) {
    return (
        <>
            <img 
                src={introduction_dummy} 
                alt="introduction_dummy" 
                className={props.className} 
            />
        </>
    )
}

export default styled(Introduction)`
    width: 100%;
    height: 100%;

`;