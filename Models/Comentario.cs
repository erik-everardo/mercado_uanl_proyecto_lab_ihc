using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace mercado_uanl.Models
{
    public class Comentario
    {
        public int Id { get; set; }
        public int IdProducto { get; set; }
        public string Contenido { get; set; }
        public int NumeroEstrellas { get; set; }
        public DateTime FechaPublicacion { get; set; }
    }
}