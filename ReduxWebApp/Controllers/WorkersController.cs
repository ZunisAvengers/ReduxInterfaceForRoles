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
    [Route("api/worker")]
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

            IEnumerable<Order> mainOrders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.MainWorker)
                    .ThenInclude(sw => sw.User)
                .Where(o => o.MainWorker == worker)
                .OrderByDescending(o => o.DateOrder)
                .ToArrayAsync();
            
            IEnumerable<Order> sideOrders = await _context.WorkersInOrders
                .Include(wo => wo.Order)
                    .ThenInclude(o => o.Customer)
                .Include(wo => wo.Order)
                    .ThenInclude(o => o.MainWorker)
                        .ThenInclude(sw => sw.User)
                .Where(wo => wo.SideWorker == worker)
                .Select(wo => wo.Order)
                .ToArrayAsync();
            List<DetailsOrderView> main = new List<DetailsOrderView>(), side = new List<DetailsOrderView>();
            foreach (var order in sideOrders)
            {
                List<WorkersInOrder> sidesWorkers = await _context.WorkersInOrders
                    .Include(wo => wo.SideWorker)
                        .ThenInclude(sw => sw.User)
                    .Include(wo => wo.Order)
                    .Where(wo => wo.Order == order)
                    .ToListAsync();

                side.Add(new DetailsOrderView(order, sidesWorkers));
            }
            foreach (var order in mainOrders)
            {
                List<WorkersInOrder> sidesWorkers = await _context.WorkersInOrders
                    .Include(wo => wo.SideWorker)
                        .ThenInclude(sw => sw.User)
                    .Include(wo => wo.Order)
                    .Where(wo => wo.Order == order)
                    .ToListAsync();

                main.Add(new DetailsOrderView(order, sidesWorkers));
            }
            return new WorkerOrderView { MainOrders = main, SideOrders = side };
        }
        [HttpPost("SetState")]
        public async Task<ActionResult> SetState([FromBody] OrderState order)
        {
            Order find = await _context.Orders
                .Include(o => o.MainWorker)
                .FirstOrDefaultAsync(o => o.Id == order.Id);
            Worker main = await _context.Workers
                .Include(u => u.User)
                .FirstOrDefaultAsync(w => w.User.Id.ToString() == User.Identity.Name);
            if (order.State != State.Installating && order.State != State.InstallatingСompleted )
            {
                return BadRequest();
            }
            else if (find != null)
            {
                find.State = order.State;
                _context.Orders.Update(find);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}
