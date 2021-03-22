import {createContext, useReducer} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserSetting from "./Components/UserSetting";
import LoginComponent from "./Components/LoginComponent";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import userReducer, { initialState } from './reducers/userReducer';
import UpdateUser from './Components/UpdateUser';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Unauthorized from './Components/Unauthorized';
import AdminSettings from './Components/AdminSettings';

export const UserContext = createContext();

const Routing=()=>{
  return (
    <Switch>
      <Route exact path="/" component={LoginComponent}/>
      <Route path="/unauthorized" component={Unauthorized}/>
      <PrivateRoute roles={["user","admin"]} path="/userSetting/:userId"><UserSetting/></PrivateRoute>
      <PrivateRoute roles={["user","admin"]} path="/updateUser/:userId" component={UpdateUser}/>
      <PrivateRoute roles={["user","admin"]} path="/home" component={Home}/>
      <PrivateRoute roles={["admin"]} path="/adminSettings/:userId" component={AdminSettings}/>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <AuthProvider>
    <BrowserRouter>
    <Header/>
    <Routing/>
    <Footer/>
    </BrowserRouter>
    </AuthProvider>
    </UserContext.Provider>
  );
}

export default App;
