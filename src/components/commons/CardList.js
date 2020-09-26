import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { dateToMilli } from '../../utils/dateMilliConverter';
import { useDispatch } from 'react-redux';
import { toggleDetails, updateDetailSymbol } from '../../modules/details';
import {exchangeToKRW} from '../../utils/exchangeToKRW';

function CardList(props) {

    const { symbol, selectedDateMilli, todayMilli, exchangeRate} = props;
    
    const [data, setData] = useState([]);
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setData(props.data[symbol]);
        const paymentDateMilli = dateToMilli(data.payment_date); // 배당지급일
        const Dday = selectedDateMilli - todayMilli;
        const Dday_n = moment.duration(Dday).asDays();

        if(selectedDateMilli === paymentDateMilli) {
            console.log("배당지급일, #FFF3E1 (green)")
        } else {
            if(Dday === 0) {
                setTag('배당락일');
                setColor('#EAFFE3');
            } else if (Dday < 0) {
                setTag('배당락일 지남?');
                setColor('#EAFFE3');
            } else {
                setTag(`배당락일 D-${Dday_n}`);
                setColor('#EAFFE3');
            }
        }

    }, []);


    const dispatch = useDispatch();
    const openDetails = (payload) => dispatch(toggleDetails(payload));
    const updateSymbol = (payload) => dispatch(updateDetailSymbol(payload));

    const onClickCard = () => {
        openDetails(true);
        // console.log("card symbol:", symbol);
        updateSymbol(symbol)
    }


    return (
        <div onClick={onClickCard} 
            className={props.className} 
            // style={{ borderLeft: `20px solid ${color}`}}
            style={{ borderLeft: `20px solid #EAFFE3`}}
        >
                <div className="container">
                    <div>
                        <span className="smallBoxStyle" style={{ backgroundColor: '#EDF6FF', color: '#035BAC'}}>배당률 {data.dividends_rate}%</span>
                        <span className="smallBoxStyle">{tag}</span>
                    </div>
                    <div className="title">
                        <span className="companyNameStyle">{data.name}</span>
                        <span className="symbolStyle">{symbol}</span>
                    </div>
                    <div className="money">
                        <span className="expected_dividend">$ {data.dividends?.toFixed(2)}</span>
                        {/* <span className="exchanged_won">{Math.floor(data.dividends?.toFixed(2) * exchangeRate)}원</span> */}
                        <span className="exchanged_won">{exchangeToKRW(data.dividends, exchangeRate)}원</span>
                    </div>
                </div>  
        </div>
    )
}

export default styled(CardList)`

    /* border: 1px solid red; */
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 10px;
    margin: 20px;

    width: 80%;
    height: 111px;

    & {
            .container {
                /* border: 1px solid green; */

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
                    margin: 7px 0;
                    display: flex;
                    align-items: center;
                    .companyNameStyle {
                        /* border: 1px solid red; */

                        white-space: nowrap;
                        overflow: hidden;
                        max-width: 65%;
                        text-overflow: ellipsis;

                        font-family: Nato Sans KR;
                        font-size: 23px;
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
                .money {
                    /* border: 1px solid red; */

                    display: flex;
                    align-items: baseline;

                    .expected_dividend {
                        /* border: 1px solid blue; */
                        font-size: 35px;
                        font-weight: 500;
                        margin: 0;
                        padding: 0;
                    }
                    .exchanged_won {
                        /* border: 1px solid blue; */
                        /* border-left: 1px solid #D6D6D6; */
                        font-size: 15px;
                        padding-left: 3px;
                        margin-left: 3px;
                        color: #767676;
                    }
                }
            }

    }

`;