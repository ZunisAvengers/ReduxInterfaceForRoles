import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SignInForm from '../store/SignInForm'
import { Redirect } from 'react-router';

type SignInProps = SignInForm.SignInState & typeof SignInForm.actionCreators

class SignIn extends React.PureComponent<SignInProps> {

    public state ={isLoading:false};

    render(){
        let content = this.props.isSignIn
        ? <Redirect to="/authentication/Orders"/>
        : this.renderForm()
        return content            
    }

    renderForm(){
        var login = '',
            password = '';


        return(
            <form onSubmit={ e => {

                this.setState({isLoading:true});

                e.preventDefault()
                this.props.signIn(
                    login,
                    password                
                )
            }            
            }>
                
                {this.state.isLoading?123:456}
                <h2>Войти</h2>
                <span className="text-danger">
                   {this.props.message}
                </span>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Введите ваш Логин:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => login = e.target.value}></input>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                Введите ваш Пароль:
                            </td>                    
                            <td>
                                <input type='password' onChange={e => password = e.target.value}></input>
                            </td>  
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value='Войти'></input>

            </form>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.signInForm,
    SignInForm.actionCreators
  )(SignIn as any);