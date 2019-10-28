using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Vender : PageModel
    {
        private readonly DbContextApp contexto;

        public Vender(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public bool ExistioError = false;
        public IActionResult OnPost(string id,string pass,string Nombre,string Descripcion,string Categoria, string precio, string urlImagen="")
        {
            var ProductoNuevo = new Producto();
            ProductoNuevo.Nombre = Nombre;
            ProductoNuevo.Descripcion = Descripcion;
            ProductoNuevo.Categoria = Categoria;
            ProductoNuevo.Precio = float.Parse(precio);
            ProductoNuevo.UrlFoto = urlImagen;
            ProductoNuevo.IdUsuario = int.Parse(id);

            if (contexto.Usuarios.Find(int.Parse(id)).Password.Equals(pass))
            {
                contexto.Productos.Add(ProductoNuevo);
                contexto.SaveChanges();
            }
            else
            {
                ExistioError = true;
            }
            
            return Page();
        }
    }
}