/*
* @Author: jack
* @Date:   2017-05-19
* @Last Modified by:   jack
* @Last Modified time: 2017-05-19
*/

module.exports = CssVariableColors;
function CssVariableColors(css){
    var extractor = require('css-color-extractor');
    var postcss = require('postcss');
    var colors = extractor.fromCss(css);
    var varName, varStatement, color, cssParts;
    css = css.toString()
    for(i = 0; i < colors.length; i++){
        varName = "--color_"+i
        varStatement = "var("+varName+")"
        color = colors[i]
        cssParts = css.split(color);
        if(cssParts.length > 1){
            css = cssParts[0]+"var("+varName+", "+color+")"
            css = css+cssParts.slice(1).join(varStatement)
        }
    }
    return css
}