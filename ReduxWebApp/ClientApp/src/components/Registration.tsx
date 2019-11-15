import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as RegistrationForm from '../store/RegistrationForm'
import { Redirect } from 'react-router';

type RegistrationProps = RegistrationForm.RegisterFormState & typeof RegistrationForm.actionCreators

class Registration extends React.PureComponent<RegistrationProps> {
    
    state ={
        isLoading:false,
        login:'',
        password:'',
        confirmPassword:'',
        firstName:'',
        lastName:'',
        phone:'' 
    };

    render(){
        let content = this.props.isSignIn
        ? <Redirect to="/Orders"/>
        : this.renderForm()
        return content
    }

    renderForm(){
         
            
        
        return(
            <form onSubmit={ e => {
                e.preventDefault()
                
                this.setState({isLoading:true});

                this.props.registration(
                    this.state.login,
                    this.state.password,
                    this.state.confirmPassword,
                    this.state.firstName,
                    this.state.lastName,
                    this.state.phone                    
                )

                // if (this.props.isSignIn) this.setState({isLoading:true});
                // else this.setState({isLoading:false});
            }
            }>
                {this.state.isLoading?123:456}
                <h2>Регистрация</h2>
                <span className="text-danger">
                    {this.props.message}
                </span>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Придумайте ваш Логин:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => this.setState({login: e.target.value})}></input>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                Придумайте ваш Пароль:
                            </td>                    
                            <td>
                                <input type='password' onChange={e => this.setState({password: e.target.value})}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Введие ваш Пароль ещё раз:
                            </td>                    
                            <td>
                                <input type='password' onChange={e => this.setState({confirmPasswordthis: e.target.value})}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите ваше Имя:
                            </td>                    
                            <td>
                                <input type='text' onChange={e =>  this.setState({firstName: e.target.value})}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите вашу Фамилию:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => this.setState({lastName: e.target.value})}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите ваш Номер Телефона:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => this.setState({phone: e.target.value})}></input>
                            </td>  
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value='Зарегистрироваться'></input>

            </form>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.registrationForm,
    RegistrationForm.actionCreators
  )(Registration as any);