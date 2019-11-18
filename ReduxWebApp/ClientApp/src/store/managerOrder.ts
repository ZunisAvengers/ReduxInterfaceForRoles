import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { StateOrder } from "./StateOrder";

export interface OrderManagerState {
    isLoading: boolean;
    orders: Order[];
}
export interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    plan: string;
    state: StateOrder;
    dateOrder: Date;
    dateInstalling?: Date;
    dateCompliteInstalling?: Date;   
    massage?: string; 
}



interface LoadOrders{
    type: 'LOAD_ORDERS_MANAGER';
    payload: Order[];
}

interface SetState{
    type: 'SET_STATE';
    id: string;
    state: StateOrder;
    dateInstalling?: Date | null;
    dateCompliteInstalling?: Date | null;
}

interface CancelOrder {
    type: 'CANCEL_ORDER'
    id: string;
}

interface OrderСompleted{
    type: 'ORDER_COMPLETED'
    id: string;
}

interface NotValid{
    type: 'NOT_VALID';
    id: string;
    massage: string;
}



type KnownAction = OrderСompleted | CancelOrder | SetState | LoadOrders | NotValid 

export const actionCreators = {
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
    } ,


    cancelOrder: (id: string): AppThunkAction<KnownAction> => (dispatch) => {
        fetch('api/manager/CancelOrder',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(id)
        })
        .then(respounce => {
            if(respounce.status === 200){
                dispatch({
                    type:'CANCEL_ORDER',
                    id: id
                })
            }
        })
        
    },
    allowOrder: (id: string, dateInstalling: any, dateCompliteInstalling: any, state: StateOrder): AppThunkAction<KnownAction> => (dispatch) =>{
        const Now = new Date() 
        if ((dateInstalling as Date) > Now ){
            state = state === StateOrder.InProgressing ? StateOrder.WaitingForInstallation : state
           
            fetch('api/manager/SetDateInstallation',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    'id': id,
                    'dateInstalling': dateInstalling,
                    'dateCompliteInstalling': dateCompliteInstalling
                })
            })
            .then(respounce => {
                if(respounce.status === 200){
                    dispatch({
                        type:'SET_STATE',
                        id: id,
                        state: state,
                        dateInstalling: dateInstalling,
                        dateCompliteInstalling: dateCompliteInstalling
                        
                    })
                } else {
                        dispatch({
                        type: 'NOT_VALID',
                        massage: 'Ошибка отправки на сервер',
                        id: id
                    })
                }
            })
        }
        else{
            dispatch({
                type: 'NOT_VALID',
                massage: 'Данные не указан или введены не верно',
                id: id
            })
        }
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
        case 'CANCEL_ORDER':            
            return {
                isLoading: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) e.state = StateOrder.Canceled
                    return e
                })
            }
        case 'SET_STATE':            
            return {
                isLoading: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) {
                        e.dateInstalling = action.dateInstalling as Date;
                        e.dateCompliteInstalling = action.dateCompliteInstalling as Date;
                        e.state = action.state;
                        e.massage = '';
                    }
                    return e
                })
            }
        case 'NOT_VALID':            
            return {
                isLoading: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) e.massage = action.massage
                    return e
                })
            }
        default: return state;
    }
}