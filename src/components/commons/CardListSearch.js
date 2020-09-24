import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../modules/details';

function CardListSearch(props) {

    const {symbol, data} = props;
    
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        setCardData(data[symbol]);
    }, [symbol]);


    const dispatch = useDispatch();
    const openDetails = (payload) => dispatch(toggleDetails(payload));

    const onClickCard = () => {
        openDetails(true);
    }

        return (
            <div onClick={onClickCard} className={props.className}>
                    <div className="container">
                        <div>
                            <span className="smallBoxStyle" style={{ backgroundColor: '#EDF6FF', color: '#035BAC'}}>배당률 {cardData.dividends_rate}%</span>
                        </div>
                        <div className="title">
                            <span className="companyNameStyle">{cardData.name}</span>
                            <span className="symbolStyle">{symbol}</span>
                        </div>
                        <p className="expected_dividend">$ {cardData.dividends?.toFixed(2)}</p>
                    </div>  
            </div>
        )

}

export default styled(CardListSearch)`

    /* border: 1px solid red; */
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 10px;
    margin: 20px;

    /* width: 100%; */
    width: 80%;
    height: 111px;
    /* font-family: Nato Sans KR; */
    /* font-style: normal; */

    & {
            .container {
                /* border: 1px solid green; */
                /* margin: 10px; */

                .smallBoxStyle {
                    /* border: 1px solid gray; */
                    border-radius: 8px;
                    background-color: #EAFFE3;
                    padding: 5px 10px;
                    font-size: 12px;
                    color: #218439;
                    margin-right: 3px;
                }
                .title {
                    /* border: 1px solid blue; */
                    margin: 15px 0 0 0;
                    display: flex;
                    align-items: center;
                    .companyNameStyle {
                        /* border: 1px solid red; */

                        white-space: nowrap;
                        overflow: hidden;
                        max-width: 65%;
                        text-overflow: ellipsis;

                        font-family: Nato Sans KR;
                        font-size: 18px;
                        font-weight: 500;
                        margin: 0;
                        padding: 0;

                    }
                    .symbolStyle {
                            /* border: 1px solid green; */
                            border-left: 2px solid #D6D6D6;
                            padding-left: 5px;
                            margin-left: 5px;
                            color: #767676;
                            font-weight: 500;
                    }
                }
                .expected_dividend {
                    /* border: 1px solid blue; */
                    font-size: 35px;
                    font-weight: 500;
                    margin: 0;
                    padding: 0;
                }
            }

    }

`;