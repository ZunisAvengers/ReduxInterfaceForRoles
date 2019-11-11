import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface UserState {
    login?: string;
    role?: string;
    isAuthorization: boolean;
}


interface Registration{
    type: 'REGISTRATION',
    login: string;
    role: string;
}

interface SignIn{
    type: 'SIGN_IN',
    login: string;
    role: string;
}

interface SignOut{
    type:'SIGN_OUT'
}


type KnownAction = Registration | SignIn | SignOut;

export const actionCreators = {
    signIn: (login: string, password: string): AppThunkAction<KnownAction> => (dispatch) => {
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
    },
    signOut:()  => {
        return({type: 'SIGN_OUT'} as SignOut)
    }
}

const unloadedState: UserState = { login: undefined, role: undefined, isAuthorization: false };


export const reducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SIGN_OUT':
            return unloadedState
            
        case 'SIGN_IN':
            return{
                login: action.login,
                role: action.role,
                isAuthorization: true
            }
        
        case 'REGISTRATION':
            return{
                login: action.login,
                role: action.role,
                isAuthorization: true
            }

        default: 
            return state;
    }
}
