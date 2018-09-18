var alfaCorn = document.getElementById('alfaCorn');
var alfaMin = document.getElementById('alfaMin');
var alfaSec = document.getElementById('alfaSec');
var betaCorn = document.getElementById('betaCorn');
var betaMin = document.getElementById('betaMin');
var betaSec = document.getElementById('betaSec');
var module = document.getElementById('module');
var numberTeeths = document.getElementById('numberTeeths');
var shift = document.getElementById('shift');
var numberTeeths2 = document.getElementById('numberTeeths2');
var shift2 = document.getElementById('shift2');


/*var feedbackAlfaRad = document.getElementById('feedbackAlfaRad');
//var feedbackAlfaCorn = document.getElementById('feedbackAlfaCorn');	//Получаем элемент обратной связи
//var feedbackAlfaMin = document.getElementById('feedbackAlfaMin');		//Получаем элемент обратной связи
//var feedbackAlfaSec = document.getElementById('feedbackAlfaSec');	//Получаем элемент обратной связи
//var feedbackModule = document.getElementById('feedbackModule');	//Получаем элемент обратной связи
//var feedbackNumberTeeths = document.getElementById('feedbackNumberTeeths');	//Получаем элемент обратной связи
//var buttonCalc = document.getElementById('buttonCalc');*/

//Задаем слушатели
alfaCorn.addEventListener('blur', checkAlfaCorn, false);
alfaMin.addEventListener('blur', checkAlfaMin, false);
alfaSec.addEventListener('blur', checkAlfaSec, false);
betaCorn.addEventListener('blur', checkBetaCorn, false);
betaMin.addEventListener('blur', checkBetaMin, false);
betaSec.addEventListener('blur', checkBetaSec, false);

module.addEventListener('blur', checkModule, false);
numberTeeths.addEventListener('blur', checkNumberTeeths, false);
shift.addEventListener('blur', checkShift, false);
numberTeeths2.addEventListener('blur', checkNumberTeeths2, false);
shift2.addEventListener('blur', checkShift2, false);

//Запуск рассчета
buttonCalc.addEventListener('click',function() {
	calculation(alfaCorn,alfaMin,alfaSec,betaCorn,betaMin,betaSec,module,numberTeeths);
	}, false);



// Объявляем функцию проверки правильности введенных градусов угла
function checkAlfaCorn() {                             
  
  if ((alfaCorn.value<=35)&&(alfaCorn.value>=15)) {						
		feedbackAlfaCorn.textContent = alfaCorn.value + '°'; 					//Указываем сообщение
  } else if (alfaCorn.value>35){
		feedbackAlfaCorn.textContent = 'Угол слишком большой' ;			//Если угол большой
  } else if (!isInteger(alfaCorn.value)) {
      feedbackAlfaCorn.textContent = 'Введено не целое число';			//Проверка на целостность
  } else {
      feedbackAlfaCorn.textContent = 'Угол сшишком мал'; 				//Если не целое число
  }
}
// Объявляем функцию проверки правильности введенных минут угла
function checkAlfaMin() {
 
  if ((alfaMin.value<=60)&&(alfaMin.value>=0)) {						
		feedbackAlfaMin.textContent = alfaMin.value + '\''; 					//Указываем сообщение
	} else if (!isInteger(alfaMin.value)) {
      feedbackAlfaMin.textContent = 'Введено не целое число';			//Проверка на целостность
  	} else {
		feedbackAlfaMin.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
	}
}
// Объявляем функцию проверки правильности введенных секунд угла
function checkAlfaSec() {
    
    if ((alfaSec.value<=60)&&(alfaSec.value>=0)) {						
        feedbackAlfaSec.textContent = alfaSec.value + '"'; 					//Указываем сообщение
	} else if (!isInteger(alfaSec.value)) {
		feedbackAlfaSec.textContent = 'Введено не целое число';			//Проверка на целостность
    } else {
        feedbackAlfaSec.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
    }
}
// Объявляем функцию проверки правильности введенных градусов угла
function checkBetaCorn() {                             
  
  if ((betaCorn.value<=40)&&(betaCorn.value>=0)) {						
		feedbackBetaCorn.textContent = betaCorn.value + '°'; 					//Указываем сообщение
  } else if (betaCorn.value>25){
		feedbackBetaCorn.textContent = 'Угол слишком большой' ;			//Если угол большой
  } else if (!isInteger(betaCorn.value)) {
      feedbackBetaCorn.textContent = 'Введено не целое число';			//Проверка на целостность
  } else {
      feedbackBetaCorn.textContent = 'Угол сшишком мал'; 				//Если не целое число
  }
}
// Объявляем функцию проверки правильности введенных минут угла
function checkBetaMin() {
 
  if ((betaMin.value<=60)&&(betaMin.value>=0)) {						
		feedbackBetaMin.textContent = betaMin.value + '\''; 					//Указываем сообщение
	} else if (!isInteger(betaMin.value)) {
      feedbackBetaMin.textContent = 'Введено не целое число';			//Проверка на целостность
  	} else {
		feedbackBetaMin.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
	}
}
// Объявляем функцию проверки правильности введенных секунд угла
function checkBetaSec() {
    
    if ((betaSec.value<=60)&&(betaSec.value>=0)) {						
        feedbackBetaSec.textContent = betaSec.value + '"'; 					//Указываем сообщение
	} else if (!isInteger(betaSec.value)) {
		feedbackBetaSec.textContent = 'Введено не целое число';			//Проверка на целостность
    } else {
        feedbackBetaSec.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
    }
}

// Объявляем функцию проверки правильности введенного модуля и замены
function checkModule() {	
	var moduleMass = [], moduleEnd = '';
	for (i=0; i<=module.value.length; i++){
		moduleMass[i] = module.value.charAt(i);
		if (moduleMass[i]==',') {
			moduleMass[i]='.'		
		}
		moduleEnd += moduleMass[i];
	}	
	if (isNaN(moduleEnd/1)) { 
		errorModule.textContent = 'Введено не число';
		module.value = 0;		
	}else if (((moduleEnd/1)>=0.05)&&((moduleEnd/1)<=100)){
		module.value = moduleEnd/1;
		feedbackModule.textContent = module.value;
		errorModule.textContent = '';
	}else{
		errorModule.textContent = 'Значение должно быть в пределах от 0.05 до 100' ;
		module.value = 0;	
	}
}
// Объявляем функцию проверки правильности введенных зубьев
function checkNumberTeeths() {                             
  
  if (numberTeeths.value>0) {						
		feedbackNumberTeeths.textContent = numberTeeths.value; 					//Указываем сообщение
		errorNumberTeeths.textContent = '';
  } else if (numberTeeths.value<=0){
		errorNumberTeeths.textContent = 'Введеное не целое положительное число' ;			//Если угол большой
  } else if (!isInteger(numberTeeths.value)) {
      errorNumberTeeths.textContent = 'Введеное не целое положительное число';			//Проверка на целостность
  } 
}
// Объявляем функцию проверки правильности введенного смещения и замены
function checkShift() {	
	var shiftMass = [], shiftEnd = '';
	for (i=0; i<=shift.value.length; i++){
		shiftMass[i] = shift.value.charAt(i);
		if (shiftMass[i]==',') {
			shiftMass[i]='.'		
		}
		shiftEnd += shiftMass[i];
	}	
	if (isNaN(shiftEnd/1)) { 
		feedbackShift.textContent = 'Введено не число';
		shift.value = 0;		
	}else if (((shiftEnd/1)>=(-2.0))&&((shiftEnd/1)<=2.0)){
		shift.value = shiftEnd/1;
		feedbackShift.textContent = shift.value;
	}else{
		feedbackShift.textContent = 'Значение должно быть в пределах от -2.0 до 2.0' ;
		shift.value = 0;	
	}
}
// Объявляем функцию проверки правильности введенных зубьев2
function checkNumberTeeths2() {                            
    if (numberTeeths2.value>=0) {	
		feedbackNumberTeeths2.textContent = numberTeeths2.value;
	} else if (!isInteger(numberTeeths2.value)) {
		feedbackNumberTeeths2.textContent = 'Введеное не целое положительное число';			//Проверка на целостность
		numberTeeths2.value = 0;		
	} else{
		feedbackNumberTeeths2.textContent = 'Введеное не целое положительное число' ;			//Если угол большой
		numberTeeths2.value = 0;
  } 
}
// Объявляем функцию проверки правильности введенного смещения2 и замены
function checkShift2() {	
	var shiftMass = [], shiftEnd = '';
	for (i=0; i<=shift2.value.length; i++){
		shiftMass[i] = shift2.value.charAt(i);
		if (shiftMass[i]==',') {
			shiftMass[i]='.'		
		}
		shiftEnd += shiftMass[i];
	}	
	if (isNaN(shiftEnd/1)) { 
		feedbackShift2.textContent = 'Введено не число';
		shift2.value = 0;		
	}else if (((shiftEnd/1)>=(-2.0))&&((shiftEnd/1)<=2.0)){
		shift2.value = shiftEnd/1;
		feedbackShift2.textContent = shift2.value;
	}else{
		feedbackShift2.textContent = 'Значение должно быть в пределах от -2.0 до 2.0' ;
		shift2.value = 0;	
	}
}

//Перевод значения угла a(альфа) в радианы
function calculation(alfaCorn,alfaMin,alfaSec,betaCorn,betaMin,betaSec,module,z) {

	var x1 = shift.value;			//Смещение 1й шестерни
	var x2 = shift2.value;			//Смещение 2й шестерни
	var aDiv;						//Делительное межосевое расстояние
	var aW;							//Межосевое расстояние
	var u;							//Передаточное отношение
	var alfaT;						//Угол профиля в радианах
	var diamDiv;					//Делительный диаметp (d)
	var radDiv;						//Делительный радиус (r)
	var diamBase;					//Диаметр основной окружности (db)
	var radBase;					//Радиус основной окружности (rb)
	var diamW;						//Начальный диаметр
	var coefHeightHead = 1;			//Коэффициент высоты головки зуба(ha*)
	var z1 = z.value/1;				//Число зубьев шестерни 1
	var z2 = numberTeeths2.value/1;	//Число зубьев шестерни 2
	var m = module.value;			//Модуль
		
	//Перепроверка введенных данных
	checkAlfaCorn();
	checkAlfaMin();
	checkAlfaSec();
	checkBetaCorn();
	checkBetaMin();
	checkBetaSec();
	checkModule();
	checkNumberTeeths();
	checkShift();
	checkNumberTeeths2();
	checkShift2();
	
	//Перевод градусов угла "альфа" в радианы
	var alfa = (alfaCorn.value/1 + alfaMin.value/60 + alfaSec.value/3600)*(Math.PI/180);
	//Перевод градусов угла "бета" в радианы
	var beta = (betaCorn.value/1 + betaMin.value/60 + betaSec.value/3600)*(Math.PI/180);
	
	//Расчет делительного межосевого расстояния
	var aDiv = ((z1+z2)*m)/(2*Math.cos(beta));
	
	//Расчет угла профиля
	var alfaT = Math.atan(Math.tan(alfa)/Math.cos(beta));
	
	//Расчет инвалюты угла профиля
	var invAlfaT = Math.tan(alfaT) - alfaT;
	
	//Расчет инвалюты межосевого расстояния
	var invAlfaTW = (2*(x1+x2)*Math.tan(alfa))/(z1+z2) + invAlfaT;
	
	/*
	//Расчет инвалюты межосевого расстояния
	var invAW = ((z1/1+z2/1)/(2*Math.cos(beta)))*(Math.cos(alfaT)/Math.cos(alfaTW));	
	*/
	
	//Расчет делительного диаметра(без угла наклона)
	diamDiv = (z1*m)/(Math.cos(beta));
	//Расчет делительного радиуса
	radDiv = diamDiv/2;
	
	//Расчет диаметра основной окружности
	diamBase = (diamDiv*Math.cos(alfaT));
	
	//Расчет радиуса основной окружности
	radBase = diamBase/2;
	
	/*
	//Расчет передаточного отношения
	//u = z2/z;
	
	//
		
	//Определение диаметра и радиуса выступов
	da = divDiam + 2*m;
	ra = da/2;
	
	//Определение угла наклона начала эвольвенты в зависимости от коэфф. смещения	
    if (x==0) {		
        df = da - 2*h;
		rf = df/2;
        beta = Math.PI/(2*z) + inva;
	} else {
		beta = Math.PI/(2*z) + inva + 2*(Math.sin(alfaR)/Math.cos(alfaR))*x/z;
	}
	*/
	
	
	
	
	
	
	//Вывод результатов расчета в таблицу
	
	feedbackAlfaRad.textContent = alfa.toFixed(5);
	feedbackBetaRad.textContent = beta.toFixed(5);
	feedbackRadBase.textContent = aDiv;
	if(diamDiv==0){feedbackDiamDiv.textContent ='';}else{feedbackDiamDiv.textContent = diamDiv.toFixed(3);}
	if(radDiv==0){feedbackRadDiv.textContent ='';}else{feedbackRadDiv.textContent = radDiv.toFixed(3);}
	if(diamBase==0){feedbackDiamBase.textContent ='';}else{feedbackDiamBase.textContent = diamBase.toFixed(3);}
	//if(radBase==0){feedbackRadBase.textContent ='';}else{feedbackRadBase.textContent = radBase.toFixed(3);}
	
	
	
	
	
}




/*


function alfaRad() {
	var alfaR = new DegToRad(alfaCorn.value,alfaMin.value,alfaSec.value);
	var feedbackAlfaR = doctype.getElementById('feedbackAlfaR');
	feedbackAlfaR.textContent = alfaR;
	

}

function DegToRad(corn, min, sec){

	this.corn = corn;
	this.min = min;
	this.sec = sec;
	this.radian = function() {
	
		this.rad = (corn + min/60 + sec/3600)*(Math.PI/180);
		return this.rad;
	
	}


}





/*

var alfaR = new CornerToRad(alfaCorn.value, alfaMin.value, alfaSec.value);
var feedbackAlfaR = doctype.getElementById('feedbackAlfaR');
feedbackAlfaR.textContent = alfaR;*/



// Объявляем функцию проверки правильности введенных градусов угла





//Проверка числа на целостность
function isInteger(value){
	if ((undefined === value) || (null === value)) {
		return false;
	}
	return value % 1 == 0;
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