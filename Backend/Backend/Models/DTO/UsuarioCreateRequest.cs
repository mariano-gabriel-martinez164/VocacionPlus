using VocacionPlus.Models.DTOs;

namespace VocacionPlus.Models.DTOs
{
    public class UsuarioCreateRequest
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public bool esAdmin { get; set; } //dudoso
        public bool? Honor { get; set; } = true;
        public TestVocacionalCreateRequest? Test { get; set; }
    }
    public class UsuarioResponse
    {
        public int Id { get; set; } //dudoso
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }

        public bool Honor { get; set;  } //dudoso
    }
    public class ChangePasswordRequest
    {
        public string PasswordActual { get; set; }
        public string PasswordNueva { get; set; }
    }
    public class UsuarioUpdateRequest
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
    }
    public class LoginRequest
    {
        public string Correo { get; set; }
        public string Password { get; set; }
    };
}
