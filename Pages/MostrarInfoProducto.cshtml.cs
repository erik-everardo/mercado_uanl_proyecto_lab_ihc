using mercado_uanl.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class MostrarInfoProducto : PageModel
    {
        private readonly DbContextApp contexto;
        public Producto producto;
        public bool DesdePrincipal, DesdeVerTodo, DesdeBusqueda, DesdeCU,DesdeMederos,DesdeSalud,DesdeLinares,DesdeSH,DesdeAgro;

        public MostrarInfoProducto(DbContextApp contexto)
        {
            this.contexto = contexto;
        }
        //veo de que pantalla vengo para saber a donde debe mandar boton azul (el que tiene la flecha)
        //agregar mas variables: desde categorias y calificacion
        public void OnGet(string idProducto, 
            string DesdePrincipal="false", 
            string DesdeVerTodo="false", 
            string DesdeBusqueda="false",
            string DesdeCU = "false",
            string DesdeMederos ="false",
            string DesdeSalud = "false",
            string DesdeLinares = "false",
            string DesdeSH = "false",
            string DesdeAgro = "false"
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
            
            producto = contexto.Productos.Find(int.Parse(idProducto));
        }

        public string ObtenerVendedorPorId(int id)
        {
            return contexto.Usuarios.Find(id).NombreCompleto;
        }
    }
}