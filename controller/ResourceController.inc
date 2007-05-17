<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information 

/* $Id$ */

class ResourceController {
  var $controller_map = array("add" => "add/(\d+)",
                              "llist" => "list/(\d+)",
			      "llistall" => "list",
                              "view" => "view/(\d+)",
                              "move" => "move/(\d+)",
                              "do_move" => "do_move/(\d+)",
                              "rename" => "rename/(\d+)",
                              "do_rename" => "do_rename/(\d+)",
                              "ddelete" => "delete/(\d+)",
                              "do_delete" => "do_delete/(\d+)");
			      
  function rename(&$dispatcher, $res_id) {
    global $smarty;
    $user = User::ensure();
    $errormessage = "You aren't authorized to edit resources!";
    if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/resource/rename/".$res_id);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
    }
    $resource = new Resource();
    $resource->id = $res_id;
    assert($resource->count() == 1);
    $resource->find();
    $resource->fetch();
    $page = new Page();
    $page->id = $resource->page;
    if ($page->count() < 1) {
        $page->title = "Deleted Page";
    } else {
        $page->find();
        $page->fetch();
    }
    $smarty->assign("template","resource.rename");
    $smarty->assign("resource",$resource);
    $smarty->assign("page",$page);
    $smarty->assign("user",$user);
  }
  
  function do_rename(&$dispatcher, $res_id) {
    $user = User::ensure();
    $errormessage = "You aren't authorized to move resources!";
    if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/resource/move/".$res_id);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
    }
    if (!isset($_REQUEST['newnick'])) {
        addmessage("No nickname given. Please select one.");
	$dispatcher->redirect("/resource/rename/".$res_id);
	return false;
    }
    $newnick = $_REQUEST['newnick'];
    $newdesc = $_REQUEST['newdesc'];
    $resource = Resource::staticGet($res_id);
    $resource->nickname = $newnick;
    $resource->description = $newdesc;
    if ($resource->update()) {
	addmessage("Resource updated!");
	$dispatcher->redirect(getpreviouspage());
	return true;
    }
    
    addmessage("Resource was not updated!");
    $dispatcher->redirect("/resource/rename/".$res_id);

    return false;
  }

  function move(&$dispatcher, $res_id) {
    global $smarty;
    $user = User::ensure();
    $errormessage = "You aren't authorized to move resources!";
    if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/resource/move/".$res_id);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
    }
    $resource = new Resource();
    $resource->id = $res_id;
    assert($resource->count() == 1);
    $resource->find();
    $resource->fetch();
    $page = new Page();
    $page->id = $resource->page;
    if ($resource->page == 0) {
        $page->title = "All pages";
    } else {
        if ($page->count() < 1) {
            $page->title = "Deleted Page";
        } else {
            $page->find();
            $page->fetch();
        }
    }
    $smarty->assign("template","resource.move");
    $smarty->assign("resource",$resource);
    $smarty->assign("page",$page);
    $smarty->assign("user",$user);
  }
  
  function do_move(&$dispatcher, $res_id) {
    $user = User::ensure();
    $errormessage = "You aren't authorized to move resources!";
    if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/resource/move/".$res_id);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
    }
    if (!isset($_REQUEST['newpage'])) {
        addmessage("No page given. Please select one.");
	$dispatcher->redirect("/resource/move/".$res_id);
	return false;
    }
    $newpageid = $_REQUEST['newpage'];
    $resource = Resource::staticGet($res_id);
    $page = new Page();
    $page->id = $newpageid;
    if ($page->count() < 1 && $newpageid != 0) {
        addmessage("Page does not exist... please select another");
	$dispatcher->redirect("/resource/move/".$res_id);
	return false;
    }
    if ($newpageid == 0) {
        $resource->page = 0;
        $page = new Page();
        $page->title = "All pages";
    } else {
        $page = Page::staticGet($newpageid);
        $resource->page = $page->id;
    }
    if ($resource->update()) {
	addmessage("Resource moved to {$page->title}");
	$dispatcher->redirect(getpreviouspage());
	return true;
    }
    
    addmessage("Resource was not moved!");
    $dispatcher->redirect("/resource/move/".$res_id);

    return false;
  }

  function ddelete(&$dispatcher, $res_id) {
    global $smarty;
    $resource = new Resource();
    $resource->id = $res_id;
    assert($resource->count() == 1);
    $resource->find();
    $resource->fetch();
    $user = User::ensure();
    $errormessage = "You aren't authorized to edit this resource!";
    if (!$user->authorized(1,$errormessage)) {
          if ($user->id == 0) {
              setpreviouspage("/resource/delete/".$res_id);
	      $dispatcher->redirect("/user/login");
          } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
    }
    $smarty->assign("template","resource.delete");
    $smarty->assign("resource",$resource);
    $smarty->assign("user",$user);
  }

  function do_delete(&$dispatcher, $res_id) {
    if ($_POST['delete'] != 'Delete Resource') {
        addmessage("Resource deletion cancelled");
        $dispatcher->redirect(getpreviouspage());
    }
    $resource = new Resource();
    $resource->id = $res_id;
    assert($resource->count() == 1);
    $resource->find();
    $resource->fetch();
    $nickname = $resource->nickname;
    $user = User::ensure();
    $errormessage = "You aren't authorized to edit this resource!";
    if (!$user->authorized(1,$errormessage)) {
        if ($user->id == 0) {
            setpreviouspage("/resource/delete/".$res_id);
            $dispatcher->redirect("/user/login");
        } else {
	    $dispatcher->redirect(getpreviouspage());
	}
        return false;
    }
    if ($resource->delete()) {
        addmessage("Deleted resource {$nickname} successfully");
        $dispatcher->redirect(getpreviouspage());
        return true;
    }
    addmessage("Delete unsuccessful");
    $dispatcher->redirect(getpreviouspage());
    return false;
    
  }
  
  function llistall(&$dispatcher) {
    global $smarty;
    $user = User::ensure();
    $errormessage = "You aren't authorized to view the resource list!";
    if (!$user->authorized(1,$errormessage)) {
        if ($user->id == 0) {
            setpreviouspage("/resource/list");
            $dispatcher->redirect("/user/login");
        } else {
	    $dispatcher->redirect(getpreviouspage());
	}
        return false;
    }
    $resources = Resource::get_list();
    $checker = null;
    $list = array();
    foreach ($resources as $resource) {
        if ($checker != $resource['page']) {
            $checker = $resource['page'];
            $page = new Page();
            $page->id = $resource['page'];
            if ($resource['page'] == 0) {
                $page->title = "All pages";
                $page = $page->toArray();
                $page['gone'] = true;
            } else {
                if ($page->count() < 1) {
                        $page->title = "Deleted Page";
                        $page = $page->toArray();
                        $page['gone'] = true;
                } else {
                        $page->find();
                        $page->fetch();
                        $page = $page->toArray();
                }
            }
	    $page['ispage'] = true;
	    $page['depth'] = 0;
	    $list[] = $page;
	}
        $list[] = $resource;
    }
    setpreviouspage('/resource/list');
    $smarty->assign("list", $list);
    $smarty->assign("user", $user);
    $smarty->assign("template", "resource.listall");
    return true;
  }
  
  function llist(&$dispatcher, $page) {
    global $smarty;
    $user = User::ensure();
    $page = Page::staticGet($page);
    $globalpage = new Page();
    $globalpage->id = 0;
    if (!$user->authorized($page->read_perm,'')) {
        echo "You aren't authorized to view this list!";
        return false;
    }
    $resources = Resource::fetch_all_for(&$page);
    $resources = array_merge(Resource::fetch_all_for(&$globalpage),$resources);
    $smarty->assign("page", $page->toArray());
    $smarty->assign_by_ref("resources", &$resources);
    $smarty->assign("template", "resource.show");
    return true;
  }

  function add(&$dispatcher, $page) {
    $upload_errors = array(UPLOAD_ERR_OK => "There is no error, the file uploaded with success.",
                           UPLOAD_ERR_INI_SIZE => "The uploaded file exceeds the upload_max_filesize directive in php.ini.",
                           UPLOAD_ERR_FORM_SIZE => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.",
                           UPLOAD_ERR_PARTIAL => "The uploaded file was only partially uploaded.",
                           UPLOAD_ERR_NO_FILE => "No file was uploaded.",
                           UPLOAD_ERR_NO_TMP_DIR => "Missing a temporary folder.",
                           UPLOAD_ERR_CANT_WRITE => "Failed to write file to disk");
    $resource = new Resource();
    $fileinfo = $_FILES['resource'];
    if (@$fileinfo['error'] || $fileinfo['size'] == 0) {
      header("HTTP/1.1 400 Bad Request");
      die("Your file upload resulted in an error: ".$upload_errors[$fileinfo['error']]);
    }
    $user = User::ensure();
    $pageobj = Page::staticGet($page);
    if (!$user->authorized($pageobj->write_perm, "")) {
      echo "<p id='error'><error>You don't have permission!</error></p>";
      return false;
    }
    if (isset($_POST['allpages'])) {
        $resource->page = 0;
    } else {
        $resource->page = $page;
    }
    $resource->nickname = $_POST['nickname'];
    $resource->owner = $user->id;
    $resource->mime = $fileinfo['type'];
    $resource->data = file_get_contents($fileinfo['tmp_name']);
    $resource->filename = $fileinfo['name'];
    $resource->description = $_POST['description'];
    $resource->insert();
    header("HTTP/1.1 201 Created");
    global $smarty;
    $smarty->assign("resources", array($resource));
    $page = Page::staticGet($page);
    $smarty->assign("page", $page->toArray());
    $smarty->assign("template", "resource.show");
    return true;
  }

  function view(&$dispatcher, $res_id) {
    $user = User::ensure();
    $resource = new Resource();
    $resource->id = $res_id;
    assert($resource->count() == 1);
    $resource->find();
    $resource->fetch();
    $page = Page::staticGet($resource->page);
    if ($user->permission > $page->read_perm) {
      echo "You don't have permission";
      return false;
    }
    $now = time();
    $nextyear  = mktime(0, 0, 0, date("m", $now),  date("d", $now),  date("Y", $now)+1);
    $headerdate = date('r',$nextyear);
    header("Content-Type: $resource->mime");
    header("Cache-Control: ");
    header("Pragma: ");
    header("Expires: $headerdate");
    if (isset($_REQUEST['download']))
      header("Content-Disposition: attachment; filename=$resource->filename");
    else
      header("Content-Disposition: inline; filename=$resource->filename");
    echo $resource->data;
  }
}
