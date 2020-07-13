import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import Login from './components/Login'
import Add from './components/Add'
import Contact from './components/Contact'
import Home from './components/Home'
import UpdateForm from './components/UpdateForm'


import './components/style.css';




function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">

          <Route path='/adViz' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/contacts/:contactId' component={Contact} />
          <Route path='/add' component={Add} />



        





        </div>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
