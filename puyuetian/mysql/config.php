<?php
if (!defined('puyuetian'))
	exit('403');
$_G['SQL']['TYPE'] = 'sqlite';
$_G['SQL']['LOCATION'] = "{$_G['SYSTEM']['PATH']}database/data.db";
$_G['SQL']['USERNAME'] = 'root';
$_G['SQL']['PASSWORD'] = 'hadsky.com';
$_G['SQL']['DATABASE'] = 'data';
$_G['SQL']['CHARSET'] = 'set names utf8';
$_G['SQL']['PREFIX'] = 'pk_';
