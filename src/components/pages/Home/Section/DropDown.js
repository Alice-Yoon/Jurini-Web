import React from 'react';
import styled from 'styled-components';

function DropDown(props) {

    const { date } = props;

    const onChangeSelect = (e) => {
        console.log("select changed!", e.target.value);
    }

    return (
        <div className={props.className}>
           <div>
               <span>{date}</span>
           </div>
           <div>
               <select onChange={onChangeSelect} className="selectStyle">
                   <option value="option1">All</option>
                   <option value="option2">배당귀족</option>
                   <option value="queen">배당퀸/킹</option>
                   <option value="option1">리츠주</option>
                   <option value="option1">발악주</option>
                   <option value="finance">금융주</option>
               </select>
           </div>
        </div>
    )
}

export default styled(DropDown)`
    /* border: 1px solid green; */
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