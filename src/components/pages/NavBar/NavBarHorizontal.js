import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { toggleSearchBar } from '../../../modules/search';

import SearchBar from './Section/SearchBar';

// import search from '../../../assets/img/search.png';
import question from '../../../assets/img/question.png';
import google from '../../../assets/img/google.png';

function NavBarHorizontal(props) {

    // const isBarShow = useSelector(state => state.search.isBarShow);
    // const dispatch = useDispatch();
    // const onClickToggleBar = () => dispatch(toggleSearchBar());
    const onClickMoveToNotion = () => {
        console.log("주린이 노션으로 이동!")
    }


    return (
        <div className={props.className}>
            <div className="container">
                <p className="title">주린이 달력</p>
                {/* {isBarShow? <SearchBar className="searchBar" /> : null} */}
                <SearchBar className="searchBar" />
                <div className="icons-area">   
                    <img src={question} alt="question-icon" className="iconStyle" onClick={onClickMoveToNotion} />
                    <img src={google} alt="google-icon" className="googleStyle" />
                </div>
            </div>
        </div>
    )
}

export default styled(NavBarHorizontal)`
    /* border: 1px solid red; */
    border-bottom: 1px solid #F6F6F6;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    & {
        .container {
            /* border: 1px solid blue; */
            width: 80%;
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