<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information

/* $Id$ */

/**
 * Table Definition for version
 */
require_once 'DB/DataObject.php';

class Version extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    var $__table = 'version';                         // table name
    var $id;                              // int(10)  not_null primary_key unsigned auto_increment
    var $page;                            // int(10)  not_null unsigned
    var $user;                            // int(10)  not_null unsigned
    var $time;                            // timestamp(19)  not_null unsigned zerofill binary timestamp
    var $content;                         // blob(196605)  not_null blob

    /* ZE2 compatibility trick*/
    function __clone() { return $this;}

    /* Static get */
    function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('Version',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
