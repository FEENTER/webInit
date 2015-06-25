'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {	
	var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/test/ajax/9568.js';
	function testFunctionSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
	};		
	
	testFunctionSub();
});