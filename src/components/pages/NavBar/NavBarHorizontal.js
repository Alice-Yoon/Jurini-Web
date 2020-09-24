import React from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { toggleSearchBar } from '../../../modules/search';

import SearchBar from './Section/SearchBar';

// import search from '../../../assets/img/search.png';
import question from '../../../assets/img/question.png';
// import google from '../../../assets/img/google.png';
import google from '../../../assets/img/design/google.png';
import logo from '../../../assets/img/design/logo.png';

function NavBarHorizontal(props) {

    // const isBarShow = useSelector(state => state.search.isBarShow);
    // const dispatch = useDispatch();
    // const onClickToggleBar = () => dispatch(toggleSearchBar());
    const onClickMoveToNotion = () => {
        console.log("주린이 노션으로 이동!")
    }

    const onClickMoveToGoogle = () => {
        console.log("google play로 이동!")
    }


    return (
        <div className={props.className}>
            <div className="container">
                <p className="title">
                    <img src={logo} alt="logo" className="logo" />
                    주린이 달력
                </p>
                <SearchBar className="searchBar" />
                <div className="icons-area">   
                    <img src={question} alt="question-icon" className="iconStyle" onClick={onClickMoveToNotion} />
                    {/* <img src={google} alt="google-icon" className="googleStyle" /> */}
                    <div className="googleStyle" onClick={onClickMoveToGoogle}>
                        <img src={google} alt="google" />
                        <span>Google Play</span>
                    </div>
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
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px 0 50px;

            .title {
            /* border: 1px solid red; */
            font-family: NanumSquareRound;
            font-style: normal;
            font-size: 25px;
            font-weight: bold;
            color: #FF7373;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .logo {
                width: 45px;
                height: 45px;
                margin-right: 5px;
            }
            .searchBar {
                /* border: 1px solid green; */
                flex: 1;
                padding: 0 50px;
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
                    border: 1px solid lightgray;
                    border-radius: 15px;
                    padding: 12px;
                    margin-left: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    > img {
                        margin-right: 10px; 
                    }
                    > span {
                        font-family: Noto Sans KR;
                        font-weight: bold;
                        font-size: 18px;
                    }
                }
            }
        }
        
    }
`;