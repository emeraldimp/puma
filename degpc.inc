<?php
function degpc() {
  
  if (get_magic_quotes_gpc()) {
    /*
     All these global variables are slash-encoded by default,
     because    magic_quotes_gpc is set by default!
     (And magic_quotes_gpc affects more than just $_GET, $_POST, and $_COOKIE)
    */
    $_SERVER = stripslashes_array($_SERVER);
    $_GET = stripslashes_array($_GET);
    $_POST = stripslashes_array($_POST);
    $_COOKIE = stripslashes_array($_COOKIE);
    $_FILES = stripslashes_array($_FILES);
    $_ENV = stripslashes_array($_ENV);
    $_REQUEST = stripslashes_array($_REQUEST);
    if (isset($_SESSION)) {    #These are unconfirmed (?)
      $_SESSION = stripslashes_array($_SESSION, '');
    } else if (isset($HTTP_SESSION_VARS)) {
      $HTTP_SESSION_VARS = stripslashes_array($HTTP_SESSION_VARS, '');
    }
    /*
     The $GLOBALS array is also slash-encoded, but when all the above are
     changed, $GLOBALS is updated to reflect those changes.  (Therefore
     $GLOBALS should never be modified directly).  $GLOBALS also contains
     infinite recursion, so it's dangerous...
    */
  }
}

function stripslashes_array($data) {
  if (is_array($data)){
    foreach ($data as $key => $value){
      $data[$key] = stripslashes_array($value);
    }
    return $data;
  }else{
    return stripslashes($data);
  }
}
?>
