<?php
# Copyright 2011 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

include_once("html-mailer.inc");

function plugin_emaillist($args, &$page, &$user) 
{
    $email_list_token = $_REQUEST['email_list_token'];

    if (isset($email_list_token) && 
        $email_list_token == $_SESSION['email_list_token'] &&
        isset($_REQUEST['submittype']))
    {
        if (strtolower($_REQUEST['submittype']) == 'unsubscribe')
        {
            return EmailList::Unsubscribe($page);
        }
        else if (strtolower($_REQUEST['submittype']) == 'subscribe')
        {
            return EmailList::Subscribe($page);
        }
    }
    else if (isset($_REQUEST['confirmation']))
    {
        EmailList::Confirm($page);

        header("Location: ". base() . '/index.php/' . getpreviouspage() );
        exit();
    }
    else if (isset($_REQUEST['list']) && $user->authorized(1,""))
    {
        if (isset($_REQUEST['remove']))
        {
            EmailList::RemoveEmails($page, $_REQUEST['remove']);
        }

        return EmailList::RenderList($page);
    }
    else
    {
        if (isset($email_list_token))
        {
            addmessage("Sorry, there was an error. Please try again.");
        }

        return EmailList::RenderForm($user);
    }
}

class EmailList
{
    public static function RenderForm($user)
    {
        $emaillisttoken = uniqid();

        $_SESSION['email_list_token'] = $emaillisttoken;

        $content = '';

        if ($user->authorized(1, ""))
        {
            $content .= "<a href='?list'>List Subscribers</a>";
        }

        $content .= "<form action='#post' method='post'>";
        $content .= "<input type='hidden' name='email_list_token' value='{$emaillisttoken}' >";
        $content .= "<p><label for='name'>Name:</label><input type='text' name='name'></p>";
        $content .= "<p><label for='email'>Email Address:</label><input type='text' name='email'></p>";
        $content .= "<input type='submit' value='Subscribe' name='submittype'>";
        $content .= "<input type='submit' value='Unsubscribe' name='submittype'>";
        
        return $content;
    }
    
    public static function Unsubscribe($page)
    {
        $emailAddress = self::NormalizeEmailAddress($_REQUEST['email']);

        $emailList = self::GetEmailList($page);

        unset($emailList[$emailAddress]);

        self::SaveEmailList($page, $emailList);

        unset($_SESSION['email_list_token']);
        addmessage("Address {$emailAddress} was removed!");

        return '';
    }

    public static function RemoveEmails($page, $emails)
    {
        $emailList = self::GetEmailList($page);

        foreach ($emails as $emailAddress => $v)
        {
            unset($emailList[$emailAddress]);
            addmessage("Address {$emailAddress} was removed!");
        }

        self::SaveEmailList($page, $emailList);

        return '';
    }

    function NormalizeEmailAddress($email)
    {
        return strtolower(preg_replace('/\s/','', $email));
    }

    public static function Confirm($page)
    {
        $email = $_REQUEST['email'];
        $confirmation = $_REQUEST['confirmation'];

        if (!isset($email))
        {
            addmessage('No email given to confirm');
            return '';
        }

        $emailList = self::GetEmailList($page);

        if (isset($emailList[$email]) && $emailList[$email]['confirmation'] == $confirmation)
        {
            $emailList[$email]['confirmation'] = true;

            self::SaveEmailList($page, $emailList);
            addmessage("Email {$email} confirmed!");
        }

        return '';
    }

    public static function Subscribe($page)
    {
        $name = $_REQUEST['name'];

        $emailAddress = self::NormalizeEmailAddress($_REQUEST['email']);

        if (!validemail($emailAddress))
        {
            addmessage("Your email address does not appear to be valid");
            return self::RenderForm();
        }

        $emailList = self::GetEmailList($page);

        $confirmation = code(8);

        $emailList[$emailAddress] = array('name' => $name, 'email' => $emailAddress, 'confirmation' => $confirmation );

        self::SaveEmailList($page, $emailList);

        $hostPage = Page::staticGet($page->parent);

        self::SendConfirmationEmail($hostPage, $emailAddress, $confirmation);

        unset($_SESSION['email_list_token']);
        addmessage("Address was added!");

        return '';
    }

    function SaveEmailList($page, $emailList)
    {
        $version = new Version();
        $version->page = $page->id;
        $version->content = json_encode($emailList);
        $version->insert();
        $page->current_version = $version->id;
        $page->update();
    }

    function GetEmailList($page)
    {
        $version = Version::staticGet($page->current_version);

        $jsonEmailList = trim($version->content);

        if (empty($jsonEmailList))
        {
            $emailList = array();
        }
        else
        {
            $emailList = json_decode($jsonEmailList, true);
        }

        return $emailList;
    }

    function RenderList($page)
    {
        global $ADMIN_EMAIL;

        $emailList = self::GetEmailList($page);

        $content = '';

        $addresses = '';

        foreach ($emailList as $item)
        {
            if ($item['confirmation'] === true)
            {
                $addresses .= $item['email'] . ',';
            }
        }
        $addresses = substr($addresses, 0, -1);        

        $content .= "<a href='mailto:{$ADMIN_EMAIL}?bcc={$addresses}&subject=Newsletter'>Send email to everyone</a><br />";

        $content .= '<form action="#post" method="post">';
        $content .= '<table><tr><th>Name</th><th>Email</th><th>Confirmation</th><th>Remove?</th></tr>';

        foreach ($emailList as $item)
        {
            $confirmation = $item['confirmation'] === true ? 'complete' : $item['confirmation'];
            $content .= "<tr><td>{$item['name']}</td><td>{$item['email']}</td><td>{$confirmation}</td><td><input type='checkbox' name='remove[{$item['email']}]' /></td></tr>";
        }

        $content .= "</table>";
        $content .= "<input type='submit' value='Remove Checked'>";
        $content .= "</form>";

        return $content;
    }

    function SendConfirmationEmail($hostPage, $sendTo, $confirmation)
    {
        global $HOST;

        $base = "http://";
        $base .= $_SERVER['SERVER_NAME'];
        $base .= dirname($_SERVER['SCRIPT_NAME']);
        $base .= "/";
        $mail = new HtmlMailer("{$hostPage->title} <newsletter@{$HOST}>",
                "{$sendTo}",
                "{$hostPage->title} email list subscription");
        $mail->set_plain("Dear $name,\n\n".
                "Thank you for subscribing!\n".
                "In order to make sure we have correct contact information for you, our\n".
                "server has sent you this confirmation email. For your\n".
                "privacy your information will only be used for purposes of this list.\n\n".
                "Your confirmation number is $confirmation\n\n".
                "To complete your registration, please visit\n".
                "{$base}index.php/page/view/".$hostPage->id.
                "\n and choose \"confirm here\". When prompted, type in your email\n".
                "address ($sendTo) and the confirmation number given above.\n".
                "To reduce the risk of typing errors, you may find it easier to copy\n".
                "and paste this number instead of typing it over. Alternately, if your\n".
                "email client supports it, you may be able to click the following link:\n".
                "<{$base}index.php/page/view/{$hostPage->id}?email=".
                urlencode($sendTo)."&confirmation=".
                $confirmation.">\n\n".
                "Your time and interest are appreciated. Please note: Your subscription\n".
                "cannot be completed until you finish this step. Do not reply to this\n".
                "email directly. If you believe this email was sent in error, please email \n".
                "trouble@creolewest.com.\n\n");

        $mail->set_html("Dear $name,<br><br>".
                "Thank you for subscribing!<br><br>".
                "In order to make sure we have correct contact information for you, our\n".
                "server has sent you this confirmation email. For your\n".
                "privacy your information will only be used for purposes of this list.<br><br>\n".
                "Your confirmation number is <b>$confirmation</b><br><br>\n".
                "To complete your registration, please visit the \n".
                "<a href='{$base}index.php/page/view/{$hostPage->id}?email=".
                urlencode($sendTo)."&confirmation=".
                $confirmation."'>confirmation page</a>.<br><br>".
                "If you do not see a page congratulating you, you will need to visit ".
                "<a href='{$base}index.php/page/view/{$hostPage->id}'>{$base}index.php/page/view/{$hostPage->id}</a>".
                " and choose \"confirm here\". ".
                "When prompted, type in your email address ($sendTo) and the\n".
                "confirmation number given above. To reduce the risk of typing errors,\n".
                "you may find it easier to copy and paste this number instead of typing\n".
                "it over. <br><br>\n\n".
                "Your time and interest are appreciated. Please note: Your subscription\n".
                "cannot be completed until you finish this step. Do not reply to this\n".
                "email directly. If you believe this email was sent in error, please email \n".
                "trouble@creolewest.com.<br><br>");

        global $html_mailer_debug;
        $mail->send();
    }


}
?>
