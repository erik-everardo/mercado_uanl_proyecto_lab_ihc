//referencias
var pantallaPrincipalDiv = document.getElementById("principal");
var pantallaVentasDiv = document.getElementById("vender");
var pantallaCalificacionesDiv = document.getElementById("calificaciones");
var linkPantallaPrincipal = document.getElementById("btn-principal");
var linkPantallaVentas = document.getElementById("btn-vender");
var linkPantallaCalificaciones = document.getElementById("btn-calificaciones");
var sidebar = document.getElementById("sidebar");
var main = document.getElementById("main-dashboard");

$('#btn-principal').on('click',function () {
    //aparecer capa principal y desaparecer las otras
    pantallaPrincipalDiv.style.display = "block";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaVentasDiv.style.display = "none";

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
});
$('#btn-vender').on('click',function () {
 clickEnVender(false);
});
$('#btn-calificaciones').on('click',function () {
   //aparecer capa calificaciones y desaparecer las otras
   pantallaPrincipalDiv.style.display = "none";
   pantallaCalificacionesDiv.style.display = "block";
   pantallaVentasDiv.style.display = "none";

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
});

function clickEnVender(desdeRecienPublicados){
    //aparecer capa ventas y desaparecer las otras
    pantallaVentasDiv.style.display = "block";
    pantallaCalificacionesDiv.style.display = "none";
    pantallaPrincipalDiv.style.display = "none";
    if(desdeRecienPublicados)
        document.location.href = "#iraproductos";
    //colocar el link como active
    if(!linkPantallaVentas.classList.contains("active")){
        linkPantallaVentas.classList.add("active");
    }
    if(linkPantallaCalificaciones.classList.contains("active")){
        linkPantallaCalificaciones.classList.remove("active");
    }
    if(linkPantallaPrincipal.classList.contains("active")){
        linkPantallaPrincipal.classList.remove("active");
    }
    
    ActualizarMisProductos();
}

function desplegarSidebar(){
    if(sidebar.style.display === "block"){
        sidebar.style.display = "none";
        main.style.marginLeft = "0";
    }else{
        sidebar.style.display = "block";
        main.style.marginLeft = "auto";
    }
}