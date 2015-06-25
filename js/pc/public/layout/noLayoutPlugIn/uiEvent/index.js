'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	$(document).on('click', '#sideBarA', function(_thisEvent) {
		_thisEvent.preventDefault(); // href="#"일 경우 preventDefault() 선언으로 페이지 이동이 안되게 함
		alert('sideBarA Click');
	});
});