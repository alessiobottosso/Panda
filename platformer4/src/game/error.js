game.module(
    'game.error'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    //game.addAsset("Placeholder_Ending.png");
    
    game.createScene('Error', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
            this.text = CreateText("05 - Error", HALF_WIDTH,
            0.09*game.height,0,45)
            this.text.addTo(game.scene.stage)


        this.button = CreateDefaultButton(1*HALF_WIDTH,
            0.95*game.height,"RESTART",30,
            function()
            {
                game.scene.start();
            });

        // var s = new game.Sprite("Placeholder_Ending.png")
        //     s.x = HALF_WIDTH
        //     s.y = game.height*0.5
        //     s.scale.y=1;
        //     s.scale.x=1;
        //     s.alpha=1;
        //     s.anchorCenter();
        //     s.addTo(game.scene.stage);
             this.tutorial1=s;

        AddForegroundUI();
    	},
	    start:function()
    	{
    	    GoToScene("Select")
    	},
    	update:function()
    	{
    	    CommonUpdate();
    	},
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                game.scene.start();
            }
        },
    });


});
