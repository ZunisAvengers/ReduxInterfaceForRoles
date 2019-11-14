import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import Home from './components/Home';

import { ApplicationState } from './store';
import * as User from './store/User';

import Orders from "./components/Orders";
import Registration from './components/Registration';
import SignIn from './components/SignIn';

import './custom.css'

// export default () => (
//     <Layout>
//         <Route exact path='/' component={Home} />
//         <Route path='/authentication' component={AuthorizeRoutes} />        
//     </Layout>
// );


type UserProps = User.UserState & typeof User.actionCreators

class App extends React.PureComponent<UserProps> {
    componentWillMount(){
        if (!this.props.isAuthorization)this.props.profile()
    }
    
    render(){
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
            <Layout>
                <Route exact path='/' component={Home} />      
                <Route path="/Registration" component={Registration}/>
                <Route path="/Orders" component={item}/>
                <Route path="/SignIn" component={SignIn}/> 
            </Layout>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    User.actionCreators
  )(App as any);