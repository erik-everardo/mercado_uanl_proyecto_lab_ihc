using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class PausarVentaProducto : PageModel
    {
        private readonly DbContextApp contexto;

        public PausarVentaProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnGet()
        {
            
        }

        public void OnPost(string idProducto)
        {
            Producto producto = contexto.Productos.Find(int.Parse(idProducto));
            producto.Publico = !producto.Publico;
            
            contexto.Productos.Update(producto);
            contexto.SaveChanges();
        }
    }
}