using Microsoft.AspNetCore.Mvc.RazorPages;

namespace mercado_uanl.Pages
{
    public class Buscar : PageModel
    {
        public string q;
        public void OnGet(string q)
        {
            this.q = q;
        }
    }
}