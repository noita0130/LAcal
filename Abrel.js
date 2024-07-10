function reset_timer() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('숙제');


  week_reset_date = sheet.getRange(2,26).getValues();
  ab_reset_date = sheet.getRange(3,26).getValues();
  
  week_reset_date = week_reset_date - 1
  ab_reset_date = ab_reset_date - 1

  sheet.getRange(2,26).setValue(week_reset_date); //주간 초기화 날짜 표시
  sheet.getRange(3,26).setValue(ab_reset_date);   //아브 초기화 날짜 표시

  if(ab_reset_date == 7){ //아브 4관제외 체크해제
    var range = SpreadsheetApp.getActive().getRange('F1:I100');
    range.uncheck();
    var range = SpreadsheetApp.getActive().getRange('K1:W100'); // L열 아브 4주차 
    range.uncheck();

    sheet.getRange(2,26).setValue(7); // 주간초기화날짜 = 0 -> 7
  }
  
  if(ab_reset_date == 0){ //아브 4관제외 체크해제
    var range = SpreadsheetApp.getActive().getRange('G1:W100');
    range.uncheck();

    sheet.getRange(2,26).setValue(7);  // 주간초기화날짜 = 0 -> 7
    sheet.getRange(3,26).setValue(14); // 아브초기화날짜 = 0 -> 14

  }
}

  function calculator() {
    var range = SpreadsheetApp.getActive().getRange('A1:W100');
    range.uncheck();

}

  /** 가디언 일일초기화 
  function gardian() {  
    var range = SpreadsheetApp.getActive().getRange('G1:G100');
    range.uncheck();
};
*/