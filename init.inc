<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

$config_ini = parse_ini_file("config.ini", true);

$database = $config_ini['database'];
$puma = $config_ini['puma'];
$search = $config_ini['search'];
$smartyvars = $config_ini['smarty'];
$paypal = $config_ini['paypal'];
$akismet = $config_ini['akismet'];

$USER_SELF_CREATE = $puma['allow_signups'];
$SITENAME = $puma['sitename'];
$HOST = $puma['host'];
$ADMIN_EMAIL = $puma['adminemail'];
$TECH_EMAIL = !empty($puma['techemail']) ? $puma['techemail'] : $ADMIN_EMAIL;
$template_dir = $puma['template_dir'];
$MULTIPUMA = $puma['multipuma'];
$DEFAULT_PERM['write'] = $puma['default_write_perm'];
$DEFAULT_PERM['read'] = $puma['default_read_perm'];
$DEFAULT_FORUM_PERM['write'] = $puma['default_forum_write_perm'];
$DEFAULT_FORUM_PERM['read'] = $puma['default_forum_read_perm'];
$DEFAULT_EBOOK_FORUM_PERM['write'] = $puma['default_ebook_forum_write_perm'];
$DEFAULT_EBOOK_FORUM_PERM['read'] = $puma['default_ebook_forum_read_perm'];

$PAGETYPES = explode(',',$puma['allowed_pagetypes']);
$PAGETYPES = array_flip($PAGETYPES); // XXX: This doesn't handle spaces well!

$SPHINX['use'] = $search['usesphinx'];
$SPHINX['path'] = $search['sphinxpath'];
$SPHINX['prefix'] = $search['sphinxprefix'];

$PAYPAL['url'] = $paypal['url'];

$AKISMET['apikey'] = $akismet['apikey'];
$AKISMET['server'] = $akismet['server'];

assert_options(ASSERT_BAIL, 1);
error_reporting(E_ALL);

set_include_path('contrib/pear/php:' . get_include_path());
set_include_path('contrib:' . get_include_path());
set_include_path($template_dir.':'. get_include_path());

require_once("degpc.inc");
degpc();
require_once('PEAR.php');
$dir = dirname(__FILE__);
set_include_path($dir.':'. get_include_path());

$options = &PEAR::getStaticProperty('DB_DataObject', 'options');
$options = array("database" => $database['location'],
                 "schema_location" => $dir.'/'.$database['schema_location'],
                 "class_location" => $dir.'/'.$database['class_location'],
                 "require_prefix" => $dir.'/'.$database['require_prefix'],
                 "class_prefix" => $database['class_prefix'],
	 	 "debug" => $database['debug']);
require_once('DB/DataObject.php');
PEAR::setErrorHandling(PEAR_ERROR_CALLBACK,"handle_pear_error");

require_once("functions.inc");

function handle_pear_error($error) {
    $message = "Pear error: ";
    $message .= "<pre>";
    $message .= $error->getMessage() ."\n".
      $error->getUserInfo(). "\n".
      $error->getDebugInfo()."\n";
    $message .= "</pre>";
    USER_ERROR($message, E_USER_ERROR);
}
?>
