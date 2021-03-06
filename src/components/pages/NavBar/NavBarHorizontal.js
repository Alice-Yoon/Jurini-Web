import React from 'react';
import styled from 'styled-components';

import SearchBar from './Section/SearchBar';

import question from '../../../assets/img/question.png';
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
                        <a href='https://play.google.com/store/apps/details?id=com.calandar.joorini_for_android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank'>
                            <img className="google_badge" alt='다운로드하기 Google Play' src='https://play.google.com/intl/ko/badges/static/images/badges/ko_badge_web_generic.png'/>
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
            width: 1150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px 0 50px;
            position: relative;

            .title {
            min-width: 150px;
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
                    .google_badge {
                        width: 150px;
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