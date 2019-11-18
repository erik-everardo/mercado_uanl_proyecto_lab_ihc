namespace mercado_uanl.Models
{
    public class Notificacion
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public string Mensaje { get; set; }
        public bool Descartado { get; set; }
    }
}