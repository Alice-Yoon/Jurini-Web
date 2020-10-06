import React from 'react'; 
import styled from 'styled-components';
import moment from 'moment';
import CalendarCard from './Section/Calendar_card';
import { dateToMilli } from '../../utils/dateMilliConverter';

function Test(props){

    const {year, month, date, onClick, data, symbols} = props;
    
    const selectedDate = moment(`${month}/${date}/${year}`).format("MM/DD/YYYY");
    const selectedDateMilli = dateToMilli(selectedDate);
    
    
    const selectedKeysArr = symbols.filter(key => {
        const formatted = moment(data[key]?.dividends_date).format("MM/DD/YYYY");
        const dividendsMilli = dateToMilli(formatted);
        return dividendsMilli === selectedDateMilli
    });
    
    const sortedKeys = selectedKeysArr.length >= 2 ? [selectedKeysArr[0], selectedKeysArr[1]] : [selectedKeysArr[0]];
    
    return(
        <div className={props.className} onClick={() => onClick(year, month, date)}>
            <div>{date}</div>
            <div className="cards">
                {selectedKeysArr.length > 0 &&
                    sortedKeys.map((symbol, index) => (
                        <CalendarCard 
                            key={index}
                            data={data} 
                            symbol={symbol}
                        />
                    ))
                }
            <span className="rest_number" style={{display: selectedKeysArr.length > 2 ? 'block' : 'none'}}>+ {selectedKeysArr.length - 2}</span>
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
        .rest_number {
            /* border: 1px solid green; */
            margin-top: 5px;
            text-align: end;
            font-weight: bold;
        }
    }
`;