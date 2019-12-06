import { AppThunkAction } from './';
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
}

interface LoadOrders{
    type: 'LOAD_ORDERS_MANAGER';
    payload: Order[];
}

interface SetDate{
    type: 'SET_DATE';
    id: string;
    state: StateOrder;
    dateInstalling?: Date | null;
    dateCompliteInstalling?: Date | null;
}

interface CancelOrder {
    type: 'CANCEL_ORDER'
    id: string;
}
interface EndOrder {
    type: 'END_ORDER'
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


export type KnownAction = OrderСompleted | CancelOrder | SetDate | LoadOrders | NotValid |LoadWorkers | AddWorker | DelWorker | EditMain | EndOrder

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
    allowOrder: (id: string, dateInstalling: Date, dateCompliteInstalling: Date): AppThunkAction<KnownAction> => (dispatch) =>{
        const Now = new Date() 
        if (dateInstalling  > Now && dateCompliteInstalling > dateInstalling){
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
                        type:'SET_DATE',
                        id: id,
                        state: StateOrder.WaitingForInstallation,
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
    endOrder: (id: string): AppThunkAction<KnownAction> => (dispatch) =>{
        fetch('api/manager/EndOrder',{
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
                    type:'END_ORDER',
                    id: id
                })
            }
        })
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