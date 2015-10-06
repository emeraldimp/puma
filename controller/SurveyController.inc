<?php
# Copyright 2002--2015 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

class SurveyController {
    var $controller_map = array(
                            'submit_survey' => 'submit.*',
                            'survey_complete' => 'complete.*',
                            'Survey' => 'survey.*');

  function default_action($dispatcher) {
      self::Survey($dispatcher);
  }

  function Survey($dispatcher) {
      global $smarty;

      $user = User::ensure();

      $smarty->assign("user", $user);
      $smarty->assign("posturl", 'survey/submit');
      $smarty->assign("template", "survey");
  }

  function submit_survey($dispatcher) {
      global $smarty, $HOST, $SURVEY_EMAIL;
      include_once("html-mailer.inc");

      $user = User::ensure();

      $survey = new Survey();
      $survey->userid = $user->id;
      $survey->surveyDate = date("Y-m-d h:m:s");
      $survey->surveyResult = json_encode($_POST);
      $survey->insert();

      $plaintext = $smarty->fetch('survey.email.txt');
      $html = $smarty->fetch('survey.email.html');

      $mail = new HtmlMailer("Survey for {$HOST} <survey@{$HOST}>", "{$SURVEY_EMAIL}", "Survey submission from {$HOST}");
      $mail->set_plain($plaintext);
      $mail->set_html($html);

      global $html_mailer_debug;
      $mail->send();

      $dispatcher->redirect('/survey/complete');
      return;
  }

  function survey_complete($dispatcher) {
      global $smarty;
 
      $user = User::ensure();

      $smarty->assign("user", $user);
      $smarty->assign("template", "survey.complete");
  }
}

?>
