import  React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as User from '../../store/User';

type UserProps = User.UserState & typeof User.actionCreators

class AuthorizeMenu extends React.PureComponent<UserProps> {
    
    render(){
        if (!this.props.isAuthorization){
            return this.anonymousView();
        } else {
            let items
            switch (this.props.role) {
                case "Manager":
                    items = this.managerView()
                    break;
                case "Workman":
                    items = this.workmanView()
                    break;
                default:
                    items = this.userView()    
                break;
            }
            return (<Fragment>
                {items}
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="">Hello {this.props.login}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="" onClick={this.props.signOut}>Logout</NavLink>
                </NavItem>            
            </Fragment>
            );
        }
    }

    userView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/Orders" >Управление заказами</NavLink>
            </NavItem>
        )
    }    

    managerView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/ManagerOrders" >Управление заказами</NavLink>
            </NavItem>
        )
    }

    workmanView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/WorkmanOrders" >Управление заказами</NavLink>
            </NavItem>
        )
    }

    anonymousView() {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/Register">Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/Login">Login</NavLink>
            </NavItem>
        </Fragment>
        );        
    }
}
export default connect(
    (state: ApplicationState) => state.user,
    User.actionCreators
  )(AuthorizeMenu as any);