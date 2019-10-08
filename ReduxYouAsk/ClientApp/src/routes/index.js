import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home';
import Counter from '../components/Counter';
import FetchData from '../components/FetchData';

const PageNotFound = () => <h1>Oops! Page not found.</h1>

const routes = (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route component={PageNotFound} />
  </Switch>
)

export default routes