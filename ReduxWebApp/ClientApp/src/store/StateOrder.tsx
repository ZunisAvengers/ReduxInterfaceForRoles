export enum StateOrder {
    InProgressing = 0,          //-в обработке
    WaitingForInstallation = 1, //-ожидание установки
    Installating = 2,           //-установка
    InstallatingСompleted = 3,  //-установка выполнена
    Completed = 4,              //-заказ выполнен и проверен
    Canceled = 5                //-отменено
}