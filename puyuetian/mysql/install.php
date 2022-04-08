<?php
if (!defined('puyuetian'))
	exit('Not Found puyuetian!Please contact QQ632827168');

//pdo连接数据库
try {
	//$_G['PDO'] = new PDO("{$_G['SQL']['TYPE']}:host={$_G['SQL']['LOCATION']};dbname={$_G['SQL']['DATABASE']}", $_G['SQL']['USERNAME'], $_G['SQL']['PASSWORD'] . '', array(PDO::MYSQL_ATTR_INIT_COMMAND => $_G['SQL']['CHARSET']));
	$_G['PDO'] = new PDO("{$_G['SQL']['TYPE']}:{$_G['SQL']['LOCATION']}");
} catch (PDOException $e) {
	PkPopup(json_encode(array('title' => 'PDO出错', 'content' => $e -> getMessage())));
}

//系统设置的读取,所有设置统一存储为$_G['SET']数组内
$r = $_G['PDO'] -> query("select `setname`,`setvalue` from `{$_G['SQL']['PREFIX']}set` where `noload`=0");
while ($row = $r -> fetch(PDO::FETCH_ASSOC)) {
	$_G['SET'][strtoupper($row['setname'])] = $row['setvalue'];
}

//各个数据表对象的实例化，统一放置于$_G['TABLE']内，大写
$prefixlen = strlen($_G['SQL']['PREFIX']);
$r = $_G['PDO'] -> query("select name from sqlite_master where type='table'");
while ($row = $r -> fetch(PDO::FETCH_NUM)) {
	if (substr($row[0], 0, $prefixlen) == $_G['SQL']['PREFIX']) {
		$tablename = substr($row[0], $prefixlen);
		$_G['TABLE'][strtoupper($tablename)] = new Data($tablename, TRUE);
	}
}

//使用过后的无关变量清理
unset($r, $tablename, $prefixlen, $row);
