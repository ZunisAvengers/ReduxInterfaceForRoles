export class Convert {
    toDate(data){
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
    toOrderState(data){
        var orderState, color;
        switch(data.state){
            case 0: orderState = "Заказ сейчас обрабатывается"; color="#c5c5c5"
            break;
            case 1: orderState = "Заказ обработан. Ждите установки " + this.toDate(data.dateInstalling); color="#e1e437"
            break;
            case 2: orderState = "На данный момент происходит установка, день завершения: " + this.toDate(data.dateCompliteInstalling)+" (может изменятся)"; color="#e1e437"
            break;
            case 3: orderState = "Установка завершена, происходит проверка"; color="#6fa6d6"
            break;
            case 4: orderState = "Завершён!"; color="#37e43c"
            break;
            case 5: orderState = "Заказ отклонен"; color="#e43f37"
            break;
            default: ;break
        }
        return {orderState, color}
    }
    // toDateForInput(data){
    //     var date = new Date(data)
    //     return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    // }
    static get instance() { return Convert }
}

const convert = new Convert();

export default convert;