using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace mercado_uanl.Pages
{
    public class ModificarPerfil : PageModel
    {
        private readonly DbContextApp contexto;
        public Usuario usuario;
        public bool VerPerfil;

        public ModificarPerfil(DbContextApp contexto)
        {
            this.contexto = contexto;
            VerPerfil = false;
        }
        public IActionResult OnPost(string IdUsuario,
            string Nombre = "", 
            string Correo = "",
            string MensajePersonal = "",
            string Sexo = "",
            string Accion ="ActualizarTodo",
            string IdServicioMensajeria="",
            string DatoServicioMesajeria="")
        {
            usuario = contexto.Usuarios.Find(int.Parse(IdUsuario));
            switch (Accion)
            {
                case "ActualizarTodo":
                    //pendiente
                    
                    break;
                case "ConfigurarContacto":
                    usuario.ConfiguraCuentaPrimeraVez = true;
                    contexto.Usuarios.Update(usuario);
                    contexto.SaveChanges();
                    break;
                case "AgregarContacto":
                    contexto.ServiciosDeMensajeria.Add(new ServicioDeMensajeria()
                    {
                        IdUsuario = usuario.Id,
                        Servicio = int.Parse(IdServicioMensajeria),
                        Dato = DatoServicioMesajeria
                    });
                    contexto.SaveChanges();
                    break;
                case "VerPerfilPropio":
                    VerPerfil = true;
                    break;
            }

            return Page();
        }
    }
}