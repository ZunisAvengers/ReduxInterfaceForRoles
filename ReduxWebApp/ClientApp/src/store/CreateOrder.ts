import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CreateOrderState{
    address: string;
    plan: string;
    addressMessage: string;
    planMessage: string;
    isComplite: boolean
}

interface CreateOrder{
    type: 'CREATE_ORDER';
    address: string;
    plan: string;
}

interface NotValid{
    type: 'NOT_VALID';
    addressMessage: string;
    planMessage: string;
}

type KnownAction = NotValid | CreateOrder;

export const actionCreators = {
    createOrder: (address: string, plan: string): AppThunkAction<KnownAction> => (dispatch) => {
        const valid = address.length >= 10 && plan.length >= 20
        if (valid){
            dispatch({
                type: 'CREATE_ORDER',
                address: address,
                plan: plan
            })
        }else{
            const addressMessage = address.length >= 10 ? '' : 'Адрес должен быть не меньше 10 символов',
            planMessage = plan.length >= 20 ? '' : 'Описание должно быть не меньше 20 символов'
            dispatch({
                type: 'NOT_VALID',
                addressMessage: addressMessage,
                planMessage: planMessage
            })
        }
    }
}

const unloadedState: CreateOrderState = { address:'', addressMessage: '', plan:'', planMessage:'', isComplite:false };

export const reducer: Reducer<CreateOrderState> = (state: CreateOrderState | undefined, incomingAction: Action): CreateOrderState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    console.log(action)
    switch (action.type) {
        case 'NOT_VALID':
            return {
                address: state.address,
                plan: state.plan,
                addressMessage: action.addressMessage,
                planMessage: action.planMessage,
                isComplite: false
            }
        case 'CREATE_ORDER':            
            return {
                address: action.address,
                plan: action.plan,
                addressMessage: '',
                planMessage: '',
                isComplite: true
            }
        default: return state;
    }    
}