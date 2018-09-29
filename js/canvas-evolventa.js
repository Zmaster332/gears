//Построение проекциона зубчатого колеса
function canvasEvolta() {

    //Параметры из старых расчетов
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
    var betaXY;											//Угол отклонения осей координат
    var invAlfa;										//Инвалюта угла альфа
    var alfaT;
    var rA = parseFloat(feedbackRadTops.textContent);	//Радиус вершин зубьев (ra)
    var rB = parseFloat(feedbackRadBase.textContent);	//Радиус основной окружности (rb)
    var rD = parseFloat(feedbackRadDiv.textContent);	//Делительный радиус (rd)


    /*Определяем положение новой системы координат*/
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
     invAlfa = Math.tan(alfa) - alfa;
     betaXY = Math.PI/(2*z1)+invAlfa+2*(Math.tan(alfa))*x1/z1;

    //Поворот координат, чтобы зуб был по центру
    while ((betaXY - Math.PI) > 0) {
        betaXY = betaXY - Math.PI
    }

    //Задаем масштаб изображения
    var scale = 50;

    var text;
    var xRaschet = [];
    var yRaschet = [];
    var number = document.getElementsByClassName('tdEvol');
	for (i=0; i<number.length;i=i+2) {
            xRaschet[i/2] = parseFloat(number[i].textContent);
	}

	for (i=1; i<number.length;i=i+2) {
            yRaschet[(i-1)/2] = parseFloat(number[i].textContent);
	}


/*

	for (i=0;i<=xRaschet.length;i++){
        console.log(xRaschet[i]+'  '+yRaschet[i]);
    }
*/

    //Обмасштабим все выходные данные
    rA = rA*scale;
    rB = rB*scale;
    rD = rD*scale;

    //Задаем координаты центра чтобы можно было по ним двигаться.
    var x0 = rA+scale;
    var y0 = rA+scale;

    //Определяем точку начала новой системы координат
    var xNew = x0+(Math.sin(betaXY)*rB);
    var yNew = y0-Math.cos(betaXY)*rB;




    //Создаем обертку для Canvas
    var projection = document.getElementById('projection');
    var canBorder = document.createElement('div');
    canBorder.id = 'can';
    projection.appendChild(canBorder);

    //Создаем эллемент Canvas с нужными параметрами
    var canvas = document.createElement("canvas");
    canvas.id = 'canvas';
    canvas.setAttribute('width',x0*2);
    canvas.setAttribute('height',y0*2);
    canBorder.appendChild(canvas);

    //Запуск прорисовки
    if (canvas.getContext) {

        //Указываем какой тип изображения
        var can = canvas.getContext('2d');
        //Проводим линию симметрии по Y
        can.beginPath();                //Запуск построения
        can.moveTo(x0, -y0);             //Начало отрисовки
        can.lineTo(x0, y0 + y0);            //Построить линию до укащанной точки
        can.lineWidth = 1;              //Толщина линии
        can.strokeStyle = 'orange';     //Цвет линии
        can.stroke();                   //Окончание отрисовки

        //Проводим линию симметрии по Х
        can.beginPath();                //Запуск построения
        can.moveTo(-x0,y0);             //Начало отрисовки
        can.lineTo(x0+x0,y0);            //Построить линию до укащанной точки
        can.lineWidth = 1;              //Толщина линии
        can.strokeStyle = 'orange';     //Цвет линии
        can.stroke();                   //Окончание отрисовки

        //Проводим окружность впадин
        can.beginPath();                //Запуск построения
        can.arc(x0,y0,rB,0,(2*Math.PI));
        can.lineWidth = 2;
        can.strokeStyle = 'blue';
        can.closePath();
        can.stroke();                  //Окончание отрисовки

        //Проводим окружность выступов
        can.beginPath();                //Запуск построения
        can.arc(x0,y0,rA,0,(2*Math.PI));
        can.lineWidth = 2;
        can.strokeStyle = 'blue';
        can.closePath();
        can.stroke();

        //Проводим делительную окружность
        can.beginPath();                //Запуск построения
        can.arc(x0,y0,rD,0,(2*Math.PI));
        can.lineWidth = 1;
        can.strokeStyle = 'orange';
        can.closePath();
        can.stroke();

        //Х у новой системы координат
        can.beginPath();                //Запуск построения
        can.moveTo(xNew,yNew);             //Начало отрисовки
        can.lineTo(xNew+(5*scale)*Math.tan(betaXY),yNew-5*scale);            //Построить линию до укащанной точки
        can.lineWidth = 1;              //Толщина линии
        can.strokeStyle = 'black';     //Цвет линии
        can.stroke();

        //Y у новой системы координат
        can.beginPath();                //Запуск построения
        can.moveTo(xNew,yNew);             //Начало отрисовки
        can.lineTo(xNew-(scale/2)/Math.tan(betaXY),yNew-scale/2);            //Построить линию до укащанной точки
        can.lineWidth = 1;              //Толщина линии
        can.strokeStyle = 'black';     //Цвет линии
        can.stroke();

        //Пишем название координат новых Y
        can.font = scale/2+'px Arial';
        can.fillText('Y',xNew+Math.sin(betaXY)*(rA+(scale/2)),y0-Math.cos(betaXY)*(rA+(scale/2)));
/*
        //Пишем название координат новых X
        can.font = scale/2+'px Arial';
        can.fillText('X',xNew-(rA*Math.cos((Math.PI/2)-betaXY)-scale),yNew-(rA*Math.sin(betaXY)-scale));*/






    }
    //Занесем табличные данные в расчет







}


