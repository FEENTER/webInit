'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
window.jsFileNameStr = "/managerHotel/js/pc/private/test/ajax/jqGrid.js";
function testFunctionSub() {
	$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
};	

$(document).ready(function() {
	testFunctionSub();
	
	window.jqGridRestStartSub = function() {		
		var _jqGridId = 'jqueryGridTable';
		var URL = '/webInit/restJsonp';
		$.extend($.jgrid.defaults, {
					// postData: { searchString: '', searchField: '', searchOper: '' }, // jqGrid client-side searching 할때 사용
				   	datatype: function(postdata) {    
			            $("div#load_jqueryGridTable.loading").show(); // make sure we can see loader text
			            $.ajax({
			            	url: URL,  
			                type: "GET",  
			                data: JSON.stringify(postdata),
			                dataType: 'jsonp',			                
			                jsonpCallback: 'resultData',
			                success: function(data, st) {
			                    if (st == "success") {	
			                        $('#'+_jqGridId)[0].addJSONData(data);
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
					sortname: 'id',
					sortorder: 'desc',
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
						return JSON.stringify(data);
					}					
				});
		$.extend($.jgrid.del, {					
					serializeDelData: function(data) {
						return JSON.stringify(data);
					}			
				});
	
		var editOptions = {			
			reloadAfterSubmit:false,
			ajaxEditOptions: { 
						url: 'http://headers.jsontest.com/',
						type: "POST",  
						dataType: 'json',			
						jsonpCallback: 'resultData',
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
						jsonpCallback: 'resultData',
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
			reloadAfterSubmit:false,
			ajaxDelOptions: { 
				url: 'http://headers.jsontest.com/',
				type: "POST",  
				dataType: 'json',			
				jsonpCallback: 'resultData',
				success: function(data, st) {
					$.debug(jsFileNameStr, printStackTrace(), 'del submit 후', data);									
				}
			},	
			onclickSubmit: function(params, postdata) {
				// params.url = URL + '/' + postdata;
			}
		};	
		var lastSelectRowId='';
		var options = {
			url: URL,
			editurl: URL,
			// 컬럼명 변경법: http://stackoverflow.com/questions/7311787/jqgrid-set-caption-and-column-name
			// colNames: ['id','id','id','id','id','id','id','id','id'],
			colModel:[
		   		{name:'id',index:'id', width:55,editable:false,editoptions:{readonly:true,size:10}, frozen : true},
		   		{name:'invdate',index:'invdate', width:80,
					editable:true,
					editoptions:{size:12						
						,dataInit:function(el){
							// $(el).datepicker({dateFormat:'yy-mm-dd'});							
						}
						,defaultValue: function(){							
							var currentTime = new Date();
							var month = parseInt(currentTime.getMonth() + 1);
							month = month <= 9 ? "0"+month : month;
							var day = currentTime.getDate();
							day = day <= 9 ? "0"+day : day;
							var year = currentTime.getFullYear();
							return year+"-"+month + "-"+day;			
							
						}
					},
					formoptions:{ rowpos:1, elmprefix:"(*)",elmsuffix:" 형식 yyyy-mm-dd" },
					editrules:{required:true}, 
					frozen : true					
				},
		   		{name:'name',index:'name', width:90,editable:true,editoptions:{size:25}},
		   		{name:'amount',index:'amount', width:60, align:"right",editable:true,editoptions:{size:10}},
		   		{name:'tax',index:'tax', width:60, align:"right",editable:true,editoptions:{size:10}},		
		   		{name:'total',index:'total', width:60,align:"right",editable:true,editoptions:{size:10}},
				{name:'closed',index:'closed',width:80,align:'center',editable:true,edittype:"checkbox",editoptions:{value:"Yes:No"}},
				{name:'ship_via',index:'ship_via',width:80, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;TN:TNT"}},
		   		{name:'note',index:'note', width:100, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"20"}}		
		   	],
			caption: "Books",
			pager : '#jqueryGridPagerDiv',			
			shrinkToFit: false, // jqGrid 내부 width 자동 100% 맞춤(col frozen을 위해서는 false로 해야 함)
			autowidth: false, // jqGrid 외부 width 자동으로(true 선언시 colModel의 width 및 밑에 width 반영 안됨)
			width: 600, // jqGrid 외부 width
			rownumbers: true,
			// height: 100, // jqGrid 외부 height
			jsonReader: {
		         // repeatitems:false // "rows":["id":"13"...
		         // repeatitems:true  // "rows":[{"cell":{"id":"13"... // 이게 기본임
				 // 커스텀 파라메터명 변경
				 /*
				 page: "d.page",
                 total: "d.total",
                 records: "d.records"
                 */
		    },
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
		    }
		};
	
		$('#'+_jqGridId).jqGrid(options).navGrid('#jqueryGridPagerDiv',
				// {edit:false,add:false,del:true, view:true}, // inline nav options(밑에꺼 주석처리 필요)
				{view:true}, // nav options(위에꺼 주석처리 필요)
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
		            	alert('Add 저장');		                
		            },
		        },
		        afterrestorefunc: function(rowid, response) {
		        	alert('Edit 취소');		                
		        }
		    },
		    editParams: {  		    	
		    	aftersavefunc: function(rowid, response) {
		        	alert('Edit 저장');		                
		        },
		        afterrestorefunc: function(rowid, response) {
		        	alert('Edit 취소');		                
		        }	
		    }
		});
		*/
		// //inline nav(위에 editOptions, addOptions, delOptions 작동 안됨)
		
		$('#'+_jqGridId).jqGrid('setGroupHeaders', {
		  useColSpanStyle: false, 
		  groupHeaders:[
			{startColumnName: 'id', numberOfColumns: 2, titleText: 'Client Details'}
		  ]	
		});
		// $('#'+_jqGridId).jqGrid('setFrozenColumns'); // 고정 컬럼 고정 시키기

		function pickdates(id){
			// $('#'+id+"_invdate").datepicker({dateFormat:"yy-mm-dd"});
		}
		
		 $('#'+_jqGridId).contextMenu('rightClickMenu', {
         	bindings: { 
				 'deleteRow': function(t) {
	                  alert("hello Delete Row");   
	             }
			}
		 });
	};
	
	$('body').addClass('redMondC'); // redMondC Class 적용			
	
	var _rootDirStr = gm.globalObject.getRootDirStr(); 
	var _jqueryGridLangFilePathStr = _rootDirStr + '/js/pc/public/ext/jqueryGrid/lang/grid.locale-kr.js';
	// 언어 스크립트를 부르지 않으면 Invalid XML: resultData 에러 발생 함
	$.getScript(_jqueryGridLangFilePathStr)
	  .done(function( script, textStatus ) {		
	  	jqGridRestStartSub();	
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    alert(_jqueryGridLangFilePathStr+' JS Call Error');
	});
});