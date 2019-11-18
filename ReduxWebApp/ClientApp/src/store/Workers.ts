import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface WorkersState{
    isLoading:boolean;
    workers: Worker[];
}

interface Worker{
    id: string;
    name: string;
    specal: string;
    isChange: boolean
}
interface LoadWorkers{
    type: 'LOAD_WORKERS';
    workers: Worker[];
}

export const actionCreators = {
    loadWorkers: (): AppThunkAction<LoadWorkers> => (dispatch) => {
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
const unloadedState: WorkersState = { workers: [], isLoading: true };
export const reducer: Reducer<WorkersState> = (state: WorkersState | undefined, incomingAction: Action): WorkersState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as LoadWorkers;
    if (action.type === 'LOAD_WORKERS'){
        return{
            isLoading: false,
            workers: action.workers
        }
    }
    else return unloadedState
}