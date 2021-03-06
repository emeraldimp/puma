<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

/*      if (isset($_REQUEST['page'])) {    // A kludge to detect when a link was intended for a previous version.
      	header("HTTP/1.1 404 Not Found");
	return;
      }*/
session_start();
//session_register('messages');
// XXX: Also, buffer all output until a Smarty template is used, so errors can be caught!
//session_register('previouspage');

global $dir;

if (!isset($_SESSION['previouspage'])) $_SESSION['previouspage'] = array();

if(function_exists('date_default_timezone_set'))
   date_default_timezone_set('America/Chicago');

require_once("init.inc");
include_once("dispatcher.inc");
require_once('smarty3/Smarty.class.php');
require_once('MySmarty.inc');
foreach (glob("$dir/model/*.php") as $file) include_once $file;

$smarty = new MySmarty();

// set the default handler
$smarty->default_template_handler_func = 'make_template';

$d = new Dispatcher();
$d->autoload($dir."/controller");
$d->dispatch(isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : "/page/view/1");
$smarty->assign("messages",$_SESSION['messages']);
if ($smarty->getTemplateVars("template")) {
    if (@$_REQUEST["format"] == "xml") {
        header("Content-Type: text/xml");
        $smarty->display('file:' . $smarty->getTemplateVars("template").".xml");
    } else {
        $smarty->display('file:' . $smarty->getTemplateVars("template"). (isset($_REQUEST['format']) ?
                                                                        "." . $_REQUEST['format'] : ".html"));
        $_SESSION['messages'] = array();
    }
} else {
    echo "No template?";
}

?>
