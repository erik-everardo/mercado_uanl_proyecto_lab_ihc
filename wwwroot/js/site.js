﻿//validacion de formulario de registro de cuenta

//referencias
var campoPassword = document.getElementById("campo_pass");
var campoPasswordConfirmacion = document.getElementById("campo_pass_comprobacion");
var cardColumnsMisProductos = document.getElementById("mis_productos");
var acaboDePublicar_Div = document.getElementById("acaboDePublicar_Div");
var productosRecientes_Div = document.getElementById("productosRecientes_Div");

var spinner = document.getElementById("subiendo_archivo_spinner");

var inputFile = document.querySelector("#elegir_foto_producto_nuevo");
var inputFilePerfil;

var campoPasswordCambiar;
var campoPasswordCambiarConfirm;
var btnSubirFoto;
var spinnerSubiendoFotoPerfil;

$('#campo_pass_comprobacion').on('keyup', function () {
    if (campoPassword.value !== campoPasswordConfirmacion.value) {
        if (!campoPassword.classList.contains("is-invalid")) {
            campoPassword.classList.add("is-invalid");
        }
        if (!campoPasswordConfirmacion.classList.contains("is-invalid")) {
            campoPasswordConfirmacion.classList.add("is-invalid");
        }
    } else {
        if (campoPassword.classList.contains("is-invalid")) {
            campoPassword.classList.remove("is-invalid");
        }
        if (campoPasswordConfirmacion.classList.contains("is-invalid")) {
            campoPasswordConfirmacion.classList.remove("is-invalid");
        }
    }
});

$('#formulario_publicar_producto').on('submit', function () {
    var DatosAEnviar = $('#formulario_publicar_producto').serialize();

    $.post("/Vender", DatosAEnviar, VerSiErrorAlPublicar);

    return false;
});

function subirFoto(id_producto) {
    if (inputFile.files.length > 0) {
        var formData = new FormData();
        formData.append("archivo", inputFile.files[0]);
        formData.append("accion", "producto");
        spinner.style.display = "block";
        fetch("https://fotos-mercado-uanl.azurewebsites.net/guardar.php", {
            method: 'POST',
            body: formData
        }).then(function (r) {
            return r.text();
        }).then(function (nombre_archivo) {
            actualizarURLFoto(nombre_archivo, id_producto);
            spinner.style.display = "none";
            alert("Producto publicado exitosamente");
            document.getElementById("formulario_publicar_producto").reset();
        });
    } else {
        alert("Producto publicado exitosamente");
        document.getElementById("formulario_publicar_producto").reset();
    }
}

function actualizarURLFoto(name, id_producto) {
    //llamo a la pagina "ActualizarInfoProducto" con parametro "accion=url_foto"
    var ruta_completa_foto = "https://fotos-mercado-uanl.azurewebsites.net/img_producto/" + name;
    var aEnviar = {
        id_producto: id_producto,
        id_usuario: credencial.usuario,
        password: credencial.password,
        url: ruta_completa_foto,
        accion: "url_foto",
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/ActualizarInfoProducto", aEnviar);

}

function actualizarURLFotoPerfil(name, id_usuario) {
    var ruta_completa_foto = "https://fotos-mercado-uanl.azurewebsites.net/img_perfil/" + name;
    var aEnviar = {
        IdUsuario: id_usuario,
        Accion: "img",
        URL: ruta_completa_foto,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/ModificarPerfil", aEnviar);
}

function VerSiErrorAlPublicar(respuesta) {
    if (respuesta === "error") {
        alert("Hubo un error");
    } else {
        subirFoto(respuesta);

        ActualizarMisProductos();

    }

}

function ActualizarMisProductos() {
    $.post("/Vendiendo", credencial, InyectarContenidoMisProductos);

}

function InyectarContenidoMisProductos(respuesta) {
    cardColumnsMisProductos.innerHTML = respuesta;
}

function eliminarProducto(idUsuario, password, idProducto, token, desde) {
    var aEnviar = {idProducto: idProducto, idUsuario: idUsuario, password: password, __RequestVerificationToken: token};
    $.post("/EliminarProducto", aEnviar, function () {
        obtenerProductosRecienPublicados();
        ActualizarMisProductos();
    });

}

function OcultarDesocultarProducto(idUsuario, password, idProducto, token) {
    var aEnviar = {idProducto: idProducto, idUsuario: idUsuario, password: password, __RequestVerificationToken: token};
    $.post("/PausarVentaProducto", aEnviar, function () {
        ActualizarMisProductos();
        obtenerProductosRecienPublicados();
    });

}

function obtenerProductosRecienPublicados() {
    var aEnviar = {
        usuario: credencial.usuario,
        password: "" + credencial.password,
        __RequestVerificationToken: credencial.__RequestVerificationToken,
        recientes: "true"
    };
    //{usuario : idUsuario,password : password,recientes : "true",__RequestVerificationToken: token};
    $.post("/Vendiendo", aEnviar, inyectarContenidoProductosRecientes);
}

function inyectarContenidoProductosRecientes(resultado) {
    acaboDePublicar_Div.innerHTML = resultado;
}

function obtenerProductosPublicosRecientes(idUsuario, desde) {
    //parametro "desde":
    //1=>Principal
    //2=>MostrarTodo
    //Agregar mas aqui
    switch (desde) {
        case 1:
            $.get("/ObtenerProductosPublicos", {recientes: "true", usuarioAExcluir: idUsuario}, function (respuesta) {
                productosRecientes_Div.innerHTML = respuesta;
            });
            break;
        case 2:
            $.get("/ObtenerProductosPublicos", {usuarioAExcluir: idUsuario}, function (respuesta) {
                pantallaVerTodo.innerHTML = respuesta;
            });
            break;
    }

}

function obtenerInfoProducto(idProducto, desde) {
    //parametro "desde":
    //1=>Principal
    //2=>MostrarTodo
    //3=>Busqueda
    //4=>CU
    //5=>Mederos
    //6=>Ciencias de la Salud
    //7=>Linares
    //8=>Sabinas Hidalgo
    //9=>Ciencias Agropecuarias
    //10=>Dulces
    //11=>Comida rapida
    //12=>Postres
    //13=>Electronica y computacion
    //14=>Accesorios de celular
    //15=>Electrodomesticos
    //16=>Libros y material escolar
    switch (desde) {
        case 1:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdePrincipal: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto();
            });
            break;
        case 2:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeVerTodo: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto();
            });
            break;
        case 3:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeBusqueda: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 4:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeCU: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 5:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeMederos: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 6:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeSalud: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 7:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeLinares: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 8:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeSH: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 9:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeAgro: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 10:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeDulces: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 11:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeComidaRapida: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 12:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdePostres: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 13:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeElectronica: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 14:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeAccesorios: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 15:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeElectrodomesticos: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        case 16:
            $.post("/MostrarInfoProducto", {
                idProducto: idProducto,
                DesdeLibros: "true",
                __RequestVerificationToken: credencial.__RequestVerificationToken,
                idUsuario: credencial.usuario
            }, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto()
            });
            break;
        //agregar aqui mas casos: desde pantallas de por calificacion y categoria
        default:
            $.post("/MostrarInfoProducto", {idProducto: idProducto}, function (respuesta) {
                pantallaInfoProducto.innerHTML = respuesta;
                mostrarInfoProducto();
            });
            break;
    }
}

function obtenerProductoPorCategoria(num_cat) {
    var aEnviar = {
        valor: num_cat, usuarioAExcluir: credencial.usuario, accion: 1
    };
    $.get("/ObtenerProductosPublicos", aEnviar, function (respuesta) {
        //que hacer con la respuesta
        //poner respuesta en div de categorias
        pantallaVerTodo.innerHTML = respuesta;
    });
}

function obtenerProductosPorCampus(num_campus) {
    var aEnviar = {
        valor: num_campus, usuarioAExcluir: credencial.usuario, accion: 2
    };
    $.get("/ObtenerProductosPublicos", aEnviar, function (respuesta) {
        pantallaVerTodo.innerHTML = respuesta;
    });
}

$('#btn-buscar').on('click', function () {
    buscar($('#cuadro-busqueda').val());
});

function buscar(query) {
    $.get("/Buscar", {q: query}, function (resultado) {
        mostrarPantallaBusqueda();

        pantallaResultadosBusqueda.innerHTML = "<h4>Resultados para " + '&quot;' + query + '&quot;</h4>' + resultado;
    });
}

function actualizarInfoProducto(id_producto, nuevoNombre, nuevoPrecio, nuevaDescripcion, nuevaCategoria) {
    var nombre = document.getElementById(nuevoNombre);
    var precio = document.getElementById(nuevoPrecio);
    var descripcion = document.getElementById(nuevaDescripcion);
    var categoria = document.getElementById(nuevaCategoria);
    var aEnviar = {
        id_producto: id_producto,
        id_usuario: credencial.usuario,
        password: credencial.password,
        nombre: nombre.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        precio: precio.value,
        __RequestVerificationToken: credencial.__RequestVerificationToken
        //terminar: modificacion de foto
    };
    $.post("/ActualizarInfoProducto", aEnviar, function () {
    });
}

$('#alerta-actualizar-info-contacto').on('closed.bs.alert', function () {
    //ya no preguntar
    var Enviar = {
        Accion: "ConfigurarContacto",
        IdUsuario: credencial.usuario,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/ModificarPerfil", Enviar);
});

function obtenerPerfil(id) {
    var Enviar = {id: id};
    $.get("/Perfil", Enviar, function (res) {
        pantallaPerfil.innerHTML = res;
        campoPasswordCambiar = document.getElementById("campo_password_nueva_cambiar");
        campoPasswordCambiarConfirm = document.getElementById("campo_password_nueva_cambiar_verificar");
        inputFilePerfil = document.querySelector("#form_subir_foto_usuario");
        btnSubirFoto = document.querySelector("#btn_subir_foto");
        spinnerSubiendoFotoPerfil = document.querySelector("#spinner_subiendo_foto_perfil");
        btnSubirFoto.addEventListener("click", function () {
            subirFotoPerfil(credencial.usuario);
            spinnerSubiendoFotoPerfil.style.display = "block";
        });
        $('#campo_password_nueva_cambiar_verificar').on('keyup', function () {

            if (campoPasswordCambiar.value !== campoPasswordCambiarConfirm.value) {
                if (!campoPasswordCambiar.classList.contains("is-invalid")) {
                    campoPasswordCambiar.classList.add("is-invalid");
                }
                if (!campoPasswordCambiarConfirm.classList.contains("is-invalid")) {
                    campoPasswordCambiarConfirm.classList.add("is-invalid");
                }
            } else {
                if (campoPasswordCambiar.classList.contains("is-invalid")) {
                    campoPasswordCambiar.classList.remove("is-invalid");
                }
                if (campoPasswordCambiarConfirm.classList.contains("is-invalid")) {
                    campoPasswordCambiarConfirm.classList.remove("is-invalid");
                }
                $('#btn_cambiar_password').prop("disabled", false);

            }
        });
    });
}

function agregarContacto() {
    var row = document.createElement("tr");
    var columna1 = document.createElement("td");
    var columna2 = document.createElement("td");
    var columna3 = document.createElement("td");

    var aEnviar = {
        idUsuario: credencial.usuario,
        claveServ: $('#select_contacto').val(),
        dato: $('#campo_dato_contacto').val(),
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/AgregarContactoMsj", aEnviar, function (respuesta) {
        var stringOnClick = "eliminarContacto(" + "this," + respuesta + ")";
        columna1.innerText = $('#select_contacto option:selected').text();
        columna2.innerText = $('#campo_dato_contacto').val();
        columna3.innerHTML = "<button class='btn btn-danger' onclick='" + stringOnClick + "'>Eliminar</button>";
        row.append(columna1);
        row.append(columna2);
        row.append(columna3);
        $('#tabla-contactos').append(row);
    });
}

function guardarDescripcionUsuario(idUsuario, descripcion) {
    var aEnviar = {
        Accion: "GuardarMensaje",
        Descripcion: descripcion,
        IdUsuario: credencial.usuario,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/ModificarPerfil", aEnviar, function () {
        alert("Información actualizada");
    });
}

function eliminarContacto(elementoDOM, id) {
    elementoDOM.parentElement.parentElement.remove();
    $.post("/EliminarContacto", {
        idUsuario: credencial.usuario,
        idContacto: id,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    });
}

function cambiarPassword(idUsuario, passwordActual, nuevaPassword) {
    var AEnviar = {
        idUsuario: idUsuario,
        passwordActual: passwordActual,
        passwordNueva: nuevaPassword,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    };
    $.post("/CambiarPassword", AEnviar, function (respuesta) {
        if (respuesta === "mal") {
            alert("Comprueba tu contraseña");
        } else {
            alert("Contraseña actualizada");
            $('#campo_password_nueva_cambiar').val("");
            $('#campo_password_cambiar').val("");
            $('#campo_password_nueva_cambiar_verificar').val("");
        }
    });
}


function subirFotoPerfil(id_usuario) {
    if (inputFilePerfil.files.length > 0) {
        var formData = new FormData();
        formData.append("archivo", inputFilePerfil.files[0]);
        formData.append("accion", "perfil");
        //spinner.style.display = "block";
        fetch("https://fotos-mercado-uanl.azurewebsites.net/guardar.php", {
            method: 'POST',
            body: formData
        }).then(function (r) {
            return r.text();
        }).then(function (nombre_archivo) {
            actualizarURLFotoPerfil(nombre_archivo, id_usuario);
            spinnerSubiendoFotoPerfil.style.display = "none";
            setTimeout(function () {
                obtenerPerfil(credencial.usuario), alert("Fotografía subida con éxito")
            }, 2000);
        });
    } else {
        alert("Debe seleccionar un archivo de foto");
    }
}

var numEstrellas;
var _idProducto;

function opinar(idProducto, estrellas, padreEstrella) {
    var textoEstrellas = padreEstrella.lastElementChild;
    //textoEstrellas.innerText = estrellas.toString();
    numEstrellas = estrellas;
    pintarEstrellas(numEstrellas);
    _idProducto = idProducto;

}

var estrellasDOM = document.getElementsByClassName("estrella");

function pintarEstrellas(num_estrellas) {
    for (var i = 0; i < num_estrellas; i++) {
        estrellasDOM[i].style.color = "#FFD133";
    }
    for (var i = num_estrellas; i < estrellasDOM.length; i++) {
        estrellasDOM[i].style.color = "black";
    }
}

function subirComentario(idProducto, estrellas, texto) {
    //post a pagina "CalificarProducto
    var aEnviar = {
        idProducto: idProducto,
        estrellas: estrellas,
        opinion: texto,
        __RequestVerificationToken: credencial.__RequestVerificationToken,
        idUsuario: credencial.usuario
    }
    $.post("/CalificarProducto", aEnviar, function () {
        alert("Opinión actualizada");
    });
}

var espacioComentarios;
var dioClicEnVerComentarios = false;

function obtenerComentarios(idProducto) {
    dioClicEnVerComentarios = true;
    document.getElementById("link_ver_comentarios").style.display = "none";
    $.get("/MostrarComentarios", {idProducto: idProducto}, function (res) {
        espacioComentarios = document.getElementById("espacio_comentarios");
        espacioComentarios.innerHTML = res;
    });
}

function obtenerComentariosDeMisProductos() {
    $.post("/Evaluacion", {
        idUsuario: credencial.usuario,
        __RequestVerificationToken: credencial.__RequestVerificationToken
    }, function (respuesta) {
        pantallaEvaluaciones.innerHTML = respuesta;
    })
}