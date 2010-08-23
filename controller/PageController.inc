<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

class PageController {
  var $controller_map = array('go_home' => '',
  			      'search' => 'search/?(.+)?',
  			      'test' => 'test/?',
  			      'move_up' => 'move_up/(\d+)',
  			      'move_down' => 'move_down/(\d+)',
                              'history' => 'history/(.+)',
                              'backlinks' => 'backlinks/(.+)',
                              'diff' => 'diff/([^/]+)(?:/([^/]+)(?:/([^/]+))?)?',
                              'view' => 'view/(\d+)',
                              'edit' => 'edit/(\d+)',
                              'do_edit' => 'do_edit/(\d+)',
                              'llist' => 'list/?',
                              'fcklist' => 'fcklist/?',
                              'nnew' => 'new/?(?:(\d+))?',
                              'do_new' => 'do_new(?:/(\d+))?',
                              'multinew' => 'multinew/?(?:(\d+))?',
                              'do_multinew' => 'do_multinew/?(?:(\d+))?',
                              'delete' => 'delete/(\d+)',
                              'do_delete' => 'do_delete/(\d+)',
                              'move' => 'move/(\d+)',
                              'do_move' => 'do_move/(\d+)',
                              'multimove' => 'multimove/?(?:(\d+))?',
                              'do_multimove' => 'do_multimove',
                              'change_pagetype' => 'change_pagetype/(\d+)',
                              'do_change_pagetype' => 'do_change_pagetype/(\d+)/?(.*)',
                              'do_changeperm' => 'do_changeperm/(\d+)'
                          );
  function test(&$dispatcher) {
      return;
  }

  function do_change_pagetype(&$dispatcher,$pageid,$page_type) {
      global $PAGETYPES;
      $user = User::ensure();
      $errormessage = "You don't have permission to move pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/do_change_pagetype");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }

      // Now we need to check to see if the page_type the user has given
      // us is valid...

      if (!isset($PAGETYPES[$page_type])) {
              addmessage("Given page type, $page_type, is not a valid page type!");
	      $dispatcher->redirect(getpreviouspage());
              return;
      }

      $page = Page::staticGet($pageid);
      $page->page_type = $page_type;
      if ($page->update()) {
          addmessage("Page type for page '{$page->title}' changed to $page_type");
      } else {
          addmessage("Error! Could not change page type!");
      }
      $dispatcher->redirect(getpreviouspage());
      return true;
  }
  
  function move_down(&$dispatcher, $pageid) {
      $user = User::ensure();
      $errormessage = "You don't have permission to move pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/move_down");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }

      $page = Page::staticGet($pageid);

      $newpage = new Page();
      $newpage->parent = $page->parent;
      $newpage->orderBy("position, id");
      $siblings = array();
      $newpage->find();
      while ($newpage->fetch()) {
          $siblings[] = clone($newpage);
      }

      // We need to renormalize the positions of the pages, otherwise
      // we might end up with one with a position of -100 and the rest
      // near 0.

      // We will use an array swap.

      $j = 0;

      foreach ($siblings as $sib) {
          if ($sib->id == $page->id) {
	      break;
	  }
	  $j++;
      }

      if ($j == count($siblings) - 1) {
          $dispatcher->redirect(getpreviouspage());
          return false;
      }

      $siblings[$j] = $siblings[$j+1];
      $siblings[$j+1] = $page;

      $i = 0;
      
      foreach ($siblings as $sib) {
          if ($sib->page_type != 'html') {
              $sib->position = -1;
	      $sib->update();
	      continue;
	  }
          $sib->position = $i;
	  $sib->update();
	  $i++;
      }
      
      $dispatcher->redirect(getpreviouspage());
      return true;
  }

  function move_up(&$dispatcher, $pageid) {
      $user = User::ensure();
      $errormessage = "You don't have permission to move pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/move_up");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }

      $page = Page::staticGet($pageid);

      $newpage = new Page();
      $newpage->parent = $page->parent;
      $newpage->orderBy("position, id");
      $siblings = array();
      $newpage->find();
      while ($newpage->fetch()) {
          $siblings[] = clone($newpage);
      }

      // We need to renormalize the positions of the pages, otherwise
      // we might end up with one with a position of -100 and the rest
      // near 0.

      // We will use an array swap.

      $j = 0;

      foreach ($siblings as $sib) {
          if ($sib->id == $page->id) {
	      break;
	  }
	  $j++;
      }

      if ($j == 0) {
          $dispatcher->redirect(getpreviouspage());
          return false;
      }

      $siblings[$j] = $siblings[$j-1];
      $siblings[$j-1] = $page;

      $i = 0;
      
      foreach ($siblings as $sib) {
          if ($sib->page_type != 'html') {
              $sib->position = -1;
	      $sib->update();
	      continue;
	  }
          $sib->position = $i;
	  $sib->update();
	  $i++;
      }
      
      $dispatcher->redirect(getpreviouspage());
      return true;
  }

  function backlinks(&$dispatcher, $pageid = null) {
      global $smarty;
      $version = new Version();
      $basehref = $_SERVER['HTTP_HOST'].base().'/';
      $version->query("select version.* from page inner join version on version.id = page.current_version ".
                      "where version.content like '%<a href%{$basehref}%/page/view/{$pageid}\"%'");
      $pages = Array();
      while ($version->fetch()) {
	      $pages[$version->page] = Page::staticGet($version->page);
      }
      foreach ($pages as $page) {
          $page->current_version = Version::staticGet($page->current_version);
      }
      $smarty->assign("template","page.backlinks");
      $smarty->assign("pages",$pages);
      return;
  }
			 
  function multimove(&$dispatcher, $parentid = null) {
      global $smarty;
      $user = User::ensure();
      $errormessage = "You don't have permission to move pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/multimove");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      if (isset($parentid)) {
	  $page = Page::staticGet($parentid);
          $smarty->assign("parent", $page);
      } else { 
          $page = new Page();
	  $page->write_perm = 0;
          $smarty->assign("parent", false);
      }

      $smarty->assign("pages", Page::get_list());
      $smarty->assign("user",$user);
      $smarty->assign("template", "page.multimove");
  }

  function do_multimove(&$dispatcher) {
      $user = User::ensure();
      $errormessage = "You don't have permission to create subpages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/multimove");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      assert(isset($_REQUEST['parent']));
      $parent = $_REQUEST['parent'];
      
      foreach ($_REQUEST['pages'] as $key => $page) {
	  if (trim($page) == '') continue;
	  $thispage = Page::staticGet($page);
	  if (movepage($page, $parent[$key])) {
	      $newparent = Page::staticGet($parent[$key]);
              addmessage("Moved {$thispage->title} underneath {$newparent->title}.");
	  } else {
	      addmessage("Move $thispage->title failed");
	  }
      }
      $dispatcher->redirect(getpreviouspage());
      return true;
  }
  
  function do_multinew(&$dispatcher) {
      $user = User::ensure();
      $errormessage = "You don't have permission to create subpages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/multinew");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      assert(isset($_REQUEST['parent']));
      $parent = $_REQUEST['parent'];
      
      foreach ($_REQUEST['title'] as $key => $title) {
	  if (trim($title) == '') continue;
	  if (makenewpage($title, $parent[$key], $user, $_REQUEST['readperm'][$key], $_REQUEST['editperm'][$key])) {
	      $parenttitle = Page::staticGet($parent[$key])->title;
	      $_SESSION["messages"][] = "$title created successfully as a subpage of $parenttitle";
	  }
	  else $_SESSION["messages"][] = "There was a problem with the creation of $title";
      }
      $dispatcher->redirect(getpreviouspage());
      return true;
  }

  function multinew(&$dispatcher, $parentid = null) {
      global $smarty, $DEFAULT_PERM;
      $user = User::ensure();
      $errormessage = "You don't have permission to create subpages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
	      setpreviouspage("/page/multinew");
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }

      if (isset($parentid)) {
	  $parent = Page::staticGet($parentid);
          $smarty->assign("parent", $parent);
	  $smarty->assign("defaultwrite", $parent->write_perm);
	  $smarty->assign("defaultread", $parent->read_perm);
      } else { 
          $page = new Page();
	  $page->write_perm = 0;
          $smarty->assign("pages", Page::get_list());
          $smarty->assign("parent", false);
          $smarty->assign("defaultwrite", $DEFAULT_PERM['write']);
          $smarty->assign("defaultread", $DEFAULT_PERM['read']);
      }

      $smarty->assign("user",$user);
      $smarty->assign("template", "page.multinew");
  }
      
  
  function do_changeperm(&$dispatcher, $pageid) {
      $user = User::ensure();
      $page = Page::staticGet($pageid);
      $errormessage = "You don't have permission to change the permissions of $page->title!";
      if (!$user->authorized(0,$errormessage)) {
          if ($user->id == 0) {
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
      }
      if (!isset($_REQUEST['view']) or (!isset($_REQUEST['edit']))) {
          addmessage("No permission changes given!  Nothing changed!");
	  $dispatcher->redirect('/page/list');
	  return false;
      }
      $page->read_perm = $_REQUEST['view'];
      $page->write_perm = $_REQUEST['edit'];
      $page->update();
      addmessage("$page->title permissions changed!");
      $dispatcher->redirect('/page/list');
      return true;
  }
			  
  function go_home(&$dispatcher) {
      $dispatcher->redirect('/page/view/1');
      return;
  }
  
  function do_move(&$dispatcher, $pageid) {
      global $smarty;
      if(!isset($_SESSION['userid'])) {
        addmessage("You must be logged in to edit pages!");
	setpreviouspage('/page/move');
	$dispatcher->redirect("/user/login");
        return false;
      }
      $user = User::ensure();
      $page = Page::staticGet($pageid);
      $errormessage = "You don't have permission to move $page->title!";
      if ($user->authorized(1,$errormessage)) {
          $parent = Page::staticGet($_REQUEST['parent']);
          if (!movepage($pageid,$_REQUEST['parent'])) {
              $dispatcher->redirect("/page/list");
              return false;
          }
          addmessage("$page->title was successfully moved under $parent->title");
          $dispatcher->redirect("/page/list");
          return true;
      }
      else {
          $dispatcher->redirect("/page/view/".$pageid);
      }
      return false;
  }

  function move(&$dispatcher, $pageid) {
      global $smarty;
      if(!isset($_SESSION['userid'])) {
        addmessage("You must be logged in to edit pages!");
	setpreviouspage('/page/move');
	$dispatcher->redirect("/user/login");
        return false;
      }
      $user = User::ensure();
      $page = Page::staticGet($pageid);
      $errormessage = "You don't have permission to move $page->title!";
      if ($user->authorized(1, $errormessage)) {
          $smarty->assign("template", "page.move");
          $smarty->assign("page", $page);
      }
      else {
          $dispatcher->redirect("/page/view/".$pageid);
      }
  }
  
  function delete(&$dispatcher, $pageid) {
      global $smarty;
      if(!isset($_SESSION['userid'])) {
          addmessage("You must be logged in to delete pages!");
	  setpreviouspage('/page/delete');
          $dispatcher->redirect('/user/login/');
          return false;
      }
      $page = Page::staticGet($pageid);
      $user = User::ensure();
      $errormessage = "You don't have permission to delete $page->title!";
      if ($user->authorized(1, $errormessage)) {
          $version = Version::staticGet($page->current_version);
          $page->current_version = $version->toArray();
          $children = $page->getAllChildren();
          $smarty->assign("template","page.delete");
          $smarty->assign("page",$page->toArray());
          $smarty->assign("children",$children);
      }
      else {
          $dispatcher->redirect(getpreviouspage());
          return false;
      }
  }

  function do_delete(&$dispatcher, $pageid, $recursion=false) {
      $page = Page::staticGet($pageid);
      $user = User::ensure();
      $errormessage = "You don't have permission to delete $page->title; please contact an administrator";

      if (isset($_POST['cancel'])) {
          addmessage("Delete Cancelled!");
          $dispatcher->redirect("/page/list");
          return false;
      }
      else if ($user->authorized(1,$errormessage) && isset($_POST['delete'])) {
          $pages = array();
          $children = $page->getAllChildren();
          $count = count($children);
          for ($i = $count-1; $i >= 0; $i--) {
              $pages[] = Page::staticGet($children[$i]['id']);
          }
          $pages[] = $page;
          foreach ($pages as $onepage) {
              if ($onepage->delete()) {
                  addmessage("Page $onepage->title deleted successfully");
              } else {
                  addmessage("Page $onepage->title could not be deleted!");
              }
          }
          $dispatcher->redirect("/page/list");
          return true;
      }
      else {
          $dispatcher->redirect("/page/list");
          return false;
      }
  }

  function do_new(&$dispatcher, $parent = false) {
      $user = User::ensure();
      $errormessage = "You aren't authorized to create pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/page/new/".$parent);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      assert ($parent || isset($_REQUEST['parent']));
      if (!$parent) $parent = $_REQUEST['parent'];
      if (isset($_REQUEST['type'])) {
          if ($_REQUEST['type'] == 'forum') {
              include_once('plugins/forum.inc');
              $forum_container = new VFile();
              $parentobj = Page::staticGet($parent);
              $forum = new Forum($forum_container);
              $forum_container->set_content($forum->serialize());
              $forum_container->create($parentobj, 'forum'); 
              $dispatcher->redirect('/page/list');
              return;
          } else if ($_REQUEST['type'] == 'reservation') {
              include_once('plugins/reservations.inc');
              $container = new VFile();
              $parentobj = Page::staticGet($parent);
              $reservations = new Reservations($container);
              $container->set_content($reservations->serialize());
              $container->create($parentobj, 'reservations'); 
              $dispatcher->redirect('/page/list');
              return;
          } else if ($_REQUEST['type'] == 'ebook') {
              global $DEFAULT_PERM;
	      makenewpage('ebook',$parent, $user, $DEFAULT_PERM['read'], $DEFAULT_PERM['write'], 'ebook');
              $dispatcher->redirect('/page/list');
              return;
	  }
      }
      if (!isset($_REQUEST['title']) || $_REQUEST['title'] == "") {
          $_SESSION["messages"][] = "Please enter a title";
          $dispatcher->redirect('/page/new/'.$parent);
          return false;
      }
      
      makenewpage($_REQUEST['title'], $parent, $user, $_REQUEST['readperm'], $_REQUEST['editperm']);
      $_SESSION["messages"][] = "Subpage $_REQUEST[title] created successfully";
      $dispatcher->redirect("/page/list");
  }

  function nnew(&$dispatcher, $parent = NULL) {
      global $smarty;
      global $DEFAULT_PERM;
      $user = User::ensure();
      $errormessage = "You aren't authorized to create pages!";
      if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/page/new/".$parent);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      if ($parent && isset($_REQUEST['type']) ) {
          $dispatcher->redirect('/page/do_new/'.$parent.'?type='.$_REQUEST['type']);
          return;
      }
      if ($parent) {
          $parent = Page::staticGet($parent);
          $smarty->assign("parent", $parent);
	  $smarty->assign("defaultwrite", $parent->write_perm);
	  $smarty->assign("defaultread", $parent->read_perm);
      } else {
          $smarty->assign("pages", Page::get_list());
          $smarty->assign("parent", false);
          $smarty->assign("defaultwrite", $DEFAULT_PERM['write']);
          $smarty->assign("defaultread", $DEFAULT_PERM['read']);
      }
      
      $smarty->assign("user", $user);
      $smarty->assign("template", "page.new");
  }

  function llist(&$dispatcher) {
      global $smarty;
      $pages = Page::get_list();
      $user = User::ensure();
      $errormessage = "You aren't authorized to view the page list!";
      if (!$user->authorized(1,$errormessage)) {
	  if ($user->id == 0) {
              setpreviouspage("/page/list");
              $dispatcher->redirect('/user/login');
	  } else {
	      $previouspage = getpreviouspage();
	      $dispatcher->redirect($previouspage);
	  }
          return false;
      }

      $pluginslist = array();
      $pagetypes = array("forum","reservations","ebook");
      foreach ( $pagetypes as $type ) {
          $plugins = new Page();
          $plugins->page_type = $type;
          $plugins->find();
          while ($plugins->fetch()) {
              $pluginslist[$type][$plugins->parent] = True;
          }
      }
      foreach ($pages as $key => $page) {
          foreach ($pages as $keyx => $pagex) {
              if ($page['parent'] == $pages[$keyx]['id']) {
	          if (isset($pages[$keyx]['numchildren'])) $pages[$keyx]['numchildren']++;
		  else $pages[$keyx]['numchildren']=1;
	    }
	  }
      }
      
      setpreviouspage("/page/list");
      $smarty->assign("pluginslist", $pluginslist);
      $smarty->assign("pages", $pages);
      $smarty->assign("user", $user);
      $smarty->assign("template", "page.list");
  }
  
  function fcklist(&$dispatcher) {
      global $smarty;
      $pages = array();
      $user = User::ensure();
      $page = new Page();
      $page->find();
      while ($page->fetch()) {
          if ($user->permission <= $page->read_perm && $page->page_type == "html") {
              $version = Version::staticGet($page->current_version);
              $page->current_version = $version->toArray();
              $pages[] = $page->toArray();
          }
      }
      
      $smarty->assign("template", "page.fcklist");
      $smarty->assign("pages", $pages);
  }

  function edit(&$dispatcher, $pageid) {
      global $smarty;
      require_once("contrib/fckeditor/fckeditor.php");
      $user = User::ensure();
      $page = Page::staticGet($pageid);
      $errormessage = "You aren't authorized to edit $page->title!";
      if (!$user->authorized($page->write_perm,$errormessage)) {
	  if ($user->id == 0) {
              setpreviouspage("/page/edit/".$pageid);
              $dispatcher->redirect('/user/login');
	  } else {
	      $previouspage = getpreviouspage();
	      $dispatcher->redirect($previouspage);
	  }
          return false;
      }
      
      $version = Version::staticGet($page->current_version);

      $editor = self::CreateEditor($dispatcher, 'content');

      $newtitle = null;

      if (isset($_POST['content'])) {
          $smarty->assign("preview", $_POST['content']);
          $editor->Value = $_POST['content'];
          $newtitle = $_POST['title'];
      }
      else {
          $editor->Value = $version->content;
      }

      $abstractEditor = self::CreateEditor($dispatcher, 'abstract');
      $displayAbstractEditor = false;

      if (isset($_POST['abstract'])) {
          $smarty->assign("abstractPreview", $_POST['abstract']);
          $abstractEditor->Value = $_POST['abstract'];
          $displayAbstractEditor = true;
      } else {
          $abstractPage = $page->getAbstract();

          if ($abstractPage) {
              $abstractVersion = Version::staticGet($abstractPage->current_version);
              $abstractEditor->Value = $abstractVersion->content;
              $displayAbstractEditor = true;
          }
      }

      $page->title = html_entity_decode($page->title);

      $editor->ToolbarSet = 'Puma';
      $abstractEditor->ToolbarSet = 'Puma';
      $smarty->assign("newtitle", $newtitle);
      $smarty->assign("basehref", $_SERVER['SCRIPT_NAME']);
      $smarty->assign("editor", $editor->CreateHtml());
      $smarty->assign("abstractEditor", $abstractEditor->CreateHtml());
      $smarty->assign("displayAbstractEditor", $displayAbstractEditor);
      $smarty->assign("page", $page->toArray());
      $smarty->assign("version", $version->toArray());
      $smarty->assign("user", $user);
      $smarty->assign("template", "page.edit");
      return true;
  }
  
  function CreateEditor(&$dispatcher, $id)
  {
      require_once("contrib/fckeditor/fckeditor.php");
      $base = base(true);
      $editor = new FCKeditor($id);
      $editor->Config['PumaBasePath'] = base().'/';
      $editor->BasePath = $base.'/contrib/fckeditor/';
      $editor->Config['BaseHref'] = $dispatcher->fq_url_to('');
      $editor->Config['Domain'] = 'http://'.$_SERVER['HTTP_HOST'];
      return $editor;
  }

  function do_edit(&$dispatcher, $id) {
      global $smarty, $SPHINX;
      $user = User::ensure();
      $page = Page::staticGet($id);
      $errormessage = "You aren't authorized to edit $page->title!";
      if (!$user->authorized($page->write_perm,$errormessage)) {
	  if ($user->id == 0) {
              setpreviouspage("/page/edit/".$pageid);
              $dispatcher->redirect('/user/login');
	  } else {
	      $previouspage = getpreviouspage();
	      $dispatcher->redirect($previouspage);
	  }
          return false;
      }
          if (isset($_POST['preview'])) {
              PageController::edit($dispatcher, $id);
          }
          elseif (isset($_POST['cancel_changes'])) {
              $dispatcher->redirect('/page/view/'.$page->id);
          }
          elseif (isset($_POST['save'])) {
              $page = Page::staticGet($id);
              $pageTitle = htmlentities($_REQUEST['title']);

              if (!self::SavePage($page, $_REQUEST['content'], $pageTitle)) {
                  addmessage("Changes to ".$page->title." were <strong>NOT</strong> saved!  Please try again!");
                  PageController::edit($dispatcher, $id);
                  return;
              }

              $abstractContent = trim($_REQUEST['abstract']);

              if ($abstractContent) {
                  $abstractPage = $page->getAbstract();

                  if (!$abstractPage) 
                  {
                      $abstractPage = new Page();
                      $abstractPage->page_type = 'abstract';
                      $abstractPage->parent = $page->id;
                      $abstractPage->insert();
                  }

                  if (!self::SavePage($abstractPage, $_REQUEST['abstract'], 'abstract')) {
                      addmessage("Changes to ".$page->title." were <strong>NOT</strong> saved!  Please try again!");
                      PageController::edit($dispatcher, $id);
                      return;
                  }
              } else {
                  $abstractPage = $page->getAbstract();

                  if ($abstractPage) $abstractPage->delete();
              }


              addmessage("Changes to ".$page->title." saved!");
	      if ($SPHINX['use']) updatesearchindex();
              $dispatcher->redirect(getpreviouspage());
          }
  }

  function SavePage($page, $content, $title) {
      $version = new Version();
      $version->page = $page->id;
      $version->user = $_SESSION['userid'];
      $version->content = $content;

      if (!$version->insert()) return false;
      
      $page->current_version = $version->id;
      $page->title = $title;
      
      if (!$page->update()) return false;

      return true;
  }


  function populatePageTemplate($page, $user, $title=null, $displaySubscriptionLink=false)
  {
      global $smarty;
      $children = $page->getChildren($user->permission);
      $pagetypes = Array();
      foreach ($children as $child) {
          if (!in_array($child->page_type,  array('html', 'hidden'))) {
              include_once("plugins/{$child->page_type}.inc");
              if (isset($pagetypes[$child->page_type])) {
                  addmessage("Too many".$pagetypes[$child->page_type]."s associated with this page!");
              } else {
                  $method = "plugin_".$child->page_type;
                  $smarty->assign($child->page_type,$method($_REQUEST,$child,$user));
              }
          }

	  $child->title = html_entity_decode($child->title);
      }

      if ($title) {
          $page->title = html_entity_decode($title);
      } else {
          $page->title = html_entity_decode($page->title);
      }
      
      $prevpage = "/page/view/".$page->id;
      if (isset($_REQUEST['pagenum'])) {
          $prevpage .= "?pagenum=".$_REQUEST['pagenum'];
      }
      $_SESSION['previouspage'] = array($prevpage);
      $version = Version::staticGet($page->current_version);
      $smarty->assign("template", "page.view");
      $smarty->assign("page", $page);
      $smarty->assign("pageview", $page->id);
      $smarty->assign("version", $version);
      $smarty->assign("user", $user);
      $smarty->assign("children", $children);
      $smarty->assign("displaySubscriptionLink", $displaySubscriptionLink);
      return true;
  }

  function view(&$dispatcher, $pageid) {
      $user = User::ensure();
      $page = new Page();
      $page->id = $pageid;
      if ($page->count() != 1) {
      	  header("HTTP/1.1 404 Not Found");
	  $smarty->assign("template","page.error404");
	  return false;
      }
      $page->find();
      $page->fetch();
      $parent = $page;
      while ($parent->parent) {
          $parent = Page::staticGet($parent->parent);
          if ($parent->page_type == 'ebook') {
              return self::handleEbook($parent, $page, $dispatcher);
          }
          if ($parent->page_type == 'restrictedZone') {
              return self::handleRestrictedZone($page, $parent, $user, $dispatcher);
          }
      }

      $errormessage = "You aren't authorized to view $page->title!";
      if (!$user->authorized($page->read_perm,$errormessage)) {
          return self::handleUnauthorizedUser($user, $dispatcher, $pageid);
      }

      return self::populatePageTemplate($page, $user);
  }

  function handleRestrictedZone($page, $parent, $user, $dispatcher)
  {
      if(!$user->CanViewRestrictedZone())
      {
          $abstract = $page->getAbstract();

          if ($abstract) {
              return self::populatePageTemplate($abstract, $user, $page->title . " (abstract)", true);
          }

          addmessage("You must have a subscription to view {$page->title}!");
          $dispatcher->redirect("/page/view/".$parent->parent);
          return false; 
      }

      return self::populatePageTemplate($page, $user);
  } 


  function handleUnauthorizedUser($user, $dispatcher, $pageId)
  {
      if ($user->id == 0) {
          setpreviouspage("/page/view/".$pageid);
          $dispatcher->redirect('/user/login');
      } else {
          $dispatcher->redirect(getpreviouspage());
      }
      return false;
  }

  function handleEbook($parent, $page, $dispatcher)
  {
      $dispatcher->redirect('/page/view/'.$parent->parent.'?pagenum='.$page->id);
      return;
  }

  function diff(&$dispatcher, $pagenum, $old=null, $new=null) {
    global $smarty;

    $page = Page::staticGet($pagenum);
    $user = User::ensure();
    $errormessage = "You aren't authorized to view $page->title!";
    if (!$user->authorized($page->read_perm,$errormessage)) {
        $dispatcher->redirect('/page/view/1');
        return false;
    }
    $smarty->assign("pagetitle",$page->title);

    $from = new Version();
    $to = new Version();

    if (isset($old) && isset($new)) {
      $from->id=$old;
      $to->id=$new;
    }
    else if (isset($old)) {
      $from->id=$old;
      $to->id=$page->current_version;
    }
    else {
      $test = new Version();
      $test->page=$pagenum;
      $test->find();
      $testcount = $test->count();
      for ($n = 0; $n < $testcount -1; $n++) {
	      $test->fetch();
      }

      $from->id=($test->id);
      $to->id=$page->current_version;
    }

    $from->page=$pagenum;
    $from->find();
    $from->fetch();
    
    $to->page=$pagenum;
    $to->find();
    $to->fetch();

    $diffout = diff($from,$to);
    $diffout2 = explode("\n", $diffout);

    $parseddiff = parsediff($diffout2);
    $diffout3 = null;
    
    for ($n = 0; $n < count($diffout2); $n++) {
      foreach ($parseddiff as $key => $value) {
        if (isset($parseddiff[$key][$n])) {
            $diffout3[] = array($key, $value[$n]);
        }
      }
    }
    
    $smarty->assign("from",$from->toArray());
    $smarty->assign("to",$to->toArray());
    $smarty->assign("diff",$diffout3);
    $smarty->assign("template","page.diff");

  }

  function history(&$dispatcher, $pagenum) {
    global $smarty;
    
    $page = Page::staticGet($pagenum);
    $user = User::ensure();
    $errormessage = "You aren't authorized to view $page->title!";
    if (!$user->authorized($page->read_perm,$errormessage)) {
        if ($user->id == 0) {
            setpreviouspage("/page/history/".$pagenum);
            $dispatcher->redirect('/user/login');
	} else {
	    $dispatcher->redirect(getpreviouspage());
	}
        return false;
    }
    $page = new Page();
    $page->id=$pagenum;
    $page->find();
    $page->fetch();
    $smarty->assign("pagetitle",$page->title);
    
    $version = new Version();
    $version->page=$pagenum;
    $version->orderBy("id DESC");
    $version->limit("20");
    $version->find();

    while ($version->fetch()) {
      $smarty->append("versions",$version->toArray());
    }

    $userlist = new User();
    $userlist->find();
    
    $smarty->assign("userlist",$userlist->toArray());
    $smarty->assign("template", "page.history");
  }


  function search(&$dispatcher, $query = null) {
    global $smarty, $SPHINX;

    $user = User::ensure();
    $smarty->assign("user", $user);

    if (isset($_REQUEST['keyword'])) $query = $_REQUEST['keyword'];
    
    if ($query == null) {
        $smarty->assign('template',"page.search");
        return;
    }

    $smarty->assign("query", $query);
    //$smarty->debugging = True;
    
    /// This is really a dumb way to search. What if the user puts in two
    /// keywords instead of an exact phrase? Exact phrase hits should be
    /// ranked higher, hits in the title should be ranked higher, and
    /// whole word hits should be ranked higher. The highlighter should
    /// leave behind at least a complete word, with whole-word context.

    if ($SPHINX['use']) {

        include($SPHINX['path']."/api/sphinxapi.php");
	$searcher = new SphinxClient();
	$searcher->SetServer ("localhost", 3312);
	$searcher->SetWeights ( array(100, 1));
	$searcher->SetMatchMode(SPH_MATCH_ANY);
	$result['titles'] = $searcher->Query($query, $SPHINX['prefix'].'titles');
	$result['pages'] = $searcher->Query($query, $SPHINX['prefix'].'pages');
	foreach ( $result as $resulttype => $results) {
	    if ( $results===false ) {
	        print "$resulttype query failed: " . $searcher->GetLastError() . ".\n";
	    } else {
		if ($results['total_found'] > 0) {
	            foreach ($results['matches'] as $key => $value) {
                        $page = Page::staticGet($key);
			if ($user->permission > $page->read_perm) continue;
			$version = Version::staticGet($page->current_version);
			$newpage = $page->toArray();
			$newpage['current_version'] = $version->toArray();
			$newpage['current_version']['user'] = User::staticGet($newpage['current_version']['user'])->toArray();
			$smarty->append($resulttype, $newpage);
			$newpage = null;
		    }
		}
	    }
	}
        $smarty->assign("template", "search.results");
	return;
    }
    
    $directHit = false; ///< True if there's a page with exactly this
    ///name

    $finds = array();

    $page = new Page();
    $page->page_type = "html";
    $page->whereAdd("title like '%".$page->escape($query)."%'");
    $page->whereAdd("`read_perm` >= ".(int)$user->permission);
    $page->orderBy("char_length(title)");
    $page->limit("10");
    $page->find();
    
    while ($page->fetch()) {
      $version = Version::staticGet($page->current_version);
      $page->current_version = $version->toArray();
      $editor = User::staticGet($page->current_version['user']);
      if ($page->title == $query) $directHit = True;
      $parr = $page->toArray();
      $parr['current_version']['user'] = $editor->toArray();
      $parr['path'] = implode("/", array_map(create_function('$p', 'return $p->title;'), $page->getCannonicalPages()));
      $smarty->append("titles", $parr);
    }
    if (!$directHit) {
        $page = new Page();
        $page->title = $page->escape($query);
        if ($page->count()) {
            $directHit = true;
        }
    }

    $pagelist = Page::get_list();

    $firstpage = array_shift($pagelist);
    $currentversions = $firstpage['current_version'];

    foreach ($pagelist as $page) {
        $currentversions .= ','.$page['current_version'];
    }

    $version = new Version();
    $version->whereAdd("content like '%".$version->escape($query)."%'");
    $version->whereAdd("id in (".$currentversions.")");
    $version->find();

    while ($version->fetch()) {
      $page = new Page();
      $page->page_type = "html";
      $page->current_version = $version->id;
      $page->whereAdd("`read_perm` >= ".(int)$user->permission);
      $page->find();
    
      while ($page->fetch()) {
        $page->current_version = $version->toArray();
        $editor = User::staticGet($page->current_version['user']);
        $parr = $page->toArray();
        $parr['current_version']['user'] = $editor->toArray();
        $parr['path'] = implode("/", array_map(create_function('$p', 'return $p->title;'), $page->getCannonicalPages()));
        $smarty->append("pages", $parr);
      }
    }

    $smarty->assign("directHit", $directHit);
    $smarty->assign("template", "search.results");
  }
}

?>
