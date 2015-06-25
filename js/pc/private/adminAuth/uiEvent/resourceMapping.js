'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/sample/uiEvent/resourceMapping.js';
function testFunctionSub() {
	$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
};	

$(document).ready(function() {	
	// testFunctionSub();
	$('#adminAuthResourceMappingPageMainDiv').off('click').on('click', '#applyButton', function() {
		var _ruleId = $("#jqueryGridMappingTable").jqGrid('getGridParam','selrow'); // single select		
		var _resourceId = $("#jqueryGridTable").jqGrid('getGridParam','selarrrow'); // multi select
		// $.debug(jsFileNameStr, printStackTrace(), 'Debug', _ruleId, _resourceId);
		if(_ruleId === null) {
			alert('RULE 리스트를 선택 해주세요');
			return false;
		} else {			
			$.ajax({
			    url: '/adminlocator/index.php/ajax/deleteResourceMapping'
			    , type: 'POST'                    
			    , async: true
			    , dataType: 'json'    
			    // , jsonpCallback: 'ipInfo'
			    , data: 'id='+_ruleId    
			    , beforeSend: function() {
			    	
			    }
			    , success: function(_thisResult) {
			    	// $.debug(jsFileNameStr, printStackTrace(), 'deleteResourceMapping success', _thisResult, '_resourceId.length: ' + _resourceId.length); 			    	
			    	for(var _resourceIdCountTmpInt = 0; _resourceIdCountTmpInt < _resourceId.length; _resourceIdCountTmpInt++) {
			    		$.ajax({
						    url: '/adminlocator/index.php/ajax/insertResourceMapping'
						    , type: 'POST'                    
						    , async: true
						    , dataType: 'json'    
						    // , jsonpCallback: 'ipInfo'
						    , data: 'id='+_ruleId+'&resource_id='+_resourceId[_resourceIdCountTmpInt]    
						    , beforeSend: function() {
						    	
						    }
						    , success: function(_thisResult) {
						    	 // $.debug(jsFileNameStr, printStackTrace(), 'insertResourceMapping success', _thisResult);    
						    	
						    	$.ajax({
								    url: '/adminlocator/index.php/ajax/selectResourceMapping'
								    , type: 'POST'                    
								    , async: true
								    , dataType: 'json'    
								    // , jsonpCallback: 'ipInfo'
								    , data: 'id='+_ruleId    
								    , beforeSend: function() {
								    	
								    }
								    , success: function(_thisResult) {
								    	 // $.debug(jsFileNameStr, printStackTrace(), 'success', _thisResult);    
								    	 $("#jqueryGridTable").jqGrid('resetSelection'); // multiselect 모두 해제
								    	 if(_thisResult.result_data !== '0') {
								    		 for(var _resultCountTmpInt = 0; _resultCountTmpInt < _thisResult.result_data.records; _resultCountTmpInt++) {
								    			$("#jqueryGridTable").jqGrid('setSelection',_thisResult.result_data.rows[_resultCountTmpInt].cell.RESOURCE_ID);
								    		 }
								    	 }			    		 
								    }, error: function() {
								    	$.debug(jsFileNameStr, printStackTrace(), 'selectResourceMapping Ajax Call Error', arguments);
								    	alert('selectResourceMapping Ajax Call Error');
								    }, complete: function() {
								    	
								    } 
								});		
						    	 	    		 
						    }, error: function() {
						    	$.debug(jsFileNameStr, printStackTrace(), 'insertResourceMapping Ajax Call Error', arguments);
						    	alert('insertResourceMapping Ajax Call Error');
						    }, complete: function() {
						    	
						    } 
						});	
			    	}

			    }, error: function() {
			    	$.debug(jsFileNameStr, printStackTrace(), 'deleteResourceMappingAction Ajax Call Error', arguments);
			    	alert('deleteResourceMappingAction Ajax Call Error');
			    }, complete: function() {
			    	alert('적용 완료');
			    } 
			});	
		}
	});
});