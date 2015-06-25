'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {	
	var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/login/uiEvent/login.js';
	function testFunctionSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
	};
	
	testFunctionSub();
	
	// 이렇게 하면 IE8 에서만 Validator 안됨(버그 인듯)
	window.noUse = function() {
	/*
  	$('form#loginPageLoginForm').validate({
  		debug:true,
  		rules: {
	  		loginPageIdInput: {
		        required: true
	  		},
	  		loginPagePwdInput: {
		        required: true
	  		}
  		}
  		, messages: {
	        'loginPageIdInput': {
	            required: '아이디를 넣어주세요'
	        }
	    }
  		, submitHandler: loginSubmitClickSub
  	});
  	*/	
	};
  	// //이렇게 하면 IE8 에서만 Validator 안됨(버그 인듯)
	var loginPageLoginFormSubmitInputClickBool = false; // 로그인 버튼 중복 클릭 방지
	function loginSubmitClickSub() {
		var _loginParamsStr = $('#loginPageLoginForm').serialize();	
		$.debug(jsFileNameStr, printStackTrace(), '_loginParamsStr', _loginParamsStr);	
		var _idStr = $('#loginPageLoginFormSubmitInput > input[name=loginPageIdInput]').val();
		ajaxCallLoginCheckPub(_idStr, _loginParamsStr, function(_reqData) {	
		    loginPageLoginFormSubmitInputClickBool = false;
		    gm.globalObject.setUserIdStr('UserID');        
			$('.bodyHeaderC > .paneHeaderC').show('fade', 1000);
			$('.bodyFooterC > .paneFooterC').show('fade', 1000);
			var _hashUrlStr = gm.addOnUtil.getCurrentHashUrlStr();
			if(gm.addOnUtil.getIsNull(_hashUrlStr)) {
				pageLoadPub('/pc/public/layout/noLayoutPlugIn/body'); 
			} else {
				pageLoadPub(_hashUrlStr);
			}
			// location.replace('http://hojae.hoteljoin.com/managerHotel/html/pc/public/layout/noLayoutPlugIn/index.html#/pc/public/layout/noLayoutPlugIn/body');
		});
	};
	
	var _loginPageLoginFormValidator = $('form#loginPageLoginForm').validate({
	    debug: true,
	    // 에러와 성공을 상세하게 컨트롤 가능(에러의 순서가 순차적이지 않음)
	    /*
	    errorElement: 'li',
	    errorContainer: '#loginPageLoginFormValidatorDiv',
  		errorPlacement: function(_errorMsgElement, _errorElement) {
            // $.debug(jsFileNameStr, printStackTrace(), 'errorPlacement', _errorMsgElement, _errorElement);
  		    if($('#'+$(_errorMsgElement).attr('id')).length === 0) {
  		        _errorMsgElement.text($(_errorElement).attr('dispname') + ' ' + _errorMsgElement.text());
  		        _errorMsgElement.appendTo($('#loginPageLoginFormValidatorDiv ul'));
  		    }
        },
        success: function(_successMsgElement, _successElement) {
            // $.debug(jsFileNameStr, printStackTrace(), 'successPlacement', _successMsgElement, _successElement);
            $('#'+$(_successMsgElement).attr('id')).remove();
        },
        */
        // //에러와 성공을 상세하게 컨트롤 가능(에러의 순서가 순차적이지 않음)
	    // 에러를 단순하게 표시 가능(에러의 순서가 순차적임)
        errorLabelContainer: $('#loginPageLoginFormValidatorDiv'),
        // //에러를 단순하게 표시 가능(에러의 순서가 순차적임)
        rules: {
            loginPageIdInput: {
                required: true,
                specialChar: true
            },
            loginPagePwdInput: {
                required: true
            }
        }, 
        messages: {
	        loginPageIdInput: {
	            required: '아이디를 넣어주세요'
	        },
  			loginPagePwdInput: {
  				required: '패스워드를 넣어주세요'
	        }
	    }
	});
	
	$.validator.addMethod('specialChar', function(_thisValue, _thisElement) {
        return (/[^a-zA-Z0-9]/.test(_thisValue) === true)?false:true;
    }, '아이디는 특수문자를 사용 할 수 없습니다');
	
	$('#loginPageMainDiv').off('click', '#loginPageLoginFormSubmitInput').on('click', '#loginPageLoginFormSubmitInput', function (_thisEvent) {
		_thisEvent.preventDefault(); // submit 기능 중단	
		if(!loginPageLoginFormSubmitInputClickBool) {
			if(_loginPageLoginFormValidator.form()) {
				// IE9 이하 버전을 위한 패스워드 타입 처리
				var _passwordInputElement = $('input[name=loginPagePwdInput]');
				if(gm.addOnUtil.getIsNull(_passwordInputElement.val())) {
					// jqueryValidator를 이용한 에러 처리
					_loginPageLoginFormValidator.showErrors({
					  'loginPagePwdInput': '패스워드를 넣어주세요!'
					});
					// Keyup 이벤트시 에러 삭제
					$('#bodyMainDiv').off('keyup', $('input[name=loginPagePwdInput]').prev()).on('keyup', $('input[name=loginPagePwdInput]').prev(), function() {					
						_loginPageLoginFormValidator.showErrors({
						  'loginPagePwdInput': null
						});
					});
					// //Keyup 이벤트시 에러 삭제
					// //jqueryValidator를 이용한 에러 처리
					
					return false;
				}
				// //IE9 이하 버전을 위한 패스워드 타입 처리			
				
				loginPageLoginFormSubmitInputClickBool = true;
	            loginSubmitClickSub();
	        } else {
	            // _loginPageLoginFormValidator 검증 실패시 코드
	            // //_loginPageLoginFormValidator 검증 실패시 코드
	        }
		}
		
        // Dynamic JavaScript Call 에러 테스트(Chrome: VM, IE: script block 으로 디버깅 가능)
		/*
        var _errorTest = undefined;
            if(_errorTest.length === 1) {
        }
        */
        // Dynamic JavaScript Call 에러 테스트(Chrome: VM, IE: script block 으로 디버깅 가능)
   	});	
});