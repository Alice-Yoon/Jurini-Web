import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { dateToMilli } from '../../utils/dateMilliConverter';
import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../modules/details';

function CardList(props) {

    const { selectedDateMilli, todayMilli} = props;
    
    const [data, setData] = useState([]);
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setData(props.data);
        const paymentDateMilli = dateToMilli(data.payment_date); // 배당지급일
        const Dday = selectedDateMilli - todayMilli;
        const Dday_n = moment.duration(Dday).asDays();

        if(selectedDateMilli === paymentDateMilli) {
            console.log("배당지급일, green")
        } else {
            if(Dday === 0) {
                setTag('배당락일');
                setColor('#FFF3E1');
            } else if (Dday < 0) {
                setTag('배당락일 지남?');
                setColor('#FFF3E1');
            } else {
                setTag(`배당락일 D-${Dday_n}`);
                setColor('#FFF3E1');
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
            <div className="leftSectionStyle">
                    <span className="smallBoxStyle" style={{ backgroundColor: '#EDF6FF', color: '#035BAC'}}>배당률 {data.dividends_rate}%</span>
                    <span className="smallBoxStyle">{tag}</span>
                    <p className="companyNameStyle">{data.name}</p>
                </div>
                <div className="rightSectionStyle">
                    <div className="rightSection_Bottom">
                        <p className="expected_dividend">$ {data.dividends?.toFixed(2)}</p>
                        {/* <span>주당</span> */}
                    </div>
                </div>
        </div>
    )
}

export default styled(CardList)`

    border-radius: 16px;
    /* border-top-right-radius: 7px;
    border-bottom-right-radius: 7px; */
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    padding: 10px 25px;
    /* display: flex; */
    margin: 20px;

    & {
        .leftSectionStyle {
            /* border: 1px solid red; */
            /* flex: 1; */
            .smallBoxStyle {
                /* border: 1px solid gray; */
                border-radius: 8px;
                background-color: #EAFFE3;
                padding: 2px 8px;
                font-size: 12px;
                color: #218439;
            }
            .companyNameStyle {
                /* border: 1px solid red; */

                /* padding: 2px 5px; */
                white-space: nowrap;
                overflow: hidden;
                /* height: 30px; */
                width: 160px;
                text-overflow: ellipsis;

                font-size: 1.6rem;
                font-weight: bold;
                margin: 0;
                margin-top: 3px;
            }
        }
        .rightSectionStyle {
            /* border: 1px solid blue; */
            /* flex: 1; */
            .rightSection_Top {
                padding-right: 20px;
                font-size: 0.8rem;
                > span {
                    margin-right: 10px;
                }
            }
            .rightSection_Bottom {
                > p {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin: 0;
                }
            }
        }
    }

`;