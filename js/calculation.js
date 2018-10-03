function calc() {

	
	

	

	//Если модуль и число зубьев в нужных пределах, то запуск программы
	if( parseFloat(module.value) >= 0.05 &&
		parseFloat(module.value) <=100   &&
		parseFloat(numberTeeths.value)>0 ){
		
		//Вывод градусов, минут и секунд угла альфа на экран
		checkCorn(alfaCorn, feedbackAlfaCorn, unit = '°');
		checkMS(alfaMin, feedbackAlfaMin, unit = '\'');
		checkMS(alfaSec, feedbackAlfaSec, unit = '\"'); 
		
		errorModule.style.color = 'black';		
		errorModule.textContent = module.value;		
		feedbackModule.textContent = module.value;
		
		feedbackNumberTeeths.textContent = numberTeeths.value;
		errorNumberTeeths.textContent = numberTeeths.value;	
		

		
			
		//Запуск расчета		
		calculation();
		
		//Показываем таблицу
		var postEntry = document.getElementById('right');
		postEntry.style.display = 'block';
		var xy = document.getElementById('buttonXY');
		xy.style.display = 'block';	
		
		
	}else if( ( parseFloat(module.value) < 0.05  &&
				parseFloat(module.value) > 100 ) || 
				parseFloat(numberTeeths.value) <= 0 ||
				!isInteger(numberTeeths.value) ){
	
		//Прячем таблицу и кнопку построения, если не правильные данные
		var postEntry = document.getElementById('right');
		postEntry.style.display = 'none';
		
		var buttonXY = document.getElementById('buttonXY');		
		buttonXY.style.display = 'none';
		
		errorModule.style.color = 'red';
		errorModule.textContent = 'Модуль задан не правильно';
		errorNumberTeeths.style.color = 'red';
		errorNumberTeeths.textContent = 'Число зубьев задано не правильно';
		
	}	
}
		//errorModule.textContent = 'Значение должно быть в пределах от 0.05 до 100' ;		
	
	//checkModule(module, feedbackModule, errorModule);
	//}
	//}
	//else{
	//	checkModule(module, feedbackModule, errorModule);
	//	errorModule.textContent = 'Значение должно быть в пределах от 0.05 до 100' ;
	//	}
	
   /* checkRoll(rollD, errorRollD);
    checkCorn(alfaCorn, feedbackAlfaCorn, unit = '°');
    checkMS(alfaMin, feedbackAlfaMin, unit = '\'');
    checkMS(alfaSec, feedbackAlfaSec, unit = '\"'); 
	checkCorn(betaCorn, feedbackBetaCorn, unit = '°');
    checkMS(betaMin, feedbackBetaMin, unit = '\'');
    checkMS(betaSec, feedbackBetaSec, unit = '\"');
    checkNumberTeeths(numberTeeths, feedbackNumberTeeths, errorNumberTeeths);
    checkNumberTeeths(numberTeeths2, feedbackNumberTeeths2, errorNumberTeeths2);
    checkShift(shift, feedbackShift);
    checkShift(shift2, feedbackShift2);

	*/
	
	

function calculation() {

    var aCorn = parseFloat(alfaCorn.value);       //Градусы угла "альфа"
    var aMin = parseFloat(alfaMin.value);         //Минуты угла "альфа"
    var aSec = parseFloat(alfaSec.value);			//Секунды угла "альфа"
    var bCorn = parseFloat(betaCorn.value);       //Градусы угла "бета"
    var bMin = parseFloat(betaMin.value);         //Минуты угла "бета"
    var bSec = parseFloat(betaSec.value);			//Секунды угла "бета"

    var m = parseFloat(module.value);				//Модуль
    var z1 = parseFloat(numberTeeths.value);		//Число зубьев шестерни 1
    var z2 = parseFloat(numberTeeths2.value);		//Число зубьев шестерни 2

    var x1 = parseFloat(shift.value);				//Смещение 1й шестерни
    var x2 = parseFloat(shift2.value);				//Смещение 2й шестерни
    var xSumm = x1 + x2;					//Суммарное смещение

    var alfa;							//Угол "альфа" в радианах
    var invAlfa;						//Инвалюта угла альфа
    var beta;							//Угол "бета" в радианах

    var alfaD;							//Угол проходящий на концентрической окружности проходящий через центр шарика
    var D;								//Диаметр ролика (шарика)

    var hP;								//Высота зуба
    var aDiv;							//Делительное межосевое расстояние
    var aW;								//Межосевое расстояние
    var alfaT;							//Угол профиля в радианах
    var invAlfaT;						//Инвалюта угла профиля
    var alfaTW;							//Угол зацепления
    var invAlfaTW;						//Инвалюта угола зацепления
    var y;								//Коэфф. воспринимат. смещения
    var yDiff;							//Коэфф. уравнит. смещения

    var dD;								//Делительный диаметp (d)
    var rD;								//Делительный радиус (r)
    var dB;								//Диаметр основной окружности (db)
    var rB;								//Радиус основной окружности (rb)
    var dA;								//Диаметр вершин зубьев (da)
    var rA;								//Радиус вершин зубьев (ra)
    var dW;								//Начальный диаметр (dw)
    var rW;								//Начальный радиус (rw)
    var dF;								//Диаметр впадин (df)
    var rF;								//Радиус впадин(rf)
    var rZ;								//Радиус закругления (pfp)
    var coefHeightHead = 1.0;			//Коэффициент высоты головки зуба(ha*)
    var c = 0.25;						//Коэффициент радиального зазора
    var u;								//Передаточное отношение
	
		
		
	//Перевод градусов угла "альфа" в радианы
	alfa = (aCorn + aMin / 60 + aSec / 3600) * (Math.PI / 180);
    //Перевод градусов угла "бета" в радианы
    beta = (bCorn + bMin / 60 + bSec / 3600) * (Math.PI / 180);

    //Шаг
    var p = Math.PI * m;

    //Расчет передаточного числа
    u = z2 / z1;

    //Расчет высоты зуба
    if (m <= 0.5) {
        hP = 2.5 * m;
    } else if ((m > 0.5) && (m <= 1)) {
        hP = 2.35 * m;
    } else {
        hP = 2.25 * m;
    }


    //Расчет  разных типах передач
    if ((beta === 0) && (xSumm === 0)) {
        //Угол профиля
        alfaT = alfa;
        //Угол зацепления
        alfaTW = alfaT;
        //Расчет делительного межосевого расстояния
        aDiv = 0.5 * (z1 + z2) * m;
        //Межосевое расстояние
        aW = aDiv;
        //Расчет делительного диаметpа
        dD = z1 * m;
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
        invAlfaT = Math.tan(alfaT) - alfaT;
        //Расчет инвалюты угла зацепления
        invAlfaTW = (2 * (x1 + x2) * Math.tan(alfa)) / (z1 + z2) + invAlfaT;
        //Перевод инвалюты угла зацепления в радианы
        alfaTW = invToCorn(invAlfaTW);
        //Расчет делительного межосевого расстояния
        aDiv = ((z1 + z2) * m) / (2 * Math.cos(beta));
        //Межосевое расстояние
        aW = (((z1 + z2) * m) / (2 * Math.cos(beta))) * (Math.cos(alfaT) / (Math.cos(alfaTW)));
        //Расчет делительного диаметра(без угла наклона)
        dD = (z1 * m) / (Math.cos(beta));
        //Расчет делительного радиуса
        rD = dD / 2;
        //Начальный диаметр и радиус
        dW = (2 * aW) / (u + 1);
        rW = dW / 2;
        //Расчет коэф. смещений
        y = (aW - aDiv) / 2;
        yDiff = xSumm - y;
    }

    //Расчет диаметра и радиуса основной окружности
    dB = (dD * Math.cos(alfaT));
    rB = dB / 2;

    //Определение диаметра и радиуса вершин
    dA = dD + 2 * (coefHeightHead + x1 + yDiff) * m;
    rA = dA / 2;

    //Определение диаметра и радиуса впадин
    if (m <= 0.5) {
        dF = dD - 3 * m + 2 * x1 * m;
    } else if ((m > 0.5) && (m <= 1)) {
        dF = dD - 2.7 * m + 2 * x1 * m;
    } else {
        dF = dD - 2.5 * m + 2 * x1 * m;
    }
    rF = dF / 2;

    //Опpеделение толщины вершины зуба
    var sTA = thick(dD, dA, alfaT, alfa, z1, x1);

    //Толщина зуба
    var sP = (Math.PI / 2 + 2 * x1 * Math.tan(alfa)) * m;



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

    //Определение начала системы координат
    x0 = rB * Math.sin(betaXY);
    y0 = rD - rB * Math.cos(betaXY);

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
    var x1x = rD * Math.sin(gam);

    var y1 = rD * (1 - Math.cos(gam));

    //Переводим радианы расчитанного угла отклонения расположения 2го зуба
    gamXY = gam * 180 / Math.PI;
    //Градусов в угле
    gamCorn = Math.floor(gamXY);
    //Минут в угле
    gamMin = Math.floor((gamXY - gamCorn) * 60);
    //Секунд в угле
    gamSec = Math.round((((gamXY - gamCorn) * 60) - gamMin) * 60);

    //Определение радиуса закругления
    if (m <= 0.5) {
        rZ = 0.33 * m;
    } else {
        rZ = 0.4 * m;
    }

    //Расчет размера по роликам (шарикам)
    D = parseFloat(rollD.value);
    if (D === 0) {
        D = 1.7 * m;
        rollD.value = D;
        errorRollD.textContent = D;
    }
	
	var number;

    var invAlfaD = D/(z1*m*Math.cos(alfa))+invaluta(alfaT)-(((Math.PI/2.0)-(2.0*x1*Math.tan(alfa)))/z1);
    var alfaD = invToCorn(invAlfaD);
    var dRol = dD*(Math.cos(alfaT)/Math.cos(alfaD));
    if (((z1%2===0)&&(beta!==0))||((z1%2===0)&&(beta===0))) {
        var M = dRol+D;
		number=1;
    }else if((beta===0)&&(z1%2!==0)){
        M = dRol*Math.cos((90.0*Math.PI/180.0)/z1)+D;
    }else{
        var betaD = Math.atan((Math.cos(alfaT)*Math.tan(beta))/Math.cos(alfaD));

        var gamma;
        if(z1%2===0){
            gamma = 0;
        }else{
            gamma = Math.PI/z1;
        }

        var lam = -0.0001;

        //Нахождение лямбды через цикл
        while(n!==0){

            lam = lam+0.0001;
            var raschet = (Math.sin(gamma+lam)*Math.pow(Math.tan(betaD),2)-lam)*10000;
            var n = Math.round(raschet);
        }

        var M1 = (dRol/(2*Math.tan(betaD)));
        var M2 = ((90*Math.PI/180.0)/z1)+(lam/2);
        var M3 = 4*Math.pow(Math.tan(betaD),2)*Math.pow(Math.cos(M2),2);
        M = M1*Math.pow((Math.pow(lam,2)+M3),(1/2))+D;
		number=3;
    }

	//Вывод результатов расчета в таблицу
	if(p===0){feedbackStep.textContent ='';}else{feedbackStep.textContent = p.toFixed(3);}
	if(hP===0){feedbackDepth.textContent ='';}else{feedbackDepth.textContent = hP.toFixed(3);}
	if(dD===0){feedbackDiamDiv.textContent ='';}else{feedbackDiamDiv.textContent = dD.toFixed(3);}
	if(rD===0){feedbackRadDiv.textContent ='';}else{feedbackRadDiv.textContent = rD.toFixed(3);}
	if(dB===0){feedbackDiamBase.textContent ='';}else{feedbackDiamBase.textContent = dB.toFixed(3);}
	if(rB===0){feedbackRadBase.textContent ='';}else{feedbackRadBase.textContent = rB.toFixed(3);}
	if(dW===0){feedbackDiamInitial.textContent ='';}else{feedbackDiamInitial.textContent = dW.toFixed(3);}
	if(rW===0){feedbackRadInitial.textContent ='';}else{feedbackRadInitial.textContent = rW.toFixed(3);}
	if(dA===0){feedbackDiamTops.textContent ='';}else{feedbackDiamTops.textContent = dA.toFixed(3);}
	if(rA===0){feedbackRadTops.textContent ='';}else{feedbackRadTops.textContent = rA.toFixed(3);}
	if(dF===0){feedbackDiamHol.textContent ='';}else{feedbackDiamHol.textContent = dF.toFixed(3);}
	if(rF===0){feedbackRadHol.textContent ='';}else{feedbackRadHol.textContent = rF.toFixed(3);}
	if(sTA===0){feedbackThickAddendum.textContent ='';}else{feedbackThickAddendum.textContent = sTA.toFixed(3);}
	if(sP===0){feedbackThickNormal.textContent ='';}else{feedbackThickNormal.textContent = sP.toFixed(3);}
	if(x0===0){feedbackX0.textContent ='';}else{feedbackX0.textContent = x0.toFixed(3);}
	if(y0===0){feedbackY0.textContent ='';}else{feedbackY0.textContent = y0.toFixed(3);}
	feedbackCorn.textContent = betaRasCorn+'° '+betaRasMin+'\' '+betaRasSec+'\"';
	if(x1x===0){feedbackX1.textContent ='';}else{feedbackX1.textContent = x1x.toFixed(3);}
	if(y1===0){feedbackY1.textContent ='';}else{feedbackY1.textContent = y1.toFixed(3);}
	feedbackCorn2.textContent = gamCorn+'° '+gamMin+'\' '+gamSec+'\"';
	if(rZ===0){feedbackRadCurve.textContent ='';}else{feedbackRadCurve.textContent = rZ.toFixed(3);}
    if(M===0){feedbackRollD.textContent='';}else{feedbackRollD.textContent = M.toFixed(3);}
}
