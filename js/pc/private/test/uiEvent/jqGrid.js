'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	/*
	// 아래 코드는 한번만 되긴하나 off도 써줘 야하기 때문에 안함
	$(document).off('click', '#rightClickDiv').on('click', '#rightClickDiv', function(e){
	    $.debug(jsFileNameStr, printStackTrace(), 'clicked', this);
	});
	*/

	// click 이벤트 delegate, live, bind 방식 스터디
	// 우선 순위: 1: bind, 2: delegate, 3: live(bind는 .on 방식을 쓰나 안 쓰나 순위에는 상관없고 먼저 선언한 것이 우선시 됨)	
	// 우선 순위 결과
	/*
	clicked(bind(on 사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨 
	clicked(bind(on 비사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨 
	clicked2(bind(on 비사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨 
	clicked2(bind(on 사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨 
	clicked(delegate, delegator: div#paneCenterDiv) 
	clicked2(delegate, delegator: div#paneCenterDiv) 
	clicked(live, delegator: document) 
	clicked2(live, delegator: document) 
	*/
	window.clickEventStudy = function() {
		$(document).on('click', '#rightClickDiv', function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked(live, delegator: document)', this);
		});
		
		// 아래 코드처럼 하면 live가 아닌 delegate로 이벤트가 생기면서 1개만 생김
		// document나 #bodyMainDiv로 하면 안되고 꼭 #paneCenterDiv로 해야 함
		// 귀찮으면 위 처럼 쓰는것도 방법임(on, off 방법)	
		$('#paneCenterDiv').on('click', '#rightClickDiv', function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked(delegate, delegator: div#paneCenterDiv)', this);
		});		
		// //아래 코드처럼 하면 live가 아닌 delegate로 이벤트가 생기면서 1개만 생김	
		
		$('#rightClickDiv').on('click', function(e){
			// 크롬 기본 Event Listeners에서 확인 가능하나 의미 없음(function 내용 확인 불가)
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked(bind(on 사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨', this);
		});
		
		$('#rightClickDiv').click(function(e){
			// $('#rightClickDiv').on('click', function(e){ ... });과 같음
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked(bind(on 비사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨', this);
		});
		
		// 순위 파악을 위해서 중복 코드 추가
		$('#rightClickDiv').click(function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked2(bind(on 비사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨', this);
		});
		
		$('#rightClickDiv').on('click', function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked2(bind(on 사용), delegator: "@(this element)"):Chrome Jquery Events표시는 regular로 됨', this);
		});	
		
		$('#paneCenterDiv').on('click', '#rightClickDiv', function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked2(delegate, delegator: div#paneCenterDiv)', this);
		});				
	
		$(document).on('click', '#rightClickDiv', function(e){
		    $.debug(jsFileNameStr, printStackTrace(), 'clicked2(live, delegator: document)', this);
		});
		// //순위 파악을 위해서 중복 코드 추가
	};
	// //click 이벤트 delegate, live, bind 방식 스터디
	clickEventStudy();
	
	// delegate 방식으로 변경하기 위해서 주석
	/*
	$(document).off('click','#btnGetData').on('click', '#btnGetData', function(e){
		var latestData = $('#jqueryGridTable').jqGrid('getRowData');
		$.debug(jsFileNameStr, printStackTrace(), latestData);		
	});	
	*/
	// //delegate 방식으로 변경하기 위해서 주석
	
	// Dynamic Html 방식에서는 이(delegate)처럼 써야 함
	window.btnGetDataClickOn = function() {
		var latestData = $('#jqueryGridTable').jqGrid('getRowData');
		$.debug(jsFileNameStr, printStackTrace(), latestData);		
	};
	$('#paneCenterDiv').off('click','#btnGetData').on('click', '#btnGetData', btnGetDataClickOn);	
	// //Dynamic Html 방식에서는 이(delegate)처럼 써야 함
		
	// $(document)의 events를 debug(엘리먼트 이벤트(Live) 존재 여부 확인)
	// $.debug(jsFileNameStr, printStackTrace(), $(document).data("events"));
	// //$(document)의 events를 debug(엘리먼트 이벤트(Live) 존재 여부 확인)
	
	// $('#paneCenterDiv')의 events를 debug(엘리먼트 이벤트(Delegate) 존재 여부 확인)
	// $.debug(jsFileNameStr, printStackTrace(), $('#paneCenterDiv').data("events"));
	// //$('#paneCenterDiv')의 events를 debug(엘리먼트 이벤트(Delegate) 존재 여부 확인)
	
	// $('#rightClickDiv')의 events를 debug(엘리먼트 이벤트(bind) 존재 여부 확인)
	// $.debug(jsFileNameStr, printStackTrace(), $('#rightClickDiv').data("events"));
	// //$('#rightClickDiv')의 events를 debug(엘리먼트 이벤트(bind) 존재 여부 확인)
});