<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information 

function smarty_insert_pumaIdLink($params, &$smarty) {
    if (empty($params['id'])) {
        $smarty->trigger_error("insert pumaIdLink missing 'id' parameter");
        return;
    }
    $page = new Page();
    $page->id = $params['id'];
    $page->find();
    if (!$page->count()) {
        return '';
    }
    $page->fetch();

    $title = empty($params['title']) ? $page->title : $params['title'];
 
    if ($smarty->get_template_vars('page')->id == $page->id) {
        return $title;
    } 

    return "<a href='{$_SERVER['SCRIPT_NAME']}/page/view/{$page->id}'>{$title}</a>";
}

?>
