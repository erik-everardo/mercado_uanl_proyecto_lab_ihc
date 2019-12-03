using System.Collections.Generic;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Evaluacion : PageModel
    {
        private readonly DbContextApp contexto;
        public Evaluacion(DbContextApp contexto)
        {
            this.contexto = contexto;
            comentarios = new List<Comentario>();
        }

        public List<Comentario> comentarios;
        public List<Producto> productos;
        public IActionResult OnPost(int idUsuario)
        {
            productos = contexto.Productos.Where(prod => prod.IdUsuario.Equals(idUsuario)).ToList();
            foreach (var producto in productos)
            {
                foreach (var comentario in contexto.Comentarios.Where(com=>com.IdProducto.Equals(producto.Id)).ToList())
                {
                    comentarios.Add(comentario);
                }
            }

            comentarios.Reverse();
            return Page();
        }
    }
}