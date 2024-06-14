using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ChatWebAPI
{
    public class AuthFields
    {
        public const string ISSUER = "AuthServer"; // издатель токена
        public const string AUDIENCE = "AuthClient"; // потребитель токена
        const string KEY = "the_really-hard_key_to-encode_surely"; // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() => 
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}