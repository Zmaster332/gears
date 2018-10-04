//Задаем слушатели событий

helicalNo.addEventListener('click',helicalNoChosen,false);
helicalYes.addEventListener('click',helicalYesChosen,false);

alfaCorn.addEventListener('blur',
	function(){
				checkCorn(alfaCorn,feedbackAlfaCorn,unit = '')
			}
	,false);
	
alfaMin.addEventListener('blur',
	function(){
				checkMinSec(alfaMin,feedbackAlfaMin,unit = '')
			}
	,false);
	
alfaSec.addEventListener('blur',
	function(){
				checkMinSec(alfaSec,feedbackAlfaSec,unit = '')
			}
	,false);

betaCorn.addEventListener('blur',
	function(){
				checkCorn(betaCorn,feedbackBetaCorn,unit = '')
			}
	,false);
	
betaMin.addEventListener('blur',
	function(){
				checkMinSec(betaMin,feedbackBetaMin,unit = '')
			}
	,false);
	
betaSec.addEventListener('blur',
	function(){
				checkMinSec(betaSec,feedbackBetaSec,unit = '')
			}
	,false);

module.addEventListener('blur',
	function(){
				checkModule(module,feedbackModule,errorModule)
			}
	,false);
	
rollD.addEventListener('blur',
	function(){
				checkRoll(rollD,errorRollD)
			}
	,false);

numberTeeths1.addEventListener('blur',
	function(){
				checkNumberTeeths(numberTeeths1,feedbackNumberTeeths1,errorNumberTeeths1)
			}
		,false);
		
numberTeeths2.addEventListener('blur',
	function(){
				checkNumberTeeths(numberTeeths2,feedbackNumberTeeths2,errorNumberTeeths2)
			}
	,false);

shift1.addEventListener('blur',
	function(){
				checkShift(shift,feedbackShift)
			}
	, false);
	
shift2.addEventListener('blur',
	function(){
				checkShift(shift2,feedbackShift2)
			}
	, false);

//Запуск рассчета
buttonCalc.addEventListener('click',calc,false);

//Вывод таблицы с точками эвольвенты
tableXY.addEventListener('click',buttonXY,false);

//Строим профиль эвольвенты
build.addEventListener('click',canvasEvolta,false);

//Выход из таблицы с точками эвольвенты
exit.addEventListener('click',exitXY,false);

