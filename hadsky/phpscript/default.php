<?php
if (!defined('puyuetian'))
	exit('403');

$page = Cnum($_G['GET']['PAGE'], 1, TRUE, 1);
$limit = 50;
$count = $_G['TABLE']['MSG'] -> getCount();
$pagecount = Cnum(ceil($count / $limit), 1, TRUE, 1);
$datas = $_G['TABLE']['MSG'] -> getDatas(($page - 1) * $limit, $limit, 'order by `id` desc');
$html = '';
foreach ($datas as $data) {
	$delhtml = '';
	if ($_SESSION['ADMIN']) {
		$delhtml = '[<a class="pk-text-danger pk-hover-underline" onclick="del(' . $data['id'] . ',this)" href="javascript:">删除</a>]';
	}
	$html .= '<tr><td class="pk-text-sm"><p style="white-space:pre;word-break:break-all">[' . $data['id'] . ']&nbsp;' . $data['content'] . '&nbsp;[IP:' . $data['ip'] . '发表于' . $data['datetime'] . ']' . $delhtml . '</p></td></tr>';
}

$_G['HTMLCODE']['OUTPUT'] .= $html;
