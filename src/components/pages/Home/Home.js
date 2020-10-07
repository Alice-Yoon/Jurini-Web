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
    const [selected, setSelected] = useState('');
    const [selectedMilli, setSelectedMilli] = useState(0);


    // 오늘 날짜
    const today = moment().format("MM/DD/YYYY");
    const todayMilli = dateToMilli(today);
    const today_year = moment().year();
    const today_month = moment().month() + 1;

    useEffect(() => {

        setSelected(today)

        const getDailyDividendsData = async() => { //API 파일에서 api들 불러오기 : 오늘날짜!
            const getMonthlyDividendsData = await API.cards(todayMilli, today_year, today_month);
            setSelectedMilli(todayMilli)
            setData(getMonthlyDividendsData?.allData);
            setKeys(getMonthlyDividendsData?.allKeysArr);
        }
        getDailyDividendsData();

    }, []);

    const updateDateClicked = (year, month, date) => {

        setData([]);
        setKeys([]);

        // 선택된 날짜
        setSelected(`${month}/${date}/${year}`);
        
        const updateDailyDividendsData = async() => {
            
            const selectedDate = moment(`${month}/${date}/${year}`).format("MM/DD/YYYY");
            const selectedDateMilli = dateToMilli(selectedDate);
            setSelectedMilli(selectedDateMilli)

            const getMonthlyDividendsData = await API.cards(selectedDateMilli, year, month);
            setData(getMonthlyDividendsData?.allData);
            setKeys(getMonthlyDividendsData?.allKeysArr);
        }
        updateDailyDividendsData();
    }

    const refreshPage = () => {
        window.location.reload(false)
    }


    return (
        <div className={props.className}>
           <div className="section_left">
                <Calendar 
                    data={data} 
                    symbols={keys} 
                    updateDateClicked={updateDateClicked}
                />
           </div>
           <div className="section_right">
               <div className="today_btn">
                    <button onClick={refreshPage}>오늘</button>
               </div>
               <DropDown date={selected} />
               <div className="card-list">
                {
                    keys.length === 0 ?

                    <div className="no_data">
                        <h1>NO DATA</h1>
                    </div>

                    :

                    (data.length !== 0 && keys) && keys.map((symbol, index) => (
                        <CardList 
                            key={index} 
                            data={data[symbol]} 
                            symbol={symbol}
                            selectedDateMilli={selectedMilli}
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
    width: 90%;
    height: 90vh;

    display: flex;

    & {
        .section_left {
            /* border: 1px solid red; */
            height: 88vh;
            margin-right: 20px;
            flex: 4;
        }
        .section_right {
            /* border: 1px solid blue; */
            height: 88vh;
            flex: 1;

            .today_btn {
                /* border: 1px solid aqua; */
                padding: 35px;
                > button {
                    border: 1px solid lightgray;
                    background-color: #fff;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            }

            .card-list {
                /* border: 1px solid yellow; */
                margin-top: 10px;
                width: 100%;
                max-height: 75%;
                overflow: auto;
            }
            .no_data {
                /* border: 1px solid green; */
                width: 365px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`;