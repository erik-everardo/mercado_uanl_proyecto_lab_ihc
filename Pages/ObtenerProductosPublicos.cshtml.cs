using System.Collections.Generic;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;
using Microsoft.AspNetCore.Authentication;

namespace mercado_uanl.Pages
{
    public class ObtenerProductosPublicos : PageModel
    {
        private readonly DbContextApp contexto;
        public List<Producto> ListaProductos;
        public bool Recientes;
        public bool porCategoria;
        public int categoria;
        public string[] stringsCategorias;

        public ObtenerProductosPublicos(DbContextApp contexto)
        {
            this.contexto = contexto;
            stringsCategorias = new[]
            {
                "Dulces y botanas","Comida rápida","Postres","Electrónica y computación",
                "Accesorios de celular","Electrodomésticos","Libros y material escolar"
            };
        }
        public IActionResult OnGet(string por="",string recientes = "false", string usuarioAExcluir = "")
        {
            
            //se solicitan todos y en orden
            if (!usuarioAExcluir.Equals(""))
            {
                ListaProductos = contexto.Productos.Where(producto => producto.IdUsuario != int.Parse(usuarioAExcluir) && producto.Publico).ToList();
                ListaProductos = (from i in ListaProductos orderby i.Id descending select i).ToList();
            }
            
            
            //para devolver solo los ultimos 3 publicados
            if (recientes == "true")
            {
                Recientes = true;
                if(ListaProductos.Count >= 3) ListaProductos = ListaProductos.Take(3).ToList();
            }
            else if(!por.Equals(""))
            {
                porCategoria = true;
                categoria = int.Parse(por);
                switch (por)
                {
                    case "1": 
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("dulces"))
                            .ToList();
                        break;
                    case "2":
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("comida-rapida"))
                            .ToList();
                        break;
                    case "3":
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("postres"))
                            .ToList();
                        break;
                    case "4":
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("electronica"))
                            .ToList();
                        break;
                    case "5":
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("accesorios-movil"))
                            .ToList();
                        break;
                    case "6":
                        ListaProductos = ListaProductos
                            .Where(producto => producto.Categoria.Equals("electrodomesticos")).ToList();
                        break;
                    case "7":
                        ListaProductos = ListaProductos.Where(producto => producto.Categoria.Equals("libros")).ToList();
                        break;
                }  
            }

            
            
            return Page();
        }

        public string NombreUsuarioPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }
    }
}