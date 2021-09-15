import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Contact from './components/Contact'
import Errorpage from './components/Errorpage';
import Logout from './components/Logout'
import {Route, Switch} from 'react-router-dom'
import { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer/UseReducer';

//context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/about">
        <About /> 
      </Route>

      <Route path="/login">
        <Login /> 
      </Route>

      <Route path="/signup">
        <Signup /> 
      </Route>

      <Route path="/logout">
        <Logout /> 
      </Route>

      <Route>
        <Errorpage />
      </Route>
    </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    
    <>
      <UserContext.Provider value={{state, dispatch}} >
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
