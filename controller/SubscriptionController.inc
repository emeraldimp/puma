<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the LGPL. See License for full licensing information a

/* $Id: UserController.inc 20 2007-04-18 16:29:50Z emeraldimp $ */

class SubscriptionController {
  var $controller_map = array("create" => "create/([0-9]+)?",
                              "do_create" => "do_create/?",
                              "edit" => "edit/([0-9]+)",
                              "do_edit" => "do_edit/([0-9]+)",
                              "delete" => "remove/([0-9]+)",
                              "do_delete" => "do_remove/([0-9]+)",
                              "llist" => "list/?"
                          );
  
  function create($dispatcher, $userid=null) {
    global $smarty;
    $activeuser = User::ensure();
    $errormessage = "You don't have permission to create a subscription!";
    if (!$activeuser->authorized(1,$errormessage)) {
        if ($activeuser->id == 0) {
            setpreviouspage("/subscription/create/");
            $dispatcher->redirect('/user/login/');
        } else {
            $dispatcher->redirect(getpreviouspage());
        }
        return false;
    }

    $subscription = new Subscription();
    $subscription->subscriptionStartDate = date("Y-m-d");
    
    $nextyear = mktime(0, 0, 0, date("m"),   date("d"),   date("Y")+1);
    $subscription->subscriptionEndDate = date("Y-m-d", $nextyear);
        
    if (isset($userid))
    {
        $subscription->userid = $userid;
    }

    $smarty->assign("action", "do_create");
    $smarty->assign("template", "subscription.manage");
    $smarty->assign("users", User::getAll());
    $smarty->assign("subscription", $subscription);
  }

  function do_create($dispatcher) {
    global $smarty;
    $activeuser = User::ensure();
    $previouspage = getpreviouspage();
    $errormessage = "You don't have permission to create a subscription!";
    if (!$activeuser->authorized(1,$errormessage)) {
        if ($activeuser->id == 0) {
            setpreviouspage("/subscription/create");
            $dispatcher->redirect('/user/login/');
        } else {
            $dispatcher->redirect(getpreviouspage());
        }
        return false;
    }

    $userId = $_POST['userid'];
    $startDate = strtotime($_POST['startDate']);
    $endDate = strtotime($_POST['endDate']);

    $errors = false;

    $user = User::staticGet($userId);

    if (!isset($user)) {
      addmessage("Please select a user.");
      $errors = true;
    }
    if (!isset($startDate)) { 
      addmessage("Please enter a valid date.");
      $errors = true;
    }
    if (!isset($endDate)) { 
      addmessage("Please enter a valid date.");
      $errors = true;
    }

    if ($errors) {
      $dispatcher->redirect('/subscription/create'); // XXX: We should preserve the entered values!
      return;
    }
    
    $subscription = new Subscription();
    $subscription->userid = $user->id;
    $subscription->subscriptionStartDate = date("Ymd", $startDate);
    $subscription->subscriptionEndDate = date("Ymd", $endDate);
    
    if (!$subscription->insert()) {
      addmessage("User Creation failed! Please try again later.");
      $dispatcher->redirect('/subscription/create');
      return;
    }

    addmessage("Subscription Creation Successful!");

    $dispatcher->redirect($previouspage);
  }
  
  function edit($dispatcher, $subscriptionid=null) {
    global $smarty;
    $activeuser = User::ensure();
    $errormessage = "You don't have permission to edit a subscription!";
    if (!$activeuser->authorized(1,$errormessage)) {
        if ($activeuser->id == 0) {
            setpreviouspage("/subscription/edit/");
            $dispatcher->redirect('/user/login/');
        } else {
            $dispatcher->redirect(getpreviouspage());
        }
        return false;
    }

    $smarty->assign("action", "do_edit/".$subscriptionid);
    $smarty->assign("template", "subscription.manage");
    $smarty->assign("users", User::getAll());
    $smarty->assign("subscription", Subscription::staticGet($subscriptionid));
  }

  function do_edit($dispatcher, $subscriptionid = null) {
    global $smarty;
    $activeuser = User::ensure();
    $previouspage = getpreviouspage();
    $errormessage = "You don't have permission to edit a subscription!";
    if (!$activeuser->authorized(1,$errormessage)) {
        if ($activeuser->id == 0) {
            setpreviouspage("/subscription/edit");
            $dispatcher->redirect('/user/login/');
        } else {
            $dispatcher->redirect(getpreviouspage());
        }
        return false;
    }

    $subscription = Subscription::staticGet($subscriptionid);
    $userId = $_POST['userid'];
    $startDate = strtotime($_POST['startDate']);
    $endDate = strtotime($_POST['endDate']);

    $errors = false;

    $user = User::staticGet($userId);

    if (!isset($subscription)) {
        addmessage("Subscription does not exist!");
        $errors = true;
    }
    if (!isset($user)) {
      addmessage("Please select a user.");
      $errors = true;
    }
    if (!isset($startDate)) { 
      addmessage("Please enter a valid date.");
      $errors = true;
    }
    if (!isset($endDate)) { 
      addmessage("Please enter a valid date.");
      $errors = true;
    }

    if ($errors) {
      $dispatcher->redirect('/subscription/edit'); // XXX: We should preserve the entered values!
      return;
    }
    
    $subscription->userid = $user->id;
    $subscription->subscriptionStartDate = date("Ymd", $startDate);
    $subscription->subscriptionEndDate = date("Ymd", $endDate);
    
    if (!$subscription->update()) {
      addmessage("Subscription Update failed! Please try again later.");
      $dispatcher->redirect('/subscription/edit/'.$subscriptionId);
      return;
    }

    addmessage("Subscription Update Successful!");

    $dispatcher->redirect($previouspage);
  }
  
  function delete($dispatcher, $subscriptionid) {
      global $smarty;
      $activeuser = User::ensure();
      $previouspage = getpreviouspage();
      $errormessage = "You don't have permission to remove a subscription!";
      if (!$activeuser->authorized(1,$errormessage)) {
          if ($activeuser->id == 0) {
              setpreviouspage("/subscription/remove");
              $dispatcher->redirect('/user/login/');
          } else {
              $dispatcher->redirect(getpreviouspage());
          }
          return false;
      }

      $smarty->assign("template", "subscription.delete");
      $smarty->assign("subscription", Subscription::staticGet($subscriptionid));
  }

  function do_delete($dispatcher, $subscriptionid) {
      $activeuser = User::ensure();
      $previouspage = getpreviouspage();
      $errormessage = "You don't have permission to remove a subscription!";
      if (!$activeuser->authorized(1,$errormessage)) {
          if ($activeuser->id == 0) {
              setpreviouspage("/subscription/remove");
              $dispatcher->redirect('/user/login/');
          } else {
              $dispatcher->redirect($previouspage);
          }
          return false;
      }
      if (isset($_POST['cancel'])) {
          addmessage("Delete Cancelled!");
          $dispatcher->redirect("/subscription/list");
          return false;
      }

      $subscription = Subscription::staticGet($subscriptionid);

      if (isset($subscription))
      {
          if ($subscription->delete()) {
              addmessage("Subscription #$subscription->id deleted successfully");
          } else {
              addmessage("Subscription #$subscription->id could not be deleted!");
          }
      }

      $dispatcher->redirect($previouspage);
      return true;
  }

  function llist($dispatcher) {
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
      setpreviouspage("/subscription/list");
      $subscription = new Subscription();
      $subscription->find();
      while ($subscription->fetch())
          $smarty->append("subscriptions", clone($subscription));
      $smarty->assign("user", $activeuser);
      $smarty->assign("template", "subscription.list");
  }

}
