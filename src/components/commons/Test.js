import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import moment from 'moment';
import CalendarCard from './Section/Calendar_card';
import { dateToMilli } from '../../utils/dateMilliConverter';

function Test(props){

    const {year, month, date, onClick, data, symbols} = props;

    // const sortedKeys = [keys[0], keys[1]];
    // console.log("sorted:", sortedKeys)

    const selectedDate = moment(`${month}/${date}/${year}`).format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate);


    const selectedKeysArr = symbols.filter(key => {
        const formatted = moment(data[key]?.dividends_date).format("MM/DD/YYYY");
        const dividendsMilli = dateToMilli(formatted);
        return dividendsMilli === selectedDateMilli
    })

    // 각 newArr의 요소마다 Test컴포넌트가 실행됨
    // console.log(date);
    // console.log(today);

    return(
        <div className={props.className} onClick={() => onClick(year, month, date)}>
            <div>{date}</div>
            <div className="cards">
                {/* {
                    sortedKeys.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            data={data} 
                            symbol={symbol}
                        />
                    ))
                } */}
                {
                    selectedKeysArr.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            data={data} 
                            symbol={symbol}
                        />
                    ))
                }
            {/* <p>+ {keys.length - 2}</p> */}
            </div>
        </div>
    )
}

export default styled(Test)`
    border: 1px solid red;
    padding: 10px;
    & {
        .cards {
            /* border: 1px solid green; */
            height: 75%;
            overflow: auto;
        }
    }
`;