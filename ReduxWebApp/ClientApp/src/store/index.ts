import * as Orders from './Orders';
import * as CreateOrder from './CreateOrder';
import * as User from './User';
import * as RegistrationForm from './RegistrationForm';
import * as SignInForm from './SignInForm';
import * as ManagerOrderActionCreators from './ManagerOrderActionCreators';
import * as ManagerOrdersReducer from './ManagerOrdersReducer';
import * as WorkerOrder from './WorkerOrder';

export interface ApplicationState {
    orders: Orders.OrderState | undefined;
    craeteOrder: CreateOrder.CreateOrderState | undefined;
    user: User.UserState | undefined;
    registrationForm: RegistrationForm.RegisterFormState | undefined;
    signInForm: SignInForm.SignInState | undefined;
    managerOrder: ManagerOrderActionCreators.OrderManagerState | undefined;
    workerOrder: WorkerOrder.WorkerOrdersList | undefined;
}

export const reducers = {
    orders: Orders.reducer,
    craeteOrder: CreateOrder.reducer,
    user: User.reducer,
    registrationForm: RegistrationForm.reducer,
    signInForm: SignInForm.reducer,
    managerOrder: ManagerOrdersReducer.reducer,
    workerOrder: WorkerOrder.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
