<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

        
function find_parents ($pages) {
    foreach ($pages as $page) {
        if ($page['page_type'] == 'html') $parents[$page['parent']] = true;
    }
    return $parents;
}

function find_leaves($pages, $parents = null) {
    /* Expects an array of page arrays */
    $parents = isset($parents) ? $parents : find_parents($pages);
    foreach ($pages as $page) {
	if (!isset($parents[$page['id']])) $leaves[$page['id']] = true;
    }
    return $leaves;
}

function find_nextprev($children) {
    foreach ($children as $id => $child) {
        $child['next'] = null;
        $child['prev'] = null;

	foreach ($children as $id2 => $child2) {
	    if ($id2 < $id && $child2['depth'] == $child['depth'])
	        $child['prev'] = $child2['id'];
	    if ($id2 > $id && $child2['depth'] == $child['depth']) {
	        $child['next'] = $child2['id'];
		break;
	    }
	}
	
	$newchildren[$child['id']] = $child;
    }
    return isset($newchildren) ? $newchildren : null;
}

function make_grippies($tree, $leaf, $newchildren) {
    // Makes the turngrippies.  Expects an array of Pages ($tree), the 
    // page we're looking at ($leaf), and an array of page arrays 
    // ($newchildren).
    
    //$turngrippiesleft = '';
    //$turngrippiesright = '';
    $turngrippies = '';
    $title = $leaf->title;
    $j = 1;
    foreach ($tree as $id => $node) {
        $turngrippiesleft = '';
        $turngrippiesright = '';
	//$title = ($node != $leaf) ? "<a href='?pagenum={$node->id}'>" . 
	//    $node->title . "</a> : " . $title : $title;
	$title = ($node != $leaf) ? "<a href='?pagenum={$node->id}'>" . 
	    $node->title . "</a>" : $title;
	$lpointers = '';
	$rpointers = '';
	$j = 1-$node->depth;
	for ($i = $j; $i > 0; $i--) {
            $lpointers .= '<';
	    $rpointers = '>' . $rpointers;
	}
	$npage = isset($newchildren[$id]['next']) ? $newchildren[$id]['next'] : null;
	$ppage = isset($newchildren[$id]['prev']) ? $newchildren[$id]['prev'] : null;

	if (isset($ppage)) {
            $turngrippiesleft = "<a href='?pagenum=$ppage' title='Go to {$newchildren[$ppage]['title']}' class='turngrippie'>". $lpointers . "</a> " . $turngrippiesleft;
	} else {
	    //$turngrippiesleft = $lpointers . " " . $turngrippiesleft;
	}

	if (isset($npage)) {
            $turngrippiesright = $turngrippiesright . " <a href='?pagenum=$npage' title='Go to {$newchildren[$npage]['title']}' class='turngrippie'>" . $rpointers . "</a>";
	} else {
	    //$turngrippiesright = $turngrippiesright . " " . $rpointers;
	}
	
        $turngrippies = "<p class='turngrippie'>" .$turngrippiesleft . " " . $title . " " . $turngrippiesright . "</p>" . $turngrippies;
    }
    
    //$turngrippies = "<p class='turngrippie'>" .$turngrippiesleft . " " . $title . " " . $turngrippiesright . "</p>";

    $turngrippies = "<div class='turngrippie'>". $turngrippies . "</div>";

    return $turngrippies;
}
	
function plugin_ebook($args, $page, $user) {
    global $DEFAULT_EBOOK_FORUM_PERM;
    $content = '';
    $pageversion = Version::staticGet($page->current_version);
    $page->current_version = $pageversion;
    $children = $page->getAllChildren($user->permission);

    $newchildren = find_nextprev($children);
    
    if (!isset($newchildren)) return null;
    
    $parents = find_parents($newchildren);
    $leaves = find_leaves($newchildren, $parents);

    reset($leaves); // We return the array's pointer to the beginning
    $firstleaf = key($leaves);
    $pagenum = isset($args['pagenum']) ? $args['pagenum'] : $newchildren[$firstleaf]['id'];

    while (isset($parents[$pagenum])) {  // Traversing to find the first leaf
	$j = 1;
	reset($newchildren);
	while (current($newchildren) != $newchildren[$pagenum]) {
            $j++;
	    next($newchildren);
	}
	$slice = array_slice($newchildren, $j);
        $pagenum = $slice[0]['id'];
    }
    
    $depth = 0;
    $leaf = Page::staticGet($pagenum);
    $leaf->depth = $depth;
    $version = Version::staticGet($leaf->current_version);
    $leaf->current_version = $version;
    $parentid = $leaf->parent;
    $tree[$leaf->id] = $leaf;
    while ($parentid != $page->id) {
        $tree[$parentid] = Page::staticGet($parentid);
	$tree[$parentid]->depth = --$depth;
	$parentid = $tree[$parentid]->parent;
    }

    $content = make_grippies($tree, $leaf, $newchildren);
    
    if ($leaf->title=="Table of Contents") {
        $content .= make_tableofContents($leaf);
    } else {
	if ($leaf->write_perm >= $user->permission) {
            $content .= "<a href='". base() ."/index.php/page/edit/{$leaf->id}'>(edit)</a><br />";
	}
        $content .= $leaf->current_version->content;
    }

    $forumpage = null;

    foreach ($children as $child) {
        if ($child['parent'] == $leaf->id && $child['page_type'] == 'forum') {
            $forumpage = Page::staticGet($child['id']);
	}
    }

    $content .= "<hr />";

    if ($forumpage) {
        include_once("forum.inc");
	$forumpage->pagenum = $leaf->id;
	$forumpage->parent = $page->parent;
	$content .= plugin_forum($args, $forumpage, $user);
    } elseif (isset($args['action']) && $args['action']=="new_forum") {
        include_once('plugins/forum.inc');
        $forum_container = new VFile();
	$parentobj = $leaf;
	$forum = new Forum($forum_container);
	$forum->perm_read = $DEFAULT_EBOOK_FORUM_PERM['read'];
	$forum->perm_write = $DEFAULT_EBOOK_FORUM_PERM['write'];
	$forum_container->set_content($forum->serialize());
	$forum_container->create($parentobj, 'forum'); 
	header("Location: ?pagenum=".$leaf->id."&forum_action=new_post");
	return;
    } elseif ($user->authorized($DEFAULT_EBOOK_FORUM_PERM['write'], "")) {
        $content .= "<a href='?pagenum=" . $leaf->id . "&action=new_forum'>Post the first message!</a>";
    }

    return $content;
}

function make_tableofContents($leaf) {
    $page = Page::staticGet($leaf->parent);
    $content = "<h3>Table of Contents</h3>";
    $content .= "<p><a href='?pagenum={$page->id}' title='Go to {$page->title}'>{$page->title}</a></p>";
    $children = $page->getAllChildren(1);
    foreach ($children as $child) {
        if ($child['page_type'] == 'html') {
	    $content .= "<p style='margin-left: ". $child['depth'] . "em'><a href='?pagenum={$child['id']}' title='Go to {$child['title']}'>{$child['title']}</a></p>";
	}
    }
    return $content;
}

function render_comments($page, $leaf) {
    if ($page->current_version->content == "") {
        $comments = array(new Comment($leaf));
    } else {
        $comments = unserialize($page->current_version->content);
    }
    $rendered_comments = "";
    foreach ($comments as $comment) {
        $rendered_comments .= "<div class='post'>";
        $rendered_comments .= "<span class='title'>" . $comment->text . "</span></div>";
        $rendered_comments .= "<p class='posttext'>" . $comment->text . "</p>";
	$rendered_comments .= "</div>";
    }
    return $rendered_comments;
}

function post_comment($args, $page, $leaf) {
    print_r($args);
    return;
}


class Comment {
    var $leafid;
    var $text;
    var $user;

    function Comment($leaf) {
        $this->leafid = $leaf->id;
	$this->text = "";
	$this->user = "";
    }
}

?>
