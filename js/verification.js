// Объявляем функцию проверки правильности введенных градусов угла
function checkCorn(corn, feedback, unit) {

	var c = corn.value;
	var f = feedback.textContent;

    if ((corn.value<=40)&&(corn.value>=0)) {
        feedback.textContent = corn.value + unit; 					//Указываем сообщение
    } else if (corn.value>40){
        feedback.textContent = 'Угол слишком большой' ;			//Если угол большой
		corn.value = 20;
    } else if (!isInteger(corn.value)) {
        feedback.textContent = 'Введено не целое число';			//Проверка на целостность
		corn.value = 20;
    } else {
        feedback.textContent = 'Угол сшишком мал'; 				//Если не целое число
		corn.value = 20;
    }
}

// Объявляем функцию проверки правильности введенных минут и секунд
function checkMS(mS,feedback,unit) {

    if ((mS.value<=60)&&(mS.value>=0)) {
        feedback.textContent = mS.value + unit; 					//Указываем сообщение
    } else if (!isInteger(mS.value)) {
        feedback.textContent = 'Введено не целое число';			//Проверка на целостность
		mS.value = 0;
		
    } else {
        feedback.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
		mS.value = 0 + unit;
    }
}

// Объявляем функцию проверки правильности введенного модуля и замены неправильного введенного значения
function checkModule(module,feedback,error) {
    var moduleMass = [], moduleEnd = '';
    for (i=0; i<=module.value.length; i++){
        moduleMass[i] = module.value.charAt(i);
        if (moduleMass[i]==',') {
            moduleMass[i]='.'
        }
        moduleEnd += moduleMass[i];
    }
    if (isNaN(moduleEnd/1)) {
        error.textContent = 'Введено не число';
		feedback.textContent = 'Не введено';
        module.value = 0;
    }else if (((moduleEnd/1)>=0.05)&&((moduleEnd/1)<=100)){
        module.value = moduleEnd/1;
        feedback.textContent = module.value;
        error.textContent = module.value;
    }else{
        error.textContent = 'Значение должно быть в пределах от 0.05 до 100' ;
		feedback.textContent = 'Не введено';
        module.value = 0;
    }
}

// Объявляем функцию проверки правильности введенных зубьев
function checkNumberTeeths(number,feedback,error) {
    if (number.value>0) {
        feedback.textContent = number.value; 					//Указываем сообщение
        error.textContent = number.value;
    } else if (number.value<=0){
        error.textContent = 'Введеное не целое положительное число' ;			//Если угол большой
		number.value = 0;
		feedback.textContent = 'Не введено';
    } else if (!isInteger(number.value)) {
        error.textContent = 'Введеное не целое положительное число';			//Проверка на целостность
		number.value = 0;
		feedback.textContent = 'Не введено';
    }
}

// Объявляем функцию проверки правильности введенного смещения и замены
function checkShift(shift,feedback) {
    var shiftMass = [], shiftEnd = '';
    for (i=0; i<=shift.value.length; i++){
        shiftMass[i] = shift.value.charAt(i);
        if (shiftMass[i]==',') {
            shiftMass[i]='.'
        }
        shiftEnd += shiftMass[i];
    }
    if (isNaN(shiftEnd/1)) {
        feedback.textContent = 'Введено не число';
        shift.value = 0;
    }else if (((shiftEnd/1)>=(-2.0))&&((shiftEnd/1)<=2.0)){
        shift.value = shiftEnd/1;
        feedback.textContent = shift.value;
    }else{
        feedback.textContent = 'Значение должно быть в пределах от -2.0 до 2.0' ;
        shift.value = 0;
    }
}

// Проверка числа на целостность
function isInteger(value){
    if ((undefined === value) || (null === value)) {
        return false;
    }
    return value % 1 == 0;
}