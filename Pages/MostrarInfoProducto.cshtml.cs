using System.Collections.Generic;
using System.Linq;
using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Internal;

namespace mercado_uanl.Pages
{
    public class MostrarInfoProducto : PageModel
    {
        private readonly DbContextApp contexto;
        public Producto producto;
        public bool DesdePrincipal, DesdeVerTodo, DesdeBusqueda, DesdeCU,DesdeMederos,DesdeSalud,DesdeLinares,DesdeSH,
            DesdeAgro,desdeDulces,desdeComidaRapida,desdePostres,desdeElectronica,desdeAccesorios,desdeElectrodomesticos, desdeLibros;

        public int numEstrellas;
        public string comentarioPropio;
        public Comentario comentarioObj;
        public bool yaOpino;

        public MostrarInfoProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
            yaOpino = false;
        }
        //veo de que pantalla vengo para saber a donde debe mandar boton azul (el que tiene la flecha)
        //agregar mas variables: desde categorias y calificacion
        public void OnPost(int idProducto, int idUsuario,
            string DesdePrincipal="false", 
            string DesdeVerTodo="false", 
            string DesdeBusqueda="false",
            string DesdeCU = "false",
            string DesdeMederos ="false",
            string DesdeSalud = "false",
            string DesdeLinares = "false",
            string DesdeSH = "false",
            string DesdeAgro = "false",
            string DesdeDulces = "false",
            string DesdeComidaRapida = "false",
            string DesdePostres = "false",
            string DesdeElectronica = "false",
            string DesdeAccesorios = "false",
            string DesdeElectrodomesticos ="false",
            string DesdeLibros = "false"
            )
        {
            this.DesdePrincipal = DesdePrincipal == "true";
            this.DesdeVerTodo = DesdeVerTodo == "true";
            this.DesdeBusqueda = DesdeBusqueda == "true";
            this.DesdeCU = DesdeCU == "true";
            this.DesdeMederos = DesdeMederos == "true";
            this.DesdeSalud = DesdeSalud == "true";
            this.DesdeLinares = DesdeLinares == "true";
            this.DesdeSH = DesdeSH == "true";
            this.DesdeAgro = DesdeAgro == "true";
            this.desdeDulces = DesdeDulces == "true";
            this.desdeComidaRapida = DesdeComidaRapida == "true";
            this.desdePostres = DesdePostres == "true";
            this.desdeElectronica = DesdeElectronica == "true";
            this.desdeAccesorios = DesdeAccesorios == "true";
            this.desdeElectrodomesticos = DesdeElectrodomesticos == "true";
            this.desdeLibros = DesdeLibros == "true";
            
            producto = contexto.Productos.Find(idProducto);

            //ya opino
            if (contexto.Comentarios.Any(con => con.IdProducto.Equals(idProducto) && con.IdUsuario.Equals(idUsuario)))
            {
                comentarioObj = contexto.Comentarios.Single(con =>
                    con.IdProducto.Equals(idProducto) && con.IdUsuario.Equals(idUsuario));
                yaOpino = true;
                numEstrellas = comentarioObj.NumeroEstrellas;
                comentarioPropio = comentarioObj.Contenido;
            }
            
        }

        public string ObtenerVendedorPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }

        public List<ServicioDeMensajeria> ObtenerServiciosDeMensajeria(int IdUsuario)
        {
            return contexto.ServiciosDeMensajeria.Where(serv => serv.IdUsuario.Equals(IdUsuario)).ToList();
        }

        public bool VerYaOpino(int idUsuario,int idProducto)
        {
            return contexto.Comentarios.Any(com => com.IdProducto.Equals(idProducto) && com.IdUsuario.Equals(idUsuario));
        }
        public List<Comentario> ObtenerComentariosProducto(int IdProducto)
        {
            return contexto.Comentarios.Where(com => com.IdProducto.Equals(IdProducto)).ToList();
        }
        public float ObtenerPromedioCalificaciones(List<Comentario> comentarios)
        {
            int suma = 0;

            foreach (var comentario in comentarios)
            {
                suma += comentario.NumeroEstrellas;
            }

            if (comentarios.Count > 0)
            {
                return suma / comentarios.Count;
            }
            else
            {
                return 0.0f;
            }
            
        }
    }
    
}