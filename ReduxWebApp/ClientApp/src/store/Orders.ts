import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { StateOrder } from "./StateOrder";

export interface OrderState {
    showCreate: boolean;
    isLoading: boolean;
    orders: Order[];
}
export interface Order {
    id?: string;
    address: string;
    plan: string;
    state: StateOrder;
    dateOrder: Date;
    dateInstalling?: Date;
    dateCompliteInstalling?: Date;
    
}

interface LoadOrders{
    type: 'LOAD_ORDERS',
    payload: Order[]
}

interface AddOrders{
    type: 'ADD_ORDERS',
    payload: Order
}


interface ChangeCreate{
    type: 'CHANGE_CREATE'
}

type KnownAction = LoadOrders | AddOrders | ChangeCreate;

export const actionCreators = {
    
    loadOrders: (): AppThunkAction<KnownAction> => (dispatch) => {
        fetch('api/order',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(respounce => respounce.json())
        .then(data => {
            dispatch({
                type: 'LOAD_ORDERS',
                payload: data
            })
        })
    },

    changeCreate:() => {
        return({
            type: 'CHANGE_CREATE'
        } as ChangeCreate )
    }
    
}
const unloadedState: OrderState = { orders: [], isLoading: true, showCreate: false };

export const reducer: Reducer<OrderState> = (state: OrderState | undefined, incomingAction: Action): OrderState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    console.log(action)
    switch (action.type) {
        case 'ADD_ORDERS':
            return {
                showCreate: false,
                isLoading: false,
                orders: [action.payload, ...state.orders]
            }
        case 'LOAD_ORDERS':            
            return {
                showCreate: state.showCreate,
                isLoading: false,
                orders: action.payload
            }
        case 'CHANGE_CREATE':
            return {
                showCreate: !state.showCreate,
                isLoading: state.isLoading,
                orders: state.orders
            }
        default: return state;
    }    
}