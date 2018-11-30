game.module(
    'game.tutorial'
)
.require(
    'game.common',
    'plugin.essentials'
)
.body(function() {

    game.createScene('Tutorial', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
    	    AddForegroundUI();
    	    game.startSent=false;
    	    game.startReceived=false;
            this.page=1;
            this.text = CreateText("TUTORIAL",HALF_WIDTH,
            0.025*game.height,0,35)
            this.text.addTo(game.scene.stage)

            
            var s = new game.Sprite(TEXTBOX)
            s.x = HALF_WIDTH
            s.y = game.height*0.18
            s.anchorCenter();
            s.addTo(game.scene.stage);
            
            var s = new game.Sprite(GREEK_UP)
            s.x = HALF_WIDTH
            s.y = game.height*0.335
            s.anchorCenter();
            s.addTo(game.scene.stage);

            var s = new game.Sprite('block.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.62
            s.scale.y=5.9;
            s.scale.x=8;
            s.anchorCenter();
            s.addTo(game.scene.stage);
    	    
            var s = new game.Sprite(GREEK_DOWN)
            s.x = HALF_WIDTH
            s.y = game.height*0.891
            s.anchorCenter();
            s.addTo(game.scene.stage);

            //Localized images
            var s1 = GetLocalizedPath(TUTORIAL1) + '.png';
            var s2 = GetLocalizedPath(TUTORIAL2) + '.png';
            var s3 = GetLocalizedPath(TUTORIAL3) + '.png';

            var s = new game.Sprite(s1)
            s.x = HALF_WIDTH
            s.y = game.height*0.622
            s.scale.y=1;
            s.scale.x=1;
            s.alpha=0;
            s.anchorCenter();
            s.addTo(game.scene.stage);
            this.tutorial1=s;

            var s = new game.Sprite(s2)
            s.x = HALF_WIDTH
            s.y = game.height*0.622
            s.scale.y=1;
            s.scale.x=1;
            s.alpha=0;
            s.anchorCenter();
            s.addTo(game.scene.stage);
            this.tutorial2=s;

            var s = new game.Sprite(s3)
            s.x = HALF_WIDTH
            s.y = game.height*0.622
            s.scale.y=1;
            s.scale.x=1;
            s.alpha=0;
            s.anchorCenter();
            s.addTo(game.scene.stage);
            this.tutorial3=s;

            this.writePage();



            // this.button = new CreateDefaultButton(
            // HALF_WIDTH,0.95*game.height,"START",30,
            // function()
            // {  
            //     game.scene.start();
            // });

            this.button = CreateDefault1Button(1.9*HALF_WIDTH,
            0.95*game.height,"x",1,
            function()
            {
                game.scene.doPress();
            });
            
           this.button = new CreateDefaultButton(
            HALF_WIDTH,0.95*game.height,GetLocalizedString("SKIP"),30,
            function()
            {  
                game.scene.start();
            });
            //GoToScene('Main');
            this.timer = 0
            this.tutorial1.alpha=1;
            
            // var s = new game.Sprite(PAGE)
            // s.x = HALF_WIDTH
            // s.y = game.height*0.5
            // s.alpha =0.1
            // s.anchorCenter();
            // s.addTo(game.scene.stage);

    	},
    	writePage:function()
    	{
            //var message1 ="HOW to JUMP and DOUBLE JUMP - Click on\nyour screen once in order to perform a jump\nClick on your screen twice to perform a double\njump and reach higher platforms.";
            var message1 = GetLocalizedString("TUTORIAL1")
            var message2 = GetLocalizedString("TUTORIAL2")
            var message3 = GetLocalizedString("TUTORIAL3")
            //var message2 ="HOLES and STARS - Be careful to not fall into the\nfloor's holes! Your time will decrease every time\nyou fall.\nCollecting the stars will increase your\navailable time.";
            //var message3 ="COLLECT THE XMAS PRESENTS - Collect\nall the presents you can to improve\nyour score.";

            if(game.scene.message) game.scene.message.remove();
            var message="";
            if(game.scene.page==1)
            {
                message = message1;
                game.scene.tutorial3.alpha=0;
                game.scene.tutorial2.alpha=0;
                game.scene.tutorial1.alpha=1;
            }
            if(game.scene.page==2)
            {
                message = message2;
                game.scene.tutorial1.alpha=0;
                game.scene.tutorial2.alpha=1;
                game.scene.tutorial3.alpha=0;
            }
            if(game.scene.page==3)
            {
                message = message3;
                game.scene.tutorial1.alpha=0;
                game.scene.tutorial2.alpha=0;
                game.scene.tutorial3.alpha=1;
            }
            game.scene.message = CreateText(
                message
                ,HALF_WIDTH*0.2,
                
            0.111*game.height,0,22)
    	    //this.text.anchorCenter();
    	    game.scene.message.anchor.set(0,0)
    	    game.scene.message.align = 'left';
	        game.scene.message.updateText();

            game.scene.message.addTo(game.scene.stage)

    	},
    	nextPage:function()
    	{
    	    this.page++;
    	    if(this.page ==4)
    	    {
    	        game.scene.start();
    	    }
            else
            {
    	        this.writePage();
                
            }
    	},
    	start:function()
    	{
    	    if (game.playingIntro2)
            {
                game.intro2Music.stop();
                game.playingIntro2 = false;
            }
    	    
    	    StartGame();
    	    //GoToScene("Main");
    	},
    	update:function()
    	{
    	    CommonUpdate();
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
    	mousedown:function(x,y)
    	{
    	    if(y<game.height*0.9)
    	    game.scene.doPress();
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
