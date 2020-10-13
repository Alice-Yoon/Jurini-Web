import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components';
import moment from 'moment';
import CalendarCard from './Section/Calendar_card';
import { dateToMilli } from '../../utils/dateMilliConverter';

import { useSelector } from 'react-redux';

function Test(props){

    const {year, month, date, onClick, data, symbols} = props;

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
        <div className={props.className} onClick={() => onClick(year, month, date)}>
            <div>
                <span className="date" style={{ 
                                        border: isHighlighted && '1px solid pink', 
                                        background: isHighlighted && 'linear-gradient(135deg, #FFB39B 4.17%, #FF8399 125%)',
                                        boxShadow: isHighlighted && '0px 0px 12px rgba(255, 158, 128, 0.45)',
                                        color: isHighlighted && "#fff",
                                        fontWeight: isHighlighted && '650',
                                        }}
                >
                    {date}
                </span>
            </div>
            <div className="cards" style={{marginTop: isHighlighted && '1px'}}>
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
    text-align: center;

    & {
        .date {
            display: inline-block;
            border-radius: 13px;
            padding: 7px 8px 5px 8px;
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