<?php
if (!defined('puyuetian'))
	exit('403');

if ($_G['GET']['LOGOUT']) {
	$_SESSION['ADMIN'] = 0;
	ExitGourl('index.php');
}

if ($_SESSION['ADMIN']) {
	ExitJson('已登录无需重复登录', TRUE);
}

if ($_POST['password'] != $_G['SET']['PASSWORD']) {
	ExitJson('密码错误');
}
$_SESSION['ADMIN'] = 1;
ExitJson('删除成功', TRUE);
