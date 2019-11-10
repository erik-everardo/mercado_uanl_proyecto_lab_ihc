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
        public bool porCampus;
        public int valor;
        public string[] stringsCategorias;
        public string[] stringsCampus;

        public ObtenerProductosPublicos(DbContextApp contexto)
        {
            this.contexto = contexto;
            stringsCategorias = new[]
            {
                "Dulces y botanas","Comida rápida","Postres","Electrónica y computación",
                "Accesorios de celular","Electrodomésticos","Libros y material escolar"
            };
            stringsCampus = new[]
            {
                "Ciudad Universitaria","Mederos","Ciencias de la Salud","Linares","Sabinas Hidalgo",
                "Ciencias Agropecuarias"
            };
        }

        //cuando accion="" se entiende que se quieren todos los productos
        //cuando accion="1" se entiende que se quieren por una categoria, definida por valor
        //cuando accion="2" se entiende que se quieren por campus, definido por valor
        //cuando recientes se recibe como "true", entonces se defuelven los ultimos 3 productos
        public IActionResult OnGet(string accion="",string valor="",string recientes = "false", string usuarioAExcluir = "")
        {
            
            //se solicitan todos y en orden
            if (!usuarioAExcluir.Equals("") && accion=="")
            {
                ListaProductos = contexto.Productos.Where(producto => producto.IdUsuario != int.Parse(usuarioAExcluir) && producto.Publico).ToList();
                ListaProductos = (from i in ListaProductos orderby i.Id descending select i).ToList();
            }
            
            
            
            //por categoria
            else if(!valor.Equals("") && accion=="1")
            {
                ListaProductos = new List<Producto>();
                porCategoria = true;
                porCategoria = false;
                this.valor = int.Parse(valor);
                switch (valor)
                {
                    case "1": 
                        ListaProductos = contexto.Productos.Where(producto => producto.Categoria.Equals("dulces") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "2":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("comida-rapida") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "3":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("postres") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "4":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("electronica") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "5":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("accesorios-movil") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "6":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("electrodomesticos") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                    case "7":
                        ListaProductos = contexto.Productos
                            .Where(producto => producto.Categoria.Equals("libros") && producto.IdUsuario != int.Parse(usuarioAExcluir))
                            .ToList();
                        break;
                }
                ListaProductos = (from i in ListaProductos orderby i.Id descending select i).ToList();
            }
            //por campus (cada valor es un campus 1:CU, 2:Mederos...
            else if (valor != "" && accion == "2")
            {
                porCampus = true;
                porCategoria = false;
                this.valor = int.Parse(valor);
                ListaProductos = new List<Producto>();
                switch (valor)
                {
                    case "1":
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),1))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)).ToList());
                        }
                        break;
                    case "2":
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),2))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)));
                        }
                        break;
                    case "3":
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),3))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)));
                        }

                        break;
                    case "4":
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),4))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)));
                        }

                        break;
                    case "5":
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),5))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)));
                        }

                        break;
                    case "6" :
                        foreach (var usuario in UsuariosPorCampus(int.Parse(usuarioAExcluir),6))
                        {
                            ListaProductos
                                .AddRange(contexto.Productos
                                    .Where(prod=>prod.IdUsuario.Equals(usuario.Id)));
                        }

                        break;
                }
                ListaProductos = (from i in ListaProductos orderby i.Id descending select i).ToList();
            }
            //todo: agregar else if para regresar por puntuacion
            
            
            //para devolver solo los ultimos 3 publicados
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

        public string[] StringAArrayDeInt(string input)
        {

            return input.Split(",");
        }

        public List<Usuario> UsuariosPorCampus(int usuarioAExcluir,int campus)
        {
            List<Usuario> usuarios = contexto.Usuarios.Where(usuario => !usuario.Id.Equals(usuarioAExcluir)).ToList();
            List<Usuario> resultado = new List<Usuario>();
            foreach (var usuario in usuarios)
            {
                if (StringAArrayDeInt(usuario.CampusArray)[campus - 1] == "1")
                {
                    resultado.Add(usuario);
                }
            }

            return resultado;
        }
    }
}