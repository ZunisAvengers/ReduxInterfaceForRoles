using Microsoft.IdentityModel.Tokens;

namespace ReduxWebApp.Models
{
    public interface IJwtSigningDecodingKey
    {
        SecurityKey GetKey();
    }
}