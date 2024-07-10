function init(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('setting');

  sheet.getRange(2,9).setBackground('#ff0000');

  let date = new Date();
  let apiKey = "bearer "+ sheet.getRange(1,3).getValue();

  let row = 5;
  let cnt_char = sheet.getRange(2,7).getValue();

  cnt_char = cnt_char + row;
  
  let arr_char_name = "B5:B"+cnt_char;
  let char_name = sheet.getRange(arr_char_name).getValues();

  cnt_char = cnt_char - row;

  let arr_profiles;
  let arr_engravings;
  let cnt_engravings;

  for(var i=0; i<cnt_char; i++){

    arr_profiles = get_profiles(apiKey, char_name[i]);
    console.log(arr_profiles);
    sheet.getRange(row, 3).setValue(arr_profiles[0]);    
    sheet.getRange(row, 4).setValue(arr_profiles[1]);
    sheet.getRange(row, 5).setValue(arr_profiles[2]);
  /**
    arr_engravings = get_engravings(apiKey, char_name[i])

    sheet.getRange(row, 7).setValue(arr_engravings);

    arr_engravings = arr_engravings.replace(/([0-9])/g,"$1\n");

    if(arr_engravings.indexOf("감소")==-1){
      cnt_engravings = arr_engravings.replace(/[^0-9]/g,'');
    }else{
      cnt_engravings = arr_engravings.substring(0,arr_engravings.indexOf("감소")).replace(/[^0-9]/g,'');
    }
    
    sheet.getRange(row, 6).setValue(cnt_engravings);
  각인세팅을 setting 시트에 입력하는 코드. 필요시 복사*/
    row++;
  }

  sheet.getRange(1,9).setValue("UPDATE: " + date.toLocaleDateString());
  
  sheet.getRange(2,9).setBackground('#000000');

}


function init2(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('setting');

  sheet.getRange(2,9).setBackground('#ff0000');

  let date = new Date();
  let apiKey = "bearer "+ sheet.getRange(2,3).getValue();

  let row = 5;
  let cnt_char = sheet.getRange(2,7).getValue();

  cnt_char = cnt_char + row;
  
  let arr_char_name = "B5:B"+cnt_char;
  let char_name = sheet.getRange(arr_char_name).getValues(); //캐릭터이름 전체목록

  cnt_char = cnt_char - row;

    let dic = {
  "분노의 망치":"분망",
  "중력 수련":"중수",
  "전투 태세":"전태",
  "고독한 기사":"고기",
  "광전사의 비기":"비기",
  "광기":"광기",
  "심판자":"심판자",
  "축복의 오라":"축오",
  "처단자":"처단자",
  "포식자":"포식자",
  "초심":"초심",
  "오의 강화":"오의",
  "극의:체술":"체술",
  "충격단련":"충단",
  "역천지체":"역천",
  "세맥타통":"세맥",
  "절정":"절정",
  "절제":"절제",
  "일격필살":"일격",
  "오의난무":"오의",
  "권왕파천무":"권왕",
  "수라의 길":"수라",
  "강화 무기":"강무",
  "핸드거너":"핸건",
  "화력 강화":"화강",
  "포격 강화":"포강",
  "두 번째 동료":"두동",
  "죽음의 습격":"죽습",
  "진화의 유산":"유산",
  "아르데타인의 기술":"기술",
  "피스메이커":"피메",
  "사냥의 시간":"사시",
  "절실한 구원":"절구",
  "진실된 용맹":"진용",
  "상급 소환사":"상소",
  "넘치는 교감":"교감",
  "황후의 은총":"황후",
  "황제의 칙령":"황제",
  "점화":"점화",
  "환류":"환류",
  "멈출 수 없는 충동":"충동",
  "완벽한 억제":"억제", 
  "잔재된 기운":"잔재",
  "버스트":"버스트",
  "달의 소리":"달소",
  "갈증":"갈증",
  "만월의 집행자":"만월",
  "그믐의 경계":"그믐",
  "만개":"만개",
  "회귀":"회귀",
  "질풍노도":"질풍",
  "이슬비":"이슬비",
}
  
 
  
  var shortname="";

  for(var i=0; i<cnt_char; i++){

    // 각인정보입력 함수내용
    arr_engravings = get_engravings(apiKey, char_name[i]) //"각인이름 Lv.3 형식의 값을 대입"
    console.log(arr_engravings)
    
    var shortname="";

    if(arr_engravings == "-"){
      shortname = arr_engravings
    }
    else if(arr_engravings.length == 2){ // 직각이 2개면
      var level1 = arr_engravings[0]  // 직각 1번 
      var level2 = arr_engravings[1]  // 직각 2번
      var shortname1 = level1.substring(level1.length-1); //직각 레벨
      var shortname2 = level2.substring(level2.length-1); //직각 레벨
      if (shortname1 < shortname2){ // 높은 레벨값을 대입
        shortname = level2
      }
      else{
        shortname = level1
      }
    }
    else if(arr_engravings.length == 1){
      shortname = arr_engravings[0]
    }
    else{
      shortname = "-"
    }

    if(shortname != "-"){
      var lvidx = shortname.indexOf("Lv"); // Lv 이전 index
      var shortname = shortname.substring(0,lvidx); // lv 이전까지의 글자
      var shortname = shortname.trimEnd(); //공백제거
    }
    

    // shortname = name;//전투 태세
    if(shortname in dic == true)//전투 태세 있음
    {
      shortname = dic[shortname];//전투 태세 -> 전태
      console.log(shortname)
      sheet.getRange(row, 6).setValue(shortname);

    }
    else{
      sheet.getRange(row, 6).setValue("-");
    }
    row++;
  }

  sheet.getRange(1,9).setValue("UPDATE: " + date.toLocaleDateString());
  
  sheet.getRange(2,9).setBackground('#000000');

}



function get_profiles(apiKey, name){

  let options = {'method': 'GET', 
  'muteHttpExceptions': true, 
  'Content-Type': 'text/html',
  'headers' : {
    'accept':'application/json',
    'authorization': apiKey},
  };

  let response = UrlFetchApp.fetch("https://developer-lostark.game.onstove.com/armories/characters/"+name+"/profiles", options);

    response = JSON.parse(response.getContentText());
   
    return [response.ItemMaxLevel, response.CharacterClassName, response.GuildName]
}


function get_engravings(apiKey, name){
 
  let options = {'method': 'GET', 
  'muteHttpExceptions': true, 
  'Content-Type': 'text/html',
  'headers' : {
    'accept':'application/json',
    'authorization': apiKey},
  };

  let response = UrlFetchApp.fetch("https://developer-lostark.game.onstove.com/armories/characters/"+name+"/engravings", options);

  response = JSON.parse(response.getContentText());
  console.log(response)

    
  
  let dic = {
  "분노의 망치":"분망",
  "중력 수련":"중수",
  "전투 태세":"전태",
  "고독한 기사":"고기",
  "광전사의 비기":"비기",
  "광기":"광기",
  "심판자":"심판자",
  "축복의 오라":"축오",
  "처단자":"처단자",
  "포식자":"포식자",
  "초심":"초심",
  "오의 강화":"오의",
  "극의:체술":"체술",
  "충격단련":"충단",
  "역천지체":"역천",
  "세맥타통":"세맥",
  "절정":"절정",
  "절제":"절제",
  "일격필살":"일필",
  "오의난무":"오의",
  "권왕파천무":"권왕",
  "수라의 길":"수라",
  "강화 무기":"강무",
  "핸드거너":"핸건",
  "화력 강화":"화강",
  "포격 강화":"포강",
  "두 번째 동료":"두동",
  "죽음의 습격":"죽습",
  "진화의 유산":"유산",
  "아르데타인의 기술":"기술",
  "피스메이커":"피메",
  "사냥의 시간":"사시",
  "절실한 구원":"절구",
  "진실된 용맹":"진용",
  "상급 소환사":"상소",
  "넘치는 교감":"넘교",
  "황후의 은총":"황후",
  "황제의 칙령":"황제",
  "점화":"점화",
  "환류":"환류",
  "멈출 수 없는 충동":"충동",
  "완벽한 억제":"억제", 
  "잔재된 기운":"잔재",
  "버스트":"버스트",
  "달의 소리":"달소",
  "갈증":"갈증",
  "만월의 집행자":"만월",
  "그믐의 경계":"그믐",
  "만개":"만개",
  "회귀":"회귀",
  "질풍노도":"질풍",
  "이슬비":"이슬비",
}
  let res =[];
  if(response == null || typeof(response.Effects) == 'undefined' ){
    res.push("-")
  }
  else{    
    for(let i=0; i<response.Effects.length; i++){
      
      var level = response.Effects[i].Name.indexOf("Lv"); // Lv 이전 index
      var shortname = response.Effects[i].Name.substring(0,level); //전투 태세 
      var shortname = shortname.trimEnd();
      if (shortname in dic){
        res.push(response.Effects[i].Name)
      }


    }
  }    
  return res;
}

/** 
function get_engravings(apiKey, name){
 
  let options = {'method': 'GET', 
  'muteHttpExceptions': true, 
  'Content-Type': 'text/html',
  'headers' : {
    'accept':'application/json',
    'authorization': apiKey},
  };

  let response = UrlFetchApp.fetch("https://developer-lostark.game.onstove.com/armories/characters/"+name+"/engravings", options);

  response = JSON.parse(response.getContentText());

  let res =[];  

  if(typeof(response.Effects) == 'undefined' || response.Effects == null){
    
  }else{    
    for(let i=0; i<response.Effects.length; i++){
      
      var level = response.Effects[i].Name.indexOf("Lv"); // Lv 이전 index
      var shortname = response.Effects[i].Name.substring(0,level); //전투 태세 
      res.push(shortname.trimEnd())


    }
  }    
    return res;
}
*/


