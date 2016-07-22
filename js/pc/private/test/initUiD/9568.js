'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {		
	var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/private/test/initUiD/9568.js';
		function testFunctionSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
	};
	
	testFunctionSub();
	
	// ajax Call 후에 jqGrid 작성(Data, Names, Model을 동적으로 수행), addOnUiPc에 jqGridInitPub 추가됨
	// 참조 URL : http://stackoverflow.com/questions/2277962/jqgrid-and-dynamic-column-binding
	
	function jqGridLocalJsonInitSub() {
		$.debug(jsFileNameStr, printStackTrace(), 'jqGridInitSub Start');	

		// jqGrid 모든 function : http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs	  	
		// jqGrid 기본 설정 처리
		$("#navgrid").jqGrid ({			
			// url:'/jqGridDemo/4x/webInitServer.php?q=2',
			// editurl:"/jqGridDemo/4x/someurl.php",
			// datatype: 'json',
			datatype: 'clientSide', 
			prmNames: {		
			},	
			colNames:['No','구분', '접수일시', '체크인','체크아웃','예약자','투숙자','객실명','객실수','박수','입금액','예약번호','담당자','예약상태','진행상태'],
			colModel:[
				{name:'id'},
				{name:'invdate'},
				{name:'name'},
				{name:'amount'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'invdate'},
				{name:'tax'},
				{name:'total'},
				{name:'note'}
			],			
			rowNum:10,
			pager: '#pagernav',
			sortname: 'id',			
			sortorder: "desc",
			viewrecords: true,
			multiselect: false,
			caption: '&nbsp;',			
			footerrow : true,
			userDataOnFooter : true,
			altRows : false,
			loadonce: true,
	        shrinkToFit: true,
		    autowidth: true,
		    // width: '1024',
		    height: '100%',		   
			afterInsertRow: function() {
			},
			localReader: {
			   root: "rows",
			   page: "page",
			   total: "total",
			   records: "records",
			   repeatitems: true,
			   cell: "cell",
			   id: "id",
			   userdata: "userdata"
			},
			loadComplete: function(){	
					$.debug(jsFileNameStr, printStackTrace(), 'loadComplete', arguments); // datatype: 'clientSide'시에 페이지 이동 버튼 클릭시 발생
					var addRowDataJson = {"page":arguments[0].page,"total":"3","records":"113","rows":[{"id":arguments[0].page+"1","cell":{"id":arguments[0].page+"1","invdate":"2007-10-06","name":"Client 3","amount":"1000.00","tax":"0.00","total":"1000.00","note":"null"}},{"id":"12","cell":{"id":"12","invdate":"2007-10-06","name":"Client 2","amount":"700.00","tax":"140.00","total":"840.00","note":"null"}},{"id":"11","cell":{"id":"11","invdate":"2007-10-06","name":"Client 1","amount":"600.00","tax":"120.00","total":"720.00","note":"null"}},{"id":"10","cell":{"id":"10","invdate":"2007-10-06","name":"Client 2","amount":"100.00","tax":"20.00","total":"120.00","note":"null"}},{"id":"9","cell":{"id":"9","invdate":"2007-10-06","name":"Client 1","amount":"200.00","tax":"40.00","total":"240.00","note":"null"}},{"id":"8","cell":{"id":"8","invdate":"2007-10-06","name":"Client 3","amount":"200.00","tax":"0.00","total":"200.00","note":"null"}},{"id":"7","cell":{"id":"7","invdate":"2007-10-05","name":"Client 2","amount":"120.00","tax":"12.00","total":"134.00","note":"null"}},{"id":"6","cell":{"id":"6","invdate":"2007-10-05","name":"Client 1","amount":"50.00","tax":"10.00","total":"60.00","note":"null"}},{"id":"5","cell":{"id":"5","invdate":"2007-10-05","name":"Client 3","amount":"100.00","tax":"0.00","total":"100.00","note":"no tax"}},{"id":"4","cell":{"id":"4","invdate":"2007-10-04","name":"Client 3","amount":"150.00","tax":"0.00","total":"150.00","note":"no tax"}}],"userdata":{"amount":3220,"tax":342,"total":3564,"name":"Totals:"}};	
					$("#navgrid")[0].addJSONData(addRowDataJson);
					
					var colModel = $("#navgrid").jqGrid('getGridParam', 'colModel'); // 컬럼명을 배열형태로 가져온다.  
					$("#navgrid").jqGrid("setLabel", colModel[4]['name'], "8(금)");
			},
			loadError : function() {
			  alert('jqGrid Data 호출 실패');
			},
			onSelectRow: function(id){			
				$.debug(jsFileNameStr, printStackTrace(), 'onSelectRow', arguments);
			},
			ondblClickRow: function(id) {
				$.debug(jsFileNameStr, printStackTrace(), 'ondblClickRow', arguments);
			},
			gridComplete : function() {			
				$('.ui-jqgrid-titlebar-close').hide();
			}
		});
		// //jqGrid 기본 설정 처리
		
		// jqGrid Pager 모양(navGrid) 및 이벤트 처리
		$("#navgrid").jqGrid('navGrid','#pagernav',		
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
	};		
	
	function jqGridInitSub() {
		// $.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
		
		var _customSearchModeBool = false;
		$('#customSearchButton').on('click', function() {
			// $("#navgrid").jqGrid('setGridParam',{url:'someurl.php?name=nameValue&amount=amountValue&_search=true'}).trigger('reloadGrid');
			_customSearchModeBool = true;
			 $("#navgrid").trigger("reloadGrid");
		});
	  	
	  	$("#btn_export").button();	
		$("#btn_export").click(function() {
			//$.debug(jsFileNameStr, printStackTrace(), $("#navgrid").jqGrid('jqGridExport',{exptype:"xmlstring", root: 'grid_data'})); //grid_data XML 최상이 이름 정하기			
			//$.debug(jsFileNameStr, printStackTrace(), $("#navgrid").jqGrid('jqGridExport'));
			
			//밑에 navButtonAdd와 같은 결과 임
			//http://192.168.0.99/excelExport.php?_search=false&nd=1353981634929&rows=10&page=1&sidx=name+desc%2C+id&sord=desc&oper=excel
			//완성 ^^
			$.debug(jsFileNameStr, printStackTrace(), $("#navgrid").jqGrid('excelExport',{url:"/jqGridDemo/4x/excelExport.php"}));
		});
	  	
		
	  	//jqgrid 시작	  	
	  	// jqGrid 모든 function : http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs
	  	
	  	// 기본 검색 용 탬플릿 작성
		var template1 = 
		{ "groupOp": "AND",
			  "rules": [
				{ "field": "name", "op": "bw", "data": "Client 1" },
				{ "field": "amount", "op": "gt", "data": "20"}
			  ]
		};
		
		var template2 =
		{ "groupOp": "AND",
			  "rules": [
				{ "field": "name", "op": "eq", "data": "Client 2" },
				{ "field": "id", "op": "le", "data": "10"}
			  ]
		};
		// //기본 검색 용 탬플릿 작성
		
		var lastsel2=''; // 선택된 row의 ID
		// jqGrid 기본 설정 처리
		$("#navgrid").jqGrid ({
			ajaxGridOptions : {type:"POST"},
			serializeGridData : function(postdata) {
				//alert(postdata.page);
				//page를 1로 고정 시키고 값을 전달
				//postdata.page = 1;
				// Custom Search 기능 사용시 _search true로 세팅 후 사용
				if(_customSearchModeBool) {
					// postdata._search = true; // 커스텀 파라메터명 변경으로 인해 주석처리
					postdata.customSearchMode = true;
				}
				// //Custom Search 기능 사용시 _search true로 세팅 후 사용
				console.info('Search 값 전달');
				$.debug(jsFileNameStr, printStackTrace(), postdata);
				console.info('//Search값 전달');
				return postdata;
			},
			//데이터를 받아오는 url은 server.php
			url:'/jqGridDemo/4x/webInitServer.php?q=2',
			//수정,삭제가 되면 someurl.php를 부름
			editurl:"/jqGridDemo/4x/someurl.php",
			//응답 데이터 형식은 json
			datatype: "json", // 여기서 function을 이용해서 webMethod 및 형식 변경가능(ajax 문법으로)
			//보이는 컬럼명 입력			
		    // 커스텀 파라메터명으로 변경
		    // http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
			prmNames: {
				// page: "page.page",
				// rows: "page.size",
				// sort: "page.sort",
				// order: "page.sort.dir"
				search: 'customSearchMode'
			},
			// 기본 colModel 세팅
            cmTemplate: {
                align: 'center'
            },
            // //기본 colModel 세팅
			// // 커스텀 파라메터명으로 변경			
			colNames:['Control','Inv No','Date', 'Name', 'Amount','Tax','Total','Notes'],
			//보이는 컬럼명에 1:1 매칭
			colModel:[
				//무조건 순서대로 들어온 데이터에 대해서 id와 index를 준거임 이름은 DB 필드명과 틀려도 상관 없음(jsonReader에 의존 됨)
				//server.php의 JSON Data에서 처음에 빈칸이 오게 해서 처리
				//formatter:'actions'이면 formatoptions 처리하여 수정, 삭제 아이콘 표시
				//http://www.trirand.com/jqgridwiki/doku.php?id=wiki:predefined_formatter	
				//search: search 창 나올때 컬럼 보이는 여부(default: true)
				//index는 컬럼명 클릭시 sort 될때 파라미터 값이 됨
				//sortable: 정렬 가능 여부(default: true)
				//formatoptions > keys: Enter 키 눌렀을 때 저장 여부
				{name: 'Control', width:50, fixed:true, sortable:false, resize:false, formatter:'actions', formatoptions:{
					keys:false, editbutton : true, delbutton : true, delOptions: {
						serializeDelData: function(_requestData) {
							// 여기서 myac에 Del Click시 데이터를 보내기 전에 가공할 수 있음		
							return _requestData;
						}
					}
				}, search: false, hidden: true},		
				//{name: 'myac', width:50}, //gridComplete와 연계하여 컨트롤 배치함(사용시 컬럼 갯수가 맞어야 하기 때문에 Control 주석해야지 가능)
				//id는 수정이 될 때 안 보이게 하고 읽기 전용
				{name:'id', key : true, index:'id', width:55,editable:false,editoptions:{readonly:true,size:10}, searchtype:"integer"},
				//invdta는 수정이 될때 보이고 클릭을 하게 되면 datepicker을 실행하고 기본은 오늘 날짜로 세팅
				{name:'invdate',index:'invdate', width:80,editable:true,editoptions:{size:10,
				dataInit:function(el){
					$(el).datepicker({dateFormat:'yy-mm-dd'});
				},
				defaultValue: function(){
					var currentTime = new Date();
					var month = parseInt(currentTime.getMonth() + 1);
					month = month <= 9 ? "0"+month : month;
					var day = currentTime.getDate();
					day = day <= 9 ? "0"+day : day;
					var year = currentTime.getFullYear();
					return year+"-"+month + "-"+day;				
				}
				}, formatter:'date', formatoptions:{srcformat:"Y-m-d",newformat:"Y-m-d"}},				
				//name는 수정시 seletebox로 FedEx, TNT로 보이게 하고 DB에는 FE, TN이 전달, 수정될 때 보이기는 Name으로 변경하고
				//Text 필드 앞에(*) 붙게하고 필수 필드임(꼭 넣어야 함)
				{name:'name', index:'name', width:90, editable:true, formatter: "select", editoptions:{value: 'FE:FedEx;TN:TNT;Client 2:바보'}, edittype:"select"
				    , formoptions:{label: "Name", elmprefix:"(*)"},editrules:{required:true}
				},
				//name 필드와 동일하나 일반 Text박스 임(groupingView의 summaryType에 들어갈 값은 최소 값)
				{name:'amount',index:'amount', width:60, align:"right",editable:true,editoptions:{size:10}, formoptions:{elmprefix:"(*)"}, editrules:{required:true}, summaryType:'min', searchtype:"number"},
				//tax 필드는 수정시 커스텀 룰을 적용(mycheck) 하여 값을 확인 함(groupingView의 summaryType에 들어갈 값은 합계 값)
				{name:'tax',index:'tax', width:60, align:"right",editable:true,editoptions:{size:10}, editrules:{custom:true,custom_func:mycheck}, summaryType:'sum'},						
				//(groupingView의 summaryType에 들어갈 값은 최대 값)
				{name:'total',index:'total', width:60,align:"right",editable:true,editoptions:{size:10}, summaryType:'max'},		
				//note는 textbox가 아닌 textarea를 적용함(groupingView의 summaryType에 들어갈 값은 카운터고 타입은 summaryTpl 값)
				{name:'note',index:'note', width:100, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"20"}, summaryType:'count', summaryTpl:'<b>{0} Item(s)</b>'}		
			],			
			//1페이지에 10개를 보이게 함
			rowNum:10,
			//1페이지에 10,20,30개를 보이게 선택 가능하게 함
			rowList:[10,20,30],
			//위에 pager에 들어가는 id를 입력
			pager: '#pagernav',
			//기본 정렬 필드는 id
			sortname: 'id',
			//jqGrid 오른쪽 밑에 카운터 보기
			viewrecords: true,
			//내림차순 정렬(높은게 위로)
			sortorder: "desc",
			//선택박스 추가
			multiselect: true,
			//게시판의 타이틀 이름 기입
			caption:"Navigator Example",
			//맨 밑에 row 필드를 보이게 함
			footerrow : true,
			//맨 밑에 row 필드에 숫자로 된 필드는 총합을 보여 줌(server.php에서 userdata로 준거임)
			userDataOnFooter : true,
			//row 색이 번갈아 가면서 바뀌게 하기			
			altRows : true,
			// 마우스 hover 시에 css 반영 안되게 하기
			hoverrows:false,
			// true시에 한번만 불러옴(그냥 계속 이 화면에서 처리됨 url 및 editurl 사용 안 함 그룹핑을 변경해도 js에서 처리됨)
			// true시에는 reloadGrid 작동안함
			loadonce: false,
            autowidth: true, // jqGrid 외부 width 자동으로(true 선언시 colModel의 width이 반영이 되면서 100%로 늘려줌, 밑에 width 반영이 안됨)
			//테이블의 넓이(jqGrid 외부 width)
			//width:'610',
			//테이블의 높이(jqGrid 외부 height)
		    //height: '100%',
	        shrinkToFit: true, // jqGrid 내부 width 자동 100% 맞춤(col frozen을 위해서는 false로 해야 함)
	    	// rownumbers: true, // row의 번호 왼쪽에 표시	    	
	    	// 요청 json에 따라 포멧 변경이 가능하게 함
			jsonReader: {
		        // repeatitems:false, // "rows":["id":"13", {"cell":{'13','aa'}}...
		        repeatitems:true,  // "rows":["id":"13", {"cell":{"id":"13"... // 이게 기본임(colModel name 에 매칭)
				id: "id" // id 를 Name에 맵핑
		    },		    
			//그룹 기능 켜기
			grouping: true,			
			groupingView : {
				//그룹의 필드는 name
				groupField : ['name', 'invdate'],
				//그룹의 필드는 안보이게 하기
				groupColumnShow : [true],
				//그룹의 필드 옆에 카운터 보이게 하기
				groupText : ['<b>{0} - {1} Item(s)</b>'],
				//그룹핑된거 처음 보일 때 펼쳐서 보이기
				groupCollapse : false,
				//그룹핑 된거 내림차순으로
				groupOrder: ['desc', 'desc'],
				//젤 밑에 합계 보여주기
				groupSummary : [true]   		
			},
			//DB에서 입력 받으면서 화면에 뿌려지면서 처리 name 필드의 데이터가 조건에 따라 색을 변경(grouping가 True면 동작 안 함)		    
			afterInsertRow: function(rowid, aData){
			  //alert("afterInsertRow");
			  switch (aData.name) {
				case 'Client 1':
					$("#navgrid").jqGrid('setCell',rowid,'total','',{color:'green'});
				break;
				case 'Client 2':
					$("#navgrid").jqGrid('setCell',rowid,'total','',{color:'red'});
				break;
				case 'Client 3':
					$("#navgrid").jqGrid('setCell',rowid,'total','',{color:'blue'});
				break;				  
			  }
			},			
			//DB데이터 입력이 완료되고 나면 실행
			loadComplete: function(){
				// alert("loadComplete");
				var ret;
				//alert("This function is executed immediately after\n data is loaded. We try to update data in row 13.");
				ret = $("#navgrid").jqGrid('getRowData',"13");
				if(ret.id == "13"){
					$("#navgrid").jqGrid('setRowData',ret.id,{note:"<font color='red'>Row 13 is updated!</font>"});
				}
				$('.ui-jqgrid-titlebar-close').hide(); // 테이블 접히는 기능 삭제(버그가 있음)
			},
			//DB에서 받아오다가 에러가 생기면 에러 메시지 출력
			loadError : function(xhr,st,err) {
			  $("#navgrid").html("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText);
			},
			//필드를 선택하면
			cellEdit: true, // Cell 수정이 가능하게 하면 onSelectRow 처리 안 됨: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:cell_editing
			cellsubmit: 'clientArray', // $('#navgrid').jqGrid('getChangedCells'); 를 이용해서 변화된것만 보낼 수 있음 // 틀려진 Cell만: ('getChangedCells','dirty'), 전체 Row: ('getChangedCells','all'); // Default: all
			// getChangedCells 초기화
			/*
			$('tr.edited[role="row"]').removeClass('edited');
            $('td.dirty-cell[role="gridcell"]').removeClass('dirty-cell');
            */
			// //getChangedCells 초기화
			// cellsubmit: 'remote' 사용시 cellurl 이 꼭 필요함
			
			onSelectRow: function(id){			
				$.debug(jsFileNameStr, printStackTrace(), 'onSelectRow', arguments);
				if(id && id!==lastsel2){
					//$('#navgrid').jqGrid('restoreRow',lastsel2); // 기존 row 복구
					//$('#navgrid').jqGrid('editRow',id,true);     // 현재 row Edit 모드
					//alert("선택 된 셀 : "+id);
					lastsel2=id;
				}
			},
			// row를 더블 클릭하면
			ondblClickRow: function(id) {
				$.debug(jsFileNameStr, printStackTrace(), 'ondblClickRow', arguments);
				// $(this).jqGrid('editGridRow', id, true); // Edit Modal 창이 뜨면서 수정됨으로 주석처리 함									
				// $("#navgrid").jqGrid('editRow',id, true); // Edit Row 로 처리(Control Icon 변환 필요)
				// $.fn.fmatter.rowactions(id,'navgrid','edit',1); // jqGrid v4.4(버그)
				// $.fn.fmatter.rowactions.call(this,'edit'); // jqGrid v4.6(버그)				 
			},
			gridComplete : function() {
				// $.debug(jsFileNameStr, printStackTrace(), $("#navgrid").jqGrid('getGridParam')); // 현재 환경 설정 보기
				var tm = $("#navgrid").jqGrid('getGridParam','totaltime');
				$("#speed_div").empty().append("그리드 완성 : "+tm+" ms");				
				
				// myac 처리(row 왼쪽에 커스텀 버튼 추가)
				/*
				var ids = $("#navgrid").jqGrid('getDataIDs');				
				for(var i=0;i<ids.length;i++){
					var cl = ids[i];
					be = "<input style='height:22px;width:20px;' type='button' value='E' onclick=\"$('#navgrid').jqGrid('editRow','"+cl+"');\"  />"; 
					se = "<input style='height:22px;width:20px;' type='button' value='S' onclick=\"$('#navgrid').jqGrid('saveRow','"+cl+"');\"  />"; 
					ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"$('#navgrid').jqGrid('restoreRow','"+cl+"');\" />"; 
					$("#navgrid").jqGrid('setRowData',ids[i],{myac:be+se+ce});
				}
				*/
			}
		});
		// //jqGrid 기본 설정 처리			
		// var groupSelectAgo = 'name'; // 기본 그룹 컬럼명(groupingView 에 설정된 컬럼명)		
		// $("#navgrid").jqGrid('hideCol', groupSelectAgo); // 기본 그룹 컬럼 숨기기
				
		// jqGrid Pager 모양(navGrid) 및 이벤트 처리
		// navGrid의 옵션은 왼쪽 밑에 아이콘 중에 | 의 왼쪽 부분 임
		$("#navgrid").jqGrid('navGrid','#pagernav',		
		// Pager Icon View options
		//#navgrid jqgrid에 상세보기, 수정, 추가, 삭제 버튼이 나오게함
		//search: 검색 사용 여부(false 이면 Search options 적용 안됨)
		{view:false,edit:false,add:false,del:false,search:false,refresh:false}, // 버그가 많아서 jqGrid는 Listing 기능만 사용
		// //Pager Icon View options
		
		// Edit options
		//수정시 jqModal을 false로 함으로서 화면이 나오고 밖에 마우스 클릭시 닫아지지 않게 함
		//checkOnUpdate를 false로 함으로서 수정하고 나올 때 저장하게 물어보는 기능 하지 않게 함(변환된게 있으면 묻기)
		//savekey: [true,13] 수정시 엔터는 저장키
		//navkeys: [true,38,40] 수정시 방향표시로 위 아래로 왔다갔다
		//checkOnSubmit : true 수정 완료시 확인 메시지 묻기
		//reloadAfterSubmit:false 수정 완료 후 데이터 다시 DB에서 읽어 오지 않게
		//closeOnEscape:true Alert 다이얼 로그를 ESC Key로 닫을수 있음
		//bottominfo:"Fields marked with (*) are required" 밑에 글씨 추가
		//closeAfterEdit: true 수정 완료 되면 창 닫기
		{jqModal:true,checkOnUpdate:false,savekey: [true,13], navkeys: [true,38,40], checkOnSubmit : true, reloadAfterSubmit:false, closeOnEscape:true, bottominfo:"Fields marked with (*) are required", closeAfterEdit: true, closeAfterAdd: true, addCaption: "데이터 추가", editCaption: "데이터 수정"},
		// //Edit options
				
		// Add options
		//afterShowForm:afterShowAdd 폼이 보일때 afterShowAdd 함수 실행(폼의 모양 변경 가능)
		//beforeSubmit:validateData 폼이 전달하기 전에 validateData 함수 실행(값에 대한 검증 확인)
		//afterSubmit:processAdd 폼이 전달한 후에 processAdd 함수 실행(DB에 저장이 잘 되었는가 확인)
		//순서 : afterShowForm -> beforeSubmit -> editurl(Submit, 폼 전달) -> afterSubmit
		{jqModal:false,checkOnUpdate:false,savekey: [true,13], navkeys: [true,38,40], checkOnSubmit : false, reloadAfterSubmit:true, closeOnEscape:true,bottominfo:"Fields marked with (*) are required", closeAfterEdit: true, closeAfterAdd: true, afterShowForm:afterShowAdd, afterSubmit:processAdd, beforeSubmit:validateData, addCaption: "데이터 추가", editCaption: "데이터 수정"},
		// //Add options
		
		// Del options
		{reloadAfterSubmit:true,jqModal:false, closeOnEscape:true}, 
		// //Del options
		
		// Search options
		// http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3asearch_config#colmodel_options
		//검색에서 다중 검색 그룹핑 가능(쿼리문도 보여주게 함)
		// closeAfterSearch: 검색후 자동 닫기 여부
		// closeOnEscape: ESC 키로 닫을 수 있는 여부		
		{multipleSearch:true, multipleGroup:true, showQuery: true, closeAfterSearch: true, closeOnEscape: true,
		//검색 템플릿의 보이는 이름
		"tmplNames" : ["Template One", "Template Two"],
		//검색 템플릿의 1:1 맞춤
		"tmplFilters": [template1, template2],
		sopt:['eq', 'gt'],
		//찾기 글씨 변경
		odata : ['같음', '크다'] // 밑에서 $.jgrid.search 선언으로 '크다'가 초기화 됨
		}, 
		// //Search options
		
		// View options
		{height:280,jqModal:false,closeOnEscape:true} 		
		// //View options
		);	
		// jqGrid Pager 모양(navGrid) 및 이벤트 처리
				
		// jqGrid Pager 모양(inlineNav) 및 이벤트 처리(꼭 navGrid가 생성되고 나서 선언 해줘야 함)
		// http://www.trirand.com/jqgridwiki/doku.php?id=wiki:inline_editing&s[]=inlinenav#inlinenav
		/*
		var _jqGridIdStr = 'navgrid';
		$('#add_'+_jqGridIdStr).hide();		
		$("#navgrid").jqGrid('inlineNav','#pagernav',{edit:false, save:false, cancel:false});		
	
		// add 버튼 del icon과 자리 이동 및 클릭시 저장, 취소 버튼 보이게 하기
		$.fn.exchangePositionWith = function(selector) {
		    var other = $(selector);
		    this.after(other.clone('true'));
		    other.after(this).remove();
		};		
		$('#del_navgrid').exchangePositionWith('#navgrid_iladd');	
		$('#navgrid_iladd').on('click', function() {		
			// $.fn.fmatter.rowactions('new_row','navgrid','edit',1); // v4.4
			// $('#jEditButton_jqg1').trigger('click'); // 되긴하나 저장 후 + 버튼이 활성화가 안되고 좀 이상함
		});
		// //add 버튼 del icon과 자리 이동 및 저장, 클릭시 취소 버튼 보이게 하기
		*/
		// jqGrid Pager 모양(inlineNav) 및 이벤트 처리		
		
		// =============== 기존 jqGrid 데이터를 수정하거나 추가(Dynamic) ===============
		/*
		// jQgrid의 전체 row 데이터 가져오기
		$("#navgrid").jqGrid("getRowData");				
		// jQgrid의 전체 row의 ID 가져오기
		$("#navgrid").jqGrid("getDataIDs");			
		// 마지막에 선택된 Row ID 가져오기
		$("#navgrid").jqGrid('getGridParam','selrow');
		$("#navgrid").jqGrid('getGridParam','selarrrow'); // multiselect 용 
		// 마지막에 선택된 Row 가져오기
		$("#navgrid").jqGrid("getRowData",$("#navgrid").jqGrid('getGridParam','selrow'));
		// 선택된 Row 해제
		$("#navgrid").jqGrid('resetSelection');
		// Row 선택
		$("#navgrid").jqGrid('setSelection','4'); // 4는 key(id)임(checkbox 포함)
		// Row 삭제
		$("#navgrid").jqGrid('delRowData','4');
		// Row Value 수정(id가 4번인 name 값을 name Modify로 수정
		$("#navgrid").jqGrid('setRowData', '4', {name:"name Modify"});
		// Row 추가		
		var ids = $("#navgrid").jqGrid("getDataIDs");			
	  	var nAddIndex = ids.length;
	  	if(ids.length >= 10) { // 10은 페이지당 row 수 입력
			nAddIndex = ids[ids.length-1].rowid;
		   	$("#navgrid").jqGrid('delRowData', ids[ids.length-1]);
		}	  	
		var addRowDataArray = {id:"99", invdate:"2007-10-01", note:"Dynamic Data", amount:"200.00", tax:"10.00", total:"210.00"};
		// addRowDataArray는 꼭 colModel의 Name 명에 매칭해야 함
		$("#navgrid").jqGrid('addRowData', nAddIndex, addRowDataArray);
		// //Row 추가
		// 컬럼명 변경
		var colModel = $("#navgrid").jqGrid('getGridParam', 'colModel'); // 컬럼명을 배열형태로 가져온다.  
		$("#navgrid").jqGrid("setLabel", colModel[4]['name'], "abc"); // 4번째 컬럼명을 abc로 바꿔라
		// //컬럼명 변경
		*/
		
		// 셀 수정
		/// 값 바꾸기
        // var _editSendPriceResultStr = $('#jqGridTable').jqGrid('setCell', _iRow, _iCol, '10,000');
		/// 색 바꾸기
        // $($('#jqGridTable')[0].rows[_iRow].cells[_iCol]).addClass('edit-cell dirty-cell');
		// //셀 수정
			
		//테이블 리사이징이 가능하게 해줌
		$("#navgrid").jqGrid('gridResize',{minWidth:100,maxWidth:1000,minHeight:80, maxHeight:350});
		//테이블 사이즈 설정
		$("#navgrid").jqGrid('setGridWidth',800);
		$("#navgrid").jqGrid('setGridHeight',300);
		//테이블 컬럼명 밑에 검색 창 나오게 하기
		//$("#navgrid").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});		
		//엔터키 값 맵핑
		$("#navgrid").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("You enter a row with id:"+rowid); } } );	
		//찾기 창 바로 실행(주석 해제시 $.extend를 이기고 search option을 다시 작성 됨)
		// $("#navgrid").jqGrid('searchGrid', {sopt:['cn','bw','eq','ne','lt','gt','ew']});
		//찾기 글씨 변경
		// $.extend($.jgrid.search,{Find:"Filter Results…", caption:"Filter Results…", odata:['같음']});
				
		//http://www.trirand.net/documentation/php/_2v212tis2.htm
		//Excel로 추출하기
		//PDF로 추출하기 http://www.trirand.com/blog/phpjqgrid/examples/functionality/excel/default.php
		$('#navgrid').jqGrid('navButtonAdd','#pagernav',{id:'pager_pdf',caption:'PDF',title:'Export To PDF',onClickButton : function(e)
		{  
			//https://www.assembla.com/code/logzilla/subversion-2/nodes/trunk/html/includes/grid/php/jqGrid.php?rev=409
			//어렵다 ㅡㅡ;; (jqGrid.php에서 Excel로 저장을 해줘야 함)			
			try {
				$("#navgrid").jqGrid('excelExport',{tag:'pdf', url:'./jqGrid.php'});
			} catch (e) {
				alert(e);
				window.location= './jqGrid.php?oper=pdf';
			}
		}, buttonicon:'ui-icon-print'});		
		// //=============== 기존 jqGrid 데이터를 수정하거나 추가(Dynamic) ===============
	
		// 그룹핑 필드 변경
		$("#chngroup").change(function(){
			var vl = $(this).val();
			if(!gm.addOnUtil.getIsNull(vl)) {
				if(vl == "clear") {
					$("#navgrid").jqGrid('groupingRemove',true);
				} else {
					/*
					if(groupSelectAgo.length !== 0) {
						$("#navgrid").jqGrid('showCol', groupSelectAgo); // 컬럼 보이기
					}
					$("#navgrid").jqGrid('hideCol', vl); // 컬럼 숨기기
					groupSelectAgo = vl;
					*/
					$("#navgrid").jqGrid('groupingGroupBy',vl);										
					// $("#navgrid").jqGrid('groupingGroupBy',['amount','tax']); // 2중 그룹핑										
				}
			}			
		});
		// //그룹핑 필드 변경
		
		function mycheck(value) {
			if(parseFloat(value) >= 200 && parseFloat(value)<=300) {
				return [true,"",""];
			} else {
				return [false,"Tax는 The value should be between 200 and 300!",""];
			}
		}
		
		function afterShowAdd(formId) {
			alert("afterShowAdd");
	    }
		function validateData(postdata, formId) {
			alert("validateData : " + postdata.invdate);
			return [true,'']; 
	    }
	    function processAdd(response, postdata) {
			alert("processAdd(Response After) : " + response.status); 			
			/*
			var success = true;
	    	var message = ""
	    	var json = eval('(' + response.responseText + ')');
	    	if(json.errors) {
	    		success = false;
	    		for(i=0; i < json.errors.length; i++) {
	    			message += json.errors[i] + '<br/>';
	    		}
	    	}
	    	var new_id = "1";
	    	return [success,message,new_id];    
			*/
			if(response.status == 200)
				return [true,'']; 
			else
				alert("디비 입력 실패 다시 해주세요");
	    }
	};	
		
	var _rootDirStr = gm.globalObject.getRootDirStr(); 
	var _jqueryGridLangFilePathStr = _rootDirStr + '/js/pc/public/ext/jqueryGrid/lang/grid.locale-kr.js';
	// 언어 스크립트를 부르지 않으면 Invalid XML: resultData 에러 발생 함
	$.getScript(_jqueryGridLangFilePathStr)
	  .done(function( script, textStatus ) {
		$('body').addClass('redMondC'); // redMondC Class 적용  
		jqGridInitSub();	  	
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    alert(_jqueryGridLangFilePathStr+' JS Call Error');
	});
});