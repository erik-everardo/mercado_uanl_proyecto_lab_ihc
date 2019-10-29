//storage navegador
var storage = window.localStorage;

if(localStorage.getItem("sesion_iniciada") === "true"){
    $('#mantener_sesion_iniciada_checkbox').prop("checked",true);
}

function mantenerSesionIniciada(){
    if($('#mantener_sesion_iniciada_checkbox').prop("checked")){
        storage.setItem("sesion_iniciada","true");
    }else{
        storage.setItem("sesion_iniciada","false");
    }
}
