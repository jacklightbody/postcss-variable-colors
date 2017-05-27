/*
* @Author: jack
* @Date:   2017-05-19
* @Last Modified by:   Jack Lightbody
* @Last Modified time: 2017-05-27
*/

module.exports = new CssVariableColors();
function CssVariableColors(){
    var extractor = require('css-color-extractor');
    var postcss = require('postcss');
    var Color = require('color');
    this.convertFromCss = function(css){
    	var colors = extractor.fromCss(css);
    	var variableColors = [];
        var returnCss = postcss.parse(css)
    	returnCss.walkDecls(function (decl) {
    		var declColors = extractor.fromDecl(decl);
    		var declColor;
    		var indexOf;
    		if(declColors.length >= 1){
    			for(i = 0; i < declColors.length; i++){
    				declColor = declColors[i];
                    var color = new Color(declColor).rgb().string();
    				indexOf = variableColors.indexOf(color);
    				if(indexOf < 0){
    					// not declared yet
    					decl.value = replaceColorWithStatement(decl.value, declColor, "--color_"+variableColors.length);
                        variableColors.push(color);
    				}else{
    					// declared already
    					decl.value = replaceColorWithStatement(decl.value, declColor, "--color_"+indexOf, false);
    				}
    			}
    		}
    	});
        return returnCss.toString()
	}
	function replaceColorWithStatement(css, color, varName, undeclared = true){
		cssParts = css.split(color);
		if(cssParts.length > 1){
            var decl = '';
			if(undeclared){
				decl = cssParts[0]+"var("+varName+", "+color+")";
				cssParts = cssParts.slice(1)
			}
	        css = decl+cssParts.join("var("+varName+")");
	    }
	    return css
	}
}