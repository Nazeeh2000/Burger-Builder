import React, {  useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import ayncComponent from './hoc/aSyncComponent/aSyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const aSyncCheckout = ayncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const aSyncOrders = ayncComponent(() => {
  return import('./containers/Orders/Orders');
})

const aSyncAuth = ayncComponent(() => {
  return import('./containers/Auth/Auth');
})

const app = props => {

  useEffect(() => {
    props.onTryAutoSignup();
  }, [])

  
    let routes = (
      <Switch>
        <Route path='/auth' component={aSyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if(props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' component={aSyncCheckout} />
          <Route path='/orders' component={aSyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={aSyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));