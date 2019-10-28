using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class EliminarProducto : PageModel
    {
        private readonly DbContextApp contexto;

        public EliminarProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnGet()
        {
            
        }

        public void OnPost(string idProducto)
        {
            contexto.Productos.Remove(contexto.Productos.Find(int.Parse(idProducto)));
            contexto.SaveChanges();
        }
    }
}