//validacion de formulario de registro de cuenta

//referencias
var campoPassword = document.getElementById("campo_pass");
var campoPasswordConfirmacion = document.getElementById("campo_pass_comprobacion");
var cardColumnsMisProductos = document.getElementById("mis_productos");
var acaboDePublicar_Div = document.getElementById("acaboDePublicar_Div");
var productosRecientes_Div = document.getElementById("productosRecientes_Div");

$('#campo_pass_comprobacion').on('keyup',function () {
    if(campoPassword.value !== campoPasswordConfirmacion.value){
        if(!campoPassword.classList.contains("is-invalid")){
            campoPassword.classList.add("is-invalid");
        }
        if(!campoPasswordConfirmacion.classList.contains("is-invalid")){
            campoPasswordConfirmacion.classList.add("is-invalid");
        }
    }else{
        if(campoPassword.classList.contains("is-invalid")){
            campoPassword.classList.remove("is-invalid");
        }
        if(campoPasswordConfirmacion.classList.contains("is-invalid")){
            campoPasswordConfirmacion.classList.remove("is-invalid");
        }
    }
});

$('#boton_publicar_producto_nuevo').on('click',function () {
    var DatosAEnviar = $('#formulario_publicar_producto').serialize();
    $.post("/Vender",DatosAEnviar,VerSiErrorAlPublicar);
});
function VerSiErrorAlPublicar(respuesta){
    if(respuesta === "error"){
        alert("Hubo un error");
    }else{
        ActualizarMisProductos();
        
    }
    
}

function ActualizarMisProductos(){
    $.post("/Vendiendo",credencial,InyectarContenidoMisProductos);

}
function InyectarContenidoMisProductos(respuesta){
    cardColumnsMisProductos.innerHTML = respuesta;
}

function eliminarProducto(idUsuario,password,idProducto,token){
    var aEnviar = {idProducto : idProducto,idUsuario : idUsuario, password : password,__RequestVerificationToken: token};
    $.post("/EliminarProducto",aEnviar);
    ActualizarMisProductos();
    obtenerProductosRecienPublicados();
    obtenerProductosPublicosRecientes();
}
function OcultarDesocultarProducto(idUsuario,password,idProducto,token){
    var aEnviar = {idProducto : idProducto,idUsuario : idUsuario, password : password,__RequestVerificationToken: token};
    $.post("/PausarVentaProducto",aEnviar);
    ActualizarMisProductos();
    obtenerProductosRecienPublicados();
}
function obtenerProductosRecienPublicados(){
    var aEnviar = {usuario : credencial.usuario, password : "" + credencial.password, __RequestVerificationToken:credencial.__RequestVerificationToken, recientes:"true"}
        //{usuario : idUsuario,password : password,recientes : "true",__RequestVerificationToken: token};
    $.post("/Vendiendo",aEnviar,inyectarContenidoProductosRecientes);
}
function inyectarContenidoProductosRecientes(resultado){
    acaboDePublicar_Div.innerHTML = resultado;
}
function obtenerProductosPublicosRecientes(idUsuario){
    $.get("/ObtenerProductosPublicos",{recientes:"true", usuarioAExcluir:idUsuario},function(respuesta){
        productosRecientes_Div.innerHTML = respuesta;
    })
}