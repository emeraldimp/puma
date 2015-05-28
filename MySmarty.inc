<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 

/* $Id$ */

class MySmarty extends Smarty {

    function __construct() {
        global $template_dir, $smartyvars;
        parent::__construct();
        $dir = dirname(__FILE__);
        $this->force_compile = true; /// XXX: Turn me off for production!
        //$this->debugging = true;
        $this->addPluginsDir($dir . '/plugins');
        $this->addPluginsDir($dir . '/smartyplugins');
        $this->default_resource_type = 'file';
        $this->template_dir = array($template_dir, $smartyvars['smartytemplatepath']);
        $this->compile_dir = $smartyvars['smartycompiledtemplatepath'];
        
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
