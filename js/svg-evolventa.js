//Построение проекциона зубчатого колеса
function svgEvolta(x,y) {

    var scale = 50;                 //Задаем масштаб изображения
    var dA = parseFloat(feedbackDiamHol.textContent);	//Диаметр вершин зубьев (da)

    //Обязательный параметр при создании svg
    var xmlns="http://www.w3.org/2000/svg";
    var svgNew = document.getElementById("svgNew");       //Объект листа на котором рисуем
    var divEvolta = document.getElementById('divEvolta'); //Объект  которому вешаем

    //Точка отсчета
    var w = dA*scale;




    for(i=0;i<=x.length;i++){
        if(x[i]===undefined||x[i]===null){
            continue;
        }
        var asd = x[i];
        console.log(asd);
    }

    //Изменяем размеры места для прорисовки
    svgNew.style.width=w+200+"px";
    svgNew.style.height=w+100+"px";

    //Создаем узел svg эллемента и вешаем его куда захотим
    var svg = document.createElementNS(xmlns,'svg');
    svg.id = 'svgEvolta';
    svg.setAttribute('width',svgNew.style.width);
    svg.setAttribute('height',svgNew.style.height);
    divEvolta.appendChild(svg);

    //Проводим линию симметрии по Х
    var simmX = document.createElementNS(xmlns,"line");
    simmX.setAttribute("x1",0);
    simmX.setAttribute("y1",w/2+50);
    simmX.setAttribute("x2",svgNew.style.width);
    simmX.setAttribute("y2",w/2+50);
    simmX.setAttribute('stroke','orange');
    simmX.setAttribute('stroke-width','2');
    svg.appendChild(simmX);

    //Проводим линию симметрии по Y
    var simmY = document.createElementNS(xmlns,"line");
    simmY.setAttribute("x1",w/2+50);
    simmY.setAttribute("y1",0);
    simmY.setAttribute("x2",w/2+50);
    simmY.setAttribute("y2",svgNew.style.height);
    simmY.setAttribute('stroke','orange');
    simmY.setAttribute('stroke-width','2');
    svg.appendChild(simmY);

    //Рисуем диаметр выступов
    var circleDA = document.createElementNS(xmlns,"circle");
    circleDA.setAttribute('cx',w/2+50);
    circleDA.setAttribute('cy',w/2+50);
    circleDA.setAttribute('r',w/2);
    circleDA.setAttribute('stroke','blue');
    circleDA.setAttribute('stroke-width','2');
    circleDA.setAttribute('fill','none');
    svg.appendChild(circleDA);




//circle id="fon" cx="150" cy="150" r="100" stroke="#673E93" stroke-width="5"   stroke-dasharray ="314 " stroke-dashoffset="314" fill="none" />

  /*  var divEvolta = document.getElementById('divEvolta');
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');

    circle.setAttribute('r',50);
    circle.setAttribute('cx',80);
    circle.setAttribute('cy',80);
    circle.setAttribute('fill','green');
    d
    svg.appendChild(circle);*/







}