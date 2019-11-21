using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReduxWebApp.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users{ get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkersInOrder> WorkersInOrders { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Role workmanRole = new Role { Id = Guid.NewGuid(), Name = "Workman" };
            Role userRole = new Role { Id = Guid.NewGuid(), Name = "User" };
            Role managerRole = new Role { Id = Guid.NewGuid(), Name = "Manager" };
            User manager = new User
            {
                Id = Guid.NewGuid(),
                RoleId = managerRole.Id,
                FirstName = "manager",
                LastName = "manager",
                Login = "Manager",
                Phone = "000000000",
                Password = "Manager"
            };
            User user = new User
            {
                Id = Guid.NewGuid(),
                RoleId = userRole.Id,
                FirstName = "Tom",
                LastName = "Smit",
                Login = "Username",
                Phone = "123456789",
                Password = "username"
            };
            User workman1 = new User
            {
                Id = Guid.NewGuid(),
                RoleId = workmanRole.Id,
                FirstName = "Sam",
                LastName = "Smit",
                Login = "workname1",
                Phone = "123456789",
                Password = "workone"
            };
            User workman2 = new User
            {
                Id = Guid.NewGuid(),
                RoleId = workmanRole.Id,
                FirstName = "Jon",
                LastName = "Smit",
                Login = "workname2",
                Phone = "123456789",
                Password = "worktwo"
            };
            Worker worker1 = new Worker
            {
                Id = Guid.NewGuid(),
                UserId = workman1.Id,
                Specal = "Specal1"
            };
            Worker worker2 = new Worker
            {
                Id = Guid.NewGuid(),
                UserId = workman2.Id,
                Specal = "Specal2"
            };
            modelBuilder.Entity<Role>().HasData(new Role[] { workmanRole, userRole, managerRole });
            modelBuilder.Entity<User>().HasData(new User[] { manager, user, workman1, workman2 });
            modelBuilder.Entity<Worker>().HasData(new Worker[] { worker1, worker2 });
            base.OnModelCreating(modelBuilder);
        }
    }
}