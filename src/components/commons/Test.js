import React from 'react'; 
import styled from 'styled-components';
import moment from 'moment';
import CalendarCard from './Section/Calendar_card';
import { dateToMilli } from '../../utils/dateMilliConverter';

function Test(props){

    const {year, month, date, onClick, data, symbols, today, clickedDate} = props;
    
    const selectedDate = moment(`${month}/${date}/${year}`).format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate);
        
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
            <div style={{border: (clickedDate === selectedDate) && '1px solid pink'}}>{date}</div>
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
    border-right: 1px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    padding-top: 10px;
    text-align: center;

    & {
        .cards {
            height: 75%;
            margin-top: 3px;
            overflow: auto;
        }
        .rest_number {
            margin-top: 5px;
            text-align: end;
            font-weight: bold;
            margin-right: 10px;
        }
    }
`;