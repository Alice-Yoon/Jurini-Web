import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { dateToMilli } from '../../utils/dateMilliConverter';
import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../modules/details';

function CardList(props) {

    const { symbol, selectedDateMilli, todayMilli} = props;
    // console.log("card-symbol:", symbol);
    
    const [data, setData] = useState([]);
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setData(props.data);
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

    const onClickCard = () => {
        openDetails(true);
    }

    return (
        <div onClick={onClickCard} className={props.className} style={{ borderLeft: `20px solid ${color}`}}>
                <div className="container">
                    <div>
                        <span className="smallBoxStyle" style={{ backgroundColor: '#EDF6FF', color: '#035BAC'}}>배당률 {data.dividends_rate}%</span>
                        <span className="smallBoxStyle">{tag}</span>
                    </div>
                    <div>
                        <span className="companyNameStyle">{data.name}</span>
                        <span style={{borderLeft: '1.5px solid gray', marginLeft: '5px'}}>{symbol}</span>
                    </div>
                    <p className="expected_dividend">$ {data.dividends?.toFixed(2)}</p>
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
                    padding: 2px 8px;
                    font-size: 12px;
                    color: #218439;
                    margin-right: 3px;
                }
                .companyNameStyle {
                    /* border: 1px solid red; */

                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                    text-overflow: ellipsis;

                    font-family: Nato Sans KR;
                    font-size: 18px;
                    font-weight: 500;
                    margin: 0;
                    padding: 0;

                }
                .expected_dividend {
                    /* border: 1px solid blue; */
                    font-size: 30px;
                    font-weight: 500;
                    margin: 0;
                    padding: 0;
                }
            }

    }

`;