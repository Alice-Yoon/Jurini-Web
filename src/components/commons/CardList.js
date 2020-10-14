import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { dateToMilli } from '../../utils/dateMilliConverter';
import { useDispatch } from 'react-redux';
import { toggleDetails, updateDetailSymbol } from '../../modules/details';
import {exchangeToKRW} from '../../utils/exchangeToKRW';

function CardList(props) {

    const { symbol, selectedDateMilli, todayMilli, exchangeRate } = props;
    
    const [data, setData] = useState([]);
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('');
    const [dDay, setDday] = useState(0);
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        setData(props.data);

        const paymentDateformatted = moment(props.data.payment_date).format("MM/DD/YYYY")
        const paymentDateMilli = dateToMilli(paymentDateformatted);
        
        const Dday = selectedDateMilli - todayMilli;
        const Dday_n = moment.duration(Dday).asDays();
        setDday(Dday);

        if(selectedDateMilli === paymentDateMilli) {
            if(Dday === 0) {
                setTag(`배당지급일`);
                setColor('#FFF3E1');
                setTextColor('#CC3E01');
            } else {
                setTag(`배당지급일 D-${Dday_n}`);
                setColor('#FFF3E1');
                setTextColor('#CC3E01');
            }
        } else {
            if(Dday === 0) {
                setTag('배당락일');
                setColor('#EAFFE3');
                setTextColor('#218439')
            } else if (Dday < 0) {
                setTag('배당락일 지남');
                setColor('#EAFFE3');
                setTextColor('#218439')
            } else {
                setTag(`배당락일 D-${Dday_n}`);
                setColor('#EAFFE3');
                setTextColor('#218439')
            }
        }

    }, []);


    const dispatch = useDispatch();
    const openDetails = (payload) => dispatch(toggleDetails(payload));
    const updateSymbol = (payload) => dispatch(updateDetailSymbol(payload));

    const onClickCard = () => {
        openDetails(true);
        updateSymbol(symbol)
    }


    return (
        <div onClick={onClickCard} 
            className={props.className} 
            style={{ borderLeft: `20px solid ${color}`}}
        >
                <div className="container">
                    <div>
                        <span className="smallBoxStyle" style={{ backgroundColor: '#EDF6FF', color: '#035BAC'}}>배당률 {data?.dividends_rate}%</span>
                        <span className="smallBoxStyle" style={{display: dDay < 0 ? 'none' : 'inline', backgroundColor: color, color: textColor}}>{tag}</span>
                    </div>
                    <div className="title">
                        <span className="companyNameStyle">{data?.name}</span>
                        <span className="symbolStyle">{symbol}</span>
                    </div>
                    <div className="money">
                        <span className="expected_dividend">$ {data?.dividends?.toFixed(2)}</span>
                        <span className="exchanged_won">{exchangeToKRW(data?.dividends, exchangeRate)}원</span>
                    </div>
                </div>  
        </div>
    )
}

export default styled(CardList)`
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 10px;
    margin: 20px;

    width: 280px;
    height: 111px;

    & {
            .container {
                .smallBoxStyle {
                    border-radius: 8px;
                    background-color: #EAFFE3;
                    padding: 5px 10px;
                    font-size: 12px;
                    margin-right: 3px;
                }
                .title {
                    margin: 7px 0;
                    display: flex;
                    align-items: center;
                    .companyNameStyle {
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
                        font-size: 15px;
                        padding-left: 3px;
                        margin-left: 3px;
                        color: #767676;
                    }
                }
            }

    }

`;