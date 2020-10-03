import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Test from '../../../commons/Test';
 
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
    //const october = [1,2,3,4,5,6,7,8,9,10];
    const october = [1,2,3,4,5]; 
    const [newArr, setNewArr] = useState([]); // 첫번째는 상태, 두번째는 메소드를 반환
    
    let today = new Date(); //Fri Sep 11 2020 01:11:03 GMT+0900 (대한민국 표준시)
    let startDay = 0;
    let newStartDay = 0; // LEFT RIGHT 버튼을 눌렀을 때 나타나는 새로운 달의 시작 요일을 newStartDay에 저장

    let [curYear, setCurYear] = useState(today.getFullYear());
    let [curMonth, setCurMonth] = useState(today.getMonth()+1); //Month는 0~11로 나와서 +1하기 
    
    // 각 달이 얼마나 윤년 등 고려하여 각 달 마다 끝나는 날짜 게산
    const calculateEndingDate = (curYear, curMonth) => {
      // 윤년 : 4의 배수면 윤년, 근데 100의 배수면 윤년 아님, 근데 또 400의 배수면 윤년 
      // let isLeapYear = false;
      let isLeapYear = (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0);

      // 윤년 2월이면 29일까지
      if(curMonth===2 && isLeapYear) return 2
      else if(curMonth===2 && !isLeapYear) return 2
      else if (curMonth in [1,3,5,7,8,10,12]) return 3
      else return 1
    }
    
    let days = calculateEndingDate(curYear, curMonth);

    // 시작 요일 계산
    const calculateStartingDay = () => {
      // console.log("디버깅 시작");
      // console.log(today); //Fri Sep 11 2020 01:11:03 GMT+0900 (대한민국 표준시)
      // console.log(today.toLocaleDateString()); //2020. 10. 1.
      // console.log(today.getDate()); //날짜 1
      // console.log(today.getDay()); //요일 4
      // console.log("디버깅 끝")

      // 3일이 토요일(6)이면 3-2=1일, 6-2=4(목요일)
      let todayDateToFirst = today.getDate()%7 - 1; // 3일에서 1일까지 = 2
      startDay = today.getDay() - todayDateToFirst; // 6(토요일) - 2 = 4(목요일)
    }

    const startSpecificMonth = (days) => {
      // "js usestate 배열 수정"
      // https://www.python2.net/questions-267161.htm

      // 기존 newArr에 추가하면 그전에 초기화해야하므로 tmp 배열 ele 사용해 setNewArr
      var ele = []; //재선언은 불가능하지만 재할당은 가능한 let으로 선언
      for(let i=0; i<startDay; i++){ // 각 달마다 밀린 날 수 만큼 쓰레기값 -1 넣어줌 
        ele.push(-1);
      }
      for(let i=0; i<days; i++){
        ele.push(i+1);
      }
      // Q. 두개의 결과가 다른 이유?
      // ele.concat(october); -> 처음에 넣은 [-1, -1] 출력
      // ele = [...october]; -> october인 [1,2,3,4,5] 출력
      // ele = […ele, [1,2,3,4,5]] -> (테스트해보기 [-1,-1,1,2,3,4,5] 예상결과)
      setNewArr(ele);

      // LEFT RIGHT 버튼을 눌렀을 때 나타나는 새로운 달의 시작 요일을 newStartDay에 저장
      startDay = newArr.length;
      // newStartDay = newArr.length;
    }

    // 렌더링 후 실행 // 두번째 인자 []에 콜백함수를 넣을 수 있다.
    useEffect( () => {
      calculateStartingDay();
      startSpecificMonth(days);
      // console.log("디버깅1");
      console.log(curMonth); // 빈 배열 [] (바로 반영X) -> useEffect 나와서 확인해야 함 
    //   curYear = curYear;
    //   curMonth = curMonth;
    }, [])

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
    const addDate = date => { 
      // console.log(date);
      if(date === -1){ 
        return <div className="dateStyle">{}</div> // 1일 전은 빈 값
      }
      else {
        return <Test date={date} today={today}/> // -> ㄴ. 컴포넌트로 바꿀 경우
      }
    }

    // map : october의 각 날짜를 변수 date로 순회하면서 함수를 실행해 새 배열을 리턴 -> x?
    // 문자열을 리턴하고 싶다면 console.log(date) 대신 '${date}'
    // 이제 새로운 배열 newArr에 대해 각 날짜를 변수 date로 순회하면서 함수를 실행해야함
    const octoberDays = newArr.map(addDate); 

    // 요일 
    const DayOfTheWeek = (['S','M','T','W','T','F','S'].map(day => <div className="dayStyle">{day}</div>));

    const leftButtonClickEvent = () => {
      if(curMonth === 1) {
        setCurMonth(12);
        setCurYear(curYear-1);
      }
      else {
        setCurMonth(curMonth-1);
      }

      days = calculateEndingDate(curYear, curMonth);
      startSpecificMonth(days);
    }

    const rightButtonClickEvent = () => {
      console.log("바뀌기 전 : ", curYear, curMonth); 

      if(curMonth === 12) {
        setCurMonth(1);
        setCurYear(curYear+1);
      }
      else setCurMonth(curMonth+1);

      console.log("바뀌기 후 : ", curYear, curMonth);

      days = calculateEndingDate(curYear, curMonth);
      // console.log("오른쪽! RIGHT button : ", curYear, curMonth, days);
      startSpecificMonth(days);
    }

    console.log("바뀌기 괄호나와서 : ", curYear, curMonth);

    return (
      <div className={props.className}>
        {/* <div>{testDate}</div> */}

        <div className="head">
          <button onClick={leftButtonClickEvent}>LEFT</button>
          <p>{curYear}</p>
          <p>{curMonth}</p>
          <button onClick={rightButtonClickEvent}>RIGHT</button>
        </div>
 
        <div className="dayTableStyle">{DayOfTheWeek}</div>
        <div className="dateTableStyle">{octoberDays}</div>
      </div>
      
    )
}

// grid css : https://heropy.blog/2019/08/17/css-grid/
export default styled(Calendar)` 
&{
  .head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
  }

  .dayTableStyle {
    margin-top : 70px; // 요일 테이블
    padding-top : 3px; // 요일 칸
    padding-bottom : 3px;
    display : grid;
    grid-template-rows : repeat(1, 35px);
    grid-template-columns : repeat(7, 105px);  
    background-color: lime;
  }
  .dayStyle {
    margin-left : 3px;
    padding-top : 5px; // 숫자와 칸 경계 사이
    padding-left : 5px;
    background-color : red;
  }

  .dateTableStyle {
    // margin-top : 10px; // 날짜 테이블
    // padding-top : 3px; //날짜 칸
    display : grid;
    grid-template-rows : repeat(5, 105px);
    grid-template-columns : repeat(7, 105px);  
    background-color: yellow;
  }

// 이제 이거 대신에 컴포넌트 만들기 
  .dateStyle { // 칸마다 
    margin-top : 3px; // margin 칸과 칸 사이 
    margin-left : 3px;
    padding-top : 5px; // 숫자와 칸 경계 사이
    padding-left : 5px;
    background-color : pink;
  }
}
` 
