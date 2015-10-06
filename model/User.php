<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information

/**
 * Table Definition for user
 */
require_once 'DB/DataObject.php';

class User extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'user';                // table name
    public $id;                              // int(10)  not_null primary_key unsigned auto_increment
    public $name;                            // string(255)  not_null unique_key
    public $password;                        // string(40)  not_null
    public $permission;                      // int(3)  not_null unsigned
    public $preferences;                     // blob(255)  not_null blob
    public $email;                           // string(255)  not_null
    public $validated;                       // int(5)  not_null unsigned
    public $confirmation;                    // int(10)  not_null unsigned
    public $subscriptionEndDate;             // date(10)  binary

    /* Static get */
    static function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('User',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE

    function authenticate($name, $pw) {
        $user = new User();
        $user->name = $name;
        $user->password = sha1($pw);
        $user->find();
        $user->fetch();
        if (isset($user->id)) {
          return $user;
        }
        else {
          return false;
        }
    }

    function ensure() {
        if (isset($_SESSION['userid'])) {
            $user = User::staticGet($_SESSION['userid']);
        } else {
            $user = User::staticGet(0);
        }
        return $user;
    }

    function updatepassword($username, $oldpw, $newpw) {
        $user = User::authenticate($username,$oldpw);
        if($user == false) {
              return false;
        }

        $user->password = sha1($newpw);
        $user->update();
        if($user == false) {
              return false;
        }
        return $user;
    }

    function authorized($level, $message=false) {
        if ($this->permission <= $level) return true;
        else if ($this->id == 0) {
            if ($message === "") return false;
            else $_SESSION['messages'][] = "You are not logged in!";
         } else if ($this->id != 0 && $message == false) {
            if ($message === "") return false;
            $_SESSION['messages'][] = "You don't have permission to complete the action.";
        } else if ($message != false) {
            $_SESSION['messages'][] = $message;
        }
        return false;
    }

    function CanViewRestrictedZone() 
    {
        if ($this->permission == 0)
        {
            return true;
        }

        return Subscription::ValidSubscriptionExistsForUser($this);
    }

    function GetName()
    {
        return $this->name;
    }

    function GetAll()
    {
        $user = new User();
        $user->find();
        $users = array();
        while ($user->fetch())
            $users[] = clone($user);
        return $users;
    }

}
