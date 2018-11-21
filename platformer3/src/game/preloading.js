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
    	    if (!Date.now) 
    	    {
                Date.now = function() { return new Date().getTime(); }
            }
            var json= game.getJSON("localization.json"); 
            game.localizedTexts = json.localizedTexts;
            
            game.locale ="it_IT"
            game.name = "Name.Surname88"
            FR_PLAYERID="app_juve.testUser.00" 
            
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
                //GoToScene('Tutorial');
            }
    	},
    	update:function()
        {
    	    CommonUpdate();
        }

    });
});

