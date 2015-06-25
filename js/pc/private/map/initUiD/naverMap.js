'use strict';
// 파일 형식이 UTF-8인지 꼭 확인
$(document).ready(function() {
	// 네이버지도 API 초기화
	window.initNaverMap = function(_optionArray) {
		var options = $.extend({'lat' : '37.5675451', 'lng' : '126.9773356'},_optionArray);	

	    var oSeoulCityPoint = new nhn.api.map.LatLng(options.lat, options.lng);
	    var defaultLevel = 11;
	    var oMap = new nhn.api.map.Map(document.getElementById('NaverMapDiv'), { 
	                                    point : oSeoulCityPoint,
	                                    zoom : defaultLevel,
	                                    enableWheelZoom : true,
	                                    enableDragPan : true,
	                                    enableDblClickZoom : false,
	                                    mapMode : 0,
	                                    activateTrafficMap : false,
	                                    activateBicycleMap : false,
	                                    minMaxLevel : [ 1, 14 ],
	                                    size : new nhn.api.map.Size(700, 540)           });
	    
	    var oSlider = new nhn.api.map.ZoomControl();
	    oMap.addControl(oSlider);
	    oSlider.setPosition({
	            top : 10,
	            left : 10
	    });
	
	    var oMapTypeBtn = new nhn.api.map.MapTypeBtn();
	    oMap.addControl(oMapTypeBtn);
	    oMapTypeBtn.setPosition({
	            bottom : 10,
	            right : 80
	    });
	    
	    var oThemeMapBtn = new nhn.api.map.ThemeMapBtn();
	    oThemeMapBtn.setPosition({
	            bottom : 10,
	            right : 10
	    });
	    // oMap.addControl(oThemeMapBtn); // 주제별 지도 선언

	    var oBicycleGuide = new nhn.api.map.BicycleGuide(); // - 자전거 범례 선언
	    oBicycleGuide.setPosition({
	            top : 10,
	            right : 10
	    }); // - 자전거 범례 위치 지정	    
	    // oMap.addControl(oBicycleGuide);// - 자전거 범례를 지도에 추가.
	
	    var oTrafficGuide = new nhn.api.map.TrafficGuide(); // - 교통 범례 선언
	    oTrafficGuide.setPosition({
	            bottom : 30,
	            left : 10
	    });  // - 교통 범례 위치 지정.
	    // oMap.addControl(oTrafficGuide); // - 교통 범례를 지도에 추가.
	
	    var trafficButton = new nhn.api.map.TrafficMapBtn(); // - 실시간 교통지도 버튼 선언
	    trafficButton.setPosition({
	            bottom:10, 
	            right:150
	    }); // - 실시간 교통지도 버튼 위치 지정
	    oMap.addControl(trafficButton);
	    
	    // 마커 추가하기	   
	    var oSize = new nhn.api.map.Size(28, 37);
	    var oOffset = new nhn.api.map.Size(14, 37);
	    var oIcon = new nhn.api.map.Icon('http://www.hoteljoin.com/nmap/images/hotel4.gif', oSize, oOffset);
	
	    var oInfoWnd = new nhn.api.map.InfoWindow();
	    oInfoWnd.setVisible(false);
	    oMap.addOverlay(oInfoWnd);
	
	    oInfoWnd.setPosition({
	            top : 20,
	            left :20
	    });
	
	    var oLabel = new nhn.api.map.MarkerLabel(); // - 마커 라벨 선언.
	    oMap.addOverlay(oLabel); // - 마커 라벨 지도에 추가. 기본은 라벨이 보이지 않는 상태로 추가됨.
	
	    oInfoWnd.attach('changeVisible', function(oCustomEvent) {
	            if (oCustomEvent.visible) {
	                    oLabel.setVisible(false);
	            }
	    });
	    
	    var oPolyline = new nhn.api.map.Polyline([], {
	            strokeColor : '#f00', // - 선의 색깔
	            strokeWidth : 5, // - 선의 두께
	            strokeOpacity : 0.5 // - 선의 투명도
	    }); // - polyline 선언, 첫번째 인자는 선이 그려질 점의 위치. 현재는 없음.
	    oMap.addOverlay(oPolyline); // - 지도에 선을 추가함.
	   
	    var clickEventDynamicDivContent = function(_hotelCodeStr) {
	    	var _clickEventDynamicDivStyleStr = 'border-top:1px solid; border-bottom:2px groove black; border-left:1px solid; border-right:2px groove black;margin-bottom:1px;color:black;background-color:white; width: 278px;height: 144px;padding: 7px;font-size: 12px !important;';
            var _clickEventDynamicSpanStyleStr = '';
            var _divMainStyleStr='position:relative;top:9px';
            var _divLeftStyleStr='position:absolute;left:0;';            
            var _divRightStyleStr='position:absolute;left:100px;';
            var _clickEventDynamicDiv = 
				'<div style="'+_clickEventDynamicDivStyleStr+'">'
	                +'<div style="'+_clickEventDynamicSpanStyleStr+'">'  
	                	+'<span>호텔 상세 내용 : 호텔코드('+_hotelCodeStr+')</span>'
		                +'<div style="'+_divMainStyleStr+'">'
		                    +'<div style="'+_divLeftStyleStr+'"><img src="http://file.hoteljoin.com/khotelimg/91/thumb/3.JPG" alt="호텔이미지" style="width:90px;height:100px;" /></div>'	                        
		                    +'<div style="'+_divRightStyleStr+'">'
								+'<table summary="공연에대한 요금 소요시간 공연시간을 나타낸표">'
								// +'<caption>공연정보</caption>'
								+'<thead style="display: none;">'
								  +'<tr>'
								     +'<th></th>'
								     +'<th></th>'
								  +'</tr>'
								+'</thead>'
								+'<tfoot style="display: none;">'
								+'</tfoot>'
								+'<tbody>'
								  +'<tr>'
								     +'<td style="width: 55px;">등급</td>'
								     +'<td>특1급</td>'
								  +'</tr>'
								  +'<tr>'
								     +'<td>객실</td>'
								     +'<td><span style="font-weight: bold;">530</span> Room</td>'
								  +'</tr>'
								  +'<tr>'
								     +'<td>주소</td>'
								     +'<td><span>부산광역시 해운대구 중동 1408-5</span></td>'
								  +'</tr>'
								  +'<tr>'
								     +'<td>이용후기</td>'
								     +'<td><span style="font-weight: bold;">375</span> 건</td>'
								  +'</tr>'
								  +'<tr>'
								     +'<td>평가점수</td>'
								     +'<td><span style="font-weight: bold;">4.35</span>/5 점</td>'
								  +'</tr>'
								+'</tbody>' 
								+'</table>'		                    
		                    +'</div>'
		                +'</div>'
		                +'<div style="position: absolute;bottom: 10px;right: 15px;"><a href="">예약하기</a></div>'
	                +'</div>'	                
	            +'</div>';
            return _clickEventDynamicDiv;
	    };
	    
	    
	    // 마터 추가	함수			    
	    window.defaultMakerAppendSub = function(_titleStr, _LngFloat, _LatFloat, _imgSrc) {
	    	oIcon = new nhn.api.map.Icon(_imgSrc, oSize, oOffset);
	    	var oMarker = new nhn.api.map.Marker(oIcon, { title : '<div>'+_titleStr+'</div>' });
	        oMarker.setPoint(new nhn.api.map.LatLng(_LatFloat, _LngFloat));
    	    oMap.addOverlay(oMarker);	
    	    
    	    // 선택된 호텔은 기본적으로 라벨 및 상세내용 보이게 함
    	    if(_imgSrc.indexOf('http://www.hoteljoin.com/nmap/images/hotel444.gif') !== -1) {
    	    	var _hotelCodeStr = $($(oMarker._sTitle)[0].innerHTML).attr('hotelCode');
    	    	// oLabel.setVisible(true, oMarker); // 라벨 보이기
    	    	var oTarget = oMarker;    	    	
                oInfoWnd.setContent(clickEventDynamicDivContent(_hotelCodeStr));	                    
                oInfoWnd.setPoint(oTarget.getPoint());
                oInfoWnd.setPosition({right : 15, top : 30});
                oInfoWnd.setVisible(true);
                oInfoWnd.autoPosition();                
    	    }
    	    // //선택된 호텔은 기본적으로 라벨 및 상세내용 보이게 함
	    };
	    
	    // //마터 추가 함수
        
        // 호텔조인용 마우스 이벤트
        oMap.attach('mouseenter', function(oCustomEvent) {
	
	            var oTarget = oCustomEvent.target;
	            // 마커위에 마우스 올라간거면
	            if (oTarget instanceof nhn.api.map.Marker) {
	                    var oMarker = oTarget;
	                    oLabel.setVisible(true, oMarker); // - 특정 마커를 지정하여 해당 마커의 title을 보여준다.
	            }
	    });
	
	    oMap.attach('mouseleave', function(oCustomEvent) {
	
	            var oTarget = oCustomEvent.target;
	            // 마커위에서 마우스 나간거면
	            if (oTarget instanceof nhn.api.map.Marker) {
	                    oLabel.setVisible(false);
	            }
	    });
	    
	    oMap.attach('click', function(oCustomEvent) {	
	    		$.debug(jsFileNameStr, printStackTrace(), 'naverMap click', oCustomEvent.target);
	    		// $(oCustomEvent.target._elEl).attr('src','http://www.hoteljoin.com/nmap/images/hotel444.gif'); // 이미지 변경하기
	    		var _hotelCodeStr = $($(oCustomEvent.target._sTitle)[0].innerHTML).attr('hotelCode');
	            var oTarget = oCustomEvent.target;	            
	            oInfoWnd.setVisible(false); // 기본 마터 내용 숨기기
	            // 마커 클릭하면
	            if (oTarget instanceof nhn.api.map.Marker) {	                    
                    // - InfoWindow 에 들어갈 내용은 setContent 로 자유롭게 넣을 수 있습니다. 외부 css를 이용할 수 있으며, 
                    // - 외부 css에 선언된 class를 이용하면 해당 class의 스타일을 바로 적용할 수 있습니다.
                    // - 단, DIV 의 position style 은 absolute 가 되면 안되며, 
                    // - absolute 의 경우 autoPosition 이 동작하지 않습니다.                     
	                oInfoWnd.setContent(clickEventDynamicDivContent(_hotelCodeStr));		                    
                    oInfoWnd.setPoint(oTarget.getPoint());
                    oInfoWnd.setPosition({right : 15, top : 30});
                    oInfoWnd.setVisible(true);
                    oInfoWnd.autoPosition();
                    // oMap.setCenter(oTarget.getPoint(), {useEffect: true}); // 선택된 객체를 중심으로 지도 이동
                    return;
	            }
	    });
        // //호텔조인용 마우스 이벤트
		
	    // 기본 마우스 이벤트	
	    /*
	    oMap.attach('mouseenter', function(oCustomEvent) {
	
	            var oTarget = oCustomEvent.target;
	            // 마커위에 마우스 올라간거면
	            if (oTarget instanceof nhn.api.map.Marker) {
	                    var oMarker = oTarget;
	                    oLabel.setVisible(true, oMarker); // - 특정 마커를 지정하여 해당 마커의 title을 보여준다.
	            }
	    });
	
	    oMap.attach('mouseleave', function(oCustomEvent) {
	
	            var oTarget = oCustomEvent.target;
	            // 마커위에서 마우스 나간거면
	            if (oTarget instanceof nhn.api.map.Marker) {
	                    oLabel.setVisible(false);
	            }
	    });
	    // 마우스 클릭 이벤트 		
	    oMap.attach('click', function(oCustomEvent) {	    		
	            var oPoint = oCustomEvent.point;
	            var oTarget = oCustomEvent.target;	            
	            oInfoWnd.setVisible(false);
	            // 마커 클릭하면
	            if (oTarget instanceof nhn.api.map.Marker) {
	                    // 겹침 마커 클릭한거면
	                    if (oCustomEvent.clickCoveredMarker) {
	                            return;
	                    }
	                    // - InfoWindow 에 들어갈 내용은 setContent 로 자유롭게 넣을 수 있습니다. 외부 css를 이용할 수 있으며, 
	                    // - 외부 css에 선언된 class를 이용하면 해당 class의 스타일을 바로 적용할 수 있습니다.
	                    // - 단, DIV 의 position style 은 absolute 가 되면 안되며, 
	                    // - absolute 의 경우 autoPosition 이 동작하지 않습니다. 
	                    oInfoWnd.setContent('<DIV style="border-top:1px solid; border-bottom:2px groove black; border-left:1px solid; border-right:2px groove black;margin-bottom:1px;color:black;background-color:white; width:auto; height:auto;">'+
	                            '<span style="color: #000000 !important;display: inline-block;font-size: 12px !important;font-weight: bold !important;letter-spacing: -1px !important;white-space: nowrap !important; padding: 2px 5px 2px 2px !important">' + 
	                            'Hello World <br /> ' + oTarget.getPoint()
	                            +'<span></div>');	                    
	                    oInfoWnd.setPoint(oTarget.getPoint());
	                    oInfoWnd.setPosition({right : 15, top : 30});
	                    oInfoWnd.setVisible(true);
	                    oInfoWnd.autoPosition();	                    
	                    return;
	            }
	            $.debug(jsFileNameStr, printStackTrace(), 'naverMap click: ' + oPoint.toString());
	            oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);
	            var oMarker = new nhn.api.map.Marker(oIcon, { title : '마커 : ' + oPoint.toString() });
	            oMarker.setPoint(oPoint);
	            oMap.addOverlay(oMarker);
	
	            // 선그리기	        	            
	            var aPoints = oPolyline.getPoints(); // - 현재 폴리라인을 이루는 점을 가져와서 배열에 저장.
	            aPoints.push(oPoint); // - 추가하고자 하는 점을 추가하여 배열로 저장함.
	            oPolyline.setPoints(aPoints); // - 해당 폴리라인에 배열에 저장된 점을 추가함	            
	            // //선그리기
	    });	 
	    */
	    // //마우스 클릭 이벤트
	    // //기본 마우스 이벤트
	    // //마커 추가하기
	};	
	// //네이버지도 API 초기화	
	
	$.getScript('http://openapi.map.naver.com/openapi/naverMap.naver?ver=2.0&key=d8cf76b4ed9dcfa5e8a8b555de68ff92')
	  .done(function( script, textStatus ) {		
	  	initNaverMap({'lat':'37.5675451', 'lng':'126.9773356'});	 
	  	
	  	// 기본 마터 추가
	  	defaultMakerAppendSub('<div hotelCode="941" style="color:red">A호텔</div>', 126.9748314, 37.5675668, 'http://www.hoteljoin.com/nmap/images/hotel444.gif');
	    defaultMakerAppendSub('<div hotelCode="854" style="color:blue">B호텔</div>', 126.9799961, 37.5674094, 'http://www.hoteljoin.com/nmap/images/hotel4.gif');
	    defaultMakerAppendSub('<div hotelCode="750" style="color:green">C호텔</div>', 126.9788932, 37.569676, 'http://www.hoteljoin.com/nmap/images/hotel4.gif');
	    // //기본 마터 추가
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    alert('NaverMap JS Call Error');
	});	
});