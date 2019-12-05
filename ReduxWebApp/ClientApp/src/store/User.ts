import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface UserState {
    login?: string;
    role?: string;
    isAuthorization: boolean;
    isLoading: boolean;
}

interface SignIn{
    type: 'SIGN_IN',
    login: string;
    role: string;
}

interface LoadUser{
    type:'LOAD_USER'
}

interface SignOut{
    type:'SIGN_OUT'
}

type KnownAction = SignIn | SignOut | LoadUser ;

export const actionCreators = {
    profile: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({type:'LOAD_USER'})
        fetch('api/identity/Profile', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(respounce => {
            if(respounce.status === 400 || respounce.status === 404){
                localStorage.removeItem('token')
                dispatch({type:'SIGN_OUT'})
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
    },
    signOut:()  => {        
        localStorage.removeItem('token')
        return({type: 'SIGN_OUT'} as SignOut)
    }
}

const unloadedState: UserState = { login: undefined, role: undefined, isAuthorization: false, isLoading: false };


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
                isAuthorization: true,
                isLoading: false
            }
        case 'LOAD_USER':
            return{
                login: state.login,
                role: state.login,
                isAuthorization: false,
                isLoading: true
            };
        default: 
            return state;
    }
}
