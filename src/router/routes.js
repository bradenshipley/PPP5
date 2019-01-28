import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../components/Home/Home"
import Masthead from "../components/Masthead/Masthead"
import Account from "../containers/Account/Account"
export default (
  <Switch>
    <Route exact path='/' component={Masthead} />
    <Route path='/home' component={Home} />
    <Route path='/account' component={Account} />
  </Switch>
)
