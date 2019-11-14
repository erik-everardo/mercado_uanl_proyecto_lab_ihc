using System;

namespace mercado_uanl.Models
{
    public class ComentarioVendedor
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public string Contenido { get; set; }
        public int NumeroEstrellas { get; set; }
        public DateTime FechaPublicacion { get; set; }
    }
}