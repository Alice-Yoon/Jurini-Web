import React, { useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { useObserver } from 'mobx-react';

import NavBarHorizontal from '../pages/NavBar/NavBarHorizontal';
import NavBarVertical from '../pages/NavBar/NavBarVertical';
import Home from '../pages/Home/Home';
import SearchResult from '../pages/SearchResult/SearchResult';
import CompanyDetails from '../pages/CompanyDetails/CompanyDetails';
import Introduction from '../pages/Introduction/Introduction';
import SpeechBubble from '../pages/NavBar/Section/SpeechBubble';

function Layout(props) {

    const { showSearchResults } = useContext(GlobalContext);
    console.log("showSearchResults", showSearchResults);

  return useObserver(() => (
      <div className={props.className}>

        {/* NavBar 영역 */}
        <NavBarHorizontal className="navbar_horizontal" />
        <NavBarVertical className="navbar_vertical" />
        <SpeechBubble className="speech-bubble" />

        {/* Main Area 영역 */}
        <main className="main-area">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/introduction" component={Introduction} />
            </Switch>
            {showSearchResults ? <SearchResult /> : null}
        </main>

      <CompanyDetails />
      </div>
  ));
}

export default styled(Layout)`
  & {
    .navbar_horizontal {
      border: 1px solid blue;

      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    .navbar_vertical {
      border: 1px solid green;

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
      border: 2px solid red;

      height: 100vh;
      margin-top: 200px;
      margin-left: 110px;
      margin-right: 10px;

      position: relative;
    }
  }
`;
