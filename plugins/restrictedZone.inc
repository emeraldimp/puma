<?php
function plugin_restrictedZone($args, $page, $user) 
{
    return $page->getChildren($user->permission);
}
?>
