using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public User Customer { get; set; }
        public string Address { get; set; }
        public string Plan { get; set; }
        public DateTime DateOrder { get; set; }
        public DateTime? DateInstalling { get; set; }
        public DateTime? DateCompliteInstalling { get; set; }
        public State State { get; set; }
        public Worker MainWorker { get; set; }
        public List<WorkersInOrder> SideWorkers { get; set; }
        public Order()
        {
            SideWorkers = new List<WorkersInOrder>();
        }
    }
}
