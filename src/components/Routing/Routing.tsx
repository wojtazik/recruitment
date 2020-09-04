import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import List from '../../pages/List/List'
import Login from '../../pages/Login/Login'
import Article from '../../pages/Article/Article'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import PageSkeleton from '../PageSkeleton/PageSkeleton'
import { useCookies } from 'react-cookie'

const Routing = () => {
  const [{ auth }] = useCookies()
  const isAuthorized = auth

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {
            isAuthorized ? <PageSkeleton><List /></PageSkeleton> : <Redirect to='/login' />
          }
        </Route>
        <Route path='/login'>
          {
            isAuthorized ? <Redirect to='/' /> : <Login />
          }
        </Route>
        <Route path='/post/:id'>
          {
            isAuthorized ? <PageSkeleton><Article /></PageSkeleton> : <Redirect to='/login' />
          }
        </Route>
        <Route>
          <PageSkeleton>
            <ErrorPage />
          </PageSkeleton>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routing
