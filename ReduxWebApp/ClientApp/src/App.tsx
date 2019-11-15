import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import Home from './components/Home';

import { ApplicationState } from './store';
import * as User from './store/User';

import Orders from "./components/Orders";
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
                item = <Route path="/Orders" component={undefined}/> 
                break;
            case "Workman":
                item = <Route path="/Orders" component={undefined}/> 
                break;
            case "User":
                item = <Route path="/Orders" component={Orders}/> 
                break;
            default:
                this.renderRedirect()
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

    renderRedirect(){
        return localStorage.token === undefined ? <Redirect to="/SignIn"/> : <Redirect to="/"/>
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    User.actionCreators
  )(App as any);