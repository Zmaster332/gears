//Расчет
function calculation() {

	//Перепроверка введенных данных
	checkCorn(alfaCorn,feedbackAlfaCorn,unit = '°');
	checkCorn(betaCorn,feedbackBetaCorn,unit = '°');
	checkMS(alfaMin,feedbackAlfaMin,unit = '\'');
	checkMS(alfaSec,feedbackAlfaSec,unit = '\'');
	checkMS(betaMin,feedbackBetaMin,unit = '\'');
	checkMS(betaSec,feedbackBetaSec,unit = '\'');
	
	checkModule(module,feedbackModule,errorModule);
	checkNumberTeeths(numberTeeths,feedbackNumberTeeths,errorNumberTeeths);
	checkNumberTeeths(numberTeeths2,feedbackNumberTeeths2,errorNumberTeeths2);
	checkShift(shift,feedbackShift);
	checkShift(shift2,feedbackShift2);
	
	var aCorn = alfaCorn.value/1;       //Градусы угла "альфа"
	var aMin = alfaMin.value/1;         //Минуты угла "альфа"
	var aSec = alfaSec.value/1;			//Секунды угла "альфа"
	var bCorn = betaCorn.value/1;       //Градусы угла "бета"
	var bMin = betaMin.value/1;         //Минуты угла "бета"
	var bSec = betaSec.value/1;			//Секунды угла "бета"
	
	var m = module.value/1;				//Модуль
	var z1 = numberTeeths.value/1;		//Число зубьев шестерни 1
	var z2 = numberTeeths2.value/1;		//Число зубьев шестерни 2
	
	var x1 = shift.value/1;				//Смещение 1й шестерни
	var x2 = shift2.value/1;				//Смещение 2й шестерни
	var xSumm = x1+x2;					//Суммарное смещение
	
	var alfa;							//Угол "альфа" в радианах
	var invAlfa;						//Инвалюта угла альфа
	var beta;							//Угол "бета" в радианах
	
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
	var coefHeightHead = 1.0;			//Коэффициент высоты головки зуба(ha*)
	var u;								//Передаточное отношение
	
	
	
	
	
	
	//Перевод градусов угла "альфа" в радианы
	alfa = (aCorn + aMin/60 + aSec/3600)*(Math.PI/180);
	
	//Перевод градусов угла "бета" в радианы
	beta = (bCorn + bMin/60 + bSec/3600)*(Math.PI/180);
	
	//Расчет передаточного числа
	u = z2/z1;
	
	//Расчет  разных типах передач
    if((beta==0)&&(xSumm==0)){
		//Угол профиля
		alfaT = alfa;
		//Угол зацепления
		alfaTW = alfaT;
		//Расчет делительного межосевого расстояния
		aDiv = 0.5*(z1+z2)*m;
		//Межосевое расстояние
		aW = aDiv;
		//Расчет делительного диаметpа
		dD = z1*m;
		//Расчет делительного радиуса
		rD = dD/2;		
		//Начальный диаметр и радиус
		dW = dD;
		rW = dW/2;
		//Расчет коэф. смещений
		y = 0;
		yDiff = 0;
		
	}else{
		alfaT = Math.atan(Math.tan(alfa)/Math.cos(beta));
		//Расчет инвалюты угла профиля
		invAlfaT = Math.tan(alfaT) - alfaT;
		//Расчет инвалюты угла зацепления
		invAlfaTW = (2*(x1+x2)*Math.tan(alfa))/(z1+z2) + invAlfaT;
		//Перевод инвалюты угла зацепления в радианы
		alfaTW = invaluta(invAlfaTW);
		//Расчет делительного межосевого расстояния
		aDiv = ((z1+z2)*m)/(2*Math.cos(beta));
		//Межосевое расстояние
		aW = (((z1+z2)*m)/(2*Math.cos(beta)))*(Math.cos(alfaT)/(Math.cos(alfaTW)));
		//Расчет делительного диаметра(без угла наклона)
		dD = (z1*m)/(Math.cos(beta));
		//Расчет делительного радиуса
		rD = dD/2;		
		//Начальный диаметр и радиус
		dW = (2*aW)/(u+1);
		rW = dW/2;
		//Расчет коэф. смещений
		y = (aW-aDiv)/2;
		yDiff = xSumm-y;
	}
	
	//Расчет диаметра и радиуса основной окружности
	dB = (dD*Math.cos(alfaT));
	rB = dB/2;
	
	//Определение диаметра и радиуса вершин
    dA = dD + 2*(coefHeightHead+x1+yDiff)*m;
    rA = dA/2;
	
	if (x1==0) {
		invAlfa = Math.tan(alfa) - alfa;
        betaRas = Math.PI/(2*z1) + invAlfa;
	} else {
		invAlfa = Math.tan(alfa) - alfa;
		betaRas = Math.PI/(2*z1) + invAlfa + 2*(Math.tan(alfa))*x1/z1;
	}
	
	//Опpеделение толщины вершины зуба 
	var cosa01 = (dD*Math.cos(alfa))/dA;
	var tana01 = (Math.sqrt(1-Math.pow(cosa01,2)))/cosa01;
	var alfa01 = Math.atan(tana01);
	var inva01 = tana01 - alfa01;
	var se1 = dA*(Math.PI/(2*z1)+2*x1*(Math.tan(alfa))/z1+invAlfa - inva01);

	
	
	
	
	

	//Вывод результатов расчета в таблицу
	feedbackAlfaRad.textContent = alfa.toFixed(5);
	feedbackBetaRad.textContent = beta.toFixed(5);
	
	if(dD==0){feedbackDiamDiv.textContent ='';}else{feedbackDiamDiv.textContent = dD.toFixed(3);}
	if(rD==0){feedbackRadDiv.textContent ='';}else{feedbackRadDiv.textContent = rD.toFixed(3);}
	if(dB==0){feedbackDiamBase.textContent ='';}else{feedbackDiamBase.textContent = dB.toFixed(3);}
	if(rB==0){feedbackRadBase.textContent ='';}else{feedbackRadBase.textContent = rB.toFixed(3);}
	if(dW==0){feedbackDiamInitial.textContent ='';}else{feedbackDiamInitial.textContent = dW.toFixed(3);}
	if(rW==0){feedbackRadInitial.textContent ='';}else{feedbackRadInitial.textContent = rW.toFixed(3);}
	if(dA==0){feedbackDiamTops.textContent ='';}else{feedbackDiamTops.textContent = dA.toFixed(3);}
	if(se1==0){feedbackThicknessAddendum.textContent ='';}else{feedbackThicknessAddendum.textContent = se1.toFixed(3);}
	
	
	check.textContent = se1;
	check2.textContent = x1.toFixed(5);




}

//Перевод инвалюты в число
function invaluta(inv){

	var e = 0.00001;
	var inv0 = Math.pow((3*inv),(1/3));
	
	do{	
		c0 = Math.tan(inv0)-inv0;
		alfaA1 = inv-c0;
		alfaA2 = alfaA1/Math.pow(inv0,2);
		alfaA2 = alfaA2*0.63;
		inv0 = inv0+alfaA2;	
	}
	while(Math.abs(alfaA2)>e);
	return inv0;

}








/*
function calculation() {	
	
	var alfaR;				//Угол профиля угла а(альфа) в радианах
	var beta;				//Угол наклона начала эвольвенты (наклона зуба b(бета))
	var alfaCorn;			//Градусов в угде a(альфа)
	var alfaMin;			//Минут в угле а(альфа)
	var alfaSec;			//Секунд в угле а(альфа)
	var inva;				//Инвалюта угла а(альфа)
	var divDiam;			//Делительный диаметp (d)
	var m;					//Модуль 
	var z;					//Число зубьев
	var radiusBase;			//Радиус основной
	var radiusDiv;			//Делительный радиус
	var x;					//Коэффициент смещения
	var da;					//Диаметр выступов
	var ra;					//Радиус выступов
	var df;					//Диаметр впадин
	var rf;					//Радиус впадин
	var hnom;				//Высота зуба заданная пользователем
	var h;					//Высота зуба
	var cosa01;				//Косинус угла профиля
	var tana01;				//Тангенс угла профиля
	var alfa01;				//Угол профиля
	var inva01;				//Инвалюта угла профиля
	var se1;				//Толщина зуба по окpужности выступов
	var sd1;				//Толщина зуба по делительной окpужности
	var x0;					//Начало СК по Х
	var y0;					//Начало СК по Y
	var gam;				//Угловой шаг
	var x1;					//Координата 2го зуба по Х
	var y1;					//Координата 2го зуба по Y
	var rz;					//Радиус зацепления
	var xmax;				//Действительные координаты
	var xmin;				//Действительные координаты
	var xtmax;				//Действительный интервал
	var xtmin;				//Действительный интервал

	
	//Расчет высоты зуба стандартного контура
	if (hnom<=0) {
		h = 2*m;
	} else{
		h = hnom;
	}
	
	
	//Градусы а(альфа) в радианы	
	alfaR = (alfaCorn + alfaMin/60 + alfaSec/3600)*(Math.PI/180);
	
	//Вычисление инвалюты угла а(альфа)
	
	inva = Math.sin(alfaR)/Math.cos(alfaR) - alfaR;
	
	//Опpеделение делительного диаметpа
	divDiam = m*z;
	
	//Определение радиусов окружности
	radiusBase = (divDiam*Math.cos(alfaR))/2;
	
	//Делительный радиус
	radiusDiv = divDiam/2;
	
	//Определение диаметра и радиуса выступов
	da = divDiam + 2*m;
	ra = da/2;
	
	//Определение угла наклона начала эвольвенты в зависимости от коэфф. смещения	
    if (x=0) {		
        df = da - 2*h;
		rf = df/2;
        beta = Math.PI/(2*z) + inva;
	} else {
		beta = Math.PI/(2*z) + inva + 2*(Math.sin(alfaR)/Math.cos(alfaR))*x/z;
	}
	
	//Опpеделение толщины зуба по окpужности выступов
	cosa01 = (divDiam*Math.cos(alfaR))/da;
	tana01 = (Math.sqrt(1-Math.sqr(cosa01)))/cosa01;
	alfa01 = Math.atan(tana01);
	inva01 = tana01 - alfa01;
	se1 = da*(Math.PI/(2*z) + 2*x*(Math.sin(alfaR)/Math.cos(alfaR))/z + inva - inva01);
	
	//Определение толщины зуба по хорде делительной окpужности
	sd1 = m*z*Math.sin(Math.PI/(2*z)+2*x*(Math.sin(alfaR)/Math.cos(alfaR))/z);
	while (beta - Math.PI>0){beta = beta - Math.PI;}
	
	//Определение начала системы координат
	x0 = radiusBase*Math.sin(beta);
	y0 = radiusDiv-radiusBase*Math.cos(beta);
	
	//Определение углового шага (в рад.)
	gam =2*Math.PI/z;
	
	//Определение координат 2го зуба
	x1 = radiusDiv*Math.sin(gam);
	y1 = radiusDiv*(1-Math.cos(gam));
	
	//Определение радиуса закругления
	if (m<=0.5) {rz = 0.33*m;}
	else {rz = 0.4*m;}
	
	//Определение действительных координат
	if (ra>rf) {
		xmax = ra - radiusBase;
		xmin = rf - radiusBase;
	} else {
		xmin = ra-radiusBase;
		xmax = rf-radiusBase;
	}
	//Определение интервала
	if (rf>radiusBase){
		xtmax = xmax/radiusBase;
		xtmin = xmin/radiusBase;
	} else if (z<=39) {
		xtmin = 0;
		}
	else {
		xtmin:=0.064-2.554/z;
		xtmax:=0.064+2.128/z;
	}

}

*/