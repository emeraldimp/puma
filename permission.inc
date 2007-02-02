<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

/* Helper functions for permission management. */

$permission_names = array(0 => "Admin", 
                          1 => "Editors",
                          2 => "Users",
                          3 => "Anybody");

define('PERM_ADMIN', 0);
define('PERM_EDITOR', 1);
define('PERM_USER', 2);
define('PERM_ANY', 3);

function make_perm_list($name, $default, $threshold = 0, $title=NULL) {
  //global $permission_names;
  $permission_names = array(0 => "Admin",
                            1 => "Editor",
                            2 => "User",
                            3 => "Everyone");
  $rt = "\n<select name=\"$name\"".
    (is_null($title) ? "" : " title=\"$title\"" ).
    ">";
  foreach($permission_names as $perm => $name) {
    if ($perm >= $threshold) {
      if ($perm == $default)
        $isdefault = " selected";
      else
        $isdefault = "";
      $rt .= "<option value=$perm$isdefault>$name</option>";
    }
  }
  return $rt . "</select>";
}

function perm_to_string($perm) {
  global $permission_names;
  return $permission_names[$perm];
}

?>
