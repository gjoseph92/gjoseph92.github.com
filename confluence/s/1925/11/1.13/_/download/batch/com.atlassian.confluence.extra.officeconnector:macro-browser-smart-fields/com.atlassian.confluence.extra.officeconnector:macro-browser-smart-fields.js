(function($) {
    /**
     * viewdoc, viewpdf, viewxls and viewppt should have the same behaviour for page/spacekey/date fields apart from
     * attachment filter types, so we can use a common constructor.
     */
    var ViewFileConfig = function(fileTypes) {
        this.fileTypes = fileTypes;
    };

    ViewFileConfig.prototype.beforeParamsSet = function(params, inserting) {
    	// If the macro has no parameters set for the page, date or space set the page to the one
    	// currently being edited. See beforeParamsRetrieved for the reverse.
        if (!params.page && !(params.date || params.space)) {
        	if (AJS.params.contentType == "page" || AJS.params.contentType == "blogpost") {
                params.page = $("#content-title").val();
            } else if (AJS.params.contentType == "comment") {
            	params.page = AJS.params.pageTitle;
            }
        }
        if (params.date) {
            // will be in format mm/dd/yyyy, should be yyyy/mm/dd
            var parts = params.date.split("/");
            params.page = ["", parts[2], parts[0], parts[1], params.page].join("/");
        }
        if (params.space) {
            params.page = params.space + ":" + params.page;
        }
        return params;
    };

    ViewFileConfig.prototype.beforeParamsRetrieved = function(params) {
        if (params.page) {
            var spacePageArr = params.page.split(":");
            if (spacePageArr.length > 1) {
                params.space = spacePageArr[0];
                params.page = spacePageArr[1];
            }
            var parts = params.page.split("/");
            if (parts.length > 1) {
                // will be in format yyyy/mm/dd/Page, should be mm/dd/yyyy
                params.date = [parts[2], parts[3], parts[1]].join("/");
                params.page = parts[4];
            }
            // If the page specified is the current page being edited, remove the page title parameter.
            // Even if a user entered it manually it is good to get rid of it as the macro parameters don't handle page renames
            // See beforeParamsSet for the reverse.
        	if (((AJS.params.contentType == "page" || AJS.params.contentType == "blogpost") && params.page == $("#content-title").val()) ||
        	     (AJS.params.contentType == "comment" && params.page == AJS.params.pageTitle)) {
                delete params.page;
            }
        }
        return params;
    };

    ViewFileConfig.prototype.fields = {
        "attachment" : function(param) {

            /**
             *  Assumes value in form SPACEKEY:(/yyyy/mm/dd/)Title
             */
            var parsePageLink = function(pageLink) {
                var o = {};

                var bits = pageLink.split(":", 2);
                o.spaceKey = ((bits.length == 2) && bits[0]) || AJS.params.spaceKey;
                o.title = bits[bits.length - 1];

                if (o.title.indexOf("/") == 0) {
                    // blogpost
                    o.postingDay = o.title.substr(1, 10);
                    o.title = o.title.substr(12);
                }
                
                // If the page title is the same as the page being edited, leave it blank and use the content Id.
                if (o.title == $("#content-title").val()) {
                	o.title = "";
                }
                if (!o.title) {
                	if (AJS.params.newPage) {
	                	o.draftId = AJS.params.contentId;
	            	} else {
	            		o.pageId = AJS.params.pageId;
	            	}
                }
                return o;
            };
            
            var attachmentOptions = {
                fileTypes : this.fileTypes
            }
            
            var field = AJS.MacroBrowser.ParameterFields["attachment"](param, attachmentOptions);
            
            field.dependencyUpdated = function(dependencyName, dependencyValue) {
                AJS.log("attachment:dependencyUpdated called: " + dependencyName + ", " + dependencyValue);

                var req = parsePageLink(dependencyValue);
                this.getData(req);
            };
            return field;
        },

        /**
         * Office Connector uses an unnecessary "space" parameter which could be merged with the "page" parameter as per
         * other macros. In the Macro Browser we can get around this by just hiding the space param's div
         */
        "spacekey" : function(param) {
            return AJS.MacroBrowser.ParameterFields["_hidden"](param, {});
        },

        /**
         * Office Connector also uses an unnecessary "date" parameter which could be merged with the "page" parameter as per
         * other macros. In the Macro Browser we can get around this by just hiding the date param's div
         */
        "date" : function(param) {
            return AJS.MacroBrowser.ParameterFields["_hidden"](param, {});
        },

        "confluence-content" : function(param) {
            var options = {
                // TODO - define the field with the dependency via the fallback. dT
                dependencies : ["name"]
            };

            return AJS.MacroBrowser.ParameterFields["confluence-content"](param, options);
        }
    };

    AJS.MacroBrowser.Macros.viewdoc = new ViewFileConfig(["doc", "docx"]);
    AJS.MacroBrowser.Macros.viewpdf = new ViewFileConfig(["pdf"]);
    AJS.MacroBrowser.Macros.viewxls = new ViewFileConfig(["xls", "xlsx"]);
    AJS.MacroBrowser.Macros.viewppt = new ViewFileConfig(["ppt", "pptx"]);

    // Allow existing viewfile to redirect to correct alias for its filetype.
    AJS.MacroBrowser.Macros.viewfile = {
        updateSelectedMacro : function (macro) {
            var fileName = macro.params[""] || macro.params["name"];
            if (fileName) {
                var lastDot = fileName.lastIndexOf(".");
                if (lastDot > 0) {
                    var ext = fileName.substring(lastDot + 1);
                    if (ext) {
                        (ext == "doc") && (ext == "docx") && (macro.name = "viewdoc");
                        (ext == "pdf") && (macro.name = "viewpdf");
                        (ext == "ppt") && (ext == "pptx") && (macro.name = "viewppt");
                        (ext == "xls") && (ext == "xlsx") && (macro.name = "viewxls");
                    }
                }
            }
        }
    }
})(AJS.$);
