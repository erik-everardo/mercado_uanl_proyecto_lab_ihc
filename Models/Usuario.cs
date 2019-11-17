namespace mercado_uanl.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Correo { get; set; }
        public string NombreCompleto { get; set; }
        public bool Sexo { get; set; }
        public string MensajePersonal { get; set; }
        public string Password { get; set; }
        
        //un array se transforma en string, usando un separador ","
        public string CampusArray { get; set; } //el array debe ser de elementos bool
        public bool ConfiguraCuentaPrimeraVez { get; set; }
        public string UrlImagen { get; set; }
    }
}