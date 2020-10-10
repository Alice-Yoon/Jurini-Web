import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <div className="loading"><div className="loader"></div></div>
    )
}

export default styled(Loader)`
 & {
    .loading {
        /* border: 1px solid blue; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loader {
        border: 5px solid #f3f3f3; /* Light grey */
        border-top: 5px solid gray; /* Blue */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }
}
`;
