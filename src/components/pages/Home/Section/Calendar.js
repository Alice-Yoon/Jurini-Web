import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Test from '../../../commons/Test';
import API from '../../../../api/api';

import left_button from '../../../../assets/img/final/arrow_left.png';
import right_button from '../../../../assets/img/final/arrow_right.png';
 

function Calendar(props) {

    const [newArr, setNewArr] = useState([]); 
    
    let today = new Date(); 
    
    const [curYear, setCurYear] = useState(today.getFullYear());
    const [curMonth, setCurMonth] = useState(today.getMonth()+1); 
    
    const [days, setDays] = useState(0);
    const [flag, setFlag] = useState(1); 

    const [startDay, setStartDay] = useState(1); 
    const [startDayIfLeftButton, setStartDayIfLeftButton] = useState(1); 


    const [calendarListData, setCalendarListData] = useState([]);
    const [calendarListSymbols, setCalendarListSymbols] = useState([]);
    const [clickedDate, setClickedDate] = useState('');

 
    let tmp;
    let tmpIfLeftButton;

    const [tmpEndDayIfLeftButton, setTmpEndDayIfLeftButton] = useState(1); 
    let initStartDay;




    const calculateEndingDate = (curYear, curMonth, tmp) => {

      setTmpEndDayIfLeftButton(tmp);

      let isLeapYear = (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0);
      let tmpDays;

      if(curMonth===2 && isLeapYear) tmpDays = 29;
      else if(curMonth===2 && !isLeapYear) tmpDays = 28;
      else if (curMonth===1 || curMonth===3 || curMonth===5 || curMonth===7 ||
        curMonth===8 || curMonth===10 || curMonth===12 ) tmpDays = 31; 
      else tmpDays = 30;

      setDays(tmpDays);
      startSpecificMonth(tmp, tmpDays);

      return tmpDays;
    }

    const calculateEndingDateLeft = (curYear, curMonth, tmp, tmpEndDayIfLeftButton) => {
      let isLeapYear = (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0);
      let tmpDays;

      if(curMonth===2 && isLeapYear) tmpDays = 29;
      else if(curMonth===2 && !isLeapYear) tmpDays = 28;
      else if (curMonth===1 || curMonth===3 || curMonth===5 || curMonth===7 ||
        curMonth===8 || curMonth===10 || curMonth===12 ) tmpDays = 31; 
      else tmpDays = 30;

      setDays(tmpDays);
      startSpecificMonthLeft(tmpEndDayIfLeftButton, tmpDays);

    }






    const calculateStartingDay = () => {
      let tmpStartDay;
      
      let todayDate = today.getDate();
      let todayDay = today.getDay();
      if(todayDay === 0) todayDay = 7;

      if(todayDate === 1){ 
        tmpStartDay = todayDate;
      }
      else{ 
        let todayDateToFirst = todayDate%7 - 1; 
        tmpStartDay = todayDay - todayDateToFirst;
      }
      
      if(flag === 1) setFlag(0);

      setStartDay(tmpStartDay); 
      setStartDayIfLeftButton(tmpStartDay); 

      tmp = tmpStartDay; 
      tmpIfLeftButton = tmpStartDay; 
      setTmpEndDayIfLeftButton(tmpStartDay);


      return tmpStartDay; 
    }
 

    const startSpecificMonth = (tmp, days) => {

      var ele = []; 
      
      if(flag === 1){ 
        for(let i=0; i<tmp; i++){ 
          ele.push(-1);
        }
      }
      else{
          for(let i=0; i<startDay; i++){
              ele.push(-1);
          }
      }
      for(let i=0; i<days; i++){
        ele.push(i+1);
      }
      setNewArr(ele);
      
      tmp = ele.length%7; 
      tmpIfLeftButton = ele.length%7; 

      setStartDay(tmp);
      setStartDayIfLeftButton(tmpIfLeftButton);
    }


    const startSpecificMonthLeft = (tmpEndDayIfLeftButton, days) => {

      tmpIfLeftButton = tmpEndDayIfLeftButton - (days % 7);

      var ele = [];   
      if(flag === 1){
        for(let i=0; i<tmp; i++){ 
          ele.push(-1);
        }
      }
      else{
          for(let i=0; i<tmpIfLeftButton; i++){
              ele.push(-1);
          }
      }
      for(let i=0; i<days; i++){
        ele.push(i+1);
      }
      setNewArr(ele);

      tmp = ele.length%7; 
      tmpIfLeftButton = ele.length%7; 

      setStartDay(tmp);
      setStartDayIfLeftButton(tmpIfLeftButton); 
    }




    useEffect( () => {
      let initStartDay = calculateStartingDay();

      const initDate = calculateEndingDate(curYear, curMonth, initStartDay);
      setDays(initDate); 

      const getThisMonthDividendsData = async () => {
        const thisMonthDividendsData = await API.calendar_list(curYear, curMonth);
        setCalendarListData(thisMonthDividendsData?.data);
        setCalendarListSymbols(thisMonthDividendsData?.keys);
      }
      getThisMonthDividendsData();


    }, [])




    const addDate = (date, index) => { 
<<<<<<< HEAD
      if(date === -1){ 
        return <div key={index} className="dateStyle">{}</div> 
=======
      // console.log(date);
      if(date === -1){ 
        return <div key={index} className="dateStyle">{}</div> // 1일 전은 빈 값
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
      }
      else {
        return <Test 
                  key={index}
                  className="testStyle"
                  onClick={dateClickEvent} 
                  data={calendarListData} 
                  symbols={calendarListSymbols} 
                  year={curYear} 
                  month={curMonth} 
                  date={date} 
                  today={today}
                  clickedDate={clickedDate}
                /> 
      }
    }
    
    const { updateDateClicked } = props;

    const dateClickEvent = (year, month, date) => {
      updateDateClicked(year, month, date);
      const formattedClickedDate = moment(`${year}/${month}/${date}`).format('MM-DD-YYYY')
      setClickedDate(formattedClickedDate)
    }


    useEffect(() => {

      const updateThisMonthDividendsData = async () => {
        const updatedMonthlyDividendsData = await API.calendar_list(curYear, curMonth);
        setCalendarListData(updatedMonthlyDividendsData?.data);
        setCalendarListSymbols(updatedMonthlyDividendsData?.keys);
      }
      updateThisMonthDividendsData();

    }, [curYear, curMonth])

    const refreshPage = () => {
      window.location.reload(false)
    }


    const DaysOfTheMonth = newArr.map(addDate); 

<<<<<<< HEAD
=======
    // 요일 
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    const DayOfTheWeek = (['S','M','T','W','T','F','S'].map((day, index) => <div key={index} className="dayStyle">{day}</div>));
    
    const leftButtonClickEvent = () => {
      
      if(curMonth === 1) {
        setCurMonth(12);
        setCurYear(curYear-1);
        calculateEndingDateLeft(curYear-1, 12, tmp, tmpEndDayIfLeftButton); 
      }
      else {
        setCurMonth(curMonth-1);
        calculateEndingDateLeft(curYear, curMonth-1, tmp, tmpEndDayIfLeftButton);
      }
    }
    
    const rightButtonClickEvent = () => {

      if(curMonth === 12) {
        setCurMonth(1);
        setCurYear(curYear+1);
        calculateEndingDate(curYear+1, 1, tmp); 
      }
      else {
        setCurMonth(curMonth+1);
        calculateEndingDate(curYear, curMonth+1, tmp);
      } 
    } 




    return (
      <div className={props.className}>

        <div className="head">
          <div></div>

          <div className="head_date">
            <img src={left_button} alt="left_button" onClick={leftButtonClickEvent} className="buttonStyle" />
            <p>{curYear}년 {curMonth < 10 ? `0${curMonth}` : curMonth}월</p>
            <img src={right_button} alt="right_button" onClick={rightButtonClickEvent} className="buttonStyle" />
          </div>

          <div className="today_btn">
            <button onClick={refreshPage}>오늘</button>
          </div>
        </div>
 
        <div className="dateTableContainer">
          <div className="dayTableStyle">{DayOfTheWeek}</div>
          <div className="dateTableStyle">{DaysOfTheMonth}</div>
        </div>
      </div>
      
    )
}

export default styled(Calendar)` 

<<<<<<< HEAD
=======
/* border: 2px solid hotpink; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
&{
  .head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
    padding-right: 15px;
    margin-bottom: 10px;
    width: 600px;
    .head_date {
      display: flex;
      justify-content: center;
      align-items: center;
      .buttonStyle {
        cursor: pointer;
        margin: 0 35px;
      }
    }
    > p {
      font-size: 30px;
    }
  }


  .dateTableContainer {
<<<<<<< HEAD
=======
    /* border: 2px solid aqua; */
    border: 1px solid #F6F6F6;
    border-left: none;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dayTableStyle {
<<<<<<< HEAD
    border-top: 1px solid #F6F6F6;
    border-left: 1px solid #F6F6F6;
    border-right: 1px solid #F6F6F6;
    padding-top : 3px; 
    padding-bottom : 3px;
=======
    /* border: 1px solid blue; */
    width: 100%;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    display : grid;
    grid-template-rows : repeat(1, 35px);
    grid-template-columns : repeat(7, 105px);  
  }
  .dayStyle {
<<<<<<< HEAD
    border-right: 1px solid #F6F6F6;
    margin-left : 3px;
    padding-top : 5px; 
    padding-left : 5px;
    text-align: center;
    color: #A7A7A7;
=======
    border-left: 1px solid #F6F6F6;
    /* border: 1px solid green; */
    padding-top : 5px; // 숫자와 칸 경계 사이
    padding-left : 5px;
    text-align: center;
    color: #A7A7A7;
    /* background-color : red; */
    &:first-of-type {
      border-left: 1px solid #F6F6F6;
    }
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    &:last-of-type {
      border-right: none;
    }
  }

  .dateTableStyle {
<<<<<<< HEAD
    border-left: 1px solid #F6F6F6;
=======
    /* border: 1px solid black; */
    width: 100%;
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
    display : grid;
    grid-template-rows : repeat(5, 105px);
    grid-template-columns : repeat(7, 105px);  
  }

  .testStyle {
    /* border: 1px solid blue; */
    border-left: 1px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    cursor: pointer;
    &:last-of-type {
      border-right: 1px solid #F6F6F6;
    }
    &:hover {
      border: 1px dotted black;
    }
  }

<<<<<<< HEAD
  .dateStyle { 
    border-right: 1px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    margin-top : 3px; 
    margin-left : 3px;
    padding-top : 5px; 
    padding-left : 5px;
=======
  .today_btn {
    /* border: 1px solid blue; */
    > button {
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 13px;
      box-shadow:0px 4px 16px rgba(0,0,0, 0.1);
      padding: 10px 15px;
      &:focus {
        outline: none;
      }
      &:active {
        transform: scale(0.9);
      }
    }
  }

// 이제 이거 대신에 컴포넌트 만들기 
  .dateStyle { // 칸마다 
    /* background-color: #F6F6F6; */
    border-left: 1px solid #F6F6F6;
    margin-top : 3px; // margin 칸과 칸 사이 
    padding-top : 5px; // 숫자와 칸 경계 사이
    /* background-color : pink; */
>>>>>>> 92bd4fc0bb8004364abcd359e7da7e786577ba66
  }
}
` ;
