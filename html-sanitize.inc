<?php
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information 
  // $Id$

/** Allows only the tags in $tags to survive into $source. Checks for
 proper nesting*/
class Tag {
  function Tag($name, $closing, $attributes) {
    $this->_name = $name;
    $this->_closing = $closing;
    $this->_attributes = $attributes;
  }
  function name() { return $this->_name; }
  function closing() { return $this->_closing; }
  function attributes() { return $this->_attributes; }
  }
$common_attrs = array("id", "class", "title", "lang",
                      "dir");
$tags = array("address" => new Tag("address", True, $common_attrs),
              "blockquote" => new Tag("blockquote", True, 
                                      array_merge($common_attrs, array("cite"))),
              "del" => new Tag("del", True,
                               array_merge($common_attrs, array("cite", "datetime"))),
              "ins" => new Tag("ins", True,
                               array_merge($common_attrs, array("cite", "datetime"))),
              "div" => new Tag("div", True, $common_attrs),
              "h1" => new Tag("h1", True, $common_attrs),
              "h2" => new Tag("h2", True, $common_attrs),
              "h3" => new Tag("h3", True, $common_attrs),
              "h4" => new Tag("h4", True, $common_attrs),
              "h5" => new Tag("h5", True, $common_attrs),
              "h6" => new Tag("h6", True, $common_attrs),
              "hr" => new Tag("hr", True, $common_attrs),
              "p" => new Tag("p", False, $common_attrs),
              "pre" => new Tag("pre", True, $common_attrs),
              "dl" => new Tag("dl", True, $common_attrs),
              "dt" => new Tag("dt", True, $common_attrs),
              "dd" => new Tag("dd", True, $common_attrs),
              "li" => new Tag("li", True, $common_attrs),
              "ol" => new Tag("ol", True, $common_attrs),
              "ul" => new Tag("ul", True, $common_attrs),
              "table" => new Tag("table", True, 
                                 array_merge($common_attrs,
                                             array("summary", "width", "border",
                                                   "frame", "rules", "cellspacing",
                                                   "cellpadding"))),
              "caption" => new Tag("caption", True, $common_attrs),
              "thead" => new Tag("thead", True, $common_attrs),
              "tfoot" => new Tag("tfoot", True, $common_attrs),
              "tbody" => new Tag("tbody", True, $common_attrs),
              "tr" => new Tag("tr", True, array_merge($common_attrs, array("align", "char",
                                                                           "charoff", "valign"))),
              "td" => new Tag("td", True, array_merge($common_attrs, array("rowspan",
                                                                           "colspan", "headers", "abbr",
                                                                           "scope", "axis", "align",
                                                                           "char", "charoff", "valign"))),
              "th" => new Tag("th", True, array_merge($common_attrs, array("rowspan",
                                                                           "colspan", "headers", "abbr",
                                                                           "scope", "axis", "align",
                                                                           "char", "charoff", "valign"))),
              "a" => new Tag("a", True, array_merge($common_attrs, array("href", "name",
                                                                         "rel", "rev", "type", "hreflang",
                                                                         "charset", "accesskey", "tabindex",
                                                                         "shape", "coords"))),
              "bdo" => new Tag("bdo", True, array_merge($common_attrs, array("dir", "lang"))),
              "br" => new Tag("br", False, $common_attrs),
              "img" => new Tag("img", False, array_merge($common_attrs, array("src", "alt",
                                                                              "longdesc", "width", "height",
                                                                              "usemap", "ismap", "align",
                                                                              "border", "hspace", "vspace"))),
              "map" => new Tag("map", True, array_merge($common_attrs, array("name"))),
              "area" => new Tag("area", False, array_merge($common_attrs, array("shape",
                                                                                "coords", "href", "nohref",
                                                                                "alt", "tabindex"))),
              "q" => new Tag("q", True, array_merge($common_attrs, array("cite"))),
              "span" => new Tag("span", True, $common_attrs),
              "sub" => new Tag("sub", True, $common_attrs),
              "sup" => new Tag("sup", True, $common_attrs),
              "abbr" => new Tag("abbr", True, $common_attrs),
              "acronym" => new Tag("acronym", True, $common_attrs),
              "cite" => new Tag("cite", True, $common_attrs),
              "code" => new Tag("code", True, $common_attrs),
              "dfn" => new Tag("dfn", True, $common_attrs),
              "em" => new Tag("em", True, $common_attrs),
              "kbd" => new Tag("kbd", True, $common_attrs),
              "samp" => new Tag("samp", True, $common_attrs),
              "strong" => new Tag("strong", True, $common_attrs),
              "var" => new Tag("var", True, $common_attrs),
              "b" => new Tag("b", True, $common_attrs),
              "big" => new Tag("big", True, $common_attrs),
              "i" => new Tag("i", True, $common_attrs),
              "s" => new Tag("s", True, $common_attrs),
              "small" => new Tag("small", True, $common_attrs),
              "strike" => new Tag("strike", True, $common_attrs),
              "tt" => new Tag("tt", True, $common_attrs),
              "u" => new Tag("u", True, $common_attrs));

function process_tag ($matches) {
  $rt = "";
  global $tags;
  static $stack = array();
  // this allows us to close all opened tags on exit.
  if ($matches == Null) {
    //echo "Stack contents at end-of-replace:<pre>";
    //print_r($stack);
    //echo "</pre>";
    if (count($stack) > 0) {
      $rt = "</".implode("></", $stack).">";
    }
    $stack = array();
    return $rt;
  } 
  
  $closingp = @$matches[1] == '/';
  $name = strtolower($matches[2]);
  if (isset($matches[3]) && $matches[3] != "") $rest = $matches[3];
  else $rest = "";
  
  //echo "processing form ".htmlspecialchars($matches[0])."<br>";
  
  // Step 1. Is this tag allowed?
  if (!isset($tags[$name])) {
    //echo "$name is not an allowed tag!<br>";
    return "";
  }
  // TODO: Step 2. Analyze attributes.
  // Step 3. Is this an opening tag? If so should we, push it on the stack?
  if (!$closingp) {
    if ($tags[$name]->closing()) {
      //echo "stick $name on the stack<br>";
      array_unshift($stack, $name);
      return "<$name$rest>";
    } else {
      //echo "$name doesn't require closing, not sticking on stack<br>";
      return "<$name$rest />";
    }
  }
  // Step 4. Strip if not a valid closing tag.
  if (!$tags[$name]->closing()) {
    //echo "$name shouldn't have a closing tag!</br>";
    return "";
  }
  // Step 5. Check for successful nesting.
  if ($name == $stack[0]) {
    //echo "Successful nesting!<br>";
    array_shift($stack);
    return "</$name>";
  }
  // Step 6. XXX: Deal with bad nesting. For now, decide between A
  // and B by looking backward through the stack for a matching open
  // tag.
  if (!in_array($name, $stack)) {
    //echo "$name closed but never opened, stripping<br>";
    return "";
  }
  //echo "Diagnosed an accidentally unclosed tag somewhere above<br>";
  while (($close = array_shift($stack)) != $name) {
    //echo "closing $close<br>";
    $rt .= "</$close>";
  }
  return $rt."</$close>";
  // XXX: This is a tough thing to do,
  // since the author's intent isn't clear to begin with. There are
  // two options: a) look back on the stack for an opening $name. If
  // it exists, close all the intervening tags, otherwise strip the
  // closing tag. You could call this the fix for a forgotten
  // closing tag. b) Strip the closing tag and hope things work out.
  // You could call this the fix for a prematurely or doubly closed
  // tag.
  // It's not obvious which of these is the best approach to take. I
  // suspect the real solution is not to use regular expressions and
  // a stack and a fixed remedy, but to choose whichever solution
  // minimizes the number of remedies necessary to get the nesting
  // right.
  // It might be possible, if one could look into the future, to
  // determine ahead of time which choice is best, but I suspect
  // this is not the case. In order to ship this as fast as
  // possible, I suggest choosing solution a) out-of-the-box for
  // now, and implementing something stronger and smarter in a later
  // version. The new version should be able to correct non-W3C
  // nesting, using a min-edits measure of cost.
}

function html_sanitize($source) {
  $source = preg_replace(",(<p */>|<br */>)*$,", "", $source);
  $source = preg_replace_callback(",<(/)?(\w+)([^>]*?)/?>,", 
                                  "process_tag", $source);
  $source .= process_tag(Null);
  $source = preg_replace(",(<br */>)+,", "<p />", $source);
  $source = preg_replace(",<p */>(<br */>)*,", "<p />", $source);
  $source = preg_replace("&(<p */>){2,}&", "<p />", $source);
  $source = preg_replace("/\&nbsp;/", " ", $source);
  return $source;
}

?>
