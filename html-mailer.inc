<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* HTML Mailer

   $Id$ 

   For sending email with both plaintext and HTML parts. */

$html_mailer_debug = false;

class HtmlMailer {
  var $to, $subject, $headers, $html, $plain;
  var $mime;
  function HtmlMailer($from, $to, $subject) {
    $this->to = $to;
    $this->headers = "";
    $this->subject = $subject;
    $this->mime = "mimesep".time().rand();
    $this->html = NULL;
    $this->plain = NULL;
    $this->add_header("From: $from");
    $this->add_header("User-Agent: PHP HtmlMailer");
    $this->add_header("MIME-Version: 1.0");
    $this->add_header("Content-Type: multipart/alternative;\n\tboundary=\"$this->mime\"");
  }

  /* For HTML, this wrapper provides doctype, head, body for you, so
  don't write these yourself. Be aware that no line should be longer
  than 80 characters, especially for the PLAIN section. */
  function set_html($html) { $this->html = $html; }
  function set_plain ($plain) { $this->plain = $plain; }    

  function add_header($header) {
    //$this->headers .= $header . "\r\n";
    $this->headers .= $header . "\n";
  }

  function send() {
    /*if (is_null($this->html) || is_null($this->plain)) {
      error("You tried to send HTML mail without setting PLAIN or HTML!", E_USER_ERROR);
    }*/
    $message = "This is a multi-part message in MIME format.\r\n".
      "--$this->mime\r\n".
      "Content-Type: text/plain; charset=us-ascii\r\n".
      "Content-Transfer-Encoding: 7bit\r\n".
      "\n".
      $this->plain.
      "\r\n".
      "--$this->mime\r\n".
      "Content-Type: text/html; charset=us-ascii\r\n".
      "Content-Transfer-Encoding: 7bit\r\n".
      "\n".
      "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n".
      "<html>\n".
      "<head>\n".
      "<meta content=\"text/html;charset=ISO-8859-1\" http-equiv=\"Content-Type\">\n".
      "<meta content=\"noindex, nofollow\" name=\"robots\">\n".
      "<title></title>\n".
      "</head>\n".
      "<body bgcolor=\"#ffffff\" text=\"#000000\">\n".
      $this->html.
      "</body>\n".
      "</html>\n\n".
      "--$this->mime--\r\n";
    if (!mail($this->to, $this->subject, $message, $this->headers)) {
      user_error("Mail sending failed", E_USER_WARNING);
    }
    global $html_mailer_debug;
    if ($html_mailer_debug) {
      echo "<pre>HTML Mail";
      echo "To: " . htmlspecialchars($this->to). "\n";
      echo "Subject: " . htmlspecialchars($this->subject). "\n";
      echo htmlspecialchars($this->headers);
      echo htmlspecialchars($message);
      echo "</pre>";
    }
  }
}

?>
