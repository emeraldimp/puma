<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 
# Design inspired by the work of Scotty Allen 

/* $Id$ */

class Dispatcher {
  var $controllers; // Maps regexes to callback objects.

  function autoload_names($directory = "controller") {
    $names = array();
    foreach (glob("$directory/*Controller.inc", GLOB_NOSORT) as $file) {
      $matches = array();
      assert(preg_match('?^'.quotemeta($directory)."\/(.*)Controller.inc?",
                        $file, $matches));
      $names[$file] = $matches[1];
    }
    return $names;
  }

  function autoload($directory = "controller") {
    /* Loads all the controllers from $directory, installing handlers
     as it goes. */
    foreach($this->autoload_names($directory) as $file => $name) {
      require_once $file;
      $class = $name."controller";
      if (!class_exists($class)) {
        $this->error("$file didn't provide $class!");
      }
      $this->autoload_class($class, $name);
    }
  }
  
  function autoload_class($class, $name) {
    $class_vars = get_class_vars($class);
    $map = False;
    if (!isset($class_vars['controller_map'])) {
      $this->warn("$class doesn't have a 'controller_map' property. ".
                  "Your methods may not be mapped to URLs properly.");
    } else {
      $map = $class_vars['controller_map'];
    }
    foreach (get_class_methods($class) as $method) {
      /* Method rules: if it starts with _, don't include it. If it
       maps to False, don't include it. If it isn't in the map, then
       map it to the default $name/$method uri, otherwise, map it
       to the mapped value. */
      if ($method[0] == '_') continue;
      if ($map && isset($map[$method])) {
        if (!$map[$method]) continue;
        $this->register(strtolower("/$name/".$map[$method]), 
                        array($class, $method));
        continue;
      }
      $this->register(strtolower("/$name/$method"), array($class, $method));
    }
  }
  
  function warn($message) {
    trigger_error("dispatcher warning: $message", E_USER_WARNING);
  }

  function error($message) {
    trigger_error("dispatcher error: $message", E_USER_ERROR);
  }

  function register($regex, $callback) {
    /* Register a callback with the controller list. $callback is any
     PHP callback type: array("ClassName", "MethodName"),
     array($object, "MethodName"), or "FunctionName". */
    $this->controllers[$regex] = $callback;
  }

  function url_to($relpath) {
    /* Return the absolute url path to $relpath */
    return $_SERVER['SCRIPT_NAME'] . $relpath;
  }

  function fq_url_to($relpath, $transport = "http") {
    /* Return a fully-qualified URI */
    return $transport."://".$_SERVER['HTTP_HOST'].$this->url_to($relpath); 
  }

  function redirect($pathinfo, $transport="http") {
    /* Redirect the browser to the controller at $pathinfo */
    header("Location: ".$this->fq_url_to($pathinfo, $transport));
    die();
  }

  function dispatch($pathinfo) {
    /* Dispatch the request in $pathinfo */
    foreach($this->controllers as $regex => $handler) {
      $matches = array();
      $quoted_regex = "/^".addcslashes($regex, '/')."$/"; 
      if (preg_match($quoted_regex,
                     $pathinfo, &$matches)) {
        array_shift($matches);
        array_unshift($matches, $this);
        call_user_func_array($handler, $matches);
        return;
      }
    }
    
    if (preg_match("/^\/?$/",$pathinfo)) {
    	$handler = array('Pagecontroller', 'view');
	$matches = array($this, '1');
        call_user_func_array($handler, $matches);
	return;
    } else {
	global $smarty;
      	header("HTTP/1.1 404 Not Found");
	$smarty->assign("template","page.error404");
	return;
    }
    //$this->error("No dispatcher matches $pathinfo");
  }
}
