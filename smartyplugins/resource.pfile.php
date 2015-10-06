<?php

function smarty_resource_pfile_source($filename, &$content, &$smarty) {
    foreach ($smarty->template_path as $path) {
        if (file_exists("$path/$filename")) {
            $content = file_get_contents("$path/$filename");
            return true;
        }
    }
    return false;
} 
function smarty_resource_pfile_timestamp($filename, &$timestamp, &$smarty) {
    foreach ($smarty->template_path as $path) {
        if (file_exists("$path/$filename")) {
            $timestamp = filemtime("$path/$filename");
            return true;
        }
    }
    return false;
}
function smarty_resource_pfile_secure() {
}
function smarty_resource_pfile_trusted() {
}
