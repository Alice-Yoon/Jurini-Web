import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../api/api';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSearchResult, closeSearchBar, updateInputValue} from '../../../modules/search';

// import {cardDummyData} from '../../../assets/dummy/cardDummyData';
import CardListSearch from '../../commons/CardListSearch';
import no_data from '../../../assets/img/design/no-data.png';
import Loader from '../../commons/Loader';

function SearchResult(props) {

    const {exchangeRate} = props;
    
    const searchTerm = useSelector(state => state.search.inputValue);

    const dispatch = useDispatch();
    const onCloseSearchResult = (payload) => dispatch(toggleSearchResult(payload));
    const onCloseSearchBar = (payload) => dispatch(closeSearchBar(payload));
    const emptyInputvalue = (value) => dispatch(updateInputValue(value));

    
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {

        const fetchSearchData = async() => {
            const searchData = await API.search(searchTerm);
            setData(searchData?.data);
            setSymbols(searchData?.final_keys);
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
                    {
                        symbols?.length === 0 ? <div className="loading"><div className="loader"></div></div>

                        : symbols === undefined ?
                            <div className="no_data">
                                <img src={no_data} alt="no_data" className="no_data_icon" />
                                <p>검색 결과가 없습니다.</p>
                            </div>

                        : symbols && symbols.map((symbol, index) => (
                                <CardListSearch key={index} symbol={symbol} data={data} exchangeRate={exchangeRate} />
                        ))
                    }
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
            max-width: 600px;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            transform: translateX(-30px);
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
            .loading {
                /* border: 1px solid blue; */
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .loader {
                border: 5px solid #f3f3f3;
                border-top: 5px solid gray;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 2s linear infinite;
            }
        }
        .no_data {
                text-align: center;
                margin-top: 100px;
                color: #767676;
                > h1 {
                    font-size: 25px;
                }
                .no_data_icon {
                    /* border: 1px solid red; */
                    width: 100px;
                    height: 100px;
                }
            }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
    }
`;