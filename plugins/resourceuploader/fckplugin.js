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
 * 	Plugin to insert "ResourceUploader" in the editor.
 * 
 * File Authors:
 * 		Frederico Caldeira Knabben (fredck@fckeditor.net)
 *		Geoffrey Lehr (geoff.lehr@gmail.com)
 */

// Register the related command.
FCKCommands.RegisterCommand( 'ResourceUploader', new FCKDialogCommand( 'ResourceUploader', FCKLang.ResourceUploaderDlgTitle, FCKPlugins.Items['resourceuploader'].Path + 'fck_resourceuploader.html', 400, 500 ) ) ;

// Create the "ResourceUploader" toolbar button.
var oResourceUploaderItem = new FCKToolbarButton( 'ResourceUploader', FCKLang.ResourceUploaderBtn ) ;
oResourceUploaderItem.IconPath = FCKPlugins.Items['resourceuploader'].Path + 'resourceuploader.gif' ;

FCKToolbarItems.RegisterItem( 'ResourceUploader', oResourceUploaderItem ) ;

// The object used for all ResourceUploader operations.
var FCKResourceUploader = new Object() ;

// Add a new resourceuploader at the actual selection.
FCKResourceUploader.Add = function( value )
{
	FCK.InsertHtml(value);
}

// On Gecko we must do this trick so the user select all the SPAN when clicking on it.
FCKResourceUploader._SetupClickListener = function()
{
	FCKResourceUploader._ClickListener = function( e )
	{
		if ( e.target.tagName == 'SPAN' && e.target._fckresourceuploader )
			FCKSelection.SelectNode( e.target ) ;
	}

	FCK.EditorDocument.addEventListener( 'click', FCKResourceUploader._ClickListener, true ) ;
}
