import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBarHorizontal from './components/pages/NavBar/NavBarHorizontal';
import Home from './components/pages/Home/Home';
import SearchResult from './components/pages/SearchResult/SearchResult';
import CompanyDetails from './components/pages/CompanyDetails/CompanyDetails';

import API from './api/api';
import Axios from 'axios';

function App(props) {
  const showSearchResult = useSelector(state => state.search.isResultShow);

  const [exchangeRate, setExchangeRage] = useState(1);

  useEffect(() => {
    const exchangeRate = async() => {
      const exchangeRate = await API.exchange();
      setExchangeRage(parseInt(exchangeRate?.data.data['5. Exchange Rate']).toFixed(2))
    }
    exchangeRate();

    // //  평균 배당률 구하기 test 중
    // const test = async() => {
    //   const getAverage = await Axios.get(
    //     `http://kkyy3402.iptime.org:20000/rest/getDividendHistory?ticker=ko&start_year=1980&end_year=2020`
    //   );
    //   const keys = Object.keys(getAverage?.data.data);
    //   // 최근 1년 평균배당금 = keys < 4 ? '배당정보가 충분하지 않습니다' : '$평균배당금'
    //   const keysSortedAsc = keys.sort((a,b) => a-b);
    //   // console.log("배당금 - keysSortedAsc:", keysSortedAsc);
    //   const fourKeys = keysSortedAsc?.slice(keysSortedAsc?.length - 4, keysSortedAsc?.length);
    //   // console.log("배당금-key 4개:", fourKeys);

    //   const fourValues = fourKeys.map(key => {
    //     return getAverage?.data.data[key]
    //   });
    //   // console.log("배당금-fourValues", fourValues);

    //   const reducer = (acc, curr) => acc + curr;
    //   const average = () => {
    //     let ave;
    //     if(keys < 0) {
    //       ave = '배당정보가 충분하지 않습니다'
    //     } else {
    //       ave = (fourValues?.reduce(reducer) / 4).toFixed(2);
    //     }
    //     return ave;
    //   }
    //   // console.log("평균 배당금:", average());
    // }
    // test();
  }, [])

  return (
    <div className={props.className}>
     <Router>
      <NavBarHorizontal className="navbar_horizontal" />
      <main className="main-area">
        <Switch>
          <Route exact path="/">
            <Home exchangeRate={exchangeRate} />
          </Route>
        </Switch>
        {showSearchResult && <SearchResult exchangeRate={exchangeRate}  />}
      </main>
     </Router>
     <CompanyDetails />
    </div>
  );
}

export default styled(App)`
  font-family: Noto Sans KR;
  position: relative;  
  & {
    .navbar_horizontal {
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    .main-area {
      height: 80vh;
      margin-top: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
