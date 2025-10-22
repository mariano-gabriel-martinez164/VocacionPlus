using VocacionPlus.Models.DTOs;

namespace VocacionPlus.Models.DTOs
{
    public class ValoracionDTO
    {
        public int Id { get; set; }
        public string? Comentario { get; set; }
        public int Puntuacion { get; set; }
        public int AutorId { get; set; }
        public string? AutorNombre { get; set; }
        public int CarreraId { get; set; }
        public string? CarreraNombre { get; set; }
    }
    public class CrearValoracionDTO
    {
        public string? Comentario { get; set; }
        public int Puntuacion { get; set; }
        public int AutorId { get; set; }
        public int CarreraId { get; set; }
    }
}