/*! scrollr-colors
 *   skrollr plugin to allow transitions between different kind of colors annotations
 */
 
"use strict";

// Getter of every element with data- attributes
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
function hexToRgba(hex) {
    var result = /#([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9])/g.exec(hex);
    return "rgba(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ",1)";
}

// Converter from RGB(A) to HSLA
function rgbaToHsla(rgb) {

    rgb = rgb.replace("rgb(", "", rgb);
    rgb = rgb.replace("rgba(", "", rgb);
    rgb = rgb.replace(")", "", rgb);

    var arrRGB = rgb.split(",");

    if (arrRGB.length == 4) {

        var a = arrRGB[3];

    } else {
        var a = 1;
    }

    var r = arrRGB[0],
        g = arrRGB[1],
        b = arrRGB[2];


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

    return "hsla(" + Math.floor(h * 360) + "," + Math.floor(s * 100) + "%," + Math.floor(l * 100) + "%," + a + ")";
}

// Converter from HEX to HSL(A)
function hexToHsla(hex) {
    return rgbaToHsla(hexToRgba(hex));
}

var results = getAllDataElements();

//you can then use your array of matches
results.forEach(function (element) {

    for (var i = 0; i < element.attributes.length; i++) {


        element.attributes[i].nodeValue = element.attributes[i].nodeValue.replace(/#([a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9])/g, hexToHsla);

        element.attributes[i].nodeValue = element.attributes[i].nodeValue.replace(/(rgb|rgba)\([0-9]*,[0-9]*,([0-9]*|[0-9]*,([0-9]\.[0-9]|[0-9]))*\)/g, rgbaToHsla);

        console.log(element.attributes[i].nodeValue);
    };

});
