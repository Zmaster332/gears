//Если JavaScript работает
window.onload=function () {
    var errorJS = document.getElementById('errorJS');
    errorJS.parentNode.removeChild(errorJS);
	var tiltAngle = document.getElementById('hideTiltAngle');
	var teeths2 = document.getElementById('hideTeeths2');
	var teeths22 = document.getElementById('hideTeeths22');
	var shift2 = document.getElementById('hideShift2');
	tiltAngle.style.display = 'none';
	teeths2.style.display = 'none';
	teeths22.style.display = 'none';
	shift2.style.display = 'none';
}

//Основные ячейки для работы
var helicalNo = document.getElementById('helicalNo');
var helicalYes = document.getElementById('helicalYes');

var alfaCorn = document.getElementById('alfaCorn');
var alfaMin = document.getElementById('alfaMin');
var alfaSec = document.getElementById('alfaSec');

var betaCorn = document.getElementById('betaCorn');
var betaMin = document.getElementById('betaMin');
var betaSec = document.getElementById('betaSec');

var module = document.getElementById('module');
var rollD = document.getElementById('rollD');
var numberTeeths = document.getElementById('numberTeeths');
var shift = document.getElementById('shift');

var numberTeeths2 = document.getElementById('numberTeeths2');
var shift2 = document.getElementById('shift2');

var tableXY = document.getElementById('buttonXY');
var build = document.getElementById('buttonBuild');
var exit = document.getElementById('buttonExit');
