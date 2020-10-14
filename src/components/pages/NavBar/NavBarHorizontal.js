import React from 'react';
import styled from 'styled-components';

import SearchBar from './Section/SearchBar';

import question from '../../../assets/img/question.png';
import google_icon from '../../../assets/img/final/google_icon.png';
import appicon from '../../../assets/img/final/appicon.png';
import SpeechBubble from './Section/SpeechBubble';

function NavBarHorizontal(props) {
    return (
        <div className={props.className}>
            <div className="container">
                <p className="title">
                    <img src={appicon} alt="logo" className="logo" />
                    주린이 달력
                </p>
                <SearchBar className="searchBar" />
                <div className="icons-area">
                    <a href="https://www.notion.so/f5d8905218414bd69db83bd4795e07b9" target="_blank" rel="noopener noreferrer">
                        <img src={question} alt="question-icon" className="iconStyle" />
                    </a>   
                    <div className="googleStyle">
                        <img src={google_icon} alt="google" />
                        <a href="https://play.google.com/store/apps/" target="_blank" rel="noopener noreferrer">
                            Google Play
                        </a>
                    </div>
                </div>
                <SpeechBubble className="speech-bubble" />
            </div>
        </div>
    )
}

export default styled(NavBarHorizontal)`
    border-bottom: 1px solid #F6F6F6;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    & {
        .container {
<<<<<<< HEAD
            width: 85%;
=======
            width: 1150px;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px 0 50px;
            position: relative;

            .title {
<<<<<<< HEAD
=======
            min-width: 150px;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
            font-family: NanumSquareRound;
            font-style: normal;
            font-size: 20px;
            font-weight: bold;
            color: #FF7373;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .logo {
                margin-right: 5px;
            }
            .searchBar {
                flex: 1;
                padding: 0 30px;
            }
            .icons-area {
                display: flex;
                align-items: center;

                .iconStyle {
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
                    border-radius: 10px;
                    padding: 7px 15px;
                    margin-left: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    width: 120px;
                    > img {
                        margin-right: 10px; 
                    }
                    > a {
                        text-decoration: none;
                        font-weight: bold;
                        font-size: 18px;
                        color: #000;
                    }
                }
            }
            .speech-bubble {
                    position: absolute;
                    top: 80px;
                    right: -25px;
                    z-index: 50;
            }
        }
        
    }
`;