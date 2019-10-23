using System;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.CodeAnalysis;

namespace mercado_uanl.Pages
{
    public class signin : PageModel
    {
        private readonly DbContextApp contexto;
        public signin(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        public bool ErrorUsuarioExiste = false;
        public bool NombreNulo = false;
        public void OnGet()
        {
            
        }

        public IActionResult OnPost(string email,
            string nombre,
            string sexo,
            string pass,
            string CiudadUniversitaria = "0",
            string Mederos = "0",
            string Salud = "0",
            string Linares = "0",
            string Sabinas = "0",
            string CienciasAgropecuarias = "0")
        {
            ErrorUsuarioExiste = (contexto.Usuarios.Any(cuenta => cuenta.Correo.Equals(email)));
            NombreNulo = (String.IsNullOrEmpty(nombre));
            if (!ErrorUsuarioExiste && !NombreNulo)
            {
                Usuario nuevoUsuario = new Usuario();
                nuevoUsuario.NombreCompleto = nombre;
                nuevoUsuario.Password = pass;
                nuevoUsuario.Correo = email;
                nuevoUsuario.Sexo = (sexo == "Mujer"); //true es mujer, false es hombre
                nuevoUsuario.CampusArray = CiudadUniversitaria + "," + Mederos + "," + Salud + "," + Linares + "," + Sabinas + "," + CienciasAgropecuarias;
                contexto.Usuarios.Add(nuevoUsuario);
                contexto.SaveChanges();
                return RedirectToPage("login", new {usuario = email,cuentaNueva = "si",nombre = nombre});
            }
            return Page();
        }
    }
}