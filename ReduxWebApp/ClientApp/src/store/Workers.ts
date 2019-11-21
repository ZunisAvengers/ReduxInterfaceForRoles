import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface WorkersState{
    isLoading: boolean;
    allWorkers: Worker[];
    mainWorkers?: Worker;
    sideWorkers: Worker[];
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


const unloadedState: WorkersState = { allWorkers: [], sideWorkers: [],  isLoading: true, mainWorkers: undefined };
export const reducer: Reducer<WorkersState> = (state: WorkersState | undefined, incomingAction: Action): WorkersState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as LoadWorkers;
    switch(action.type){
        case'LOAD_WORKERS':
            return{
                isLoading: false,
                allWorkers: action.workers,
                mainWorkers: state.mainWorkers,
                sideWorkers: state.sideWorkers
            };
        default:
            return state;
    }
}