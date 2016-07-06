<?php
/**
 * Table Definition for survey
 */
require_once 'DB/DataObject.php';

class Survey extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'survey';              // table name
    public $id;                              // int(10)  not_null primary_key unsigned auto_increment
    public $userid;                          // int(10)  not_null unsigned
    public $surveyDate;                      // datetime(19)  binary
    public $surveyResult;                    // blob(65535)  blob

    /* Static get */
    function staticGet($k,$v=NULL) { return parent::staticGet('Survey',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
