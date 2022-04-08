<?php
if (!defined('puyuetian'))
	exit('403');

//=========================模板初始化========================
$_G['HTMLCODE']['MAIN'] .= template('head', TRUE);
$_G['HTMLCODE']['MAIN'] .= template('body', TRUE);
$_G['HTMLCODE']['MAIN'] .= template('foot', TRUE);

$_G['HTML'] = template('main', TRUE);