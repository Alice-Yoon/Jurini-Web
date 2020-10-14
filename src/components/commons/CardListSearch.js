import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { toggleDetails, updateDetailSymbol } from '../../modules/details';
import {exchangeToKRW} from '../../utils/exchangeToKRW';

function CardListSearch(props) {

    const {symbol, data, exchangeRate} = props;
    
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        setCardData(data[symbol]);
    }, [symbol]);


    const dispatch = useDispatch();
    const openDetails = (payload) => dispatch(toggleDetails(payload));
    const updateSymbol = (payload) => dispatch(updateDetailSymbol(payload));

    const onClickCard = () => {
        openDetails(true);
        updateSymbol(symbol);
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
                        <div className="money">
                            <span className="expected_dividend">$ {cardData.dividends?.toFixed(2)}</span>
                            <span className="exchanged_won">{exchangeToKRW(cardData.dividends, exchangeRate)}원</span>
                        </div>
                    </div>  
            </div>
        )

}

export default styled(CardListSearch)`
<<<<<<< HEAD

=======
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 10px;
    margin: 20px;
<<<<<<< HEAD

    width: 80%;
    height: 111px;

    & {
            .container {

=======
    width: 80%;
    height: 111px;
    & {
            .container {
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
                .smallBoxStyle {
                    border-radius: 8px;
                    background-color: #EAFFE3;
                    padding: 5px 10px;
                    font-size: 12px;
                    color: #218439;
                    margin-right: 3px;
                }
                .title {
                    margin: 15px 0 0 0;
                    display: flex;
                    align-items: center;
                    .companyNameStyle {
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
                            border-left: 2px solid #D6D6D6;
                            padding-left: 5px;
                            margin-left: 5px;
                            color: #767676;
                            font-weight: 500;
                    }
                }
                .money {
                    display: flex;
                    align-items: baseline;

                    .expected_dividend {
                        font-size: 35px;
                        font-weight: 500;
                        margin: 0;
                        padding: 0;
                    }
                    .exchanged_won {
                        font-size: 13px;
                        padding-left: 3px;
                        margin-left: 3px;
                        color: #767676;
                    }
                }
            }

    }

`;