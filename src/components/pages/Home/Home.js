import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Calendar from './Section/Calendar';
import CardList from '../../commons/CardList';
import no_data from '../../../assets/img/design/no-data.png';

import { dateToMilli } from '../../../utils/dateMilliConverter';
import API from '../../../api/api';

import { useDispatch } from 'react-redux';
import { updateHightlightedDate } from '../../../modules/calendar';

function Home(props) {

    const { exchangeRate } = props;

    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [selected, setSelected] = useState('');
    const [selectedMilli, setSelectedMilli] = useState(0);

    const dispatch = useDispatch();
    const hightlightDate = (payload) => dispatch(updateHightlightedDate(payload));

    const today = moment().format("MM/DD/YYYY");
    const todayMilli = dateToMilli(today);
    const today_year = moment().year();
    const today_month = moment().month() + 1;

    useEffect(() => {

        setSelected(today);
        hightlightDate(today);

        const getDailyDividendsData = async() => { 
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

        setSelected(`${month}/${date}/${year}`);
        hightlightDate(`${month}/${date}/${year}`);

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
               <div className="card-list">
                {
                
                    (keys.length === 0 && data.length === 0) ?

                    <div className="loading"><div className="loader"></div></div>

                    :
                
                    (keys.length === 0 && data.length !==0) ?

                    <div className="no_data">
                        <img src={no_data} alt="no_data" className="no_data_icon" />
                        <p>날짜에 해당하는 종목이 없습니다.</p>
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
                            className="eachCardList"
                        />
                    ))
                }
               </div>
            </div>
        </div>
    )
}

export default styled(Home)`
    width: 1230px;
    height: 90vh;
    display: flex;

    & {
        .section_left {
            height: 88vh;
            margin-right: 20px;
            flex: 4;
        }
        .section_right {
            height: 88vh;
            flex: 1;
            .card-list {
                width: 100%;
                max-height: 95%;
                overflow: auto;
                .eachCardList {
                    cursor: pointer;
                }
            }
            .loading {
                width: 365px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 300px;
            }
            .loader {
                border: 5px solid #f3f3f3;
                border-top: 5px solid gray;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 2s linear infinite;
            }
            .no_data {
                width: 365px;
                height: 100%;
                text-align: center;
                margin-top: 250px;
                color: #767676;
                > h1 {
                    font-size: 25px;
                }
                .no_data_icon {
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }
`;