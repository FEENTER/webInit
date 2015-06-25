'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
// http://yard.tistory.com/entry/samplejs 참조 후 개발 하기
    
$(document).ready(function() {
    var jsFileNameStr = gm.globalObject.getRootDirStr() + '/js/pc/public/layout/tabs/initUiD/index.js';
    var thisMainDivIdStr = '#testManagerMainDiv';    
    
    $('body').addClass('redMondC');
    
    var tabsDiv = $("#tabsDiv").tabs({
        show: function() {} // tab active 될 때 애니메이션을 삭제
    });        
    var tabCounter = 2;
    
    gmf.addTab = function(_tabTitle, _tabSrc, _callBackSub) {
        var tabTitle = _tabTitle || 'testTab', // _tabTitle 값이 없으면 'testTab'로 설정
        iframeSrc = _tabSrc || 'http://www.hoteljoin.com',
        tabContent = '<iframe src="'+iframeSrc+'" scrolling="no" frameborder="0" width="100%"></iframe>',
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",        
        label = tabTitle,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent;
     
        tabsDiv.find( ".ui-tabs-nav" ).append( li );
        tabsDiv.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
        tabsDiv.tabs( "refresh" );
        
        // 추가된 Tab을 자동으로 활성화 하기
        /*
         * 콜백으로 처리해야 버그가 없음(동적으로 1개씩 하면 버그 없음)
         */
        tabsDiv.tabs('option','active', tabCounter-1);
        
        tabCounter++;
        
        tabsDiv.tabs('load', '#'+id);
        if(typeof(_callBackSub) == 'function') {
            _callBackSub();
        }
    };
    
    tabsDiv.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabsDiv.tabs( "refresh" );
    });
 
    tabsDiv.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabsDiv.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabsDiv.tabs( "refresh" );
      }
    });
   
    gmf.addTab('Super','/webInit/html/pc/private/test/testTab.html', function() {
        $('#tabsDiv').tabs('option','active', $('#tabsDiv > ul > li').length - 1);
        $('iframe').iframeAutoHeight();
    });
});