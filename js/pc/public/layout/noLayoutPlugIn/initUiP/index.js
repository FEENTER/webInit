'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
    //레이어팝업
    var modalLoadingCont = $(".modalLoadingContent");
    var marginLeft = modalLoadingCont.outerWidth() / 2;
    var marginTop = modalLoadingCont.outerHeight() / 2;

    modalLoadingCont.css({
        "margin-top" : -marginTop,
        "margin-left" : -marginLeft
    });
});