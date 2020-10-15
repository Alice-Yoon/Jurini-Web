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
  font-family: 'Noto Sans KR', sans-serif;
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
      margin-top: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
