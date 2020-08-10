import React, {useState} from 'react';
import styled from 'styled-components';

function SearchBar(props) {
    const { toggleShowSearchResult } = props;

    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        toggleShowSearchResult(value);
    }

    const onClickEmpty = () => {
        setValue('');
    }

    return (
        <div className={props.className}>
            <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} onClick={onClickEmpty} placeholder="검색어를 입력하세요." className="search-bar" autoFocus={true} />
            </form>
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