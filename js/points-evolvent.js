//Расчет точек для построения эвольвентного профиля
function buttonXY(){

	var pointsEvolvent = document.getElementById('pointsEvolvent');
    var projection = document.getElementById('projection');
	pointsEvolvent.style.display = 'block';
    projection.style.display = 'block';

    var aCorn = parseFloat(alfaCorn.value);				//Градусы угла "альфа"
    var aMin = parseFloat(alfaMin.value);				//Минуты угла "альфа"
    var aSec = parseFloat(alfaSec.value);				//Секунды угла "альфа"
    var bCorn = parseFloat(betaCorn.value);				//Градусы угла "бета"
    var bMin = parseFloat(betaMin.value);				//Минуты угла "бета"
    var bSec = parseFloat(betaSec.value);				//Секунды угла "бета"
    var z1 = parseFloat(numberTeeths.value);			//Число зубьев шестерни 1
    var x1 = parseFloat(shift.value);					//Смещение 1й шестерни
    var x2 = parseFloat(shift2.value);					//Смещение 2й шестерни
    var xSumm = x1 + x2;								//Суммарное смещение
    var alfa;											//Угол "альфа" в радианах
    var beta;											//Угол "бета" в радианах
	var xMin;											//Минимальное значение х
	var xMax;											//Максимальное значение х
    var rA = parseFloat(feedbackRadTops.textContent);	//Радиус вершин зубьев (ra)
    var rF = parseFloat(feedbackRadHol.textContent);	//Радиус впадин(rf)
    var rB = parseFloat(feedbackRadBase.textContent);	//Радиус основной окружности (rb)
    var dD = parseFloat(feedbackRadDiv.textContent);	//Делительный диаметр (dd)
	var xTMin,xTMax;
	var betaXY;											//Угол отклонения осей координат
	var invAlfa;										//Инвалюта угла альфа
	var alfaT;

    //Перевод градусов угла "альфа" в радианы
    alfa=(aCorn+aMin/60+aSec/3600)*(Math.PI/180);

    //Перевод градусов угла "бета" в радианы
    beta = (bCorn + bMin / 60 + bSec / 3600) * (Math.PI / 180);

    if ((beta === 0) && (xSumm === 0)) {
        //Угол профиля
        alfaT = alfa;
    }else {
        alfaT = Math.atan(Math.tan(alfa) / Math.cos(beta));
    }

    //Угол отклонения осей координат от точки начала
    if (x1 === 0) {
        invAlfa = Math.tan(alfa) - alfa;
        betaXY = Math.PI / (2 * z1) + invAlfa;
    } else {
        invAlfa = Math.tan(alfa) - alfa;
        betaXY = Math.PI / (2 * z1) + invAlfa + 2 * (Math.tan(alfa)) * x1 / z1;
    }
    //Поворот координат, чтобы зуб был по центру
    while ((betaXY - Math.PI) > 0) {
        betaXY = betaXY - Math.PI
    }

    //Определение действительных координат
    if (rA > rF) {
        xMax = rA - rB;
        xMin = rF - rB;
    } else {
        xMax = rF - rB;
        xMin = rA - rB;
    }

    //Определение интервала
    if (rF > rB) {
        xTMax = xMax / rB;
        xTMin = xMin / rB;
    } else if (z1 <= 39) {
        xTMin = 0;
    } else {
        xTMin = (1-Math.cos(alfa))/Math.cos(alfa) - 2.4/(z1*Math.cos(alfa));
        xTMax = (1-Math.cos(alfa))/Math.cos(alfa) + 2/(z1*Math.cos(alfa));
    }
	
	//Расчет крайних точек эвольвнты
    var rMin = rB+(xMin);

    var alfaPMin = Math.acos(rB/rMin);
    var yMin= Math.sin(invaluta(alfaPMin))*rMin;
    var xMin1 = (yMin/Math.tan(invaluta(alfaPMin)))-rB;

    var rMax = rB+(xMax);

    var alfaPMax = Math.acos(rB/rMax);
    var yMax= Math.sin(invaluta(alfaPMax))*rMax;
    var xMax1 = (yMax/Math.tan(invaluta(alfaPMax)))-rB;

	//Расчет точек эвольвенты х и у, не
    var alfaP;
    var xRasch = [];
    var yRasch = [];
    var rRasch = rF;
	var i;
	var x=0;
    var y=0;

    //Присваивание точек массивам
    for (i=0; rRasch<=rA; i++){
        alfaP = Math.acos(rB/rRasch);
        yRasch[i] = Math.sin(invaluta(alfaP))*rRasch;
       	y=yRasch[i];
        xRasch[i] = (y/Math.tan(invaluta(alfaP)))-rB;
        x=xRasch[i];
        rRasch = rRasch+0.05;
	}
	var j=0;
	//Выводим расчитанные точки на экран с построением ячеек таблицы
	for (j=0; j<i;j++){
		var newEl = document.createElement('tr');
		newEl.className='trEvol';
		newEl.id = 'tr'+j;
		var positions = document.getElementById('x1');
		positions.appendChild(newEl);

		for (k=0; k<2; k++){
			var newEl1 = document.createElement('td');
			newEl1.id = 'td'+(parseInt(k)+parseInt(j)*2);
			newEl1.className='tdEvol';

			//Поочередный вывод х и у в разных ячейках таблицы
			if (k%2===0){
				if (isNaN(xRasch[j])) {
					continue;
					}
				var newText1 = document.createTextNode(xRasch[j].toFixed(4));
			}
			else{
				if (isNaN(yRasch[j])) {
					continue;
					}
			var newText1 = document.createTextNode(yRasch[j].toFixed(4));}
			newEl1.appendChild(newText1);

			var positions1 = document.getElementById(newEl.id);
			positions1.appendChild(newEl1);
		}
	}
}

//Выход из функции расчета эвольвенты
function exitXY(){
	//Выбираем эллементы для удаления и удаляем
	number =[];
	var number = document.getElementsByClassName('trEvol');
	for (i=0; i<number.length;i=i/2) {
		var removeEl = number[i];
		var containerEl = document.getElementById('x1');
		containerEl.removeChild(removeEl);
	}

	//Удаляем узел с Canvas
    var canvas = document.getElementById('can');



    //Изменение значения видимости таблицы
	var pointsEvolvent = document.getElementById('pointsEvolvent');
	pointsEvolvent.style.display = 'none';
    var projection = document.getElementById('projection');
    projection.removeChild(can);
    projection.style.display = 'none';

}


