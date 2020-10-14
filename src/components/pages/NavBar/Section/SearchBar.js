import React, {useState} from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { toggleSearchResult, updateInputValue } from '../../../../modules/search';

function SearchBar(props) {
    const dispatch = useDispatch();
    const openSearchResult = (payload) => dispatch(toggleSearchResult(payload));
    const onUpdateInputValue = (value) => dispatch(updateInputValue(value));

    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        openSearchResult(true);
        onUpdateInputValue(value);
    }

    const onClickEmpty = () => {
        setValue('');
    }

    return (
        <div className={props.className}>
            <form className="form" onSubmit={onSubmit}>
                <input 
                    value={value} 
                    onChange={onChange} 
                    onClick={onClickEmpty} 
                    placeholder="종목명을 입력하세요." 
                    className="search-bar" 
                />
            </form>
        </div>
    )
}

export default styled(SearchBar)`
    & {
        .search-bar {
            background-color: #F6F6F6;
            border: 1px solid #fff;
            border-radius: 24px;
            min-width: 600px;
            padding: 10px;
            color: #A7A7A7;
            &:focus {
                border: 1px solid #FF7373;
                outline: none;
                background-color: #fff;
                color: #000;
            }
        }
    }
`;