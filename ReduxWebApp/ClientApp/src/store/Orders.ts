import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface OrderState {
    showCreate: boolean;
    isLoading: boolean;
    orders: Order[];
}
export interface Order {
    id?: string;
    address: string;
    plan: string;
    state: number;
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
    type: 'CHANGE_CREATE',
    payload: boolean
}

type KnownAction = LoadOrders | AddOrders | ChangeCreate;

export const actionCreators = {
    addOrders: (address:string, plan:string): AppThunkAction<KnownAction> => (dispatch) => {
        const order: Order =  {
            address: address,
            plan: plan,
            dateOrder: new Date(),
            state: 0
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
    },

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

    changeCreate:(change:boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({
            type: 'CHANGE_CREATE',
            payload: !change
        })
    }
    
}
const unloadedState: OrderState = { orders: [], isLoading: false, showCreate: false };

export const reducer: Reducer<OrderState> = (state: OrderState | undefined, incomingAction: Action): OrderState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_ORDERS':
            return {
                showCreate: state.showCreate,
                isLoading: true,
                orders: [...state.orders, action.payload]
            }
        case 'LOAD_ORDERS':
            console.log(action)
            return {
                showCreate: state.showCreate,
                isLoading: state.isLoading,
                orders: action.payload
            }
        case 'CHANGE_CREATE':
            return {
                showCreate: action.payload,
                isLoading: state.isLoading,
                orders: state.orders
            }
        default: return state;
    }    
}

