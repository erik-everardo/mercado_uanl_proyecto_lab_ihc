//validacion de formulario de registro de cuenta

//referencias
var campoPassword = document.getElementById("campo_pass");
var campoPasswordConfirmacion = document.getElementById("campo_pass_comprobacion");
var cardColumnsMisProductos = document.getElementById("mis_productos");
var acaboDePublicar_Div = document.getElementById("acaboDePublicar_Div");
var productosRecientes_Div = document.getElementById("productosRecientes_Div");

var spinner = document.getElementById("subiendo_archivo_spinner");

var inputFile = document.querySelector("#elegir_foto_producto_nuevo");

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

$('#formulario_publicar_producto').on('submit',function () {
    var DatosAEnviar = $('#formulario_publicar_producto').serialize();
    
    $.post("/Vender",DatosAEnviar,VerSiErrorAlPublicar);
    
    return false;
});
function subirFoto(id_producto){
    if(inputFile.files.length > 0){
        var formData = new FormData();
        formData.append("archivo",inputFile.files[0]);
        formData.append("accion","producto");
        spinner.style.display = "block";
        fetch("https://fotos-mercado-uanl.azurewebsites.net/guardar.php", {
            method: 'POST',
            body: formData
        }).then(function(r){
            return r.text();
        }).then(function(nombre_archivo){
           actualizarURLFoto(nombre_archivo,id_producto);
           spinner.style.display = "none";
           document.getElementById("formulario_publicar_producto").reset();
        });
    }
}
function actualizarURLFoto(name,id_producto){
    //llamo a la pagina "ActualizarInfoProducto" con parametro "accion=url_foto"
    var ruta_completa_foto = "https://fotos-mercado-uanl.azurewebsites.net/img_producto/" + name;
    var aEnviar = {
        id_producto:id_producto,
        id_usuario:credencial.usuario,
        password:credencial.password,
        url:ruta_completa_foto,
        accion:"url_foto",
        __RequestVerificationToken:credencial.__RequestVerificationToken
    };
    $.post("/ActualizarInfoProducto",aEnviar);
    console.log(ruta_completa_foto);
    
}
function VerSiErrorAlPublicar(respuesta){
    if(respuesta === "error"){
        alert("Hubo un error");
    }else{
        subirFoto(respuesta);
        
        ActualizarMisProductos();
        
    }
    
}

function ActualizarMisProductos(){
    $.post("/Vendiendo",credencial,InyectarContenidoMisProductos);

}
function InyectarContenidoMisProductos(respuesta){
    cardColumnsMisProductos.innerHTML = respuesta;
}

function eliminarProducto(idUsuario,password,idProducto,token,desde){
    var aEnviar = {idProducto : idProducto,idUsuario : idUsuario, password : password,__RequestVerificationToken: token};
    $.post("/EliminarProducto",aEnviar, function(){
        obtenerProductosRecienPublicados();
        ActualizarMisProductos();
    });
    
}
function OcultarDesocultarProducto(idUsuario,password,idProducto,token){
    var aEnviar = {idProducto : idProducto,idUsuario : idUsuario, password : password,__RequestVerificationToken: token};
    $.post("/PausarVentaProducto",aEnviar,function () {
        ActualizarMisProductos();
        obtenerProductosRecienPublicados();
    });
    
}
function obtenerProductosRecienPublicados(){
    var aEnviar = {usuario : credencial.usuario, password : "" + credencial.password, __RequestVerificationToken:credencial.__RequestVerificationToken, recientes:"true"};
        //{usuario : idUsuario,password : password,recientes : "true",__RequestVerificationToken: token};
    $.post("/Vendiendo",aEnviar,inyectarContenidoProductosRecientes);
}
function inyectarContenidoProductosRecientes(resultado){
    acaboDePublicar_Div.innerHTML = resultado;
}
function obtenerProductosPublicosRecientes(idUsuario,desde){
    //parametro "desde":
    //1=>Principal
    //2=>MostrarTodo
    //Agregar mas aqui
    switch(desde){
        case 1: $.get("/ObtenerProductosPublicos",{recientes:"true", usuarioAExcluir:idUsuario},function(respuesta){
            productosRecientes_Div.innerHTML = respuesta;
        });break;
        case 2: $.get("/ObtenerProductosPublicos",{usuarioAExcluir:idUsuario},function(respuesta){
            pantallaVerTodo.innerHTML = respuesta;
        });break;
    }
    
}
function obtenerInfoProducto(idProducto,desde){
    //parametro "desde":
    //1=>Principal
    //2=>MostrarTodo
    //Agregar mas aqui
    switch (desde) {
        case 1: $.get("/MostrarInfoProducto",{idProducto:idProducto,DesdePrincipal:"true"},function(respuesta){
            pantallaInfoProducto.innerHTML = respuesta;
            mostrarInfoProducto();
        });break;
        case 2: $.get("/MostrarInfoProducto",{idProducto:idProducto,DesdeVerTodo:"true"},function(respuesta){
            pantallaInfoProducto.innerHTML = respuesta;
            mostrarInfoProducto();
        });break;
        default: $.get("/MostrarInfoProducto",{idProducto:idProducto},function(respuesta){
            pantallaInfoProducto.innerHTML = respuesta;
            mostrarInfoProducto();
        });break;
    }
}

function obtenerProductoPorCategoria(num_cat){
    var aEnviar = {
        valor:num_cat,usuarioAExcluir:credencial.usuario,accion:1
    };
    $.get("/ObtenerProductosPublicos",aEnviar,function (respuesta){
        //que hacer con la respuesta
        //poner respuesta en div de categorias
        pantallaVerTodo.innerHTML = respuesta;
    });
}
function obtenerProductosPorCampus(num_campus) {
    var aEnviar = {
        valor:num_campus,usuarioAExcluir:credencial.usuario,accion:2
    }
    $.get("/ObtenerProductosPublicos",aEnviar,function (respuesta) {
       pantallaVerTodo.innerHTML = respuesta; 
    });
}

$('#btn-buscar').on('click',function(){
    buscar($('#cuadro-busqueda').val());
});

function buscar(query){
    $.get("/Buscar",{q:query},function(resultado){
        pantallaPrincipalDiv.style.display = "none";
        pantallaCalificacionesDiv.style.display = "none";
        pantallaVentasDiv.style.display = "none";
        pantallaVerTodo.style.display = "none";
        pantallaInfoProducto.style.display = "none";
        pantallaMisProductos.style.display = "none";
        pantallaResultadosBusqueda.style.display = "block";
        
        pantallaResultadosBusqueda.innerHTML = "<h4>Resultados para " + '&quot;'+ query + '&quot;</h4>'+ resultado;
    });
}