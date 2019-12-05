using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReduxWebApp.Models;
using ReduxWebApp.ViewModel;

namespace ReduxWebApp.Controllers
{
    [Route("api/identity")]
    [AllowAnonymous]
    public class IdentityController : Controller
    {
        private readonly ApplicationContext _context;
        public IdentityController(ApplicationContext context)
        {
            _context = context;
        }
        public string Token(User user, IJwtSigningEncodingKey signingEncodingKey)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Name)
            };

            var token = new JwtSecurityToken(
                issuer: "ReduxWebApp",
                audience: "ReduxWebAppClient",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new SigningCredentials(
                    signingEncodingKey.GetKey(),
                    signingEncodingKey.SigningAlgorithm)
            );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            var response = new
            {
                Login = user.Login,
                Role = user.Role.Name,
                jwt = jwtToken
            };

            string json = JsonSerializer.Serialize(response);

            return (json);
        }
        [HttpPost("SignIn")]
        public async Task<ActionResult<string>> SignIn([FromBody]AuthenticationRequest authRequest, [FromServices] IJwtSigningEncodingKey signingEncodingKey)
        {
            User user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Login == authRequest.Login && u.Password == authRequest.Password);
            if (user == null) return NotFound();
            return Token(user, signingEncodingKey);
        }
        [HttpPost("Reg")]
        public async Task<ActionResult<User>> Reg([FromBody]User model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == model.Password);
            if (user == null)
            {
                Role role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
                user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Login = model.Login,
                    Password = model.Password,
                    Phone = model.Phone,
                    Role = role,
                    RoleId = role.Id
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        [Authorize]
        [HttpGet("Profile")]
        public async Task<ActionResult<string>> Profile([FromServices] IJwtSigningEncodingKey signingEncodingKey)
        {
            User user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id.ToString() == User.Identity.Name);
            if (user != null)
            {
                return Token(user, signingEncodingKey);
            }
            return NotFound();
        }
    }
}