using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReduxWebApp.Models;
using ReduxWebApp.ViewModel;

namespace ReduxWebApp.Controllers
{           
    [Route("api/workers")]
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
        public async Task<WorkerOrderView> OrdersGet()
        {   
            Worker worker = await _context.Workers
                .Include(u => u.User)
                .FirstOrDefaultAsync(w => w.User.Id.ToString() == User.Identity.Name);

            List<Order> main = await _context.Orders
                .Where(o => o.State == State.Installating && o.MainWorker == worker)
                .OrderByDescending(o => o.DateOrder)
                .ToListAsync();
            
            List<WorkersInOrder> sides = await _context.WorkersInOrders
                .Include(wo => wo.Order)
                .Where(wo => wo.SideWorker == worker)
                .ToListAsync();

            return new WorkerOrderView { MainOrders = main, SideOrders = sides.Select(wo => wo.Order) };
        }
        public async Task<ActionResult> SetState([FromBody] Guid id, State state)
        {
            Order find = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (state != (State.Installating | State.InstallatingСompleted) )
            {
                return BadRequest();
            }
            else if (find != null)
            {
                find.State = state;
                _context.Orders.Update(find);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}
