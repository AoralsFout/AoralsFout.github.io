<?php
if (!defined('puyuetian'))
	exit('403');

$content = htmlspecialchars(strip_tags($_POST['content']));
if (!$content) {
	ExitJson('请输入内容后再提交');
}

$data = array('content' => $content, 'ip' => getClientInfos('ip'), 'datetime' => date('Y-m-d H:i:s'));

$_G['TABLE']['MSG'] -> newData($data);

ExitJson('<tr><td class="pk-text-sm"><p style="white-space:pre;word-break:break-all">[New]&nbsp;' . $data['content'] . '&nbsp;[IP:' . $data['ip'] . '发表于' . $data['datetime'] . ']</p></td></tr>', TRUE);
