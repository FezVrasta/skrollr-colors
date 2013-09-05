skrollr-colors
==============

Parses ``data-`` tags and converts different colors annotations to HSLA to allow transitions in skrollr.  
It will parse every color in ``data-`` attributes, even in CSS gradients.

How to use:
--------------

Include the plugin before ``skrollr.js`` and enjoy.  

    <script src="js/skroll-colors.min.js"></script>
    <!-- skrollr.js code -->
    </body>
    
Now you can use codes like:

    <div 
        data-0="background-color: #000;"
        data-400="background-color: hsl(100,80%,90%,1);"
        data-top="background-color: rgba(255,255,255,1);"
    >
        WHOOT
    </div>
    

Example:
-------------
[JSFiddle](http://jsfiddle.net/zqcx4/)


Supported color annotations
--------------

skrollr-colors detects even if there are spaces between values and commas and is case-insensitive.

Supported annotations:

- **HEX 3 digits**: #F0F
- **HEX 6 digits**: #F0F0F0
- **RGB**: rgb(0,0,0)
- **RGBA**: rgba(0,0,0,0)
- **HSL**: hsl(0,0%,0%)

HSLA is not parsed at all, seen skrollr-colors aim to convert everything to HSLA.

ToDo
----------

- Nothing?
