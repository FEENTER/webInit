'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	$.history.init(function(_hashStr) {
		var _getHashStr = _hashStr;
		if (_getHashStr == '') {
			// initialize your app, #만 있거나 #이 없는 첫번째 페이지
			// $.debug(jsFileNameStr, printStackTrace(), 'initialize your app');		
			_getHashStr = '/pc/public/layout/noLayoutPlugIn/body';	
			pageLoadPub(_getHashStr);
		} else {
			// restore the state from hash, #이 있는 첫번째 이외 페이지들
			// $.debug(jsFileNameStr, printStackTrace(), 'restore the state from hash', _getHashStr);
			pageLoadPub(_getHashStr);
		}
	}, {
		unescape: ',/'
	});
	
	$('#footerDiv').append('<img id="footerImg" src="http://img.hoteljoin.com/main_agent/2014/copy/copyright_1.png" />');		
});