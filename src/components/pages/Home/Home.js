import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';
import DropDown from './Section/DropDown';

import { dateToMilli } from '../../../utils/dateMilliConverter';
import API from '../../../api/api';

function Home(props) {

    const { exchangeRate } = props;

    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);

    // 오늘 날짜
    const today = moment().format("MM/DD/YYYY");
    const todayMilli = dateToMilli(today);

    // 선택된 날짜
    const selectedDate = moment("09/16/2020").format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate); // 이날짜 기준 '배당락일'

    useEffect(() => {

        const getDailyDividendsData = async() => {
            const getMonthlyDividendsData = await API.cards(selectedDateMilli);
            // console.log("getMonthlyDividendsData", getMonthlyDividendsData);
            setData(getMonthlyDividendsData?.monthlyData);
            setKeys(getMonthlyDividendsData?.keyArr)
        }
        getDailyDividendsData();

    }, []);

    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               <DropDown date={selectedDate} />
               <div className="card-list">
                {
                    keys.map((symbol, index) => (
                        <CardList 
                            key={index} 
                            data={data} 
                            symbol={symbol}
                            selectedDateMilli={selectedDateMilli}
                            todayMilli={todayMilli}
                            exchangeRate={exchangeRate}
                        />
                    ))
                }
               </div>
           </div>
        </div>
    )
}

export default styled(Home)`
    /* border: 2px solid aqua; */
    width: 85%;
    height: 100%;

    display: flex;

    & {
        .section_left {
            border: 1px solid lightgray;
            margin-right: 20px;
            flex: 4;
        }
        .section_right {
            /* border: 1px solid blue; */
            flex: 1;

            .card-list {
                /* border: 1px solid yellow; */
                margin-top: 10px;
                width: 100%;
                height: 92%;
                overflow: auto;
            }
        }
    }

    /* @media (max-width: 500px) {
        flex-direction: column;
        .section_right {
            overflow: auto;
        }
    } */
`;