
/**
 * Settings that each Autocomplete will be initialized on, depending on the trigger character used to activate the
 * autocomplete.
 */
AJS.toInit(function ($) {
    var autoComplete = tinymce.confluence.Autocompleter,

    getUrl = function(val) {
        var suggestionUrl = AJS.params.remoteUser ? "/rest/prototype/1/session/history.json" : null;
         return AJS.params.contextPath + (val ? "/rest/prototype/1/search.json": suggestionUrl);
    },

    getParams = function(autoCompleteControl, val) {
        var params = {
            "max-results": autoCompleteControl.maxResults
        };
        if (val) {
            params.query = val;
            params.search = "name";
        }
        return params;  
    };

    // Link settings.
    tinymce.confluence.Autocompleter.Settings["["] = {

        ch : "[",
        endChars : ["]"],

        dropDownClassName: "autocomplete-links",

        getHeaderText : function (autoCompleteControl, value) {
            return AJS.I18n.getText("editor.autocomplete.links.header.text");
        },

        getAdditionalLinks : function (autoCompleteControl, value) {
            var searchPrompt;
            if (value) {
                var message = AJS.I18n.getText("editor.autocomplete.links.dialog.search");
                searchPrompt = AJS.format(message, value);
            } else {
                searchPrompt = AJS.I18n.getText("editor.autocomplete.links.dialog.search.no.text");
            }

            return [
                {
                    className: "search-for",
                    name: searchPrompt,
                    href: "#",
                    callback : function (autoCompleteControl) {
                        autoCompleteControl.replaceWithSelectedSearchText();
                        AJS.Editor.LinkBrowser.open({
                            gwtOpener: AJS.Editor.LinkBrowser.openAndSearch
                        });
                    }
                },
                {
                    className: "dropdown-insert-link",
                    html: autoComplete.Util.dropdownLink(AJS.I18n.getText("editor.autocomplete.links.web.link"), "dropdown-prevent-highlight", "editor-icon"),
                    callback: function (autoCompleteControl) {
                        autoCompleteControl.replaceWithSelectedSearchText();
                        AJS.Editor.LinkBrowser.open({
                            panelId: AJS.Editor.LinkBrowser.WEBLINK_PANEL_ID
                        });
                    }
                }
            ];
        },

        getDataAndRunCallback : function(autoCompleteControl, val, callback) {
            tinymce.confluence.Autocompleter.Util.getRestData(autoCompleteControl, getUrl, getParams, val, callback, "content");
        },

        update : function(autoCompleteControl, data) {
            var linkDetails = AJS.REST.wikiLink(data.restObj);            
            AJS.Editor.Adapter.insertLink(linkDetails);
        }

    }

});

