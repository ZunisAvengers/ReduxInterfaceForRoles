import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface WorkersState{
    isLoading: boolean;
    allWorkers: Worker[];
    mainWorker: Worker;
    sideWorkers: Worker[];
    OrderId:string;
}

export interface Worker{
    id: string;
    fullName: string;
    //isChange: boolean
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

type KnownAction = LoadWorkers | AddWorker | DelWorker | EditMain

export const actionCreators = {
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


const unloadedState: WorkersState = { allWorkers: [], sideWorkers: [],  isLoading: true, OrderId: '', mainWorker: {id: '', fullName:''} };
export const reducer: Reducer<WorkersState> = (state: WorkersState | undefined, incomingAction: Action): WorkersState => {
    if (state === undefined) {
        return unloadedState;
    }
    console.log(state)
    const action = incomingAction as KnownAction;
    switch(action.type){
        case'LOAD_WORKERS':
            return{
                isLoading: false,
                allWorkers: action.workers,
                mainWorker: state.mainWorker,
                sideWorkers: state.sideWorkers,
                OrderId: state.OrderId
            };
        case'ADD_WORKER':
            if (state.mainWorker.id === ''){
                return {
                    OrderId: state.OrderId,
                    allWorkers: state.allWorkers.filter(aw => aw.id !== action.payload.id),
                    isLoading: false,
                    mainWorker: action.payload,
                    sideWorkers: state.sideWorkers
                }
            } else {
                return {
                    OrderId: state.OrderId,
                    allWorkers: state.allWorkers.filter(aw => aw.id !== action.payload.id),
                    isLoading: false,
                    mainWorker: state.mainWorker,
                    sideWorkers: [action.payload, ...state.sideWorkers]
                }
            }
            
        case'DEL_WORKER':
            return{
                OrderId: state.OrderId,
                allWorkers: [...state.allWorkers, action.payload],
                isLoading: false,
                mainWorker: state.mainWorker,
                sideWorkers: state.sideWorkers.filter(aw => aw.id !== action.payload.id)
            }
        case'EDIT_MAIN':
            return{
                OrderId: state.OrderId,
                allWorkers: [...state.allWorkers, state.mainWorker].filter(aw => aw.id !== action.payload.id),
                isLoading: false,
                mainWorker: action.payload,
                sideWorkers: state.sideWorkers
            }
        default:
            return state;
    }
}