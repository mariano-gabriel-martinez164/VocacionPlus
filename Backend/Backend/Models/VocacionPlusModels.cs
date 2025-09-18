using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace VocacionPlus.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Contraseña { get; set; }
        public string Mail { get; set; }
        public int? TestVocacionalId { get; set; }
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
    }

    public class Carrera
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Valoracion { get; set; }
        public string Descripcion { get; set; }
        public int FacultadId { get; set; }
        public Facultad Facultad { get; set; }
        public string PlanDeEstudio { get; set; }
    }

    public class Curso
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Valoracion { get; set; }
        public string Descripcion { get; set; }
        public int FacultadId { get; set; }
        public Facultad Facultad { get; set; }
        public string PlanDeEstudio { get; set; }
    }

    public class Valoracion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Comentario { get; set; }
        public int Puntuacion { get; set; }
        public int AutorId { get; set; }
        public Usuario Autor { get; set; }
        public int? FacultadId { get; set; }
        public Facultad Facultad { get; set; }
        public int? CarreraId { get; set; }
        public Carrera Carrera { get; set; }
        public int? CursoId { get; set; }
        public Curso Curso { get; set; }
    }
}
