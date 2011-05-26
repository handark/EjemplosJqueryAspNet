/*!
* Utilidades y funciones comunes
* Autor: Jose Luis Orozco - jorozco@afianzamientosolidario.com.
*/

$(document).ready(function () {


    

    $('body').append("<div id='cargador-handark'  ></div>");

    $('body').append("<div id='alertas-handark' ></div>");


    $('#alertas-handark').dialog({
        modal: true, autoOpen: false, show: "blind", hide: "explode", height: 105, title: 'Sisco CRM',
        resizable: false,
        open: function (event, ui) { $(".ui-dialog-titlebar-close").show(); },
        buttons: {
            Aceptar: function () {
                $(this).dialog("close").hide("explode");
            }
        }
    });

    $('#cargador-handark').dialog({
        modal: true, autoOpen: false, show: "blind", hide: "explode", height: 60, title: 'Sisco CRM',
        closeOnEscape: false, resizable: false,
        open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); }
    });

    $('.text').focus(function () { $(this).addClass("ui-state-focus"); });
    $('.text').blur(function () { $(this).removeClass("ui-state-focus"); });

 //   document.onmousedown = right;

    //    $('#demo2').click(function () {
    //        $.blockUI({ css: {
    //            border: 'none',
    //            padding: '15px',
    //            backgroundColor: '#000',
    //            '-webkit-border-radius': '10px',
    //            '-moz-border-radius': '10px',
    //            opacity: .5,
    //            color: '#fff'
    //        }
    //        });

    //        setTimeout($.unblockUI, 2000);
    //    }); 

});


function right(e) {

//    var mensaje = "Operacion no permitida";
//    if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && e.which == 3) {
//        AlertaHandark(mensaje, "alert");
//        return false;
//    }
//    else if ($.browser.opera && e.which == 3) {
//        AlertaHandark(mensaje, "alert");
//        return false;
//    }
//    else if ($.browser.mozilla && e.which == 3) {
//        AlertaHandark(mensaje, "alert");
//        return false;
//    }


    var msg = "Operación no permitida";
    if (navigator.appName == 'Netscape' && e.which == 3) {
        alert(msg);  // Delete this line to disable but not alert user
        return false;
    }
    else
        if (navigator.appName == 'Microsoft Internet Explorer' && event.button == 2) {
            alert(msg); // Delete this line to disable but not alert user
            return false;
        }
    return true;
}

var VerificarEstadoSesionGeneral = function () {
    var sesionUsuario = '<%= Session[Coloso.Vista.Ayudas.ConstantesMensajeroDigital.USUARIO_DATOS] %>';

    if (sesionUsuario == "" || sesionUsuario == null) {
        location.href = "../../default.aspx";
    }
    else {
        MostrarInformacionUsuario();
    }
}

jQuery.fn.SoloDigitos = function () {
    
    this.keypress(function (event) {
        if (event.which && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    return this;
};


var AlertaHandark = function (mensaje, icono) {
    $("#alertas-handark").empty().append("<p><span class='ui-icon ui-icon-" + icono + "' style='float: left; margin-right: .3em;'></span>" + mensaje + "</p>");
    $("#alertas-handark").dialog('open').show('blind');
}

var MostrarAjaxCargador = function (mensaje, icono) {

    $("#cargador-handark").empty().append("<p>" + mensaje + "</p>");

    if ($("#cargador-handark").dialog('isOpen') == false) {
        $("#cargador-handark").dialog('open').show('blind');
    }
}

var AjaxCargador = function (mensaje, icono) {

    if (icono == null) {
        icono = "folder-open";
    }

    $("#cargador-handark").ajaxStart(function () {
        MostrarAjaxCargador(mensaje, icono);
    });

    $("#cargador-handark").ajaxStop(function () {
        $(this).dialog("close").hide("blind");
    });

}

var AbrirAjaxCargador = function (mensaje) {
  
     MostrarAjaxCargador(mensaje);

}

var CerrarAjaxCargador = function () {

    $("#cargador-handark").dialog("close").hide("blind");

}


//Precargar imagenes al cargar pagina 
jQuery.preloadImages = function () {
    for (var i = 0; i < arguments.length; i++) {
        jQuery("<img>").attr("src", arguments[i]);
    }
}

var PrecargarIconos = function () {
    var imagen = new Image();
    imagen.src = '../librerias/jquery/css/cupertino1.8.11/images/ui-icons_808080_256x240.png';
}

//Devuelve la hora actual en formato hh:mm
var GetHoraActual = function () {

    var _hora = new Date().getHours();
    if (_hora < 10)
        hora = "0" + _hora;
    else
        hora = _hora;

    var _minutos = new Date().getMinutes();
    if (_minutos < 10)
        minutos = "0" + _minutos;
    else
        minutos = _minutos;

    return hora + ":" + minutos;
}

//Devuelve la fecha actual en formato yyyy-mm-dd
var GetFechaActual = function () {

    var _mes = new Date().getMonth() + 1;
    if (_mes < 10)
        mes = "0" + _mes;
    else
        mes = _mes;

    var _dia = new Date().getDate();
    if (_dia < 10)
        dia = "0" + _dia;
    else
        dia = _dia;

    return new Date().getFullYear() + "-" + mes + "-" + dia;

}

//Devuelve una fecha en formato yyyy-mm-dd
var GetFechaConFormato= function (fecha) {

    var _mes = new Date().getMonth() + 1;
    if (_mes < 10)
        mes = "0" + _mes;
    else
        mes = _mes;

    var _dia = new Date().getDate();
    if (_dia < 10)
        dia = "0" + _dia;
    else
        dia = _dia;

    return new Date().getFullYear() + "-" + mes + "-" + dia;

}

//Devuelve una lista de parametros enviados en una url por el metodo get
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {};
    var tokens;

    while (tokens = /[?&]?([^=]+)=([^&]*)/g.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function ValidarCorreo(campo) {
    if (campo.value != '') {
        var RegExPattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        var errorMessage = 'Correo electronico no valido.';
        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.value = '';
            campo.focus();
        }
    }
}

function ValidarSoloNumeros(campo) {
    if (campo.value != '') {
        var RegExPattern = /^(?:\+|-)?\d+$/;
        var errorMessage = 'Solo se permiten numeros en este campo.';
        var valor = campo.value.substr(0, 1);
        if (valor=="-") {
            alert("No se permiten valores negativos");
            campo.focus();
            campo.value = '0';
        }

        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.focus();
            campo.value = '0';
            
        }
    }
}

function ValidarFecha(campo) {
    if (campo.value != '') {
        var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
        var errorMessage = 'Formato de Fecha no Valido.';
        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.focus();
            campo.value = '';

        }
    }
}

function ValidarRangoHoras(HoraInicial, HoraFinal) {
    var hora = HoraInicial.split(':');
    var hora_inicio = hora[0];
    var minutos_inicio = hora[1];

    var hora2 = HoraFinal.split(':');
    var hora_final = hora2[0];
    var minutos_final = hora2[1];

    if (hora_inicio > hora_final) {
        return false;
    }
    if (hora_inicio == hora_final) {
        if (minutos_inicio > minutos_final) {
            return false;
        }
    }

    return true;
}