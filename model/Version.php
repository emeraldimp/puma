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

    public $__table = 'version';             // table name
    public $id;                              // int(10)  not_null primary_key unsigned auto_increment
    public $page;                            // int(10)  not_null unsigned
    public $user;                            // int(10)  not_null unsigned
    public $time;                            // timestamp(19)  not_null unsigned zerofill binary timestamp
    public $content;                         // blob(4294967295)  not_null blob

    /* Static get */
    function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('Version',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
