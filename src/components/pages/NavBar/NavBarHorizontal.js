import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {GlobalContext} from '../../context/GlobalState';

import SearchBar from './Section/SearchBar';

import search from '../../../assets/img/search.png';
import google from '../../../assets/img/google.png';

function NavBarHorizontal(props) {

    const { toggleShowSearchResults } = useContext(GlobalContext);

    const [showSearchBar, setShowSearchBar] = useState(false);


    const onClickSearchIcon = () => {
        setShowSearchBar(!showSearchBar);
        toggleShowSearchResults();
    }

    return (
        <div className={props.className}>
            <div className="container">
                <p className="title">주린이 달력</p>
                {showSearchBar? <SearchBar className="searchBar" /> : null}
                <div className="icons-area">   
                    <img src={search} alt="search-icon" className="iconStyle" onClick={onClickSearchIcon} />
                    <img src={google} alt="google-icon" className="googleStyle" />
                </div>
            </div>
        </div>
    )
}

export default styled(NavBarHorizontal)`

    & {
        .container {
            /* border: 2px solid black; */
            background-color: #C4C4C4;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px 0 50px;

            .title {
            /* border: 1px solid red; */
            font-size: 25px;
            font-weight: bold;
            }
            .searchBar {
                /* border: 1px solid green; */
                flex: 1;
                padding: 0 100px;
            }

            .icons-area {
                display: flex;
                align-items: center;

                .iconStyle {
                    /* border: 1px solid blue; */
                    height: 30px;
                    width: 30px;
                    font-size: 18px;
                    margin-left: 20px;
                    outline: none;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .googleStyle {
                    /* border: 1px solid yellow; */
                    height: 50px;
                    width: 100px;
                    margin-left: 50px;
                }
            }
        }
        
    }
`;