<?php
if (!defined('puyuetian'))
	exit('Not Found puyuetian!Please contact QQ632827168');

//get获取所要访问的文件，phpscript文件夹内
if (!$_G['GET']['C']) {
	$_G['GET']['C'] = Cstr($_G['SET']['DEFAULTPAGE'], 'default', TRUE, 1, 255);
}

$_G['SYSTEM']['SCRIPTPATH'] = "{$_G['SYSTEM']['PATH']}/phpscript/{$_G['GET']['C']}.php";
if (file_exists($_G['SYSTEM']['SCRIPTPATH'])) {
	require $_G['SYSTEM']['SCRIPTPATH'];
} else {
	RunError("\"{$_G['SYSTEM']['SCRIPTPATH']}\" doesn't exist");
}
