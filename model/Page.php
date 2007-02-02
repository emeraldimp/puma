<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information

/* $Id$ */

/**
 * Table Definition for page
 */
require_once 'DB/DataObject.php';

class Page extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    var $__table = 'page';                            // table name
    var $id;                              // int(10)  not_null primary_key unsigned auto_increment
    var $parent;                          // int(10)  unsigned
    var $position;                        // real(22)  
    var $title;                           // string(765)  not_null
    var $current_version;                 // int(10)  unsigned
    var $read_perm;                       // int(4)  
    var $write_perm;                      // int(4)  not_null
    var $page_type;                       // string(765)  not_null

    /* ZE2 compatibility trick*/
    function __clone() { return $this;}

    /* Static get */
    function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('Page',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE

    /* static array */ function get_list() {
        $pages = array();
	$newpages = array();
        $page = new Page();
	$page->orderBy("parent, position, id");
	$page->find();
	while ($page->fetch()) {
		$pages[$page->id] = $page->toArray();
	}
        foreach ($pages as $page) {
            if ($page['parent'] == null) continue;
	    $pages[$page['parent']]['children'][] = $page['id'];
	}
        Page::set_depth($pages, 1, 0);
	Page::resort($pages, 1, $newpages);
        return $newpages; 
    }


    function resort(&$pages, $thisid, &$newpages) {
        $newpages[] = $pages[$thisid];
	if (!isset($pages[$thisid]['children'])) return;
	foreach ($pages[$thisid]['children'] as $child) {
            Page::resort($pages, $child, $newpages);
	}
        return;
    }
    
    function set_depth(&$pages, $thispage, $depth) {
        $pages[$thispage]['depth'] = $depth;
	if (!isset($pages[$thispage]['children'])) return;
	foreach($pages[$thispage]['children'] as $child) {
	    Page::set_depth($pages, $child, $depth+1);
	}
        return;
    }
    /* static boolean */ function inParentTree(/* id */ $parentid) {
        foreach($this->getPossibleParentTree() as $parent)
            if ($parent['id'] == $parentid) return true;
        return false;
    }

    /* array */ function getPossibleParentTree() {
        $pages = array();
        $page = Page::staticGet(1);
        $pages[] = $page->toArray();
        $pages[0]['depth'] = 0;
        return array_merge($pages, $page->_getPossibleParentTree($page->id, 1, $this->id));
    }

    /* private array */ function _getPossibleParentTree($parent, $depth, $stopAt) {
        $pages = array();
        $page = new Page();
        $page->parent = $parent;
        $page->orderBy("position, id");
        $page->find();
        while ($page->fetch()) {
            if ($page->id == $stopAt) continue;
	    if ($page->page_type != "html") continue;
            $inpage = $page->toArray();
            $inpage['depth'] = $depth;
            $pages = array_merge($pages, array($inpage), $this->_getPossibleParentTree($page->id, $depth + 1, $stopAt));
        }
        return $pages;
    }

    /* public array */ function getChildren($permission = 3) {
        $pages = array();
        $page = new Page();
        $page->parent = $this->id;
	$page->whereAdd("read_perm >= $permission");
        $page->orderBy("position, id");
        $page->find();
        while ($page->fetch())
            $pages[] = clone($page);
        return $pages;
    }
    
    /* static array */ function getAllChildren($depth=0) {
        $pages = array();
        $page = new Page();
        $page->parent = $this->id;
        $page->orderBy("position, id");
        $page->find();
        while ($page->fetch()) {
            $inpage = $page->toArray();
            $inpage['depth'] = $depth;
            $pages = array_merge($pages, array($inpage), $page->getAllChildren($depth+1));
        }
        return $pages;
    }

    /* public array */ function getCannonicalPages() {
        /* we want this page at the end of the list */
        if (!$this->parent)
            return array($this);
        else {
            $parent = Page::staticGet($this->parent);
            return array_merge($parent->getCannonicalPages(), array($this));
        }
    }

    function get_toppages() {
        $user = User::ensure();
        $toppage = Page::staticGet(1);
        $pages = array($toppage->toArray());
        $page = new Page();
        $page->parent = 1;
        $page->whereAdd("read_perm >= $user->permission");
        $page->orderBy("position, id");
        $page->find();
        while ($page->fetch()) {
	    $page->title = html_entity_decode($page->title);
            $inpage = $page->toArray();
            $pages = array_merge($pages, array($inpage));
        }
        return $pages;
    }
        
}
