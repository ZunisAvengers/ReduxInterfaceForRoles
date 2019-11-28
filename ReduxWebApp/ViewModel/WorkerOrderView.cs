using System.Collections.Generic;

namespace ReduxWebApp.ViewModel
{
    public class WorkerOrderView
    {
        public IEnumerable<OrderView> MainOrders { get; set; }
        public IEnumerable<OrderView> SideOrders { get; set; }
        
    }
}