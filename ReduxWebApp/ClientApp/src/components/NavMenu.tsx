import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as User from '../store/User';

import './NavMenu.css';

type UserProps = User.UserState & typeof User.actionCreators

class NavMenu extends React.PureComponent<UserProps, {}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    // render(){
    //     if (!this.props.isAuthorization){
    //         return this.anonymousView();
    //     } else {
    //         let items
    //         switch (this.props.role) {
    //             case "Manager":
    //                 items = this.managerView()
    //                 break;
    //             case "Workman":
    //                 items = this.workmanView()
    //                 break;
    //             default:
    //                 items = this.userView()    
    //             break;
    //         }
    //         return (<Fragment>
    //             {items}
    //             <NavItem>
    //                 <NavLink tag={Link} className="text-dark" to="">Hello {this.props.login}</NavLink>
    //             </NavItem>
    //             <NavItem>
    //                 <NavLink tag={Link} className="text-dark" to="" onClick={this.props.signOut}>Logout</NavLink>
    //             </NavItem>            
    //         </Fragment>
    //         );
    //     }
    // }

    // userView(){
    //     return(
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to="/authentication/Orders" >Мои заказы</NavLink>
    //         </NavItem>
    //     )
    // }    

    // managerView(){
    //     return(
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to="/authentication/Orders" >Управление заказами</NavLink>
    //         </NavItem>
    //     )
    // }

    // workmanView(){
    //     return(
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to="/authentication/Orders" >Управление заказами</NavLink>
    //         </NavItem>
    //     )
    // }

    // anonymousView() {
    //     return (<Fragment>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to="/authentication/Registration">Register</NavLink>
    //         </NavItem>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to="/authentication/SignIn">SignIn</NavLink>
    //         </NavItem>
    //     </Fragment>
    //     );        
    // }
    // public render() {
    //     return (
    //         <header>
    //             <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
    //                 <Container>
    //                     <NavbarBrand tag={Link} to="/">ReduxWebApp</NavbarBrand>
    //                     <NavbarToggler onClick={this.toggle} className="mr-2"/>
    //                     <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
    //                         <ul className="navbar-nav flex-grow">
    //                             <NavItem>
    //                                 <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
    //                             </NavItem>
    //                             <AuthorizeMenu>
    //                             </AuthorizeMenu>
    //                         </ul>
    //                     </Collapse>
    //                 </Container>
    //             </Navbar>
    //         </header>
    //     );
    // }



    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
