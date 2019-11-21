using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.Models
{
    public class Worker 
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string Specal { get; set; }
        public string FullName 
        {
            get { return $"{User.FullName} ({Specal})"; }
        }
        public List<WorkersInOrder> Orders { get; set; }
        public Worker()
        {
            Orders = new List<WorkersInOrder>();
        }
    }
}
