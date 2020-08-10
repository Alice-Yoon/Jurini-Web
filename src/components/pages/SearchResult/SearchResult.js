import React, { useContext } from 'react';
import styled from 'styled-components';

import CardList from '../../commons/CardList';

import {cardDummyData} from '../../../assets/dummy/cardDummyData';

function SearchResult(props) {


    return(
        <div className={props.className}>
            {cardDummyData && cardDummyData.map((data, index) => (
                    <CardList key={index} data={data} />
                ))}
        </div>
    )
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