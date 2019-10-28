using System.Collections.Generic;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Vendiendo : PageModel
    {
        private readonly DbContextApp contexto;
        public List<Producto> ProductosDelUsuario;
        public Vendiendo(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public IActionResult OnPost(string usuario, string password)
        {
            //verificar usuario y password
            if (contexto.Usuarios.Find(int.Parse(usuario)).Password.Equals(password))
            {
                ProductosDelUsuario =
                    contexto.Productos.Where(producto => producto.IdUsuario.Equals(int.Parse(usuario))).ToList();
            }

            return Page();
        }
    }
}