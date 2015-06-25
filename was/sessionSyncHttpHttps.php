<?
// 테스트 URL : http://192.168.0.147/krooms/was/sessionSyncHttpHttps.php?syncType=get&GmToken=epcfasmii4vq1kjso42in2fa07
if(isset($_REQUEST['syncType'])) {
    if($_REQUEST['syncType'] === 'set') {
        if(!isset($_REQUEST['GmToken'])) {
            echo 'GmToken is empty';
        } else {
            session_name('GmToken');
            session_id($_REQUEST['GmToken']);
            session_start();
            if(isset($_SESSION['userId'])) {
                echo 'Success : userId = '.$_SESSION['userId'];
            } else {
                echo 'Fail : GmToken is not in the current server';
            }
        }
    } else if($_REQUEST['syncType'] === 'get') {
        session_name('GmToken');
        session_start();
        if(isset($_SESSION['userId'])) {
            echo 'userId = '.$_SESSION['userId'];
        } else {
            echo 'GmToken is not in the current server';
        }
    }
} else {
    echo 'syncType is empty';
}
?>