export function percentDifference(a, b) {
    //Функция, которая вычисляет процентное соотношение между курсами до покупки и после покупки
    return +(100 * Math.abs((a - b) / ( (a + b) / 2 ))).toFixed(2)
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}