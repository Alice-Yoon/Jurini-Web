import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import CardList from '../../commons/CardList';

import {cardDummyData} from '../../../assets/dummy/cardDummyData';

function SearchResult(props) {
    const { showSearchResult, setShowSearchResult, toggleSearchBar, toggleCompanyDetails } = props;


    const onClickCloseBtn = () => {
        console.log("onClickCloseBtn");
        setShowSearchResult(false);
        toggleSearchBar();
    }
 
    if(showSearchResult) {
        
        return(
            <>
            <div className={props.className}>
                <div className="close-btn" onClick={onClickCloseBtn}>
                    <span>X</span>
                </div>
                <div className="card-list">
                    {cardDummyData && cardDummyData.map((data, index) => (
                            <CardList key={index} data={data} toggleCompanyDetails={toggleCompanyDetails} />
                        ))}
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
    width: 60%;
    height: 60%;
    margin-top: 100px;
    margin-left: 200px;
    margin-right: 10px;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    & {
        .close-btn {
            /* border: 1px solid red; */
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 500;
            color: white;
            font-weight: bold;
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