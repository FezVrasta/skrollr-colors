/*! scrollr-colors
 *   skrollr plugin to allow transitions between different kind of colors annotations
 */
 
// Be serious
"use strict";

// Getter of every element with data- attributes
// in this way we'll parse each HTML element and will convert the colors annotations
function getAllDataElements() {
    //get all DOM elements
    var elements = document.getElementsByTagName("*");
    //array to store matches
    var matches = [];
    //loop each element
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        //get all attributes for the element and loop them
        var attributes = element.attributes;
        for (var j = 0; j < attributes.length; j++) {
            //get the name of the attribute
            var attr = attributes.item(j).nodeName;
            //check if attibute name starts with "data-"
            if (attr.indexOf("data-") == 0) {
                matches.push(element); //add it to matches
            }
        }
    }
    return matches; //return results
}


// Converter from HEX to RGBA
// We convert HEX to RGBA, then we'll convert RGBA to HSLA (I'd like to find a way to convert HEX>HSLA in one step)
function hexToRgba(hex) {
    var result = /#([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])/g.exec(hex);
    return "rgba(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ",1)";
}

// Converter from RGB(A) to HSLA
// Find every RGB or RGBA annotations and convert them to HSLA, adding opacity 1 to RGB conversions
function rgbaToHsla(rgb) {

    // Remove everything except values
    rgb = rgb.replace("rgb(", "", rgb);
    rgb = rgb.replace("rgba(", "", rgb);
    rgb = rgb.replace(")", "", rgb);

    // Convert values to array
    var arrRGB = rgb.split(",");

    // If there is the 4th value, it's an RGBA so use the 4th as opacity, if not, assign 1 to opacity
    if (arrRGB.length == 4) {
      var a = arrRGB[3];
    } else {
      var a = 1;
    }

    // Assign to r,g,b the values
    var r = arrRGB[0],
        g = arrRGB[1],
        b = arrRGB[2];

    // Nerd stuff to convert RGB to HSL
    r /= 255, g /= 255, b /= 255;
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
        }
        h /= 6;
    }

    // Return the HSLA annotation for the color
    return "hsla(" + Math.floor(h * 360) + "," + Math.floor(s * 100) + "%," + Math.floor(l * 100) + "%," + a + ")";
}

// Converter from HSL to HSLA
function hslToHsla(hsl) {
 
    return hsl.replace(")",",1)").replace("hsl", "hsla");
 
}

// Converter from HEX to HSLA
// here we mix together HexToRgba and rgbaToHsla to convert HEX to HSLA with opacity 1
function hexToHsla(hex) {
    return rgbaToHsla(hexToRgba(hex));
}

// Get all HTML elements with 'data' attribute, if skrollr would use a prefix would be easier... (eg. 'data-skrollr-')
var results = getAllDataElements();

// Iterate results and convert colors
results.forEach(function (element) {

    // Convert colors for each 'data' attr found on each element
    for (var i = 0; i < element.attributes.length; i++) {

        // Convert HEX to HSLA
        element.attributes[i].nodeValue = element.attributes[i].nodeValue.replace(/#([a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9])/g, hexToHsla);

        // Convert RGB/RGBA to HSLA
        element.attributes[i].nodeValue = element.attributes[i].nodeValue.replace(/(rgb|rgba)\([0-9]*,[0-9]*,([0-9]*|[0-9]*,([0-9]\.[0-9]|[0-9]))*\)/g, rgbaToHsla);

        // Convert HSL to HSLA
        element.attributes[i].nodeValue = element.attributes[i].nodeValue.replace(/hsl\(.*\)/g, hslToHsla);

        console.log(element.attributes[i].nodeValue);
    };

});
