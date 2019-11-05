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
        public ManagerOrderView(Order order)
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
        }
    }
}
