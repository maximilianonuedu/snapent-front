function diasPorNumero(arrayDias) {
    let rta = [];

    for(let i=0; i<arrayDias.length; i++) {
        if(arrayDias[i] == 'Lunes'){
            rta.push(1);
        }

        if(arrayDias[i] == 'Martes'){
            rta.push(2);
        }

        if(arrayDias[i] == 'Miércoles'){
            rta.push(3);
        }

        if(arrayDias[i] == 'Jueves'){
            rta.push(4);
        }

        if(arrayDias[i] == 'Viernes'){
            rta.push(5);
        }

        if(arrayDias[i] == 'Sábado'){
            rta.push(6);
        }

        if(arrayDias[i] == 'Domingo'){
            rta.push(0);
        }
    }

    return rta;
}

function numeroSegunDia(dia){
    if(dia == 'Lunes'){
        return 1;
    }

    if(dia == 'Martes'){
        return 2;
    }

    if(dia == 'Miércoles'){
        return 3;
    }

    if(dia == 'Jueves'){
        return 4;
    }

    if(dia == 'Viernes'){
        return 5;
    }

    if(dia == 'Sábado'){
        return 6;
    }

    if(dia == 'Domingo'){
        return 0;
    }
}

export {
    diasPorNumero,
    numeroSegunDia
}