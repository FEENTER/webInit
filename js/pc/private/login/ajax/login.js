'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/login/ajax/login.js';
	function testFunctionSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
	};
	
	testFunctionSub();
	
	gm.addOnUtil.getPublicFunVarCreate('ajaxCallLoginCheckPub', function() { 
		window.ajaxCallLoginCheckPub = function(_idStr, _loginParams, _successCallBackSub) {
		    /*
		    gm.ajaxUtil.getAjax('POST', 'http://ip.jsontest.com/', true, 'json', _loginParams
		    , function(_reqData) {
				alert('로그인 성공');
				if (typeof(_successCallBackSub) === 'function') {					
					_successCallBackSub(_reqData);
				}
		    });
		    */
		    _successCallBackSub('test');
		};
	});
	
	// Dynamic JavaScript Call 에러 테스트
    /*
	var _errorTest = undefined;
    if(_errorTest.length === 1) {
    }
    */
    // Dynamic JavaScript Call 에러 테스트
});