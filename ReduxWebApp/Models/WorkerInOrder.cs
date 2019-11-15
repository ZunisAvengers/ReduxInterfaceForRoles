using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.Models
{
    public class WorkerInOrder
    {
        public Guid Id { get; set; }
        public Order Order { get; set; }
        public Worker Worker { get; set; }
    }
}
