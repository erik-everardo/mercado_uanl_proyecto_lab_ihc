using System;
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
        public Usuario Usuario;
        public bool Recientes;
        public Vendiendo(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public IActionResult OnPost(string usuario, string password, string recientes="false")
        {
            //verificar usuario y password
            if (contexto.Usuarios.Find(int.Parse(usuario)).Password.Equals(password))
            {
                Usuario = contexto.Usuarios.Find(int.Parse(usuario));
                ProductosDelUsuario =
                    contexto.Productos.Where(producto => producto.IdUsuario.Equals(int.Parse(usuario))).ToList();
                ProductosDelUsuario.Reverse();

                if (recientes.Equals("true") && ProductosDelUsuario.Count >= 3)
                {
                    Recientes = true;
                    ProductosDelUsuario = ProductosDelUsuario.Take(3).ToList();

                }
                else if(recientes.Equals("true") && ProductosDelUsuario.Count < 3)
                {
                    Recientes = true;
                    
                }
            }
            return Page();
        }

        public int ObtenerPromedioProducto(int idProducto)
        {
            List<Comentario> comentarios =
                contexto.Comentarios.Where(com => com.IdProducto.Equals(idProducto)).ToList();
            int totalEstrellas = 0;
            foreach (var comentario in comentarios)
            {
                totalEstrellas += comentario.NumeroEstrellas;
            }

            if (comentarios.Count > 0)
            {
                return totalEstrellas / comentarios.Count;
            }

            return 0;
        }
    }
}