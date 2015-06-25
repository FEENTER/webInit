'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/login/initUiD/login.js';	
	function testFunctionSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
	};
	
	testFunctionSub();	
	
	// 다른 페이지로 옮겨 지더라도 계속 실행 됨(IE10 이하 버전에서는 jsFileNameStr이 ready 밖에 있다면 마지막에 설정된것으로 변경되는 버그 발생)
	var loginLoadCountInt = 0;
	setInterval(function() {
		loginLoadCountInt++;
		// $.debug(jsFileNameStr, printStackTrace(), ' : ' + loginLoadCountInt);
	}, 3000);
	// //다른 페이지로 옮겨 지더라도 계속 실행 됨(IE10 이하 버전에서는 jsFileNameStr이 ready 밖에 있다면 마지막에 설정된것으로 변경되는 버그 발생)
	
	$('.bodyHeaderC > .paneHeaderC').hide();
	$('#bodyHeaderDiv').removeAttr('style');
	$('.bodyFooterC > .paneFooterC').hide();
	$('#bodyFooterDiv').removeAttr('style');
	
	$('input').placeholder();	
	
	// 로그인 폼 중앙 정렬	
	$('#loginPageLoginDiv').position({
		of: $('#loginPageMainDiv'),
		my: 'center center', 
		at: 'center center'
	}).parent().css({'text-align':'center'});
	$('#loginPageLoginForm').css({'display':'block'});
	// //로그인 폼 중앙 정렬
});