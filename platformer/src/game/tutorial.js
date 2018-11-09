game.module(
    'game.tutorial'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.createScene('Tutorial', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
    	    console.log(BUTTON_PRESSED);
        this.text = new game.Text("02 - Tutorial");
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)

        this.button = new game.ForgeButton(BUTTON_PRESSED, BUTTON_RELEASED,
            HALF_WIDTH,0.9*game.height,"button",{},40,"#555555","#550055",function()
            {
                GoToScene('Main');
            });
        SetDefaultButtonBehavior(game.scene.button,100);
        this.button.addTo(game.scene.stage);
    
            //GoToScene('Main');
    	}
    });


});
