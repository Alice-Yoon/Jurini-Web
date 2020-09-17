import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import moment from 'moment';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';
import DropDown from './Section/DropDown';

import { dateToMilli } from '../../../utils/dateMilliConverter';

// import { cardDummyData } from '../../../assets/dummy/cardDummyData';

function Home(props) {

    const [data, setData] = useState([]);
    console.log("총 data:", data)
    // const [selected_date, setSelected_date] = useState('');
    // const [selected_date_milli, setSelected_date_milli] = useState('');

    const [keys, setKeys] = useState([]);
    console.log("keys:", keys);

    const today = moment().format("MM/DD/YYYY");
    const todayMilli = dateToMilli(today);

    const selectedDate = moment("09/16/2020").format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate); // 이날짜 기준 '배당락일'

    useEffect(() => {

        // 메인 화면 card list에 들어갈 정보 구하기!
            // 해당 날짜에 "배당락일"이 부합하는 data 구하기
        const getDailyDividendsData = async() => {
            // // (1) 선택된 날짜 -> milliSec으로 변환
            // const selectedDate = moment("09/16/2020").format("MM/DD/YYYY");
            // const selectedDateMilli = moment(selectedDate).valueOf(); // 이날짜 기준 '배당락일'

            // (2) api로 MonthlyDividendsData 불러오기
                // 현재는 2020년 9월 정보 불러오는 중!
            const getMonthlyDividendsData = await Axios.get('http://15.164.248.209:20000/rest/getMontlyDividendsData?from_year=2020&from_month=9&to_year=2020&to_month=9');
            const monthlyData = getMonthlyDividendsData.data.data;
                // 해당 데이터를 array형식으로 변환
            const monthlyDataArr = Object.values(monthlyData);

                    // test - key만 모아서 array로
                    const test = () => {
                        const keys = Object.keys(monthlyData);
                        console.log("keys:", keys)

                        // const keyArr = monthlyData.AAGIY
                        const keyArr = keys.filter(key => {
                            const formatted = moment(monthlyData[key].dividends_date).format("MM/DD/YYYY");
                            const dividendsMilli = dateToMilli(formatted)
                            return dividendsMilli === selectedDateMilli
                        });
                        setKeys(keyArr)
                    }
                    test();
                    // console.log("monthlyData", monthlyData)

            // (3) Monthly Data에서 "selectedDateMilli"이 "배당락일"인 정보만 filter
            const dailyDividendsData = monthlyDataArr.filter(data => {
                const dividendsDate = moment(data.dividends_date).format("MM/DD/YYYY");
                // const milliSec = moment(dividendsDate).valueOf();                
                const milliSec = dateToMilli(dividendsDate);                
                return milliSec === selectedDateMilli
            });

            // (4) data state에 해당 날짜에 부합하는 dailyDividendsData를 set!
            setData(dailyDividendsData);  
            
            // (5) 오늘 date set하기
            // setSelected_date(selectedDate);
            // setSelected_date_milli(selectedDateMilli);
            
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
                {data && data.map(data => (
                    // keys.map((symbol, index) => (
                        <CardList 
                            // key={index} 
                            data={data} 
                            // symbol={symbol}
                            selectedDateMilli={selectedDateMilli}
                            todayMilli={todayMilli}
                        />
                    // ))
                ))}
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
            border: 1px solid red;
            flex: 3.5;
        }
        .section_right {
            border: 1px solid blue;
            flex: 1.5;
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

    /* @media (max-width: 500px) {
        flex-direction: column;
        .section_right {
            overflow: auto;
        }
    } */
`;