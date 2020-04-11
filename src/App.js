import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

const AppPage = lazy(() => import(/* webpackChunkName: 'app' */'./pages/app'));

const App = (props) => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/app' component={AppPage} />
          <Redirect to='/app' />
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default App;
