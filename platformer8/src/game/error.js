game.module(
    'game.error'
)
.require(
    'game.common',
    'plugin.essentials'
)
.body(function() {

    //game.addAsset("Placeholder_Ending.png");
    
    game.createScene('Error', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
            var s = new game.Sprite(WINDOW_ERROR)
            s.x = HALF_WIDTH
            s.y = game.height*0.5
            s.anchorCenter();
            s.addTo(game.scene.stage);

            var message1 = GetLocalizedString("ERROR1")
            if(game.errorType==1)
            {
                message1 = GetLocalizedString("ERROR2")
            }

            game.scene.message = CreateText(
                message1
                ,HALF_WIDTH*0.39,
                
            0.42*game.height,0,29)
    	    //this.text.anchorCenter();
    	    game.scene.message.anchor.set(0,0)
    	    game.scene.message.align = 'left';
	        game.scene.message.updateText();
    	    SetColor(game.scene.message,COLOR_BLACK,1);

            game.scene.message.addTo(game.scene.stage)

        this.button = CreateDefaultButton(1*HALF_WIDTH,
            0.95*game.height,"RESTART",30,
            function()
            {
                game.scene.start();
            });


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
