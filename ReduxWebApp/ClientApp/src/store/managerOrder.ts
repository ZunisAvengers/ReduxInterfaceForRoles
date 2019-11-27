import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { StateOrder } from "./StateOrder";

export interface OrderManagerState {
    isLoadingOrders: boolean;
    orders: Order[];
    isLoadingWorkers: boolean;
    allWorkers: Worker[];
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
    isLoadingWorkers: boolean;
    allWorkers: Worker[];
}

export interface Worker{
    id: string;
    fullName: string;
    //isChange: boolean
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
interface LoadWorkers{
    type: 'LOAD_WORKERS';
    workers: Worker[];
}

interface AddWorker{
    type: 'ADD_WORKER';
    payload: Worker; 
    OrderId: string;
}
interface DelWorker{
    type: 'DEL_WORKER';
    payload: Worker;
    OrderId: string;
}
interface EditMain{
    type: 'EDIT_MAIN';
    payload: Worker;
    OrderId: string;
}


type KnownAction = OrderСompleted | CancelOrder | SetState | LoadOrders | NotValid |LoadWorkers | AddWorker | DelWorker | EditMain

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
    },
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
    allowOrder: (id: string, dateInstalling: Date, dateCompliteInstalling: Date, state: StateOrder): AppThunkAction<KnownAction> => (dispatch) =>{
        const Now = new Date() 
        if (dateInstalling  > Now && dateCompliteInstalling > dateInstalling){
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
        } else {
            dispatch({
                type: 'NOT_VALID',
                massage: 'Данные не указан или введены не верно',
                id: id
            })
        }
    },
    addWorker: (worker: Worker, OrderId: string): AppThunkAction<KnownAction> => (dispatch) =>{
        var WorkerId = worker.id;
        fetch('api/manager/AddWorkersInOrder',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({OrderId, WorkerId})
        })
        dispatch({
            type:'ADD_WORKER',
            payload: worker,
            OrderId: OrderId
        })
    },
    delWorker: (worker: Worker, OrderId: string): AppThunkAction<KnownAction> => (dispatch) =>{
        var WorkerId = worker.id;
        fetch('api/manager/DeleteSideWorker',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({OrderId, WorkerId})
        })
        dispatch({
            type:'DEL_WORKER',
            payload: worker,
            OrderId: OrderId
        })
    },
    editMain: (worker: Worker, OrderId: string): AppThunkAction<KnownAction> => (dispatch) =>{
        var WorkerId = worker.id;
        
        fetch('api/manager/EditMainWorker',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({OrderId, WorkerId})
        })
        dispatch({
            type:'EDIT_MAIN',
            payload: worker,
            OrderId: OrderId
        })
    },
    
    loadWorkers: (): AppThunkAction<KnownAction> => (dispatch) => {
        fetch('api/manager/LoadWorkers',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(r => r.json())
        .then(data => {
            dispatch({
                type:'LOAD_WORKERS',
                workers: data
            })
        })
    }
}

const unloadedState: OrderManagerState = { orders: [], isLoadingOrders: true, allWorkers:[], isLoadingWorkers: true };

export const reducer: Reducer<OrderManagerState> = (state: OrderManagerState | undefined, incomingAction: Action): OrderManagerState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        
        case 'LOAD_ORDERS_MANAGER':            
            return {
                isLoadingOrders: false,
                orders: action.payload,
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: state.allWorkers
            }
        case 'CANCEL_ORDER':            
            return {
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) e.state = StateOrder.Canceled
                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: state.allWorkers
            }
        case 'SET_STATE':            
            return {
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) {
                        e.dateInstalling = action.dateInstalling as Date;
                        e.dateCompliteInstalling = action.dateCompliteInstalling as Date;
                        e.state = action.state;
                        e.massage = '';
                    }

                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: state.allWorkers
            }
        case 'NOT_VALID':            
            return {
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) e.massage = action.massage
                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: state.allWorkers
            }
        case'LOAD_WORKERS':
            return{
                isLoadingOrders: state.isLoadingOrders,
                orders: state.orders,
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: action.workers
            };
        case'ADD_WORKER':
                return {
                    isLoadingOrders: false,
                    orders: state.orders.map(e => {
                        if (e.id === action.OrderId) {
                            if (e.mainWorker === null){
                                e.mainWorker = action.payload
                            } else {
                                e.sideWorkers = [...e.sideWorkers, action.payload]
                            }
                        }
                        return e
                    }),
                    isLoadingWorkers: state.isLoadingWorkers,
                    allWorkers: state.allWorkers.filter(o => o !== action.payload)
                }
            
        case'DEL_WORKER':
            return{
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.OrderId) {
                        e.sideWorkers = e.sideWorkers.filter(o => o !== action.payload)
                    }
                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: [...state.allWorkers, action.payload]
            }
        case'EDIT_MAIN':
            var main: Worker = {fullName: '', id: ''};
            return{
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.OrderId) {
                        main = e.mainWorker = action.payload;                        
                    }
                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: [...state.allWorkers, main]
            }
        default: return state;
    }
}