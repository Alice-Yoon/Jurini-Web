import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import moment from 'moment';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';
import DropDown from './Section/DropDown';

import { dateToMilli } from '../../../utils/dateMilliConverter';

function Home(props) {

    const { exchangeRate } = props;

    const [data, setData] = useState([]);

    // console.log("총 data:", data)
    // const [selected_date, setSelected_date] = useState('');
    // const [selected_date_milli, setSelected_date_milli] = useState('');

    const [keys, setKeys] = useState([]);

    const today = moment().format("MM/DD/YYYY");
    const todayMilli = dateToMilli(today);

    const selectedDate = moment("09/03/2020").format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate); // 이날짜 기준 '배당락일'

    useEffect(() => {

        // 메인 화면 card list에 들어갈 정보 구하기!
            // 해당 날짜에 "배당락일"이 부합하는 data 구하기
        const getDailyDividendsData = async() => {

            // (1) api로 MonthlyDividendsData 불러오기
                // 현재는 2020년 9월 정보 불러오는 중!
            const getMonthlyDividendsData = await Axios.get('http://20.194.41.177:21000/rest/getMontlyDividendsData?from_year=2020&from_month=9&to_year=2020&to_month=9');
            const monthlyData = getMonthlyDividendsData.data.data;
            // console.log("monthlyData",monthlyData)

            // (2) data에 총 data 넣기
            setData(monthlyData);


            // (3) key만 모아서 array로
            const getKeyArr = () => {
                const keys = Object.keys(monthlyData);

                const keyArr = keys.filter(key => {
                    const formatted = moment(monthlyData[key].dividends_date).format("MM/DD/YYYY");
                    const dividendsMilli = dateToMilli(formatted)
                    return dividendsMilli === selectedDateMilli
                });
                setKeys(keyArr)
            }
            getKeyArr();
            
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
            flex: 3.5;
        }
        .section_right {
            /* border: 1px solid blue; */
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