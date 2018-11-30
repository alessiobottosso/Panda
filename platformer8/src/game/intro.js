game.module(
    'game.intro'
)
.require(
    'game.common',
    'plugin.essentials'
)
.body(function() {
    
    game.createScene('Intro', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
    	    game.playingIntro1 = false;
    	    game.playingIntro2 = false;
    	    
    	    PlayMusic(game.introMusic);
    	    game.playingIntro1 = true;
       
            this.timer = 0;
            this.page = 1;

            PlayCinematic(INTRO_OUTRO_JSON, INTRO, 
                HALF_WIDTH, game.height*0.5);

        this.button = CreateDefault1Button(1.8*HALF_WIDTH,
            0.95*game.height,"x",1,
            function()
            {
                game.scene.doPress();
            });
            
        var skip = GetLocalizedString("SKIP");

        var button = new game.ForgeButton(BUTTON_ACTIVE, BUTTON_PRESSED, BUTTON_DISABLED,
            HALF_WIDTH,0.95*game.height,skip,{},30,
            COLOR_BLACK,COLOR_YELLOW,COLOR_DARKDARKGRAY,
            function()
            {  
                game.scene.start();
            });
            SetDefaultButtonBehavior(button, 100);
            
        this.container = new game.Container();
        this.container.addTo(game.scene.stage);
        this.container.alpha=0;
        button.addTo(this.container);
        this.button1=button
        this.button1.sprite2.buttonMode = false;
        this.button1.setEnable(false);
        AddForegroundUI();

        this.writePage()
    	},
    	
    	writePage:function()
    	{
    	    /*
            if(game.scene.message) game.scene.message.remove()
            game.scene.message = CreateText(
                this.page
                ,HALF_WIDTH*0.2,
                
            0.085*game.height,0,60)
    	    //this.text.anchorCenter();
    	    game.scene.message.anchor.set(0,0)
    	    game.scene.message.align = 'left';
	        game.scene.message.updateText();

            game.scene.message.addTo(game.scene.stage)
            */
    	},

    	nextPage:function()
    	{
    	    this.page++;
    	    if(this.page > game.cinematicSequence.length)
    	    {
    	        game.scene.start();
    	    }
            else
            {
                NextCinematic();
    	        this.writePage();
            }
    	},
    	
	    start:function()
    	{
    	    if (game.playingIntro1 == true)
    	    {
    	        game.introMusic.stop();
    	        game.playingIntro1 = false;
    	    }
    	   // if (game.playingIntro2 == false)
    	   // {
    	   //     game.playingIntro2 = true;
    	   //     game.intro2Music.play();
    	   // }
    	    
    	    GoToScene("Select")
    	},
    	
    	update:function()
    	{
    	    CommonUpdate();
    	},
    	
    	mousedown:function(x,y)
    	{
    	    if(y<game.height*0.9)
    	    game.scene.doPress();
    	},
    	
    	doPress:function()
    	{
    	    if(this.button1)
    	    {
    	        this.container.alpha=1;
    	        this.button1.sprite2.buttonMode = true;
                this.button1.setEnable(true);
    	    }
    	    
    	    var timeDiff = Date.now() - this.timer
    	    this.timer=Date.now();
    	    //console.log(timeDiff)//RME
            if(timeDiff > 300)
            {
                this.nextPage();
            }
            else
            {
                game.scene.start();
            }
    	},
    	
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                this.doPress();
            }
        },
    });


});
