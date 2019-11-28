import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { StateOrder } from "./StateOrder";

export interface WorkerOrdersList{
    isLoading: boolean;
    ordersSide: Order[];
    ordersMain: Order[];
}

export interface Order {
    id: string;
    customerName:string;
    customerPhone:string;
    address: string;
    plan: string;
    state: StateOrder;
    dateOrder: Date;
    dateInstalling?: Date;
    dateCompliteInstalling?: Date;   
    massage: string; 
    mainWorker: Worker;
    sideWorkers: Worker[];
}
interface SetState{
    type: 'SET_STATE';
    id: string;
    state: StateOrder;
}
interface LoadOrders{
    type: 'LOAD_ORDERS';
    mainOrders: Order[];
    sideOrders: Order[];
}

type KnownAction = SetState | LoadOrders

export const actionCreators = {
    loadOrders: (): AppThunkAction<KnownAction> => dispatch => {
        fetch('api/worker/Orders',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(r => r.json())
        .then(data => {
            dispatch({
                type:'LOAD_ORDERS',
                mainOrders: data.mainOrders,
                sideOrders: data.sideOrders
            })
        })
    },
    setInstallating: (id: string): AppThunkAction<KnownAction> => dispatch => {
        let OrderState = {
            'id': id,
            'state': StateOrder.Installating
        }
        fetch('api/worker/SetState',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(OrderState)
        })
        dispatch({
            type:'SET_STATE',
            id: id,
            state: StateOrder.Installating
        })
    },
    setInstallatingСompleted: (id: string): AppThunkAction<KnownAction> => dispatch => {
        fetch('api/worker/SetState',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                'id': id,
                'state': StateOrder.InstallatingСompleted
            })
        })
        dispatch({
            type:'SET_STATE',
            id: id,
            state: StateOrder.InstallatingСompleted
        })
    }    
}
const unloadedState: WorkerOrdersList = { isLoading: true, ordersMain:[], ordersSide:[]}
export const reducer: Reducer<WorkerOrdersList>  = (state: WorkerOrdersList | undefined, incomingAction: Action): WorkerOrdersList => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction
    switch(action.type){
        case 'LOAD_ORDERS':
            return{
                isLoading: false,
                ordersMain: action.mainOrders,
                ordersSide: action.sideOrders
            }
        case 'SET_STATE':
            return{
                isLoading: false,
                ordersMain: state.ordersMain.map(order => {
                    if (order.id === action.id){
                        order.state = action.state
                    }
                    return order
                }),
                ordersSide: state.ordersSide
            }
        default: 
            return state
    }
}