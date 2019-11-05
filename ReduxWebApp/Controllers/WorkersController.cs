using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReduxWebApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReduxWebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Workman")]
    [ApiController]
    public class WorkersController : Controller
    {
        private readonly ApplicationContext _context;
        public WorkersController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet("Orders")]
        public async Task<IEnumerable<Order>> OrdersGet()
        {
            return await _context.Orders
                .Where(o => o.State == State.Installating)
                .OrderByDescending(o => o.DateOrder)
                .ToArrayAsync();
        }
    }
}
