
//Перевод инвалюты в число
//Метод Ласкина (уголы от 0 до 64,87°)

function invToCorn(inv){

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

////Метод Ченга (уголы от 0 до 74,87°)
/*
function invToCorn(inv){
    return Math.pow((3*inv),(1/3)) - (2 * inv) / 5 + (9 / 175) * Math.pow(3, (2 / 3)) * Math.pow(inv, (7 / 3)) - (144 / 67375) * Math.pow(inv, (11 / 3)) - (49711 / 153278125) * Math.pow(3, (1 / 3)) * Math.pow(inv, (13 / 3));
}*/
//Расчет инвалюты угла
function invaluta(corn){
	return (Math.tan(corn)-corn);
}

//Расчет толщины зуба в заданной точке (для построения эвольвенты),
//по делительному диаметру и углу профиля
function thick(dD,d,aT,a,z,x) {
    var aA = Math.acos(dD * Math.cos(aT) / d);
    return d * (((Math.PI / 2 + (2 * x * Math.tan(a))) / z + (Math.tan(aT) - aT) - (Math.tan(aA) - aA)));
}