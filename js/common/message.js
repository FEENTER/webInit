'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	gm.message = function() {}; // Global 변수 API 네임 스페이스 선언
	
	// datepicker 한글 언어 설정
	// 사용법: $.datepicker.setDefaults($.datepicker.regional['ko']);
	$.datepicker.regional['ko'] = {
    closeText: '닫기',
    prevText: '이전달',
    nextText: '다음달',
    currentText: '오늘',
    monthNames: ['1월','2월','3월','4월','5월','6월',
    '7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월',
    '7월','8월','9월','10월','11월','12월'],
    dayNames: ['일','월','화','수','목','금','토'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    dayNamesMin: ['일','월','화','수','목','금','토'],
    weekHeader: 'Wk',
    dateFormat: 'yy-mm-dd',
    firstDay: 1,
    isRTL: false,
    duration:200,
    showAnim:'show',
    showMonthAfterYear: true,
    yearSuffix: '년'};	
	/*
	$(function(e){e.datepicker.regional.ko={closeText:"닫기",prevText:"이전달",nextText:"다음달",currentText:"오늘",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],dayNamesShort:["일","월","화","수","목","금","토"],dayNamesMin:["일","월","화","수","목","금","토"],weekHeader:"Wk",dateFormat:"yy-mm-dd",firstDay:0,isRTL:!1,showMonthAfterYear:!0,yearSuffix:"년"},e.datepicker.setDefaults(e.datepicker.regional.ko)});
	*/
	// //datepicker 한글 언어 설정
	
	var msgKorArray = new Array();
	var msgEngArray = new Array();
	
	var msgKorErrorArray = new Array();
	var msgEngErrorArray = new Array();
	
	msgKorArray['DefaultMsg'] = '기본 메시지 입니다.';	
	msgEngArray['DefaultMsg'] = 'default message';
	
	msgKorErrorArray['ResultNull'] = '결과 값이 없습니다.';	
	msgEngErrorArray['ResultNull'] = 'There is no return value.';
	
	msgKorErrorArray['functionCreateFail'] = 'function 명이 중복되어 functionCreate 실패 했습니다.';	
	msgEngErrorArray['functionCreateFail'] = 'functionCreate failure by duplication of function';
	
	msgKorErrorArray['getJsonFail'] = '서버 부하로 인해 서비스가 잠시 지연 되었습니다.\r\n잠시 후 다시 시도 해주세요';    
    msgEngErrorArray['getJsonFail'] = 'Due to server load and service has been temporarily delayed. \ R \ n Please try again in a few minutes';
    
    msgKorErrorArray['loginExpired'] = '로그인 세션이 만료 되었습니다.\r\n로그아웃 클릭 후 다시 로그인 해주세요';
    msgEngErrorArray['loginExpired'] = 'Login session deadline I has expired.\r\nPlease then log out and log in again';
    
    msgKorErrorArray['getJsonNull'] = '요청하신 데이터가 없습니다.';
    msgEngErrorArray['getJsonNull'] = 'No data is requested.';
    
    msgKorErrorArray['onlyNumber'] = '현재 필드는 숫자만 들어올 수 있습니다';
    msgEngErrorArray['onlyNumber'] = 'There are currently only comes in a number of fields';
	
	// 사용법 : gm.message.getMsg('DefaultMsg');
	gm.message.getMsg = function(_indexStr) {
		if(gm.globalObject.getLangStr() === 'ko') {
        	return msgKorArray[_indexStr];
		}
		if(gm.globalObject.getLangStr() === 'en') {
        	return msgEngArray[_indexStr];
		}
    };
    
    // 사용법 : gm.message.getErrorMsg('DefaultMsg');
	gm.message.getErrorMsg = function(_indexStr) {
		if(gm.globalObject.getLangStr() === 'ko') {
        	return msgKorErrorArray[_indexStr];
		}
		if(gm.globalObject.getLangStr() === 'en') {
        	return msgEngErrorArray[_indexStr];
		}
    };
});