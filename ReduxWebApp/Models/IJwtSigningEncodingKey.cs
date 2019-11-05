using Microsoft.IdentityModel.Tokens;

namespace ReduxWebApp.Models
{
    public interface IJwtSigningEncodingKey
    {
        string SigningAlgorithm { get; }
        SecurityKey GetKey();
    }
}