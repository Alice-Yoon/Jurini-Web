import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Test from '../../../commons/Test';
import API from '../../../../api/api';

import left_button from '../../../../assets/img/final/arrow_left.png';
import right_button from '../../../../assets/img/final/arrow_right.png';
 
// days : 해당 월의 일수
// date : 날짜
// day : 요일

// 서버에서 데이터 긁어오면 url에 저장하는게 맞는 방법인가? https://youtu.be/iNkryf_TtZw

// useState : 상태값 변화 (이후 자동 렌더링)
// useEffect : 렌더링 이후에 처리됨

// js array vs list : https://wayhome25.github.io/cs/2017/04/17/cs-18-1/

function Calendar(props) {
    /*
    var : 재선언 가능 (하지만 값 바뀔 우려)
    let : 재선언 불가능 , 재할당 가능
    const : 재선언 불가능 , 재할당 불가능
    */ 
    const [newArr, setNewArr] = useState([]); // 첫번째는 상태, 두번째는 메소드를 반환
    
    let today = new Date(); //Fri Sep 11 2020 01:11:03 GMT+0900 (대한민국 표준시) 
    
    const [curYear, setCurYear] = useState(today.getFullYear());
    const [curMonth, setCurMonth] = useState(today.getMonth()+1); //Month는 0~11로 나와서 +1하기 
    
    const [days, setDays] = useState(0);
    const [flag, setFlag] = useState(1); // 맨 처음 뜨는 달이면 1, 아니면 0

    const [startDay, setStartDay] = useState(1); // tmp 짝궁
    const [startDayIfLeftButton, setStartDayIfLeftButton] = useState(1); // tmpIfLeftButton 짝궁

    ///////////////////// 지혜 작업 시작 (1) //////////////////

    const [calendarListData, setCalendarListData] = useState([]);
    const [calendarListSymbols, setCalendarListSymbols] = useState([]);
    const [clickedDate, setClickedDate] = useState('');


    ///////////////////// 지혜 작업 //////////////////////////

 
    let tmp;
    let tmpIfLeftButton;

    // let tmpEndDayIfLeftButton;
    const [tmpEndDayIfLeftButton, setTmpEndDayIfLeftButton] = useState(1); // tmp 짝궁
    let initStartDay;




    // 각 달이 얼마나 윤년 등 고려하여 각 달 마다 끝나는 날짜 게산
    const calculateEndingDate = (curYear, curMonth, tmp) => {

      // '소용없음'때문에 useEffect 두번째 함수인 여기까지 옴
      setTmpEndDayIfLeftButton(tmp);
      console.log("소용없음 때문에 : ", tmpEndDayIfLeftButton);

      let isLeapYear = (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0);
      let tmpDays;

      // 윤년 2월이면 29일까지
      if(curMonth===2 && isLeapYear) tmpDays = 29;
      else if(curMonth===2 && !isLeapYear) tmpDays = 28;
      else if (curMonth===1 || curMonth===3 || curMonth===5 || curMonth===7 ||
        curMonth===8 || curMonth===10 || curMonth===12 ) tmpDays = 31; //[1,3,5,7,8,10,12]) return 31
      else tmpDays = 30;

      setDays(tmpDays);
      startSpecificMonth(tmp, tmpDays);

      console.log("줄리아 tmpEndDayIfLeftButton : ", tmpEndDayIfLeftButton);

      return tmpDays;
    }

    const calculateEndingDateLeft = (curYear, curMonth, tmp, tmpEndDayIfLeftButton) => {
      let isLeapYear = (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0);
      let tmpDays;

      // 윤년 2월이면 29일까지
      if(curMonth===2 && isLeapYear) tmpDays = 29;
      else if(curMonth===2 && !isLeapYear) tmpDays = 28;
      else if (curMonth===1 || curMonth===3 || curMonth===5 || curMonth===7 ||
        curMonth===8 || curMonth===10 || curMonth===12 ) tmpDays = 31; //[1,3,5,7,8,10,12]) return 31
      else tmpDays = 30;

      setDays(tmpDays);
      startSpecificMonthLeft(tmpEndDayIfLeftButton, tmpDays);
      console.log("줄리아left  tmpEndDayIfLeftButton : ", tmpEndDayIfLeftButton);

    }






    // 시작 요일 계산
    const calculateStartingDay = () => {
      // 3일이 토요일(6)이면 3-2=1일, 6-2=4(목요일)
      let tmpStartDay;
      
      let todayDate = today.getDate();
      let todayDay = today.getDay();
      if(todayDay === 0) todayDay = 7;

      if(todayDate === 1){ // 오늘이 1일이면
        tmpStartDay = todayDate;
      }
      else{ // 1일이 아니면
        let todayDateToFirst = todayDate%7 - 1; // 3일에서 1일까지 = 2
        tmpStartDay = todayDay - todayDateToFirst; // 6(토요일) - 2 = 4(목요일)
      }
      
      if(flag === 1) setFlag(0);

      setStartDay(tmpStartDay); //오른쪽 버튼
      setStartDayIfLeftButton(tmpStartDay); //왼쪽 버튼

      tmp = tmpStartDay; //오른쪽 버튼
      tmpIfLeftButton = tmpStartDay; //왼쪽 버튼
      // tmpEndDayIfLeftButton = tmpStartDay;
      setTmpEndDayIfLeftButton(tmpStartDay);// -> 소용없음

      console.log("calcaulateStartingDay 함수 안");
      console.log("tmp : ", tmp);
      console.log("tmpIfLeftButton : ", tmpIfLeftButton);
      console.log("tmpEndDayIfLeftButton : ", tmpEndDayIfLeftButton);// -> 소용없음

      return tmpStartDay; 
    }
 

    const startSpecificMonth = (tmp, days) => {
      // "js usestate 배열 수정"
      // https://www.python2.net/questions-267161.htm

      // console.log("startSpecificMonth 함수 안 디버깅");
      // console.log("startDay디버깅 : ", startDay); 
      // console.log("tmp디버깅 : ", tmp); 
      // console.log("days디버깅 : ", days);

      // 기존 newArr에 추가하면 그전에 초기화해야하므로 tmp 배열 ele 사용해 setNewArr
      var ele = []; //재선언은 불가능하지만 재할당은 가능한 let으로 선언
      
      if(flag === 1){ //첫 달이면
        for(let i=0; i<tmp; i++){ // 각 달마다 밀린 날 수 만큼 쓰레기값 -1 넣어줌 
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
      
      // LEFT RIGHT 버튼을 눌렀을 때 나타나는 새로운 달의 시작 요일을 tmp에 저장
      tmp = ele.length%7; //오른쪽버튼
      tmpIfLeftButton = ele.length%7; //왼쪽버튼

      console.log("startSpecificMonth 함수 안 디버깅");
      console.log("tmp : ", tmp);      
      console.log("tmpIfLeftButton : ", tmpIfLeftButton); 

      setStartDay(tmp); //오른쪽버튼
      setStartDayIfLeftButton(tmpIfLeftButton); //왼쪽버튼
    }


    const startSpecificMonthLeft = (tmpEndDayIfLeftButton, days) => {
      // "js usestate 배열 수정"
      // https://www.python2.net/questions-267161.htm

      console.log("startSpecificMonth <Left> 함수 안 디버깅");
      // console.log("startDay디버깅 : ", startDay); 
      console.log("tmp디버깅 : ", tmpEndDayIfLeftButton); 
      console.log("days디버깅 : ", days);

      // 30 % 7 = 4 ... 2
      // tmpEndDayIfLeftButton = 4 (1일이 금요일에 시작)
      // 4(tmpEndDayIfLeftButton) - 2 = 2(tmpStartDayIfLeftButton)
      tmpIfLeftButton = tmpEndDayIfLeftButton - (days % 7);
      console.log("tmpIfLeftButton : ", tmpIfLeftButton);

      var ele = [];   
      if(flag === 1){
        for(let i=0; i<tmp; i++){ // 각 달마다 밀린 날 수 만큼 쓰레기값 -1 넣어줌 
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

      tmp = ele.length%7; //오른쪽버튼
      tmpIfLeftButton = ele.length%7; //왼쪽버튼

      setStartDay(tmp); //오른쪽버튼
      setStartDayIfLeftButton(tmpIfLeftButton); //왼쪽버튼
    }




    // 렌더링 후 실행 // 두번째 인자 []에 콜백함수를 넣을 수 있다.
    useEffect( () => {
      let initStartDay = calculateStartingDay();
      console.log("userEffect1, calStartingDay함수 이후 startDay : ", initStartDay);
      console.log("userEffect1, calStartingDay함수 이후 tmp : ", tmp);
      // setTmpEndDayIfLeftButton(initStartDay); /////////////////////////

      const initDate = calculateEndingDate(curYear, curMonth, initStartDay);
      setDays(initDate); //setDays(tmpDays)
      // console.log("소용없음2 ", tmpEndDayIfLeftButton);
      // setTmpEndDayIfLeftButton(initStartDay); /////////////////////////
      // console.log("소용없음3 ", tmpEndDayIfLeftButton);

      


    /////////////////////////////// 지혜 작업 영역 시작 (2) /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
      // 처음 Calendar data 가져오기
      const getThisMonthDividendsData = async () => {
        const thisMonthDividendsData = await API.calendar_list(curYear, curMonth);
        setCalendarListData(thisMonthDividendsData?.data);
        setCalendarListSymbols(thisMonthDividendsData?.keys);
      }
      getThisMonthDividendsData();

    /////////////////////////////// 지혜 작업 영역 끝 /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    }, [])


    /////////////////////////////// 지혜 작업 영역 시작 (3) /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////



    const addDate = date => { 
      // console.log(date);
      if(date === -1){ 
        return <div className="dateStyle">{}</div> // 1일 전은 빈 값
      }
      else {
        return <Test 
                  className="testStyle"
                  onClick={dateClickEvent} 
                  data={calendarListData} 
                  symbols={calendarListSymbols} 
                  year={curYear} 
                  month={curMonth} 
                  date={date} 
                  today={today}
                  clickedDate={clickedDate}
                /> // -> ㄴ. 컴포넌트로 바꿀 경우
      }
    }
    
    const { updateDateClicked } = props;

    const dateClickEvent = (year, month, date) => {
      updateDateClicked(year, month, date);
      const formattedClickedDate = moment(`${year}/${month}/${date}`).format('MM-DD-YYYY')
      setClickedDate(formattedClickedDate)
    }


    // 년도 or 달이 바뀔 때 Calendar data 가져오기
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


    /////////////////////////////// 지혜 작업 영역 끝 /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////



    /* 화살표함수 : (파라미터) => {함수 내용} (ref : https://beomy.tistory.com/19)
     (1)
       파라미터가 없는 경우 : () => {statements} 처럼 괄호가 필요하다.
       파라미터가 1개인 경우 : 파라미터를 ()로 둘러싸지 않아도 된다.
     (2) 이해쉬운 예제 : https://ko.javascript.info/arrow-functions-basics
    */
    // const addDate = date => <div className="dateStyle">{date}</div> // ㄱ.

    // .map() 메소드에서 {}중괄호를 사용할때 return 사용하기
    // .map() 메소드 사용 시 요소를 ()소괄호로 묶기 
    // ex) .map(({id, text}) => (<TodoItem/>))
    // 


    // map : october의 각 날짜를 변수 date로 순회하면서 함수를 실행해 새 배열을 리턴 -> x?
    // 문자열을 리턴하고 싶다면 console.log(date) 대신 '${date}'
    // 이제 새로운 배열 newArr에 대해 각 날짜를 변수 date로 순회하면서 함수를 실행해야함
    const DaysOfTheMonth = newArr.map(addDate); 

    // 요일 
    const DayOfTheWeek = (['S','M','T','W','T','F','S'].map(day => <div className="dayStyle">{day}</div>));
    
    const leftButtonClickEvent = () => {
      console.log("leftButtonClick 이벤트"); 
      console.log("tmpEndDayIfLeftButton : ", tmpEndDayIfLeftButton);
      
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
      //console.log("rightButtonClick 이벤트"); 

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
        {/* <div>{testDate}</div> */}

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

// grid css : https://heropy.blog/2019/08/17/css-grid/
export default styled(Calendar)` 

/* border: 2px solid hotpink; */
/* height: 100%; */

&{
  .head{
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
    margin-bottom: 10px;
    .head_date {
      /* border: 1px solid red; */
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
    /* border: 2px solid aqua; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dayTableStyle {
    /* border: 1px solid blue; */
    border-top: 1px solid #F6F6F6;
    border-left: 1px solid #F6F6F6;
    border-right: 1px solid #F6F6F6;
    /* margin-top : 70px; // 요일 테이블 */
    padding-top : 3px; // 요일 칸
    padding-bottom : 3px;
    display : grid;
    grid-template-rows : repeat(1, 35px);
    grid-template-columns : repeat(7, 105px);  
    /* background-color: lime; */
  }
  .dayStyle {
    border-right: 1px solid #F6F6F6;
    margin-left : 3px;
    padding-top : 5px; // 숫자와 칸 경계 사이
    padding-left : 5px;
    text-align: center;
    color: #A7A7A7;
    /* background-color : red; */
    &:last-of-type {
      border-right: none;
    }
  }

  .dateTableStyle {
    border-left: 1px solid #F6F6F6;
    /* margin-top : 10px; // 날짜 테이블 */
    /* padding-top : 3px; //날짜 칸 */
    display : grid;
    grid-template-rows : repeat(5, 105px);
    grid-template-columns : repeat(7, 105px);  
    /* background-color: yellow; */
  }

  .testStyle {
    cursor: pointer;
    &:hover {
      border: 1px solid black;
    }
  }

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
    border-right: 1px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    margin-top : 3px; // margin 칸과 칸 사이 
    margin-left : 3px;
    padding-top : 5px; // 숫자와 칸 경계 사이
    padding-left : 5px;
    /* background-color : pink; */
  }
}
` 
