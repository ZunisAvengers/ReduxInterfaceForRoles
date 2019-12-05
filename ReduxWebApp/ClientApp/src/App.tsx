import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import Home from './components/Home';

import { ApplicationState } from './store';
import * as User from './store/User';

import Orders from "./components/Orders";
import ManagerOrders from "./components/ManagerOrders";
import WorkerOrder from "./components/WorkerOrder";
import Registration from './components/Registration';
import SignIn from './components/SignIn';

import './custom.css'

type UserProps = User.UserState & typeof User.actionCreators

class App extends React.PureComponent<UserProps> {
    componentWillMount(){
        if (localStorage.token !== undefined) this.props.profile()
    }

    render(){
        let item
        switch (this.props.role) {
            case "Manager":
                item = <Route path="/Orders" component={ManagerOrders}/> 
                break;
            case "Workman":
                item = <Route path="/Orders" component={WorkerOrder}/> 
                break;
            case "User":
                item = <Route path="/Orders" component={Orders}/>
                break;
            default:
                item = <Route path="/Orders" component={Home}/>
                break;
            }
            return(
            <Layout>
                <Route exact path='/' component={Home} />   
                {item}
                <Route path="/SignIn" component={SignIn}/>                 
                <Route path="/Registration" component={Registration}/>
            </Layout>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    User.actionCreators
  )(App as any);