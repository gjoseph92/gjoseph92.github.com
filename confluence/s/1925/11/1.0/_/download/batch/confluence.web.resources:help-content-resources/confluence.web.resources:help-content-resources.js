AJS.toInit(function(A){A("#helpcontent a").click(function(){var B=A(this).attr("href");var C=A(this).attr("onClick");if(!C&&B&&B.indexOf("#")!=0&&B.indexOf(window.location)==-1){window.open(B,"_blank").focus();return false}})});
