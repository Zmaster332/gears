
//Функция получает на вход число, место возврата и едицицу измеренияпроверяет
//проверяет нахождение числа в пределах от 0 до 40
//и возвращает результат проверки в нужное место
function checkCorn(number, feedback, unit) {

	var number = number.value;
    feedback.textContent;

    if (  number <= 40 && number >= 0 ) {
		feedback.style.color = 'black' ;
        feedback.textContent = number + unit + "°";				//Указываем сообщение
		
    } else if ( number > 40 ){
		feedback.style.color = 'red';							//Если угол большой
        feedback.textContent = 'Угол слишком большой' ;			//Если угол большой        
		number.value = 20;
		
    } else if ( !isInteger(corn.value) ) {
		feedback.style.color = 'red';
        feedback.textContent = 'Введено не целое число';    //Проверка на целостность
		number.value = 20;
    } else {
		feedback.style.color = 'red' ;
        feedback.textContent = 'Угол сшишком мал';          //Если не целое число
		number.value = 20;
    }
}

// Объявляем функцию проверки правильности введенных минут и секунд
function checkMS(mS,feedback,unit) {

    if ((mS.value<=60)&&(mS.value>=0)) {
        feedback.textContent = mS.value + unit;             //Указываем сообщение
    } else if (!isInteger(mS.value)) {
        feedback.textContent = 'Введено не целое число';      //Проверка на целостность
		mS.value = 0;
		
    } else {
        feedback.textContent = 'Значение должно быть в пределах от 0\' до 60\'' ;	//Если угол маленький
		mS.value = 0 + unit;
    }
    if(mS == 13) {

    }
}

//Функция получает на вход число, места возврата ошибки и правильного варианта
//проверяет число по символьно и если есть "," то заменяет "."
//и возвращает ошибку или исправильный результат в нужное место
function checkModule(module,feedback,error) {
    var moduleMass = [], moduleEnd = '';
    for (i=0; i <= module.value.length; i++){
        moduleMass[i] = module.value.charAt(i);
        if (moduleMass[i]===',') {
            moduleMass[i]='.'
        }
        moduleEnd += moduleMass[i];
    }
    if ( isNaN(+moduleEnd) ) {
		error.style.color = 'red';
        error.textContent = 'Введено не число';
        module.value = 0;
    }else if ( (+moduleEnd) >= 0.05 && (+moduleEnd) <= 100 ){
        module.value = (+moduleEnd);
		error.style.color = 'black' ;
        error.textContent = module.value;		
    }else{
		error.style.color = 'red';
        error.textContent = 'Значение должно быть в пределах от 0.05 до 100' ;
        module.value = 0;
    }
}

// Объявляем функцию проверки правильности введенного размеров роликов и замены неправильного введенного значения
function checkRoll(roll,error) {
    var rollMass = [], rollEnd = '';
    for (i=0; i<=roll.value.length; i++){
        rollMass[i] = roll.value.charAt(i);
        if (rollMass[i]===',') {
            rollMass[i]='.'
        }
        rollEnd += rollMass[i];
    }
    if (isNaN(rollEnd/1)) {
        error.textContent = 'Введено не число';
        roll.value = 0;
    }else if (((rollEnd/1)>=0)&&((rollEnd/1)<=26.069)){
        roll.value = rollEnd/1;
        error.textContent = roll.value;
    }else{
        error.textContent = 'Значение должно быть в пределах от 0.004 до 26.069' ;
        roll.value = 0;
    }
}

/*
Функция получает на вход число, места возврата ошибки и
правильного результата 
проверяет число на целостность и,
в зависимости от результатов проверки, возвращает в нужное место
*/

function checkNumberTeeths(number,feedback,error) {
    if ( number.value > 0 ) {	
		error.style.color = 'black';
        feedback.textContent = number.value; 					//Указываем сообщение
        error.textContent = number.value;		
    } else if ( number.value <= 0 || !isInteger(number.value) ){
		error.style.color = 'red';
        error.textContent = 'Введеное не целое положительное число' ;			//Если угол большой
		number.value = 0;
    }
}

// Объявляем функцию проверки правильности введенного смещения и замены
function checkShift(shift,feedback) {
    var shiftMass = [], shiftEnd = '';
    for (i=0; i<=shift.value.length; i++){
        shiftMass[i] = shift.value.charAt(i);
        if (shiftMass[i]===',') {
            shiftMass[i]='.'
        }
        shiftEnd += shiftMass[i];
    }
    if (isNaN(shiftEnd/1)) {
        feedback.textContent = 'Введено не число';
        shift.value = 0;
    }else if (((shiftEnd/1)>=(-10.0))&&((shiftEnd/1)<=10.0)){
        shift.value = shiftEnd/1;
        feedback.textContent = shift.value;
    }else{
        feedback.textContent = 'Не в переделах от -10.0 до 10.0' ;
        shift.value = 0;
    }
}

// Проверка числа на целостность
function isInteger(value){
    if ((undefined === value) || (null === value)) {
        return false;
    }
    return value % 1 === 0;
}

//Выбор типа зубчатой эвольвентной передачи
function helicalNoChosen(){
	var tiltAngle = document.getElementById('hideTiltAngle');
	var teeths2 = document.getElementById('hideTeeths2');
	var teeths22 = document.getElementById('hideTeeths22');
	var shift2 = document.getElementById('hideShift2');
	tiltAngle.style.display = 'none';
	teeths2.style.display = 'none';
	teeths22.style.display = 'none';
	shift2.style.display = 'none';
}

function helicalYesChosen(){
	var tiltAngle = document.getElementById('hideTiltAngle');
	var teeths2 = document.getElementById('hideTeeths2');
	var teeths22 = document.getElementById('hideTeeths22');
	var shift2 = document.getElementById('hideShift2');
	tiltAngle.style.display = '';
	teeths2.style.display = '';
	teeths22.style.display = '';
	shift2.style.display = '';
}



