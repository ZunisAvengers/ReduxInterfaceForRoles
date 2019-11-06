import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface RegisterFormState{
    login: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface Registration{
    type: 'REGISTRATION';
    login: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}


// export const actionCreators = {
//     registration: (
//         login: string,
//         password: string,
//         confirmPassword: string,
//         firstName: string,
//         lastName: string,
//         phone: string        
//         ): AppThunkAction<KnownAction> => (dispatch) => {
            
//     }
// }