<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

require_once("PaypalTimeFunctions.inc");

// Functions from PageController.inc

if (!function_exists('file_put_contents')) {
  function file_put_contents($filename, &$contents) {
    $file = fopen($filename, "w");
    fwrite($file, $contents);
    fclose($file);
  }
}

function relinify($exp) {
    /* Break input:
       1. one tag per line
       2. one sentence per line. */
    $from2 = preg_replace("/\\r\\n/","",$exp);
    $from2 = preg_replace("/\\\\r\\\\n/","",$from2);
    $from2 = preg_replace("/<.*>/U","\n$0\n",$from2);
    $from2 = preg_replace("/(?<=[.!?])(\s|&nbsp;)/","$0\n",$from2);
    $from2 = preg_replace("/(\\n\\n|\\n\\s*\\n)/","\n",$from2);
    $from2 = preg_replace("/^(\s|&nbsp;)/m","",$from2);
    return $from2;
}

function diff(&$from, &$to) {
    $from2 = wordwrap(relinify($from->content), 60, "\n", 1);
    $to2 = wordwrap(relinify($to->content), 60, "\n", 1);
    file_put_contents("/tmp/puma-fromdiff".$from->id, $from2);
    file_put_contents("/tmp/puma-todiff".$to->id, $to2);
    $diff = shell_exec("diff -b -s -y --left-column /tmp/puma-fromdiff".$from->id." /tmp/puma-todiff".$to->id);
    unlink("/tmp/puma-fromdiff".$from->id);
    unlink("/tmp/puma-todiff".$to->id);
    return $diff;
}

function parsediff($diffout) {
        //$diffout2 = explode("\n", $diffout);
    $diffout2 = $diffout;
    $unchanged = preg_grep("/^(.|\s)+\s\($/",$diffout2);
    $changed = preg_grep("/^(.|\s)+\s\|(.|\s)+$/",$diffout2);
    $added = preg_grep("/^(.|\s)+\s>\s(.|\s)+$/",$diffout2);
    $deleted = preg_grep("/^\s+<\s(.|\s)+$/",$diffout2);
    return array("unchanged" => $unchanged, 
                 "changed" => $changed, 
                 "added" => $added,
                 "deleted" => $deleted);
}

function makenewpage ($title, $parent, $user, $readperm, $writeperm, $type = 'html') {
      $page = new Page();
      $page->parent = $parent;
      $page->title = $title;
      $page->read_perm = $readperm;
      $page->write_perm = $writeperm;
      $page->position = 10000;
      $page->page_type = $type;
      $page->insert();
      $version = new Version();
      $version->page = $page->id;
      $version->user = $user->id;
      $version->content = "";
      $version->insert();
      $page->current_version = $version->id;
      $page->update();
      return true;
}

function movepage($pageid, $parentid) {
    $page = Page::staticGet($pageid);
    if (!$page->inParentTree($parentid)) {
        addmessage("You can't move a page beneath itself!");
        return false;
    }
    $page->parent = $parentid;
    $page->update();
    return true;
}

function updatesearchindex() {
    global $SPHINX;
    exec($SPHINX['path']."/bin/indexer --config {$SPHINX['path']}/etc/sphinx.conf --all");
    return;
}

// Functions from UserController.inc

/* Function code from MagicalTux at ooKoo dot org on http://us2.php.net/manual/en/function.mt-rand.php#69171 */
function code($nc, $a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@^') {
   $l=strlen($a)-1; $r='';
   while($nc-->0) $r.=$a{mt_rand(0,$l)};
   return $r;
}

function getpreviouspage($default = "/page/view/1") {
    return isset($_SESSION['previouspage'][0]) ? array_pop($_SESSION['previouspage']) : $default;
}

function setpreviouspage($location = "/page/view/1") {
    if ($location != end($_SESSION['previouspage'])) 
        $_SESSION['previouspage'][] = $location;
    return;
}

function addmessage($message) {
    $_SESSION['messages'][] = $message;
    return;
}

function validemail($address) { // XXX: Needs to actually check for valid structure!
  if ($address == "") return false;

  return true;
}

// Functions from init.inc

function base($pumabase = false) {
    global $MULTIPUMA;
    $dir = dirname($_SERVER['SCRIPT_NAME']);
    if ($dir == "/") $dir = "";
    if ($MULTIPUMA == true && $pumabase == true) {
        $dir .= "/puma";
    }
    return $dir;
}

?>
