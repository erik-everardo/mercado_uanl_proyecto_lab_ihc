using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Internal;

namespace mercado_uanl.Pages
{
    public class CalificarProducto : PageModel
    {
        private readonly DbContextApp contexto;

        public CalificarProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnPost(int idProducto, int estrellas, int idUsuario, string opinion = "")
        {
            if (!contexto.Comentarios.Any(com=>com.IdProducto.Equals(idProducto) && com.IdUsuario.Equals(idUsuario)))
            {
                Comentario comentario = new Comentario();
                comentario.NumeroEstrellas = estrellas;
                comentario.Contenido = opinion;
                comentario.IdProducto = idProducto;
                contexto.Comentarios.Add(comentario);
                contexto.SaveChanges(); 
            }
            
        }
    }
}