function timecount(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('숙제');
  var now = new Date();
  var whatweek = sheet.getRange(1,3).getValues() // 현재 주차
  var reset = sheet.getRange(1,5).getValues() // 현재 주차
  var week = whatweek[0][0]
  var resetcheck = reset[0][0]

  console.log(resetcheck);
  console.log(week);

  // 수요일 새벽 6시 0분부터 4분까지 체크
  if (now.getDay() === 3 && now.getHours() === 6 && now.getMinutes() >= 0 && now.getMinutes() <= 4 && resetcheck == false) {
    if (week == 1){
      sheet.getRange(1,3).setValue(2);

      var range = SpreadsheetApp.getActive().getRange('F1:H100');//비아 ~ 아브 13
      range.uncheck();
      var range = SpreadsheetApp.getActive().getRange('J1:M100');//양겔 ~ 카멘 13 
      range.uncheck();
      var range = SpreadsheetApp.getActive().getRange('O1:W100');//에키 ~
      range.uncheck();

    }
    else { 
      var range = SpreadsheetApp.getActive().getRange('F1:W100');
      range.uncheck();
      sheet.getRange(1,3).setValue(1);
    }
    reset = sheet.getRange(1,5).setValue(true);
  }
  
  //수요일, 5시, 50분이후 만족시
  if (now.getDay() === 3 && now.getHours() === 5 && now.getMinutes() >= 50){
    reset = sheet.getRange(1,5).setValue(false);
  }
  

  

  switch(week){
    case 1: //1주차
      sheet.getRange(1,2).setValue(timeUntilNextWednesday6AM());
      sheet.getRange(2,2).setValue(timeUntilSecondWednesday());
      break;
    case 2: //2주차
      sheet.getRange(1,2).setValue(timeUntilNextWednesday6AM());
      sheet.getRange(2,2).setValue(timeUntilNextWednesday6AM());
      break;

  }
}





// 주간초기화
function timeUntilNextWednesday6AM() {
  // 현재 날짜와 시간을 가져옵니다.
  var now = new Date();
  
  // 현재 날짜의 요일을 가져옵니다. (0: 일요일, 1: 월요일, ... , 6: 토요일)
  var dayOfWeek = now.getDay();

  // 다음 수요일까지 남은 일수 계산
  var daysUntilWednesday = (3 - dayOfWeek + 7) % 7;

  // 현재가 수요일이고 06시가 지났다면, 다음 주 수요일로 설정
  if (dayOfWeek === 3 && now.getHours() >= 6) {
    daysUntilWednesday = 7;
  }
  
  // 다음 수요일의 날짜 계산
  var nextWednesday = new Date(now);
  nextWednesday.setDate(now.getDate() + daysUntilWednesday);
  
  // 다음 수요일 06:00으로 시간 설정
  nextWednesday.setHours(6, 0, 0, 0);
  
  // 남은 시간(밀리초)을 계산
  var timeDifference = nextWednesday - now;

  // 남은 시간을 일, 시간, 분, 초로 변환
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // 결과를 반환
  return days + "일 " + hours + "시간 " + minutes + "분 남음";
}


//2주차 수요일계산
function timeUntilSecondWednesday() {
    // 현재 날짜와 시간을 가져옵니다.
  var now = new Date();
  
  // 현재 날짜의 요일을 가져옵니다. (0: 일요일, 1: 월요일, ... , 6: 토요일)
  var dayOfWeek = now.getDay();

  // 다음 수요일까지 남은 일수 계산
  var daysUntilWednesday = (3 - dayOfWeek + 7) % 7;

  // 현재가 수요일이고 06시가 지났다면, 다음 주 수요일로 설정
  if (dayOfWeek === 3 && now.getHours() >= 6) {
    daysUntilWednesday = 7;
  }
  
  // 다음 수요일의 날짜 계산
  var nextWednesday = new Date(now);
  nextWednesday.setDate(now.getDate() + daysUntilWednesday);
  
  // 다음 수요일 06:00으로 시간 설정
  nextWednesday.setHours(6, 0, 0, 0);
  
  // 남은 시간(밀리초)을 계산
  var timeDifference = nextWednesday - now;

  // 남은 시간을 일, 시간, 분, 초로 변환
  var days = Math.floor((timeDifference / (1000 * 60 * 60 * 24))+7);
  var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  console.log(days);
  // 결과를 반환
  return days + "일 " + hours + "시간 " + minutes + "분 남음";
  
}


