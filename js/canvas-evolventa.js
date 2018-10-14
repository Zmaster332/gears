//Построение проекциона зубчатого колеса
function canvasEvolta() {

	//Первоначальные настройки
	var points = document.getElementById("points");
	points.style.width = "630px";
		
	var scale = document.getElementById("scale");
	scale.style.width = "630px";
	
	var buttonExit = document.getElementById("buttonExit");
	buttonExit.style.left = "0px";
		
	var buttonBuild = document.getElementById("buttonBuild");
	buttonBuild.style.left = "0px";	

	var projection = document.getElementById('projection');	
	projection.style.display = "block";
	
	//Заменяем старый холст на на новый
	
	
	//Проверка существования Canvas
	if(document.getElementById("canvas")){	
	
		//Удаляем старый Canvas	
		var can = document.getElementById('can');		
		var canvas = document.getElementById('canvas');			
		can.removeChild(canvas);		
		
		//Создаем новый холст
		var canvas = document.createElement("canvas");
		canvas.id = 'canvas';
		can.appendChild(canvas);			
		console.log("есть");	
	}
	else{		
		
		//Создаем обертку для Canvas	
		projection.style.display = "block";	
		var can = document.createElement('div');		
		can.id = 'can';
		projection.appendChild(can);	
		
		//Создаем новый холст
		var canvas = document.createElement("canvas");
		canvas.id = 'canvas';
		can.appendChild(canvas);			
		console.log("нет");	
	}		
	
    //Параметры из старых расчетов
    var aCorn = parseFloat(alfaCorn.value); //Градусы угла "альфа"
    var aMin = parseFloat(alfaMin.value); //Минуты угла "альфа"
    var aSec = parseFloat(alfaSec.value); //Секунды угла "альфа"
    var bCorn = parseFloat(betaCorn.value); //Градусы угла "бета"
    var bMin = parseFloat(betaMin.value); //Минуты угла "бета"
    var bSec = parseFloat(betaSec.value); //Секунды угла "бета"
    var z1 = parseFloat(numberTeeths1.value); //Число зубьев шестерни 1
    var x1 = parseFloat(shift1.value); //Смещение 1й шестерни
    var x2 = parseFloat(shift2.value); //Смещение 2й шестерни
    var xSumm = x1 + x2; //Суммарное смещение
    var alfa; //Угол "альфа" в радианах
    var beta; //Угол "бета" в радианах
    var betaXY; //Угол отклонения осей координат
    var invAlfa; //Инвалюта угла альфа
    var alfaT;
    var rA = parseFloat(feedbackRadTops.textContent); //Радиус вершин зубьев (ra)
    var rB = parseFloat(feedbackRadBase.textContent); //Радиус основной окружности (rb)
    var rD = parseFloat(feedbackRadDiv.textContent); //Делительный радиус (rd)
    var rF = parseFloat(feedbackRadHol.textContent); //Радиус впадин(rf)
    var sTA = parseFloat(feedbackThickAddendum.textContent); //Толщина вершины зуба(sta)

    /*Определяем положение новой системы координат*/
    //Перевод градусов угла "альфа" в радианы

    alfa = (aCorn + aMin / 60 + aSec / 3600) * (Math.PI / 180);

    //Перевод градусов угла "бета" в радианы
    beta = (bCorn + bMin / 60 + bSec / 3600) * (Math.PI / 180);

    if ((beta === 0) && (xSumm === 0)) {
        //Угол профиля
        alfaT = alfa;
    } else {
        alfaT = Math.atan(Math.tan(alfa) / Math.cos(beta));
    }

    //Угол отклонения осей координат от точки начала
    invAlfa = Math.tan(alfa) - alfa;
    betaXY = Math.PI / (2 * z1) + invAlfa + 2 * (Math.tan(alfa)) * x1 / z1;

    //Поворот координат, чтобы зуб был по центру
    while ((betaXY - Math.PI) > 0) {
        betaXY = betaXY - Math.PI
    }

    //Задаем масштаб изображения
    var scaleX = document.getElementById('scaleX');
    var scaleY = document.getElementById('scaleY');

    var scale = (+scaleX.value) / (+scaleY.value);
    

    var text;
    var xRaschet = [];
    var yRaschet = [];
    var number = document.getElementsByClassName('tdEvol');
    for (i = 0; i < number.length; i = i + 2) {
        xRaschet[i / 2] = parseFloat(number[i].textContent);
    }

    for (i = 1; i < number.length; i = i + 2) {
        yRaschet[(i - 1) / 2] = parseFloat(number[i].textContent);
    }

    //Обмасштабим все выходные данные
    rA = rA * scale;
    rB = rB * scale;
    rD = rD * scale;
    rF = rF * scale;
    sTA = sTA * scale;

    //Задаем координаты центра чтобы можно было по ним двигаться.
    var x0 = rA + scale;
    var y0 = rA + scale;

    //Расчитаем отклонение второго зуба
    //Определение углового шага (в рад.)
    var gam = 2 * Math.PI / z1;

    

    //Расчет базовых точек
    var xB = rA * Math.cos((Math.PI * 90 / 180) - 2 * gam);
    //var xB = x0;
    x0 = xB;
    //var yB = yNew/2+scale;
    var yB = y0;
    //y0=yB;

    //Определяем точку начала новой системы координат
    var xNew = x0 + (Math.sin(betaXY) * rB);
    var yNew = y0 - Math.cos(betaXY) * rB;	
	
    //Создаем эллемент Canvas с нужными параметрами
	
    canvas.setAttribute('width', xB * 2);
    canvas.setAttribute('height', yNew + 2 * scale);
    //canvas.setAttribute('width',x0*2);
    //canvas.setAttribute('height',y0*2);

    //Запуск прорисовки

    if (canvas.getContext) {

        //Указываем какой тип изображения
        var can = canvas.getContext('2d');

        //Проводим линию симметрии по Y
        can.beginPath(); //Запуск построения
        can.moveTo(x0, -y0); //Начало отрисовки
        can.lineTo(x0, y0 + y0); //Построить линию до укащанной точки
        can.lineWidth = 1; //Толщина линии
        can.strokeStyle = 'orange'; //Цвет линии
        can.stroke(); //Окончание отрисовки

        //Проводим линию симметрии по Х
        can.beginPath(); //Запуск построения
        can.moveTo(-x0, y0); //Начало отрисовки
        can.lineTo(x0 + x0, y0); //Построить линию до укащанной точки
        can.lineWidth = 1; //Толщина линии
        can.strokeStyle = 'orange'; //Цвет линии
        can.stroke(); //Окончание отрисовки

        //Проводим основную окружность
        can.beginPath(); //Запуск построения
        can.arc(x0, y0, rB, 0, (2 * Math.PI));
        can.lineWidth = 1;
        can.strokeStyle = 'orange';
        can.closePath();
        can.stroke(); //Окончание отрисовки

        //Проводим окружность выступов
        can.beginPath(); //Запуск построения
        can.arc(x0, y0, rA, 0, (2 * Math.PI));
        can.lineWidth = 1;
        can.strokeStyle = 'black';
        can.closePath();
        can.stroke();

        //Проводим окружность впадин
        can.beginPath(); //Запуск построения
        can.arc(x0, y0, rF, 0, (2 * Math.PI));
        can.lineWidth = 1;
        can.strokeStyle = 'black';
        can.closePath();
        can.stroke(); //Окончание отрисовки

        //Проводим делительную окружность
        can.beginPath(); //Запуск построения
        can.arc(x0, y0, rD, 0, (2 * Math.PI));
        can.lineWidth = 1;
        can.strokeStyle = 'orange';
        can.closePath();
        can.stroke();

        //Х у новой системы координат
        can.beginPath(); //Запуск построения
        can.moveTo(x0, y0); //Начало отрисовки
        can.lineTo(y0 / (Math.tan((90 * Math.PI / 180) - betaXY)) + x0, 0); //Построить линию до укащанной точки
        can.lineWidth = 1; //Толщина линии
        can.strokeStyle = 'black'; //Цвет линии
        can.stroke();


        //Y у новой системы координат
        can.beginPath(); //Запуск построения
        can.moveTo(xNew, yNew); //Начало отрисовки
        can.lineTo(0, yNew - xNew * Math.tan(betaXY)); //Построить линию до укащанной точки
        can.lineWidth = 1; //Толщина линии
        can.strokeStyle = 'black'; //Цвет линии
        can.stroke();

        //Пишем название координат новых Y
        can.font = scale / 2 + 'px Arial';
        can.fillText('Y', xNew + Math.sin(betaXY) * (rA + (scale / 2)), y0 - Math.cos(betaXY) * (rA + (scale / 2)));

        var x, y, betaXY1, betaXY2, betaXY3, betaXY4, xxx, yyy, rR, xx = [],
            yy = [];
        //Построим точки эвольвенты правой половины первого зуба
        for (j = 0; j < z1; j++) {
            for (i = 0; i <= xRaschet.length; i++) {
                x = xRaschet[i] * scale;
                y = yRaschet[i] * scale;
                betaXY1 = Math.atan(y / (rB + x));
                rR = (y / Math.sin(betaXY1));
                betaXY2 = betaXY - betaXY1;
                xx[i] = Math.sin(betaXY2 + gam * j) * rR;
                yy[i] = Math.cos(betaXY2 + gam * j) * rR;

                if (isNaN(xx[i])) {
                    xx[i] = rA * Math.cos(Math.PI / 2 - gam * j - Math.asin((sTA / 2) / rA));
                    yy[i] = rA * Math.sin(Math.PI / 2 - gam * j - Math.asin((sTA / 2) / rA));

                }

                //Строим эвольвенту
                can.beginPath(); //Запуск построения
                can.arc(x0 + xx[i], y0 - yy[i], 0.5, 0, (2 * Math.PI));
                can.lineWidth = 2;
                can.strokeStyle = 'black';
                can.closePath();
                can.stroke();

                //соединение точек эвольвенты           
                can.beginPath(); //Запуск построения
                can.moveTo(x0 + xx[i - 1], y0 - yy[i - 1]); //Начало отрисовки
                can.lineTo(x0 + xx[i], y0 - yy[i]); //Построить линию до укащанной точки
                can.lineWidth = 1; //Толщина линии
                can.strokeStyle = 'blue'; //Цвет линии
                can.stroke();


            }

        }
        //Построим точки эвольвенты левой половины первого зуба
        for (j = 0; j < z1; j++) {
            for (i = 0; i <= xRaschet.length; i++) {
                x = xRaschet[i] * scale;
                y = yRaschet[i] * scale;
                betaXY1 = Math.atan(y / (rB + x));
                rR = (y / Math.sin(betaXY1));
                betaXY2 = betaXY - betaXY1;
                xx[i] = Math.sin(betaXY2 + gam * j) * rR;
                yy[i] = Math.cos(betaXY2 + gam * j) * rR;



                if (isNaN(xx[i])) {
                    xx[i] = rA * Math.cos(Math.PI / 2 - gam * j - Math.asin((sTA / 2) / rA));
                    yy[i] = rA * Math.sin(Math.PI / 2 - gam * j - Math.asin((sTA / 2) / rA));


                }

                //Строим эвольвенту
                can.beginPath(); //Запуск построения
                can.arc(x0 - xx[i], y0 - yy[i], 0.5, 0, (2 * Math.PI));
                can.lineWidth = 2;
                can.strokeStyle = 'black';
                can.closePath();
                can.stroke();

                //соединение точек эвольвенты           
                can.beginPath(); //Запуск построения
                can.moveTo(x0 - xx[i - 1], y0 - yy[i - 1]); //Начало отрисовки
                can.lineTo(x0 - xx[i], y0 - yy[i]); //Построить линию до укащанной точки
                can.lineWidth = 1; //Толщина линии
                can.strokeStyle = 'blue'; //Цвет линии
                can.stroke();

            }
        }
        //Оси зубьев        
        for (i = 1; i < z1; i++) {
            //Линия расположения 1го зуба
            can.beginPath(); //Запуск построения
            can.moveTo(x0, y0); //Начало отрисовки
            can.lineTo(x0 + Math.sin(gam * i) * rA, y0 - Math.cos(gam * i) * rA); //Построить линию до укащанной точки
            can.lineWidth = 1; //Толщина линии
            can.strokeStyle = 'orange'; //Цвет линии
            can.stroke(); //Окончание отрисовки     
        }

        //Построим вершину зуба через толщину
        for (i = 0; i < z1; i++) {
            //Линия расположения 1го зуба
            can.beginPath(); //Запуск построения
            can.moveTo(x0 + rA * Math.cos(Math.PI - gam * i - Math.acos((sTA / 2) / rA)), y0 - rA * Math.sin(Math.PI - gam * i - Math.acos((sTA / 2) / rA))); //Начало отрисовки
            can.lineTo(x0 + rA * Math.cos(Math.PI / 2 - gam * i - Math.asin((sTA / 2) / rA)), y0 - rA * Math.sin(Math.PI / 2 - gam * i - Math.asin((sTA / 2) / rA))); //Построить линию до укащанной точки
            can.lineWidth = 2; //Толщина линии
            can.strokeStyle = 'blue'; //Цвет линии
            can.stroke(); //Окончание отрисовки     

        }
    }
}