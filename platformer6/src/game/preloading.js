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
    	    game.gnames=[];
    	    game.gnames.push("Szczesny");
    	    game.gnames.push("Pinsolgio");
    	    game.gnames.push("Perin");
    	    game.gnames.push("De Sciglio");
    	    game.gnames.push("Chiellini");
    	    game.gnames.push("Benatia");
    	    game.gnames.push("Alex sandro");
    	    game.gnames.push("Barzagli");
    	    game.gnames.push("Bonucci");
    	    game.gnames.push("Cancelo");
    	    game.gnames.push("Rugani");
    	    game.gnames.push("Spiazzola");
    	    game.gnames.push("Pjanic");
    	    game.gnames.push("Khedira");
    	    game.gnames.push("Matuidi");
    	    game.gnames.push("Emre Can");
    	    game.gnames.push("Betancur");
    	    game.gnames.push("Ronaldo");
    	    game.gnames.push("Dybala");
    	    game.gnames.push("D.Costa");
    	    game.gnames.push("Cuadrado");
    	    game.gnames.push("Mandzukic");
    	    game.gnames.push("Kean");
    	    game.gnames.push("Bernardeschi");
    	    
    	    if (!Date.now) 
    	    {
                Date.now = function() { return new Date().getTime(); }
            }
            var json= game.getJSON("localization.json"); 
            game.localizedTexts = json.localizedTexts;
            
            game.locale ="it_IT"
            game.name = "CRISTIAN.S0001"
            game.gname = ""
            FR_PLAYERID="00000000000000.00000000"
            game.loggedin = false;
            
            SetLoginVars();
            
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
                
                if(game.loggedin || FR_ALLOW_UNKNOW)
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

function SetLoginVars()
{
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
                           game.loggedin = true;
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
    	        game.loggedin = false;
    	    }

}


