import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components';
import moment from 'moment';
import CalendarCard from './Section/Calendar_card';
import { dateToMilli } from '../../utils/dateMilliConverter';

import { useSelector } from 'react-redux';

function Test(props){

    const {year, month, date, onClick, data, symbols, today, clickedDate} = props;

    const highlightedDate = useSelector(state => state.calendar.highlightedDate);
    
    const formattedHightlightedDate = moment(highlightedDate).format("MM/DD/YYYY")
    
    const selectedDate = moment(`${month}/${date}/${year}`).format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate);

    const isHighlighted = formattedHightlightedDate === selectedDate;
        
    const selectedKeysArr_dividend = symbols.filter(key => {
        const formatted_dividend = moment(data[key]?.dividends_date).format("MM/DD/YYYY");
        const dividendsMilli = dateToMilli(formatted_dividend);
        return dividendsMilli === selectedDateMilli
    });

    const selectedKeysArr_payment = symbols.filter(key => {
        const formatted_payment = moment(data[key]?.payment_date).format("MM/DD/YYYY");
        const paymentMilli = dateToMilli(formatted_payment);
        return paymentMilli === selectedDateMilli
    })

    const allKeysArr = selectedKeysArr_dividend.concat(selectedKeysArr_payment)
    
    const sortedKeys = allKeysArr.length >= 2 ? [allKeysArr[0], allKeysArr[1]] : [allKeysArr[0]];
    
    return(
        // <div className={props.className} onClick={() => onClick(year, month, date)} style={{border: isHighlighted && '1px solid red'}}>
        <div className={props.className} onClick={() => onClick(year, month, date)}>
            <div>
                <span className="date" style={{ 
                                        border: isHighlighted && '1px solid pink', 
                                        backgroundColor: isHighlighted && '#FF8399',
                                        color: isHighlighted && "#fff"
                                        }}
                >
                    {date}
                </span>
            </div>
            <div className="cards">
                {allKeysArr.length > 0 &&
                    sortedKeys.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            selectedDate={selectedDate}
                            data={data} 
                            symbol={symbol}
                            selectedKeysArr_dividend={selectedKeysArr_dividend}
                            selectedKeysArr_payment={selectedKeysArr_payment}
                        />
                    ))
                }
            <span className="rest_number" style={{display: allKeysArr.length > 2 ? 'block' : 'none'}}>+ {allKeysArr.length - 2}</span>
            </div>
        </div>
    )
}

export default styled(Test)`
    /* border: 0.1px solid lightgray; */
    border-right: 1px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    padding-top: 10px;
    text-align: center;

    & {
        .date {
            display: inline-block;
            border-radius: 10px;
            padding: 3px 5px;
            margin-bottom: 3px;
        }
        .cards {
            /* border: 1px solid green; */
            height: 75%;
            margin-top: 3px;
            overflow: auto;
        }
        .rest_number {
            /* border: 1px solid green; */
            margin-top: 5px;
            text-align: end;
            font-weight: bold;
            margin-right: 10px;
        }
    }
`;