using System.Collections.Generic;

namespace ReduxWebApp.ViewModel
{
    public class WorkerOrderView
    {
        public IEnumerable<DetailsOrderView> MainOrders { get; set; }
        public IEnumerable<DetailsOrderView> SideOrders { get; set; }
        
    }
}