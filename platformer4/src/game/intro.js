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
    	    game.introMusic.play()
    	    //game.intro2Music.play()
       
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
       this.button = new CreateDefaultButton(
            1*HALF_WIDTH,0.95*game.height,skip,30,
            function()
            {  
                game.scene.start();
            });

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
    	    game.introMusic.stop()
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
