import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

function DropDown(props) {

    const { date } = props;

    const formattedDate = moment(date).format('DD');
    const formattedDay = moment(date).format('ddd');

    return (
        <div className={props.className}>
           <div>
               <span>{formattedDate} ({formattedDay})</span>
           </div>
        </div>
    )
}

export default styled(DropDown)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;

    & {
        .selectStyle {
            border: 1px solid #C4C4C4;
            border-radius: 15px;
            background-color: #fff;
            padding: 5px 15px;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
    }
`;