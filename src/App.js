import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import NavBarHorizontal from './components/pages/NavBar/NavBarHorizontal';
import NavBarVertical from './components/pages/NavBar/NavBarVertical';
import Home from './components/pages/Home/Home';
import SearchResult from './components/pages/SearchResult/SearchResult';
import CompanyDetails from './components/pages/CompanyDetails/CompanyDetails';
import Introduction from './components/pages/Introduction/Introduction';
import SpeechBubble from './components/pages/NavBar/Section/SpeechBubble';
import Axios from 'axios';

function App(props) {

  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);



  // useEffect(() => {
  //   const test = async() => {
  //     const date = new Date();
  //     const year = date.getFullYear();
  //     const month = date.getMonth() + 1;
  //     const res = await Axios.get(`http://15.164.248.209:20000/rest/getMontlyDividendsData?from_year=${year}&from_month=${month}&to_year=${year}&to_month=${month}`);
  //     const data = res.data.data
  //     console.log(data);
  //     console.log("year :", year, "month :", month);

  //   }
  //   test();
  // }, []);


  const toggleShowSearchResult = (value) => {
    console.log("setShowSearchResult-keyword", value);
    setShowSearchResult(true);
  }

  const toggleSearchBar = () => {
    // console.log("search icon clicked!");
    setShowSearchBar(!showSearchBar);
  }

  const toggleCompanyDetails = () => {
    // console.log("toggleCompanyDetails");
    setShowCompanyDetails(!showCompanyDetails);
  }


  return (
    <div className={props.className}>
     <Router>

      {/* NavBar 영역 */}
      <NavBarHorizontal className="navbar_horizontal" toggleShowSearchResult={toggleShowSearchResult} showSearchBar={showSearchBar} toggleSearchBar={toggleSearchBar} />
      <NavBarVertical className="navbar_vertical" />
      <SpeechBubble className="speech-bubble" />

      {/* Main Area 영역 */}
      <main className="main-area">
        <Switch>
          <Route exact path="/">
            <Home toggleCompanyDetails={toggleCompanyDetails} />
          </Route>
          <Route exact path="/introduction" component={Introduction} />
        </Switch>
        <SearchResult showSearchResult={showSearchResult} setShowSearchResult={setShowSearchResult} toggleSearchBar={toggleSearchBar} toggleCompanyDetails={toggleCompanyDetails}  />
      </main>

     </Router>
     <CompanyDetails showCompanyDetails={showCompanyDetails} toggleCompanyDetails={toggleCompanyDetails} />
    </div>
  );
}

export default styled(App)`
  & {
    .navbar_horizontal {
      /* border: 1px solid blue; */

      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    .navbar_vertical {
      /* border: 1px solid green; */

      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100px;
    }
    .speech-bubble {
      position: fixed;
      top: 100px;
      right: 30px;
      z-index: 50;
    }
    .main-area {
      /* border: 2px solid red; */

      height: 70vh;
      margin-top: 200px;
      margin-left: 110px;
      margin-right: 10px;
    }
    @media (max-width: 500px) {
      .main-area {
        height: 100vh;
        margin-right: 0;
      }
    }
  }
`;
