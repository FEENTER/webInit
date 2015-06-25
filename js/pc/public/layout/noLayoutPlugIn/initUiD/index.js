'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/public/layout/noLayoutPlugIn/initUiD/index.js';
    
	window.pageLoadPub = function(_hashStr) {
		// #으로 시작되는 _hashStr 처리
		if(_hashStr.substring(0, 1) === '#') {
			_hashStr = _hashStr.substring(1);
		}
		// //#으로 시작되는 _hashStr 처리
		var _designElement = $('#paneCenterDiv');
		gm.ajaxUtil.getAjaxPageLoadEffect(_designElement, _hashStr, function(_getDesignElement, _reqData) {
			// _hashStr Query String을 처리하기 위한 패치
			var _removeQueryStringHashStr = _hashStr;
			if(_removeQueryStringHashStr.indexOf('?') !== -1) {
				_removeQueryStringHashStr = _removeQueryStringHashStr.substring(0, _removeQueryStringHashStr.indexOf('?'));
			}
			// //_hashStr Query String을 처리하기 위한 패치
			try {				
				$(_getDesignElement).empty();				
				$('body').removeAttr('class',''); // body class 초기화(가끔 body 전체에 동적으로 class를 주기 때문 임)
				$(_getDesignElement).html(_reqData);
				
				// 버그 발생으로 ~/initUiD/index.js에서 getScript로 변경 함				
				// Js, Css 자동 추가를 위한 변수 선언
				var _jsUrlArray = new Array();		
				var _jsUrlCountInt = 4;
				var _slashSplitArray = _removeQueryStringHashStr.split('/');				
				var _slashSplitLengthInt = _slashSplitArray.length;	
				for(var _tmpJsCountInt = 0; _tmpJsCountInt < _jsUrlCountInt; _tmpJsCountInt++) {
					var _tmpJsUrlArray = _slashSplitArray.slice(); // slice는 Array를 상속받지 않고 초기화 되면서 Array 전달(_tmpJsUrlArray는 _slashSplitArray에 참조가 됨(안쓰면 두개는 완전 동일 객체 가 됨))
					var _jsFolderNameStr = '';
					if(_tmpJsCountInt === 0) {
						_jsFolderNameStr = 'ajax/';
					} else if(_tmpJsCountInt === 1) {
						_jsFolderNameStr = 'initUiP/';
					} else if(_tmpJsCountInt === 2) {
						_jsFolderNameStr = 'initUiD/';
					} else if(_tmpJsCountInt === 3) {
						_jsFolderNameStr = 'uiEvent/';
					}
						
					_tmpJsUrlArray[_slashSplitLengthInt - 1] = _jsFolderNameStr + _tmpJsUrlArray[_slashSplitLengthInt - 1]; 
					_jsUrlArray[_tmpJsCountInt] = _tmpJsUrlArray.join('/');			
				}			
				var _rootDirStr = gm.globalObject.getRootDirStr(); 
				var _cssUrlStr = _rootDirStr + '/css' + _removeQueryStringHashStr + '.css';				
				_jsUrlArray[0] = _rootDirStr + '/js' + _jsUrlArray[0] + '.js'; // js(ajax)
				_jsUrlArray[1] = _rootDirStr + '/js' + _jsUrlArray[1] + '.js'; // js(initUiP)
				_jsUrlArray[2] = _rootDirStr + '/js' + _jsUrlArray[2] + '.js'; // js(initUiD)
				_jsUrlArray[3] = _rootDirStr + '/js' + _jsUrlArray[3] + '.js'; // js(uiEvent)
				// //Js, Css 자동 추가를 위한 변수 선언	
				
                // IE9 이하 css 버그 패치
				if(gm.addOnUtil.getIeVersionFloat() >= 10) {
                    $('head').append('<link rel="stylesheet" href="' + _cssUrlStr + '" />');
				} else {   
                    $.get(_cssUrlStr).then(function(_thisResult){ 
                        var css = _thisResult,
                        head = document.head || document.getElementsByTagName('head')[0],
                        style = document.createElement('style');
                    
                        style.type = 'text/css';
                        if (style.styleSheet){
                          style.styleSheet.cssText = css;
                        } else {
                          style.appendChild(document.createTextNode(css));
                        }
                        
                        head.appendChild(style);
                    }); 
				}
                // //IE9 이하 css 버그 패치
                
		  		$.getScript(_jsUrlArray[0]) // 순서대로 부르기 위해서 for 문 사용 안 함
				  .done(function( script, textStatus ) {		
				  	$.getScript(_jsUrlArray[1])
					  .done(function( script, textStatus ) {		
					  	$.getScript(_jsUrlArray[2])
						  .done(function( script, textStatus ) {		
						  	$.getScript(_jsUrlArray[3])
							  .done(function( script, textStatus ) {		
							  		
							  })
							  .fail(function( jqxhr, settings, exception ) {
                                $.errorMsg(jsFileNameStr, printStackTrace(), _jsUrlArray[0]+' JS Call Error: ' + arguments[1], 'Error : ' + arguments[2].message, arguments[2].stack, arguments);
							    alert(_jsUrlArray[3]+' JS Call Error');
							});			
						  })
						  .fail(function( jqxhr, settings, exception ) {
                            $.errorMsg(jsFileNameStr, printStackTrace(), _jsUrlArray[0]+' JS Call Error: ' + arguments[1], 'Error : ' + arguments[2].message, arguments[2].stack, arguments);
						    alert(_jsUrlArray[2]+' JS Call Error');
						});			
					  })
					  .fail(function( jqxhr, settings, exception ) {
    			        $.errorMsg(jsFileNameStr, printStackTrace(), _jsUrlArray[0]+' JS Call Error: ' + arguments[1], 'Error : ' + arguments[2].message, arguments[2].stack, arguments);
					    alert(_jsUrlArray[1]+' JS Call Error');
					});		
				  })
				  .fail(function( jqxhr, settings, exception ) {
				    $.errorMsg(jsFileNameStr, printStackTrace(), _jsUrlArray[0]+' JS Call Error: ' + arguments[1], 'Error : ' + arguments[2].message, arguments[2].stack, arguments);
				    alert(_jsUrlArray[0]+' JS Call Error');
				});					  	
				// //버그 발생으로 ~/initUiD/index.js에서 getScript로 변경 함
				
				// IE 9 이하 버전은 body에 추가함(JavaScript가 2번 호출되는 버그 때문에 처리 함) - 사용안함
				/*
				if(gm.addOnUtil.getIeVersionFloat() < 10 ) {
					$('script').each(function() {
						$(this).attr('src', $(this).attr('src_break')).removeAttr('src_break');
					});
				}
				*/				
				// //IE 9 이하 버전은 body에 추가함(JavaScript가 2번 호출되는 버그 때문에 처리 함)
				
				// $('.accordionDivC').addClass('redMondC').accordion(); // 순서 중요(내부 화면을 보이게 한 다음 처리해야 함), jqueryUI redMondC 적용						
			} catch(_error) {
				alert(_removeQueryStringHashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
				return false;
			} finally {				
				
			}
		});
	};	
	
	$.history.init(function(_hashStr) {	
		// $.debug(jsFileNameStr, printStackTrace(), '_hashStr : ' + _hashStr);
		var _getHashStr = _hashStr;
		if (_getHashStr == '') {
			// initialize your app, #만 있거나 #이 없는 첫번째 페이지
			// $.debug(jsFileNameStr, printStackTrace(), 'initialize your app');							
			_getHashStr = '/pc/public/layout/noLayoutPlugIn/body';	
		} else {
			// restore the state from hash, #이 있는 첫번째 이외 페이지들
			// $.debug(jsFileNameStr, printStackTrace(), 'restore the state from hash', _getHashStr);				
		}		
		// 사용자 로그인 확인		
		if(gm.addOnUtil.getIsNull(gm.globalObject.getUserIdStr())) {
			_getHashStr = '/pc/private/login/login';
		}
		$('.bodyHeaderC > .paneHeaderC').show('fade', 1000);
		$('.bodyFooterC > .paneFooterC').show('fade', 1000);
		// //사용자 로그인 확인							
		pageLoadPub(_getHashStr);
	}, {
		unescape: ',/'
	});		
	
	var designElement = $('#paneHeaderDiv');
	var hashStr = '/pc/public/layout/noLayoutPlugIn/header';
	gm.ajaxUtil.getAjaxPageLoadEffect(designElement, hashStr, function(_designElement, _reqData) {
		try {			
			$(_designElement).empty();
			$(_designElement).html(_reqData);				
		} catch(_error) {
			alert(_hashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
			return false;
		} finally {				
			
		}
	});
	
	designElement = $('#paneFooterDiv');
	hashStr = '/pc/public/layout/noLayoutPlugIn/footer';
	gm.ajaxUtil.getAjaxPageLoadEffect(designElement, hashStr, function(_designElement, _reqData) {
		try {
			$(_designElement).empty();
			$(_designElement).html(_reqData);				
		} catch(_error) {
			alert(_hashStr + ' pageLoadPub Aajx UI Control Error : ' + _error.message);
			return false;
		} finally {				
			
		}
	});
});