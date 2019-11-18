using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class EliminarContacto : PageModel
    {
        private readonly DbContextApp contexto;

        public EliminarContacto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnPost(int idUsuario,int idContacto)
        {
            contexto.ServiciosDeMensajeria.Remove(
                contexto.ServiciosDeMensajeria
                    .Single(serv => serv.IdUsuario.Equals(idUsuario) && serv.Id.Equals(idContacto))
                );
            contexto.SaveChanges();
        }
    }
}