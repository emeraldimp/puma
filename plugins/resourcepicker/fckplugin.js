/*
 * FCKeditor - The text editor for internet
 * Copyright (C) 2003-2006 Frederico Caldeira Knabben
 * 
 * Licensed under the terms of the GNU Lesser General Public License:
 * 		http://www.opensource.org/licenses/lgpl-license.php
 * 
 * For further information visit:
 * 		http://www.fckeditor.net/
 * 
 * "Support Open Source software. What about a donation today?"
 * 
 * File Name: fckplugin.js
 * 	Plugin to insert "ResourcePicker" in the editor.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 *		Geoffrey Lehr (geoff.lehr@gmail.com)
 */

// Register the related command.
FCKCommands.RegisterCommand( 'ResourcePicker', new FCKDialogCommand( 'ResourcePicker', FCKLang.ResourcePickerDlgTitle, FCKPlugins.Items['resourcepicker'].Path + 'fck_resourcepicker.html', 400, 500 ) ) ;

// Create the "ResourcePicker" toolbar button.
var oResourcePickerItem = new FCKToolbarButton( 'ResourcePicker', FCKLang.ResourcePickerBtn ) ;
oResourcePickerItem.IconPath = FCKPlugins.Items['resourcepicker'].Path + 'resourcepicker.gif' ;

FCKToolbarItems.RegisterItem( 'ResourcePicker', oResourcePickerItem ) ;

// The object used for all ResourcePicker operations.
var FCKResourcePicker = new Object() ;

// Add a new resourcepicker at the actual selection.
FCKResourcePicker.Add = function( value )
{
	FCK.InsertHtml(value);
}

// On Gecko we must do this trick so the user select all the SPAN when clicking on it.
FCKResourcePicker._SetupClickListener = function()
{
	FCKResourcePicker._ClickListener = function( e )
	{
		if ( e.target.tagName == 'SPAN' && e.target._fckresourcepicker )
			FCKSelection.SelectNode( e.target ) ;
	}

	FCK.EditorDocument.addEventListener( 'click', FCKResourcePicker._ClickListener, true ) ;
}
