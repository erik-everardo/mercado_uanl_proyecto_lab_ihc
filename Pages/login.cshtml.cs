using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace mercado_uanl.Pages
{
    public class login : PageModel
    {
        public bool nuevaCuenta = false;
        public bool passIncorrecto = false;
        public string usuario;
        public string nombre;
        public bool UsuarioNoExiste = false;
        public void OnGet(string usuario = "",string nombre = "", string cuentaNueva = "no", string passInc = "no", string usuarioNoExiste = "no")
        {
            if (cuentaNueva == "si")
            {
                nuevaCuenta = true;
                this.usuario = usuario;
                this.nombre = nombre;
            }
            if (passInc == "si")
            {
                passIncorrecto = true;
                this.usuario = usuario;
                this.nombre = nombre;
            }
            if (usuarioNoExiste == "si")
            {
                UsuarioNoExiste = true;
            }
        }
    }
}