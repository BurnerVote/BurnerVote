import React, { Fragment, useContext, useEffect } from "react";
import {  Route, HashRouter, withRouter } from 'react-router-dom'
import { Container } from "reactstrap"

import "./assets/libs/black-dashboard/assets/css/black-dashboard-react.css"
import "./assets/libs/black-dashboard/assets/css/nucleo-icons.css"
import "./assets/css/navigation.css"

import Navigation from './assets/components/navigation'

import { getPolls } from "./constants/calls/GraphQL"
import { store } from './state'

import Poll from './routes/poll'
import Feed from './routes/feed'
import New from './routes/new'

function App() {
  let { dispatch, state } = useContext(store)

  useEffect(() => {
    const retrievePolls = async() => {
      var pollStream = await getPolls()
      dispatch({
        payload: pollStream,
        type: "POLL"
      })
    }
    retrievePolls()
  }, [])

  return (
    <main>
      <Container>
        <Navigation />
        <Route path="/poll/:address" component={Poll} />
        <Route exact path="/" component={Feed} />
        <Route path="/new" component={New} />
      </Container>
    </main>
  );
}

export default withRouter(App);
