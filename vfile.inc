<?php
# Copyright 2002--2015 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* A virtual file interface to entries and versions. Uses delayed
   loading to avoid too much database overhead. Currently doesn't
   allow for opening old revisions as semantics of calling save() on
   a non-current revision are unspecified (should be an error?) Also,
   what are the consequences of calling save() when the entry has
   changed behind our backs to a new revision? */



class VFile {
  var $page;
  var $content; /* Cache. Should only be used if $this->version ==
                   NULL */
  var $version;
  var $dirty; /* Has vfile been modified since it was last
                 saved/opened? */
  var $opened; /* Prevent unopened accesses */
  var $user; /* id */
  
  function VFile() { 
    $this->page == NULL;
    $this->opened = false;
  }

  /******* Primary methods *******/
  function open(&$page, $user_id) {
    $this->page = $page;
    $this->dirty = false;
    $this->content = "";
    $this->user = $user_id;
    $this->version = Version::staticGet($page->current_version);
    $this->opened = true;
  }
  /* This doesn't write changes to the database! */
  function set_content($content) {
    $this->dirty = true;
    $this->content = $content;
  }
  function get_content() { 
    if ($this->dirty)
      return $this->content;
    else
      return $this->version->content;
  }
  function add_content($content) {
    assert($this->opened);
    $this->_delay_load_version();
    $this->content .= $content;
    $this->dirty = true;
  }
  /* Save may be invoked as many times as desired. It will always
     update the revision count. */
  function save() {
    assert($this->opened);
    if ($this->exists()) {
      $version = new Version();
      $version->page = $this->page->id;
      $version->content = $this->get_content();
      $version->insert();
      $this->page->current_version = $version->id;
      $this->page->update();
    } else {
      /* Rigamarole */
      $page = new Page();
      $page->title = "Forum";
      $page->page_type = "forum";
      $page->parent = $this->page->id;
      $page->insert();
    }
  }

  function create($parent, $type) {
      $user = User::ensure();
      $page = new Page();
      $page->title = $type;
      $page->page_type = $type;
      $page->parent = $parent->id;
      if (!$page->insert()) return false;

      $version = new Version();
      $version->page = $page->id;
      $version->user = $user->id;
      $version->content = $this->get_content();
      if (!$version->insert()) return false;

      $page->current_version = $version->id;
      if (!$page->update()) return false;

      return true;

  }
      

  /******* Accessors ********/
  /* Determine if the entry already exists. */
  function exists() {
    assert($this->opened);
    assert($this->page->id == $this->version->page);
    /* If this assertion fails, check to see why the version doesn't
    exist. Most likely, the version can't be loaded because the
    user.id of the version doesn't exist. That's probably because the
    anonymous user was installed with an ID not equal to zero! */
    return true;
  }
  /*function revision() {
    assert($this->opened);
    $this->_delay_load_version();
    return $this->version->get_revision();
  }
  function last_user() {
    assert($this->opened);
    $this->_delay_load_version();
    return $this->version->get_user();
  }
  function mod_time() {
    assert($this->opened);
    $this->_delay_load_version();
    return $this->version->last_edited();
  }
  function pagename() { 
    assert($this->opened);
    return $this->pagename;
  }
  function is_dirty() {
    assert($this->opened);
    return $this->dirty;
  } */
}

?>
