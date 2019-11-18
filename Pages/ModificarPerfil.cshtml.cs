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
        public ModificarPerfil(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public IActionResult OnPost(string IdUsuario,
            string Nombre = "", 
            string Correo = "",
            string MensajePersonal = "",
            string Sexo = "",
            string Accion ="ActualizarTodo",
            string IdServicioMensajeria="",
            string DatoServicioMesajeria="",
            string Descripcion = "")
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
                    var contacto = new ServicioDeMensajeria()
                    {
                        IdUsuario = usuario.Id,
                        Servicio = int.Parse(IdServicioMensajeria),
                        Dato = DatoServicioMesajeria
                    };
                    contexto.ServiciosDeMensajeria.Add(contacto);
                    contexto.SaveChanges();
                    break;
                case "GuardarMensaje":
                    usuario.MensajePersonal = Descripcion;
                    contexto.Usuarios.Update(usuario);
                    contexto.SaveChanges();
                    break;
            }

            return Page();
        }
    }
}