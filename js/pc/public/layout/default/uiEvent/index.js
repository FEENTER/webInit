// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/public/layout/default/uiEvent/index.js';
    
	// JQuery History 시작
	$.history.init(function(_hashStr) {
		if (_hashStr == '') {
			// initialize your app, #이 없는 첫번째 페이지
			// $.debug(jsFileNameStr, printStackTrace(), 'initialize your app');
			$('#paneCenterDiv').html('첫 페이지 Container Center(동적 생성)<br><br><br><br><br><br><br><br><br><br>\
			<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\
			<br><br><br><br><br><br><br><br><br><br><br><br>Test');
		} else {
			// restore the state from hash, #이 있는 첫번째 이외 페이지들
			// $.debug(jsFileNameStr, printStackTrace(), 'restore the state from hash' + hashStr);
			pageLoadPub(_hashStr);
		}
	}, {
		unescape: ',/'
	});
	
	gm.globalObject.setUserIdStr("testId");
	$.debug(jsFileNameStr, printStackTrace(), gm.globalObject.getUserIdStr());	
	
	if(gm.globalObject.getDebugStr())
	{
		$(document).on('click', '*', function(_thisEvent) {
			// $.debug(jsFileNameStr, printStackTrace(), 'click event', _thisEvent);
		});	
	}
});

// 어쩔수 없이 일반 함수 형태로 표현하는 부분
// Public Function
// jqueryLayout의 paneOpen, paneClose 이벤트는 window 선언의 공용 함수 선언하면 오류가 나서 일반 형식으로 처리
function paneOpenPub(_paneNameStr, _paneElement) {
	// http://layout.jquery-dev.net/demos/iframes_many.html
	// http://api.jquery.com/prop/ attr()와 비슷하나 조금 틀림
	// _paneElement.prop('tagName') => DIV 임($.debug(jsFileNameStr, printStackTrace(), _paneElement) 사용 후 0: 의 property 내용임)
	$.debug(jsFileNameStr, printStackTrace(), _paneNameStr + 'Open');	
	if(_paneNameStr === 'south')
	{	
		// var layoutHeightInt = $('.LayoutCenterC').css('height'); 
		// $('.LayoutCenterC').css({'height':layoutHeightInt-159});
		// $('.LayoutEastC').css({'height':layoutHeightInt-159});
		// $('.LayoutWestC').css({'height':layoutHeightInt-159});
	}	
}

function paneClosePub(_paneNameStr, _paneElement) {					
	$.debug(jsFileNameStr, printStackTrace(), _paneNameStr + 'Close');
}
// //Public Function