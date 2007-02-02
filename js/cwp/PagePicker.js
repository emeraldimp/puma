/* Copyright 2002--2006 Creole West Productions
   This file is released under the GPL. See License for full licensing information */

/* $Id$ */

dojo.require("dojo.io.*");
dojo.require("dojo.lang.*");
dojo.require("dojo.dom");
dojo.require("dojo.widget.*");
dojo.require("dojo.animation.*");
dojo.provide("cwp.PagePicker");

dojo.widget.defineWidget("cwp.PagePicker", dojo.widget.HtmlWidget, {
        isContainer: true,
        toggle: "fade",
        templatePath: dojo.uri.dojoUri("../src/js/cwp/template/PagePicker.html"),
        templateCssPath: dojo.uri.dojoUri("../src/js/cwp/template/PagePicker.css"),
        
        // DOM nodes
        results: null,
        search: null,
        
        //Instance variables
        timer: null,
        timeout: 200,
        lastQuery: "",
        linkTextModified: false,

        runQuery: function () {
            if (this.lastQuery != this.search.value) {
                this.lastQuery = this.search.value;
                if (!this.search.value) {
                    this.fadeout.play();
                } else {
                    if (this.linkTextModified === false) {
                        this.title.value = this.search.value;
                    }
                    var url = dojo.uri.dojoUri("../../rest.php/page/search/"+escape(this.search.value)+"?format=json");
                    var request = dojo.io.bind({
                            url: url,
                            load: dojo.lang.hitch(this, "doQuery"),
                            error: function (type, error) {
                                dojo.debug("AJAX error.");
                                dojo.debug("Type ="+type);
                                dojo.debug("error="+error);
                                dojo.debugShallow(error);
                            }
                        });
                }
            }
        },

        doQuery: function (type, data, evt) { 
            this.fadein.play();
            this.resultsList.innerHTML = data;
            if (this.results.childNodes.length > 0) {
                var ul = this.results.getElementsByTagName("ul")[0];
                if (ul === null) return;
                var c = dojo.dom.firstElement(ul);
                if (c === null) return;
                do {
                    ret = 
                    (dojo.lang.hitch(this, function () {
                            var _c = c;
                            var firstSpan = c.getElementsByTagName("span")[0];
			    var name = "NoName";
                            try {
                                name = firstSpan.innerText;
                            } catch (e) {
				dojo.debug("Caught exception...");
				dojo.debugShallow(e);
                                return false;
                            }
                            if (!name && firstSpan.textContent) {
                                /// IE uses .innerText, mozilla uses
                                /// .textContent...
                                name = firstSpan.textContent;
                            }
                            dojo.event.connect(_c, "onclick", dojo.lang.hitch(this, function (evt) {
                                        this.search.value = name;
                                        this.lastQuery = name;
                                        if (this.linkTextModified === false) {
                                            this.title.value = name;
                                            this.preview.innerHTML = "<a href=\"#\">"+name+"</a>";
                                        }
                                        this.fadeout.play();
                                        this.search.focus();
                                    }));
                             return true;
                        }))();
                    if (c == dojo.dom.lastElement(ul) || !ret) break;
                    c = dojo.dom.nextElement(c);
                    if (!c.getElementsByTagName('span')) break;
                } while (true);
            }
            if (this.results.style.display == "none") {
                this.fadein.play();
            }
        },

        initialize: function (args, frag) {
            dojo.widget.HtmlWidget.prototype.initialize(args, frag);
            this.fadein = {
                play: dojo.lang.hitch(this, function () {
                        this.searchSpinner.fadeout.play();
                        this.results.style.display = "block";
                        this.help.style.display = "inline";
                    })};
            this.fadeout = { play: dojo.lang.hitch(this, function () {
                        this.results.style.display = "none";
                        this.help.style.display = "none";
                    })};
            this.searchSpinner = { 
                playing: false,
                fadein : {
                    play: dojo.lang.hitch(this, function () {
                            if (this.searchSpinner.playing) return;
                            this.searchSpinner.playing = true;
                            this.spinner.style.display = "inline";
                        })},
                fadeout: {
                    play: dojo.lang.hitch(this, function () {
                            if (!this.searchSpinner.playing) return;
                            this.spinner.style.display = "none";
                            this.searchSpinner.playing = false;
                        })}};
            dojo.event.connect(this.title, "onkeyup", dojo.lang.hitch(this, function (evt) {
                        this.linkTextModified = true;
                        var chr = String.fromCharCode(evt.charCode);
                        this.preview.innerHTML = "<a href=#>"+this.title.value+"</a>";
                    }));
            dojo.event.connect(this.insertButton, "onclick", dojo.lang.hitch(this, function (evt) {
                        evt.preventDefault();
                        this.acceptLink(this.search.value, this.title.value);
                    }));
            dojo.event.connect(this.cancelButton, "onclick", dojo.lang.hitch(this, function (evt) {
                        evt.preventDefault();
                        this.cancelLink();
                    }));
            dojo.event.connect(this.search, "onkeypress", dojo.lang.hitch(this, function (evt) {
                        this.searchSpinner.fadein.play();
                        if (this.timer) {
                            window.clearTimeout(this.timer);
                        }
                        this.timer = window.setTimeout(dojo.lang.hitch(this, "runQuery"), this.timeout);
                    }));
        }
    });
