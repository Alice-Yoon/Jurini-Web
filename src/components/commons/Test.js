import styled from 'styled-components';
import React, { useState, useEffect } from 'react'; 
import CalendarCard from './Section/Calendar_card';

function Test(props){

    const {year, month, date, today, onClick, data, keys} = props;

    const sortedKeys = [keys[0], keys[1]];
    // console.log("sorted:", sortedKeys)

    // console.log("Test 컴포:", data, keys)

    // console.log("test-today:", year, month, date)

    // 각 newArr의 요소마다 Test컴포넌트가 실행됨
    // console.log(date);
    // console.log(today);

    return(
        <div className={props.className} onClick={() => onClick(year, month, date)}>
            <div>{date}</div>
            <div className="cards">
                {
                    sortedKeys.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            data={data} 
                            symbol={symbol}
                        />
                    ))
                }
                {/* {
                    keys.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            data={data} 
                            symbol={symbol}
                        />
                    ))
                } */}
            <p>+ {keys.length - 2}</p>
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