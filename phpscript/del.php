<?php
if (!defined('puyuetian'))
	exit('403');

if (!$_SESSION['ADMIN']) {
	ExitJson('无权操作');
}

$_G['TABLE']['MSG'] -> delData($_G['GET']['ID']);

ExitJson('删除成功', TRUE);
