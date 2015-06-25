'use strict';

if (!window.console) window.console = {log: function() {}};
if (!window.console.info) window.console.info = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.dir) window.console.dir = function() {};

// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	window.gm = function() {}; // Custom API 네임 스페이스 선언    
    window.gmv = function() {}; // Page Variation Custom API 네임 스페이스 선언
	window.gmf = function() {}; // Page Function Custom API 네임 스페이스 선언    
	gm.globalObject = function() {}; // Global 변수 API 네임 스페이스 선언
	
	function getIeVersionFloat() {
        var _ieVersionFloat = 100;
        var _userAgentStr = navigator.userAgent;
        var _ieVersionIndexStartInt = _userAgentStr.indexOf('MSIE');
        if(_ieVersionIndexStartInt !== -1) {
            var _ieVersionIndexEndInt = _userAgentStr.indexOf(';', _ieVersionIndexStartInt);            
            _ieVersionFloat = parseFloat(_userAgentStr.substr(_ieVersionIndexStartInt + 5, _ieVersionIndexEndInt - _ieVersionIndexStartInt - 5));
        }
        // IE 11 이상 패치
        _ieVersionIndexStartInt = _userAgentStr.indexOf('rv');
        if(_ieVersionIndexStartInt !== -1) {
            var _ieVersionIndexEndInt = _userAgentStr.indexOf(')', _ieVersionIndexStartInt);            
            _ieVersionFloat = parseFloat(_userAgentStr.substr(_ieVersionIndexStartInt + 3, _ieVersionIndexEndInt - _ieVersionIndexStartInt - 3));
        }
        // //IE 11 이상 패치
        return _ieVersionFloat;
    };
	
	// 사이트 전역 변수 선언
	var debugStr = 1;
	gm.globalObject.getDebugStr = function() {
	    /* Console(F12)이 실행 안 되어 있으면 debugStr은 항상 0 으로 함
	     * IE에서 console.log 사용시 중지되는 증상 때문에 항상 0으로 하였음
	     * 141030 $.debug 만 사용함으로서 $.debug에서 IE를 체크하여 처리하는 로직 수행으로 바꿈으로서 그냥 리턴해도 됨
	     */
		if(typeof console != 'undefined' && typeof console.log != 'undefined') {
        	// return 0; // 141030 패치
		    return debugStr;
		} else {
			return debugStr;
		}
    }; 
    gm.globalObject.setDebugStr = function(_debugStr) {
        debugStr = _debugStr;
    }; 
	
    // 웹 사이트 루트 폴더(자동 처리 됨)
    var rootDirStr = '/' + 'webInit';
    var aElement = document.createElement('a');
	aElement.href = document.URL;
	
	if(aElement.pathname.substring(0, 1) === '/') {
    	rootDirStr = '/' + aElement.pathname.split('/')[1];
	} else {
		rootDirStr = '/' + aElement.pathname.split('/')[0];
	}
	
	// Cordova Android 자동 처리
	if(rootDirStr.indexOf('android_asset') !== -1) {
	    rootDirStr = rootDirStr + '/' + aElement.pathname.split('/')[2] + '/' + aElement.pathname.split('/')[3];
	    $.getScript(rootDirStr+'/../cordova.js').done(function( script, textStatus ) { 
            document.addEventListener('deviceready', onDeviceReady, false);
            function onDeviceReady() {
                gm.globalObject.setMobileDeviceBool(true);
            }
	    });
	}
	// //Cordova Android 자동 처리
    // //웹 사이트 루트 폴더(자동 처리 됨)
	
    gm.globalObject.getRootDirStr = function() {
        return rootDirStr;
    }; 
    gm.globalObject.setRootDirStr = function(_rootDirStr) {
        rootDirStr = _rootDirStr;
    };
	
    var hostNameStr = '';
    gm.globalObject.getHostNameStr = function() {
        if(hostNameStr.length === 0) {
            var aElement = document.createElement('a');
            aElement.href = document.URL;
            hostNameStr = aElement.hostname;
        }
        return hostNameStr;
    };
    gm.globalObject.setHostNameStr = function(_hostNameStr) {
        hostNameStr = _hostNameStr;
    };
    
	var userIdStr = '';	// 사용자ID	
	gm.globalObject.getUserIdStr = function() {
	    // F5 리플래쉬 하면 다시 로그인해야하는 증상 패치
	    /*
	    if(userIdStr.length === 0) {
	        var _sendObject = {};
	        _sendObject['successCallBackSub'] = function(_thisJson) {
                if(_thisJson.getJson.result !== 'true') {
                    /// 프록시세션체크 실패
                } else {
                    /// 프록시세션체크 성공
                    if(_thisJson.getJson.resultData.data) {
                        userIdStr = _thisJson.getJson.userId;
                        userInfoArray = _thisJson.getJson.resultData.data.ifUserInfoHlogin;
                    }
                }
            };
            
            var _ajaxOption = {
                url: gm.globalObject.getAjaxProxyStr()
                , type: 'POST'
                , async: false
                , dataType: 'json'
                , data: 'proxyUrl=proxySessionCheck'
                , success: _sendObject['successCallBackSub']
            };
            
            $.ajax(_ajaxOption);
	    }
	    */
	    // //F5 리플래쉬 하면 다시 로그인해야하는 증상 패치
		return userIdStr;
	};	
	gm.globalObject.setUserIdStr = function(_userIdStr) {
		userIdStr = _userIdStr;
	};
	
	var uniqueIdStr = ''; // 사용자 uniqueId(getHttp Cookie 파일명)    
    gm.globalObject.getUniqueIdStr = function() {
        return uniqueIdStr;
    };    
    gm.globalObject.setUniqueIdStr = function(_uniqueIdStr) {
        // _uniqueIdStr = _uniqueIdStr.replace(/\\/g,'\\\\');
        uniqueIdStr = _uniqueIdStr;
    };
    
    var mobileDeviceBool = false;
    gm.globalObject.getMobileDeviceBool = function() {
        return mobileDeviceBool;
    };    
    gm.globalObject.setMobileDeviceBool = function(_mobileDeviceBool) {
        mobileDeviceBool = _mobileDeviceBool;
    };
    
    var langStr = 'ko';
    gm.globalObject.getLangStr = function() {
		return langStr;
    }; 
    gm.globalObject.setLangStr = function(_langStr) {
    	 langStr = _langStr;
    }; 
	
    var ajaxProxyStr = gm.globalObject.getRootDirStr()+'/was/getJson.php';
    gm.globalObject.getAjaxProxyStr = function() {
        return ajaxProxyStr;
    }; 
    gm.globalObject.setAjaxProxyStr = function(_ajaxProxyStr) {
        ajaxProxyStr = _ajaxProxyStr;
    };

    var ajaxProxySslStr = 'https://'+gm.globalObject.getHostNameStr()+gm.globalObject.getRootDirStr()+'/was/getJson.php';
    // 관리자용은 이미 모두 HTTPS 이기 때문에 처리
    if(aElement.protocol === 'https:' || getIeVersionFloat() !== 100) { // 관리자용이 이미 모두 HTTPS 일 때는 https
        ajaxProxySslStr = gm.globalObject.getAjaxProxyStr(); 
    }
    // //관리자용은 이미 모두 HTTPS 이기 때문에 처리
    gm.globalObject.getAjaxProxySslStr = function() {
        /// 뒤에 HTTP에서 생성된 세션키를 꼭 전달해줘야 HTTP와 HTTPS 세션을 같이 쓸 수 있음
        return ajaxProxySslStr+'?GmToken='+$.cookie('GmToken');
    }; 
    gm.globalObject.setAjaxProxySslStr = function(_ajaxProxySslStr) {
        ajaxProxySslStr = _ajaxProxySslStr;
    };
    
    var userInfoArray = {};
    gm.globalObject.getUserInfoArray = function() {
        return userInfoArray;
    }; 
    gm.globalObject.setUserInfoArray = function(_userInfoArray) {
        userInfoArray = _userInfoArray;
    };
    
    var pageFirstCallBool = true;
    gm.globalObject.getPageFirstCallBool = function() {
        return pageFirstCallBool;
    };
    gm.globalObject.setPageFirstCallBool = function(_pageFirstCallBool) {
        pageFirstCallBool = _pageFirstCallBool;
        return pageFirstCallBool;
    };
    // //사이트 전역 변수 선언   
});