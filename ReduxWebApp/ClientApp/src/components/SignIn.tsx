import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SignInForm from '../store/SignInForm'
import load from './load.svg'
import { Redirect } from 'react-router'


type SignInProps = SignInForm.SignInState & typeof SignInForm.actionCreators

class SignIn extends React.PureComponent<SignInProps> {

    public state = {
        login: '',
        password: ''
    };

    render(){
        if (this.props.isLoading){
            return <img src={load} />
        }
        else {
            return this.props.isSignIn 
            ? <Redirect to="/Orders"/>
            : this.renderForm()                         
        }        
    }

    renderForm(){
        return(
            <div className="col-sm-4 ">
                 <img src={load} hidden />

                <form className="form-group" 
                    onSubmit={ e => {
                        this.setState({isLoading: true});
                        e.preventDefault()
                        this.props.signIn(
                            this.state.login,
                            this.state.password                
                        )
                    }            
                }>
                    
                    <h2>Войти</h2>
                    <span className="text-danger">
                    {this.props.message}
                    </span>
                    <div className="form-group">
                        <label >Введите ваш Логин:</label>
                        <input type='text' className="form-control" placeholder="Ваш Логин" onChange={e => this.setState({login: e.target.value}) }></input>
                    </div>
                    <div className="form-group">
                        <label >Введите ваш Пароль:</label>                
                        <input type='password' className="form-control" placeholder="Ваш пароль" onChange={e => this.setState({password: e.target.value})}></input>
                    </div>
                    <input type='submit' className="btn btn-secondary" value='Войти'></input>

                </form>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.signInForm,
    SignInForm.actionCreators
  )(SignIn as any);