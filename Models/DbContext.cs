using Microsoft.EntityFrameworkCore;
using mercado_uanl.Models;

namespace mercado_uanl.Models
{
    public class DbContextApp : DbContext
    {
        public DbContextApp(DbContextOptions<DbContextApp> options) : base(options)
        {
            
        }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<ComentarioVendedor> ComentariosVendedor { get; set; }
    }
}