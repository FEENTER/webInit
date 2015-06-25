'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	window.pageLoadPub = function(_hashStr) {
		var _designElement = $('#paneCenterDiv');
		gm.ajaxUtil.getAjaxPageLoadEffect(_designElement, _hashStr, function(_getDesignElement, _reqData) {
			try {
				$(_getDesignElement).empty();
				$(_getDesignElement).html(_reqData);			
				$('.accordionDivC').addClass('redMondC').accordion(); // 순서 중요(내부 화면을 보이게 한 다음 처리해야 함), jqueryUI redMondC 적용
				// 받아온 컨텐츠에 따라서 높이 조정 처리
				var _designElementHeightInt = $(_getDesignElement).height();
				if(_designElementHeightInt < 500) {
					_designElementHeightInt = 500;
				}								
				$(_getDesignElement).parent().parent().height(_designElementHeightInt);
				// //받아온 컨텐츠에 따라서 높이 조정 처리				
			} catch(_error) {
				alert(_hashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
				return false;
			} finally {				
				
			}
		},'explode');
		
		_designElement = $('#paneWestDiv');
		gm.ajaxUtil.getAjaxPageLoadEffect(_designElement, _hashStr, function(_getDesignElement, _reqData) {
			try {
				$(_getDesignElement).empty();
				$(_getDesignElement).html(_reqData);			
				$('.accordionDivC').addClass('redMondC').accordion(); // 순서 중요(내부 화면을 보이게 한 다음 처리해야 함), jqueryUI redMondC 적용
				// 받아온 컨텐츠에 따라서 높이 조정 처리
				var _designElementHeightInt = $(_getDesignElement).height();
				if(_designElementHeightInt < 500) {
					_designElementHeightInt = 500;
				}								
				$(_getDesignElement).parent().parent().height(_designElementHeightInt);
				// //받아온 컨텐츠에 따라서 높이 조정 처리				
			} catch(_error) {
				alert(_hashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
				return false;
			} finally {				
				
			}
		},'explode');
	};	
});