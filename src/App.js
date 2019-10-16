import React from 'react';
import Homepage from './components/Homepage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import main_bg from './img/main_bg.jpg';

const GlobalStyle = createGlobalStyle`
  body {
   background-image: url(${main_bg});
       background-position: center;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
  };
  
  span {
  color: whitesmoke;
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
