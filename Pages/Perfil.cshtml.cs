using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace mercado_uanl.Pages
{
    public class Perfil : PageModel
    {
        private readonly DbContextApp contexto;

        public Perfil(DbContextApp contexto)
        {
            this.contexto = contexto;
        }

        public Usuario usuario;
        public IActionResult OnGet(string id)
        {
            usuario = contexto.Usuarios.Find(int.Parse(id));
            return Page();
        }
    }
}