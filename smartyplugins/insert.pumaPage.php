<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information 

function smarty_insert_pumaPage($params, $smarty) {
    if (empty($params['title'])) {
        $smarty->trigger_error("insert pumaPage missing 'title' parameter");
        return;
    }
    $page = new Page();
    $page->title = $params['title'];
    $page->find();
    if (!$page->count()) {
        $smarty = new MySmarty();
        $smarty->assign("title", $params['title']);
        return $smarty->fetch("puma.missing-insert.html");
    }
    $page->fetch();
    $version = Version::staticGet($page->current_version);
    return $version->content; /// XXX: Do storage->display transformation here
}

?>
