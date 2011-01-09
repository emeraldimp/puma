<?php
# Copyright 2002--2010 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

include_once("html-mailer.inc");

function plugin_emailform($args, &$page, &$user) {

    $email_token = $_REQUEST['email_token'];

    if (isset($email_token) && $email_token == $_SESSION['email_form_token'])
    {
        return EmailForm::SendEmail($page);
    }
    else
    {
        if (isset($email_token))
        {
            addmessage("Sorry, there was an error. Please try again.");
        }

        return EmailForm::RenderForm();
    }
}

function plugin_emailform_admin($args, &$page, &$user) {

    $admin_token = $_REQUEST['admin_token'];

    if (isset($admin_token) && $admin_token == $_SESSION['admin_form_token'])
    {
        return EmailForm::UpdateAdmin($page);
    }
    else
    {
        if (isset($admin_token))
        {
            addmessage("Sorry, there was an error. Please try again.");
        }

        return EmailForm::RenderAdminForm();
    }
}

class EmailForm
{
    public static function RenderForm()
    {
        $emailtoken = uniqid();

        $_SESSION['email_form_token'] = $emailtoken;

        $content = '';

        $content .= "<form action='#post' method='post'>";
        $content .= "<input type='hidden' name='email_token' value='{$emailtoken}' >";
        $content .= "<p><label for='name'>Name:</label><input type='text' name='name'></p>";
        $content .= "<p><label for='email'>Email Address:</label><input type='text' name='email'></p>";
        $content .= "<p>Comment:</p>";
        $content .= "<p><textarea name='comment' cols='80' rows='10'></textarea></p>";
        $content .= "<input type='submit' value='Submit'>";

        return $content;
    }

    public static function SendEmail($page)
    {
        global $HOST;

        $email = $_REQUEST['email'];
        $name = $_REQUEST['name'];
        $comment = $_REQUEST['comment'];

        if (!validemail($email))
        {
            addmessage("Your email address does not appear to be valid");
            return self::RenderForm();
        }

        $hostPage = Page::staticGet($page->parent);

        $version = Version::staticGet($page->current_version);
        $sendTo = $version->content;

        $pageEmailAddress = strtolower(preg_replace('/\s/','', $hostPage->title)) . '@' .$HOST;

        $base = "http://";
        $base .= $_SERVER['SERVER_NAME'];
        $base .= dirname($_SERVER['SCRIPT_NAME']);
        $base .= "/";
        $mail = new HtmlMailer("{$hostPage->title} <{$pageEmailAddress}>",
                "{$sendTo}",
                "{$hostPage->title} email form submission");
        $mail->set_plain("Received the following from a form submission on {$HOST} {$page->title}:\n\n".
                "Name: {$name}\n".
                "Email: {$email}\n".
                "Comment: {$comment}\n");
        $mail->set_html("Received the following from a form submission on {$HOST} {$page->title}:<br>".
                "Name: {$name}<br>".
                "Email: {$email}<br>".
                "Comment: {$comment}<br>");

        global $html_mailer_debug;
        $mail->send();

        unset($_SESSION['email_form_token']);
        addmessage("Message was sent!");

        return '';
    }


}
?>
