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
    [Route("api/manager")]
    [Authorize(Roles = "Manager")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public ManagerController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet("Orders")]
        public async Task<IEnumerable<DetailsOrderView>> GetOrders()
        {
            List<Order> orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.MainWorker)
                    .ThenInclude(sw => sw.User)
                .OrderByDescending(o => o.DateOrder)
                .ToListAsync();
            List<DetailsOrderView> orderView = new List<DetailsOrderView>();
            foreach (var order in orders)
            {
                List<WorkersInOrder> sides = await _context.WorkersInOrders
                    .Include(wo => wo.SideWorker)
                        .ThenInclude(sw => sw.User)
                    .Include(wo => wo.Order)
                    .Where(wo => wo.Order == order)
                    .ToListAsync();

                orderView.Add(new DetailsOrderView(order, sides));
            }
            return orderView.ToArray();
        }
        [HttpPost("SetDateInstallation")]
        public async Task<ActionResult> SetDateInstallation([FromBody] Order order)
        {
            Order find = await _context.Orders.FirstOrDefaultAsync(o => o.Id == order.Id);
            if (find == null)
            {
                return NotFound();
            }
            else if (find.State != State.InProgressing)
            {
                return BadRequest();
            }
            else
            {
                find.State = State.WaitingForInstallation;
                find.DateInstalling = order.DateInstalling;
                find.DateCompliteInstalling = order.DateCompliteInstalling;
                _context.Orders.Update(find);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpPost("EndOrder")]
        public async Task<ActionResult> EndOrder([FromBody]Guid id)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            else if (order.State != State.InstallatingСompleted)
            {
                return BadRequest();
            }
            else
            {
                order.State = State.Completed;
                _context.Orders.Update(order);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpPost("CancelOrder")]
        public async Task<ActionResult> CancelOrder([FromBody] Guid id)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            order.State = State.Canceled;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("Workers")]
        public async Task<ActionResult<User>> RegisterWorker([FromBody] RegisterWorkerViewModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);
            if (user == null)
            {
                user = new User
                {
                    Login = model.Login,
                    Password = model.Password,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Phone = model.Phone,
                    Role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Workman")
                };
                _context.Users.Add(user);
                _context.Workers.Add(new Worker
                {
                    Specal = model.Specal,
                    User = user,
                    UserId = user.Id
                });
                await _context.SaveChangesAsync();
                return Ok();
            }            
            return BadRequest();
        }
        [HttpGet("LoadWorkers")]
        public async Task<IEnumerable<WorkerView>> LoadWorkers()
        {
            List<Worker>  workers =  await _context.Workers
                .Include(w => w.User)
                .ToListAsync();
            return workers.Select(u => new WorkerView { Id = u.Id, FullName = u.FullName });
        }
        
        [HttpPost("AddWorkersInOrder")]
        public async Task<ActionResult> AddWorkersInOrder([FromBody] AddWorkers model)
        {
            Order order = await _context.Orders
                .Include(w => w.MainWorker)
                .FirstOrDefaultAsync(o => o.Id == model.OrderId);
            Worker Worker = await _context.Workers.FirstOrDefaultAsync(w => w.Id == model.WorkerId);
            WorkersInOrder sideWorkersInOrder = await _context.WorkersInOrders.FirstOrDefaultAsync(wo => wo.SideWorker == Worker && wo.Order == order);
            if (order != null && Worker != null && sideWorkersInOrder == null)
            {
                if (order.MainWorker == null)
                {
                    order.MainWorker = Worker;
                    _context.Orders.Update(order);
                }
                else
                {
                    _context.WorkersInOrders.Add(new WorkersInOrder
                    {
                        Order = order,
                        SideWorker = Worker
                    });
                }
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();            
        }
        [HttpPost("EditMainWorker")]
        public async Task<ActionResult> EditMainWorker([FromBody] AddWorkers model)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == model.OrderId);
            Worker newWorker = await _context.Workers.FirstOrDefaultAsync(w => w.Id == model.WorkerId);
            if (order != null && newWorker != null)
            {
                order.MainWorker = newWorker;
                _context.Orders.Update(order);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("DeleteSideWorker")]
        public async Task<ActionResult> DeleteSideWorker([FromBody] AddWorkers model)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == model.OrderId);
            Worker Worker = await _context.Workers.FirstOrDefaultAsync(w => w.Id == model.WorkerId);
            WorkersInOrder sideWorkersInOrder = await _context.WorkersInOrders.FirstOrDefaultAsync(wo => wo.SideWorker == Worker && wo.Order == order);
            if (sideWorkersInOrder != null)
            {
                _context.WorkersInOrders.Remove(sideWorkersInOrder);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}