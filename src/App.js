import React from 'react';
import './App.css';
import ToDo from './ToDo/Todo';
import { Redirect, Route, Switch } from 'react-router-dom'
import About from './Navbar/About';
import ContactUs from './Navbar/ContactUs';
import SingleTask from './Navbar/SingleTask';
import NotFound from './Navbar/NotFound';
import NavBar from './Navbar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={ContactUs} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </div>
  );
}

export default App;
