<?
# Copyright 2002--2006 Creole West Productions
# This file is released under the GPL. See License for full licensing information

/* $Id$

Online reservation system. Modeled after forum.inc */

include_once("vfile.inc");
include_once("html-mailer.inc");

/* TODO: 

   - Escape from reservation process at any time

   - Administrative interface:
     - Remove reservations
     - Confirm a reservation by hand
     - Re-send confirmation email
     - Add a reservation by hand.

   x Wire up reservations to database. 

   x Information validation 
      x (only numbers in phone number, 
      x email matches email regex, 
      x email doesn't already exist
      x name filled out, 
      x address entered, 
      - use ZIP code validator? 

   - Make "other" box only appear when "other" checked and only when scripting
   enabled.

   - Use javascript to do validation at browse time. 

   x Wire up machinery to print errors in meaningful places and NOT LOSE STATE.

   - Use javascript to add more guests, or use the serverside to add
   them for non-scripted clients. 

   x Send confirmation email.

   x Confirmation machinery. 

   x Realign essential fields to look more beautiful. 

   - Site-specific css: make it look less "square".

   x Serialization. 

   x Add "comment/special instructions" field. 

   - Show who has signed up so far. */

/* Here's a snippet of ereserve configuration:

Expansion variables:
%e --- event name
%n --- user's full name
%c --- confirmation number
%l --- confirmation URL
%w --- event registration URL

On each reservation, reservations must take email address, full name,
mailing address (street, apt/suite, city, state, zip), phone number
(area code and number), and comment. These will always appear first.
The administrator will have to fill out the following: settings::name
settings::state, settings/confirmation, settings/questions,
settings/instructions. */

class Answer {
  var $id;
  function Answer($id) {
    $this->id = $id;
  }
}

class Answer_check extends Answer {
  var $option;
  function add_option($attrs) {
    if (!isset($this->option))
      $this->option = array();
    array_unshift($this->option, 
                  array('oid' => $attrs['oid'],
                        'value' => isset($attrs['value']) ? $attrs['value'] : "unset"));
  }

  function serialize() {
    $rt = "        <acheck qid=\"$this->id\">\n";
    if (isset($this->option))
      foreach (@$this->option as $oid => $value) {
        $rt .= "          <aoption oid=\"$oid\" value=\"$value\" />\n";
      }
    $rt .= "        </acheck>\n";
    return $rt;
  }
}

class Answer_textbox extends Answer {
  var $value;
  function Answer_textbox($name, $value) {
    $this->Answer($name);
    $this->value = $value;
  }

  function serialize() {
    return "        <atextbox qid=\"$this->id\" value=\"$this->value\" />\n";
  }
}

class Question {
  var $id, $name, $instructions;
  function Question($id, $name, $instructions) {
    $this->id = $id;
    $this->name = $name;
    $this->instructions = $instructions;
  }
  function get_id() { return $this->id; }
  function render($answer) {
    trigger_error("Call to a virtual function", E_USER_ERROR);
  }
};

class Question_check extends Question {
  var $option;
  function add_option($oid, &$name, $type) {
    $this->option[] = array("oid" => $oid, 
                            "name" => $name, 
                            "type" => $type);
  }
  
  function serialize() {
    $rt = "";
    $rt .= "      <check id=\"$this->id\" cid=\"".count($this->option)."\"".
      " name=\"$this->name\" instructions=\"$this->instructions\">\n";
    foreach ($this->option as $oid => $option) {
      if ($option['type'] != "blank")
        $rt .= "        <option id=\"$oid\" name=\"$option[name]\" />\n";
      else
        $rt .= "        <option id=\"$oid\" name=\"$option[name]\" type=\"blank\" />\n";
    }
    $rt .= "      </check>\n";
    return $rt;
  }
  
  function make_answer($value) {
    $rt = new Answer_check($this->id);
    foreach($this->option as $option) {
      if (isset($value[$option['oid']]))
        $rt->option[$option['oid']] = $option['type'] == "blank" ? $value[$option['oid']."_blank"] : true;
    }
    return $rt;
  }

  function render_view($answer) {
    $rt = "";
    foreach ($this->option as $id => $option) {
      if (isset($answer->option[$id])) {
        if ($option['type'] == "blank")
          $rt .= "Other (". $answer->option[$id] . "), ";
        else
          $rt .= $option['name']. ", ";
      }
    }
    return $rt;
  }

  function render($answer) {
    $rt = "<tr>".
      "<td colspan=2><b>$this->name</b></td>".
      "</tr><tr><td>&nbsp;</td>".
      "<td>\n";
    $id = $this->id;
    if ($this->instructions)
      $rt .= "<i>".$this->instructions . "</i><br>";
    foreach ($this->option as $option) {
      $name = $option['name'];
      $oid = $option['oid'];
      $rt .= "<label><input id=res_q_{$id}_$oid ".
        "type=checkbox ".
        "name='res_value[q][$id][$oid]'".
        (isset($answer->option[$oid]) ? " checked=true":"").
        "> $name</label>\n";
      if ($option['type'] == "blank")
        $rt .= " <input id=res_q_{$id}_{$oid}_blank name='res_value[q][$id][{$oid}_blank]'".
          (isset($answer->option[$oid]) ? " value=\"".$answer->option[$oid]."\"" : "").
          ">";
      $rt .= "<br>";
    }
    $rt .= "</td></tr>\n";
    return $rt;
  }

  function render_list_edit() {
    $rt = "";
    $id = $this->id;
    foreach ($this->option as $option) {
      $name = $option['name'];
      $oid = $option['oid'];
      $rt .= "<label><input id='res_q_{$id}_$oid' type='checkbox' ";
      $rt .= "name='res_value[q][$id][$oid]'";
      if (isset($answer))
        $rt .= (isset($answer->option[$oid]) ? " checked='true'":"");
      $rt .= "> $name</label>\n";
      if ($option['type'] == "blank") {
        $rt .= " <input id='res_q_{$id}_{$oid}_blank' name='res_value[q][$id][{$oid}_blank]'";
	if (isset($answer)) 
          (isset($answer->option[$oid]) ? " value=\"".$answer->option[$oid]."\"" : "");
	$rt .= ">";
      }
      $rt .= "<br />";
    }
    return $rt;
  }
};

class Question_textbox extends Question {
  function render($answer) {
    $rt = "<tr><td colspan=2><b><label for=res_q_$this->id>$this->name</label></b></td></tr>\n".
      "<tr><td>&nbsp;</td>\n".
      "<td><p><i>$this->instructions</i></p><textarea cols=40 rows=5 id=res_q_$this->id ".
      "name='res_value[q][$this->id]' class=fullwidth>$answer->value</textarea></td></tr>\n";
    return $rt;
  }
  function render_list_edit() {
    return "<textarea name='res_value[q][$this->id]' class=fullwidth></textarea>";
  }
  function render_view($answer) {
    return htmlspecialchars($answer->value);
  }
  function serialize () {
    $rt = "      <textbox id=\"$this->id\" name=\"$this->name\" ".
      ($this->instructions != "" ? "instructions=\"$this->instructions\" " : " ").
      "/>\n";
    return $rt;
  }
  function make_answer($answer) {
    $rt = new Answer_textbox($this->id, $answer);
    return $rt;
  }
};

class Reservation {
  var $fullname;
  var $email;
  var $phone;
  var $zip;
  var $city, $state, $street;
  var $quantity;
  var $comment;
  var $guests;
  var $answers;
  var $questions;
  var $errors;
  var $current_answer;

  function Reservation() {
    $this->set_comment("");
    $this->questions = array();
    $this->answers = array();
    $this->set_fullname("");
    $this->set_email("");
    $this->set_phone("..");
    $this->set_street("");
    $this->set_city("");
    $this->set_state("");
    $this->set_zip("");
    $this->guests = array();
    $this->errors = array();
  }
  function set_fullname($val) { $this->fullname = $val; }
  function set_comment($val) { $this->comment = $val; }
  function get_comment() { return $this->comment; }
  function set_phone($val) { $this->phone = $val; }
  function set_email($val) { $this->email = $val; }
  function set_confirmation ($val) { $this->confirmation = $val; }
  function set_confirmed ($val) { $this->confirmed = $val; }
  function set_street($val) { $this->street = $val; }
  function set_city($val) { $this->city = $val; }
  function set_state($val) { $this->state = $val; }
  function set_zip($val) { $this->zip = $val; }
  function add_guest($name) {
    $this->guests[] = $name;
  }
  function add_answer($id, &$answer) {
    $this->answers[$id] = $answer;
    $this->current_answer = $id;
  }
  function add_option($oid, $value) {
    $this->answers[$this->current_answer]->option[$oid] = $value;
  }
  function add_question($question) {
    array_unshift($this->questions, $question);
  }
  function set_questions(&$questions) { $this->questions = $questions; }

  // Return TRUE if the Reservation is loaded with good values. Return
  // false if there are errors.
  function validate() {
    $this->errors = array();
    if ($this->fullname == "")
      $this->errors['fullname'] = "You must enter a name";
    if ($this->email == "")
      $this->errors['email'] = "You must enter an email address";
    if (!preg_match("/^[0-9]{3}\.[0-9]{3}\.[0-9]{4}$/", $this->phone))
      $this->errors['phone'] = "You must enter a valid phone number";
    if ($this->state == "State" || $this->state == "")
      $this->errors['state'] = "You must choose a state code";
    if (!preg_match("/^[0-9]{5}$/", $this->zip))
      $this->errors['zip'] = "You must enter a valid zip code";
    if ($this->street == "")
      $this->errors['street'] = "You must enter a valid street address";
    if ($this->city == "")
      $this->errors['city'] = "You must enter a valid city name";
    if (!preg_match("/^[0-9]+$/", $this->quantity))
      $this->errors['quantity'] = "You must enter a valid quantity";
    return !count($this->errors);
  }

  function get_error($item) {
    if (isset($this->errors[$item]))
      return "<span class=error>".$this->errors[$item]."</span><br>";
    return "";
  }

  function get_fullname() {
    return $this->fullname;
  }

  function get_email() {
    return $this->email;
  }

  function get_street() {
    return $this->street;
  }

  function get_city() { return $this->city; }
  
  function get_quantity() { return $this->quantity; }
  
  function set_quantity($value) { $this->quantity = $value; }

  function mk_input($field, $class = false) {
    $accessor = "get_$field";
    return "<input name='res_value[$field]' title='$field'".
      ($class ? " class=$class" : "").
      " value=\"".$this->$accessor()."\" />";
  }

  function serialize() {
    $rt = "    <reservation fullname=\"$this->fullname\" email=\"$this->email\" ".
      "confirmation=\"$this->confirmation\" confirmed=\"$this->confirmed\" phone=\"$this->phone\" ".
      "street=\"$this->street\" apartment=\"\" city=\"$this->city\" state=\"$this->state\" zip=\"$this->zip\" quantity=\"$this->quantity\" >";
    if ($this->comment != "")
      $rt .= "      <comment>$this->comment</comment>\n";
    foreach ($this->guests as $guest)
      $rt .= "      <guest fullname=\"$guest\" />\n";
    $rt .= "      <answers>\n";
    foreach ($this->answers as $qid => $answer) {
      $rt .= $answer->serialize();
    }
    $rt .= "      </answers>\n";
    $rt .= "    </reservation>\n";
    return $rt;
  }

  function _tool(&$page, $link, $title, $action, $values) {
    global $puma;
    $rt = "<a href='$page->parent";
    $rt .= "?res_action=$action";
    if (is_array($values))
      foreach ($values as $name => $value)
        $rt .= "&res_value[$name]=$value";
    else if (!is_null($values))
      $rt .= "&res_value=$values";
    $rt .="' title='$title'>$link</a>";
    return $rt;
  }

  function render_view(&$page) {
    $rt = "<tr>".
      "<td>".
      $this->_tool($page, "delete", "Delete this reservation", "delete", $this->email)." ".
      $this->_tool($page, "remail", "Remail confirmation letter", "remail", $this->email)." ".
      ($this->confirmed != "yes" ? 
       $this->_tool($page, "confirm", "Manually confirm this reservation", "admin_confirm", $this->email) : "").
      "</td>";
    $rt .= "<td valign='top' title='Contact'>".
      "<a href=\"mailto:$this->email\" title=\"$this->email\">$this->fullname</a><br>".
      "Ph. $this->phone<br>".
      "$this->street<br>".
      "$this->city, $this->state $this->zip".
      "</td>";
    if ($this->confirmed != "yes")
      $rt .= "<td title=\"Confirmed\"><font color=red>NO</font></td>";
    else
      $rt .= "<td title=\"Confirmed\"><font color=green>YES</font></td>";
    $rt .= "<td title=\"Quantity\">{$this->quantity}</td>";
    $rt .= "<td title=\"Comments/Special Instructions\">".htmlspecialchars($this->comment)."</td>";
    foreach ($this->questions as $id => $question)
      $rt .= "<td title=\"$question->name\">".$question->render_view(@$this->answers[$id])."</td>";
    return "</tr>".$rt;
  }

  function render_list_edit(&$page) {
    $rt = "<form action='$page->parent' method='post'>".
      "<tr>".
      "<td><input type='submit' value='add'></td>".
      "<td><div><input name='res_value[fullname]' value='full name' class='fullwidth'><br />".
      "<input name='res_value[email]' value='email address'><br>".
      "(<input name='res_value[phone_area]' value='999'   size=3 maxlength=3 style=\"!width:3em;\">) ".
      "<input name='res_value[phone_prefix]' value='999' size=3 maxlength=3> &ndash; ".
      "<input name='res_value[phone_last]' value='9999'  size=4 maxlength=4>".
      "<br>".
      "<input name='res_value[street]' value='Street'><br>".
      "<input name='res_value[city]' value='City'><br>".
      "<select name='res_value[state]'><br>".
      mk_states().
      "</select>".
      "<input name='res_value[zip]' value='Zipcode' length=5 maxlength=5></div></td>";
    $rt .= "<td>&mdash;</td>";
    $rt .= "<td><input name='res_value[quantity]' value='Quantity' length='3' maxlength='3'></div></td>";
    $rt .= "<td><textarea name='res_value[comment]'></textarea></td>";
    foreach ($this->questions as $question)
      $rt .= "<td>".$question->render_list_edit()."</td>";
    $rt .= "</tr>".
      "<input type='hidden' name='res_value[this_view]' value='list'>".
      "<input type='hidden' name='res_value[next_view]' value='list'>".
      "<input type='hidden' name='res_action' value='new_reservation'></form>";
    return $rt;
  }

  function render_edit() { 
    assert(preg_match('/([0-9]*)\.([0-9]*)\.([0-9]*)/', $this->phone, $phone));
    $star = "<font color=\"#FF0000\" size=\"+1\">*</font>";
    $rt = "<tr>\n".
      "<td>{$star}Full name</td>\n".
      "<td>".
      $this->get_error("fullname").
      $this->mk_input('fullname', 'fullwidth').
      "</td>\n".
      "</tr><tr>\n".
      "<td>{$star}Email</td>\n".
      "<td>".
      $this->get_error("email").
      $this->mk_input('email', 'fullwidth').
      "</td>\n".
      "</tr><tr>\n".
      "<td>{$star}Phone</td>\n".
      "<td>".
      $this->get_error("phone").
      "(<input name='res_value[phone_area]' value=\"$phone[1]\" title='Area code' size=3 maxlength=3>) ".
      "<input name='res_value[phone_prefix]' value=\"$phone[2]\" title='3-digit prefix' size=3 maxlength=3> &ndash; ".
      "<input name='res_value[phone_last]' value=\"$phone[3]\" title='4-digit suffix' size=4 maxlength=4>".
      "</td>\n".
      "</tr><tr>\n".
      "<td>{$star}Address</td>\n".
      "<td>".
      $this->get_error("street").
      $this->get_error("city").
      $this->get_error("state").
      $this->get_error("zip").
      $this->mk_input("street", 'fullwidth')."<br>\n".
      $this->mk_input("city", false, array("size" => 10))."&nbsp;".
      "<select name='res_value[state]'>".
      mk_states($this->state)."</select>".
      " <input name='res_value[zip]' title='zipcode' size=5 maxlength=5 value=\"$this->zip\">".
      "</td>\n".
      "</tr><tr>\n".
      "<td>{$star}Number Attending</td>\n".
      "<td>".
      $this->get_error("quantity").
      $this->mk_input('quantity', 'fullwidth').
      "</td>\n".
      "</tr><tr>\n".
      "<td colspan=2><b>Comment/Special instructions</b></td>\n".
      "</tr><tr><td>&nbsp;</td>\n".
      "<td><textarea rows=5 cols=40 name='res_value[comment]' class=fullwidth>".$this->get_comment()."</textarea></td></tr>\n";
    foreach ($this->questions as $question) {
      $rt .= $question->render(@$this->answers[$question->get_id()]);
    }
    return $rt;
  }
}

function mk_states($default = null) {
  $states = array("AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL",
                  "GA","GU","HI","ID","IL","IN","IA","KS","KY","LA",
                  "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV",
                  "NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
                  "PR","RI","SC","SD","TN","TX","UT","VT","VA","VI",
                  "WA","WV","WI","WY");
  $rt = "";
  if (!isset($default) || $default == "" || is_null($default))
    $rt .= "<option value=\"\" selected>State</option>";
  foreach ($states as $state) {
    if ($state != $default)
      $rt .= "<option value=\"$state\">$state</option>\n";
    else
      $rt .= "<option value=\"$state\" selected>$state</option>\n";
  }
  return $rt;
}

class Reservations {
  var $container; //enclosing VFILE if we want it for anything.
  var $name; // event name: settings::name
  var $state; // can new reservations be added: settings::state:
              // open|closed
  var $confirmation_subject;
  var $confirmation_source;
  var $confirmation;
  var $questions;
  var $reservations;

  var $unsaved_changes;
  var $view;
  var $current_reservation;

  var $xml_tag_stack;
  var $user;
  var $page;

  function Reservations(&$container) {
    $this->container = $container;

    /* Default settings */
    $this->name = "No name";
    $this->state = "closed";
    $this->confirmation_subject = "%e registration confirmation";
    $this->confirmation_source = "reservations@creolewest.com";
    $this->confirmation = "%e confirmation number: %c. Visit %w and type it, or click %l.";
    $this->questions = array();
    $this->reservations = array();

    $this->unsaved_changes = false;
    $this->view = "default";

    $this->xml_tag_stack = array();
  }

  function unsaved_changes() { return $this->unsaved_changes; }

  function serialize() { 
    $rt = "";
    $rt = "<reservations>\n";
    $rt .= "  <settings name=\"$this->name\" state=\"open\">\n";
    $rt .= "    <confirmation subject=\"$this->confirmation_subject\" source=\"$this->confirmation_source\">\n";
    $rt .= "      $this->confirmation\n";
    $rt .= "    </confirmation>\n";
    $rt .= "    <questions cid=\"".count($this->questions)."\">\n";
    ksort($this->questions);
    foreach ($this->questions as $question) {
      $rt .= $question->serialize();
    }
    $rt .= "    </questions>\n";
    $rt .= "  </settings>\n";
    $rt .= "  <reserved>\n";
    foreach ($this->reservations as $reservation) {
      $rt .= $reservation->serialize();
    }
    $rt .= "  </reserved>\n";
    $rt .= "</reservations>\n";
    return $rt;
  }

  function set_confirmation($val) { $this->confirmation = $val; }
  function add_confirmation($val) { $this->confirmation .= $val." "; }

  function _xml_start_element(&$p, &$name, &$attrs) {
    array_unshift($this->xml_tag_stack, $name);

    switch ($name) {
    case "settings":
      $this->name = $attrs['name'];
      $this->state = $attrs['state'];
      break;
    case "option":
      $this->questions[$this->current_question]->add_option($attrs['id'],
                                                            $attrs['name'],
                                                            isset($attrs['type']) ? $attrs['type'] : 'unset');
      break;
    case "check":
    case "textbox":
        $type = "Question_$name";
        $this->current_question = $attrs['id'];
        $this->questions[$attrs['id']] = new $type($attrs['id'], $attrs['name'], 
                                                   isset($attrs['instructions']) ? $attrs['instructions'] : "");
        break;
    case "aoption":
      $this->reservations[$this->current_reservation]->add_option($attrs['oid'], @$attrs['value']);
      break;
    case "acheck":
      $this->reservations[$this->current_reservation]->add_answer($attrs['qid'], new answer_check($attrs['qid']));
      break;
    case "atextbox":
      $this->reservations[$this->current_reservation]->add_answer($attrs['qid'], new answer_textbox($attrs['qid'],
                                                            $attrs['value']));
      break;
    case "reservation":
      $this->current_reservation = $attrs['email'];
      $this->reservations[$this->current_reservation] = new reservation();
      $this->reservations[$this->current_reservation]->set_fullname(trim($attrs['fullname']));
      $this->reservations[$this->current_reservation]->set_email(trim($attrs['email']));
      $this->reservations[$this->current_reservation]->set_confirmation(trim($attrs['confirmation']));
      $this->reservations[$this->current_reservation]->set_confirmed(trim($attrs['confirmed']));
      $this->reservations[$this->current_reservation]->set_phone(trim($attrs['phone']));
      $this->reservations[$this->current_reservation]->set_street(trim($attrs['street']));
      $this->reservations[$this->current_reservation]->set_city(trim($attrs['city']));
      $this->reservations[$this->current_reservation]->set_state(trim($attrs['state']));
      $this->reservations[$this->current_reservation]->set_zip(trim($attrs['zip']));
      $this->reservations[$this->current_reservation]->set_quantity(trim($attrs['quantity']));
      $this->reservations[$this->current_reservation]->set_questions($this->questions);
      break;
    case "guest":
      $this->reservations[$this->current_reservation]->add_guest($attrs['fullname']);
      break;
    case "confirmation":
      $accessor = "set_$name";
      $this->$accessor("");
      break;
    case "comment":
    case "reservations":
    case "questions":
    case "answers":
    case "reserved":
      break;
    default:
      echo ">> ";
      foreach($this->xml_tag_stack as $name)
        echo $name." ";
      echo "(";
      foreach ($attrs as $key => $val) {
        echo "$key => $val, ";
      }
      echo ")<br>";
      break;
    }
  }

  function _xml_end_element(&$p, &$name) {
    $lastname = array_shift($this->xml_tag_stack);
    assert($lastname == $name);
  }

  function _xml_cdata(&$p, $data) {
    $data = preg_replace('/(  +|\n)/m', ' ', $data);
    $data = trim($data);
    $tag = $this->xml_tag_stack[0];
    if ($data != '') {
      switch($tag) {
      case "comment":
        $this->reservations[$this->current_reservation]->comment .= $data." ";
        break;
      case "confirmation":
        $accessor = "add_$tag";
        $this->$accessor($data);
        break;
      default:
        echo "----> cdata: $data<br>";
      }
    }
  }

  function deserialize(&$xml) {
    $parser = xml_parser_create();
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_set_element_handler($parser, array(&$this, "_xml_start_element"),
                            array(&$this, "_xml_end_element"));
    xml_set_character_data_handler($parser, array(&$this, "_xml_cdata"));
    xml_parse($parser, $xml);
  }

  function render_default(&$page, $user) {
    $rt = "<div id='reservations_box'>\n".
      "<p>Thank you for your interest in our event. For your convenience use our private ".
      "registration service to enter your information. To protect your privacy, information provided ".
      " will only be used for purposes of this event.</p>\n".
      "<p>To begin your registration, click Next.</p>\n".
      "<p>If you have already registered and wish to confirm your reservation, ".
      "<a href='$page->parent?res_action=set_view&res_value=confirm'>click here</a>".
      ".</p>\n";
    if ($user->authorized(1, ""))
      $rt .= "<p>If you wish to see a list of those who have already reserved a spot at this event, ".
        "<a href='$page->parent?res_action=set_view&res_value=list'>click here</a>".
        ".</p>\n";
    if ($user->authorized(0, ""))
      $rt .= "<p>To delete all existing registrations, ".
        "<a href='$page->parent?res_action=delete_all'>click here</a>".
        ".</p>\n";
    $rt .=
      "<form action='".$page->parent."' method='post'>\n".
      "<input type='hidden' name='res_action' value='set_view'>\n".
      "<input type='hidden' name='res_value' value='new_reservation'>\n".
      "<input type='submit' value='Next &gt;&gt;' class='flushright'>".
      "</form>\n".
      "</div>\n".
      "</div>\n";
    return $rt;
  }

  function render_confirmed($page) {
    $rt = "<div id='reservations_box'>\n".
      "<p>Thank you for your reservation, ".$this->reservations[$this->current_reservation]->fullname.
      ". You have fully completed the reservation process.</p>".
      "</div>" .
      self::getAdditionalContentFromChild($page, "confirmed");


    return $rt;
  }

  function getAdditionalContentFromChild($page, $desiredTitle)
  {
    $children = $page->getChildren();
    foreach ($children as $child)
    {
        if ($child->title != $desiredTitle)
        {
            continue;
        }

        $version = Version::staticGet($child->current_version);

        $content = $version->content;

        $reservation = $this->reservations[$this->current_reservation];
        $quantityInput = "<input type='hidden' name='quantity' value='{$reservation->quantity}'>";

        $content = str_replace('{quantityInput}', $quantityInput, $content);

        return $content;
    }

    return "";
  }

  function render_confirm_new() {
    $rt = "<div id=reservations_box>\n".
      "<p>Thank you for your interest in our event. To complete your registration, ".
      "we need to make sure your email address is valid. A confirmation email has been sent to ".
      $this->reservations[$this->current_reservation]->email.
      " containing a confirmation number. You may close this window if you like or continue browsing ".
      "the rest of the site, the confirmation email will contain further instructions. ".
      "</p>";
    if (isset($this->errors['confirmation']))
      $rt .= "<span class=error>The reservation system encountered a problem with your reservation: ".
        $this->errors['confirmation'].
        " Please check your confirmation email again and make sure you entered your ".
        "confirmation number correctly.</span>";
    $rt .= "<form action=# method=post>".
      "<input type=hidden name='res_value[email]' value='".$this->reservations[$this->current_reservation]->email."'>".
      "<input type=hidden name='res_action' value='confirm'>".
      "<table>".
      "<tr>".
      "<td>Email</td>".
      "<td>".
      $this->reservations[$this->current_reservation]->email.
      "</td>".
      "</tr>".
      "<tr>".
      "<td>Confirmation</td>".
      "<td><input name='res_value[confirmation]'></td>".
      "</tr>".
      "</table>".
      "<p>This is the final step required for your registration. Your confirmation email ".
      "should arrive within the hour. If it does not, please email ".
      "<a href='mailto:trouble@creolewest.com'>trouble@creolewest.com</a> with your ".
      "registration details.</p>".
      "<input type=submit value='Next &gt;&gt;' class=flushright>".
      "</form>".
      "</div>";
    return $rt;
  }

  function render_confirm() {
    $rt = "<div id='reservations_box'>\n".
      "<p>Thank you for your interest in our event. To complete your registration, ".
      "we need to make sure your email address is valid. A confirmation email has been sent to ".
      "the address you provided with your registration. Please follow the instructions in the ".
      "confirmation email to complete your registration. ".
      "</p>";
    if (isset($this->errors['confirmation']))
      $rt .= "<span class='error'>The reservation system encountered a problem with your reservation: ".
        $this->errors['confirmation'].
        " Please check your confirmation email again and make sure you entered your ".
        "confirmation number correctly.</span>";
    if (isset($this->errors['email']))
      $rt .= "<span class='error'>The reservation system encountered a problem with your reservation: ".
        $this->errors['email'].
        " Please make sure you enter the same email address you used on your application.</span>";
    $rt .= "<form action=# method='post'>".
      "<input type='hidden' name='res_action' value='confirm'>".
      "<table>".
      "<tr>".
      "<td>Email</td>".
      "<td><input name='res_value[email]'></td>".
      "</td>".
      "</tr>".
      "<tr>".
      "<td>Confirmation</td>".
      "<td><input name='res_value[confirmation]'></td>".
      "</tr>".
      "</table>".
      "<p>Your confirmation email ".
      "should arrive within the hour. If it does not, please email ".
      "<a href='mailto:trouble@creolewest.com'>trouble@creolewest.com</a> with your ".
      "registration details.</p>".
      "<input type='submit' value='Next &gt;&gt;' class='flushright'>".
      "</form>".
      "</div>";
    return $rt;
  }

  function render(&$page, &$user) {
    switch ($this->view) {
    case "new_reservation":
      return $this->render_new_reservation($page, $user);
    case "edit":
      return $this->render_edit($page, $user);
    case "confirm_new":
      return $this->render_confirm_new();
    case "confirm":
      return $this->render_confirm();
    case "confirmed":
      return $this->render_confirmed($page);
    case "list":
      return $this->render_list($page, $user);
    default:
      return $this->render_default($page, $user);
    }
  }

  function set_view($view, &$page = null) {
    $this->view = $view;
  }

  function render_list(&$page, &$user) {
    global $puma;
    if (!$this->user->authorized(1, "")) {
      $rt = "<h3>You do not have permission to view this listing.</h3>";
      header("Location: ".$puma->request->self_script_uri("index.php"));
      exit();
    }
    $rt = "";
    if (isset($this->status))
      foreach($this->status as $module => $message)
        $rt .= "<li>$module: $message</li>";
    $rt .= "<table border=1>".
      "<tr>".
      "<td><b>Actions</b></td>".
      "<td><b>Contact</b></td>".
      "<td><b>Confirmed</b></td>".
      "<td><b>Quantity</b></td>".
      "<td><b>Comment</b></td>";
    foreach ($this->questions as $question)
      $rt .= "<td><b>$question->name</b></td>";
    $rt .= "</tr>";
    foreach ($this->reservations as $reservation)
      $rt .= $reservation->render_view($page);
    $newres = new Reservation();
    $newres->set_questions($this->questions);
    $rt .= $newres->render_list_edit($page);
    $rt .= "</table>";
    $rt .= "<h3>Collected email addresses</h3>";
    $addresses = "";
    foreach ($this->reservations as $reservation)
      $addresses .= $reservation->email . ",";
    $addresses = substr($addresses, 0, -1);
    $rt .= "<a href='mailto:jel@creolewest.com?bcc=$addresses&subject=$this->name'>Send email to everyone</a><br>".
      $addresses;
    return $rt;
  }
  
  function render_edit(&$page, &$user) {
    $rt = "";
    $rt .= "<form action='$page->parent' method='post'>\n".
      "<div id='reservations_box'>\n".
      "<p>To ensure your place at our event, please provide the following ".
      "information accurately and completely. Fields marked with a red star ".
      "are required and your reservation cannot be processed without them. In order ".
      "to know more about our guests, we suggest you fill in all information, though some ".
      "fields are not required.".
      "</p>".
      "<div id='reservations_questions'>\n".
      "<table>\n".
      $this->reservations[$this->current_reservation]->render_edit().
      "</tr><tr>\n".
      "<td colspan=2 align=center>".
      "<input type='hidden' name='res_action' value='new_reservation'>\n".
      "<input type='submit' value='Next &gt;&gt;'></td></tr>\n".
      "</table>\n".
      "</div>\n".
      "</div>\n".
      "</form>\n";
      return $rt;
  }

  function render_new_reservation(&$page, &$user) {
    $reservation = new Reservation();
    $reservation->set_questions($this->questions);
    $rt = "";
    $rt .= "<form action='$page->parent' method='post'>\n".
      "<div id='reservations_box'>\n".
      "<p>To ensure your place at our event, please provide the following ".
      "information accurately and completely. Fields marked with a red star ".
      "are required and your reservation cannot be processed without them. In order ".
      "to know more about our guests, we suggest you fill in all information, though some ".
      "fields are not required.".
      "</p>".
      "<div id=reservations_questions>\n".
      "<table>\n".
      $reservation->render_edit().
      "</tr><tr>\n".
      "<td colspan='2' align='center'>".
      "<input type='hidden' name='res_action' value='new_reservation'>\n".
      "<input type='submit' value='Next &gt;&gt;'></td></tr>\n".
      "</table>\n".
      "</div>\n".
      "</div>\n".
      "</form>\n";
    return $rt;
  }

  function delete_all() {
    $this->reservations = array();
    $this->unsaved_changes = true;
  }

  function admin_confirm($email) {
    if (!$this->user->authorized(0, "")) {
      $this->error["delete_all"] = "Insufficient rights";
      $this->set_view("default");
      return;
    }
    $this->reservations[$email]->confirmed = "yes";
    $this->unsaved_changes = true;
    $this->set_view("list");
  }

  function web_delete_all($value) {
    if (!$this->user->authorized(0, "")) {
      $this->error["delete_all"] = "Insufficient rights";
      $this->set_view("default");
      return;
    }
    $this->delete_all();
    $this->set_view("default");
  }

  function remail($email, &$page) {
    if (!$this->user->authorized(0, "")) {
      $this->error["remail"] = "Insufficient rights";
      $this->set_view("default");
      return;
    }
    $this->send_confirmation($page, $this->reservations[$email]);
    $this->set_view("list");
    $this->status["remail"] = "Successfully sent $email.";
  }

  function web_delete($email) {
    if (!$this->user->authorized(0, "")) {
      $this->error["remail"] = "Insufficient rights";
      $this->set_view("default");
      return;
    }
    unset($this->reservations[$email]);
    $this->set_view("list");
    $this->status["delete"] = "Successfully deleted $email.";
    $this->unsaved_changes = true;
  }

  function process_signal($signal, $value, $permission, &$page) {
    $handlers = array('confirm' => 'confirm',
                      'set_view' => "set_view",
                      'new_reservation' => "new_reservation",
                      "delete_all" => "web_delete_all",
                      "remail" => "remail",
                      "delete" => "web_delete",
                      "admin_confirm" => "admin_confirm");

    $handler = $handlers[$signal];
    $this->$handler($value, $page);
  }

  function new_reservation($value, &$page) {
    $this->current_reservation = $value['email']." transit";
    assert(!isset($this->reservations[$this->current_reservation]));
    $this->reservations[$this->current_reservation] = new Reservation();
    $this->reservations[$this->current_reservation]->set_fullname($value['fullname']);
    if (isset($value['comment'])) $this->reservations[$this->current_reservation]->set_comment($value['comment']);
    $this->reservations[$this->current_reservation]->set_email($value['email']);
    $this->reservations[$this->current_reservation]->set_confirmed("no");
    $this->reservations[$this->current_reservation]->set_confirmation(substr(md5(time().$value['email'].rand()), 0, 8));
    $this->reservations[$this->current_reservation]->set_phone($value['phone_area'].".". $value['phone_prefix'].".". $value['phone_last']);
    $this->reservations[$this->current_reservation]->set_street($value['street']);
    $this->reservations[$this->current_reservation]->set_city($value['city']);
    $this->reservations[$this->current_reservation]->set_state($value['state']);
    $this->reservations[$this->current_reservation]->set_zip($value['zip']);
    $this->reservations[$this->current_reservation]->set_quantity($value['quantity']);
    $this->reservations[$this->current_reservation]->set_questions($this->questions);
    foreach ($this->questions as $question) {
      $this->reservations[$this->current_reservation]->answers[$question->id] = $question->make_answer($value['q'][$question->id]);
    }
    
    if (!$this->reservations[$this->current_reservation]->validate() || 
        isset($this->reservations[$this->reservations[$this->current_reservation]->email])) {
      if (isset($this->reservations[$this->reservations[$this->current_reservation]->email]) &&
          !isset($this->reservations[$this->current_reservation]->errors['email']))
        $this->reservations[$this->current_reservation]->errors['email'] = 
          "Another reservation with the same email address ".
          "was registered in the name of ".
          $this->reservations[trim($value['email'])]->fullname.
          ". Have you already registered with us for this event? If you reached this page by pressing your browser's".
          " back button, please use the forward button to exit this page. If you reached this page while trying to ".
          "confirm your reservation, please <a href=\"".$this->substitute("%w")."&res_action=set_view&res_value=confirm\">click here</a> to be redirected ".
          "to the confirmation page.";
      /* There were errors and we need to do it again */
      if (!isset($value['next_view']))
        $this->set_view("edit");
      else
        $this->set_view($value['next_view']);
    } else {
      $this->send_confirmation($page, $this->reservations[$this->current_reservation]);
      if (!isset($value['this_view']))
        $this->set_view("confirm_new");
      else
        $this->set_view($value['this_view']);
    }
    $this->unsaved_changes = true;
  }
  
  function _cb_subst($matches) {
    //global $puma;
    $base = "http://";
    $base .= $_SERVER['SERVER_NAME'];
    $base .= dirname($_SERVER['SCRIPT_NAME']);
    $base .= "/";
    switch($matches[1]) {
    case "e":
      return $this->name;
    case "n":
      return $this->reservations[$this->current_reservation]->fullname;
    case "c":
      return $this->reservations[$this->current_reservation]->confirmation;
    case "l":
      return $base."view/".$this->page->parent.
        "?res_action=confirm&res_value[email]=".urlencode($this->reservations[$this->current_reservation]->email).
        "&res_value[confirmation]=".$this->reservations[$this->current_reservation]->confirmation;
    case "w":
      return $base."view/".$this->page->parent;
    default:
      print_r($matches);
      die();
    }
  }
  
  function substitute($text) {
    $text = preg_replace_callback("/(?!<%)%([neclw])/", array($this, "_cb_subst"), $text);
    $text = preg_replace('/\\\\n/', "\n", $text);
    return $text;
  }

  function confirm($values) {
    if (!isset($this->reservations[$values['email']])) {
      $this->errors['email'] = "No reservation with that email address exists.";
      $this->set_view("confirm");
      return;
    }
    $this->current_reservation = $values['email'];
    if ($this->reservations[$this->current_reservation]->confirmation == $values['confirmation']) {
      $this->reservations[$this->current_reservation]->confirmed = "yes";
      $this->unsaved_changes = true;
      $this->set_view("confirmed");
      return;
    }
    $this->errors['confirmation'] = "Incorrect confirmation number.";
    $this->set_view("confirm_new");
  }

  function send_confirmation(&$page, $reservation) {
    $additionalEmailText = self::getAdditionalContentFromChild($page, "emailText");
    $additionalEmailHtml = self::getAdditionalContentFromChild($page, "emailHtml");

    $base = "http://";
    $base .= $_SERVER['SERVER_NAME'];
    $base .= dirname($_SERVER['SCRIPT_NAME']);
    $base .= "/";
    $mail = new HtmlMailer("CWP Reservations <reservations@creolewest.com>",
                           "$reservation->fullname <$reservation->email>",
                           "Registration confirmation for $page->title");
    $mail->set_plain("Dear $reservation->fullname,\n\n".
                     "Thank you for registering for $page->title.\n".
                     "In order to make sure we have correct contact information for you, our\n".
                     "registration server has sent you this confirmation email. For your\n".
                     "privacy your information will only be used for purposes of this event.\n\n".
                     "Your confirmation number is $reservation->confirmation\n\n".
                     "To complete your registration, please visit\n".
                     "{$base}index.php/page/view/".$page->parent.
                     "\n and choose \"confirm here\". When prompted, type in your email\n".
                     "address ($reservation->email) and the confirmation number given above.\n".
                     "To reduce the risk of typing errors, you may find it easier to copy\n".
                     "and paste this number instead of typing it over. Alternately, if your\n".
                     "email client supports it, you may be able to click the following link:\n".
                     "<".$base."index.php/page/view/{$page->parent}?res_action=confirm&res_value%5Bemail%5D=".
                                                   urlencode($reservation->email)."&res_value%5Bconfirmation%5D=".
                                                   $reservation->confirmation.">\n\n".
                     $additionalEmailText . "\n\n" .
                     "Your time and interest are appreciated. Please note: Your registration\n".
                     "cannot be completed until you finish this step. Do not reply to this\n".
                     "email directly. If you believe this email was sent in error, please email \n".
                     "trouble@creolewest.com.\n\n");

    $mail->set_html("Dear $reservation->fullname,<br><br>\n".
                    "Thank you for registering for $page->title. In order to make sure we\n".
                    "have correct contact information for you, our registration server has\n".
                    "sent you this confirmation email. For your privacy your information\n".
                    "will be used only for purposes of this event.<br /><br />\n".
                    "Your confirmation number is <b>$reservation->confirmation</b><br /><br />\n".
                    "To complete your registration, please visit the ".
                    "<a href='{$base}index.php/page/view/$page->parent?res_action=confirm&res_value[email]=".
                        urlencode($reservation->email)."&res_value[confirmation]=".
                        $reservation->confirmation."'>confirmation page</a>.\n\n".
                    "If you do not see a page congratulating you, you will need to visit ".
                    "<a href='{$base}index.php/page/view/$page->parent'>{$base}index.php/page/view/$page->parent</a>".
                    " and choose \"confirm here\". ".
                    "When prompted, type in your email address ($reservation->email) and the\n".
                    "confirmation number given above. To reduce the risk of typing errors,\n".
                    "you may find it easier to copy and paste this number instead of typing\n".
                    "it over. <br><br>\n\n".
                    $additionalEmailHtml .
                    "Your time and interest are appreciated. Please note: Your registration\n".
                    "cannot be completed until you finish this step. ".
                    "Do not reply to this email directly. If you believe this email\n".
                    "was sent in error, please email ".
                    "<a href='mailto:trouble@creolewest.com'>trouble@creolewest.com</a>.\n\n");
    global $html_mailer_debug;
    $mail->send();
  }
}

$reservations_instances = 0;

function plugin_Reservations($args, &$page, &$user) {
  global $reservations_instances;
  $reservations_instances++;
  if ($reservations_instances > 1)
    return "<b>Only one reservation is allowed per page</b>";
  $container = new VFile();
  $container->open($page, $user->get_id());
  $reservations = new Reservations($container);
  $reservations->user = $user;
  $reservations->page = $page;
  if (!$container->exists()) {
    if (isset($_REQUEST["create_reservation"]) && $_REQUEST["create_reservation"] == "true") {
      $container->set_content($reservations->serialize());
      $container->save();
    } 
  } else {
    $reservations->deserialize($container->get_content());
  }
  if (isset($_REQUEST['res_action'])) {
    $reservations->process_signal($_REQUEST['res_action'],
                                  isset($_REQUEST['res_value']) ?
                                  $_REQUEST['res_value'] : "",
                                  $user->get_permission(), $page);
    if ($reservations->unsaved_changes()) {
      //$container->set_content(addslashes($reservations->serialize()));
      $container->set_content($reservations->serialize());
      $container->save();
    }
  }
  return $reservations->render($page, $user);
}

$magic_pages['/^Reservations:(.*)$/'] = "magic_pages_Reservations";

function magic_pages_Reservations(&$page, &$args) {
  global $puma;
  $container = new VFile();
  $container->open($args[0], $puma->user->get_id());
  $page->push_path(array("Reservations", $args[1]));
  $page->add_content("<h5>This page is not for viewing</h5>You will be redirected.");
  header("Location: ".
         $puma->request->proper_uri("index.php", $args[1]));
  exit();
}
