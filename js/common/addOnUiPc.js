'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/common/addOnUiPc.js';
    gm.addOnUiPc = function() {}; // addOnUiPc 변수 API 네임 스페이스 선언
    window.popUpKeyArray = new Array(); // popUp용 Key 글로벌 변수
    
    // Dynamic popUp
    // 사용법: gm.addOnUiPc.popUp('open', 'title', '<div>Test</div>', 0, function() {alert('성공');}, function() {alert('닫기');});
    // 사용법: gm.addOnUiPc.popUp('open', 'title', '<div>Test</div>', 1);
    // 사용법: gm.addOnUiPc.popUp('close', 'title');
    // popUp용 Key 글로벌 변수 사용법: popUpKeyArray['title']
    // 주의: key는 title 임으로 title이 중복되지 않게 사용해야 함
    // http://jqueryui.com/dialog/#modal-form
    // http://api.jqueryui.com/dialog/
    gm.addOnUiPc.popUp = function(_showTypeStr, _titleStr, _inDivStr, _xButtonVisualBool, _applySub, _cancleSub) {  
        if(_showTypeStr === 'open' && $(_inDivStr).prop('nodeName') !== 'DIV')
        {
            alert('gm.addOnUiPc.popUp (_inDivStr) Error: Only Div');
            return false;
        }
        
        if(_showTypeStr === 'open')
        {   
            var _popUpIdStr = 'popUpDiv' + gm.addOnUtil.getGUID();
            var _buttonOptionArray = '';
            if(typeof(_applySub) === 'function')
            {
                _buttonOptionArray = { "적용": function() {_applySub();} , "취소": function() {delete popUpKeyArray[_titleStr]; _cancleSub(); $(this).dialog("close");}};
            }
            
            popUpKeyArray[_titleStr] = _popUpIdStr;
            $('body').append('<div id="' + _popUpIdStr + '" title="' + _titleStr + '" dynamic="true">' + _inDivStr + '</div>');
            $('#'+_popUpIdStr).dialog({
                autoOpen: true
                , resizable: false
                , modal: true // 팝업 이외의 창에 대해 클릭 차단
                // , width: 400
                // , height: 450
                , overlay: { backgroundColor: "#000", opacity: 0.5 }
                , buttons: _buttonOptionArray // 밑에 Close 버튼 생성 및 처리 가능하게             
                // , show: {
                  // effect: "blind"
                  // , duration: 1000
                // }
                , hide: {
                  effect: "explode"
                  , duration: 1000
                }
            });
            $('#'+_popUpIdStr).parent().addClass('redMondC').effect('highlight', 2000); //팝업의 부모창에 redMondC 테마 적용               
            // 자체(상단 위에) X 버튼 숨기기
            if(!_xButtonVisualBool)
            {
                $('#'+_popUpIdStr).parent().find('.ui-dialog-titlebar-close').hide();
            }           
            // 타이틀이 '경고' 글자색 red
            if(_titleStr === '경고')
            {
                $('#'+_popUpIdStr).parent().find('.ui-dialog-titlebar').css({'color': 'red'});
            }   
            // $('#'+_popUpIdStr).dialog('close'); // 성공은 _applySub에서 처리 하도록 함
        }
        else if(_showTypeStr === 'close')
        {
            var _popUpIdStr = popUpKeyArray[_titleStr];
            $('#'+_popUpIdStr).dialog('close');
            delete popUpKeyArray[_titleStr];
        }
        else
        {
            alert('gm.addOnUiPc.popUp (_showTypeStr) Error');
        }
    };  
    
    // Dynamic jqGrid
    // 사용법 : jqGridInitPub('jqGridTable', 'jqGridPagerDiv');
    /* 사용법 : 
    gm.addOnUtil.getPublicFunVarCreate('ajaxCallManageBlockListPub', function() {
        window.ajaxCallManageBlockListPub = function(_argumentJson) {
            var _pageNumStr = _argumentJson.page - 1;
            var _ajaxResultJson = {'columnName': {'ID':'ID','ROOM':'객실','ROOM_TYPE':'타입','HISTORY':'변경이력', '2014-08-08':'8/8(금)','2014-08-09':'8/9(토)','2014-08-10':'8/10(일)','2014-08-11':'8/11(월)','2014-08-12':'8/12(화)'}, 
                    'page':_argumentJson.page,'total':'11','records':'110','rows':[
                    {'ID':_pageNumStr+'1','cell':{'ID':_pageNumStr+'1','ROOM':'디럭스','ROOM_TYPE':'싱글'+_pageNumStr,'HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'1','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"rowspan": "3"}}}},
                    {'ID':_pageNumStr+'2','cell':{'ID':_pageNumStr+'2','ROOM':'디럭스','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'2','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'3','cell':{'ID':_pageNumStr+'3','ROOM':'디럭스','ROOM_TYPE':'더블','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'3','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'4','cell':{'ID':_pageNumStr+'4','ROOM':'스위트','ROOM_TYPE':'싱글','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'4','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"rowspan": "7"}}}},
                    {'ID':_pageNumStr+'5','cell':{'ID':_pageNumStr+'5','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'6','cell':{'ID':_pageNumStr+'6','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'7','cell':{'ID':_pageNumStr+'7','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'8','cell':{'ID':_pageNumStr+'8','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+'9','cell':{'ID':_pageNumStr+'9','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                    {'ID':_pageNumStr+1+'0','cell':{'ID':_pageNumStr+1+'0','ROOM':'스위트','ROOM_TYPE':'트윈','HISTORY':'2014-08-25 10:00:15 tobi', '2014-08-08':_pageNumStr+'5','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51', 'attr': {ROOM: {"display": "none"}}}},
                ]};
            return _ajaxResultJson;
        };
    })
    
    var InitUiJqGridSub = function() {
        var _rootDirStr = gm.globalObject.getRootDirStr(); 
        var _jqueryGridLangFilePathStr = _rootDirStr + '/js/pc/public/ext/jqueryGrid/lang/grid.locale-kr.js';
        // 언어 스크립트를 부르지 않으면 Invalid XML: resultData 에러 발생 함
        if(gm.globalObject.getDebugStr()) {
            _jqueryGridLangFilePathStr = 'https://192.168.0.147/webInit/js/pc/public/ext/jqueryGrid/lang/grid.locale-kr.js';
        }        
        $.getScript(_jqueryGridLangFilePathStr)
          .done(function( script, textStatus ) {
            $('body').addClass('redMondC'); // redMondC Class 적용  
            $('.blockInfoWindow').empty();
            $('.blockInfoWindow').css({'position': 'relative','height': '325px'});
            $('.blockInfoWindow').append('<div id="managerBlockRoomNameDiv" style="width: 467px;position: absolute;top: 0px;left: 0px;z-index: 10"></div>');
            $('.blockInfoWindow').append('<div id="managerBlockDiv"></div>');
            $('#managerBlockRoomNameDiv').append('<table id="jqGridRoomNameTable"></table>');
            $('#managerBlockDiv').append('<table id="jqGridTable"></table><div id="jqGridPagerDivNoUse"></div>');
            
            // 1번째 jqGrid 호출
            var _jqGridIdStr = 'jqGridRoomNameTable';
            var _jqGridPageIdStr = 'null';
            var _jqGridOptionsJson = {
                // cellEdit: true, // cellEdit: true 하면 setFrozenColumns 안됨
                multiselect: true,
                cellsubmit: 'clientArray',
                grouping: false,
                groupingView: {
                    groupField: ['ROOM'],
                    groupColumnShow: [false],
                    groupText: [
                        '<b>{0}&nbsp;24:</b>' + 
                        '<select id="" name=""> \
                            <option value="Y" selected="selected" >Y</option> \
                            <option value="N" >N</option> \
                        </select>'
                    ],
                    groupOrder: ['desc']
                },
                width: '300',
                // Row Select 차단
                beforeSelectRow: function() {
                    return false;
                },
                // //Row Select 차단
                loadComplete: function() {
                    var _currentSortNameStr = $('#'+_jqGridIdStr).jqGrid('getGridParam', 'sortname');
                    var _currentSortOrderStr = $('#'+_jqGridIdStr).jqGrid('getGridParam', 'sortorder');
                    $('#'+_jqGridIdStr)[0].addJSONData(_jqGridColumnDataJson);
                    
                    // 디자인 수정
                    $('#gbox_jqGridRoomNameTable').css({'border-right': 0, 'border-bottom': 0});
                    $('#gview_jqGridRoomNameTable > div.ui-jqgrid-titlebar.ui-jqgrid-caption.ui-widget-header.ui-corner-top.ui-helper-clearfix').css('border-top-right-radius',0);
                    // //디자인 수정
                },
                shrinkToFit: true // shrinkToFit: true 하면 setFrozenColumns 암됨
            };
            
            var _argumentJson = {'page':'1'};
            var _jqGridColumnDataJson = window.ajaxCallManageBlockListPub(_argumentJson);
            var _jqGridColumnNameJson = _jqGridColumnDataJson.columnName;            
            gm.addOnUiPc.jqGridInitPub({
                'jqGridIdStr': _jqGridIdStr,
                'jqGridPagerIdStr': _jqGridPageIdStr, 
                'jqGridColumnID': 'ID',
                'jqGridOptionsJson': _jqGridOptionsJson,
                'jqGridColumnDataJson': _jqGridColumnDataJson,
                'jqGridColumnNameJson': _jqGridColumnNameJson,
                'jqGridColumnShowNameJson': ['ROOM','ROOM_TYPE','HISTORY'],
            });
            // //1번째 jqGrid 호출
            
            // 2번째 jqGrid 호출
            window.publicJqGridSelectRowIndexInt; // 글로벌 변수 jqGrid Select Row Index
            window.publicJqGridSelectCellIndexInt; // 글로벌 변수 jqGrid Select Cell Index
            var _jqGridFirstProcessBool = true;
            _jqGridIdStr = 'jqGridTable';
            _jqGridPageIdStr = 'jqGridPagerDiv';
            _jqGridOptionsJson = {
                cellEdit: true, // cellEdit: true 하면 setFrozenColumns 안됨
                cellsubmit: 'clientArray',
                // multiselect: true,
                grouping: false,
                groupingView: {
                    groupField: ['ROOM'],
                    groupColumnShow: [false],
                    groupText: [
                        '<b>{0}&nbsp;24:</b>' + 
                        '<select id="" name=""> \
                            <option value="Y" selected="selected" >Y</option> \
                            <option value="N" >N</option> \
                        </select>'
                    ],
                    groupOrder: ['desc']
                },
                height: '249px',
                beforeEditCell: function() {
                    window.publicJqGridSelectRowIndexInt = arguments[3];
                    window.publicJqGridSelectCellIndexInt = arguments[4];
                },
                loadComplete: function() {
                    $.debug(jsFileNameStr, printStackTrace(), _jqGridIdStr + ' loadComplete', arguments);
                    
                    if(_jqGridFirstProcessBool) {                        
                         $('#'+_jqGridIdStr)[0].addJSONData(_jqGridColumnDataJson);
                         _jqGridFirstProcessBool = false;
                    } else {
                        var _currentSortNameStr = $('#'+_jqGridIdStr).jqGrid('getGridParam', 'sortname');
                        var _currentSortOrderStr = $('#'+_jqGridIdStr).jqGrid('getGridParam', 'sortorder');
                        var _argumentJson = {'page':arguments[0].page};
                        _jqGridColumnDataJson = window.ajaxCallManageBlockListPub(_argumentJson);
                        $('#'+_jqGridIdStr)[0].addJSONData(_jqGridColumnDataJson);

                    }
                    
                    // 1번째 jqGrid 바꾸기
                    $('#jqGridRoomNameTable')[0].addJSONData(_jqGridColumnDataJson);
                    // //1번째 jqGrid 바꾸기
                    // $('#'+ _jqGridIdStr).jqGrid('setFrozenColumns');                    

                },
                shrinkToFit: false // shrinkToFit: true 하면 setFrozenColumns 암됨
            };
            
            gm.addOnUiPc.jqGridInitPub({
                'jqGridIdStr': _jqGridIdStr,
                'jqGridPagerIdStr':_jqGridPageIdStr,
                'jqGridColumnID': 'ID',
                'jqGridOptionsJson': _jqGridOptionsJson,
                'jqGridColumnDataJson': _jqGridColumnDataJson,
                'jqGridColumnNameJson': _jqGridColumnNameJson,
                'jqGridColumnNameWidthJson': {'ROOM':'150', 'ROOM_TYPE':'150', 'HISTORY':'150', 'otherFieldName':'200'},
                'jqGridColumnHideNameJson': ['ID'],
                'jqGridColumnOtherOptionJson': {'ROOM':{'edittype':'select','editoptions':{value:'1:Y;0:N'}}
                                               ,'ROOM_TYPE':{'edittype':'select','editoptions':{value:'S1:할인률(%);S2:입금가(원)'}}
                                               ,'HISTORY': {'editoptions':{dataInit : function(_thisElement) {$(_thisElement).select();}}}
                                               ,'otherFieldName':{'editable':'false', 'cellattr':function() { return 'style="color:red"'; }}
                                               }
            });
            // //2번째 jqGrid 호출
          })
          .fail(function( jqxhr, settings, exception ) {
            alert(_jqueryGridLangFilePathStr+' JS Call Error');
        });
    };
     */  
    /* 입력 파라메터 설명
     * jqGridIdStr: jqGrid의 ID
     * jqGridPagerIdStr: jqGrid Pager의 ID
     * jqGridColumnID: jqGrid Column ID
     * jqGridOptionsJson: jqGrid Options
     * jqGridColumnNameJson: jqGrid Column의 이름과 필드명이 같이 있는 Json 형식 
     * jqGridColumnDataJson: jqGrid Column의 Data
     * jqGridColumnNameWidthJson: 특정 필드 넓이 설정(otherFieldName는 기타 필드 임)
     * jqGridColumnShowNameJson: 보여줄 필드 설정
     * jqGridColumnHideNameJson: 숨김 필드 설정(jqGridColumnShowNameJson 가 우선 순이가 더 높음)
     * jqGridColumnOtherOptionJson: 추가 옵션 처리(우선 순위가 가장 높음) // edittype 사용시 이것으로 처리해도 데이터는 미리 바꿔줘야 함(수정시만 처리 되기 때문임)
     * jqGridDataFunction: 완료된 다음 하려고 했으나 현재 사용 안 함
     */
    // 참조 사이트: http://locochico.tistory.com/28
    gm.addOnUiPc.jqGridInitPub = function(_argJson) {
        $('#'+_argJson.jqGridIdStr).jqGrid('GridUnload');
        // var _jqGridFirstProcessBool = true;
        var _jqGridCompleteBool = false;
        var _columnDisplayNameArray = [], _columnFieldNameArray = [], _columnModelArray = [];
        
        if(gm.addOnUtil.getIsNull(_argJson.jqGridColumnNameJson)) {
            _argJson.jqGridColumnNameJson = {'ID':'ID','ROOM':'객실','ROOM_TYPE':'타입','2014-08-08':'8/8(금)','2014-08-09':'8/9(토)','2014-08-10':'8/10(일)','2014-08-11':'8/11(월)','2014-08-12':'8/12(화)','HISTORY':'변경이력'};
        }
        
        for(var _jsonKeyStr in _argJson.jqGridColumnNameJson) {
            _columnFieldNameArray.push(_jsonKeyStr);
            _columnDisplayNameArray.push(_argJson.jqGridColumnNameJson[_jsonKeyStr]);
        }
        
        var arrtSettingSub = function (rowId, val, rawObject, cm) {
            var result = '';
            if(rawObject.attr) {
                var attr = rawObject.attr[cm.name];
                if(!gm.addOnUtil.getIsNull(attr)) {
                    if (attr.rowspan) {
                       result = ' rowspan=' + '"' + attr.rowspan + '"';
                    } else if (attr.display) {
                        result = ' style="display:' + attr.display + '"';
                    }
                }
            }
            return result;
        };
        
        for(var _columnFieldNameArrayTmpCountInt = 0, _columnFieldNameArrayCountInt = _columnFieldNameArray.length; _columnFieldNameArrayTmpCountInt < _columnFieldNameArrayCountInt; _columnFieldNameArrayTmpCountInt++) {
            var _columnModelOptionsJson = {};
            if(!gm.addOnUtil.getIsNull(_argJson.jqGridColumnShowNameJson)) {
                if($.inArray(_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], _argJson.jqGridColumnShowNameJson) === -1) {
                    _columnModelOptionsJson = {'name':_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], editable: true, width: 150, hidden: true, cellattr: arrtSettingSub};
                } else {
                    _columnModelOptionsJson = {'name':_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], editable: true, width: 150, cellattr: arrtSettingSub};
                }
            } else if(!gm.addOnUtil.getIsNull(_argJson.jqGridColumnHideNameJson)) {
                if($.inArray(_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], _argJson.jqGridColumnHideNameJson) === -1) {
                    _columnModelOptionsJson = {'name':_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], editable: true, width: 150, cellattr: arrtSettingSub};
                } else {
                    _columnModelOptionsJson = {'name':_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], editable: true, width: 150, hidden: true, cellattr: arrtSettingSub};
                }
            } else {
                _columnModelOptionsJson = {'name':_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], editable: true, width: 150, cellattr: arrtSettingSub};
            }
            // 특정 컬럼명 사이즈 줄이기
            if(!gm.addOnUtil.getIsNull(_argJson.jqGridColumnNameWidthJson)) {
                if($.inHashObject(_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], _argJson.jqGridColumnNameWidthJson)) {
                    _columnModelOptionsJson['width'] = _argJson.jqGridColumnNameWidthJson[_columnFieldNameArray[_columnFieldNameArrayTmpCountInt]];
                } else {
                    if($.inHashObject('otherFieldName', _argJson.jqGridColumnNameWidthJson)) { // 여기 수정해야 함
                        _columnModelOptionsJson['width'] = _argJson.jqGridColumnNameWidthJson['otherFieldName'];
                    }
                }
            }
            
            // 키는 width 20으로 설정
            if(_columnFieldNameArray[_columnFieldNameArrayTmpCountInt] === _argJson.jqGridColumnID) {
                _columnModelOptionsJson['width'] = '20';
            }
            // //키는 width 20으로 설정
            // //특정 컬럼명 사이즈 줄이기
                        
            // 컬럼 추가 옵션 처리
            if(!gm.addOnUtil.getIsNull(_argJson.jqGridColumnOtherOptionJson)) {
                if($.inHashObject(_columnFieldNameArray[_columnFieldNameArrayTmpCountInt], _argJson.jqGridColumnOtherOptionJson)) {
                    $.extend(true, _columnModelOptionsJson, _argJson.jqGridColumnOtherOptionJson[_columnFieldNameArray[_columnFieldNameArrayTmpCountInt]]);
                }
                if(_argJson.jqGridColumnOtherOptionJson.allColumnName) {
                    $.extend(true, _columnModelOptionsJson, _argJson.jqGridColumnOtherOptionJson.allColumnName);
                }
            }
            // //컬럼 추가 옵션 처리
            
            _columnModelArray.push(_columnModelOptionsJson);
        }
        
        /*
        if(gm.addOnUtil.getIsNull(_argJson.jqGridColumnDataJson)) {
            var _pageNumStr = 1;
            var _ajaxResultJson = {'page':_pageNumStr,'total':'4','records':'113','rows':[
                    {'ID':_pageNumStr+'1','cell':{'ID':_pageNumStr+'1','ROOM':'디럭스','ROOM_TYPE':'싱글','2014-08-08':'11','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51','HISTORY':'2014-08-25 10:00:15 tobi'}},
                    {'ID':_pageNumStr+'2','cell':{'ID':_pageNumStr+'2','ROOM':'디럭스','ROOM_TYPE':'트윈','2014-08-08':'12','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51','HISTORY':'2014-08-25 10:00:15 tobi'}},
                    {'ID':_pageNumStr+'3','cell':{'ID':_pageNumStr+'3','ROOM':'디럭스','ROOM_TYPE':'더블','2014-08-08':'13','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51','HISTORY':'2014-08-25 10:00:15 tobi'}},
                    {'ID':_pageNumStr+'4','cell':{'ID':_pageNumStr+'4','ROOM':'스위트','ROOM_TYPE':'싱글','2014-08-08':'14','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51','HISTORY':'2014-08-25 10:00:15 tobi'}},
                    {'ID':_pageNumStr+'5','cell':{'ID':_pageNumStr+'5','ROOM':'스위트','ROOM_TYPE':'트윈','2014-08-08':'15','2014-08-09':'21','2014-08-10':'31','2014-08-11':'41','2014-08-12':'51','HISTORY':'2014-08-25 10:00:15 tobi'}}
                    ]};
        
            _argJson.jqGridColumnDataJson = _ajaxResultJson;
        }
        */
        
        // $.debug(jsFileNameStr, printStackTrace(), '_columnDisplayNameArray', _columnDisplayNameArray, '_columnModelArray', _columnModelArray, '_argJson.jqGridColumnDataJson', _argJson.jqGridColumnDataJson);

        // jqGrid 모든 function : http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs       
        // jqGrid 기본 설정 처리
        // $.debug(jsFileNameStr, printStackTrace(), '_columnModelArray', _columnModelArray);
        var _jqGridOptionsJson = {
            datatype: 'clientSide', 
            prmNames: {
            },
            // 기본 colModel 세팅
            cmTemplate: {
                align: 'center',
                sortable:false
            },
            // //기본 colModel 세팅
            colNames: _columnDisplayNameArray,
            colModel: _columnModelArray,
            pager: '#'+_argJson.jqGridPagerIdStr,
            loadonce: true,
            // width: null, shrinkToFit: false 로 하면 colModel의 width를 사용 가능함
            // width: null,
            // shrinkToFit: false,
            // //width: null, shrinkToFit: false 로 하면 colModel의 width를 사용 가능함
            autowidth: true, // colModel의 width를 사용하면서 자동으로 100% 상태로 늘려줌
            height: '100%',
            caption: '&nbsp;',
            viewrecords: true,
            rowNum:10, 
            localReader: {
                repeatitems: true,
                id: _argJson.jqGridColumnID
            },
            afterInsertRow: function(_rowIdInt, _rowDataJson){
                /*
                $.debug(jsFileNameStr, printStackTrace(), 'afterInsertRow', _rowDataJson); // grouping: true면 작동 안 함
                if(_rowDataJson.ROOM_TYPE === '싱글') {
                    $(this).jqGrid('setCell', _rowIdInt, 'ROOM_TYPE', '',{color:'green'});
                }
                */
            },  
            loadComplete: function() {
                /*
                $.debug(jsFileNameStr, printStackTrace(), _argJson.jqGridIdStr + ' loadComplete', arguments); 
                // $('#'+_argJson.jqGridIdStr).jqGrid('clearGridData');
                // reloadGrid 이벤트시 발생 됨
                // datatype: 'clientSide'시에 페이지 이동 버튼 클릭시에도 발생 됨
                if(_jqGridFirstProcessBool) {
                    $(this)[0].addJSONData(_argJson.jqGridColumnDataJson);
                    _jqGridFirstProcessBool = false;
                } else {
                    var _argumentJson = {'page':arguments[0].page};
                    var _jqGridColumnDataJson = _argJson.jqGridDataFunction(_argumentJson);
                    // 컬럼 네임 변경
                    // for(var _jsonKeyStr in _jqGridColumnDataJson.columnName) {
                    //     $(this).jqGrid('setLabel', _jsonKeyStr, 'TestColumn');
                    // }
                    // //컬럼 네임 변경
                    $(this)[0].addJSONData(_jqGridColumnDataJson);
                }
                
                // grouping: true일 때 afterInsertRow가 작동 하지 않아 여기서 처리함
                var _rowIdsArray = $(this).jqGrid('getDataIDs');
                for (var i = 0; i < _rowIdsArray.length; i++) {
                    var _rowIdInt = _rowIdsArray[i];
                    if($(this).jqGrid('getCell', _rowIdInt, 'ROOM_TYPE') === '싱글') {
                        $(this).jqGrid('setCell', _rowIdInt, 'ROOM_TYPE', '',{color:'red'});
                    }
                }
                // //grouping: true일 때 afterInsertRow가 작동 하지 않아 여기서 처리함
                */
            },
            loadError : function() {
                alert(_argJson.jqGridPagerIdStr + ' jqGrid Data 호출 실패');
            },
            onSelectRow: function(){
                // $.debug(jsFileNameStr, printStackTrace(), 'onSelectRow', arguments);
            },
            ondblClickRow: function() {
                // $.debug(jsFileNameStr, printStackTrace(), 'ondblClickRow', arguments);
            },
            onSortCol: function() {
                // $.debug(jsFileNameStr, printStackTrace(), 'onSortCol', arguments);
            },
            gridComplete : function() {         
                $('.ui-jqgrid-titlebar-close').hide();
                _jqGridCompleteBool = true;
            }
        };
        
        // _jqGridOptionsJson 최종적으로 맵핑(추가 옵션 처리(우선 순위가 가장 높음))
        for(var _jsonKeyStr in  _argJson.jqGridOptionsJson) {
            _jqGridOptionsJson[_jsonKeyStr] = _argJson.jqGridOptionsJson[_jsonKeyStr];
        }
        // //_jqGridOptionsJson 최종적으로 맵핑(추가 옵션 처리(우선 순위가 가장 높음))
        
        // jqGrid 기본 설정 처리
        $.debug(jsFileNameStr, printStackTrace(), '_jqGridOptionsJson', _jqGridOptionsJson);
        $('#'+_argJson.jqGridIdStr).jqGrid(_jqGridOptionsJson);
        // //jqGrid 기본 설정 처리
        
        // jqGrid Pager 모양(navGrid) 및 이벤트 처리
        $('#'+_argJson.jqGridIdStr).jqGrid('navGrid','#'+_argJson.jqGridPagerIdStr,
            // Pager Icon View options
            {view:false,edit:false,add:false,del:false,search:false,refresh:false},
            // //Pager Icon View options
            
            // Edit options
            {},
            // //Edit options
            
            // Add options
            {},
            // //Add options
            
            // Del options
            {},
            // //Del options
            
            // Search options
            {},
            // //Search options
            
            // View options
            {}
            // //View options
        );
        // jqGrid Pager 모양(navGrid) 및 이벤트 처리
        
        // 현재 Grid 환경 정보 보기 
        $.debug(jsFileNameStr, printStackTrace(), _argJson.jqGridIdStr + ' Info', $('#'+_argJson.jqGridIdStr).jqGrid('getGridParam'));
        // //현재 Grid 환경 정보 보기 
        
        if (typeof(_argJson.callBack) === 'function') {
            _argJson.callBack(_jqGridCompleteBool);
        }
    };
});