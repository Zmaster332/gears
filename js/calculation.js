//Если JavaScript работает
window.onload = function() {
    var errorJS = document.getElementById('errorJS');
    errorJS.parentNode.removeChild(errorJS);
    var tiltAngle = document.getElementById('hideTiltAngle');
    var teeths2 = document.getElementById('hideTeeths2');
    var teeths22 = document.getElementById('hideTeeths22');
    var shift2 = document.getElementById('hideShift2');
    tiltAngle.style.display = 'none';
    teeths2.style.display = 'none';
    teeths22.style.display = 'none';
    shift2.style.display = 'none';
}

//Основные ячейки для работы
var helicalNo = document.getElementById('helicalNo');
var helicalYes = document.getElementById('helicalYes');

var alfaCorn = document.getElementById('alfaCorn');
var alfaMin = document.getElementById('alfaMin');
var alfaSec = document.getElementById('alfaSec');

var betaCorn = document.getElementById('betaCorn');
var betaMin = document.getElementById('betaMin');
var betaSec = document.getElementById('betaSec');

var module = document.getElementById('module');
var rollD = document.getElementById('rollD');
var numberTeeths1 = document.getElementById('numberTeeths1');
var numberTeeths2 = document.getElementById('numberTeeths2');
var shift1 = document.getElementById('shift1');
var shift2 = document.getElementById('shift2');

var tableXY = document.getElementById('buttonXY');
var build = document.getElementById('buttonBuild');
var exit = document.getElementById('buttonExit');

function calc() {

    //Если модуль и число зубьев в нужных пределах, то запуск программы
    if (parseFloat(module.value) === 0) {

        //Прячем таблицу и кнопку построения, если не правильные данные
        var postEntry = document.getElementById('right');
        postEntry.style.display = 'none';

        var buttonXY = document.getElementById('buttonXY');
        buttonXY.style.display = 'none';

        errorModule.style.color = 'red';
        errorModule.textContent = 'Модуль не задан';

    } else if (parseFloat(numberTeeths1.value) === 0) {

        //Прячем таблицу и кнопку построения, если не правильные данные
        var postEntry = document.getElementById('right');
        postEntry.style.display = 'none';

        var buttonXY = document.getElementById('buttonXY');
        buttonXY.style.display = 'none';

        errorNumberTeeths1.style.color = 'red';
        errorNumberTeeths1.textContent = 'Число зубьев колеса не задано';

    } else {

        //Если все введено правильно, присваиваются значения и
        //запускается основной расчет
        feedbackAlfaMin.textContent = "";
        feedbackAlfaSec.textContent = "";
        feedbackAlfaCorn.style.color = 'black';
        feedbackAlfaCorn.textContent = alfaCorn.value + "° " + alfaMin.value + "\' " + alfaSec.value + "\"";

        feedbackBetaMin.textContent = "";
        feedbackBetaSec.textContent = "";
        feedbackBetaCorn.style.color = 'black';
        feedbackBetaCorn.textContent = betaCorn.value + "° " + betaMin.value + "\' " + betaSec.value + "\"";

        errorModule.style.color = 'black';
        errorModule.textContent = module.value;
        feedbackModule.textContent = module.value;

        feedbackNumberTeeths1.style.color = 'black';
        errorNumberTeeths1.textContent = numberTeeths1.value;
        feedbackNumberTeeths1.textContent = numberTeeths1.value;

        feedbackNumberTeeths2.style.color = 'black';
        errorNumberTeeths2.textContent = numberTeeths2.value;
        feedbackNumberTeeths2.textContent = numberTeeths2.value;

        errorRollD.style.color = 'black';
        errorRollD.textContent = rollD.value;

        feedbackShift1.style.color = 'black';
        feedbackShift1.textContent = shift1.value;

        feedbackShift2.style.color = 'black';
        feedbackShift2.textContent = shift2.value;

        //Запуск расчета        
        calculation();

        //Показываем таблицу
        var postEntry = document.getElementById('right');
        postEntry.style.display = 'block';
        var xy = document.getElementById('buttonXY');
        xy.style.display = 'block';
    }
}

function calculation() {

    alfaCorn.value; //Градусы угла "альфа"
    alfaMin.value; //Минуты угла "альфа"
    alfaSec.value; //Секунды угла "альфа"

    betaCorn.value; //Градусы угла "бета" 
    betaMin.value; //Минуты угла "бета"
    betaSec.value; //Секунды угла "бета"


    module.value; //Модуль передачи

    var gearRatio; //Передаточное отношение
    var z1 = parseFloat(numberTeeths1.value); //Число зубьев шестерни 1
    var z2 = parseFloat(numberTeeths2.value); //Число зубьев шестерни 2

    var x1 = parseFloat(shift1.value); //Смещение 1й шестерни
    var x2 = parseFloat(shift2.value); //Смещение 2й шестерни
    var xSumm = x1 + x2; //Суммарное смещение

    var alfa; //Угол "альфа" в радианах    
    var beta; //Угол "бета" в радианах
    var step; //шаг зубьев  

    var alfaD; //Угол проходящий на концентрической окружности проходящий через центр шарика
    var D; //Диаметр ролика (шарика)


    var hP; //Высота зуба
    var aDiv; //Делительное межосевое расстояние
    var aW; //Межосевое расстояние
    var alfaT; //Угол профиля в радианах
    var invAlfaT; //Инвалюта угла профиля
    var alfaTW; //Угол зацепления
    var invAlfaTW; //Инвалюта угола зацепления
    var y; //Коэфф. воспринимат. смещения
    var yDiff; //Коэфф. уравнит. смещения

    var dD; //Делительный диаметp (d)
    var rD; //Делительный радиус (r)
    var dB; //Диаметр основной окружности (db)
    var rB; //Радиус основной окружности (rb)
    var dA; //Диаметр вершин зубьев (da)
    var rA; //Радиус вершин зубьев (ra)
    var dW; //Начальный диаметр (dw)
    var rW; //Начальный радиус (rw)
    var dF; //Диаметр впадин (df)
    var rF; //Радиус впадин(rf)
    var rZ; //Радиус закругления (pfp)
    var coefHeightHead = 1.0; //Коэффициент высоты головки зуба(ha*)
    var coefRadialClearance = 0.25; //Коэффициент радиального зазора
    var invAlfa; //Инвалюта угла альфа
    var M; //Размер по роликам (М)



    //Перевод градусов угла "альфа" в радианы
    alfa = cornToRadian(alfaCorn.value, alfaMin.value, alfaSec.value);

    //Инвалюта  угла альфа
    invAlfa = invaluta(alfa);

    //Перевод градусов угла "бета" в радианы
    beta = cornToRadian(betaCorn.value, betaMin.value, betaSec.value);

    //Определение шага колеса
    step = Math.PI * (+module.value);

    //Расчет передаточного числа
    gearRatio = z2 / z1;

    //Расчет высоты зуба
    if ((+module.value) <= 0.5) {
        hP = 2.5 * (+module.value);
    } else if ((+module.value) > 0.5 && (+module.value) <= 1) {
        hP = 2.35 * (+module.value);
    } else {
        hP = 2.25 * (+module.value);
    }


    //Расчет  разных типах передач
    if ((beta === 0) && (xSumm === 0)) {
        //Угол профиля
        alfaT = alfa;
        //Угол зацепления
        alfaTW = alfaT;
        //Расчет делительного межосевого расстояния
        aDiv = 0.5 * (z1 + z2) * (+module.value);
        //Межосевое расстояние
        aW = aDiv;
        //Расчет делительного диаметpа
        dD = z1 * (+module.value);
        //Расчет делительного радиуса
        rD = dD / 2;
        //Начальный диаметр и радиус
        dW = dD;
        rW = dW / 2;
        //Расчет коэф. смещений
        y = 0;
        yDiff = 0;

    } else {
        alfaT = Math.atan(Math.tan(alfa) / Math.cos(beta));

        //Расчет инвалюты угла профиля
        invAlfaT = invaluta(alfaT);
        //Расчет инвалюты угла зацепления
        invAlfaTW = (2 * (x1 + x2) * Math.tan(alfa)) / (z1 + z2) + invAlfaT;
        //Перевод инвалюты угла зацепления в радианы
        alfaTW = invToCorn(invAlfaTW);
        //Расчет делительного межосевого расстояния
        aDiv = ((z1 + z2) * (+module.value)) / (2 * Math.cos(beta));
        //Межосевое расстояние
        aW = (((z1 + z2) * (+module.value)) / (2 * Math.cos(beta))) * (Math.cos(alfaT) / (Math.cos(alfaTW)));
        //Расчет делительного диаметра(без угла наклона)
        dD = (z1 * (+module.value)) / (Math.cos(beta));
        //Расчет делительного радиуса
        rD = dD / 2;
        //Начальный диаметр и радиус
        dW = (2 * aW) / (gearRatio + 1);
        rW = dW / 2;
        //Расчет коэф. смещений
        y = (aW - aDiv) / 2;
        yDiff = xSumm - y;
    }

    //Расчет диаметра и радиуса основной окружности
    dB = (dD * Math.cos(alfaT));
    rB = dB / 2;

    //Определение диаметра и радиуса вершин
    dA = dD + 2 * (coefHeightHead + x1 + yDiff) * (+module.value);
    rA = dA / 2;

    //Определение диаметра и радиуса впадин
    if ((+module.value) <= 0.5) {
        dF = dD - 3 * (+module.value) + 2 * x1 * (+module.value);
    } else if (((+module.value) > 0.5) && ((+module.value) <= 1)) {
        dF = dD - 2.7 * (+module.value) + 2 * x1 * (+module.value);
    } else {
        dF = dD - 2.5 * (+module.value) + 2 * x1 * (+module.value);
    }
    rF = dF / 2;

    //Опpеделение толщины вершины зуба
    var sTA = thick(dD, dA, alfaT, alfa, z1, x1);

    //Толщина зуба
    var sP = (Math.PI / 2 + 2 * x1 * Math.tan(alfa)) * (+module.value);



    //Угол отклонения осей координат от точки начала
    if (x1 === 0) {
        betaXY = Math.PI / (2 * z1) + invAlfa;

    } else {
        betaXY = Math.PI / (2 * z1) + invAlfa + 2 * (Math.tan(alfa)) * x1 / z1;
    }

    //Поворот координат, чтобы зуб был по центру
    while ((betaXY - Math.PI) > 0) {
        betaXY = betaXY - Math.PI
    }

    //Определение начала системы координат
    var X0 = rB * Math.sin(betaXY);
    var Y0 = rD - rB * Math.cos(betaXY);

    //Переводим радианы расчитанного угла отклонения осей
    betaRas = betaXY * 180 / Math.PI;
    //Градусов в угле
    betaRasCorn = Math.floor(betaRas);
    //Минут в угле
    betaRasMin = Math.floor((betaRas - betaRasCorn) * 60);
    //Секунд в угле
    betaRasSec = Math.round((((betaRas - betaRasCorn) * 60) - betaRasMin) * 60)

    //Определение углового шага (в рад.)
    gam = 2 * Math.PI / z1;

    //Определение координат 2 зуба
    var X1 = rD * Math.sin(gam);

    var Y1 = rD * (1 - Math.cos(gam));

    //Переводим радианы расчитанного угла отклонения расположения 2го зуба
    gamXY = gam * 180 / Math.PI;
    //Градусов в угле
    gamCorn = Math.floor(gamXY);
    //Минут в угле
    gamMin = Math.floor((gamXY - gamCorn) * 60);
    //Секунд в угле
    gamSec = Math.round((((gamXY - gamCorn) * 60) - gamMin) * 60);

    //Определение радиуса закругления
    if ((+module.value) <= 0.5) {
        rZ = 0.33 * (+module.value);
    } else {
        rZ = 0.4 * (+module.value);
    }

    //Расчет размера по роликам (шарикам)   
    D = parseFloat(rollD.value);
    rollD.value = D;
    errorRollD.textContent = "Вы задали: " + D + ';  Рекомендуется: ' + (1.7 * (+module.value));

    //Расчитаем инвалюту угла в точке касания ролика
    var invAlfaD = D / (z1 * (+module.value) * Math.cos(alfa)) +
        invaluta(alfaT) - (((Math.PI / 2.0) - (2.0 * x1 * Math.tan(alfa))) / z1);
    //Вычисление угла в точке касания ролика
    var alfaD = invToCorn(invAlfaD);

    //Вычисление диаметра концентрической окружности,
    //проходящей через центр ролика
    var dRol = dD * (Math.cos(alfaT) / Math.cos(alfaD));

    /*
    Выбор формулы расчета размеров по роликам,
    в зависимости от числа зубьев колеса и угла их наклона  
    */
    if (((z1 % 2 === 0) && (beta !== 0)) || ((z1 % 2 === 0) && (beta === 0))) {
        var M = dRol + D;

    } else if (beta === 0 && z1 % 2 !== 0) {
        M = dRol * Math.cos((90.0 * Math.PI / 180.0) / z1) + D;

    } else {
        var betaD = Math.atan((Math.cos(alfaT) * Math.tan(beta)) / Math.cos(alfaD));

        var gamma;
        if (z1 % 2 === 0) {
            gamma = 0;
        } else {
            gamma = Math.PI / z1;
        }

        var lam = -0.0001;

        //Нахождение настоящего значения лямбды через цикл
        while (n !== 0) {

            lam = lam + 0.0001;
            var raschet = (Math.sin(gamma + lam) * Math.pow(Math.tan(betaD), 2) - lam) * 10000;
            var n = Math.round(raschet);
        }

        var M1 = (dRol / (2 * Math.tan(betaD)));
        var M2 = ((90 * Math.PI / 180.0) / z1) + (lam / 2);
        var M3 = 4 * Math.pow(Math.tan(betaD), 2) * Math.pow(Math.cos(M2), 2);
        M = M1 * Math.pow((Math.pow(lam, 2) + M3), (1 / 2)) + D;
    }

    //Вывод результатов расчета в таблицу
    feedbackStep.textContent = Math.round(step * 1000) / 1000;
    feedbackDepth.textContent = Math.round(hP * 1000) / 1000;
    feedbackDiamDiv.textContent = Math.round(dD * 1000) / 1000;
    feedbackRadDiv.textContent = Math.round(rD * 1000) / 1000;
    feedbackDiamBase.textContent = Math.round(dB * 1000) / 1000;
    feedbackRadBase.textContent = Math.round(rB * 1000) / 1000;
    feedbackDiamInitial.textContent = Math.round(dW * 1000) / 1000;
    feedbackRadInitial.textContent = Math.round(rW * 1000) / 1000;
    feedbackDiamTops.textContent = Math.round(dA * 1000) / 1000;
    feedbackRadTops.textContent = Math.round(rA * 1000) / 1000;
    feedbackDiamHol.textContent = Math.round(dF * 1000) / 1000;
    feedbackRadHol.textContent = Math.round(rF * 1000) / 1000
    feedbackThickAddendum.textContent = Math.round(sTA * 1000) / 1000;
    feedbackThickNormal.textContent = Math.round(sP * 1000) / 1000;
    feedbackX0.textContent = Math.round(X0 * 1000) / 1000;
    feedbackY0.textContent = Math.round(Y0 * 1000) / 1000;
    feedbackCorn.textContent = betaRasCorn + '° ' + betaRasMin + '\' ' + betaRasSec + '\"';
    feedbackX1.textContent = Math.round(X1 * 1000) / 1000;
    feedbackY1.textContent = Math.round(Y1 * 1000) / 1000;
    feedbackCorn2.textContent = gamCorn + '° ' + gamMin + '\' ' + gamSec + '\"';
    feedbackRadCurve.textContent = Math.round(rZ * 1000) / 1000;

    //Если значение размера по роликам все-таки кривое,
    //то не выводим совсем
    if (isNaN(M)) {
        feedbackRollD.textContent = 'Диаметр роликов  не корректен';
    } else {
        feedbackRollD.textContent = Math.round(M * 1000) / 1000;
    }
}