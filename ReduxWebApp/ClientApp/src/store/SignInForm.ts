import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface SignInState{
    message: string;    
    isSignIn: boolean;
}
interface SignIn{
    type: 'SIGN_IN',
    login: string;
    role: string;
}
interface NotValid{
    type: 'NOT_VALID_LOG',
    message: string;
}
interface SignOut{
    type: 'SIGN_OUT'
}


type KnownAction = SignIn | NotValid | SignOut

export const actionCreators = {
    signIn: (login:string, password: string): AppThunkAction<KnownAction> => dispatch => {
        if (login.length >= 3 && password.length >= 5){
            fetch('api/identity/SignIn', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({'login': login, 'password': password}) 
            })
            .then(respounce => {
                if (respounce.status === 404){
                    dispatch({
                        type: 'NOT_VALID_LOG',
                        message: 'Неверен Логин или Пароль'
                    })
                }else{
                    respounce.json()
                    .then(data => {
                        localStorage.setItem('token', data.jwt)
                        dispatch({
                            type: 'SIGN_IN',
                            login: data.Login,
                            role: data.Role
                        })
                    })
                }
            })            
        }else{
            dispatch({
                type: 'NOT_VALID_LOG',
                message: 'Вы ввели некоректные данные'
            })
        }
    }
}

const unloadedState: SignInState = { message:'', isSignIn:false };

export const reducer: Reducer<SignInState> = (state: SignInState | undefined, incomingAction: Action): SignInState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'NOT_VALID_LOG':
            return {
                message: action.message,
                isSignIn: false
            }
        
        case 'SIGN_IN':
            return {
                message: '',
                isSignIn: true
            }     
        case 'SIGN_OUT':
            return unloadedState
        
        default: 
            return state;
    }
}
