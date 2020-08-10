import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router} from 'react-router-dom';

import { GlobalProvider } from './components/context/GlobalState';

import Layout from './components/commons/Layout';


function App(props) {


  return (
    <GlobalProvider>
      <Router>
        <Layout />
      </Router>
    </GlobalProvider>
  );
}

export default styled(App)`
`;
