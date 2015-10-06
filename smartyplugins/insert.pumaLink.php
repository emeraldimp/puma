<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information 

function smarty_insert_pumaLink($params, &$smarty) {
    if (empty($params['title'])) {
        $smarty->trigger_error("insert pumaLink missing 'title' parameter");
        return;
    }
    $page = new Page();
    $page->title = $params['title'];
    $page->find();
    if (!$page->count()) {
        return '';
    }
    $page->fetch();
    return "<a href='{$_SERVER['SCRIPT_NAME']}/page/view/{$page->id}'>{$page->title}</a>";
}

?>
