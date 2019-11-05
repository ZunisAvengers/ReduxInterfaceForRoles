using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.ViewModel
{
    public class AuthenticationRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
