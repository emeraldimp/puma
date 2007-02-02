/* Copyright 2002--2006 Creole West Productions
   This file is released under the GPL. See License for full licensing information 

/* $Id$ */

        function getElementsbyMyParent(pageid){
		    var inc=0;
		    var tagnames="";
		    var customcollection = Array();
		    if (document.all) { 
		      var alltags = document.getElementsByTagName("tr");
		      for (i=0; i<alltags.length; i++){
			    if(alltags[i].myparent == pageid) {
			           customcollection[inc++]=alltags[i];
			    }
		      }
		    } else {
		      var alltags = document.getElementsByTagName("tr");
		      for (i=0; i<alltags.length; i++){
		        for (j=0; j<alltags[i].attributes.length; j++) {
			    if(alltags[i].attributes[j].name == 'myparent') {
			        if (alltags[i].attributes[j].value==pageid) {
			           customcollection[inc++]=alltags[i];
				}
			    }
			}
		      }
		    }
		    return customcollection;
	    }

	    function expandlist (obj, pageid) {
		elements = getElementsbyMyParent(pageid);
		for (i=0; i<elements.length; i++) {
			elements[i].style.visibility = "visible";
		        if (document.all) { 
			  elements[i].style.display = "inline";
			} else {
			  elements[i].style.display = "table-row";
			}
		}
		obj.style.display = "none";
		obj.style.visibility = "hidden";
		collapseobj = document.getElementById("collapse"+pageid);
		setTimeout('', 50);
		collapseobj.style.display = "inline";
		collapseobj.style.visibility = "visible";
		return true;
            }
	    
	    function collapselist (obj, pageid) {
		var elements = getElementsbyMyParent(pageid);
		for (var i=0; i < elements.length; i++) {
			elements[i].style.visibility = "hidden";
			elements[i].style.display = "none";
			var newpageid = elements[i].attributes.mypageid.value;
			var subspan = document.getElementById("collapse"+newpageid);
			if (subspan) collapselist(subspan, newpageid);
		}
		obj.style.display = "none";
		obj.style.visibility = "hidden";
		expandobj = document.getElementById("expand"+pageid);
		if (expandobj) {
		  setTimeout('',50);
		  expandobj.style.display = "inline";
		  expandobj.style.visibility = "visible";
		}
		return true;
            }
