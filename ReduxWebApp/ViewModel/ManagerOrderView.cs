using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReduxWebApp.Models;

namespace ReduxWebApp.ViewModel
{
    public class ManagerOrderView
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public string Plan { get; set; }
        public DateTime DateOrder { get; set; }
        public DateTime? DateInstalling { get; set; }
        public DateTime? DateCompliteInstalling { get; set; }
        public State State { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string MainWorker { get; set; }
        public IEnumerable<WorkerView> SideWorkers { get; set; }
        public ManagerOrderView(Order order, List<WorkersInOrder> sides)
        {
            Id = order.Id;            
            Address = order.Address;
            Plan = order.Plan;
            DateOrder = order.DateOrder;
            DateInstalling = order.DateInstalling;
            DateCompliteInstalling = order.DateCompliteInstalling;
            State = order.State;
            CustomerName = order.Customer.FullName;
            CustomerPhone = order.Customer.Phone;
            MainWorker = order.MainWorker != null 
                ? order.MainWorker.FullName 
                : null;
            SideWorkers = sides != null 
                ? sides.Select(s => new WorkerView { Id = s.SideWorker.Id, FullName = s.SideWorker.FullName }) 
                : null;
        }
    }
    public class WorkerView
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
    }
}

