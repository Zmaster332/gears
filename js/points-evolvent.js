//Расчет точек для построения эвольвентного профиля
function buttonXY(){

	pointsEvolvent = document.getElementById('pointsEvolvent');
	pointsEvolvent.style.display = 'block';
	
	var rA = feedbackRadTops.textContent;
	//var rF = feedbackRadHol.textContent;
	//number;
/*
	
	if (rA > rF) {
        xMax = rA - rB;
        xMin = rF - rB;
    } else {
        xMax = rF - rB;
        xMin = rA - rB;
    }
	
	*/
	for (j=1; j<=10;j++){
		newEl = document.createElement('tr');
		newEl.className='trEvol';
		newEl.id = 'tr'+j;	
		positions = document.getElementById('x1');
		positions.appendChild(newEl);	
	
		for (i=1; i<=2; i++){
			newEl1 = document.createElement('td');
			newEl1.className='tdEvol';
			newText1 = document.createTextNode('0.005');
			newEl1.appendChild(newText1);
	
			positions1 = document.getElementById(newEl.id);
			positions1.appendChild(newEl1);
		
	
		}
	}
	
	
}

//Выход из функции расчета эвольвенты
function exitXY(){	
	
	//Выбираем эллементы для удаления
	
	number =[];
	
	var number = document.getElementsByClassName('trEvol');
	
	for (i=0; i<number.length;i=i+1) {	
		var removeEl = number[i];
		var containerEl = document.getElementById('x1');
		containerEl.removeChild(removeEl);
	}
	//var containerEl = number.parentNode;//document.getElementById('x1');
	//containerEl.removeChild(number)
	
	
	
	
		//Изменение значения видимости таблицы
	pointsEvolvent = document.getElementById('pointsEvolvent');
	pointsEvolvent.style.display = 'none';
	
}

