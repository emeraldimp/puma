<?
# Copyright 2002--2012 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

class SurveyController {
    var $controller_map = array('Survey' => 'survey.*');

  function default_action(&$dispatcher) {
      self::Survey($dispatcher);
  }

  function Survey(&$dispatcher) {
      global $smarty;

      $user = User::ensure();

      $smarty->assign("user", $user);
      $smarty->assign("post", '');
      $smarty->assign("template", "survey");
  }
}

?>
