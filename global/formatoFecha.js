function formatoFecha(fecha) {
    let date = new Date(fecha)
    let ceroDia = '';
    let ceroMes = '';

    let day = date.getDate() + 1

    if(day < 10) {
        ceroDia = 0;
    }

    let month = date.getMonth() + 1

    if(month < 10) {
        ceroMes = 0;
    }

    let year = date.getFullYear()

    return `${ceroDia}${day}/${ceroMes}${month}/${year}`;
}

function formatoFechaFullCalendar(fecha){
    let date = new Date(fecha)
    let ceroDia = '';
    let ceroMes = '';

    let day = date.getDate()

    if(day < 10) {
        ceroDia = 0;
    }

    let month = date.getMonth() + 1

    if(month < 10) {
        ceroMes = 0;
    }

    let year = date.getFullYear()

    return `${year}-${ceroMes}${month}-${ceroDia}${day}`;
}

function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

function traerFechaHoy() {
    let diaHoy = new Date().getDate();

    if(diaHoy < 10){
        diaHoy = '0' + diaHoy;
    }

    let mesHoy = new Date().getMonth() + 1;

    if(mesHoy < 10){
        mesHoy = '0' + mesHoy;
    }

    let añoHoy = new Date().getFullYear();

    let fechaHoy = añoHoy + '-' + mesHoy + '-' + diaHoy;

    return fechaHoy;

}

export {
    formatoFecha,
    formatoFechaFullCalendar,
    sumarDias,
    traerFechaHoy
}