import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as RegistrationForm from '../store/RegistrationForm'
import { Redirect } from 'react-router';

type RegistrationProps = RegistrationForm.RegisterFormState & typeof RegistrationForm.actionCreators

class Registration extends React.PureComponent<RegistrationProps> {
    
    public state ={isLoading:false};

    render(){
        let content = this.props.isSignIn
        ? <Redirect to="/authentication/Orders"/>
        : this.renderForm()
        return content
    }

    renderForm(){
        var login = '',
            password = '',
            confirmPassword = '',
            phone = '',
            firstName = '',
            lastName = '';    
            
        
        return(
            <form onSubmit={ e => {
                e.preventDefault()
                
                this.setState({isLoading:true});

                this.props.registration(
                    login,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    phone                    
                )

                if (this.props.isSignIn) this.setState({isLoading:true});
                else this.setState({isLoading:false});
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
                                <input type='text' onChange={e => login = e.target.value}></input>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                Придумайте ваш Пароль:
                            </td>                    
                            <td>
                                <input type='password' onChange={e => password = e.target.value}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Введие ваш Пароль ещё раз:
                            </td>                    
                            <td>
                                <input type='password' onChange={e => confirmPassword = e.target.value}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите ваше Имя:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => firstName = e.target.value}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите вашу Фамилию:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => lastName = e.target.value}></input>
                            </td>  
                        </tr>
                        <tr>
                            <td>
                                Укажите ваш Номер Телефона:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => phone = e.target.value}></input>
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