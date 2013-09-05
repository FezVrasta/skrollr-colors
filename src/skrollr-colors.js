/*! scrollr-colors
 *   skrollr plugin to allow transitions between different kind of colors annotations
 */
 
(function () {
    "use strict"; // Be serious

    // Converter from HEX to RGBA
    // We convert HEX to RGBA, then we'll convert RGBA to HSLA (I'd like to find a way to convert HEX>HSLA in one step)

    function hexToRgba(hex) {
        var result = /#([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])/g.exec(hex);
        return "rgba(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ",1)";
    }

    // Converter from RGB(A) to HSLA
    // Find every RGB or RGBA annotations and convert them to HSLA, adding opacity 1 to RGB conversions

    function rgbaToHsla(rgb) {

        // Remove everything except values and convert toa array
        var arrRGB = rgb.replace("rgb(", "", rgb).replace("rgba(", "", rgb).replace(")", "", rgb).split(",");

        // If there is the 4th value, it's an RGBA so use the 4th as opacity, if not, assign 1 to opacity
        var a;
        if (arrRGB.length == 4) {
            a = arrRGB[3];
        } else {
            a = 1;
        }

        // Assign to r,g,b the values
        var r = arrRGB[0],
            g = arrRGB[1],
            b = arrRGB[2];

        // Nerd stuff to convert RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
            }
            h /= 6;
        }

        // Return the HSLA annotation for the color
        return "hsla(" + Math.floor(h * 360) + "," + Math.floor(s * 100) + "%," + Math.floor(l * 100) + "%," + a + ")";
    }

    // Converter from HSL to HSLA

    function hslToHsla(hsl) {

        return hsl.replace(")", ",1)").replace("hsl", "hsla");

    }

    // Converter from HEX to HSLA
    // here we mix together HexToRgba and rgbaToHsla to convert HEX to HSLA with opacity 1

    function hexToHsla(hex) {
        return rgbaToHsla(hexToRgba(hex));
    }


    // Get all DOM elements with 'data' attribute, if skrollr would use a prefix would be faster... (eg. 'data-skrollr-')

    //get all DOM elements
    var elements = document.getElementsByTagName("*"),
        matches = []; //array to store matches

    //loop each element
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        //get all attributes for the element and loop them
        var attributes = element.attributes;
        for (var j = 0; j < attributes.length; j++) {

            //get the name of the attribute
            var attr = attributes.item(j).nodeName;

            //check if attibute name starts with "data-"
            if (attr.indexOf("data-") === 0) {

                // Convert to HSLA
                attributes.item(j).nodeValue = attributes.item(j).nodeValue.replace(/#([a-z0-9][a-z0-9][a-z0-9][a-z0-9][a-z0-9][a-z0-9]|[a-z0-9][a-z0-9][a-z0-9])/gi, hexToHsla).replace(/(rgb|rgba)\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(|,\s*((\d|\d.){1,3})\s*)\)/gi, rgbaToHsla).replace(/hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}(|%))\s*,\s*(\d{1,3}(|%))\s*\)/gi, hslToHsla);

            }
        }
    }

}());
