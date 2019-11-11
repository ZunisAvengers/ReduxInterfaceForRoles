import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface RegisterFormState{
    login: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    message: string;
}

interface Registration{
    type: 'REGISTRATION';
    login: string;
    role: string;
}
interface NotValid{
    type: 'NOT_VALID',
    message: string;
    login: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

type KnownAction = Registration | NotValid


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
                    if (respounce.status >= 200){
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
                                type: 'REGISTRATION',
                                login: data.Login,
                                role: data.Role
                            })
                        })
                    }else{
                        dispatch({
                            type:'NOT_VALID',
                            message:'Данный пользователь уже существует',
                            login: '',
                            password: '',
                            confirmPassword: '',
                            firstName: '',
                            lastName: '',
                            phone: ''
                        })
                    }
                })                
            }else{
                dispatch({
                    type:'NOT_VALID',
                    message:'Вы ввели некоректные данные',
                    login: login,
                    password: password,
                    confirmPassword: confirmPassword,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone
                })
            }
     }
}

const unloadedState: RegisterFormState = { login: '', message:'', confirmPassword: '', firstName: '', lastName:'', password:'', phone:'' };


export const reducer: Reducer<RegisterFormState> = (state: RegisterFormState | undefined, incomingAction: Action): RegisterFormState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'NOT_VALID':
            return {
                login: action.login,
                password: action.password,
                confirmPassword: action.confirmPassword,
                firstName: action.firstName,
                lastName: action.lastName,
                phone: action.phone,
                message: action.message
            }
        
        case 'REGISTRATION':
            return unloadedState

        default: 
            return state;
    }
}
