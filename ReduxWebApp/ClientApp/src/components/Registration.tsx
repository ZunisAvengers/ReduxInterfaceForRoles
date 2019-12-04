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
                <h2>Регистрация</h2>
                <span className="text-danger">
                    {this.props.message}
                </span>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Придумайте ваш Логин:</label>
                            <input type='text'  className="form-control" placeholder="Ваш Логин" onChange={e => this.setState({login: e.target.value})}></input>
                        </div>
                        <div className="form-group">
                            <label>Придумайте ваш Пароль</label>
                            <input type='password'  className="form-control" placeholder="Ваш Пароль" onChange={e => this.setState({password: e.target.value})}></input>
                        </div>
                        <div className="form-group">                
                            <label>Введие ваш Пароль ещё раз:</label>         
                            <input type='password'  className="form-control" placeholder="Подтвердите ваш Пароль" onChange={e => this.setState({confirmPassword: e.target.value})}></input>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Укажите ваше Имя:</label>   
                            <input type='text'  className="form-control" placeholder="Ваше Имя" onChange={e =>  this.setState({firstName: e.target.value})}></input>
                        </div>
                        <div className="form-group">                
                            <label>Укажите вашу Фамилию:</label>                
                            <input type='text'  className="form-control" placeholder="Ваша Фамилия" onChange={e => this.setState({lastName: e.target.value})}></input>
                        </div>
                        <div className="form-group">                
                            <label>Укажите ваш Номер Телефона:</label>               
                            <input type='tel' className="form-control" placeholder="8-123-456-78-90" pattern="^\d{11}$" onChange={e => this.setState({phone: e.target.value})}></input>
                        </div>                    
                    </div>      

                </div>
                <input type='submit' className="btn btn-secondary"  value='Зарегистрироваться'></input>

            </form>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.registrationForm,
    RegistrationForm.actionCreators
  )(Registration as any);