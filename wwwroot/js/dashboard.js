//referencias
var pantallaPrincipalDiv = document.getElementById("principal");
var pantallaVentasDiv = document.getElementById("vender");
var pantallaCalificacionesDiv = document.getElementById("calificaciones");
var pantallaVerTodo = document.getElementById("ver_todo");
var pantallaInfoProducto = document.getElementById("info-producto");
var pantallaMisProductos = document.getElementById("mis_productos");
var linkPantallaPrincipal = document.getElementById("btn-principal");
var linkPantallaVentas = document.getElementById("btn-vender");
var linkPantallaCalificaciones = document.getElementById("btn-calificaciones");
var linkPantallaVerTodo = document.getElementById("btn-ver-todo");
var linkPantallaMejorCalificado = document.getElementById("btn-mejor-calificado");
var linkPantallaPorCategoria = document.getElementById("btn-por-categorias");
var linkPantallaPorCampus = document.getElementById("btn-por-campus");
var linkPantallaPorFacultad = document.getElementById("btn-por-facultad");
var linkPantallaMisProductos = document.getElementById("btn-mis-productos");
var sidebar = document.getElementById("sidebar");
var main = document.getElementById("main-dashboard");

//estados
var movilBarraVisible = false;

//eventos
$('#btn-principal').on('click',function () {
    clickEnPrincipal();
});
$('#btn-vender').on('click',function () {
    clickEnVender(false);
});
$('#btn-calificaciones').on('click',function () {
    //aparecer capa "Ver_todo" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "block";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    
    pantallaInfoProducto.style.display = "none";

    //colocar el link como active
    if(!linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
});
$('#btn-ver-todo').on('click',function(){
   clickEnVerTodo(); 
});
$('#btn-por-categorias').on('click',function () {
    clickEnPorCategorias();
});
$('#btn-mejor-calificado').on('click',function(){
    clickEnMejorCalificado();
});
$('#btn-por-facultad').on('click',function(){
    clickEnPorFacultad();
});
$('#btn-por-campus').on('click',function(){
    clickEnPorCompus();
});
$('#btn-mis-productos').on('click',function () {
    clickEnMisProductos();
});
function clickEnPrincipal(){
    //aparecer capa "principal" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "block";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.add("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
    obtenerProductosPublicosRecientes(credencial.usuario,1);
    obtenerProductosRecienPublicados();
}
function clickEnVender(desdeRecienPublicados){
    //aparecer capa "Ventas" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "block";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
    
}
function clickEnVerTodo(){
    //aparecer capa "Ver_todo" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "block";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
    obtenerProductosPublicosRecientes(credencial.usuario,2);
}
function clickEnPorCategorias(){
    //aparecer capa "Por categorias" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
}
function clickEnMejorCalificado(){
    //aparecer capa "Mejor calificado" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
}
function clickEnPorFacultad(){
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
}
function clickEnPorCompus(){
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "none";

    //colocar el link como active
    if(!linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.remove("active");
    }
    if(linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.remove("active");
    }
}
function clickEnMisProductos(){
    //aparecer capa "mis productos" y desaparecer las otras
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "none";
    pantallaMisProductos.style.display = "block";

    //colocar el link como active
    if(!linkPantallaMisProductos.classList.contains("active")){
        linkPantallaMisProductos.classList.add("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    if(linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.remove("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPorCampus.classList.contains("active")){
        linkPantallaPorCampus.classList.remove("active");
    }
    if(linkPantallaPorCategoria.classList.contains("active")){
        linkPantallaPorCategoria.classList.remove("active");
    }
    if(linkPantallaPorFacultad.classList.contains("active")){
        linkPantallaPorFacultad.classList.remove("active");
    }
    if(linkPantallaVerTodo.classList.contains("active")){
        linkPantallaVerTodo.classList.remove("active");
    }
    if(linkPantallaMejorCalificado.classList.contains("active")){
        linkPantallaMejorCalificado.classList.add("active");
    }
    ActualizarMisProductos();
}

$('#boton_movil_mostrar_barra').on('click',function(){
    if(!movilBarraVisible){
        sidebar.style.display = "block";
        sidebar.classList.add("p-3");
        sidebar.classList.add("w-auto");
        movilBarraVisible = true;
    }else{
        sidebar.style.display = "none";
        movilBarraVisible = false;
    }
});
//para ocultar o desocultar barra lateral en caso de cambio de tamaño de pantalla
function cambioDeDimensiones(){
    if(screen.availWidth > 780){
        sidebar.style.display = "block";
    }else{
        sidebar.style.display = "none";
    }
}
function mostrarInfoProducto(){
    pantallaPrincipalDiv.style.display = "none";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";
    pantallaVerTodo.style.display = "none";
    pantallaInfoProducto.style.display = "block";
}
