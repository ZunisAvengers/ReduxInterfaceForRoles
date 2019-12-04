import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface RegisterFormState{
    message: string;
    isSignIn: boolean;
}

interface SignIn{
    type: 'SIGN_IN';
    login: string;
    role: string;
}
interface NotValid{
    type: 'NOT_VALID_REG',
    message: string;
}
interface SignOut{
    type: 'SIGN_OUT'
}


type KnownAction = SignIn | NotValid | SignOut


export const actionCreators = {
    registration: (
        login: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        lastName: string,
        phone: string        
        ): AppThunkAction<KnownAction> => (dispatch) => {
            if(login.length >= 3 &&
                password.length >= 5 &&
                confirmPassword === password &&
                firstName.length >= 5 &&
                lastName.length >= 5 &&
                phone.length >= 11
            ){
                const Reg ={
                    login: login,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone      
                }
                fetch('api/identity/Reg',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(Reg) 
                }).then(respounce => {
                    if (respounce.status === 200){
                        fetch('api/identity/SignIn', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({'login': login, 'password': password}) 
                        })
                        .then(respounce => respounce.json())
                        .then(data => {
                            localStorage.setItem('token', data.jwt)                        
                            dispatch({
                                type: 'SIGN_IN',
                                login: data.Login,
                                role: data.Role
                            })
                        })
                    }else{
                        dispatch({
                            type:'NOT_VALID_REG',
                            message:'Данный пользователь уже существует',
                        })
                    }
                })                
            }else{
                dispatch({
                    type:'NOT_VALID_REG',
                    message:'Вы ввели некоректные данные'
                })
            }
     }
}

const unloadedState: RegisterFormState = { message:'', isSignIn:false };


export const reducer: Reducer<RegisterFormState> = (state: RegisterFormState | undefined, incomingAction: Action): RegisterFormState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'NOT_VALID_REG':
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
