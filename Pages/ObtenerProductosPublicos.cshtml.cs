using System.Collections.Generic;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;

namespace mercado_uanl.Pages
{
    public class ObtenerProductosPublicos : PageModel
    {
        private readonly DbContextApp contexto;
        public List<Producto> ListaProductos;
        public bool Recientes;

        public ObtenerProductosPublicos(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public IActionResult OnGet(string recientes = "false", string usuarioAExcluir = "")
        {

            if (!usuarioAExcluir.Equals(""))
            {
                ListaProductos = contexto.Productos.Where(producto => producto.IdUsuario != int.Parse(usuarioAExcluir) && producto.Publico).ToList();
            }
            ListaProductos = (from i in ListaProductos orderby i.Id descending select i).ToList();

            if (recientes == "true")
            {
                Recientes = true;
                if(ListaProductos.Count >= 3) ListaProductos = ListaProductos.Take(3).ToList();
            }

            
            return Page();
        }

        public string NombreUsuarioPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }
    }
}