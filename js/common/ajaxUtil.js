'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/common/ajaxUtil.js';
	// ajax Global Setting
	// $.fx.off = true; // 기본 ajax animate 중지시키기
	// https://api.jquery.com/jQuery.ajaxSetup/
	var ajaxSendCountInt = 0; // body 전체 화면 로딩 숨김을 위한 변수	
	$(document).ajaxStart(function(_e) {		
		// $.ajax의 beforeSend 보다 먼저 호출 됨
	});
	
	$(document).ajaxSend(function(_e) {		
		// $.debug(jsFileNameStr, printStackTrace(), _e);
		// ajaxStart는 한번 실행되나 ajaxSend는 보낼 때 마다 실행 됨
		if (ajaxSendCountInt == 0) {
			// $('body').addClass('loadingBodyC'); // body 전체 화면 로딩 보이기(IE 9 이상 지원하기 때문에 부분 로딩으로 변경)
			// gm.addOnUtil.popUp('open', '로딩', '<div>페이지를 로딩 중 입니다.</div>');
		}
		ajaxSendCountInt++;
	});
	
	$(document).ajaxSuccess(function(_e) {
		ajaxSendCountInt--;
		if (ajaxSendCountInt == 0) {
			// $('body').removeClass('loadingBodyC'); // body 전체 화면 로딩 숨김
		}
	});
	
	$(document).ajaxComplete(function(_e) {
		// $.ajax의 complete 보다 먼저 호출 됨
		// ajaxStart와 같이 한번만 실행되야 하는데 ajaxSend와 같이 보낼 때 마다 실행 됨(버그인듯)
		// ajaxSendCountInt 변수를 이용해서 처리 함
	});
	
	$(document).ajaxError(function(_e, _jqXhr, _settings, _exception) {
		// http://stackoverflow.com/questions/9120002/jquery-ajax-error-handling
		// if(gm.globalObject.getDebugStr()) {            
            var _syntaxErrorResultStr = arguments[1].status === 200 ? 'Yes' : 'No';
			$.errorMsg(jsFileNameStr, printStackTrace(), 'Ajax 호출 에러', 'Referer Url  : ' + arguments[0].target.URL, 'Call Url : ' + arguments[2].url, 'Syntax Error : ' + _syntaxErrorResultStr + ' (특히 배열 닫을 때 , 주의)', 'Error : ' + arguments[3].message, arguments);
			// alert('Common ajaxError()\r\nURL: ' + _settings.url + '\r\nSendData: ' + _settings.data + '\r\nstatusText: ' + _jqXhr.statusText + '\r\nerrorCode : ' + arguments[3].message + '\r\nresponseText : ' + arguments[1].responseText); // !debugCode			
			if(gm.globalObject.getDebugStr()) {
				if(!gm.addOnUtil.getIsNull(arguments[3]))
				{
					if(!gm.addOnUtil.getIsNull(arguments[3].message)) {
						if(arguments[3].message.indexOf('Unexpected token') > -1) {
							alert('statusText: OK 인데 이 에러 발생시\r\n호출 dataType을 확인해 주세요\r\n※특히 json이 아닌데 json 이라고 하면 에러가 발생 합니다');
						}
					} else {
						if(arguments[3].indexOf('Unexpected token') > -1) {
							alert('statusText: OK 인데 이 에러 발생시\r\n호출 dataType을 확인해 주세요\r\n※특히 json이 아닌데 json 이라고 하면 에러가 발생 합니다');
						}
					}
				}
			}			
		// }
	});
	
	$.ajaxSetup({
		type: 'POST' // GET, POST 등 // POST 사용시 412에러 발생시 GET으로 사용해야 함
		, dataType: 'html' // xml, json, script, html, text, jsonp(jsonp 사용시 jsonpCallback 속성 추가 설정 필요, jsonp는 Only GET, Only 비동기)
		, async: true // true(비동기)으로 한다면 ajax가 끝날 때까지 대기하지 않고 다음 코드(ajax 호출 밑에 코드)로 넘어감으로 false(동기)로 설정(기본: true)
		, cache: true // cache는 끄기 무조건 새로 받음(기본: true) //POST 방식일 경우 cache가 안 됨
		, global: true // ajax Global 설정 상속을 받아서 실행(기본: true)
		, ifModified: false // 마지막 요청 이후에 응답이 변경됐을 때만 처리(기본: false)		
		, timeout: 60000 // 60초
	});
	// ajax 크로스도메인 오류 발생시 jsonp을 사용하면 됨
	// http://blog.naver.com/musasin84?Redirect=Log&logNo=60208652179
	// //ajax Global Setting	
		
	gm.ajaxUtil = function() {}; // addOnUtil 변수 API 네임 스페이스 선언    	
	// jqueryLayout(gm.globalObject.getRootDirStr() + '/html/pc/public/layout/default/index.html) 용 샘플코드 였음
	gm.ajaxUtil.getAjaxPageLoad = function getAjaxPageLoadSub(_designElement, _hashStr, _callBackSub, _animateType) {
		//getAjaxPageLoadSub(_designElement, _hashStr, _callBackSub, _animateType); // 다시 getAjaxPageLoadSub 함수를 호출(재귀호출)
		var _loadingBackgroundStr = 'rgba( 255, 255, 255, .8 ) url("../../../../../img/pc/public/layout/default/loading.gif") 50% 50% no-repeat';
		var _urlStr = gm.globalObject.getRootDirStr() + '/html' + _hashStr + '.html'; // 루트 폴더명 변경시 변경 필요
		var _designElementParentElement = null;
		// https://api.jquery.com/jQuery.ajax/
		$.ajax({
			url: _urlStr
			, type: 'GET'
			, data: ''
			, beforeSend: function() {				
				// 입력값 겂증
				if(false) {
					return false; 					
					// return false;  // cancel submit
					// return true;   // continue submit
				}
				// 부모 엘리먼트에서 백그라운드에 로딩 화면 보이기				
				_designElementParentElement = $(_designElement).parent();
				// $.debug(jsFileNameStr, printStackTrace(), $(_designElementParentElement));
				$(_designElementParentElement).css({
					'background': _loadingBackgroundStr
				});
				// //부모 엘리먼트에서 백그라운드에 로딩 화면 보이기
				
				// 로딩 화면만 보이기 위해서 내부 화면 숨김
				$(_designElement).css({
					'display': 'none'
				});
				// //로딩 화면만 보이기 위해서 내부 화면 숨김
				
				// animate 제어
				if(!gm.addOnUtil.getIsNull(_animateType)) {						
			      	var _options = {};
			      	if (_animateType === 'scale') {
			        	options = {percent: 0};
			      	} else if(_animateType === 'size') {
			        	options = {to: {width: 200, height: 60}};
			      	}
			      	$(_designElement).show(_animateType, _options, 1000);				      	
				}	
			}
			, success: function(_reqData) {
				try {			
					if (typeof(_callBackSub) === 'function') {
						_callBackSub(_reqData);
					}
				}
				catch(_error) {					
					alert(_urlStr + '\r\n' + 'getAjaxPageLoad success 제어 에러: ' + _error.message);					
					return false;
				} finally {				
					// 부모 엘리먼트에서 백그라운드에 로딩 화면 숨김						
					$(_designElementParentElement).css({
						'background': ''
						, 'background-color': ''
					});	
					// //부모 엘리먼트에서 백그라운드에 로딩 화면 숨김
				}
			}
		});
	};		
	
	// getAjaxPageLoad가 animate 처리가 좀 비정상이여서 다시 작성함
	gm.ajaxUtil.getAjaxPageLoadEffect = function getAjaxPageLoadSub(_designElement, _hashStr, _successCallBackSub, _animateType) {
		// _hashStr Query String을 처리하기 위한 패치
		var _removeQueryStringHashStr = _hashStr;
		if(_removeQueryStringHashStr.indexOf('?') !== -1) {
			_removeQueryStringHashStr = _removeQueryStringHashStr.substring(0, _removeQueryStringHashStr.indexOf('?'));
		}
		// //_hashStr Query String을 처리하기 위한 패치
		//getAjaxPageLoadSub(_designElement, _hashStr, _successCallBackSub, _animateType); // 다시 getAjaxPageLoadSub 함수를 호출(재귀호출)
		var _loadingBackgroundStr = 'rgba( 255, 255, 255, .8 ) url("../../../../../img/pc/public/layout/default/loading.gif") 50% 50% no-repeat';
		var _rootDirStr = gm.globalObject.getRootDirStr(); 
		var _urlStr = _rootDirStr + '/html' + _removeQueryStringHashStr + '.html';		
		// Js, Css 자동 추가를 위한 변수 선언
		/*
		var _cssUrlStr = _rootDirStr + '/css' + _hashStr + '.css';
		var _jsUrlArray = new Array();		
		var _jsUrlCountInt = 4;
		var _slashSplitArray = _hashStr.split('/');				
		var _slashSplitLengthInt = _slashSplitArray.length;	
		for(var _tmpJsCountInt = 0; _tmpJsCountInt < _jsUrlCountInt; _tmpJsCountInt++) {
			var _tmpJsUrlArray = _slashSplitArray.slice(); // slice는 Array를 상속받지 않고 초기화 되면서 Array 전달(_tmpJsUrlArray는 _slashSplitArray에 참조가 됨(안쓰면 두개는 완전 동일 객체 가 됨))
			var _jsFolderNameStr = '';
			if(_tmpJsCountInt === 0) {
				_jsFolderNameStr = 'initUiP/';
			} else if(_tmpJsCountInt === 1) {
				_jsFolderNameStr = 'initUiD/';
			} else if(_tmpJsCountInt === 2) {
				_jsFolderNameStr = 'ajax/';
			} else if(_tmpJsCountInt === 3) {
				_jsFolderNameStr = 'uiEvent/';
			}
				
			_tmpJsUrlArray[_slashSplitLengthInt - 1] = _jsFolderNameStr + _tmpJsUrlArray[_slashSplitLengthInt - 1]; 
			_jsUrlArray[_tmpJsCountInt] = _tmpJsUrlArray.join('/');			
		}			
		_jsUrlArray[0] = _rootDirStr + '/js' + _jsUrlArray[0] + '.js'; // js(initUiP)
		_jsUrlArray[1] = _rootDirStr + '/js' + _jsUrlArray[1] + '.js'; // js(initUiD)
		_jsUrlArray[2] = _rootDirStr + '/js' + _jsUrlArray[2] + '.js'; // js(ajax)
		_jsUrlArray[3] = _rootDirStr + '/js' + _jsUrlArray[3] + '.js'; // js(uiEvent)
		*/
		// //Js, Css 자동 추가를 위한 변수 선언		
		
		var _designElementParentElement = null;
		// https://api.jquery.com/jQuery.ajax/
		$.ajax({
			url: _urlStr
			, type: 'GET'
			, data: ''
			, async: false // 동기로하면 Js, Css 자동 추가 삭제에 리플래쉬 버그가 생김(해당 Js, Css가 다 지워지는 버그)
			, beforeSend: function() {	
			    try {			
    				// 입력값 겂증
    				if(false) {
    					return false; 					
    					// return false;  // cancel submit
    					// return true;   // continue submit
    				}
    				
    				// 부모 엘리먼트에서 백그라운드에 로딩 화면 보이기				
    				_designElementParentElement = $(_designElement).parent();
    				// $.debug(jsFileNameStr, printStackTrace(), $(_designElementParentElement));
    				$(_designElementParentElement).css({
    					'background': _loadingBackgroundStr
    					, 'overflow': 'hidden'
    				});
    				// //부모 엘리먼트에서 백그라운드에 로딩 화면 보이기
    				
    				// 로딩 화면만 보이기 위해서 내부 화면 숨김
    				$(_designElement).css({
    					'opacity': '0.2'
    				});
    				// //로딩 화면만 보이기 위해서 내부 화면 숨김
    				
    				// animate 제어				
    				if(!gm.addOnUtil.getIsNull(_animateType)) {						
    			      	var _options = {};
    			      	if (_animateType === 'scale') {
    			        	options = {percent: 0};
    			      	} else if(_animateType === 'size') {
    			        	options = {to: {width: 200, height: 60}};
    			      	}
    			      	$(_designElement).hide(_animateType, _options, 1000);				      	
    				}
    				
    				// 수동 animate 조작
    				if($(_designElement).prop('id') === 'paneHeaderDiv') {
    					$(_designElement).css({'top': '-25px'});		
    			    }				   			    
    				// //수동 animate 조작
				} catch(_error) {                   
                    alert(_urlStr + '\r\n' + 'getAjaxPageLoadEffect beforeSend Control Error : ' + _error.message);                 
                    return false;
                }
			}
			, success: function(_reqData) {
				try {	
				    // Js, Css 자동 추가 삭제
				    // 자동으로 html 당 3개의 Js와 1개의 Css를 유지하기 위함
					// Js, Css 자동 삭제(private 폴더, Chrome 자동 생성 관련 Js 및 Css를 자동 삭제 함)	
					if(_removeQueryStringHashStr.indexOf('/private/') !== -1 || (_removeQueryStringHashStr.indexOf('/public/') !== -1 && (_hashStr.indexOf('/body') !== -1 && _removeQueryStringHashStr.indexOf('/public/layout/') !== -1))) {					
					$('script').each(function(_scriptIndex, _scriptElement) {
						var _privateExistInt = $(_scriptElement).prop('src').indexOf('private');	
						if(_privateExistInt > -1) {
							$(_scriptElement).remove();
						}												
						
						var _chromeExistInt = $(_scriptElement).text().indexOf('window["_GOOG_TRANS_EXT_VER"] = "1"');
                        if(_chromeExistInt > -1) {
                            $(_scriptElement).remove();
                        }
					});											
					$('link').each(function(_linkIndex, _linkElement) {
						var _privateExistInt = $(_linkElement).prop('href').indexOf('private');	
						if(_privateExistInt > -1) {
							$(_linkElement).remove();
						}						
					});		
					// //Js, Css 자동 삭제(private 폴더, Chrome 자동 생성 관련 Js 및 Css를 자동 삭제 함)					
					// Js, Css 자동 추가					
					/*
					// 버그 발생으로 ~/initUiD/index.js에서 getScript로 변경 함
					$('head').append('<link rel="stylesheet" href="' + _cssUrlStr + '" />');					
					for(var _tmpInt = 0 ; _tmpInt < _jsUrlCountInt ; _tmpInt++) {  //try 에서 3번 호출하면 3번 호출이 되지 않음으로 for 문으로 함					
						try {			
							// IE 9 이하 버전은 body에 추가함(JavaScript가 2번 호출되는 버그 때문에 처리 함)
							if(gm.addOnUtil.getIeVersionFloat() < 10 ) {
								// getAjaxPageLoadEffect 호출 페이지에서 추가 처리 필요(예: ~/initUiD/index.js 참조)
								$('body').append('<script src_break="' + _jsUrlArray[_tmpInt] + '" ></script>');								
							} else {
								$('head').append('<script src="' + _jsUrlArray[_tmpInt] + '" ></script>');								
							}
							// // IE 10 이상 버전은 head에 추가함(JavaScript가 2번 호출되는 버그 때문에 처리 함)							
						} catch(_error) {
							// head에 script append 시에 'Unexpected token < ' 오류는 무시							
							if(_error.message === 'Unexpected token < ') {
								alert(_urlStr + '\r\n' + 'getAjaxPageLoadEffect File Call Control Error : ' + _error.message);
								return false;
							}
						}
					}
					// //버그 발생으로 getScript로 변경 함
					*/
					// //Js, Css 자동 추가					
					
					// 기본 body인 public noLayoutPlugIn body.html Js 및 Css를 자동으로 삭제하고 private 있다면 body 는 삭제
					var _privateExistBool = 0;
					$('script').each(function(_scriptIndex, _scriptElement) {
                        var _privateExistInt = $(_scriptElement).prop('src').indexOf('private');    
                        if(_privateExistInt > -1) {
                            _privateExistBool = 1;
                            return false;
                        }
                    });
                    if(_privateExistBool === 1) {                    
    					$('script').each(function(_scriptIndex, _scriptElement) {
                            var _defaultBodyExistInt = $(_scriptElement).prop('src').indexOf('/public/layout/');   
                            if(_defaultBodyExistInt > -1) {
                                _defaultBodyExistInt = $(_scriptElement).prop('src').indexOf('body.js');
                                if(_defaultBodyExistInt > -1) {                         
                                    $(_scriptElement).remove();
                                }
                            }
                        });
                        $('link').each(function(_linkIndex, _linkElement) {
                            var _defaultBodyExistInt = $(_linkElement).prop('href').indexOf('/public/layout/');    
                            if(_defaultBodyExistInt > -1) {
                                _defaultBodyExistInt = $(_linkElement).prop('href').indexOf('body.css');
                                if(_defaultBodyExistInt > -1) {                         
                                   $(_linkElement).remove();
                                }
                            }
                        });
                    }
					}
					// //기본 body인 public noLayoutPlugIn body.html Js 및 Css를 자동으로 삭제하고 private 있다면 body 는 삭제
					// //Js, Css 자동 추가 삭제					
					if (typeof(_successCallBackSub) === 'function') {	
						// Body 가 있을 경우 Body 내용만 주기
						var _reqDataBody = '';
						if(_reqData.indexOf('<body>') !== -1 && _reqData.indexOf('</body>') !== -1) {
							_reqDataBody = gm.addOnUtil.getStringTrim(_reqData.substr(_reqData.indexOf('<body>') + 6, _reqData.indexOf('</body>') - _reqData.indexOf('<body>') - 6));							
						} else {
							_reqDataBody = gm.addOnUtil.getStringTrim(_reqData);
						}								
						// //Body 가 있을 경우 Body 내용만 주기
						_successCallBackSub(_designElement, _reqDataBody);
					}
				} catch(_error) {					
					alert(_urlStr + '\r\n' + 'getAjaxPageLoadEffect success Control Error : ' + _error.message);					
					return false;
				} finally {	
				    try {				    
    					$(_designElement).css({'opacity': '1'}); // 내부 화면 보이기			
    					if(!gm.addOnUtil.getIsNull(_animateType)) {						
    				      	var _options = {};
    				      	if (_animateType === 'scale') {
    				        	options = {percent: 0};
    				      	} else if(_animateType === 'size') {
    				        	options = {to: {width: 200, height: 60}};
    				      	}
    				      	$(_designElement).show(_animateType, _options, 1000);
    					}	
    
    					// 수동 animate 조작
    					if($(_designElement).prop('id') === 'paneHeaderDiv') {						
    						// http://jqueryui.com/effect/#easing	
    					    $(_designElement).animate({
    					        top: '0px'
    					    }, 800, 'easeInQuad');
    				    }				    
    					// //수동 animate 조작
    
    					// 부모 엘리먼트에서 백그라운드에 로딩 화면 숨김						
    					$(_designElementParentElement).css({
    						'overflow': ''
    						, 'background': ''
    						, 'background-color': ''
    					});	
    					// //부모 엘리먼트에서 백그라운드에 로딩 화면 숨김
					} catch(_error) {                  
                        alert(_urlStr + '\r\n' + 'getAjaxPageLoadEffect finally Control Error : ' + _error.message);                  
                        return false;
                    }
				}
			}
		});
	};	
	
	// 참조 사이트 : http://www.jsontest.com/
	// 사용법: 
	// gm.ajaxUtil.getJsonp('http://ip.jsontest.com/', 'a=1&b=2&c=3', 'showIP'
	// , function(_reqData) {
	//     $.debug(jsFileNameStr, printStackTrace(), _reqData.ip);
	//   }
	// , function() {});	
	gm.ajaxUtil.getJsonp = function(_urlStr, _sendDataStr, _jsonpCallbackStr, _successCallBackSub, _beforeSendCallBackSub){
	    _sendDataStr = encodeURIComponent(_sendDataStr); // jsonp는 Only GET 방식이여서 처리 필요
		$.ajax({
			url: _urlStr
			, dataType: 'jsonp' // jsonp는 무조건 GET 방식임
			, data: _sendDataStr	
			, jsonpCallback: _jsonpCallbackStr	// jsonpCallback은 파라미터명 callback의 값으로 전달 됨		
			, beforeSend: function() {				
				try {
					if (typeof(_beforeSendCallBackSub) === 'function') {
						_beforeSendCallBackSub();
					}
				}
				catch(_error) {
					alert(_urlStr + '\r\n' + 'getJsonp beforeSend Control Error : ' + _error.message);	
					return false;		
				}								
			}
			, success: function(_reqData) {				
				$.debug(jsFileNameStr, printStackTrace(), 'gm.ajaxUtil.getJsonp', _reqData);				
				try {
					if (typeof(_successCallBackSub) === 'function') {
						_successCallBackSub(_reqData);
					}
				}
				catch(_error) {
					alert(_urlStr + '\r\n' + 'getJsonp success Control Error : ' + _error.message);	
					return false;		
				}			
			}
		});
	};
    
    // 사용법
    // gm.ajaxUtil.getHttpOnlyGet('GET', 'http://api.jquery.com/', 'ua=y', 'euc-kr', '', '', 'jsonp'
    // , function(_reqData) {
    //     $.debug(jsFileNameStr, printStackTrace(), _reqData.getHttp.result);
    // });
    // getHttp.php에 v1.0.2 140612 langDetect가 UTF-8이 아니면 euc-kr로 변경 패치를 하면서 _langStr 의미가 없어짐
	gm.ajaxUtil.getHttpOnlyGet = function getHttpOnlyGetSub(_mehtodStr, _urlStr, _sendDataStr, _langStr, _refererStr, _uniqueIdStr, _responseDataTypeStr, _successCallBackSub) {
		// $.support.cors = true; // IE Jquery Ajax 처리시 'No transport' 에러 처리 코드   // jsonp 로 하면 필요 없음	    
        var _jsonDataStr = '{"methodStr":"'+_mehtodStr+'","urlStr":"'+_urlStr+'","postDataStr":"'+_sendDataStr+'","langStr":"'+_langStr+'","refererStr":"'+_refererStr+'","uniqueIdStr":"'+_uniqueIdStr+'","responseDataTypeStr":"'+_responseDataTypeStr+'"}';    
        _jsonDataStr = encodeURIComponent(_jsonDataStr); // jsonp는 Only GET 방식이여서 처리 필요
        var _getHttpUrlStr = 'http://192.168.0.147/getHttp/getHttp.php';
        $.ajax({
            url: _getHttpUrlStr
            , dataType: 'jsonp'
            // , crossDomain: true // xDomainRequest.js 사용 코드(안해도 처리 됨)
            , jsonpCallback: 'phpProxy' // jsonpCallback은 파라미터명 callback의 값으로 전달 됨      
            , data: 'jsonDataStr='+_jsonDataStr 
            , success: function(_reqData) { 
               if(_reqData === 'Protocol is not Jsonp') {
                   alert('Not Jsonp Protocol');
                   return false;
               } else {                                      
                   var _reqDataArray = _reqData; // eval 의한 성능 저하시 바꿔줄 필요가 있음(JSON.parse 로 변경 필요) // https://github.com/douglascrockford/JSON-js // 20140611 jsonp 사용으로 eval 생략                                          
                   $.debug(jsFileNameStr, printStackTrace(), 'gm.ajaxUtil.getHttpOnlyGet', _reqDataArray);                  
                   try {                       
                        // Could not resolve host(서버부하 또는 host를 못 찾을 경우) 에러 : 자동으로 다시 호출 처리
                        if(_reqDataArray == undefined ) { alert('Reponse Result is undefined (_reqDataArray) - Please Change : _langStr'); return false;}
                        if(_reqDataArray.getHttp.errorNo === 6) {                     
                            if(gm.globalObject.getDebugStr()) {
                                alert('Could not resolve host(서버부하 또는 host를 못 찾을 경우) 에러 : 자동으로 다시 호출 처리');
                            }       
                            getHttpOnlyGetSub(_mehtodStr, _urlStr, _sendDataStr, _langStr, _refererStr, _uniqueIdStr, _successCallBackSub);
                            return false;
                        } else {                            
                            if(_reqDataArray.getHttp.errorNo !== 0) {                     
                                if(gm.globalObject.getDebugStr()) {
                                    alert(_urlStr + '\r\n' + 'getHttpOnlyGet Call Server Result Error : ' + _reqDataArray.getHttp.errorMsg); 
                                    return false;
                                }   
                            }    
                        }                                                
                        
                        if(_reqDataArray.getHttp.html === undefined) { alert('Reponse Result is undefined (_reqDataArray.getHttp) - Please Change : _langStr'); return false;}
                        
                        if (typeof(_successCallBackSub) === 'function') {
                            _successCallBackSub(_reqDataArray);
                        }
                   } catch(_error) {
                        alert(_urlStr + '\r\n' + 'getHttpOnlyGet success Control Error : ' + _error.message);  
                        return false;         
                   }
                }              
            }
        });
    };   
    
    // getHttpOnlyGet 클럽 토스카 로그인 후 값 갖고 오기 사용 법
    /*
    gm.ajaxUtil.getHttpOnlyGet('POST', 'http://www.clubtosca.net/v250/login_check.php'
    , 's_url=%252Fmain.php&user_id=web2000y&x=28&y=16&password=11111111&group_no=1'
    , 'euc-kr'
    , 'http://www.clubtosca.net/main.php'
    , gm.globalObject.getUniqueIdStr()
    , 'jsonp'
    , function(_reqData) {       
        try {
            gm.globalObject.setUniqueIdStr(_reqData.getHttp.uniqueId);    
            
            // 2차 호출            
            gm.ajaxUtil.getHttpOnlyGet('GET', 'http://www.clubtosca.net/main.php'
            , ''
            , 'euc-kr'
            , ''
            , gm.globalObject.getUniqueIdStr()
            , 'jsonp'
            , function(_reqData) {       
                try {                     
                    // $('html').html('<xmp>'+_reqData.getHttp.html+'</xmp>'); // debugCode 
                    var _orgHtml = document.getElementsByTagName("html")[0]; // 순수 Js를 이용하여 변경(진짜 html 이 모두 수정됨)
                    // _orgHtml.innerHTML = _reqData.getHttp.html; // IE9 이하 버전은 html 전체 변경 불가
                    $('html').html(_reqData.getHttp.html); // IE 7 이하 버전은 html 전체 변경 불가(history.js 에러 남(IE 7 이하는 iframe을 이용하는 원인 임)) // 깨진 이미지는 Chrome 에서는 이미지에 마우스 오버시 이미지가 나옴(html 자체는 모두 정상 임)                              
                } catch(_error) {
                    // head에 script append 시에 'Unexpected token < ' 오류는 무시
                    if(_error.message === 'Unexpected token < ') {
                        alert(_urlStr + '\r\n' + 'getHttpOnlyGet 클럽 토스카 UI 제어 에러 2차: ' + _error.message);
                        return false;
                    }
                }
            });           
        } catch(_error) {
            // head에 script append 시에 'Unexpected token < ' 오류는 무시
            if(_error.message === 'Unexpected token < ') {
                alert(_urlStr + '\r\n' + 'getHttpOnlyGet 클럽 토스카 UI 제어 에러 1차: ' + _error.message);
                return false;
            }
        }
    });  
    */
    // //getHttpOnlyGet 클럽 토스카 로그인 후 값 갖고 오기 사용 법
    
    // 사용법 1: 
    /*
    gm.ajaxUtil.getAjax('POST', 'http://ip.jsontest.com/', true, 'json', 'a=1&b=2&c=3'
    , function(_reqData) {
        alert('콜 성공');
      }
    , function() {});
    // 사용법 2:
    gm.ajaxUtil.getAjax('POST', 'http://192.168.0.147/getHttp/getHttp.php', true, 'json'
    , 'jsonDataStr={"methodStr":"GET","urlStr":"http://www.hoteljoin.com/agent/index.php/index/index","postDataStr":"agent=aid&xx=yy","langStr":"utf-8","refererStr":"","uniqueIdStr":"","responseDataTypeStr":"json","xpathQueryStr":"/html/body/table/tbody/tr[3]/td/table[8]/tbody/tr/td[1]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/a;"}'
    , function(_reqData) {
        $.debug(jsFileNameStr, printStackTrace(), '디버깅', _reqData);
      }
    , function() {});
    */
    gm.ajaxUtil.getAjax = function getAjaxSub(_mehtodStr, _urlStr, _asyncTypeBool, _dataTypeStr, _sendDataStr, _successCallBackSub) {
        if(_dataTypeStr === 'jsonp') {
            alert('please use the gm.ajaxUtil.getJsonp jsonp');
            return false;
        }
        
		// postDataStr의 &는 꼭 %26으로 처리해서 줘야 함
        // _sendDataStr = encodeURIComponent(_sendDataStr);
        _sendDataStr = _sendDataStr.replace(/[&]/g, '%26');       
        
        $.ajax({
            url: _urlStr
            , type: _mehtodStr                    
            , async: _asyncTypeBool
            , dataType: _dataTypeStr    
            , data: _sendDataStr 
            , success: function(_reqData) {
//            try catch 문 사용시 에러 찾기가 힘들어서 주석처리 함
//                try {
                    if (typeof(_successCallBackSub) === 'function') {                    	                 		
                        _successCallBackSub(_reqData, _sendDataStr);
                    }
//                } catch(_error) {
//                	$.debug(jsFileNameStr, printStackTrace(), _urlStr + '\r\n' + 'getAjax success 제어 에러: ', arguments);
//                    alert(_urlStr + '\r\n' + 'getAjax success 제어 에러: ' + _error.message);                     
//                    return false;         
//                }                
            }         
        });
    };
    
    gm.ajaxUtil.getAjaxProxy = function(_mehtodStr, _urlStr, _asyncTypeBool, _dataTypeStr, _sendDataStr, _successCallBackSub, _completeCallBackSub) {
        if(_dataTypeStr === 'jsonp') {
            alert('please use the gm.ajaxUtil.getJsonp jsonp');
            return false;
        }
        
        // postDataStr의 &는 꼭 %26으로 처리해서 줘야 함
        // _sendDataStr = encodeURIComponent(_sendDataStr);
        // _sendDataStr = _sendDataStr.replace(/[&]/g, '%26');       
        
        $.ajax({
            url: gm.globalObject.getAjaxProxyStr()
            , type: _mehtodStr
            , async: _asyncTypeBool
            , dataType: _dataTypeStr
            , data: _sendDataStr + '&proxyUrl=' + _urlStr
            , success: function(_reqData) {
//            try catch 문 사용시 에러 찾기가 힘들어서 주석처리 함
//                try {
                    if (typeof(_successCallBackSub) === 'function') {                                               
                        _successCallBackSub(_reqData, _sendDataStr);
                    }
//                } catch(_error) {
//                  $.debug(jsFileNameStr, printStackTrace(), _urlStr + '\r\n' + 'getAjax success 제어 에러: ', arguments);
//                    alert(_urlStr + '\r\n' + 'getAjax success 제어 에러: ' + _error.message);                     
//                    return false;         
//                }                
            }, complete: function() {
                if (typeof(_completeCallBackSub) === 'function') {                                               
                        _completeCallBackSub();
                }
            }
        });
    };
    
    gm.ajaxUtil.getAjaxProxySsl = function(_mehtodStr, _urlStr, _asyncTypeBool, _dataTypeStr, _sendDataStr, _successCallBackSub, _completeCallBackSub) {
        if(_dataTypeStr === 'jsonp') {
            alert('please use the gm.ajaxUtil.getJsonp jsonp');
            return false;
        }
        
        // postDataStr의 &는 꼭 %26으로 처리해서 줘야 함
        // _sendDataStr = encodeURIComponent(_sendDataStr);
        // _sendDataStr = _sendDataStr.replace(/[&]/g, '%26');       
        
        $.ajax({
            url: gm.globalObject.getAjaxProxySslStr()
            , type: _mehtodStr
            , async: _asyncTypeBool
            , dataType: _dataTypeStr
            , data: _sendDataStr + '&proxyUrl=' + _urlStr
            , success: function(_reqData) {
//            try catch 문 사용시 에러 찾기가 힘들어서 주석처리 함
//                try {
                    if (typeof(_successCallBackSub) === 'function') {                                               
                        _successCallBackSub(_reqData, _sendDataStr);
                    }
//                } catch(_error) {
//                  $.debug(jsFileNameStr, printStackTrace(), _urlStr + '\r\n' + 'getAjax success 제어 에러: ', arguments);
//                    alert(_urlStr + '\r\n' + 'getAjax success 제어 에러: ' + _error.message);                     
//                    return false;         
//                }                
            }, complete: function() {
                if (typeof(_completeCallBackSub) === 'function') {                                               
                        _completeCallBackSub();
                }
            }
        });
    };
    
    gm.ajaxUtil.getAjaxJsonProxy = function(_thisObject) {
        // 기본 옵션
        var _defaultObject = {
             'type':'POST'
            ,'async':'true'
            ,'dataType':'json'
            ,'requestData':''
            ,'successCallBackSub':function(_thisObject) {
                $.debug(jsFileNameStr, printStackTrace(), 'gm.ajaxUtil.getAjaxJsonProxy 성공에 따른 Default successCallBackSub 실행', _thisObject);
            }
        };
        
        // 기본 옵션 확장
        $.extend(_defaultObject, _thisObject, true);

        // 입력값 검증
        if(_defaultObject.dataType !== 'json') {
            alert('dataType of gm.ajaxUtil.getAjaxJsonProxy is unique json is');
            return false;
        }
        
        if($.isNull(_defaultObject.proxyUrl)) {
            alert('proxyUrl of gm.ajaxUtil.getAjaxJsonProxy can not be an empty');
            return false;
        }
        // 입력값 검증
        
        var _requestDataStr = gm.addOnUtil.getArrayToStr(_defaultObject.requestData);
        
        $.ajax({
              url: gm.globalObject.getAjaxProxyStr()
            , type: _defaultObject.type
            , async: _defaultObject.async
            , dataType: _defaultObject.dataType
            , data: _requestDataStr + '&proxyUrl=' + _defaultObject.proxyUrl
            , beforeSend: function() {
                if (typeof(_defaultObject.beforeSendCallBackSub) === 'function') {
                    _defaultObject.beforeSendCallBackSub(arguments);
                }
            }
            , error: function() {
                 if (typeof(_defaultObject.errorCallBackSub) === 'function') {
                    _defaultObject.errorCallBackSub(arguments);
                }
            }
            , success: function(_reqJsonObject) {
                if(_reqJsonObject.getJson.result !== 'true') {
                    switch(_reqJsonObject.getJson.httpStatusCode) {
                    case 404:
                        alert('Page Not Found');
                        break;
                    default :
                        alert(gm.message.getErrorMsg('getJsonFail'));
                    }
                } 
                
                var _jsonDataResult = {};
                _jsonDataResult['requestResult'] = 'false';
                if(!$.isNull(_reqJsonObject.getJson.resultData)) {
                    var _exceptionUrlArray = ['echo', 'logout'];
                    if($.inArray(_defaultObject.proxyUrl, _exceptionUrlArray) !== -1) {
                        _jsonDataResult['requestResult'] = 'true';
                    } else {
                        if(_reqJsonObject.getJson.resultData.resultCode !== 0) {
                            alert(_reqJsonObject.getJson.resultData.detailMessage);
                        } else {
                            for(var _indexNameStr in _reqJsonObject.getJson.resultData.data) {
                               if(_reqJsonObject.getJson.resultData.data[_indexNameStr].length !== 0) {
                                   _jsonDataResult['requestResult'] = 'true';
                               }
                            }
                            
                        }
                    }
                }
                
                _jsonDataResult['reponseData'] = _reqJsonObject;
                _jsonDataResult['requestOption'] = this;
                _jsonDataResult['requestOption']['requestData'] = gm.addOnUtil.objQueryStringToJSON(this.data);
                
                if (typeof(_defaultObject.successCallBackSub) === 'function') {
                    _defaultObject.successCallBackSub(_jsonDataResult);
                }
            }
            , complete: function() {
                if (typeof(_defaultObject.completeCallBackSub) === 'function') {
                    _defaultObject.completeCallBackSub(arguments);
                }
            }
        });
    };
    
    

    // 함수로 개발해야 될 기능
    // Input type="submit" Listener
    /*
	$('#formId').on('submit', function( event ) {
	  event.preventDefault();
	  console.log($(this).serialize());
	});
    */
    
    // 폼 Summit Serialize
    /*
     $(document).ready( function() {
      var form = $('#my_awesome_form');    
      form.find('select:first').change( function() {
        $.ajax( {
          type: "POST",
          url: form.attr( 'action' ),
          data: form.serialize(),
          success: function( response ) {
            console.log( response );
          }
        } );
      } );    
    } );
     */
    // //폼 Summit Serialize
    // //함수로 개발해야 될 기능 
    
    // 비동기 테스트 코드(dataType이 jsonp 이면 무조건 비동기 임)
    // 결과가 received true data true 이면 비동기 코드(async: true)
    // 결과가 data false received true 이면 동기 코드(async: false)
    /*
    var temp_bool = false;
    $.ajax({
    url: 'http://ip.jsontest.com/',
    async: true,
    dataType: 'json',
    success: function(data) {
        temp_bool = true;
        console.log('received(이게 먼저 나오면 동기)');
        console.log(temp_bool);
    } 
    })
    console.log('data(이게 먼저 나오면 비동기)');
    console.log(temp_bool);
    */
    // //비동기 테스트 코드
    
	// gm.globalObject.getMyIp();
});

// 어쩔수 없이 일반 함수 형태로 표현하는 부분
// Public Function

// //Public Function