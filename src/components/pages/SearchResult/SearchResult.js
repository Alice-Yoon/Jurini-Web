import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSearchResult, closeSearchBar, updateInputValue} from '../../../modules/search';

import CardList from '../../commons/CardList';

import {cardDummyData} from '../../../assets/dummy/cardDummyData';

function SearchResult(props) {
    const showSearchResult = useSelector(state => state.search.isResultShow);
    const dispatch = useDispatch();
    const onCloseSearchResult = (payload) => dispatch(toggleSearchResult(payload));
    const onCloseSearchBar = (payload) => dispatch(closeSearchBar(payload));
    const emptyInputvalue = (value) => dispatch(updateInputValue(value));


    const onClickCloseBtn = (e) => {
        const target = e.target.id;
        if(target === 'container' || target === 'close-btn') {
            onCloseSearchResult(false);
            onCloseSearchBar(false);
            emptyInputvalue('');
        }
    }
 
    if(showSearchResult) {
        
        return(
            <>
            <div className={props.className} id="container" onClick={onClickCloseBtn}>
                <div className="container_result">
                    <div className="close-btn">
                        <span id="close-btn">X</span>
                    </div>
                    <div className="card-list">
                        {cardDummyData && cardDummyData.map((data, index) => (
                                <CardList key={index} data={data} />
                            ))}
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return null;
    }
}

export default styled(SearchResult)`
    /* border: 1px solid blue; */
  
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: 80px;
    /* margin-left: 220px; */
    margin-right: 10px;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;

    & {
        .container_result {
            /* border: 1px solid green; */
            border-radius: 15px;
            background-color: #fff;
            box-shadow: 0 0 3px rgba(0,0,0,0.7);
            width: 40%;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .close-btn {
            /* border: 1px solid red; */
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 500;
            color: gray;
            cursor: pointer;
        }
        .card-list {
            /* border: 1px solid yellow; */
            width: 85%;
            height: 85%;
            overflow: auto;
        }
    }
`;