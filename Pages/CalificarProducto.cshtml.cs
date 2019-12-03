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
        public void OnPost(int idProducto, int idUsuario, string opinion = "",int estrellas=1)
        {

            if (!contexto.Comentarios.Any(com => com.IdUsuario.Equals(idUsuario) && com.IdProducto.Equals(idProducto)))
            {
                Comentario comentario = new Comentario();
                comentario.NumeroEstrellas = estrellas;
                comentario.Contenido = opinion;
                comentario.IdProducto = idProducto;
                comentario.IdUsuario = idUsuario;
                contexto.Comentarios.Add(comentario);
                contexto.SaveChanges(); 
            }
            else
            {
                Comentario comentarioAModificar = contexto.Comentarios.Single(com =>
                    com.IdUsuario.Equals(idUsuario) && com.IdProducto.Equals(idProducto));
                comentarioAModificar.NumeroEstrellas = estrellas;
                comentarioAModificar.Contenido = opinion;
                contexto.Comentarios.Update(comentarioAModificar);
                contexto.SaveChanges(); 
            }
        }
    }
}