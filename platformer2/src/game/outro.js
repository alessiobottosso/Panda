game.module(
    'game.outro'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.addAsset("Placeholder_Intro.png");
    
    game.createScene('Outro', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
            this.text = CreateText("04 - Outro",HALF_WIDTH,
            0.09*game.height,0,45)
            this.text.addTo(game.scene.stage)



        this.button = CreateDefaultButton(1*HALF_WIDTH,
            0.95*game.height,"Restart",30,
            function()
            {
                game.scene.start();
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

        var sheet = new game.SpriteSheet('player1.png', 128, 128);
        this.sprite = new game.Animation(sheet.textures);
        this.sprite.addAnim('stand', [0,0,11,0,12,12], { speed: 10, loop: true });
        this.sprite.addAnim('run', [0, 1, 2, 3,0,4,5,6], { speed: 12, loop: true });
        this.sprite.addAnim('jump', [7,8], { speed: 6, loop: false });
        this.sprite.addAnim('jump1', [9,10], { speed: 6 , loop: false });
        this.sprite.addAnim('feedback', [0,13,14,15,16,15,16], { speed: 6 , loop: true });

        
        this.sprite.anchorCenter();
        this.sprite.position.set(HALF_WIDTH*0.5, game.height*0.65);
        this.sprite.speed = 10;
        this.sprite.play('feedback');
        this.sprite.addTo(game.scene.stage)

        var score = 0
        
        if(game.score)
            score = game.score;
        
            this.text = CreateText(score,HALF_WIDTH,
            0.25*game.height,0,95)
            this.text.addTo(game.scene.stage)

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
