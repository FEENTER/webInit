// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	// http://layout.jquery-dev.net/documentation.cfm#List_of_Options
	var _layoutOptionArray = {
		initClosed: true
		, fxName: 'slide'
		, fxSpeed: 'slow'
		, spacing_open: 0
		, spacing_closed: 0
		, north__initClosed: false
		, resizable: false
		, slidable: false
		, closable: true 
		, onopen: paneOpenPub
		, onclose: paneClosePub
		, center__paneSelector: '.LayoutCenterC' //센터를 이렇게 원하는 class로 설정도 가능함
		, north__paneSelector: '.LayoutNorthC'
		, south__paneSelector: '.LayoutSouthC'
		, east__paneSelector: '.LayoutEastC'
		, west__paneSelector: '.LayoutWestC'
		, east__size: '100'
		, west__size: '50'
	};

	var _LayoutElement = $('#containerDiv').layout(_layoutOptionArray);
	// closable: true로 설정하고 open, close를 사용해야함 show, hide는 버그 있음
	_LayoutElement.open('east');
	// _LayoutElement.open('west');
	_LayoutElement.open('south');

	// http://layout.jquery-dev.net/demos/iframe_local.html <= iframe 제어 방법
	// $('#paneCenterDiv').html('<div style="overflow:hidden;width:300px;height:200px"><iframe src="../../../../../html/pc/private/test/testAccordion.html" width="160" height="160" style="margin:-2px 0 0 -2px"></iframe><div>');	
	
	$('#paneSouthDiv').append('<img src="http://img.hoteljoin.com/main_agent/2014/copy/copyright_1.png" />');
});