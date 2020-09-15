import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';

// import { cardDummyData } from '../../../assets/dummy/cardDummyData';
import DropDown from './Section/DropDown';
import Axios from 'axios';
import moment from 'moment';

function Home(props) {

    const [date, setDate] = useState('');
    const [data, setData] = useState([]);

    console.log("해당 날짜 data:", data);
    console.log("date", date)

    useEffect(() => {

        // 메인 화면 card list에 들어갈 정보 구하기!
            // 해당 날짜에 "배당락일"이 부합하는 data 구하기
        const getDailyDividendsData = async() => {
            // (1) 선택된 날짜 -> milliSec으로 변환
            const selectedDate = moment("09/29/2020").format("MM/DD/YYYY");
            const selectedDateMilli = moment("09/29/2020", "MM/DD/YYYY").valueOf();

            // (2) api로 MonthlyDividendsData 불러오기
                // 현재는 2020년 9월 정보 불러오는 중!
            const getMonthlyDividendsData = await Axios.get('http://15.164.248.209:20000/rest/getMontlyDividendsData?from_year=2020&from_month=9&to_year=2020&to_month=9');
            const monthlyData = getMonthlyDividendsData.data.data;
                // 해당 데이터를 array형식으로 변환
            const monthlyDataArr = Object.values(monthlyData);

            // (3) Monthly Data에서 "selectedDateMilli"이 "배당락일"인 정보만 filter
            const dailyDividendsData = monthlyDataArr.filter(data => {
                const dividendsDate = moment(data.dividends_date).format("MM/DD/YYYY");
                const milliSec = moment(dividendsDate).valueOf();
                return milliSec === selectedDateMilli
            });

            // (4) data state에 해당 날짜에 부합하는 dailyDividendsData를 set!
            setData(dailyDividendsData);  
            
            // (5) 오늘 date set하기
            setDate(selectedDate);
            
        }
        getDailyDividendsData();

    }, [])

    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar />
           </div>
           <div className="section_right">
               <DropDown date={date} />
               <div className="card-list">
                {data && data.map((data, index) => (
                    <CardList key={index} data={data} />
                ))}
               </div>
           </div>
        </div>
    )
}

export default styled(Home)`
    /* border: 2px solid aqua; */
    width: 100%;
    height: 100%;

    display: flex;

    & {
        .section_left {
            /* border: 1px solid blue; */
            flex: 1;
        }
        .section_right {
            /* border: 1px solid green; */
            flex: 1;
            .card-list {
                /* border: 1px solid yellow; */
                margin-top: 10px;
                width: 100%;
                height: 92%;
                overflow: auto;
                flex: 1;
            }
        }
    }

    @media (max-width: 500px) {
        flex-direction: column;
        .section_right {
            overflow: auto;
        }
    }
`;