import React from 'react';
import styled from 'styled-components';

import news from '../../../../assets/img/news_dummy.png';

function DetailsNews(props) {
    return (
        <div className={props.className}>
            <h2>관련 뉴스</h2>
            <img src={news} alt="news-dummy" />
            <img src={news} alt="news-dummy" />
            <img src={news} alt="news-dummy" />
            <img src={news} alt="news-dummy" />
            <img src={news} alt="news-dummy" />
            <img src={news} alt="news-dummy" />
        </div>
    )
}

export default styled(DetailsNews)`
    /* border: 1px solid aqua; */
    
    & {
        img {
            width: 100%;
        }
    }
`;
