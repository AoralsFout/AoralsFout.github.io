<?php
//调试模式TRUE，运营模式FALSE
define('DEBUG', FALSE);

//程序版本，升级必备
define('PUYUETIAN_VERSION', '3.0.0');
if (DEBUG) {
	ini_set('display_errors', 'On');
	error_reporting(E_ALL | E_STRICT);
} else {
	ini_set('display_errors', 'Off');
	error_reporting(0);
}

//全局框架加载
require 'puyuetian.php';

//输出HTML到浏览器
finallyOutput($_G['HTML']);
