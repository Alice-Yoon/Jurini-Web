import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSearchResult, closeSearchBar, updateInputValue} from '../../../modules/search';

// import {cardDummyData} from '../../../assets/dummy/cardDummyData';
import CardListSearch from '../../commons/CardListSearch';

function SearchResult(props) {
    
    const searchTerm = useSelector(state => state.search.inputValue);

    const dispatch = useDispatch();
    const onCloseSearchResult = (payload) => dispatch(toggleSearchResult(payload));
    const onCloseSearchBar = (payload) => dispatch(closeSearchBar(payload));
    const emptyInputvalue = (value) => dispatch(updateInputValue(value));

    
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {

        const fetchSearchData = async() => {
            // 검색어 불러와서!
            await Axios.get(`http://20.194.41.177:21000/rest/getRecommendKeyword?keyword=${searchTerm}`)
                .then((res) => {
                    const firstRes = res.data.data

                    const keys = firstRes.map(data => data["1. symbol"]);
                    const keysArr = keys.toString();

                    Axios.get(`http://20.194.41.177:21000/rest/getMultipleDividendsInfo?symbol_list=${keysArr}`)
                    .then(res => {
                        const final_keys = Object.keys(res.data.data);
                        setData(res.data.data);
                        setSymbols(final_keys);
                    });
                });
        }
        fetchSearchData();

    }, [searchTerm]);

    


    const onClickCloseBtn = (e) => {
        const target = e.target.id;
        if(target === 'container' || target === 'close-btn') {
            onCloseSearchResult(false);
            onCloseSearchBar(false);
            emptyInputvalue('');
        }
    }

    return(
        <div className={props.className} id="container" onClick={onClickCloseBtn}>
            <div className="container_result">
                <div className="close-btn">
                    <span id="close-btn">X</span>
                </div>
                <div className="card-list">
                    {symbols && symbols.map((symbol, index) => (
                            <CardListSearch key={index} symbol={symbol} data={data} />
                    ))}
                </div>
            </div>
        </div>
    )

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