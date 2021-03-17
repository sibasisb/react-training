import {createContext, useReducer} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserSetting from "./Components/UserSetting";
import LoginComponent from "./Components/LoginComponent";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import userReducer, { initialState } from './reducers/userReducer';
import UpdateUser from './Components/UpdateUser';

export const UserContext = createContext();

const Routing=()=>{
  return (
    <Switch>
      <Route exact path="/" component={LoginComponent}/>
      <Route path="/userSetting/:userId"><UserSetting/></Route>
      <Route path="/updateUser/:userId" component={UpdateUser}/>
      <Route path="/home" component={Home}/>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Header/>
    <Routing/>
    <Footer/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
