<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

class MySmarty extends Smarty {

    function MySmarty() {
        global $template_dir, $smartyvars;
        parent::Smarty();
        $this->force_compile = true; /// XXX: Turn me off for production!
        //$this->debugging = true;
        $this->plugins_dir = array('smartyplugins','plugins');
        $this->default_resource_type = 'pfile';
        $this->template_path = array($template_dir, $smartyvars['smartytemplatepath']);
        $this->compile_dir = $smartyvars['smartycompiledtemplatepath'];

        $dir = dirname($_SERVER['SCRIPT_NAME']);
        
	$permission = array( 0 => "Admin",
			     1 => "Editor",
			     2 => "Users",
			     3 => "Anyone");
	
        $this->assign("base", base());
        $this->assign("pumabase", base(true));
        $this->assign("request", $_REQUEST);
        $this->assign("toppages", Page::get_toppages());
        $this->assign("permission", $permission);
        $this->assign("user", User::ensure());
    }
}
?>
