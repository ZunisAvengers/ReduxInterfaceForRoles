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
interface Profile{
    type:'PROFILE',
    login: string;
    role: string;
}

type KnownAction = Registration | SignIn | SignOut | Profile;

export const actionCreators = {
    profile: (): AppThunkAction<KnownAction> => (dispatch) => {
        fetch('api/identity/Profile', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(respounce => respounce.json())
        .then(data => {
            localStorage.setItem('token', data.jwt)
            dispatch({
                type: 'PROFILE',
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
        case 'PROFILE':
        case 'REGISTRATION':     
        case 'PROFILE':
            return{
                login: action.login,
                role: action.role,
                isAuthorization: true
            }
        
        default: 
            return state;
    }
}
