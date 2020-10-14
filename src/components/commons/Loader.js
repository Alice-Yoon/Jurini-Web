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
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid gray;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }
}
`;
