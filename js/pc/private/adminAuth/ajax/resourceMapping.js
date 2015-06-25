'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/sample/ajax/resourceMapping.js';
function testFunctionSub() {
	$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
};	

function jqGridRestStartSub() {		
	var _jqGridId = 'jqueryGridTable';
	var URL = '/adminlocator/index.php/ajax/selectJson?tableCode=authResource';
	// URL = '/webInit/restJsonp';
	$.extend($.jgrid.defaults, {
				// postData: { searchString: '', searchField: '', searchOper: '' }, // jqGrid client-side searching 할때 사용
			   	datatype: function(postdata) {    
		            $("div#load_jqueryGridTable.loading").show(); // make sure we can see loader text
		            $.ajax({
		            	url: URL,  
		                type: "POST",  
		                // data: JSON.stringify(postdata),
		                data: postdata,
		                dataType: 'json',		
		                beforeSend: function() {
		                },
		                success: function(data, st) {			                	
		                    if (st == "success") {	
		                    	// $.debug(jsFileNameStr, printStackTrace(), data);
		                    	// $.debug(jsFileNameStr, printStackTrace(), data.result_data);
		                        $('#'+_jqGridId)[0].addJSONData(data.result_data);
		                    }
		                },
		                error: function() {
		                    alert("Error with AJAX callback");
		                }, 
		                complete: function() {
							$("div#load_jqueryGridTable.loading").hide();
						} 			                
		            }); 
		        },
		        /*
		        // // 커스텀 파라메터명 변경
				prmNames: {
					page: "page.page",
					rows: "page.size",
					sort: "page.sort",
					order: "page.sort.dir"
				},
				*/
				// sortname: 'id',
				// sortorder: 'desc',
				height: 'auto',						
				autowidth: true,
				viewrecords: true,
				rowNum: 10,
				rowList: [10, 20, 50, 100],
				// altRows: true, // Row의 Style이 번갈아 가면서 틀리게 함
				// multiselect: true,
				loadError: function(xhr, status, error) {
					alert(error);
				}
			});

	$.extend($.jgrid.edit, {
				closeAfterEdit: true,
				closeAfterAdd: true,	
				checkOnSubmit: true,
				closeOnEscape: false,
				modal: true,
				serializeEditData: function(data) {
					// return JSON.stringify(data);
					return data;
				}					
			});
	$.extend($.jgrid.del, {					
				serializeDelData: function(data) {
					// return JSON.stringify(data);
					return data;
				}			
			});

	var editOptions = {			
		reloadAfterSubmit:false,
		ajaxEditOptions: { 
					url: 'http://headers.jsontest.com/',
					type: "POST",  
					dataType: 'json',			
					// jsonpCallback: 'resultData',
					success: function(data, st) {
						$.debug(jsFileNameStr, printStackTrace(), 'edit submit 후', data);									
					}
				},	
		onclickSubmit: function(params, postdata) {
			$.debug(jsFileNameStr, printStackTrace(), 'edit, onclickSubmit');
			// params.url = URL + '/' + postdata.id;
		},			
		beforeShowForm:function(formid) {			
			$.debug(jsFileNameStr, printStackTrace(), 'edit, beforeShowForm ' + formid);
		    // $('#editmod'+_jqGridId+' #invdate').datepicker({dateFormat:"yy-mm-dd"});
		},
		afterShowForm:function(formid) {
			$.debug(jsFileNameStr, printStackTrace(), 'edit, afterShowForm ' + formid);
		}
	};
	var addOptions = {	
		// reloadAfterSubmit:false,		
		ajaxEditOptions: { 
					url: 'http://headers.jsontest.com/',
					type: "POST",  
					dataType: 'json',			
					// jsonpCallback: 'resultData',
					success: function(data, st) {
						$.debug(jsFileNameStr, printStackTrace(), 'add submit 후', data);									
					}
		},	
		beforeSubmit : function(postdata, formid) { 
			 return [true,''];				
		},
		beforeShowForm:function(formid) {	
			// 기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
			$('#invdate').datepicker({dateFormat:"yy-mm-dd"});
			$(document).on('click', '#invdate', function() {	
				$('#ui-datepicker-div').show();					
			});
			// //기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
		},
		afterShowForm:function(formid) {				
			// 기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
			$('#ui-datepicker-div').hide();
			$('#name').focus();
			// //기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
		}
	};
	var delOptions = {
		reloadAfterSubmit:true,
		ajaxDelOptions: { 
			// url: 'http://headers.jsontest.com/',
			type: "POST",  
			dataType: 'json',			
			// jsonpCallback: 'resultData',
			success: function(data, st) {
				$.debug(jsFileNameStr, printStackTrace(), 'del submit 후', data);			
			}
		},	
		onclickSubmit: function(params, postdata) {
			// params.url = URL + '/' + postdata;
		}
	};	
	var lastSelectRowId='';
	// jqGrid 한글 설명(게시글 4개 있음): http://insnote.com/xe/kkang/300
	var options = {
		url: URL,
		editurl: '/adminlocator/index.php/ajax/editJson?tableCode=authResource',
		// 컬럼명 변경법: http://stackoverflow.com/questions/7311787/jqgrid-set-caption-and-column-name
		colNames: ['리소스ID','리소스명','URL','URL타입','파라미터명','파리미터값','생성일자','수정일자','수정자'],
		colModel: [
	   		{name:'RESOURCE_ID', index:'RESOURCE_ID', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   		{name:'RESOURCE_NAME', index:'RESOURCE_NAME', width:50, align:'center', editable:true, editrules:{required:true}},
	   		{name:'URL', index:'URL', width:50, align:'center', editable:true, editrules:{required:true}},
	   		{name:'URL_TYPE', index:'URL_TYPE', width:50, align:'center', editable:true, editrules:{required:true}, edittype:"select", formatter:"select", editoptions:{value:"C:생성;R:읽기;U:수정;D:삭제"}},
	   		{name:'PARAMETER_NAME', index:'PARAMETER_NAME', width:50, align:'center', editable:true, editrules:{required:false}},
	   		{name:'PARAMETER_VALUE', index:'PARAMETER_VALUE', width:50, align:'center', editable:true, editrules:{required:false}},
			{name:'CREAT_DAY', index:'CREAT_DAY', width:50, align:'center', editable:false, editoptions:{readonly:true}},
			{name:'UPD_DAY', index:'UPD_DAY', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   		{name:'UPDUSR', index:'UPDUSR', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   	],
		caption: "URL 리소스 리스트",
		pager : '#jqueryGridPagerDiv',			
		shrinkToFit: true, // jqGrid 내부 width 자동 100% 맞춤(col frozen을 위해서는 false로 해야 함)
		autowidth: true, // jqGrid 외부 width 자동으로(true 선언시 colModel의 width 및 밑에 width 반영 안됨)
		width: 600, // jqGrid 외부 width
		// rownumbers: true,
		// height: 100, // jqGrid 외부 height
		jsonReader: {
	        // repeatitems:false, // "rows":["id":"13"...
	        repeatitems:true,  // "rows":[{"cell":{"id":"13"... // 이게 기본임
			id: "RESOURCE_ID",
	    },
	    sortName: 'RESOURCE_ID',
		sortOrder: 'asc',
		multiselect: true,
		/*
		ondblClickRow: function(id) {
			$(this).jqGrid('editGridRow', id, editOptions);
		},
		*/
		onSelectRow: function(id){			
			if(id && id!==lastSelectRowId){
				$('#'+_jqGridId).jqGrid('restoreRow',lastSelectRowId);
				// $('#'+_jqGridId).jqGrid('editRow',id, true, pickdates); // 클릭 수정 가능하게 하기(inline nav 같이 사용 안 됨)
				lastSelectRowId=id;
			}
		},
		gridComplete: function() {	
	    },	    
	    // 모든 통신시 JSON 처리(inline nav 포함)	
	    /*
	    serializeRowData: function(data) { 
			return JSON.stringify(data);
		}
		*/
	};

	$('#'+_jqGridId).jqGrid(options).navGrid('#jqueryGridPagerDiv',
			{edit:false,add:false,del:false, view:false}, // inline nav options(밑에꺼 주석처리 필요)
			// {view:true}, // nav options(위에꺼 주석처리 필요)
			editOptions,
			addOptions,
			delOptions,
			{multipleSearch:true, multipleGroup:true, showQuery: true} // search options
	);
	
	// inline nav(위에 editOptions, addOptions, delOptions 작동 안됨)
	/*
	$('#'+_jqGridId).jqGrid("inlineNav", "#jqueryGridPagerDiv", {	
	    addParams: {
	        addRowParams: {		        	
	            aftersavefunc: function(rowid, response) {
	            	// alert('Add 저장');		  
	            	$(this).trigger("reloadGrid");
	            },
	            afterrestorefunc: function(rowid, response) {
		        	// alert('Add 취소');		                
		        }			        
	        }
	    },
	    editParams: {  	
	    	aftersavefunc: function(rowid, response) {
	        	// alert('Edit 저장');	
	        	// $('#refresh_jqueryGridTable').trigger('click');
	        	$(this).trigger("reloadGrid");
	        },
	        afterrestorefunc: function(rowid, response) {
	        	// alert('Edit 취소');		                
	        }
	    }
	});
	*/
	// //inline nav(위에 editOptions, addOptions, delOptions 작동 안됨)

	// 상위 그룹헤더 컬럼 만들기
	/*
	$('#'+_jqGridId).jqGrid('setGroupHeaders', {
	  useColSpanStyle: false, 
	  groupHeaders:[
		{startColumnName: 'id', numberOfColumns: 2, titleText: 'Client Details'}
	  ]	
	});
	*/
	// $('#'+_jqGridId).jqGrid('setFrozenColumns'); // 고정 컬럼 고정 시키기		

	function pickdates(id){
		// $('#'+id+"_invdate").datepicker({dateFormat:"yy-mm-dd"});
	}
	
	// save, edit 이벤트 다시 바인딩(jqueryGrid.js 에서 수정 처리 함)
	/*
	$('#jqueryGridTable_ilsave').on('click', function(_thisEvent) { 
		if(!$('#jqueryGridTable_ilsave').hasClass('ui-state-disabled')) {
			var _confirmResutlBool = confirm("저장 할까요?");
			if(!_confirmResutlBool) {
				// this.stopPropagation(); // 강제 에러 발생해서 중단 시킴					
			}
		}
	});
	$('#jqueryGridTable_ilsave').data('events').click.indexChange(0,1); // Array Move를 이용하여 이벤트 순서 변경	
	
	$('#jqueryGridTable_iledit').on('click', function(_thisEvent) { 
		if($('#'+_jqGridId).jqGrid('getGridParam', 'selrow') === null) {
			alert('행을 선택 해주세요');
		}					
	});
	$('#jqueryGridTable_iledit').data('events').click.indexChange(0,1); // Array Move를 이용하여 이벤트 순서 변경
	*/
	// //save, edit 이벤트 다시 바인딩(jqueryGrid.js 에서 수정 처리 함)
};

function jqGridRestMappingStartSub() {		
	var _jqGridId = 'jqueryGridMappingTable';
	var URL = '/adminlocator/index.php/ajax/selectJson?tableCode=authRule';
	// URL = '/webInit/restJsonp';
	$.extend($.jgrid.defaults, {
				// postData: { searchString: '', searchField: '', searchOper: '' }, // jqGrid client-side searching 할때 사용
			   	datatype: function(postdata) {    
		            $("div#load_jqueryGridTable.loading").show(); // make sure we can see loader text
		            $.ajax({
		            	url: URL,  
		                type: "POST",  
		                // data: JSON.stringify(postdata),
		                data: postdata,
		                dataType: 'json',		
		                beforeSend: function() {
		                },
		                success: function(data, st) {			                	
		                    if (st == "success") {	
		                    	// $.debug(jsFileNameStr, printStackTrace(), data);
		                    	// $.debug(jsFileNameStr, printStackTrace(), data.result_data);
		                        $('#'+_jqGridId)[0].addJSONData(data.result_data);
		                    }
		                },
		                error: function() {
		                    alert("Error with AJAX callback");
		                }, 
		                complete: function() {
							$("div#load_jqueryGridTable.loading").hide();
						} 			                
		            }); 
		        },
		        /*
		        // // 커스텀 파라메터명 변경
				prmNames: {
					page: "page.page",
					rows: "page.size",
					sort: "page.sort",
					order: "page.sort.dir"
				},
				*/
				// sortname: 'id',
				// sortorder: 'desc',
				height: 'auto',						
				autowidth: true,
				viewrecords: true,
				rowNum: 10,
				rowList: [10, 20, 50, 100],
				// altRows: true, // Row의 Style이 번갈아 가면서 틀리게 함
				// multiselect: true,
				loadError: function(xhr, status, error) {
					alert(error);
				}
			});

	$.extend($.jgrid.edit, {
				closeAfterEdit: true,
				closeAfterAdd: true,	
				checkOnSubmit: true,
				closeOnEscape: false,
				modal: true,
				serializeEditData: function(data) {
					// return JSON.stringify(data);
					return data;
				}					
			});
	$.extend($.jgrid.del, {					
				serializeDelData: function(data) {
					// return JSON.stringify(data);
					return data;
				}			
			});

	var editOptions = {			
		reloadAfterSubmit:false,
		ajaxEditOptions: { 
					url: 'http://headers.jsontest.com/',
					type: "POST",  
					dataType: 'json',			
					// jsonpCallback: 'resultData',
					success: function(data, st) {
						$.debug(jsFileNameStr, printStackTrace(), 'edit submit 후', data);									
					}
				},	
		onclickSubmit: function(params, postdata) {
			$.debug(jsFileNameStr, printStackTrace(), 'edit, onclickSubmit');
			// params.url = URL + '/' + postdata.id;
		},			
		beforeShowForm:function(formid) {			
			$.debug(jsFileNameStr, printStackTrace(), 'edit, beforeShowForm ' + formid);
		    // $('#editmod'+_jqGridId+' #invdate').datepicker({dateFormat:"yy-mm-dd"});
		},
		afterShowForm:function(formid) {
			$.debug(jsFileNameStr, printStackTrace(), 'edit, afterShowForm ' + formid);
		}
	};
	var addOptions = {	
		// reloadAfterSubmit:false,		
		ajaxEditOptions: { 
					url: 'http://headers.jsontest.com/',
					type: "POST",  
					dataType: 'json',			
					// jsonpCallback: 'resultData',
					success: function(data, st) {
						$.debug(jsFileNameStr, printStackTrace(), 'add submit 후', data);									
					}
		},	
		beforeSubmit : function(postdata, formid) { 
			 return [true,''];				
		},
		beforeShowForm:function(formid) {	
			// 기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
			$('#invdate').datepicker({dateFormat:"yy-mm-dd"});
			$(document).on('click', '#invdate', function() {	
				$('#ui-datepicker-div').show();					
			});
			// //기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
		},
		afterShowForm:function(formid) {				
			// 기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
			$('#ui-datepicker-div').hide();
			$('#name').focus();
			// //기본적으로 폼의 Focus는 처음꺼에 감으로서 날짜를 선택하라고 계속 나와서 변경
		}
	};
	var delOptions = {
		reloadAfterSubmit:true,
		ajaxDelOptions: { 
			// url: 'http://headers.jsontest.com/',
			type: "POST",  
			dataType: 'json',			
			// jsonpCallback: 'resultData',
			success: function(data, st) {
				$.debug(jsFileNameStr, printStackTrace(), 'del submit 후', data);			
			}
		},	
		onclickSubmit: function(params, postdata) {
			// params.url = URL + '/' + postdata;
		}
	};	
	var lastSelectRowId='';
	// jqGrid 한글 설명(게시글 4개 있음): http://insnote.com/xe/kkang/300
	var options = {
		url: URL,
		editurl: '/adminlocator/index.php/ajax/editJson?tableCode=authRule',
		// 컬럼명 변경법: http://stackoverflow.com/questions/7311787/jqgrid-set-caption-and-column-name
		colNames: ['룰ID','룰명','룰설명','생성일자','수정일자','수정자'],
		colModel: [
	   		{name:'RULE_ID', index:'RULE_ID', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   		{name:'RULE_NAME', index:'RULE_NAME', width:50, align:'center', editable:true, editrules:{required:true}},
	   		{name:'RULE_DESC', index:'RULE_DESC', width:50, align:'center', editable:true, editrules:{required:true}},
			{name:'CREAT_DAY', index:'CREAT_DAY', width:50, align:'center', editable:false, editoptions:{readonly:true}},
			{name:'UPD_DAY', index:'UPD_DAY', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   		{name:'UPDUSR', index:'UPDUSR', width:50, align:'center', editable:false, editoptions:{readonly:true}},
	   	],
		caption: "RULE 리스트",
		pager : '#jqueryGridMappingPagerDiv',			
		shrinkToFit: true, // jqGrid 내부 width 자동 100% 맞춤(col frozen을 위해서는 false로 해야 함)
		autowidth: true, // jqGrid 외부 width 자동으로(true 선언시 colModel의 width 및 밑에 width 반영 안됨)
		width: 600, // jqGrid 외부 width
		// rownumbers: true,
		// height: 100, // jqGrid 외부 height
		jsonReader: {
	        // repeatitems:false, // "rows":["id":"13"...
	        repeatitems:true,  // "rows":[{"cell":{"id":"13"... // 이게 기본임
			id: "RULE_ID",
	    },
	    sortName: 'RULE_ID',
		sortOrder: 'asc',
		// multiselect: true,
		/*
		ondblClickRow: function(id) {
			$(this).jqGrid('editGridRow', id, editOptions);
		},
		*/
		onSelectRow: function(id){			
			if(id && id!==lastSelectRowId){
				$('#'+_jqGridId).jqGrid('restoreRow',lastSelectRowId);
				// $('#'+_jqGridId).jqGrid('editRow',id, true, pickdates); // 클릭 수정 가능하게 하기(inline nav 같이 사용 안 됨)
				lastSelectRowId=id;
			}
			
			$.ajax({
			    url: '/adminlocator/index.php/ajax/selectResourceMapping'
			    , type: 'POST'                    
			    , async: true
			    , dataType: 'json'    
			    // , jsonpCallback: 'ipInfo'
			    , data: 'id='+id    
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
			
		},
		gridComplete: function() {	
	    },	    
	    // 모든 통신시 JSON 처리(inline nav 포함)	
	    /*
	    serializeRowData: function(data) { 
			return JSON.stringify(data);
		}
		*/
	};

	$('#'+_jqGridId).jqGrid(options).navGrid('#jqueryGridMappingPagerDiv',
			{edit:false,add:false,del:false, view:false}, // inline nav options(밑에꺼 주석처리 필요)
			// {view:true}, // nav options(위에꺼 주석처리 필요)
			editOptions,
			addOptions,
			delOptions,
			{multipleSearch:true, multipleGroup:true, showQuery: true} // search options
	);
	
	// inline nav(위에 editOptions, addOptions, delOptions 작동 안됨)
	/*
	$('#'+_jqGridId).jqGrid("inlineNav", "#jqueryGridPagerDiv", {	
	    addParams: {
	        addRowParams: {		        	
	            aftersavefunc: function(rowid, response) {
	            	// alert('Add 저장');		  
	            	$(this).trigger("reloadGrid");
	            },
	            afterrestorefunc: function(rowid, response) {
		        	// alert('Add 취소');		                
		        }			        
	        }
	    },
	    editParams: {  	
	    	aftersavefunc: function(rowid, response) {
	        	// alert('Edit 저장');	
	        	// $('#refresh_jqueryGridTable').trigger('click');
	        	$(this).trigger("reloadGrid");
	        },
	        afterrestorefunc: function(rowid, response) {
	        	// alert('Edit 취소');		                
	        }
	    }
	});
	*/
	// //inline nav(위에 editOptions, addOptions, delOptions 작동 안됨)

	// 상위 그룹헤더 컬럼 만들기
	/*
	$('#'+_jqGridId).jqGrid('setGroupHeaders', {
	  useColSpanStyle: false, 
	  groupHeaders:[
		{startColumnName: 'id', numberOfColumns: 2, titleText: 'Client Details'}
	  ]	
	});
	*/
	// $('#'+_jqGridId).jqGrid('setFrozenColumns'); // 고정 컬럼 고정 시키기		

	function pickdates(id){
		// $('#'+id+"_invdate").datepicker({dateFormat:"yy-mm-dd"});
	}
	
	// save, edit 이벤트 다시 바인딩(jqueryGrid.js 에서 수정 처리 함)
	/*
	$('#jqueryGridTable_ilsave').on('click', function(_thisEvent) { 
		if(!$('#jqueryGridTable_ilsave').hasClass('ui-state-disabled')) {
			var _confirmResutlBool = confirm("저장 할까요?");
			if(!_confirmResutlBool) {
				// this.stopPropagation(); // 강제 에러 발생해서 중단 시킴					
			}
		}
	});
	$('#jqueryGridTable_ilsave').data('events').click.indexChange(0,1); // Array Move를 이용하여 이벤트 순서 변경	
	
	$('#jqueryGridTable_iledit').on('click', function(_thisEvent) { 
		if($('#'+_jqGridId).jqGrid('getGridParam', 'selrow') === null) {
			alert('행을 선택 해주세요');
		}					
	});
	$('#jqueryGridTable_iledit').data('events').click.indexChange(0,1); // Array Move를 이용하여 이벤트 순서 변경
	*/
	// //save, edit 이벤트 다시 바인딩(jqueryGrid.js 에서 수정 처리 함)
};

$(document).ready(function() {	
	// testFunctionSub();
	
	$('body').addClass('redMondC'); // redMondC Class 적용			
	
	var _rootDirStr = gm.globalObject.getRootDirStr(); 
	var _jqueryGridLangFilePathStr = _rootDirStr + '/js/pc/public/ext/jqueryGrid/lang/grid.locale-kr.js';
	// 언어 스크립트를 부르지 않으면 Invalid XML: resultData 에러 발생 함
	$.getScript(_jqueryGridLangFilePathStr)
	  .done(function( script, textStatus ) {
		jqGridRestMappingStartSub();
	  	jqGridRestStartSub();		  	
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    alert(_jqueryGridLangFilePathStr+' JS Call Error');
	});
});