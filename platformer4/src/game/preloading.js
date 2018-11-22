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
            this.loggedin = false;
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
    	        this.loggedin = false;
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
            game.mainMusic = music;

    	    var music = new game.Music(MUSIC_INTRO);
    	    if(game.mute)
    	    {
    	        music.volume = 0;    
    	    }
    	    else
    	    {
        	    music.volume = MUSIC_VOLUME;    
    	    }
            game.introMusic = music;

    	    var music = new game.Music(MUSIC_INTRO2);
    	    if(game.mute)
    	    {
    	        music.volume = 0;    
    	    }
    	    else
    	    {
        	    music.volume = MUSIC_VOLUME;    
    	    }
            game.intro2Music = music;

    	    var music = new game.Music(MUSIC_OUTRO);
    	    if(game.mute)
    	    {
    	        music.volume = 0;    
    	    }
    	    else
    	    {
        	    music.volume = MUSIC_VOLUME;    
    	    }
            game.outroMusic = music;
            
            //game.mainMusic.play();
			
    //         var objs=[]
    //         var resource=""
    //         objs.push(GetLocalizedPath(resource) + '.png');
    //     		Loader(objs,
    // 			(error)=>{console.log(error);EmergencyRestart();},
    // 			(percent)=>{
    // 			},
    // 			()=>{
    //
    // 				}
    // 			)
            this.postLoad();
    	},
    	postLoad:function()
    	{
            if(LEVEL_DESIGN!="")
            {
                TestLevel=true;
                GoToScene("Main");
                
            }
            else
            {
                
                if(this.loggedin || FR_ALLOW_UNKNOW) 
                //GoToScene("Select");
                GoToScene('Intro');
            }
    	    
    	},
    	update:function()
        {
    	    CommonUpdate();
        }

    });
});

