game.module(
    'game.intro'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {
    
    game.addAsset("Placeholder_Intro.png");
    
    game.createScene('Intro', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
        this.text = new game.Text("00 - Intro");
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)


        this.button = CreateDefault1Button(1.8*HALF_WIDTH,
            0.95*game.height,"x",1,
            function()
            {
                game.scene.doPress();
            });

        var s = new game.Sprite("Placeholder_Intro.png")
            s.x = HALF_WIDTH
            s.y = game.height*0.5
            s.scale.y=1;
            s.scale.x=1;
            s.alpha=1;
            s.anchorCenter();
            s.addTo(game.scene.stage);
            this.tutorial1=s;

        
        this.timer=0;
        this.page=1;
        AddForegroundUI();
        this.writePage()
    	},
    	writePage:function()
    	{
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
    	    GoToScene("Select")
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
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                this.doPress();
            }
        },
    });


});
