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
            game.name = "CRISTIAN.S0001"
            FR_PLAYERID="00000000000000.00000000"
            var loggedin = false;
            try
            {
                if(app_juve)
                {
                    if(app_juve.lang=="en")
                    {
                        game.locale="en_US"
                    }
                    if(app_juve.user)
                    {
                        if(app_juve.user.userID)
                        {
                           FR_PLAYERID = app_juve.user.userID
                           loggedin = true;
                        }
                        if(app_juve.user.nickname)
                        {
                            game.name = app_juve.user.nickname
                        }
                    }
                }
        	}
    	    catch(e)
    	    {
    	        console.log(e)
    	        loggedin = false;
    	    }
            
            HALF_WIDTH = game.width / 2;
            game.Input.clickTimeout = 60000;
            LoadMute();

            	    var music = new game.Music(MUSIC_MAIN);
            	    
            	    if(game.mute)
            	    {
            	        music.volume = 0;    
            	    }
            	    else
            	    {
                	    music.volume = MUSIC_VOLUME;    
            	    }
            	    
                    music.play();
    				game.music = music;

            if(LEVEL_DESIGN!="")
            {
                TestLevel=true;
                GoToScene("Main");
            }
            else
            {
                
                if(loggedin || FR_ALLOW_UNKNOW) GoToScene('Intro');
                //GoToScene('Tutorial');
            }
    	},
    	update:function()
        {
    	    CommonUpdate();
        }

    });
});

