import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Home from './components/Home/Home.js';
import LoginUser from './components/LoginUser/LoginUser.js';
import FormUser from './components/FormGuest/FormGuest.js';
import CardDetail from './components/CardDetail/CardDetail';
import FormHost from './components/FormHost/FormHost'

function App() {
  return (
   <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={GoogleMaps} />
          <Route path="/login" component={LoginUser} />
          <Route path="/registerguest" component={FormUser} />
          <Route exact path= '/detail/:id' component={CardDetail}/>
          <Route path='/form' component={FormHost}/>
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
