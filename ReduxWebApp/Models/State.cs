using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.Models
{
    public enum State
    {
        InProgressing,          //-в обработке
        WaitingForInstallation, //-ожидание установки
        Installating,           //-установка
        InstallatingСompleted,  //-установка выполнена
        Completed,              //-выполнено (и проверено)
        Canceled                //-отменено
    }
}
