using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class MostrarInfoProducto : PageModel
    {
        private readonly DbContextApp contexto;
        public Producto producto;
        public bool DesdePrincipal, DesdeVerTodo;

        public MostrarInfoProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnGet(string idProducto, string DesdePrincipal="false", string DesdeVerTodo="false")
        {
            this.DesdePrincipal = DesdePrincipal == "true";
            this.DesdeVerTodo = DesdeVerTodo == "true";
            producto = contexto.Productos.Find(int.Parse(idProducto));
        }

        public string ObtenerVendedorPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }
    }
}