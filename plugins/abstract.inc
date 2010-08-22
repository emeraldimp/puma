<?php
function plugin_abstract($args, $page, $user) 
{
    $version = Version::staticGet($page->current_version);

    return $version->content;
}
?>
