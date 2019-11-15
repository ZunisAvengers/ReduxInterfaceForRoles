import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface OrderManagerState {
    isLoading: boolean;
    orders: Order[];
}
export interface Order {
    id?: string;
    customerName: string;
    customerPhone: string;
    address: string;
    plan: string;
    state: number;
    dateOrder: Date;
    dateInstalling?: Date;
    dateCompliteInstalling?: Date;    
}

interface LoadOrders{
    type: 'LOAD_ORDERS_MANAGER';
    payload: Order[];
}

interface SetState{
    type: 'SET_STATE';
    state: number;
    dateInstalling: Date;
    dateCompliteInstalling?: Date;
}

interface CancelOrder {
    type: 'CANCEL_ORDER'
    state: number;
}

interface OrderСompleted{
    type: 'ORDER_COMPLETED'
    state: number;
}

type KnownAction = OrderСompleted | CancelOrder | SetState | LoadOrders 

export const actionCreators ={
    loadOrders: (): AppThunkAction<KnownAction> => (dispatch) => {
        fetch('api/manager/Orders',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(respounce => respounce.json())
        .then(data => {
            dispatch({
                type: 'LOAD_ORDERS_MANAGER',
                payload: data
            })
        })
    }
}


const unloadedState: OrderManagerState = { orders: [], isLoading: true };

export const reducer: Reducer<OrderManagerState> = (state: OrderManagerState | undefined, incomingAction: Action): OrderManagerState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOAD_ORDERS_MANAGER':            
            return {
                isLoading: false,
                orders: action.payload
            }
        
        default: return state;
    }
}