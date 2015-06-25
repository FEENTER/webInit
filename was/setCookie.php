<?php
	setcookie("TestCookie2", 'tt2', time()+3600);
	$a = session_id();
	if(empty($a)) session_start();
	echo "SID: ".SID."<br>session_id(): ".session_id('111')."<br>COOKIE: ".$_COOKIE["PHPSESSID"];
?>