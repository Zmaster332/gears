//������ ����� ��� ���������� ������������� �������
function buttonXY(){

	var pointsEvolvent = document.getElementById('pointsEvolvent');
	pointsEvolvent.style.display = 'block';

    var aCorn = alfaCorn.value / 1;			//������� ���� "�����"
    var aMin = alfaMin.value / 1;			//������ ���� "�����"
    var aSec = alfaSec.value / 1;			//������� ���� "�����"
    var bCorn = betaCorn.value / 1;			//������� ���� "����"
    var bMin = betaMin.value / 1;			//������ ���� "����"
    var bSec = betaSec.value / 1;			//������� ���� "����"
    var z1 = numberTeeths.value / 1;		//����� ������ �������� 1
    var x1 = shift.value / 1;				//�������� 1� ��������
    var x2 = shift2.value / 1;				//�������� 2� ��������
    var xSumm = x1 + x2;					//��������� ��������
    var alfa;								//���� "�����" � ��������
    var beta;								//���� "����" � ��������
	var xMin;								//����������� �������� �
	var xMax;								//������������ �������� �
    var rA = parseFloat(feedbackRadTops.textContent);	//������ ������ ������ (ra)
    var rF = parseFloat(feedbackRadHol.textContent);	//������ ������(rf)
    var rB = parseFloat(feedbackRadBase.textContent);	//������ �������� ���������� (rb)
    var dD = parseFloat(feedbackRadDiv.textContent);	//����������� ������� (dd)
	var xTMin,xTMax;
	var betaXY;								//���� ���������� ���� ���������
	var invAlfa;							//�������� ���� �����
	var alfaT;

    //������� �������� ���� "�����" � �������
    alfa = (aCorn + aMin / 60 + aSec / 3600) * (Math.PI / 180);

    //������� �������� ���� "����" � �������
    beta = (bCorn + bMin / 60 + bSec / 3600) * (Math.PI / 180);


    if ((beta === 0) && (xSumm === 0)) {
        //���� �������
        alfaT = alfa;
    }else {
        alfaT = Math.atan(Math.tan(alfa) / Math.cos(beta));
    }

    //���� ���������� ���� ��������� �� ����� ������
    if (x1 === 0) {
        invAlfa = Math.tan(alfa) - alfa;
        betaXY = Math.PI / (2 * z1) + invAlfa;
    } else {
        invAlfa = Math.tan(alfa) - alfa;
        betaXY = Math.PI / (2 * z1) + invAlfa + 2 * (Math.tan(alfa)) * x1 / z1;
    }
    //������� ���������, ����� ��� ��� �� ������
    while ((betaXY - Math.PI) > 0) {
        betaXY = betaXY - Math.PI
    }



    //dNov =  103.2462;
    //var rNov = dNov/2;
    //xRasch = thick(dD, dNov, alfaT, alfa, z1, x1)/2;


    //var alfaP = Math.acos(rB/rNov);

    //xRasch = (yRasch/Math.tan(invaluta(alfaP)))-rB;


    //yRasch =
    //xRasch = yRasch/(Math.tan(betaXY-(Math.asin(xRasch/rNov))))-rB;






    //����������� �������������� ���������
    if (rA > rF) {
        xMax = rA - rB;
        xMin = rF - rB;
    } else {
        xMax = rF - rB;
        xMin = rA - rB;
    }

    //����������� ���������
    if (rF > rB) {
        xTMax = xMax / rB;
        xTMin = xMin / rB;
    } else if (z1 <= 39) {
        xTMin = 0;
    } else {
        xTMin = (1-Math.cos(alfa))/Math.cos(alfa) - 2.4/(z1*Math.cos(alfa));
        xTMax = (1-Math.cos(alfa))/Math.cos(alfa) + 2/(z1*Math.cos(alfa));
    }

    var rMin = rB+(xMin);

    var alfaPMin = Math.acos(rB/rMin);
    var yMin= Math.sin(invaluta(alfaPMin))*rMin;
    var xMin1 = (yMin/Math.tan(invaluta(alfaPMin)))-rB;

    var rMax = rB+(xMax);

    var alfaPMax = Math.acos(rB/rMax);
    var yMax= Math.sin(invaluta(alfaPMax))*rMax;
    var xMax1 = (yMax/Math.tan(invaluta(alfaPMax)))-rB;

    console.log('rB = '+rB);
    console.log('rA = '+rA);
    console.log('rF = '+rF);
    console.log('xMix = '+xMin);
    console.log('xMax = '+xMax);
    console.log('xTMix = '+xTMin);
    /*console.log('se1 = '+se1);
    console.log('se2 = '+se2);
    console.log('se1 = '+dD+' '+dMin+' '+alfaT+' '+alfa+' '+z1+' '+x1);
    console.log('se2 = '+dD+' '+dMax+' '+alfaT+' '+alfa+' '+z1+' '+x1);*/
    console.log('xMin = '+xMin1);
    console.log('yMin = '+yMin);
    console.log('xMax = '+xMax1);
    console.log('yMax = '+yMax);
    console.log('dMax = '+((xMax+rB)*2));
    console.log('dMin = '+((xMin+rB)*2));


    var alfaP;
    var xRasch = [];
    var yRasch = [];
    var rRasch = rF+0.05;
    var x=0;
    var y=0;
    for (i=1; rRasch<rA; i++){


        alfaP = Math.acos(rB/rRasch);
        yRasch[i] = Math.sin(invaluta(alfaP))*rRasch;
       	y=yRasch[i];
        xRasch[i] = (y/Math.tan(invaluta(alfaP)))-rB;
        x=xRasch[i];
        rRasch = rRasch+0.05;
        console.log('x'+i+' = '+x+'dX = '+((x+rB)*2));
        console.log('y'+i+' = '+y);
	}










for (j=1; j<=10;j++){
    var newEl = document.createElement('tr');
    newEl.className='trEvol';
    newEl.id = 'tr'+j;
    var positions = document.getElementById('x1');
    positions.appendChild(newEl);

    for (i=1; i<=2; i++){
        var newEl1 = document.createElement('td');
        //var number = i;
        newEl1.className='tdEvol';

        if (i%2===0){var newText1 = document.createTextNode(i);}
        else{var newText1 = document.createTextNode(j);}
        newEl1.appendChild(newText1);

        var positions1 = document.getElementById(newEl.id);
        positions1.appendChild(newEl1);


    }
}


}

//����� �� ������� ������� ����������
function exitXY(){

//�������� ��������� ��� ��������

number =[];

var number = document.getElementsByClassName('trEvol');

for (i=0; i<number.length;i=i/2) {
    var removeEl = number[i];
    var containerEl = document.getElementById('x1');
    containerEl.removeChild(removeEl);
}
//var containerEl = number.parentNode;//document.getElementById('x1');
//containerEl.removeChild(number)



    //��������� �������� ��������� �������
var pointsEvolvent = document.getElementById('pointsEvolvent');
pointsEvolvent.style.display = 'none';

}


