ㅇ 사이트 루트 폴더 이름 변경시
  - globalObject.js에 rootDirStr 를 변경해 줘야 함 <= 140813 자동변경으로 처리함

ㅇ 모든 파일은 UTF-8 형식으로 저장해야함
ㅇ jqueryUI.css 변경시 경로 변경 후 사용
  - images/ => ../../../../../../img/pc/public/ext/jqueryUi/uiRedMond/
ㅇ jqueryUI 다운로드는
	Theme
	Select the theme you want to include or design a custom theme
	Redmond
	
	Theme Folder Name:
	uiRedMond
	
	CSS Scope:
	.redMondC
	
	로 설정해서 받았음
	사용법 : $('#accordionDiv').accordion().addClass('redMondC'); // 순서 중요(내부 화면을 보이게 한 다음 처리해야 함), jqueryUI redMondC 적용
	
ㅇ common의 공통 js는 꼭 js 파일들이 다 로드된 후에 됨으로 private js에서 사용 해야 함
   - ajaxUtil.js에서 gm.ajaxUtil.getHttp = function()을 사용하려면 위에 사용법 주석 해제를 하지 말고 function()이 끝나는 부분 밑에서 해야 함
   
ㅇ 리눅스 포팅시 UTF-8 시스템이여야 함
  - 아닐경우 convertUtf8EucKr.sh 을 이용하여 html 디렉토리만 변환해서 사용하면 됨