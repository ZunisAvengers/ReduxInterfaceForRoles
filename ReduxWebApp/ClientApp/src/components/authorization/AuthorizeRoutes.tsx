import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { ApplicationState } from '../../store';
import * as User from '../../store/User';

import Orders from "./../Orders";
import Registration from './Registration';
import SignIn from './SignIn';

class AuthorizeRoutes extends React.PureComponent<User.UserState> {

  render () {
    let item
    switch (this.props.role) {
        case "Manager":
            item = undefined
            break;
        case "Workman":
            item = undefined
            break;
        default:
            item = Orders 
        break;
    }

    return(
      <Fragment>          
          <Route path="/authentication/Registration" component={Registration}/>
          <Route path="/authentication/Orders" component={item}/>
          <Route path="/authentication/SignIn" component={SignIn}/>
      </Fragment>);
  }
}
export default connect(
  (state: ApplicationState) => state.user
)(AuthorizeRoutes as any);