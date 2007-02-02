<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

class MySmarty extends Smarty {

    function MySmarty() {
        global $template_dir;
        parent::Smarty();
        $this->force_compile = true; /// XXX: Turn me off for production!
        //$this->debugging = true;
        $this->plugins_dir = array('smartyplugins','plugins');
        $this->default_resource_type = 'pfile';
        $this->template_path = array($template_dir, "templates");
        $this->compile_dir = "templates/compiled";

        $dir = dirname($_SERVER['SCRIPT_NAME']);
        
	$permission = array( 0 => "Admin",
			     1 => "Editor",
			     2 => "Users",
			     3 => "Anyone");
	
        $this->assign("base", base());
        $this->assign("request", $_REQUEST);
        $this->assign("toppages", Page::get_toppages());
        $this->assign("permission", $permission);
        $this->assign("user", User::ensure());
    }
}
?>
