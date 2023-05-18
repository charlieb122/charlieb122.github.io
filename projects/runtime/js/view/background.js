var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
      var trees = [];
      var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight, '#403d4a');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var moon = draw.bitmap("img/moonpng.png");
        moon.x = 1000;
        moon.y = 20;
        moon.scaleX = .30;
        moon.scaleY = .30;
        background.addChild(moon);

        for(var i = 0; i < 100; i++){
            var circle = draw.circle(1, "white", "LightGray", 2);
        circle.x = canvasWidth * Math.random();
        circle.y = groundY * Math.random();
        background.addChild(circle);
        }
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var grass = draw.rect(canvasWidth, groundY, '#1a4538');
            grass.y = groundY - 40;
            background.addChild(grass)

        for (var i = 0; i < 8; ++i) {
            var building = draw.bitmap("img/treepng.png");
            building.x = 200 * i;
            building.y = groundY - 380;
            background.addChild(building);
            buildings.push(building);
        }
        

            // TODO 3: Part 1 - Add a tree
        for(var i = 0; i < 8; i++){
            var tree = draw.bitmap("img/treepng.png");
            tree.y = groundY - 360;
            tree.x = 200 * i;
            background.addChild(tree);
            trees.push(tree);
        }
        
        

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
       // tree.x = tree.x - 1;
        
        //if (tree.x < -200) {
        //tree.x = canvasWidth;
        //}
            
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < trees.length; i++){
                var tree1 = trees[i];
                var edge = tree1.x + 220;
                tree1.x -= .3;
                if(edge < 0) {
                    tree1.x = canvasWidth;
                }
            }
            for(var i = 0; i < buildings.length; i++) {
                var building1 = buildings[i];
                var edge = building1.x + 220;
                building1.x -= .1;
                if(edge < 0) {
                    building1.x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
