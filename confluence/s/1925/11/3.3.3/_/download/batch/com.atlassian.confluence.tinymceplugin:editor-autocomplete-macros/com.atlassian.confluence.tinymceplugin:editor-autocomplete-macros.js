/**
 * Settings that each Autocomplete will be initialized on, depending on the trigger character used to activate the
 * autocomplete.
 */
AJS.toInit(function ($) {
    var autoComplete = tinymce.confluence.Autocompleter,
        makeMacroDropdownItem = function (summary) {
            var icon = summary.icon,
                iconLocation = null;
            if (icon) {
                iconLocation = (icon.relative ? AJS.params.staticResourceUrlPrefix : "") + icon.location;
            }
            return {
                className: "autocomplete-macro-" + summary.macroName,
                html: tinymce.confluence.Autocompleter.Util.dropdownLink(summary.title),
                callback: function(autoCompleteControl) {
                    autoCompleteControl.replaceWithSelectedSearchText();
                    autoCompleteControl.die();
                    window.top.focus();
                    tinymce.confluence.macrobrowser.macroBrowserToolbarButtonClicked({
                        useEditorSelection: false,       // the selected text will be the search term, ignore it
                        presetMacroMetadata: summary
                    });
                },
                icon: iconLocation
            };
        };

    // Link settings.
    tinymce.confluence.Autocompleter.Settings["{"] = {

        ch : "{",
        endChars : ["}", ":"],

        dropDownClassName: "autocomplete-macros",

        getHeaderText : function (autoCompleteControl, value) {
            return AJS.I18n.getText("editor.autocomplete.macros.header.text");
        },

        getAdditionalLinks : function (autoCompleteControl, value) {
            return [
                {
                    className: "dropdown-insert-macro",
                    html: tinymce.confluence.Autocompleter.Util.dropdownLink(
                            AJS.I18n.getText("editor.autocomplete.macros.dialog.browse"), "dropdown-prevent-highlight", "editor-icon"),
                    callback: function(autoCompleteControl) {
                        var searchText = autoCompleteControl.text();
                        autoCompleteControl.replaceWithSelectedSearchText();
                        autoCompleteControl.die();
                        window.top.focus();
                        tinymce.confluence.macrobrowser.macroBrowserToolbarButtonClicked({ searchText: searchText });
                    }
                }
            ];
        },

        getDataAndRunCallback : function(autoCompleteControl, val, callback) {
            var matrix = [[]];
            if (!val) {
                $("#rte-featured-macros div").each(function() {
                    var macroMetadata = AJS.MacroBrowser.getMacroMetadata($(this).text());
                    matrix[0].push(makeMacroDropdownItem(macroMetadata));
                });
            } else {
                var summaries = AJS.MacroBrowser.searchSummaries(val, { keywordsField: "keywordsNoDesc" });
                for (var i = 0, ii = Math.min(summaries.length, autoCompleteControl.maxResults); i < ii; i++) {
                    matrix[0].push(makeMacroDropdownItem(summaries[i]));
                }
            }
            callback(matrix, val);
        },

        update : function (autoCompleteControl, data) {
            throw new Error("All items in the Macro Autocomplete dropdown must have a callback function");
        }

    }});

