import React from 'react';
import Homepage from './components/Homepage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
   background-image: linear-gradient(to right top, #f6f6f6, #e2eeff, #b6ecff, #74ecff, #12ebe9);
  }
`;


function App() {
  return (

    <div className="App">
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component = {Homepage} />
            <Route component={Error} />
              </Switch>
        </BrowserRouter>
    </div>

  );
}

export default App;
