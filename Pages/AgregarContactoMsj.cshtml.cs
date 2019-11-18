using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class AgregarContactoMsj : PageModel
    {
        
        private readonly DbContextApp contexto;

        public AgregarContactoMsj(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public int IdServicio;

        public IActionResult OnPost(int idUsuario, string claveServ, string dato)
        {
            ServicioDeMensajeria servicio = new ServicioDeMensajeria();
            servicio.Dato = dato;
            servicio.IdUsuario = idUsuario;
            switch (claveServ)
            {
                case "cel": //Numero de celular
                    servicio.Servicio = 1;
                    break;
                case "wh": //WhatsApp
                    servicio.Servicio = 2;
                    break;
                case "teleg": //Telegram
                    servicio.Servicio = 3;
                    break;
                case "fbm": //Facebook Messenger
                    servicio.Servicio = 4;
                    break;
            }
            contexto.ServiciosDeMensajeria.Add(servicio);
            contexto.SaveChanges();
            contexto.Entry(servicio).GetDatabaseValues();
            IdServicio = servicio.Id;
            return Page();
        }
    }
}