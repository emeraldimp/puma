<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information

/* $Id$ */

/**
 * Table Definition for resource
 */
require_once 'DB/DataObject.php';

class Resource extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'resource';                        // table name
    public $id;                              // int(10)  not_null primary_key unsigned auto_increment
    public $nickname;                        // string(96)  not_null
    public $filename;                        // string(765)  not_null
    public $page;                            // int(10)  not_null unsigned
    public $date;                            // timestamp(19)  not_null unsigned zerofill binary timestamp
    public $description;                     // blob(765)  not_null blob
    public $data;                            // blob(-1)  not_null blob binary
    public $owner;                           // int(10)  not_null unsigned
    public $mime;                            // string(96)  not_null

    /* Static get */
    function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('Resource',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE

      function foo () {}

    /* Support for external (non-db) resources */
    var $is_external = False; // could be
    var $filepath = ""; // server path to file
    var $webpath = ""; // web URI to file

    function find() {
      if ($this->is_external)
        trigger_error("Can't call FIND on an external resource!", E_USER_ERROR);
      return parent::find();
    }

    function uri() {
      if ($this->is_external) {
        return $this->webpath;
      } else {
        return $_SERVER['SCRIPT_NAME']."/resource/view/$this->id";
      }
    }

    function fetch_all_for($page) {
      $resources = array();
      /* fetch from DB */
      $resource = new Resource();
      $resource->page = $page->id;
      $resource->find();
      while ($resource->fetch()) {
        $resources[] = clone($resource);
      }
      /* fetch from disk */
      $resdir = dirname(__FILE__)."../site/resources";
      if (file_exists($resdir) && is_dir($resdir)) {
        foreach (glob("$resdir/*") as $file) {
          $res = new Resource();
          $res->is_external = True;
          $res->filepath = $file;
          $res->webpath = $file;
          $res->nickname = basename($file, pathinfo($file, PATHINFO_EXTENSION));
        }
      }
      return $resources;
    }
    
    /* static array */ function get_list() {
	$pageid = null;
        $resources = array();
        $resource = new Resource();
	$resource->orderBy("page, id");
	$resource->find();
	while ($resource->fetch()) {
		$resources[$resource->id] = $resource->toArray();
		$resources[$resource->id]['depth'] = 2;
	}
        return $resources; 
    }
    
}
