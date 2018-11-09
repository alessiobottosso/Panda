game.module(
    'game.intro'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.createScene('Intro', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
        this.text = new game.Text("00 - Intro");
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)

        this.button = new game.ForgeButton(BUTTON_PRESSED, BUTTON_RELEASED,
            HALF_WIDTH,0.9*game.height,"skip",{},40,"#555555","#550055",
            ()=>
            {
                GoToScene('Select');
            });

        // this.button = new game.Button(BUTTON_PRESSED, 
        //     HALF_WIDTH,0.8*game.height,
        //     ()=>
        //     {
        //         GoToScene('Select');
        //     });
            
        //SetDefaultButtonBehavior(game.scene.button,100);
        this.button.addTo(game.scene.stage);
    
            //GoToScene('Main');
    	}
    });


});
