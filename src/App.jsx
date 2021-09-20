import React from "react"
import {Switch, Route} from "react-router-dom"
import {connect} from "react-redux"

//import components
import NavigationBar from "./component/navigation"

import {keepLogin}from "./redux/action"
//import pages
import Home from "./pages/home"
import Login from "./pages/login"
import Detail from "./pages/detail"
import Cart from "./pages/cart"
import Payment from "./pages/checkPayment"
import ProfilPage from "./pages/profil"


class App extends React.Component{
  componentDidMount(){
    let idUser =localStorage.getItem("token")
    this.props.keepLogin(idUser)
  }
  render(){
    return(
      <div>
        <NavigationBar/>

        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/detail/:id" component={Detail}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/payment" component={Payment}/>
          <Route path="/profil" component={ProfilPage}/>
          
        </Switch>

      </div>
    )
  }
}

export default connect(null, {keepLogin}) (App)