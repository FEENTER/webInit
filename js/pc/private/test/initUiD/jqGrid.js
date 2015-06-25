'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
window.jsFileNameStr = "/managerHotel/js/pc/private/test/initUiD/jqGrid.js";
function testFunctionSub() {
	$.debug(jsFileNameStr, printStackTrace(), 'testFunctionSub Start');
};	

$(document).ready(function() {	
	testFunctionSub();
	
	// 한번만 바인딩 하기 위해서 전체 모두 해제
	$.contextMenu('destroy', {selector: '#rightClickDiv'}).contextMenu({
	    selector: '#rightClickDiv', 
	    callback: function(key, options) {
	        var m = "clicked: " + key;
	        window.console && console.log(m) || alert(m); 
	    },
	    items: {
	        "edit": {name: "Edit", icon: "edit"},
	        "cut": {name: "Cut", icon: "cut"},
	        "copy": {name: "Copy", icon: "copy"},
	        "paste": {name: "Paste", icon: "paste"},
	        "delete": {name: "Delete", icon: "delete"},
	        "br": "---------",
	        "quit": {name: "Quit", icon: "quit"}
	    }
	});	
	
	// #positionTestDivParent의 오른쪽 밑의 점에 #positionTestDiv의 왼쪽 위의 점에 위치 시키기	
	$('#positionTestDiv').position({
		of: $('#positionTestDivParent'),
		my: 'left top', 
		at: 'right bottom'
	});	
});