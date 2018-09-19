//Задаем слушатели событий

alfaCorn.addEventListener('blur',function(){checkCorn(alfaCorn,feedbackAlfaCorn,unit = '')},false);
alfaCorn.addEventListener('keydown',function(){checkCorn(alfaCorn,feedbackAlfaCorn,unit = '')},false);

alfaMin.addEventListener('blur',function(){checkMS(alfaMin,feedbackAlfaMin,unit = '')},false);
alfaSec.addEventListener('blur',function(){checkMS(alfaSec,feedbackAlfaSec,unit = '')},false);

betaCorn.addEventListener('blur',function(){checkCorn(betaCorn,feedbackBetaCorn,unit = '')},false);
betaMin.addEventListener('blur',function(){checkMS(betaMin,feedbackBetaMin,unit = '')},false);
betaSec.addEventListener('blur',function(){checkMS(betaSec,feedbackBetaSec,unit = '')},false);

module.addEventListener('blur',function(){checkModule(module,feedbackModule,errorModule)},false);

numberTeeths.addEventListener('blur',function(){checkNumberTeeths(numberTeeths,feedbackNumberTeeths,errorNumberTeeths)},false);
numberTeeths2.addEventListener('blur',function(){checkNumberTeeths(numberTeeths2,feedbackNumberTeeths2,errorNumberTeeths2)},false);

shift.addEventListener('blur',function(){checkShift(shift,feedbackShift)}, false);
shift2.addEventListener('blur',function(){checkShift(shift2,feedbackShift2)}, false);

//Запуск рассчета
buttonCalc.addEventListener('click',calculation,false);
