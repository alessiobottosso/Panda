game.module(
    'game.preloading'
)
.require(
    'game.common',
)

.body(function() 
{
    game.createScene('Preloading', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
            HALF_WIDTH = game.width / 2;
            game.Input.clickTimeout = 60000;
            LoadMute();

            if(LEVEL_DESIGN!="")
            {
                TestLevel=true;
                GoToScene("Main");
            }
            else
            {
                
                GoToScene('Intro');
            }
    	},
    	update:function()
        {
    	    CommonUpdate();
        }

    });
});

