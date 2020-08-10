import React from 'react';
import styled from 'styled-components';

function SearchBar(props) {
    return (
        <div className={props.className}>
            <input placeholder="검색어를 입력하세요." className="search-bar" />
        </div>
    )
}

export default styled(SearchBar)`
    & {
        .search-bar {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid gray;
        }
    }
`;