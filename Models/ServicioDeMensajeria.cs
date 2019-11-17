namespace mercado_uanl.Models
{
    public class ServicioDeMensajeria
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        //1:WhatsApp
        //2:Facebook Messenger
        //3:Telegram
        public int Servicio { get; set; }
        public string Dato { get; set; }
    }
}