using System.Collections.Generic;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class MostrarComentarios : PageModel
    {
        private readonly DbContextApp contexto;
        public List<Comentario> comentarios;

        public MostrarComentarios(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public IActionResult OnGet(int idProducto)
        {
            comentarios = contexto.Comentarios.Where(com => com.IdProducto.Equals(idProducto)).ToList();
            return Page();
        }

        public string ObtenerNombreUsuarioPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }

        public int ObtenerIdUsuarioPorIdProducto(int id)
        {
            return contexto.Usuarios.Find(id).Id;
        }
    }
}