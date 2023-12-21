// import * as Moment from "moment";

function formatoHoraTimePicker(hora, fecha) {
    // EXTRAIGO LA HORA Y LOS MINUTOS POR SEPARADO
    let horaMinutos = hora.split(':');
    
    // CREO OBJETO DATE Y ASIGNO LA HORA RECIBIDA
    let date = new Date();
    date.setHours(horaMinutos[0], horaMinutos[1])

    if(fecha) {
        let fechaSplit = fecha.split('-');

        date.setsetFullYear(fechaSplit[0], fechaSplit[1], fechaSplit[2]);
    }

    return date;
}

function formatoHoraString(hora) {
    let horas = hora.getHours();
    let minutos = hora.getMinutes();

    if(horas < 10){
        horas = '0' + horas;
    }

    if(minutos < 10){
        minutos = '0' + minutos;
    }

    let horaFormateada = horas + ':' + minutos;

    return horaFormateada;
}

function compararHorarios(horaDiaA, horaDiaB) {
    // var horaA = Moment(horaDiaA,"YYYY/MM/DD HH:mm");
    // var horaB = Moment(horaDiaB,"YYYY/MM/DD HH:mm");

    console.log('HORAdia', horaDiaA)
    

//    if(horaA >= horaB) {
//         return true;
//    } else {
//         return false;
//    }
}

function traerHoraHoy() {
    let horaHoy = new Date().getHours();

    if(horaHoy < 10){
        horaHoy = '0' + horaHoy;
    }

    let minutosHoy = new Date().getMinutes();

    if(minutosHoy < 10){
        minutosHoy = '0' + minutosHoy;
    }

    let horarioHoy = horaHoy + ':' + minutosHoy;

    return horarioHoy;

}

export {
    formatoHoraTimePicker,
    formatoHoraString,
    compararHorarios,
    traerHoraHoy
}