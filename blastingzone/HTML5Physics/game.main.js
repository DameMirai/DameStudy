/**
 * Created by MorningWind on 8/27/2015.
 */
// ref : http://www.goodboydigital.com/pixi-js-tutorial-getting-started/
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