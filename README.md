skrollr-colors
==============

parse ``data-`` tags and convert different colors annotations to HSLA to allow transitions in skrollr.

How to use:
--------------

Include the plugin before ``skrollr.js`` and enjoy.  

    <script src="js/skroll-colors.min.js"></script>
    <!-- skroll.js code -->
    </body>
    
Now you can use codes like:

    <div 
        data-0="background-color: #000;"
      data-400="background-color: hsl(100,80%,90%,1);"
      data-top="background-color: rgba(255,255,255,1);">
        WHOOT
    </div>

Example:

[JSFiddle](http://jsfiddle.net/nL75k/1/)
