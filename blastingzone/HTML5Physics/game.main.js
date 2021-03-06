/**
 * Created by MorningWind on 8/27/2015.
 */
// ref : http://www.goodboydigital.com/pixi-js-tutorial-getting-started/
// ref : https://github.com/jquery-boilerplate/jquery-boilerplate


;(function ($, window, document, undefined) {
    var gameName = "WebGame";
    defaults = {
        canvasSize: {x:640, y:690}
    };

    function Game( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = gameName;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Game.prototype, {
        init: function () {
            this.stage = new PIXI.Stage(0x334499);

            this.scene = new PIXI.DisplayObjectContainer();
            this.stage.addChild(this.scene);

            this.renderer = PIXI.autoDetectRenderer(defaults.canvasSize.x, defaults.canvasSize.y);

            $(this.element).append(this.renderer.view);

            requestAnimationFrame(this.animate.bind(this));

            this.loadAssets();

        },
        loadAssets:function(){
            var loader = new PIXI.AssetLoader(['assets/interface.json']);
            loader.onComplete = this.onLoadAssets.bind(this);

            loader.load();
        },
        onLoadAssets:function(){
            var texture = PIXI.Texture.fromImage('bg.png');
            var paperBG = new PIXI.Sprite(texture);
            this.scene.addChild(paperBG);
        },
        animate: function(){
            requestAnimationFrame(this.animate.bind(this));

            this.renderer.render(this.stage);
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ gameName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + gameName ) ) {
                $.data( this, "plugin_" + gameName, new Game( this, options ) );
            }
        });
    };

})( jQuery, window, document );

function PIXITest()
{
    var stage = new PIXI.Container();

    var renderer = PIXI.autoDetectRenderer(1800, 1200);

    document.body.appendChild(renderer.view);

    var planet;
    var smallPlanet;

    PIXI.loader.add('planet', 'planet.png').load(function(loader, resources){
        planet = new PIXI.Sprite(resources.planet.texture);
        smallPlanet = new PIXI.Sprite(resources.planet.texture);

        planet.anchor.x = 0.5;
        planet.anchor.y = 0.5;

        smallPlanet.anchor.x = 1.0;
        smallPlanet.anchor.y = 1.0;

        planet.position.x = 900;
        planet.position.y = 600;

        smallPlanet.position.x = 300;
        smallPlanet.position.y = 300;

        smallPlanet.scale.x = 0.5;
        smallPlanet.scale.y = 0.5;

        stage.addChild(planet);
        stage.addChild(smallPlanet);

        animate();
    });

    function animate() {

        requestAnimationFrame( animate );

        planet.rotation += 0.01;
        smallPlanet.rotation += 0.05;
        // render the stage
        renderer.render(stage);
    }

}

