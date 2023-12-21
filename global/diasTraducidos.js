function diasTraducidos(diaIng){
    if(diaIng === 'Monday') {
        return 'Lunes';
    } else if(diaIng === 'Tuesday') {
        return 'Martes';
    } else if(diaIng === 'Wednesday') {
        return 'Miércoles';
    }else if(diaIng === 'Thursday') {
        return 'Jueves';
    }else if(diaIng === 'Friday') {
        return 'Viernes';
    }else if(diaIng === 'Saturday') {
        return 'Sábado';
    }else if(diaIng === 'Sunday') {
        return 'Domingo';
    }
}

export {
    diasTraducidos
}