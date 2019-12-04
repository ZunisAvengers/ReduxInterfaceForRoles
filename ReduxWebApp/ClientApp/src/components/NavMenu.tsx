import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


import * as User from '../store/User';

import './NavMenu.css';

type UserProps = User.UserState & typeof User.actionCreators

class NavMenu extends React.PureComponent<UserProps, {}, { isOpen: boolean }> {
    state = {
        isOpen: false
    };

    renderOthers(){
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
            return (<React.Fragment>
                {items}
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="">Hello {this.props.login}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="" onClick={this.props.signOut}>Logout</NavLink>
                </NavItem>            
            </React.Fragment>

            
            );
        }
    }

    userView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Orders" >Мои заказы</NavLink>
            </NavItem>
        )
    }    

    managerView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Orders" >Управление заказами</NavLink>
            </NavItem>
        )
    }

    workmanView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Orders" >Управление заказами</NavLink>
            </NavItem>
        )
    }

    anonymousView() {
        return (<React.Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Registration"><span className="glyphicon glyphicon-user"></span> Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/SignIn"><span className="glyphicon glyphicon-log-out"></span>SignIn</NavLink>
            </NavItem>
        </React.Fragment>
        );        
    }


    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">ReduxWebApp</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {this.renderOthers()}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }



    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    User.actionCreators
  )(NavMenu as any);