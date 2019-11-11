import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Orders from './Orders';
import * as CreateOrder from './CreateOrder';
import * as User from './User';
import * as RegistrationForm from './RegistrationForm';


export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    orders: Orders.OrderState | undefined;
    craeteOrder: CreateOrder.CreateOrderState | undefined;
    user: User.UserState | undefined;
    registrationForm: RegistrationForm.RegisterFormState | undefined;
}


export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    orders: Orders.reducer,
    craeteOrder: CreateOrder.reducer,
    user: User.reducer,
    registrationForm: RegistrationForm.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
