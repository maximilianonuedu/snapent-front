function randomColor() {
    let colores = [
        '#AA47BD',
        '#7B1EA2',
        '#779193',
        '#465A63',
        '#EB417A',
        '#C1175C',
        '#5C6AC1',
        '#0688D2',
        '#00569B',
        '#0098A6',
        '#00897B',
        '#004D41',
        '#699F39',
        '#33691D',
        '#8C6E63',
        '#5D4138',
        '#7E58C2',
        '#512DA6',
        '#ED6D03',
        '#F6511D',
        '#60340B'
    ]

    let color = colores[Math.floor(Math.random() * colores.length)];
  
    return color;
}

export {
    randomColor
}