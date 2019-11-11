import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Orders from './components/Orders';
import AuthorizeRoutes from './components/authorization/AuthorizeRoutes'

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/orders' component={Orders} />   
        <Route path='/authentication' component={AuthorizeRoutes} />        
    </Layout>
);
