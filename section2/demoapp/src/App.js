import {createContext, useReducer} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserSetting from "./Components/UserSetting";
import LoginComponent from "./Components/LoginComponent";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import UpdateUser from './Components/UpdateUser';
import PrivateRoute from './Components/PrivateRoute';
import Unauthorized from './Components/Unauthorized';
import AdminSettings from './Components/AdminSettings';
import AddUser from './Components/AddUser';
import ProductSettings from './Components/ProductSettings';
import UpdateProduct from './Components/UpdateProduct';
import AddProduct from './Components/AddProduct';
import ErrorBoundary from './Components/ErrorBoundary';


const Routing=()=>{
  return (
    <Switch>
      <Route exact path="/" component={LoginComponent}/>
      <Route path="/unauthorized" component={Unauthorized}/>
      <PrivateRoute roles={["user","admin"]} path="/userSetting/:userId"><UserSetting/></PrivateRoute>
      <PrivateRoute roles={["user","admin"]} path="/updateUser/:userId/:adminId" component={UpdateUser}/>
      <PrivateRoute roles={["user","admin"]} path="/home" component={Home}/>
      <PrivateRoute roles={["admin"]} path="/adminSettings/:userId" component={AdminSettings}/>
      <PrivateRoute roles={["admin"]} path="/addUser/:adminId" component={AddUser}/>
      <PrivateRoute roles={["admin","user"]} path="/productSettings/:userId" component={ProductSettings}/>
      <PrivateRoute roles={["admin"]} path="/updateProduct" component={UpdateProduct}/>
      <PrivateRoute roles={["admin"]} path="/addProduct/:userId" component={AddProduct}/>
    </Switch>
  )
}

function App() {
  
  return (
    <BrowserRouter>
    <ErrorBoundary>
    <Header/>
    </ErrorBoundary>
    <ErrorBoundary>
    <Routing/>
    </ErrorBoundary>
    <ErrorBoundary>
    <Footer/>
    </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
