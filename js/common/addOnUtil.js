'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/common/addOnUtil.js';
    gm.addOnUtil = function() {}; // addOnUtil 변수 API 네임 스페이스 선언
    
    /* 정규표현식을 이용한 jQuery Select
       $('input[name=batchWeekInput]').filter(function() {
            return $(this).val().match(/[6|7]/g); // return !$(this)... 이면 아닐 때 선택하게 함 => (/[^6|^7]/g)와 같은 결과 임
       }).attr('checked','checked');
     */
    
    // $.extend를 이용한 함수 사용 법(미완성): $.extend true를 꼭 사용   
    /* 사용법
     * gm.addOnUtil.getJsonSubFuntionTest({'hotelCode':'612'},'successCallBackSub':function() { alert(); }})
     * 
     */
    gm.addOnUtil.getJsonSubFuntionTest = function(_thisObject) {
        var _jsFileNameStr = '/webInit/js/common/addOnUtil.js';
        var _defaultObject = {'successCallBackSub':function() { alert(_jsFileNameStr + ' 에서 getJsonSubFuntionTest 호출 성공'); }};
        $.extend(true, _defaultObject, _thisObject);
        var _sendDataStr = gm.addOnUtil.getArrayToStr(_defaultObject);
        gm.ajaxUtil.getAjaxProxy('POST', '/hotelmng/hotelrecv/selectList', true, 'json', _sendDataStr
            , function(_reqData) {
                if (typeof(_defaultObject.successCallBackSub) === 'function') {                   
                    _defaultObject.successCallBackSub(_reqData);
                }
            }
        );
    };
    // //$.extend를 이용한 함수 사용 법(미완성): $.extend true를 꼭 사용
    
    gm.addOnUtil.debug = function() {
        if(gm.globalObject.getDebugStr()) { 
            var _nowDate = new Date(); // 현재시간
            var _nowDateTime = _nowDate.getFullYear() + '년' + (_nowDate.getMonth()+1) + '월' + _nowDate.getDate() + '일 ' + _nowDate.getHours() + '시' + _nowDate.getMinutes() + '분' + _nowDate.getSeconds() + '초';
            if(typeof console != 'undefined' && typeof console.log != 'undefined') {
                if(arguments.length != 0) {                 
                    console['info']('--------Debuging Start Time: ' + _nowDateTime + '--------');
                    console['info'](gm.addOnUtil.getCurrentHashUrlStr());
                }
                if(arguments[0].indexOf('.js') === -1) {
                    console['error']('$.debug의 첫번째 아규먼트는 파일명 입니다(예: var jsFileNameStr = gm.globalObject.getRootDirStr() + \'/js/common/addOnUtil.js\';)');
                }
                if(arguments[1] === undefined) {
                    console['error']('$.debug의 두번째 아규먼트는 printStackTrace 입니다(예: printStackTrace())');
                }
                for(var _tmpInt = 0 ; _tmpInt < arguments.length ; _tmpInt++) {
                    // console['debug'](arguments[_tmpInt]); // arguments는 function의 ()안에 모든 값을 다 갖고 있음
                    if(_tmpInt === 0) {
                        console.log(arguments[_tmpInt]);
                        // console.log('3번에 StackTrace.js가 아니면 3번이 라인번호 임');
                        // console.log('3번이 StackTarce.js가 맞을 때는 4번이 라인번호 임');
                    } else {
                        console.dir(arguments[_tmpInt]); // arguments는 function의 ()안에 모든 값을 다 갖고 있음
                    }
                }
                console['info']('--------Debuging   End Time: ' + _nowDateTime + '--------' + '\r\n');
            }
            
            /* 네이버에서 IE를 위한 console 사용
             * if (console && console.log) {
             *     console.log('Test')
             * }
             * //네이버에서 IE를 위한 console 사용
             */
        }
    };

    gm.addOnUtil.error = function() {
        if(gm.globalObject.getDebugStr()) { 
            var _nowDate = new Date(); // 현재시간
            var _nowDateTime = _nowDate.getFullYear() + '년' + (_nowDate.getMonth()+1) + '월' + _nowDate.getDate() + '일 ' + _nowDate.getHours() + '시' + _nowDate.getMinutes() + '분' + _nowDate.getSeconds() + '초';
            if(typeof console != 'undefined' && typeof console.log != 'undefined') {
                if(arguments.length != 0) {                 
                    console['error']('--------Error Start Time: ' + _nowDateTime + '--------');
                    console['error'](gm.addOnUtil.getCurrentHashUrlStr());
                }
                if(arguments[0].indexOf('.js') === -1) {
                    console['error']('$.debug의 첫번째 아규먼트는 파일명 입니다(예: var jsFileNameStr = gm.globalObject.getRootDirStr() + \'/js/common/addOnUtil.js\';)');
                }
                if(arguments[1] === undefined) {
                    console['error']('$.debug의 두번째 아규먼트는 printStackTrace 입니다(예: printStackTrace())');
                }
                for(var _tmpInt = 0 ; _tmpInt < arguments.length ; _tmpInt++) {                     
                    // console['debug'](arguments[_tmpInt]); // arguments는 function의 ()안에 모든 값을 다 갖고 있음
                    if(_tmpInt === 0) {
                        console.error(arguments[_tmpInt]);
                        // console.log('3번에 StackTrace.js가 아니면 3번이 라인번호 임');
                        // console.log('3번이 StackTarce.js가 맞을 때는 4번이 라인번호 임');
                    } else {
                        console.dir(arguments[_tmpInt]); // arguments는 function의 ()안에 모든 값을 다 갖고 있음
                    }
                }
                console['error']('--------Error   End Time: ' + _nowDateTime + '--------' + '\r\n');                
            }   
        }
    };
    
    // 현재 이 프레임워크에서는 이렇게 이벤트를 해야 중복이 안 됨
    // 사용법: $.offOn('manageBlockPageMainDiv', 'click', 'selectCellModifyApplyA', function() { alert(); });
    gm.addOnUtil.offOn = function (_mainDivIdStr, _thisEvent, _thisElementIdStr, _functionSub) {
        if(typeof(_functionSub) === 'function') {
           $(_mainDivIdStr).off(_thisEvent, _thisElementIdStr).on(_thisEvent, _thisElementIdStr, _functionSub);
        } else {
            alert('_functionSub Error');
        }
    };
    // //현재 이 프레임워크에서는 이렇게 이벤트를 해야 중복이 안 됨
    
    // 사용법 : $.sleep(1000); // 1초 대기
    gm.addOnUtil.sleep = function(_delayInt) {
        var _startDate = new Date().getTime();
        while (new Date().getTime() < _startDate + _delayInt);
    };
    
    // 현재 Hash Url 주기
    gm.addOnUtil.getCurrentHashUrlStr = function() {
        /*
        var parser = document.createElement('a');
        parser.href = "http://example.com:3000/pathname/?search=test#hash";
        
        parser.protocol; // => "http:"
        parser.host;     // => "example.com:3000"
        parser.hostname; // => "example.com"
        parser.port;     // => "3000"
        parser.pathname; // => "/pathname/"
        parser.hash;     // => "#hash"
        parser.search;   // => "?search=test"       
        */
        var _aElement = document.createElement("a");
        _aElement.href = gm.addOnUtil.getCurrentUrlStr();
        return _aElement.hash;      
    };
    
    // 현재 Url Object로 반환
    gm.addOnUtil.getCurrentUrlObject = function() {
        /* 사용법
         * var _currentUrlObject = gm.addOnUtil.getCurrentUrlObject();
         * var _hostname = _currentUrlObject['hostname'];
         */
        var _aElement = document.createElement("a");
        _aElement.href = gm.addOnUtil.getCurrentUrlStr();
        return _aElement;
    };
    
    // 전역 변수 및 함수 선언시 존재 여부 파악 후 선언하기
    // 사용법: gm.addOnUtil.getPublicFunVarCreate('testPub', function() { window.testPub = function() { alert('testPub Test'); }; });
    var publicFunArray = [];
    gm.addOnUtil.getPublicFunVarCreate = function(_functionNameStr, _callBackFunction) {
        /*
        // Chrome에서만 hasOwnProperty 사용 가능
        if(window.hasOwnProperty(_functionNameStr)) {
            gm.addOnUtil.error('window.' + _functionNameStr + ': ' + gm.message.getMsg('functionCreateFail'));
        } else {
            if (typeof(_callBackFunction) === 'function') { 
                _callBackFunction();
            }
        }
        */
        if(publicFunArray[_functionNameStr]) {
            gm.addOnUtil.error('window.' + _functionNameStr + ': ' + gm.message.getErrorMsg('functionCreateFail'));
        } else {
            publicFunArray[_functionNameStr] = 'function';
            if (typeof(_callBackFunction) === 'function') { 
                _callBackFunction();
            }           
        }
    };
    // //전역 변수 및 함수 선언시 존재 여부 파악 후 선언하기    

    gm.addOnUtil.getIsNull = function(_getObject, _callBackSub) {
        var _resultBool = false;
        var _getObjectTypeStr = typeof(_getObject);
        // $.debug(jsFileNameStr, printStackTrace(), _getObjectTypeStr);
        if (_getObject === undefined) {
            _resultBool = true;
        }
        
        if (_getObject === null) {
            _resultBool = true;
        }
        
        if(_getObjectTypeStr === 'string')
        {
            _getObject = gm.addOnUtil.getStringTrim(_getObject);
            if (_getObject.length === 0) {
                _resultBool = true;
            }
        }
        
        if(typeof(_callBackSub) === 'function') {
            _callBackSub(_resultBool);
        } else {
            return _resultBool;
        }
    };
    
    gm.addOnUtil.getIsNullElement = function(_thisId, _thisMsg) {
        if(gm.addOnUtil.getIsNull($(_thisId).val())) {
            $(_thisId).focus();
            if(!gm.addOnUtil.getIsNull(_thisMsg)) {
                alert(_thisMsg);
            } else {
                alert('에러메시지를 넣어주세요\r\n$.isNullElement(\'#ID\', \'메세지\');');
            }
            return true;
        } else {
            gm.addOnUtil.debug(jsFileNameStr, printStackTrace(), 'isNullElement Check', _thisId + ' => ' + $(_thisId).val());
            return false;
        }
    };
    
    gm.addOnUtil.getArrayEmptyClean = function(_getArray) {
        return $.grep(_getArray,function(_tmpObject){return(_tmpObject);});
    };
    
    gm.addOnUtil.getStringTrim = function(_getStr) {
        return _getStr.replace(/(^\s*)|(\s*$)/g, '');
    };
    
    gm.addOnUtil.getStringSpaceRemove = function(_getStr) {
        return _getStr.replace(/(\s*)/g, '');
    };
    
    // Global Unique Identifier 만들기
    gm.addOnUtil.getGUID = function() {        
        var _getTime = new Date().getTime(); // Return the number of milliseconds since 1970/01/01
        function rndSub() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }       
        return '_' + _getTime + '_' + rndSub() + rndSub() + rndSub() + rndSub() + rndSub() + rndSub() + rndSub() + rndSub();
    };
    
    // 정규표현식으로 데이터 검증(i는 대소문자로 무시, g 끝까지)
    // 사용법: gm.addOnUtil.getCheckRegExp(/^([0-9a-zA-Z]){1,5}$/i,'12345')
    // userId: /^[a-z]([0-9a-z_])+$/i
    // eMail: /^([0-9a-zA-Z_-]{2,})@([0-9a-zA-Z_-]{2,})(\.[0-9a-zA-Z_-]{2,}){1,2}$/i
    // 특수문자금지: /^([0-9a-zA-Z])+$/i
    // 숫자만: /^([0-9])+$/i
    // 일반문자 1~5자리 : /^([0-9a-zA-Z]){1,5}$/i
    // http://www.w3schools.com/jsref/jsref_obj_regexp.asp
    gm.addOnUtil.getCheckRegExp = function(_regExpPatternStr, _valueStr) {
        try {
            if(_regExpPatternStr.test(_valueStr)) {
                return 1;
            } else {
                return 0;
            }
        } catch(_error) {
            alert('checkRegExp Error: ' + _error.message);
        }
    };  
    
    gm.addOnUtil.getXpathToJquerySelector = function(_xpathStr) {
        // eq은 0이 시작이고 nth-child은 1이 시작임 그렇기 때문에 nth-child가 보기는 편함
        // 그러나 기존 eq 방식으로 되어 있기 때문에 유지함(귀찮아서)
        var _jquerySelectorStr = '';
        try {               
            var _xpathArray = new Array();
            _xpathArray = _xpathStr.split('/');
            if(_xpathStr.indexOf('//*') !== -1) { // 상위 element에 id가 존재하는 것
                _xpathArray[2] = _xpathArray[2].substring(_xpathArray[2].indexOf('"') + 1, _xpathArray[2].indexOf(']') - 1);                
                _jquerySelectorStr = '#' + _xpathArray[2];              
                for(var _tmpInt = 3; _tmpInt < _xpathArray.length; _tmpInt++) {
                    var _selectNumInt = (_xpathArray[_tmpInt].substring(_xpathArray[_tmpInt].indexOf('[') + 1, _xpathArray[_tmpInt].indexOf(']'))) - 1;
                    if(_xpathArray[_tmpInt].indexOf('[') != -1) {                       
                        _jquerySelectorStr += ' > ' + _xpathArray[_tmpInt].substring(0,_xpathArray[_tmpInt].indexOf('[')) + ':' + 'eq('+_selectNumInt+')';
                    } else {                        
                        _jquerySelectorStr += ' > ' + _xpathArray[_tmpInt] + ':eq(0)';
                    }
                }
            } else { // 상위 element에 id가 존재하지 않는 것
                _jquerySelectorStr = _xpathArray[1];
                for(var _tmpInt = 2; _tmpInt < _xpathArray.length; _tmpInt++) {
                    var _selectNumInt = (_xpathArray[_tmpInt].substring(_xpathArray[_tmpInt].indexOf('[') + 1, _xpathArray[_tmpInt].indexOf(']'))) - 1;
                    if(_xpathArray[_tmpInt].indexOf('[') != -1) {                       
                        _jquerySelectorStr += ' > ' + _xpathArray[_tmpInt].substring(0,_xpathArray[_tmpInt].indexOf('[')) + ':' + 'eq('+_selectNumInt+')';
                    } else {                        
                        _jquerySelectorStr += " > " + _xpathArray[_tmpInt] + ':eq(0)';
                    }
                }
            }   
        } catch(_error) {
            alert('xpathToJquerySelector Error: ' + _error.message);
        }
        return _jquerySelectorStr;
    };  

    gm.addOnUtil.getTagName = function(_thisElement) {
        return $(_thisElement)[0].tagName.toLowerCase();
    };
    
    gm.addOnUtil.getJsonpToJson = function(_jsonpStr) {
        var _resultJson = _jsonpStr
            , _startIndexOfInt = _resultJson.indexOf('(')
            , _endIndexOfInt = _resultJson.indexOf(')', _startIndexOfInt);
        _resultJson = _resultJson.substring(_startIndexOfInt + 1, _endIndexOfInt); 
        _resultJson = JSON.parse(_resultJson);         
        // $.debug(jsFileNameStr, printStackTrace(), '_resultJson : ', _resultJson['respcode']);
        return _resultJson;
    };
    
    /* 사용법:
    var _testHashMap = {};
    _testHashMap['a'] = '1';
    _testHashMap['b'] = '2';
    var _testHashMap = {'a':'1', 'b':'2'}; => Object {a: "1", b: "2"}
    var _testArray = ['a', 'b']; => ["a", "b"]
    gm.addOnUtil.getArrayToStr(_testHashMap); => "a=1&b=2"
    gm.addOnUtil.getArrayToStr(_testArray); => "0=a&1=b"
    */
    gm.addOnUtil.getArrayToStr = function(_thisArray) {
        var _resultString = '';
        for(var _tmpObject in _thisArray){        
            if(!gm.addOnUtil.getIsNull(_thisArray[_tmpObject])) {
                if(typeof(_thisArray[_tmpObject]) !== 'function') {
                    _resultString += _tmpObject + '=' + _thisArray[_tmpObject] + '&';
                }
            }
        }
        _resultString = _resultString.substring(0, _resultString.length-1);
        return _resultString;
    };
    
    /* 사용법:
    var _testHashMap = {'a':'1', 'b':'2'}; => Object {a: "1", b: "2"}
    var _testArray = ['a', 'b']; => ["a", "b"]
    gm.addOnUtil.getArrayLength(_testHashMap); => 2
    gm.addOnUtil.getArrayLength(_testArray); => 2
    */
    gm.addOnUtil.getArrayLength = function(_thisArray) {
        // IE7, 9을 위해서 Object.keys 를 생성
        if (!Object.keys) {
            Object.keys = (function () {
                'use strict';
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                    dontEnums = [
                      'toString',
                      'toLocaleString',
                      'valueOf',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;
            
                return function (obj) {
                  if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                  }
            
                  var result = [], prop, i;
            
                  for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                      result.push(prop);
                    }
                  }
            
                  if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                      if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                      }
                    }
                  }
                  return result;
                };
              }());
        }
        // //IE7, 9을 위해서 Object.keys 를 생성
        
        return Object.keys(_thisArray).length;
    };
    
    /* 사용법:
    gm.addOnUtil.getArrayToJsonStr(_testHashMap) => "{"a":"1","b":"2"}"
    gm.addOnUtil.getArrayToJsonStr(_testArray) => "["a","b"]"
    */
    gm.addOnUtil.getArrayToJsonStr = function(_getArray) {
        return JSON.stringify(_getArray);
    };
    
    /* 사용법: 
    var _testStr = '[{"id":"Outsider","sex":"male"},{"id":"Zziuni","sex":"male"}]';
    gm.addOnUtil.getHashMapStrToHashMapObject(_testStr);
    gm.addOnUtil.getHashMapStrToHashMapObject(gm.addOnUtil.getArrayToJsonStr(_testHashMap)) => Object {a: "1", b: "2"}
    */
    gm.addOnUtil.getHashMapStrToHashMapObject = function(_thisStr) {
        return eval('(' + JSON.parse(JSON.stringify(_thisStr)) + ')');
    };
    
    gm.addOnUtil.getGetValueStrToHashMapObject = function(_thisStr) {
        var _resultStr = '';
        // var _thisStr = 'recvTypeCode=T1&recvName=%EC%95%88%EB%85%95&recvCallNo=01042610100&recvEmail=test%40gmail.com&appStaTime=0000&appEndTime=2330';
        var _thisStrArray = _thisStr.split('&');
        for(var _thisStrArrayIndexInt = 0, _thisStrArrayLengthInt = _thisStrArray.length; _thisStrArrayIndexInt < _thisStrArrayLengthInt; _thisStrArrayIndexInt++) {
            var _resultOneArray = _thisStrArray[_thisStrArrayIndexInt].split('=');
            _resultStr += ',"' + _resultOneArray[0] + '":"' + _resultOneArray[1] + '"';
        }
        _resultStr = _resultStr.substring('1');
        _resultStr = '{' + _resultStr + '}';
        return gm.addOnUtil.getHashMapStrToHashMapObject(_resultStr);
    };
    
    /* 함수설명: Form ID를 받아서 파라메터를 String으로 만든 다음 다시 Object로 변환시키는 함수
     */ 
    gm.addOnUtil.getFormDataObject = function(_thisIdStr) {
        /// 함수설명: Form ID를 받아서 파라메터를 String으로 만든 다음 다시 Object로 변환시키는 함수
        return gm.addOnUtil.getGetValueStrToHashMapObject($(_thisIdStr).serialize());        
    };
    
    // 사용법:
    /*
    gm.addOnUtil.getInHashObject('a', _testHashMap ) => true
    gm.addOnUtil.getInHashObject('c', _testHashMap ) => false
    1단 HashArray만 됨 {'a':{'b':'1'}} 일 경우 b는 없다고 나옴
    */
    gm.addOnUtil.getInHashObject = function(_thisKeyStr, _thisObject) {
        // Array에서 존재 유무 파악 방법이 가장 빠른게 Array as map 느린게 hasOwnProperty
        // 참조 사이트: http://jsperf.com/checking-if-a-key-exists-in-a-javascript-array
        var _existBool = false;
        if(_thisObject[_thisKeyStr] !== undefined) {
            _existBool = true;
        }
        return _existBool;
    };
    
    gm.addOnUtil.getInHashArray = function(_thisObject, _thisArray) {
        /* 사용법:
         * gm.addOnUtil.getInHashArray({'a':'1','b':'2'}, _testHashMapArray);
         * 결과값(없음: -1, 있음: index)
         */
        var _resultInt = -1;
        for(var _indexKeyInt in _thisArray) {
            if(JSON.stringify(_thisArray[_indexKeyInt]) ===  JSON.stringify(_thisObject)) {
                _resultInt = _indexKeyInt;
            }
        }
        return _resultInt;
    };
    
    gm.addOnUtil.getArrayDuplicateRemove  = function(_thisArray) {
        var _returnArray = [];
        $.each(_thisArray, function(_indexInt, _value){
            if($.inArray(_value, _returnArray) === -1) {
                _returnArray.push(_value);
            }
        });
        return _returnArray;
    };
    
    /* 미완성
    gm.addOnUtil.hashArrayToString = function(_getArray) {
        var _resultString = '';
        if(!gm.addOnUtil.getIsNull(_getArray) && gm.addOnUtil.hashArrayLength(_getArray) !== 0) {
            var _getArrayCountInt = gm.addOnUtil.hashArrayLength(_getArray);
            
            if(_getArrayCountInt === 1) {
                for(var _tmpObject in _getArray){        
                    if(!gm.addOnUtil.getIsNull(_getArray[_tmpObject])) {
                        _resultString += _tmpObject + '=' + _getArray[_tmpObject] + '&';
                    }
                }
                _resultString = _resultString.substring(0, _resultString.length-1);
            } else {
                for(var _tmpGetArrayCountInt = 0; _tmpGetArrayCountInt < _getArrayCountInt; _tmpGetArrayCountInt++) {
                    var _tmpGetArray = _getArray[_tmpGetArrayCountInt];
                    for(var _tmpObject in _tmpGetArray){        
                        if(!gm.addOnUtil.getIsNull(_tmpGetArray[_tmpObject])) {
                            _resultString += _tmpObject + '=' + _tmpGetArray[_tmpObject] + '&';
                        }
                    }
                    _resultString = _resultString.substring(0, _resultString.length-1) + '|';
                }
                _resultString = '[' + _resultString.substring(0, _resultString.length-1) + ']';
                _resultString = _resultString.replace(/\|/g, '][');
            }
        }
        return _resultString;
    };
    */
    
    gm.addOnUtil.getJsonStrParamValue = function(_jsonStr, _getJsonParam) {
        var _resultStr = ''; 
        var _jsonParamStrIndexStartInt = _jsonStr.indexOf(_getJsonParam);
        _jsonParamStrIndexStartInt = _jsonStr.indexOf(':', _jsonParamStrIndexStartInt + 1);
        _jsonParamStrIndexStartInt = _jsonStr.indexOf('"', _jsonParamStrIndexStartInt + 1);
        var _jsonParamStrIndexEndInt = _jsonStr.indexOf('"', _jsonParamStrIndexStartInt + 1);
        _resultStr = _jsonStr.substring(_jsonParamStrIndexStartInt + 1, _jsonParamStrIndexEndInt);
        return _resultStr;      
    };
    
    // GET 방식으로 '&' 가 '%26'으로 올때 처리
    gm.addOnUtil.getQueryParamValueForGetMethod = function(_getStr, _getParam) {
        var _resultStr = ''; 
        _getStr = _getStr.replace(/%26/g, '&');     
        var _paramStrIndexStartInt = _getStr.indexOf(_getParam);
        _paramStrIndexStartInt = _getStr.indexOf('=', _paramStrIndexStartInt + 1);
        var _paramStrIndexEndInt = _getStr.indexOf('&', _paramStrIndexStartInt + 1);
        _resultStr = _getStr.substring(_paramStrIndexStartInt + 1, _paramStrIndexEndInt);
        return _resultStr;      
    };  
    // //GET 방식으로 '&' 가 '%26'으로 올때 처리
    
    gm.addOnUtil.getDifferenceDurationDay = function(_endDate, _firstDate) {
        // http://msdn.microsoft.com/ko-kr/library/ee532932(v=vs.94).aspx
        return (_endDate - _firstDate) / 86400000;
    };
    
    gm.addOnUtil.getPriceWithCommasStr = function(_thisNumber) {
        // return parseInt(_thisNumber);
        
        if(typeof(_thisNumber) === 'number') {
            _thisNumber = _thisNumber.toString();
        } else {
            _thisNumber = _thisNumber.replace(/,/g,'').toString();
        }
        
        _thisNumber = parseInt(_thisNumber);
        var minusBool = false;
        if(_thisNumber < 0) {
            minusBool = true;
        }
        
        _thisNumber = String(parseInt(_thisNumber));
        if(!gm.addOnUtil.getCheckRegExp(/^([0-9])+$/i, _thisNumber)) {
            // alert(gm.message.getErrorMsg('onlyNumber'));
            if(_thisNumber.match(/[0-9]/g) !== null) {
                _thisNumber = _thisNumber.match(/[0-9]/g).join('');
            } else {
                return '';
            }
        }
        
        // 앞에 숫자 0을 못 오게 함        
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(_thisNumber)) {
            _thisNumber = _thisNumber.replace(pattern, "$1,$2");
        }
        // //앞에 숫자 0을 못 오게 함
        return (minusBool) ? '-'+_thisNumber : _thisNumber;
    };
    
    gm.addOnUtil.getMultiSelectElementValueArray = function(_thisSelecterStr) {
        var resultArray = '';
        resultArray = $.map($(_thisSelecterStr), function(_thisElement, _thisIndex) { 
            return $(_thisElement).val(); 
        });
        return resultArray;
    };
    
    gm.addOnUtil.getMultiSelectElementValueJoinStr = function(_thisSelecterStr, _thisJoinSplitStr) {
        var resultStr = '';
        resultStr = $.map($(_thisSelecterStr), function(_thisElement, _thisIndex) { 
            return $(_thisElement).val(); 
        }).join(_thisJoinSplitStr);
        return resultStr;
    };
    
    gm.addOnUtil.getWorldTimeStr = function(_thisGmt) {
        function leadingZeros(_thisDate, _thisDigits) {
            var _resultZero = '';
            _thisDate = _thisDate.toString();
                    
            if (_thisDate.length < _thisDigits) {
                for (var _tmpInt = 0; _tmpInt < _thisDigits - _thisDate.length; _tmpInt++) {
                    _resultZero += '0';
                }
            }
            return _resultZero + _thisDate;
        }
        
        var _currentDate = new Date();
        var _currentTimeZone = _currentDate.getTime() + (_currentDate.getTimezoneOffset() * 60000) + (_thisGmt * 3600000);
        _currentDate.setTime(_currentTimeZone);
        
        var _worldTimeStr =
            leadingZeros(_currentDate.getFullYear(), 4) + '-' +
            leadingZeros(_currentDate.getMonth() + 1, 2) + '-' +
            leadingZeros(_currentDate.getDate(), 2) + ' ' +        
            leadingZeros(_currentDate.getHours(), 2) + ':' +
            leadingZeros(_currentDate.getMinutes(), 2) + ':' +
            leadingZeros(_currentDate.getSeconds(), 2);
        
        return _worldTimeStr;
    };
    
    /* 미완성
    gm.addOnUtil.getCurrentGmt = function() {
        var _currentDate = new Date();
        var _gmt0Time = _currentDate.getTime() + (_currentDate.getTimezoneOffset() * 60000) + (0 * 3600000);
        var _gmt9Time = _currentDate.getTime() + (_currentDate.getTimezoneOffset() * 60000) + (9 * 3600000);
    };
    */
     
    gm.addOnUtil.getKoreaTimeStr = function() {
        return gm.addOnUtil.getWorldTimeStr(+9);
    };
    
    // Attribute의 최대값 구하기
    // 사용법: gm.addOnUtil.getAttributeValueMaxInt({'jquerySelect':'*[xpathselect="true"]', 'attrName':'xpathselectindex'});
    gm.addOnUtil.getAttributeValueMaxInt = function(_thisArgumentObject) {
        var _resultMaxInt = 0;
        var _selectElementArray = $.map($(_thisArgumentObject.jquerySelect), function(_thisElement, index) { return $(_thisElement).attr(_thisArgumentObject.attrName); });
        _resultMaxInt = Math.max.apply(null, _selectElementArray);
        if(_resultMaxInt === -Infinity) {
            _resultMaxInt = 0;
        }
        return _resultMaxInt;
    };
    
    // 현재 URL 주기    
    gm.addOnUtil.getCurrentUrlStr = function() {
        return document.URL;
    };    
    
    // 현재 User-Agent
    gm.addOnUtil.getUserAgentStr = function() {
        return navigator.userAgent;         
    };   
    
    // 현재 Ie 버전(Ie가 아니면 100)
    gm.addOnUtil.getIeVersionFloat = function() {
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
    
    // 현재 사용자 IP 확인(jsonp는 async가 무조건 true 이기 때문에 작동 안 함, 전역 변수로 선언해서 확인 해야 함)
    gm.addOnUtil.getMyIp = function() {     
        gm.ajaxUtil.getJsonp('http://ipinfo.io', '', 'ipInfo', function(_thisResult) {
            var _ipStr = _thisResult.ip;                
            gm.addOnUtil.debug(jsFileNameStr, printStackTrace(), _ipStr);
        });
    };  
    
    // iframe 일 경우 src 같고 오기
    // 현재 iframe 동작할 때 iframe의 src 받아오기
    gm.addOnUtil.getParentUrl = function() {
        var _isInIframe = (parent !== window),
            _parentUrl = null;
    
        if (_isInIframe) {
            _parentUrl = document.referrer;
        }
    
        return _parentUrl;
    };
    // iframe 일 경우 src 같고 오기
    
    // 엘리먼트 Jquery 이벤트 확인
    gm.addOnUtil.getJqueryEvent = function(_thisElement) {
        return ($(_thisElement).data("events"));
    };
    
    /* 사용법
     * gm.addOnUtil.getDayOfTheWeekKr('2014-10-23');
     */
    gm.addOnUtil.getDayOfTheWeekKr = function(_thisDateStr) {
        var _dayOfTheWeek = new Date(_thisDateStr.substr(5,2)+'/'+_thisDateStr.substr(8,2)+'/'+_thisDateStr.substr(0,4)).toDateString().substr(0,3);
        if(_dayOfTheWeek === 'Mon') _dayOfTheWeek = '월';
        if(_dayOfTheWeek === 'Tue') _dayOfTheWeek = '화';
        if(_dayOfTheWeek === 'Wed') _dayOfTheWeek = '수';
        if(_dayOfTheWeek === 'Thu') _dayOfTheWeek = '목';
        if(_dayOfTheWeek === 'Fri') _dayOfTheWeek = '금';
        if(_dayOfTheWeek === 'Sat') _dayOfTheWeek = '토';
        if(_dayOfTheWeek === 'Sun') _dayOfTheWeek = '일';
        return _dayOfTheWeek;
    };
    
    // 사용법: gm.addOnUtil.getDateConvertInsertMinusStr('20141201') => "2014-12-01"
    gm.addOnUtil.getDateConvertInsertMinusStr = function(_thisDateStr) {
        return _thisDateStr.substr(0,4) + '-' + _thisDateStr.substr(4,2) + '-' + _thisDateStr.substr(6,2);
    };
    
    // 사용법: gm.addOnUtil.getDateConvertInsertMinusToGmtStr('2014-12-01') => "12/01/2014"
    gm.addOnUtil.getDateConvertInsertMinusToGmtStr = function(_thisDateStr) {
        return _thisDateStr.substr(5,2) + '/' + _thisDateStr.substr(8,2) + '/' + _thisDateStr.substr(0,4);
    };
    
    // 사용법: gm.addOnUtil.getDateTimeConvertInsertMinusColonStr('20141201151020') => "2014-12-01 15:10:20"
    gm.addOnUtil.getDateTimeConvertInsertMinusColonStr = function(_thisDateStr) {
        return _thisDateStr.substr(0,4) + '-' + _thisDateStr.substr(4,2) + '-' + _thisDateStr.substr(6,2) + ' ' + _thisDateStr.substr(8,2) + ':' + _thisDateStr.substr(10,2) + ':' + _thisDateStr.substr(12,2);
    };
    
    // URL 파라메터를 갖고 다니면서 페이지 이동(히스토리에 남음)
    /*
     * 사용법: gm.addOnUtil.setLocationHref('#/pc/private/resv/myReservation');
     */
    gm.addOnUtil.setLocationHref= function(_thisHashUrl) {      
        var _currentUrl = gm.addOnUtil.getCurrentUrlStr();
        var _currentUrlArray = _currentUrl.match(/(.*)#(.*)\?(.*)/);
        if(_currentUrlArray == null) {
            _currentUrlArray = _currentUrl.match(/(.*)#(.*)/);
            if(_currentUrlArray == null) {
               location.href =_currentUrl+_thisHashUrl; 
            } else {
               location.href = _currentUrlArray[1]+_thisHashUrl;
            }
        } else {
           location.href = _currentUrlArray[1]+_thisHashUrl+'?'+_currentUrlArray[3];
        }  
    };
    // URL 파라메터를 갖고 다니면서 페이지 이동(히스토리에 남음)
    
    // URL 파라메터를 갖고 다니면서 페이지 이동(히스토리에 남지 않음)
    /*
     * 사용법: gm.addOnUtil.setLocationReplace('#/pc/private/resv/myReservation');
     */
    gm.addOnUtil.setLocationReplace= function(_thisHashUrl) {      
        var _currentUrl = gm.addOnUtil.getCurrentUrlStr();
        var _currentUrlArray = _currentUrl.match(/(.*)#(.*)\?(.*)/);
        if(_currentUrlArray == null) {
            _currentUrlArray = _currentUrl.match(/(.*)#(.*)/);
            if(_currentUrlArray == null) {
               location.replace(_currentUrl+_thisHashUrl); 
            } else {
               location.replace(_currentUrlArray[1]+_thisHashUrl);
            }
        } else {
           location.replace(_currentUrlArray[1]+_thisHashUrl+'?'+_currentUrlArray[3]);
        }  
    };
    // URL 파라메터를 갖고 다니면서 페이지 이동(히스토리에 남지 않음)
    
    gm.addOnUtil.objQueryStringToJSON = function(strQueryString) {
      var objPairs = strQueryString.split('&');
      
      var result = {};
      objPairs.forEach(function(strPair) {
          var objPair = strPair.split('=');
          result[objPair[0]] = decodeURIComponent(objPair[1] || '');
      });

      return JSON.parse(JSON.stringify(result));
    };
    
    // 자주 쓰는 함수는 Jquery 확장으로 처리
    $.extend({debug:gm.addOnUtil.debug}); // gm.addOnUtil.debug를 $.debug로 선언하기
    $.extend({errorMsg:gm.addOnUtil.error}); // gm.addOnUtil.error를 $.errorMsg로 선언하기($.error은 기본으로 있음)
    $.extend({sleep:gm.addOnUtil.sleep});
    $.extend({offOn:gm.addOnUtil.offOn});
    $.extend({inHashObject:gm.addOnUtil.getInHashObject});
    $.extend({inHashArray:gm.addOnUtil.getInHashArray});
    $.extend({isNull:gm.addOnUtil.getIsNull});
    $.extend({isNullElement:gm.addOnUtil.getIsNullElement});
    $.extend({getFormDataObject:gm.addOnUtil.getFormDataObject});
    
    // Jquery Url Get Query String Parameter 받기
    // 사용법 : $.getUrlQueryStringParameter('ParameterName');
    $.extend({getUrlQueryStringParameter: function(_paramNameStr){
          var _resultStr = '';
          var _currentHrefStr = gm.addOnUtil.getCurrentUrlStr();          
          var _existBool = 0;
          var _tmpParamNameStr = _paramNameStr + '=';
          var _paramNameLengthInt = _tmpParamNameStr.length;
          if ( _currentHrefStr.indexOf('?') > -1 ){
            var _onlyQueryStringStr = _currentHrefStr.substr(_currentHrefStr.indexOf('?')+1);           
            var _onlyQueryStringArray = _onlyQueryStringStr.split("&");
            for (var _tmpOnlyQueryStringArrayLength = 0; _tmpOnlyQueryStringArrayLength < _onlyQueryStringArray.length; _tmpOnlyQueryStringArrayLength++ ){           
              if (_onlyQueryStringArray[_tmpOnlyQueryStringArrayLength].substr(0, _paramNameLengthInt) == _tmpParamNameStr){
                _resultStr = _onlyQueryStringArray[_tmpOnlyQueryStringArrayLength].substr(_paramNameLengthInt);             
                _existBool = 1;
                break;
              }
            }
          }
          if (_existBool === 0) return null;
          return _resultStr;
        }
    });
    
    // Jquery Url Get Query String Json Value Parameter 받기(IE8 이상만 지원 됨)
    // Json 참조 사이트 : http://msdn.microsoft.com/ko-kr/library/cc836459(v=vs.94).aspx
    // 사용법 : $.getUrlQueryStringJsonParameter(_jsonParamNameStr);
    // 결과값은 Object 데이터로 리턴 됨
    $.extend({getUrlQueryStringJsonParameter: function(_jsonParamNameStr){
          var _resultObject = '';
          var _currentHrefStr = gm.addOnUtil.getCurrentUrlStr();          
          var _existBool = 0;
          var _tmpParamNameStr = _jsonParamNameStr + '=';
          var _paramNameLengthInt = _tmpParamNameStr.length;
          if ( _currentHrefStr.indexOf('?') !== -1 ){
            var _onlyQueryStringStr = _currentHrefStr.substr(_currentHrefStr.indexOf('?') + 1);         
            var _onlyQueryStringArray = _onlyQueryStringStr.split("&");
            for (var _tmpOnlyQueryStringArrayLength = 0; _tmpOnlyQueryStringArrayLength < _onlyQueryStringArray.length; _tmpOnlyQueryStringArrayLength++ ){           
              if (_onlyQueryStringArray[_tmpOnlyQueryStringArrayLength].substr(0, _paramNameLengthInt) == _tmpParamNameStr){
                _resultObject = _onlyQueryStringArray[_tmpOnlyQueryStringArrayLength].substr(_paramNameLengthInt);
                if(_resultObject.indexOf('}') !== -1) {
                    _resultObject = _resultObject.substr(0, _resultObject.indexOf('}') + 1);
                }
                
                var _jsonDataStr = decodeURIComponent(_resultObject);
                var _jsonDataObject = JSON.parse(_jsonDataStr);
                _resultObject = _jsonDataObject;
                _existBool = 1;
                break;
              }
            }
          }
          if (_existBool === 0) return null;
          return _resultObject;
        }
    });
    // //자주 쓰는 함수는 Jquery 확장으로 처리   
    
    // Jquery Funtion 확장
    // 사용법: $(this).getXpath();
    $.fn.getXpath = function(_rootNodeNameStr) {
        var positionInt,
            $thisNode = this.first(),
            nodeNameStr = $thisNode.prop('nodeName'),
            $sibSameNameAndSelfStr = $thisNode.siblings(nodeNameStr).addBack(),
            stepsArray = [], 
            $parentObject = $thisNode.parent(),
            parentNameStr = $parentObject.prop('nodeName');
        
        positionInt = ($sibSameNameAndSelfStr.length > 1) ? '['+($sibSameNameAndSelfStr.index($thisNode)+1)+']' : '';
        stepsArray.push(nodeNameStr+positionInt);
 
        while ($parentObject.length == 1 && parentNameStr !== _rootNodeNameStr && parentNameStr !== '#document'){
            $sibSameNameAndSelfStr = $parentObject.siblings(parentNameStr).addBack();
            positionInt = ($sibSameNameAndSelfStr.length > 1) ? '['+($sibSameNameAndSelfStr.index($parentObject)+1)+']' : '';
            stepsArray.push(parentNameStr+positionInt);
            $parentObject = $parentObject.parent();
            parentNameStr = $parentObject.prop('nodeName');
        }
        return '/'+stepsArray.reverse().join('/').toLowerCase();
    };
    
    // 텍스트 토글기능
    // 사용법: $(this).textToggle('선택사항 일괄적용 더보기', '선택사항 일괄적용');
    $.fn.textToggle = function(_beforeTextStr, _afterTextStr) {
        $(this).text(function(_thisIndex, _thisTextStr){
            return _thisTextStr === _beforeTextStr ? _afterTextStr : _beforeTextStr;
        });
    };
    // //텍스트 토글기능
    
    // 엘리먼트에 대해서 보이기 전 후에 스니핑
    // $(document).on('beforeShow', '#viewDataDiv', function() { alert('beforeShow'); });
    // $(document).on('afterShow', '#viewDataDiv', function() { alert('afterShow'); });
    var _oldShow = $.fn.show;
    $.fn.show = function() {
        var _argsArray = Array.prototype.slice.call(arguments);        
        var _callbackSub = null;
        var _callbackArgIndex = -1;
        
        if (!this.selector) {
            _oldShow.apply(this, _argsArray);
            return this;
        }

        if (_argsArray.length === 2) {
            if ($.isFunction(_argsArray[1])) {
                _callbackSub = _argsArray[1];
                _callbackArgIndex = 1;
            } 
        } else if (_argsArray.length === 3) {
            _callbackSub = _argsArray[2];
            _callbackArgIndex = 2;
        }

        return $(this).each(function () {
            var _thisObject = $(this),
                oldCallback = _callbackSub,
                newCallback = function () {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(_thisObject);
                    }
                    _thisObject.trigger('afterShow');
                };
                
            if (_callbackSub) {
                _argsArray[_callbackArgIndex] = newCallback;
            } else {
                _argsArray.push(newCallback);
            }
            
            _thisObject.trigger('beforeShow');
            _oldShow.apply(_thisObject, _argsArray);
        });
    };
    // //엘리먼트에 대해서 보이기 전 후에 스니핑
    
    // Jquery outerHtml 기능 추가
    // 사용법 : $('#id').outerHtml();
    $.fn.outerHtml = function() {
        var _thisElement = $(this);
        if(!_thisElement[0]) return '';  
        if (_thisElement[0].outerHtml) {
            return el[0].outerHtml;
        } else {
            var _tmpContent = _thisElement.wrap('<p/>').parent().html();
            _thisElement.unwrap();
            return _tmpContent;
        }
    };  
    
    // Children Text를 제외하고 현재 엘리먼트의 Text만 갖고오기
    $.fn.noChildrenText = function() {
        return $(this).clone().children().remove().end().text();
    };
    // //Children Text를 제외하고 현재 엘리먼트의 Text만 갖고오기
    
    // element 자리 이동
    // 사용법: $("#awesome ul li:eq(1)").exchangePositionWith("#awesome ul li:eq(3)");
    $.fn.exchangePositionWith = function(selector) {
        var other = $(selector);
        this.after(other.clone('true'));
        other.after(this).remove();
    };
    // //element 자리 이동
    // //Jquery Funtion 확장  
        
    // JavaScript prototype 확장
    // Date 타입 기능 확장    
    // Date 타입 yyyy-mm-dd 형식으로 반환
    // 사용법 : new Date().yyyy_mm_ddStr();
    Date.prototype.yyyy_mm_ddStr = function() {
        var _yyyyStr = this.getFullYear().toString();
        var _mmStr = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var _ddStr  = this.getDate().toString();
        if(_mmStr.length === 1) {
            _mmStr = '0' + _mmStr;
        }
        if(_ddStr.length === 1) {
            _ddStr = '0' + _ddStr;
        }
        
        return _yyyyStr + '-' + _mmStr + '-' + _ddStr;
    }; 
    
    Date.prototype.yyyy_mm_dd_hh_mm_ssStr = function() {
        var _yyyyStr = this.getFullYear().toString();
        var _mmStr = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var _ddStr  = this.getDate().toString();
        var _hourStr  = this.getHours().toString();
        var _minuteStr  = this.getMinutes().toString();
        var _secondStr  = this.getSeconds().toString();
        if(_mmStr.length === 1) {
            _mmStr = '0' + _mmStr;
        }
        if(_ddStr.length === 1) {
            _ddStr = '0' + _ddStr;
        }
        if(_hourStr.length === 1) {
            _hourStr = '0' + _hourStr;
        }
        if(_minuteStr.length === 1) {
            _minuteStr = '0' + _minuteStr;
        }
        if(_secondStr.length === 1) {
            _secondStr = '0' + _secondStr;
        }
        
        return _yyyyStr + '-' + _mmStr + '-' + _ddStr + ' '  + _hourStr + ':'  + _minuteStr  + ':'  + _secondStr;
    }; 
    
    Date.prototype.yyyymmddStr = function() {
        var _yyyyStr = this.getFullYear().toString();
        var _mmStr = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var _ddStr  = this.getDate().toString();
        if(_mmStr.length === 1) {
            _mmStr = '0' + _mmStr;
        }
        if(_ddStr.length === 1) {
            _ddStr = '0' + _ddStr;
        }
        
        return String(_yyyyStr) + String(_mmStr) + String(_ddStr);
    }; 
    
    /* 사용법
     * new Date().monthFirstDate();
     */
    Date.prototype.monthFirstDate = function() {
        var _yyyyStr = this.getFullYear().toString();
        var _mmStr = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var _ddStr  = this.getDate().toString();
        var date = new Date(_mmStr + '/' + _ddStr + '/' + _yyyyStr);
        var _firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return _firstDate;
    }; 
    
    /* 사용법
     * new Date().monthLastDate();
     */
    Date.prototype.monthLastDate = function() {
        var _yyyyStr = this.getFullYear().toString();
        var _mmStr = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var _ddStr  = this.getDate().toString();
        var date = new Date(_mmStr + '/' + _ddStr + '/' + _yyyyStr);
        var _lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return _lastDate;
    }; 
    // //Date 타입 yyyy-mm-dd 형식으로 반환
    
    // 일, 월 더하거나 빼서 반환
    // 사용법 : new Date().addDay(10);
    Date.prototype.addDay = function(_addDayInt) { 
        var _thisDate = new Date(this);
        _thisDate = _thisDate.setDate(_thisDate.getDate() + _addDayInt);
        return new Date(_thisDate);
    };
    
    // 사용법 : new Date().addMonth(10);
    Date.prototype.addMonth = function(_addMonthInt) { 
        var _thisDate = new Date(this);
        _thisDate = _thisDate.setDate(_thisDate.getMonth() + _addMonthInt);
        return new Date(_thisDate);
    };
    // //일, 월 더하거나 빼서 반환
    // //Date 타입 기능 확장
    
    // Array 타입 기능 확장
    // Array Index 변환
    /* 확장기능은 기본 JavaScript에서 오류 처리 때문에 힘들기 때문에 Array는 프로토타입 기능 확장 제거
     * 오류는 for(var _IndexObject in arrayTmp) 하면 _indexObject에 indexChange가 생기기 때문임
    /*
    Array.prototype.indexChange = function (_oldIndexInt, _newIndexInt) {
        if (_newIndexInt >= this.length) {
            var k = _newIndexInt - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(_newIndexInt, 0, this.splice(_oldIndexInt, 1)[0]);
        return this; // for testing purposes
    };
    */
    // //Array Index 변환
    // //Array 타입 기능 확장
    // //prototype 확장
});