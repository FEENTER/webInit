// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	window.pageLoadPub = function(_hashStr) {
		var _designElement = $('#paneCenterDiv');
		gm.ajaxUtil.getAjaxPageLoad(_designElement, _hashStr, function(_reqData) {
			try {
				$(_designElement).empty();
				$(_designElement).html(_reqData);								
				$(_designElement).css({'display': ''}); // 내부 화면 보이기				
				$('#accordionDiv').addClass('redMondC').accordion(); // 순서 중요(내부 화면을 보이게 한 다음 처리해야 함), jqueryUI redMondC 적용				
			} catch(_error) {
				alert(_hashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
				return false;
			} finally {				
				
			}
		},'fade');
	};	
});