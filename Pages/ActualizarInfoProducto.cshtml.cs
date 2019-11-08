using mercado_uanl.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class ActualizarInfoProducto : PageModel
    {
        private readonly DbContextApp contexto;
        private Producto producto;
        public string estado;

        public ActualizarInfoProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public IActionResult OnPost(
            string id_producto,
            string id_usuario, 
            string password,
            string nombre="",
            string descripcion="",
            string categoria="",
            string precio="",
            string accion="default", 
            string url = "")
        {
            //solo me asegura de que sea una peticion real
            if (contexto.Usuarios.Find(int.Parse(id_usuario)).Password.Equals(password))
            {
                producto = contexto.Productos.Find(int.Parse(id_producto));
                if (accion == "url_foto")
                {
                    producto.UrlFoto = url;
                    contexto.Productos.Update(producto);
                    contexto.SaveChanges();
                    estado = "exito!";
                }
                else
                {
                    producto = contexto.Productos.Find(int.Parse(id_producto));
                    producto.Descripcion = descripcion;
                    producto.Nombre = nombre;
                    producto.Categoria = categoria;
                    producto.Precio = float.Parse(precio);
                }
            }
            
            return Page();
        }
    }
}