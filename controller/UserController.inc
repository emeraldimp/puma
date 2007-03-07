<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information a

/* $Id$ */

class UserController {
  var $controller_map = array("prefs" => "prefs/?",
                              "login" => "login/?",
                              "do_login" => "do_login/?",
                              "do_logout" => "do_logout/?",
                              "do_password" => "do_password/?",
                              "password" => "password/?",
                              "create" => "create/?",
                              "do_create" => "do_create/?",
                              "confirm" => "confirm/?([0-9]+)?/?([0-9]+)?",
                              "do_confirm" => "do_confirm/?([0-9]+)?/?([0-9]+)?",
                              "resetpw" => "resetpw/?([0-9]+)?",
                              "do_pw_reset" => "do_pw_reset/?([0-9]+)?",
                              "changeemail" => "email/?",
                              "do_changeemail" => "do_email/?",
                              "do_changeperms" => "do_perms/([0-9]+)",
                              "llist" => "list/?"
                          );
  function do_changeperms(&$dispatcher, $userid) {
      $user = User::ensure();
      $errormessage = "You do not have permission to change user permissions!";
      if (!$user->authorized(0,$errormessage)) {
          $dispatcher->redirect('/user/login');
	  return false;
      }

      $changeuser = User::staticGet($userid);
      if ($user == null) { 
          addmessage("User doesn't exist!");
	  $dispatcher->redirect($previouspage);
          return;
      } elseif (!isset($_REQUEST['permission']) || $_REQUEST['permission'] > 3 || $_REQUEST['permission'] < 0) {
          addmessage("Bad permission setting");
	  $dispatcher->redirect($previouspage);
          return;
      }

      $changeuser->permission = $_REQUEST['permission'];
      if (!$changeuser->update()) {
          addmessage("User update failed!");
      } else { 
          addmessage("User permissions changed!");
      }
      $dispatcher->redirect(getpreviouspage());
      return;
  }
              
  function do_changeemail(&$dispatcher) {
      global $smarty,$SITENAME;
      $host = $_SERVER['SERVER_NAME'];
      $user = User::ensure();
      $errormessage = "You are logged in anonymously!";
      if (!$user->authorized(2,$errormessage)) {
	  setpreviouspage('/user/changeemail');
          $dispatcher->redirect('/user/login');
	  return false;
      }
      if ($_REQUEST['newemail1'] != $_REQUEST['newemail2']) {
          addmessage("New email addresses don't match!");
	  $dispatcher->redirect('/user/email');
	  return false;
      }

      if (!validemail($_REQUEST['newemail1'])) {
          addmessage("New email address is invalid!");
	  $dispatcher->redirect('/user/email');
	  return false;
      }

      $user->validated = 0;
      $user->confirmation = mt_rand();

      $base = "http://";
      $base .= $host;
      $base .= $_SERVER['SCRIPT_NAME'];
      $base .= "/";

      $smarty->assign('username',$user->name);
      $smarty->assign('newemail',$_REQUEST['newemail1']);
      $smarty->assign('confirmation',$user->confirmation);
      $smarty->assign('website_name',$SITENAME);
      $smarty->assign('confirm_address',$base."user/confirm/".$user->id."/".$user->confirmation);
      $smarty->assign('BASE',$base."user/login");
      $smarty->assign('HOST',$host);

      mail($user->email, "Notification of email change for {$user->name} on ".$SITENAME, $smarty->fetch('user.notifychangeemail.txt'));
      addmessage("An email notifying you of your change has been sent to {$user->email}.");

      mail($_REQUEST['newemail1'], "Account confirmation for ".$SITENAME, $smarty->fetch('user.confirmemail.txt'));
      addmessage("An email containing a confirmation number has been sent to {$_REQUEST['newemail1']}.  Please follow the instructions in the email.");

      $user->email = $_REQUEST['newemail1'];
      $user->update();
      addmessage("Email address changed to {$user->email}.");

      $dispatcher->redirect('/user/prefs');
      return true;
  }
			  
  function changeemail(&$dispatcher) {
      global $smarty;
      $user = User::ensure();
      $errormessage = "You are logged in anonymously!";
      if (!$user->authorized(2,$errormessage)) {
	      setpreviouspage('/user/email');
	      $dispatcher->redirect('/user/login');
	      return false;
      }

      $smarty->assign('user',$user);
      $smarty->assign('template','user.changeemail');

      return true;
  }

  function resetpw(&$dispatcher,$userid=null) {
      global $smarty;
      $activeuser = User::ensure();
      if (isset($userid) && $activeuser->permission == 0) $user = User::staticGet($userid);
      else $user = null;

      $smarty->assign('user',$activeuser);
      $smarty->assign('resetuser',$user);
      $smarty->assign('template','user.resetpw');

      return true;
  }

  function do_pw_reset(&$dispatcher,$userid=null) {
      global $smarty, $SITENAME, $HOST;
      $previouspage = getpreviouspage(); 
      $emailmatch = null;
      $activeuser = User::ensure();

      if (isset($userid)) $user = User::staticGet($userid);
      else if (isset($_REQUEST['username']) && isset($_REQUEST['emailaddress'])) {
	  if ($_REQUEST['emailaddress'] == '') {
              addmessage("No email given!");
	      $dispatcher->redirect('/user/resetpw');
	      return false;
	  }
          $user = new User();
	  $user->name = $_REQUEST['username'];
	  $user->email = $_REQUEST['emailaddress'];
	  if ($user->count() == 1) {
              $emailmatch = true;
	      $user->find();
	      $user->fetch();
	      if ($user->validated != 1) {
		  addmessage("User email has not been verified.  Please verify account or contact an administrator for assistance.");
                  $dispatcher->redirect('/user/resetpw');
		  return false;
              }
		  
	  }
	  else {
	      addmessage("Wrong email address or username!");
              $dispatcher->redirect('/user/resetpw');
	      return false;
	  }
      }
      else {
	  addmessage("No user specified!");
          $dispatcher->redirect($previouspage);
	  return false;
      }
      
      $errormessage = "You are not authorized to reset passwords!";
      if (!$activeuser->authorized(0, $errormessage) && !$emailmatch) {
          $dispatcher->redirect('/user/login');
	  return false;
      }

      $newpassword = code(15);
      
      $user->password = sha1($newpassword);
      $user->update();
      
      $smarty->assign('username',$user->name);
      $smarty->assign('password',$newpassword);
      $smarty->assign('website_name',$SITENAME);
      $smarty->assign('host',$HOST);
      $from = 'From: "'.$SITENAME.'" <webmaster@'.$HOST.'>';
      mail($user->email, "Password reset for $user->name at ".$SITENAME, $smarty->fetch('user.pwreset.txt'), $from);
      addmessage("An email containing the new password has been sent to $user->email.");

      $dispatcher->redirect($previouspage);
      return true;

  }

  function confirm(&$dispatcher,$userid=null,$confirm=null) {
    global $smarty;
    if (isset($userid) && isset($confirm)) {
        $dispatcher->redirect('/user/do_confirm/'.$userid.'/'.$confirm);
        return true;
    }
    if (isset($userid)) {
        $user = User::staticGet($userid);
        $smarty->assign("user",$user->toArray());
    }
    $activeuser = User::ensure();
    if ($activeuser->permission == 0) {
        $smarty->assign("template","user.adminconfirm");
    } else {
        $smarty->assign("template","user.confirm");
    }
    
    return;
  }
  
  function do_confirm(&$dispatcher,$userid=null,$confirm=null) {
    global $smarty;
    $activeuser = User::ensure();
    if (!isset($confirm) && $activeuser->permission != 0) {
        if (isset($_REQUEST['confirm']) && $_REQUEST['confirm'] != "") $confirm = $_REQUEST['confirm'];
        else {
            addmessage("Please enter a confirmation number");
            $dispatcher->redirect('/user/confirm/'.$userid);
            return false;
        }
    }
    if (!isset($userid)) {
        if ($_REQUEST['username'] != "") {
            $user = new User();
            $user->name = $_REQUEST['username'];
            $user->find();
            $user->fetch();
            $userid = $user->id;
        }
        else {
            addmessage("Please enter a username");
            $dispatcher->redirect('/user/confirm/');
            return false;
        }
    }
    $user = User::staticGet($userid);
    if ($user->confirmation == $confirm || $activeuser->permission == 0) {
        $user->confirmation = 0;
        $user->validated = 1;
        $user->update();
        addmessage("User $user->name confirmed!");
        $dispatcher->redirect('/user/login/');
    } else {
        addmessage("Confirmation number incorrect!");
        $dispatcher->redirect('/user/confirm/'.$userid);
    }
    return;
  }

  
  function create(&$dispatcher) {
    global $smarty;
    global $USER_SELF_CREATE;
    $previouspage = getpreviouspage();
    if (!isset($_SESSION['userid']) && $USER_SELF_CREATE) {
      $smarty->assign("template", "user.selfcreate");
    } else if (isset($_SESSION['userid'])) {
      $user = User::staticGet($_SESSION['userid']);
      if ($user->permission == 0) {
        $smarty->assign("template","user.admincreate");
        return;
      } else {
        addmessage("You must be an administrator to set up user accounts.");
        $dispatcher->redirect($previouspage);
        return;
      }
    } else {
      addmessage("User signups are not allowed.  Please contact an administrator to set up your account.");
      $dispatcher->redirect($previouspage);
    }

  }

  function do_create(&$dispatcher) {
    global $smarty;
    global $USER_SELF_CREATE;
    global $SITENAME;
    $previouspage = getpreviouspage();
    $host = $_SERVER['SERVER_NAME'];
    $base = "http://";
    $base .= $host;
    $base .= $_SERVER['SCRIPT_NAME'];
    $base .= "/";

    if (!isset($_SESSION['userid']) && !$USER_SELF_CREATE) {
      addmessage("User signups are not allowed.  Please contact an administrator to set up your account.");
      $dispatcher->redirect($previouspage);
    } else if (isset($_SESSION['userid'])) {
      $user = User::staticGet($_SESSION['userid']);
      if ($user->permission == 0) {
        if (isset($_POST['verified'])) $verified = 1;
        if (isset($_POST['sendemail'])) $sendemail = 1;
        $permissions = $_POST['permissions'];
      }
    } 

    foreach (array("username","email","password1","password2") as $key) {
      if (!isset($_POST[$key])) $_POST[$key]='';
    }

    $newusername = $_POST['username'];
    $email = $_POST['email'];
    $passwd1 = $_POST['password1'];
    $passwd2 = $_POST['password2'];

    $errors = false;
    
    if ($newusername == "") {
      addmessage("Please enter a username.");
      $errors = true;
    }
    if (!validemail($email)) { 
      addmessage("Please enter a correct email address.");
      $errors = true;
    }
    if ($passwd1=="") {
      addmessage("Please enter a password.");
      $errors = true;
    }
    if ($passwd1 != $passwd2) {
      addmessage("Passwords do not match.");
      $errors = true;
    }

    $user = new User();
    $user->name = $newusername;
    if ($user->count()) {
      addmessage("Username already exists.  Please choose another.");
      $errors = true;
    }
    
    if ($errors) {
      $dispatcher->redirect('/user/create'); // XXX: We should preserve the entered values!
      return;
    }
    
    $user->password = sha1($passwd1);
    $user->email = $email;
    if (isset($permissions)) {
      $user->permission = $permissions;
    } else {
      $user->permission = 2;
    }
    if (isset($verified)) {
      $user->validated = $verified;
      $user->confirmation = 0;
    } else {
      $user->validated = 0;
      $user->confirmation = mt_rand();
    }

    
    if (!$user->insert()) {
      addmessage("User Creation failed! Please try again later.");
      $dispatcher->redirect('/user/create');
      return;
    }


    addmessage("User Creation Successful!");
    $smarty->assign('username',$user->name);
    $smarty->assign('confirmation',$user->confirmation);
    $smarty->assign('website_name',$SITENAME);
    $smarty->assign('confirm_address',$base."user/confirm/".$user->id."/".$user->confirmation);
    $smarty->assign('BASE',$base."user/login");
    $smarty->assign('HOST',$host);

    if (isset($verified)) {
      if (isset($sendemail) && $sendemail == 1) {
        mail($user->email, "Welcome to ".$SITENAME, $smarty->fetch('user.welcomeemail.txt'));
        addmessage("A welcome email has been sent to $email.");
      } else {
        addmessage("No email was sent to the new user.");
      }
    } else {
      mail($user->email, "Account confirmation for ".$SITENAME, $smarty->fetch('user.confirmemail.txt'));
      addmessage("An email containing a confirmation number has been sent to $email.  Please follow the instructions in the email.");
    }

    if (isset($_SESSION['userid'])) {
      $dispatcher->redirect($previouspage);
      return;
    } else {
      $dispatcher->redirect($previouspage);
    }
    
  }


  function llist(&$dispatcher) {
      global $smarty,$permission_names;
      $activeuser = User::ensure();
      $errormessage = "You don't have permission to view the user list!";
      if (!$activeuser->authorized(1,$errormessage)) {
	  if ($activeuser->id == 0) {
              setpreviouspage("/user/list");
              $dispatcher->redirect('/user/login/');
	  } else {
	      $dispatcher->redirect(getpreviouspage());
	  }
          return false;
      }
      setpreviouspage("/user/list");
      $user = new User();
      $user->find();
      while ($user->fetch())
          $smarty->append("users", $user->toArray());
      $smarty->assign("user", $activeuser);
      $smarty->assign("template", "user.list");
  }

  function login(&$dispatcher) {
    global $smarty;
    global $USER_SELF_CREATE;
    if(isset($_SESSION['username'])) {
      $dispatcher->redirect(getpreviouspage());
    }
    if(!isset($_SERVER['HTTPS'])) {
      $dispatcher->redirect('/user/login','https');
    }
    $smarty->assign("USER_CREATE", $USER_SELF_CREATE);
    $smarty->assign("template", "user.login");
  }

  function prefs(&$dispatcher) {
    global $smarty;
    $user = User::ensure();
    if(!isset($_SESSION['username'])) {
      $dispatcher->redirect('/user/login/');
    }
    $smarty->assign("template", "user.prefs");
    $smarty->assign("user", $user);
  }
  
  function do_login(&$dispatcher) {
    global $smarty;
    $previouspage = getpreviouspage();
    $user = User::authenticate($_REQUEST['username'],$_REQUEST['password']);
    if(isset($user->id)) {
        $_SESSION['username'] = $user->name;
        $_SESSION['userid'] = $user->id;
        addmessage("Successfully Logged in!");
    	$dispatcher->redirect($previouspage,'http');
    }
    else {
        addmessage("Login failed. Please check your username and password.");
    	$dispatcher->redirect('/user/login/');
    } 
  }
  
  function do_logout(&$dispatcher) {
    global $smarty;
    $previouspage = getpreviouspage();
    session_destroy();
    session_start();
    addmessage('Logged out');
    $dispatcher->redirect('/user/login/');
    return;
  }
  
  function password(&$dispatcher) {
    global $smarty;
    $user = User::ensure();
    if($user->id == 0) {
      addmessage('Please log in to change your password.');
      setpreviouspage("/user/password");
      $dispatcher->redirect('/user/login/');
      return;
    }
    if(!isset($_SERVER['HTTPS'])) {
      $dispatcher->redirect('/user/password','https');
    }
    $smarty->assign("template","user.password");
    $smarty->assign("user",$user);
  }
  
  function do_password(&$dispatcher) {
    global $smarty;
    if(!isset($_SESSION['username'])) {
      $dispatcher->redirect('/user/login/');
    }
    
    if($_POST['newpw1'] != $_POST['newpw2']) {
        addmessage("Password Change Failed: New passwords don't match!");
	$dispatcher->redirect('/user/password/');
	return false;
    }
    
    $user = User::updatepassword($_SESSION['username'],$_POST['oldpassword'],$_POST['newpw1']);

    if($user == false) {
        addmessage("Password Change Failed: Probably 'Old Password' is wrong!");
	$dispatcher->redirect('/user/password/');
	return false;
    }
    
    addmessage("Password Successfully Changed!");

    $dispatcher->redirect('/user/prefs/','http');
  }
}
