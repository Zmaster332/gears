/*
Две функции срабатывающие по разному, при выборе разных
вариантах выбора особенностей зубчатой эвольвентной передачи
*/

function helicalNoChosen() {
    var tiltAngle = document.getElementById('hideTiltAngle');
    var teeths2 = document.getElementById('hideTeeths2');
    var teeths22 = document.getElementById('hideTeeths22');
    var shift2 = document.getElementById('hideShift2');
    tiltAngle.style.display = 'none';
    teeths2.style.display = 'none';
    teeths22.style.display = 'none';
    shift2.style.display = 'none';
}

function helicalYesChosen() {
    var tiltAngle = document.getElementById('hideTiltAngle');
    var teeths2 = document.getElementById('hideTeeths2');
    var teeths22 = document.getElementById('hideTeeths22');
    var shift2 = document.getElementById('hideShift2');
    tiltAngle.style.display = '';
    teeths2.style.display = '';
    teeths22.style.display = '';
    shift2.style.display = '';
}


// Проверка числа на целостность
function isInteger(value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    return value % 1 === 0;
}

/*
Функция получает на вход число, место возврата и едицицу измерения.
Проверяет нахождение числа в пределах от 0 до 40
и возвращает результат в заданное место
*/
function checkCorn(number, feedback, unit) {

    if (!isInteger(+number.value) || isNaN(+number.value)) {
        feedback.style.color = 'red';
        feedback.textContent = 'Введено не целое число';
        number.value = 20;
    } else if ((+number.value) >= 0 && (+number.value) <= 40) {
        feedback.style.color = 'black';
        feedback.textContent = +number.value;
    } else {
        feedback.style.color = 'red';
        feedback.textContent = 'Значение должно быть в пределах от 0° до 40°';
        number.value = 20;
    }
}

/*
Функция получает на вход число, место возврата и едицицу измерения.
Проверяет нахождение числа в пределах от 0 до 60
и возвращает результат в заданное место
*/
function checkMinSec(number, feedback, unit) {

    if (!isInteger(+number.value) || isNaN(+number.value)) {
        feedback.style.color = 'red';
        feedback.textContent = 'Введено не целое число';
        number.value = 0;
    } else if ((+number.value) >= 0 && (+number.value) <= 60) {
        feedback.style.color = 'black';
        feedback.textContent = +number.value;
    } else {
        feedback.style.color = 'red';
        feedback.textContent = 'Значение должно быть в пределах от 0 до 60';
        number.value = 0;
    }
}

/*
Функция получает на вход число, места возврата ошибки и правильного варианта
проверяет число по символьно и если есть "," то заменяет "."
и возвращает ошибку или исправильный результат в нужное место
*/
function checkModule(module, feedback, error) {

    //Заменяем запятую на точку, заодно проверяя число на правильность ввода
    var m = [];
    m = module.value.split(',');
    module.value = m.join('.');

    if (isNaN(+module.value)) {
        error.style.color = 'red';
        error.textContent = 'Введено не число';
        feedback.textContent = "";
        module.value = 0;
    } else if ((+module.value) >= 0.05 && (+module.value) <= 100) {
        error.style.color = 'black';
        error.textContent = +module.value;
    } else {
        error.style.color = 'red';
        error.textContent = 'Значение должно быть в пределах от 0.05 до 100';
        module.value = 0;
        feedback.textContent = "";
    }
}



/*
Функция получает на вход число и место возврата.
Проверяет нахождение числа в пределах от 0 до бесконечности
и возвращает результат в заданное место
*/
function checkNumberTeeths(number, feedback, error) {

    if (!isInteger(+number.value) || isNaN(+number.value)) {
        error.style.color = 'red';
        error.textContent = 'Введено не целое число';
        number.value = 0;
        feedback.textContent = "";
    } else if ((+number.value) > 0) {
        error.style.color = 'black';
        error.textContent = +number.value;
        feedback.textContent = +number.value;
    } else {
        error.style.color = 'red';
        error.textContent = 'Значение должно быть больше 0';
        number.value = 0;
        feedback.textContent = "";
    }
}

/*
Функция получает на вход число и место возврата.
Проверяет нахождение числа в пределах от -10.0 до 10.0
и возвращает результат в заданное место
*/
function checkShift(number, feedback) {

    //Заменяем запятую на точку, заодно проверяя число на правильность ввода
    var n = [];
    n = number.value.split(',');
    number.value = n.join('.');

    if (isNaN(+number.value)) {
        feedback.style.color = 'red';
        feedback.textContent = 'Введено не число';
        number.value = 0;
    } else if ((+number.value) >= (-10.0) && (+number.value) <= 10.0) {
        feedback.style.color = 'black';
        feedback.textContent = +number.value;
    } else {
        feedback.style.color = 'red';
        feedback.textContent = 'Значение должно быть в пределах от -9.9 до 9.9';
        number.value = 0;
    }
}

// Объявляем функцию проверки правильности введенного размеров роликов и замены неправильного введенного значения
function checkRoll(number, error) {
    //Заменяем запятую на точку, заодно проверяя число на правильность ввода
    var n = [];
    n = number.value.split(',');
    number.value = n.join('.');

    if (isNaN(+number.value)) {
        error.style.color = 'red';
        error.textContent = 'Введено не число';
        number.value = 0;
    } else if ((+number.value) >= 0.04 && (+number.value) <= 26.069) {
        error.style.color = 'black';
        error.textContent = +number.value;
    } else if ((+number.value) === 0) {
        error.style.color = 'black';
        error.textContent = +number.value;
    } else {
        error.style.color = 'red';
        error.textContent = 'Значение не в пределах: от 0.004 до 26.069, или 0';
        number.value = 0;
    }
}

/*
Переводит значения угла (градусов, минут и секунд) в радианы.
*/
function cornToRadian(corn, min, sec) {
    var radians = ((+corn) + (+min) / 60 +
        (+sec) / 3600) * (Math.PI / 180);
    return radians;

}

//Перевод инвалюты в радианы
/*
Метод Ласкина (уголы от 0 до 64,87°)
Выбран как более точный и современный на 2018год.
*/
function invToCorn(inv) {

    var e = 0.00001;
    var corn = Math.pow((3 * inv), (1 / 3));

    do {
        var c0 = invaluta(corn);
        var alfaA1 = inv - c0;
        var alfaA2 = alfaA1 / Math.pow(corn, 2);
        var alfaA2 = alfaA2 * 0.63;
        var corn = corn + alfaA2;
    } while (Math.abs(alfaA2) > e);
    return corn;

}

/*
Метод Ченга для перевода инвалюты в радианы (уголы от 0 до 74,87°)
Устарел, но присутствует. Можно использовать при больших углах (более 64,87°), 
нежели у Метода Ласкина.
/*
function invToCorn(inv){
    return Math.pow((3*inv),(1/3)) - (2 * inv) / 5 +
					(9 / 175) * Math.pow(3, (2 / 3)) *
					Math.pow(inv, (7 / 3)) - (144 / 67375) *
					Math.pow(inv, (11 / 3)) - (49711 / 153278125) *
					Math.pow(3, (1 / 3)) * Math.pow(inv, (13 / 3));
}*/

//Возвращает инвалюту вводимого угла
function invaluta(corn) {
    return Math.tan(+corn) - (+corn);
}

//Расчет толщины зуба в заданной точке (для построения эвольвенты),
//по делительному диаметру и углу профиля
function thick(dD, d, aT, a, z, x) {
    var aA = Math.acos(dD * Math.cos(aT) / d);
    return d * (((Math.PI / 2 + (2 * x * Math.tan(a))) / z +
        (Math.tan(aT) - aT) - (Math.tan(aA) - aA)));
}