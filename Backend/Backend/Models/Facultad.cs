
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VocacionPlus.Models
{
	[Table("Facultad")]
    public class Facultad
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        [Required]
        public int Id { get; set; }
		[Required]
        public string Nombre { get; set; }	
		[Required]
        public string Descripcion { get; set; }
		[Required]
        public string Imagen { get; set; }	
		[Required]
        public string Url { get; set; }
		[Required]
		public bool Accesibilidad { get; set; } //true publica false privada
		[Required]
		public string Ubicacion { get; set; }
		[Required]
		public string Correo { get; set; }
		public string Telefono { get; set; }
    }
}
