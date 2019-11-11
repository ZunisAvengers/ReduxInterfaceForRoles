import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';

import Registration from './Registration';



export default class AuthorizeRoutes extends Component {

  render () {
    return(
      <Fragment>          
          <Route path="/authentication/Register" component={Registration}/>          
      </Fragment>);
  }
}