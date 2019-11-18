using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace mercado_uanl.Pages
{
    public class CambiarPassword : PageModel
    {
        private readonly DbContextApp contexto;

        public CambiarPassword(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public bool TodoBien;
        public IActionResult OnPost(int idUsuario, string passwordActual, string passwordNueva)
        {
            var usuario = contexto.Usuarios.Find(idUsuario);
            if (usuario.Password.Equals(passwordActual))
            {
                usuario.Password = passwordNueva;
                contexto.Usuarios.Update(usuario);
                contexto.SaveChanges();
                TodoBien = true;
            }
            else
            {
                TodoBien = false;
            }

            return Page();
        }
    }
}