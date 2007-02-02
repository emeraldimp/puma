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
 * 	Plugin to insert "PagePicker" in the editor.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 *		Geoffrey Lehr (geoff.lehr@gmail.com)
 */

// Register the related command.
FCKCommands.RegisterCommand( 'PagePicker', new FCKDialogCommand( 'PagePicker', FCKLang.PagePickerDlgTitle, FCKPlugins.Items['pagepicker'].Path + 'fck_pagepicker.html', 500, 500 ) ) ;

// Create the "PagePicker" toolbar button.
var oPagePickerItem = new FCKToolbarButton( 'PagePicker', FCKLang.PagePickerBtn ) ;
oPagePickerItem.IconPath = FCKPlugins.Items['pagepicker'].Path + 'pagepicker.gif' ;

FCKToolbarItems.RegisterItem( 'PagePicker', oPagePickerItem ) ;

// The object used for all PagePicker operations.
var FCKPagePicker = new Object() ;

// Add a new pagepicker at the actual selection.
FCKPagePicker.Add = function( value )
{
	FCK.InsertHtml(value);
}

// On Gecko we must do this trick so the user select all the SPAN when clicking on it.
FCKPagePicker._SetupClickListener = function()
{
	FCKPagePicker._ClickListener = function( e )
	{
		if ( e.target.tagName == 'SPAN' && e.target._fckpagepicker )
			FCKSelection.SelectNode( e.target ) ;
	}

	FCK.EditorDocument.addEventListener( 'click', FCKPagePicker._ClickListener, true ) ;
}
