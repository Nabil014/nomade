import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Home from './components/Home/Home.js';
import LoginUser from './components/LoginUser/LoginUser.js';
import FormUser from './components/FormGuest/FormGuest.js';
import CardDetail from './components/CardDetail/CardDetail';
import FormLodging from './components/FormLodging/FormLodging.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormHost from './components/FormHost/FormHost'
import Favorites from './components/Favorites/Favorites' 



function App() {
  return (
   <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={GoogleMaps} />
          <Route path="/login" component={LoginUser} />
          <Route exact path= '/:hostId/registerlodging' component={FormLodging}/>
          <Route path="/registerguest" component={FormUser} />
          <Route exact path= '/detail/:_id' component={CardDetail}/>
          <Route path='/:guestId/form' component={FormHost}/>
          <Route exact path='/favorites' component={Favorites}/> 
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
