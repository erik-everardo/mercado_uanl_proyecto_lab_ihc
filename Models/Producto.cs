namespace mercado_uanl.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string UrlFoto { get; set; }
        public float Precio { get; set; }
        
        //array será transformado en string, usando ","
        public string PuntuacionesArray { get; set; } //el array debe ser de elementos float
    }
}