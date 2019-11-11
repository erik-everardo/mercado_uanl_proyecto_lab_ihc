using System.Collections.Generic;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Buscar : PageModel
    {
        private readonly DbContextApp contexto;

        public Buscar(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public List<Producto> productosEncontrados;
        public void OnGet(string q)
        {
            //busqueda muy sencilla basada solo en el contenido de los nombres, descripcion y categoria
            //TODO: ignorar tildes para mejores resultados
            productosEncontrados = contexto.Productos
                .Where(producto => producto.Nombre.ToLower().Contains(q.ToLower()) ||
                                   producto.Descripcion.ToLower().Contains(q.ToLower()) ||
                                   producto.Categoria.ToLower().Contains(q.ToLower()))
                .ToList();
        }
    }
}