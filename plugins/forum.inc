<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information
/* $Id$ */
include_once("vfile.inc");

/* Here's the forum DTD:
  <!ELEMENT forum (comment*)>
  <!ATTLIST forum cid idref #REQUIRED>  The last inserted ID.
  <!ATTLIST forum read CDATA #REQUIRED>  Read permission level
  <!ATTLIST forum write CDATA #REQUIRED>  Write permission level
  <!ATTLIST forum delete CDATA #REQUIRED>  delete permission level
  <!ATTLIST forum admin CDATA #REQUIRED>  admin permission level
  <!ELEMENT comment (text, comment*)>
  <!ATTLIST comment id ID #REQUIRED>
  <!ATTLIST comment user CDATA #REQUIRED>
  <!ATTLIST comment timestamp CDATA #REQUIRED>
  <!ATTLIST comment title CDATA #REQUIRED>
  <!ELEMENT text ANY> */
/* And an example...
 <forum cid=next-id-number read|write|delete|admin=perm>
    <comment id=12 user="User Name" timestamp="UTC" title="Title">
      <text>Escaped HTML/PumaCode (depending on whether it can be
      edited)</text>
      [comment*]
    </comment>
  </forum>
 */

function strtimes ($numtimes, $string) {
  $outstring = "";
  for ($i = 0; $i < $numtimes; $i++) {
      $outstring .= $string;
  }
  return $outstring;
}

/* Hmm... to store as text and manipulate on demand? or to parse into
 stdobjects and manipulate? Let's do that. With SAX. */
class Forum {
  var $cid;
  var $perm_read;
  var $perm_write;
  var $perm_delete;
  var $perm_admin;
  var $container; // vfile
  var $comment;
  var $signal_messages;
  var $focus;

  var $ready_to_save; // true if the forum should be reserialized
  function Forum($container) { 
    global $DEFAULT_FORUM_PERM;
    $this->cid = 0;
    $this->perm_read = $DEFAULT_FORUM_PERM['read'];
    $this->perm_write = $DEFAULT_FORUM_PERM['write'];
    $this->perm_delete = 1;
    $this->perm_admin = 1;
    $this->container = $container;
    $this->id = array("none");
    $this->children = array();
    $this->comment = array();
    $this->ready_to_save = false;
    $this->focus = NULL;
  }

  /* Use this to determine which post to scroll to on submitting a new
     post */
  function get_focus() {
    return $this->focus;
  }
  /* Convenience function for creating AV pairs. */
  function _av($attr, $val) {
    return " $attr='$val'";
  }
  function _avs($array) {
    $rt = "";
    foreach ($array as $attr => $val)
      $rt .= $this->_av($attr, $val);
    return $rt;
  }

  function serialize($node = "none", $depth = 0) {
    $rt = "";
    if ($node === "none")
      $rt = "<forum".
        $this->_avs(array("cid" => $this->cid,
                          "read" => $this->perm_read,
                          "write" => $this->perm_write,
                          "delete" => $this->perm_delete,
                          "admin" => $this->perm_admin)).">\n";
    else {
      $rt = strtimes($depth, "  ");
      $rt .= "<comment".
        $this->_avs(array("id" => $node,
                          "user" => $this->comment[$node]["user"],
                          "timestamp" => $this->comment[$node]["timestamp"],
                          "title" => $this->comment[$node]["title"])).">\n";
      $rt .= strtimes($depth + 1, "  ");
      $rt .= "<text>".$this->comment[$node]["text"]."</text>\n";
    }
    /* Now, recurse to children */
    if (isset($this->children[$node]))
      foreach ($this->children[$node] as $child)
        $rt .= $this->serialize($child, $depth+1);
    if ($node === "none") {
      $rt .= "</forum>";
    } else {
      $rt .= strtimes($depth, "  ");
      $rt .= "</comment>\n";
    }
    return $rt;
  }
  /* If, by the result of some action, the forum is ready to save, */
  function is_ready_to_save() {
    return $this->ready_to_save;
  }
  /* Callback function for XML parser */
  function _xml_start_element(&$p, &$name, &$attrs) {
    if ($name == "forum") {
      $this->id = array("none");
      $this->children = array();
      $this->comment = array();
      $this->cid = $attrs['cid'];
      $this->ready_to_save = false;
      $this->perm_read = $attrs['read'];
      $this->perm_write = $attrs['write'];
      $this->perm_delete = $attrs['delete'];
      $this->perm_admin = $attrs['admin'];
    } else if ($name == "comment") {
      $this->children[$this->id[0]][] = $attrs['id'];
      $this->comment[$attrs['id']] = $attrs;
      $this->comment[$attrs['id']]['parent'] = $this->id[0];
      $this->comment[$attrs['id']]['text'] = "";
      $this->comment[$attrs['id']]['editing'] = false;
      array_unshift($this->id, $attrs['id']);
    }
  }
  /* Callback function for XML parser */
  function _xml_end_element(&$p, &$name) {
    if ($name == "comment")
      array_shift($this->id);
  }
  /* Callback function for XML parser */
  function _xml_cdata(&$p, $data) {
    $data = preg_replace('/(  +|\n)/m', ' ', $data);
    $data = trim($data);
    if ($data != '')
      $this->comment[$this->id[0]]['text'] .= $data;
  }
  function deserialize(&$xml) {
    $parser = xml_parser_create();
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_set_element_handler($parser, array(&$this, "_xml_start_element"), 
                            array(&$this, "_xml_end_element"));
    xml_set_character_data_handler($parser, array(&$this, "_xml_cdata"));
    xml_parse($parser, $xml);
    //print xml_error_string(xml_get_error_code($parser));
    //print xml_get_current_line_number($parser);
  }
  /* Convenience function for creating "tool" buttons */
  function _tool(&$page, $signal, $name, $signal_value = NULL, $target = NULL) {
    $url = $page->parent;
    if ($signal)
      $url .= "?forum_action=$signal";
    if ($signal_value != NULL)
      $url .= "&signal_value=$signal_value";
    if (isset($page->pagenum))
      $url .= "&pagenum=" . $page->pagenum;
    if ($target)
      $url .= "#$target";
    return "<a href=\"$url\" class=forumtool>$name</a>";
  }

  /* Create a new post, returning its new ID. Slots are filled with
     default values. If you don't want the defaults, fill them
     yourself. */
  function insert_post($parent_id) {
    $this->comment[$this->cid]['parent'] = $parent_id;
    $this->comment[$this->cid]['editing'] = false;
    $this->comment[$this->cid]['user'] = NULL;
    $this->comment[$this->cid]['title'] = NULL;
    $this->comment[$this->cid]['timestamp'] = NULL;
    $this->comment[$this->cid]['text'] = NULL;
    if (!isset($this->children[$parent_id]))
      $this->children[$parent_id] = array();
    array_unshift($this->children[$parent_id], $this->cid);
    $this->focus = $this->cid;
    return $this->cid++;
  }

  /* signal callback, don't call this yourself. Use insert_post. */
  function _new_post() {
    $id = $this->insert_post("none");
    $this->comment[$id]['editing'] = true;
    return true;
  }

  /* signal callback, don't call this yourself. */
  function _clear_posts() {
    unset($this->comments);
    unset($this->children);
    $this->ready_to_save = true;
    return true;
  }

  /* signal callback, don't call this yourself. */
  function _change_permissions($perm) {
    $this->perm_read = $perm['perm_read'];
    $this->perm_write = $perm['perm_write'];
    $this->ready_to_save = true;
    return true;
  }
  
  /* signal callback, don't call this yourself. */
  function _reply_to($parent_id) {
    $id = $this->insert_post($parent_id);
    $this->comment[$id]['editing'] = true;
    return true;
  }

  /* signal callback, don't call this yourself. */
  function _submit_post($value) {
    $id = $this->insert_post($value['parent']);
    $this->comment[$id]['parent'] = $value['parent'];
    $this->comment[$id]['user'] = $value['user_name'];
    $this->comment[$id]['title'] = htmlspecialchars($value['title']);
    $this->comment[$id]['timestamp'] = date("m/d/y h:i a T");
    $this->comment[$id]['text'] = htmlspecialchars($value['text']);
    $this->ready_to_save = true;
    return true;
  }

  /* Delete a post by ID. level should not be set by users, it is internal. */
  function delete_post($id, $level = 0) {
    if (isset($this->children[$id])) {
      foreach($this->children[$id] as $child)
        $this->delete_post($child, $level + 1);
      unset($this->children[$id]);
    }
    if ($level === 0) {
      //echo "id: $id;";
      $parent_id = $this->comment[$id]['parent'];
      $index = array_search($id, $this->children[$parent_id]);
      unset($this->children[$parent_id][$index]);
      $this->ready_to_save = true;
      $this->focus = $parent_id;
    }
    unset($this->comment[$id]);
    return true;
  }
  
  /* Call this function to process the signals set up by various modes
     and forms of the Forum plugin. */
  function process_signal($signal, $value, $permission) {
    $signals = 
      array('new_post' =>           array('required'    => $this->perm_write,
                                          'description' => "post a new thread",
                                          'success'     => "new thread posted",
                                          'callback'    => "_new_post",
                                          'sigvalue'    => false),
            'clear_posts'=>         array('required'    => $this->perm_admin,
                                          'description' => "clear all posts",
                                          'success'     => "all posts cleared",
                                          'callback'    => "_clear_posts",
                                          'sigvalue'    => false),
            'change_permissions' => array('required'    => $this->perm_admin,
                                          'description' => 'change permissions',
                                          'success'     => 'permissions changed',
                                          'callback'    => '_change_permissions',
                                          'sigvalue'    => true),
            'post_reply' =>         array('required'    => $this->perm_write,
                                          'description' => 'post a reply',
                                          'success'     => 'reply posted',
                                          'callback'    => '_reply_to',
                                          'sigvalue'    => true),
            'delete_post' =>        array('required'    => $this->perm_delete,
                                          'description' => 'delete a post',
                                          'success'     => 'post deleted',
                                          'callback'    => 'delete_post',
                                          'sigvalue'    => true),
            'submit_post' =>        array('required'    => $this->perm_write,
                                          'description' => "submit a new post",
                                          'success'     => "new post submitted",
                                          'callback'    => "_submit_post",
                                          'sigvalue'    => true));
    if (!isset($signals[$signal])) {
      $this->signal_messages = "Unknown signal '$signal'";
      return;
    }
    if (!($permission <= $signals[$signal]['required'])) {
      $this->signal_messages = $perm_to_string($signals[$signal]['required']).
        " permissions are required to ".$signals[$signal]['description'].
        ". Your access level is ".$perm_to_string($permission).".";
      return;
    }
    $method = $signals[$signal]['callback'];
    $result = $this->$method($value);
    if ($result !== true)
      $this->signal_messages = $signals[$signal]['success']. " could not be completed because ".
        $result;
  }

  /* Call this to render the forum for the view of a specific user.
     You have to pass the currently-logged-in-user's User class
     because we need access to his name and security clearance. We
     need the $request in order to form proper links with script_link.
     */
  function render(&$page, &$user, $node = 'none') {
    $rt = "";
    if (!$user->authorized($this->perm_read, ""))
      return $rt . "You do not have rights to read this forum.";
    if ($node === 'none') {
      $rt .= "<div class='forum'><a name='forum'>";
      if ($this->signal_messages)
        $rt .= "<div class='forum_messages'>".
          $this->signal_messages.
          "</div>";
      $rt .= "<div class='forumtools'>";
      if ($user->authorized($this->perm_write, ""))
        $rt .= $this->_tool($page, "new_post", 
                            "New Post", NULL, "forum"); 
      if ($user->authorized($this->perm_admin, "")) {
        include_once('permission.inc');
	$action = $page->parent;
	if (isset($page->pagenum)) $action .= "?pagenum=" . $page->pagenum;
        $rt .= $this->_tool($page, "clear_posts", 
                            "Clear Posts").
          "<form action='$action' method='post'>".
          "<input type='hidden' name='page' value='".$page->id."'>".
          "<input type='hidden' name='forum_action' value='change_permissions'>".
          "Readable by: ". make_perm_list("signal_value[perm_read]", $this->perm_read).
          "Writable by: ". make_perm_list("signal_value[perm_write]", $this->perm_write).
          "<input type='submit' value='Change Permissions'>".
          "</form>";
      }
      $rt .= "</div>";
    } else {
      if ($this->comment[$node]['editing']) {
        $rt .= "<form action='#post_$node' method='post'>".
          "<input type='hidden' name='forum_action' value='submit_post'>".
          "<input type='hidden' name='signal_value[parent]'".
          "   value='".$this->comment[$node]['parent']."'>".
          "<input type='hidden' name='signal_value[user_id]' value='".$user->get_id()."'>".
          "<input type='hidden' name='signal_value[user_name]' value='".$user->get_name()."'>";
      }
      $rt .= "<div class='post'><a name='post_$node'>".
        "<div class='thispost'>".
        "<div class='posthead'>";
      $rt .= "<span class='posttools'>";
      if ($this->comment[$node]['editing']) {
        $rt .= "<input type='submit' value='Submit Post'>";
        $rt .= $this->_tool($page, NULL, "Cancel Post", 
                            NULL, "post_".$this->comment[$node]['parent']);
      } else {
        if ($user->authorized($this->perm_write, ""))
          $rt .= $this->_tool($page, "post_reply", 
                              "Reply", $node, "post_$node");
        if ($user->authorized($this->perm_delete, ""))
          $rt .= $this->_tool($page, "delete_post", 
                              "Delete", $node, 
                              "post_".$this->comment[$node]['parent']);
      }
      $rt .= "</span>";
      if ($this->comment[$node]['editing']) {
        if ($this->comment[$node]['parent'] === 'none')
          $title = "New Topic";
        else
          $title = "RE: ".$this->comment[$this->comment[$node]['parent']]['title'];
        $rt .= "<b><input type='text' name='signal_value[title]'".
          " value='$title'></b>";
        $rt .= "</div>";
        $rt .= "<div class='posttext'>".//TODO: Commentize the post
                                      //we're replying to!
          "<div class='postarea'>".
          "<textarea name='signal_value[text]' cols='80' rows='10'></textarea>". 
          "</div></div>".
          "</div></form>";
      } else {
        $usernameForThisPost = $this->comment[$node]['user'];
	if ($usernameForThisPost == '')
	{
	    $usernameForThisPost = '<em>No name given</em>';
	}
        $rt .= "<span class='title'>".$this->comment[$node]['title']."</span>";
        $rt .= "</div>";
        $rt .= "<div class='posttext'>".$this->comment[$node]['text']."</div>".
	  "<div class='postquote'></div>".
	  "<div class='postfoot'><br />".
          "<span class='author'>".$usernameForThisPost."</span> on ".
          "<span class='timestamp'>".$this->comment[$node]['timestamp']."</span>".
          "</div>".
          "</div>";
      }
    }
    
    if (isset($this->children[$node]))
      foreach ($this->children[$node] as $child) {
        $rt .= $this->render($page, $user, $child);
      }

    $rt .= "</div>";

    return $rt;
  }
}

function plugin_Forum($args, &$page, &$user) {
  global $puma;
  global $forum_instances;
  $forum_instances++;
  if ($forum_instances > 1)
    return "<b>Only one forum is allowed per page</b>";
  $forum_container = new VFile();
  $forum_container->open($page, $user->get_id());
  $forum = new Forum($forum_container);
  /* If the action is view... */
  $forum->deserialize($forum_container->get_content());
  if (isset($_REQUEST['forum_action'])) {
    $forum->process_signal($_REQUEST['forum_action'], 
                           isset($_REQUEST['signal_value']) ? $_REQUEST['signal_value'] : "",
                           $user->get_permission());
    if ($forum->is_ready_to_save()) {
      //$forum_container->set_content(addslashes($forum->serialize()));
      $forum_container->set_content($forum->serialize());
      if (isset($args['pagenum'])) $forum_container->page->parent = $args['pagenum'];
      $forum_container->save();
      header("Location: ".$page->parent."#post_".$forum->get_focus());
      exit();
    }
  }
  return $forum->render($page, $user);
}

$magic_pages['/^Forum:(.*)$/'] = "magic_pages_Forum";

function magic_pages_Forum(&$page, &$args) {
  global $puma;
  $page->push_path(array("Forums", $args[1]));
  $forum_container = new VFile();
  $forum_container->open($args[0], $puma->user->get_id());
  if (!$forum_container->exists()) {
    $page->add_content("<h3>This forum has not been created</h3>");
  } else {
    $forum = new Forum($forum_container);
    $forum->deserialize($forum_container->get_content());
    if (isset($_REQUEST['forum_action'])) {
      $forum->process_signal($_REQUEST['forum_action'], isset($_REQUEST['signal_value'])?$_REQUEST['signal_value']:NULL,
                             $puma->user->get_permission());
      if ($forum->is_ready_to_save()) {
        $forum_container->set_content(addslashes($forum->serialize()));
        $forum_container->save();
        header("Location: ".
               $puma->request->proper_uri("index.php", $page->get_pagename(),
                                          "#post_".$forum->get_focus()));
        exit();
      }
    }
    $page->add_content($forum->render($puma->request, $puma->user));
  }
}

$magic_pages['/^Forums$/'] = "magic_pages_Forums";

function magic_pages_Forums(&$page, &$args) {
  global $puma;
  /* We want a list of all pages beginning with Forum: and then some
     statistics. */
  $page->push_path(array("Forums"));
  $result = $puma->database->query("select name from entry where name like 'Forum:%'");
  $page->add_content("<h3>Forums</h3>".
                     "This is a list of all the forums currently active on this server.<br>");
  if (mysql_num_rows($result) == 0)
    $page->add_content("<b>There are no forums on this server</b>");
  else {
    $page->add_content("<ul>");
    while($obj = mysql_fetch_object($result))
      $page->add_content("<li>". $puma->request->script_link("index.php", $obj->name));
    $page->add_content("</ul>");
  }
}

?>
