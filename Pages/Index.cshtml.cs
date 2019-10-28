using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace mercado_uanl.Pages
{
    public class IndexModel : PageModel
    {
        
        private readonly DbContextApp contexto;
        
        //estado para saber si se recibio post, que indica que quiere iniciar sesion (dashboard)
        public bool InicioSesion = false;
        
        //datos view cuando inicia sesion
        public string[] campus = null;
        public string Nombre;
        public string Correo;
        public bool Sexo;
        public int idUsuario;
        public string password;

        public IndexModel(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public void OnGet() //Para mostrar solo la pagina principal (inicio normal index)
        {
        }
        
        public IActionResult OnPost(string user, string password, string cuentaNueva = "no") //Para iniciar sesion
        {
            if (contexto.Usuarios.Any(c => c.Correo.Equals(user)))
            {
                var usuario = contexto.Usuarios.Single(c => c.Correo.Equals(user));
                if (usuario.Password == password)
                {
                    campus = usuario.CampusArray.Split(",");
                    Nombre = usuario.NombreCompleto;
                    Correo = usuario.Correo;
                    Sexo = usuario.Sexo;
                    InicioSesion = true;
                    idUsuario = usuario.Id;
                    this.password = usuario.Password;
                    return Page();
                }

                if (cuentaNueva == "si")
                {
                    return RedirectToPage("login", new{passInc = "si",usuario = usuario.Correo, cuentaNueva = cuentaNueva, nombre = usuario.NombreCompleto});
                }
                return RedirectToPage("login", new{passInc = "si",usuario = usuario.Correo});
            }

            return RedirectToPage("login", new{usuarioNoExiste = "si"});
        }
    }
}
