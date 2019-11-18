import { StateOrder } from "../store/StateOrder";

export const toDate = (data: string | Date) => {
    var month = "",
        date = new Date(data)
    switch(date.getMonth()){
        case 0 : month = "Янв";break;
        case 1 : month = "Фев";break;
        case 2 : month = "Мар";break;
        case 3 : month = "Апр";break;
        case 4 : month = "Май";break;
        case 5 : month = "Июн";break;
        case 6 : month = "Июл";break;
        case 7 : month = "Авг";break;
        case 8 : month = "Сен";break;
        case 9 : month = "Окт";break;
        case 10 : month = "Ноя";break;
        case 11 : month = "Дек";break;
        default: ;break
    }
    return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export const toOrderState = (data: any) => {
    var orderState, color;
    switch(data.state){
        case StateOrder.InProgressing: 
            orderState = "Заказ сейчас обрабатывается"; color="#c5c5c5"
            break;
        case StateOrder.WaitingForInstallation: 
            orderState = "Заказ обработан. Ждите установки " + toDate(data.dateInstalling); color="#e1e437"
            break;
        case StateOrder.Installating: 
            orderState = "На данный момент происходит установка, день завершения: " + toDate(data.dateCompliteInstalling)+" (может изменятся)"; color="#e1e437"
            break;
        case StateOrder.InstallatingСompleted:
            orderState = "Установка завершена, происходит проверка"; color="#6fa6d6"
            break;
        case StateOrder.Completed: 
            orderState = "Завершён!"; color="#37e43c"
            break;
        case StateOrder.Canceled: 
            orderState = "Заказ отклонен"; color="#e43f37"
            break;
        default: 
            orderState = "Состояние заказа неизвестно"; color="#e43f37"; 
            break;
    }
    return {orderState, color}
}