import { Action, Reducer } from 'redux';
import { KnownAction, OrderManagerState, Worker } from './ManagerOrderActionCreators'
import { StateOrder } from "./StateOrder";

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
        case 'END_ORDER':            
            return {
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) e.state = StateOrder.Completed
                    return e
                }),
                isLoadingWorkers: state.isLoadingWorkers,
                allWorkers: state.allWorkers
            }
        case 'SET_DATE':            
            return {
                isLoadingOrders: false,
                orders: state.orders.map(e => {
                    if (e.id === action.id) {
                        e.dateInstalling = action.dateInstalling as Date;
                        e.dateCompliteInstalling = action.dateCompliteInstalling as Date;
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
                isLoadingWorkers: false,
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