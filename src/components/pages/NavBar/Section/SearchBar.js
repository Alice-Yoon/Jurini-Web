import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../../../context/GlobalState';
import { useObserver } from 'mobx-react';


function SearchBar(props) {

    const { toggleShowSearchResults } = useContext(GlobalContext);

    const [value, setValue] = useState('');
    

    return useObserver(() => {

        const onChange = (e) => {
            setValue(e.target.value);
        }

        const onSubmitSearch = (e) => {
            e.preventDefault();
            toggleShowSearchResults();
            console.log("search submitted!", value);
        }

        return(
            <div className={props.className}>
                <form onSubmit={onSubmitSearch}>
                    <input 
                        value={value} 
                        onChange={onChange} 
                        placeholder="검색어를 입력하세요." 
                        className="search-bar" 
                        autoFocus={true} 
                    />
                </form>
            </div>
        )

        })
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