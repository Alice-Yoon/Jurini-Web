import React, { useContext } from 'react';
import styled from 'styled-components';

import CardList from '../../commons/CardList';

import { GlobalContext } from '../../context/GlobalState';
import { useObserver } from 'mobx-react';


function SearchResult(props) {

    const { data } = useContext(GlobalContext);

    return useObserver(() => (

        <div className={props.className}>
            {data && data.map((data, index) => (
                    <CardList key={index} data={data} />
                ))}
        </div>
    ))
}

export default styled(SearchResult)`
    /* border: 1px solid blue; */
    overflow: auto;
    
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 60%;
    height: 60%;
    margin-top: 100px;
    margin-left: 200px;
    margin-right: 10px;
    background-color: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
`;