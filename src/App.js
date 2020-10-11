import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBarHorizontal from './components/pages/NavBar/NavBarHorizontal';
import Home from './components/pages/Home/Home';
import SearchResult from './components/pages/SearchResult/SearchResult';
import CompanyDetails from './components/pages/CompanyDetails/CompanyDetails';
import SpeechBubble from './components/pages/NavBar/Section/SpeechBubble';

import API from './api/api';

function App(props) {
  const showSearchResult = useSelector(state => state.search.isResultShow);

  const [exchangeRate, setExchangeRage] = useState(1);


  useEffect(() => {
    const exchangeRate = async() => {
      // 달러 환율 가져오기
      const exchangeRate = await API.exchange();
      setExchangeRage(parseInt(exchangeRate?.data.data['5. Exchange Rate']).toFixed(2))
    }
    exchangeRate();
  }, [])

  return (
    <div className={props.className}>
     <Router>

      {/* NavBar 영역 */}
      <NavBarHorizontal className="navbar_horizontal" />
      <SpeechBubble className="speech-bubble" />

      {/* Main Area 영역 */}
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
  
  & {
    .navbar_horizontal {
      /* border: 1px solid blue; */

      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    .speech-bubble {
      position: fixed;
      top: 100px;
      right: 30px;
      z-index: 50;
    }
    .main-area {
      /* border: 2px solid black; */

      height: 80vh;
      margin-top: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* @media (max-width: 500px) {
      .main-area {
        height: 100vh;
        margin-right: 0;
      }
    } */
  }
`;
