using ReduxWebApp.Models;
using System;

namespace ReduxWebApp.ViewModel
{
    public class OrderState
    {
        public Guid Id { get; set; }
        public State State { get; set; }
    }
}