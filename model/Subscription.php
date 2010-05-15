<?php
/**
 * Table Definition for subscription
 */
require_once 'DB/DataObject.php';

class Subscription extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'subscription';                    // table name
    public $id;                              // int(10)  not_null primary_key unsigned auto_increment
    public $userid;                          // int(10)  not_null unsigned
    public $paypalSubscriptionId;            // string(150)  not_null
    public $paypalPeriod;                    // string(45)  not_null
    public $subscriptionStartDate;           // date(10)  binary
    public $subscriptionEndDate;             // date(10)  binary

    /* Static get */
    function staticGet($k,$v=NULL) { return DB_DataObject::staticGet('Subscription',$k,$v); }

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    function IsValid()
    {
        return strtotime($this->subscriptionStartDate) < time() &&
            strtotime($this->subscriptionEndDate) > time();
    }

    function ValidSubscriptionExistsForUser($user)
    {
        $subscription = new Subscription();
        $subscription->userid = $user->id;
        $subscription->find();
        while ($subscription->fetch())
        {
            if ($subscription->IsValid()) return true;
        }

        return false;
    }
    
    function GetUserName() 
    {
        return User::staticGet($this->userid)->name;
    }

}
