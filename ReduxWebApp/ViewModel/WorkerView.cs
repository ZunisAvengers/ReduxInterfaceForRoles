using System;
using System.Collections.Generic;
using ReduxWebApp.Models;

namespace ReduxWebApp.ViewModel
{
    public class WorkerOrderView
    {
        public IEnumerable<Order> MainOrders { get; set; }
        public IEnumerable<Order> SideOrders { get; set; }
    }
}
