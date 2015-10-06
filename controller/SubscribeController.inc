<?php
# Copyright 2002--2015 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

class SubscribeController {
    var $controller_map = array('show_subscribe' => 'show.*',
                                'do_confirm' => 'confirm/(\d+)'
                          );

  function show_subscribe($dispatcher) {
      global $smarty, $PAYPAL;
      if(!isset($_SESSION['userid'])) {
        addmessage("You must be logged in to subscribe!");
	setpreviouspage("/subscribe/show/");
	$dispatcher->redirect("/user/login");
        return false;
      }
      $user = User::ensure();

      $notifyUrl = "http://".$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME'];
      $notifyUrl .= "/subscribe/confirm/{$user->id}";

      $smarty->assign("paypalUrl", $PAYPAL['url']);
      $smarty->assign("user", $user);
      $smarty->assign("notifyUrl", $notifyUrl);
      $smarty->assign("template", "subscribe");
  }

  function do_confirm($dispatcher, $userid)
  {
      $user = User::staticGet($userid);
      
      if (!self::requestIsValid($user)) return;

      self::updateSubscription($user);
      self::sendEmails($user);
  }

  function requestIsValid($user)
  {
      $sentUserId = $_POST['custom'];
      
      return $user != null && $sentUserId == $user->id && self::validateWithPaypal();
  }

  function updateSubscription($user)
  {
      if ($_POST['txn_type'] == 'subscr_signup')
      {
          self::createSubscription($user);
      }
      elseif ($_POST['txn_type'] == 'subscr_payment')
      {
          self::extendSubscription($user);
      }
  }

  function extendSubscription($user) 
  {
      $paypalSubscriptionId = $_POST['subscr_id'];

      $subscription = new Subscription();
      $subscription->paypalSubscriptionId = $paypalSubscriptionId;
      while ($subscription->count() == 0) sleep(2);

      $subscription->find();
      $subscription->fetch();

      if ($subscription->IsValid())
      {
          $subscription->subscriptionEndDate = AddSubscriptionPeriod(strtotime($subscription->subscriptionEndDate),$subscription->paypalPeriod);
      }
      else
      {
          $subscription->subscriptionStartDate = date('Ymd');
          $subscription->subscriptionEndDate = AddSubscriptionPeriod(time(),$subscription->paypalPeriod);
      }

      $subscription->update();
  }

  function createSubscription($user)
  {
      $paypalSubscriptionId = $_POST['subscr_id'];
      $paypalperiod = $_POST['period3'];

      $subscription = new Subscription();
      $subscription->paypalSubscriptionId = $paypalSubscriptionId;
      if ($subscription->count() > 0) return;

      $subscription->userid = $user->id;
      $subscription->paypalPeriod = $paypalperiod;
      $subscription->insert();
  }


  function sendEmails($user)
  {
      global $ADMIN_EMAIL;
      require_once("html-mailer.inc");
      
      $actionType = "(unknown action)";

      if ($_POST['txn_type'] == 'subscr_signup')
      {
          $actionType = "created";
      }
      elseif ($_POST['txn_type'] == 'subscr_payment')
      {
          $actionType = "extended";
      }
      elseif ($_POST['txn_type'] == 'subscr_cancel')
      {
          $actionType = "canceled";
      }
      elseif ($_POST['txn_type'] == 'subscr_eot')
      {
          $actionType = "expired";
      }
      else
      {
	  $mail = new HtmlMailer("CWP Subscriptions <subscriptions@creolewest.com>",
              $ADMIN_EMAIL, "Subscription - unknown transaction type");
          $mail->set_plain("Received unknown transaction type {$_POST['txn_type']} for user {$user->name}!\n\n");
          $mail->set_html("Received unknown transaction type {$_POST['txn_type']} for user {$user->name}!\n\n");
	  $mail->send();
          return; 
      }

      $mail = new HtmlMailer("CWP Subscriptions <subscriptions@creolewest.com>",
          $ADMIN_EMAIL, "Subscription confirmation");
      $mail->set_plain("Subscription {$actionType} for user {$user->name}!\n\n");
      $mail->set_html("Subscription {$actionType} for user {$user->name}!\n\n");
      $mail->send();
  }

  function validateWithPaypal()
  {
      global $PAYPAL;
      require_once('contrib/paypal/paypal.class.php');
      
      $p = new paypal_class;             // initiate an instance of the class
      $p->paypal_url = $PAYPAL['url'];
      $p->ipn_log = false;

      // validate with paypal
      return $p->validate_ipn();
  }
}

?>
