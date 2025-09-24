namespace VocacionPlus.Models.DTOs
{
    public class UsuarioCreateRequest
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public bool? Honor { get; set; } //puede comentar
        public bool esAdmin { get; set; }
        public TestVocacional Test { get; set; }
    }
    public class UsuarioResponse
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
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
    }
}
