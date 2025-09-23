using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace VocacionPlus.Models
{
    public class Facultad
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        [Required]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public bool Accesibilidad { get; set; } //publica = true
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Imagen { get; set; }
        public string Url { get; set; }
        public List<Carrera> Carreras { get; set; } = new List<Carrera>();
    }
    public enum TipoUsuario
    {
        Normal,
        Admin
    }
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Contraseña { get; set; }
        public string Mail { get; set; }
        public TipoUsuario Rol { get; set; } = TipoUsuario.Normal;
        public int TestVocacionalId { get; set; }
        public TestVocacional TestVocacional { get; set; }
    }

    public class TestVocacional
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public float Realista { get; set; }
        public float Investigador { get; set; }
        public float Artistico { get; set; }
        public float Social { get; set; }
        public float Emprendedor { get; set; }
        public float Convencional { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public List<Tag> Tags { get; set; } = new();
    }

    public class Carrera
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int FacultadId { get; set; }
        public Facultad Facultad { get; set; }
        public string PlanDeEstudio { get; set; }
        public List<Tag> Tags { get; set; } = new();
    }

    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public List<Carrera> Carreras {get; set; } = new();
    }

    public class Valoracion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Comentario { get; set; }
        public int Puntuacion { get; set; }
        public int AutorId { get; set; }
        public Usuario Autor { get; set; }
        public int CarreraId { get; set; }
        public Carrera Carrera { get; set; }
    }
}
