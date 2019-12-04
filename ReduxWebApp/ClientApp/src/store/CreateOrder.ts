import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { StateOrder } from './StateOrder';

export interface CreateOrderState{
    address: string;
    plan: string;
    addressMessage: string;
    planMessage: string;
    isComplite: boolean
}

interface Order {
    id?: string;
    address: string;
    plan: string;
    state: StateOrder;
    dateOrder: Date;
    dateInstalling?: Date;
    dateCompliteInstalling?: Date;
    
}

interface CreateOrder{
    type: 'ADD_ORDERS';
    payload: Order;
}

interface NotValid{
    type: 'NOT_VALID_FORM';
    addressMessage: string;
    planMessage: string;
}

type KnownAction = NotValid | CreateOrder;

export const actionCreators = {
    createOrder: (address: string, plan: string): AppThunkAction<KnownAction> => (dispatch) => {

        if (address.length >= 10 && plan.length >= 20){
            const order: Order =  {
                address: address,
                plan: plan,
                dateOrder: new Date(),
                state: StateOrder.InProgressing
            }

            fetch('api/order',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify(order) 
            });

            dispatch({
                type: 'ADD_ORDERS',
                payload: order
            })

        }else{
            const addressMessage = address.length >= 10 ? '' : 'Адрес должен быть не меньше 10 символов',
            planMessage = plan.length >= 20 ? '' : 'Описание должно быть не меньше 20 символов'
            dispatch({
                type: 'NOT_VALID_FORM',
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
    switch (action.type) {
        case 'NOT_VALID_FORM':
            return {
                address: state.address,
                plan: state.plan,
                addressMessage: action.addressMessage,
                planMessage: action.planMessage,
                isComplite: false
            }
        case 'ADD_ORDERS':
                                  
            return {
                address: action.payload.address,
                plan: action.payload.plan,
                addressMessage: '',
                planMessage: '',
                isComplite: true
            }
        default: return state;
    }    
}