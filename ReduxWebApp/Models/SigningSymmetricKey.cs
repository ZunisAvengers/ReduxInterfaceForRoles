using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ReduxWebApp.Models
{
    public class SigningSymmetricKey : IJwtSigningDecodingKey, IJwtSigningEncodingKey
    {
        private readonly SymmetricSecurityKey _secretKey;

        public string SigningAlgorithm { get; } = SecurityAlgorithms.HmacSha256;

        public SigningSymmetricKey(string key) =>_secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

        public SecurityKey GetKey() => this._secretKey;
    }
}
