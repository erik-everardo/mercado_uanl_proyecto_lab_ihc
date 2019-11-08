using System;
using System.Data.Common;
using System.IO;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Vender : PageModel
    {
        private readonly DbContextApp contexto;
        public int Id;

        public Vender(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public bool ExistioError;
        public IActionResult OnPost(string id,string pass,string Nombre,string Categoria, string precio, string Descripcion="")
        {
            
            
            
            var ProductoNuevo = new Producto();
            ProductoNuevo.Nombre = Nombre;
            ProductoNuevo.Descripcion = Descripcion;
            ProductoNuevo.Categoria = Categoria;
            ProductoNuevo.Precio = float.Parse(precio);
            ProductoNuevo.IdUsuario = int.Parse(id);
            ProductoNuevo.Publico = true;

            if (contexto.Usuarios.Find(int.Parse(id)).Password.Equals(pass))
            {
                contexto.Productos.Add(ProductoNuevo);
                contexto.SaveChanges();
                contexto.Entry(ProductoNuevo).GetDatabaseValues();
                Id = ProductoNuevo.Id;
                ExistioError = false;
            }
            else
            {
                ExistioError = true;
            }

            return Page();
        }
    }
}