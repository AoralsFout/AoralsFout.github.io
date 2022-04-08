<?php
if (!defined('puyuetian'))
	exit('403');

if (!$_SESSION['ADMIN']) {
	ExitJson('无权操作');
}

if (!$_POST['password']) {
	ExitJson('新密码不能为空');
}

$id = $_G['TABLE']['SET'] -> getId(array('setname' => 'password'));
$_G['TABLE']['SET'] -> newData(array('id' => $id, 'setvalue' => $_POST['password']));

ExitJson('修改成功', TRUE);
