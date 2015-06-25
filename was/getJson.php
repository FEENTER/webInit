<?php
// php 기본 세팅
error_reporting(0);	// 모든 에러 숨김
error_reporting(E_ALL); // 모든 에러 출력 // !debugCode
ini_set('max_execution_time', 300); // 5분
date_default_timezone_set('Asia/Seoul');

/*
// 장기 프로세싱 처리
ignore_user_abort(1);
set_time_limit(0);
ini_set("memory_limit","512M");
*/

// CORS 설정
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Overwrite, Destination, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
// header("Content-Type: charset=utf-8");
// //CORS 설정

session_name('GmToken'); // 굿메이트 세션명
if(isset($_REQUEST['GmToken'])) {
    session_id($_REQUEST['GmToken']); // 싱글사인온 아이디
}
session_start();
// php 기본 세팅

$resultArray = array();
$resultArray['getJson']['result'] = 'false';

$requestUrlStr = $_REQUEST['proxyUrl'];
if($_REQUEST['proxyUrl'] == 'proxySessionCheck') {
    $resultArray['getJson']['result'] = 'true';
    if(isset($_SESSION['userId'])) {
        $resultArray['getJson']['userId'] = $_SESSION['userId'];
        $resultArray['getJson']['resultData'] = $_SESSION['userInfo'];
        $resultArray['getJson']['httpStatusCode'] = '200';
    } else {
        $resultArray['getJson']['resultData'] = 'false';
    }
} else if($_REQUEST['proxyUrl'] == 'logout') {
    session_destroy();
    $resultArray['getJson']['result'] = 'true';
    $resultArray['getJson']['httpStatusCode'] = '200';
    $resultArray['getJson']['resultData'] = '로그아웃 성공';
} else if($_REQUEST['proxyUrl'] == 'echo') {
    $resultArray['getJson']['result'] = 'true';
    $resultArray['getJson']['httpStatusCode'] = '200';
    $resultArray['getJson']['resultData']['date'] = date('Y-m-d H:i:s');
    $resultArray['getJson']['resultData']['remoteAddr'] = $_SERVER['REMOTE_ADDR'];
} else {
    if(!isset($_SESSION['userId']) && $requestUrlStr != '/hotelmng/login/loginApproval') {
        $resultArray['getJson']['errorNo'] = 999;
        $resultArray['getJson']['errorMsg'] = 'getJson 사용자 인증 실패(세션이 만료 되었습니다)';
    } else {
        $apiServerUrlStr = 'http://'.$_SERVER['SERVER_ADDR'].':8080/api';
        // 운영서버일 경우 운영 API로 세팅
        if($_SERVER['SERVER_ADDR'] == '222.231.25.20') {
            $apiServerUrlStr = 'http://192.168.20.4:8080/api';
        }
        // //운영서버일 경우 운영 API로 세팅

        $curlObject = curl_init();
        curl_setopt($curlObject, CURLOPT_URL, $apiServerUrlStr.$requestUrlStr);
        curl_setopt($curlObject, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlObject, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curlObject, CURLOPT_USERAGENT,'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)');
        curl_setopt($curlObject, CURLOPT_REFERER, '');
        curl_setopt($curlObject, CURLOPT_POST, true);
        // 전체 Request Body를 똑같이 전송

        // 서비스 인증

        $clientAccessIdStr = '';
        if(isset($_SESSION['userId'])) {
            $clientAccessIdStr = $_SESSION['userId'];
        } else {
            $clientAccessIdStr = 'GUEST';
        }
        $clientAccessIpStr = $_SERVER['REMOTE_ADDR'];
        $serverAccessIdStr = 'HOTELMNG-UI-SVR1-DEV';
        $serverAuthkey = 'asdfjaksdjfklasjdlf';

        // 운영서버일 경우 운영 API로 세팅
        if($_SERVER['SERVER_ADDR'] == '222.231.25.20') {
            $serverAccessIdStr = 'HOTELMNG-UI-SVR1';
            $serverAuthkey = '28f1e2240e3b152c2b2bcb0ca12f7a0e';
        }
        // //운영서버일 경우 운영 API로 세팅

        $serverAccessCrtfcKeyStr = md5($serverAuthkey.$serverAccessIdStr.$clientAccessIdStr.$clientAccessIpStr);
        // //서비스 인증

        $postDataStr = file_get_contents('php://input');
        $postDataStr = 'serverAccessId='.$serverAccessIdStr.'&serverAccessCrtfcKey='.$serverAccessCrtfcKeyStr.'&clientAccessId='.$clientAccessIdStr.'&clientAccessIp='.$clientAccessIpStr.'&'.$postDataStr;
        // echo '<xmp>'.$apiServerUrlStr.$requestUrlStr.'?'.$postDataStr.'</xmp>'; exit;
        curl_setopt($curlObject, CURLOPT_POSTFIELDS, $postDataStr);

        // 디버깅을 위한 Proxy 설정
        $proxyServerStr = '192.168.0.147:8888';
        // curl_setopt($curlObject, CURLOPT_PROXY, $proxyServerStr);
        // //디버깅을 위한 Proxy 설정

        $RequestBody = curl_exec($curlObject);

        $resultArray['getJson']['userId'] = $clientAccessIdStr;

        $resultArray['getJson']['htmlLength'] = mb_strlen($RequestBody);
        $resultArray['getJson']['detectLang'] = mb_detect_encoding($RequestBody, 'UTF-8', true);
        if(json_decode($RequestBody) == '') {
            $RequestBody = '{"resultCode":9901,"resultMessage":"RequestBody가 Json이 아니여서 getJson에서 Json으로 가공되어 처리 됨('.$RequestBody.')"}';
        }
        $resultArray['getJson']['resultData'] = json_decode($RequestBody);

        $resultArray['getJson']['errorMsg'] = curl_error($curlObject);
        $resultArray['getJson']['errorNo'] = curl_errno($curlObject);
        $resultArray['getJson']['httpStatusCode'] = curl_getinfo($curlObject,CURLINFO_HTTP_CODE);
        if($resultArray['getJson']['httpStatusCode'] == '200') {
            $resultArray['getJson']['result'] = 'true';
        }
        curl_close($curlObject);
    }
}
$resultJson = json_encode($resultArray);

/// Json 값이 null 인 key 삭제
$resultJson = preg_replace('/,\s*"[^"]+":null|"[^"]+":null,?/', '', $resultJson);

// 로그인 성공하면 세션에 userId 넣기
if(isset($_REQUEST['userId']) && $requestUrlStr == '/hotelmng/login/loginApproval') {
    if($resultArray['getJson']['resultData'] == null) {
        $resultArray['getJson']['resultData'] = '로그인 데이터 세션 추가 실패';
    } else {
        if($resultArray['getJson']['resultData']->resultCode == 0) {
            $_SESSION['userId'] = $_REQUEST['userId'];
            $_SESSION['userInfo'] = $resultArray['getJson']['resultData'];
        }
    }
}
// //로그인 성공하면 세션에 userId 넣기

echo $resultJson;
?>