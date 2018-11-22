game.module(
    'game.outro'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.createScene('Outro', 
    {
        gravity: 2000,
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
    	    game.outroMusic.play();

    	    this.world = new game.Physics();
            this.world.gravity.y = this.gravity;
            
            var body = new game.Body();
            body.collisionGroup = 0;
            var x = 1100;
            var y = game.height * 0.778;
            body.position.set(x, y);
            body.static = true;
            var shape = new game.Rectangle(2000, game.height * 0.1);
            body.addShape(shape);
            body.collide = this.collide.bind(body);
            body.addTo(game.scene.world);
            
            var body = new game.Body();
            body.collisionGroup = 99;
            var x = 1275;
            var y = game.height * 0.65;
            body.position.set(x, y);
            body.static = true;
            var shape = new game.Rectangle(1925, game.height * 0.1);
            body.addShape(shape);
            body.collide = this.collide.bind(body);
            body.addTo(game.scene.world);

    	    this.timer = 0;
            this.page = 1;

            var score = 0

            if(FR_SCORE)
                score = FR_SCORE;
    	    
            PlayCinematic(INTRO_OUTRO_JSON, OUTRO, 
                HALF_WIDTH, game.height*0.5);
        this.button = CreateDefaultButton(1*HALF_WIDTH,
            0.95*game.height,"RESTART",30,
            function()
            {
                game.scene.start();
            });

            // Create dummy AI player
            this.player = new game.Player(-200, game.height*0.75);
            this.player.sprite.addTo(this.stage);
            this.player.jump();
        this.button1 = CreateDefaultButton(1*HALF_WIDTH,
            0.05*game.height,"SHARE",30,
            function()
            {
                try
                {
                    if(app_juve)
                    {
                        app_juve.shareCard(FR_SCORE, game.selectIdx, "playerSelectedName");
                    }
                }
                catch(ex)
                {
                    console.log(ex)
                }
            });

            /*
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
            */

            this.text = CreateText(score,HALF_WIDTH,
            0.295*game.height,0,95)
            SetColor(this.text, COLOR_BLACK)
            this.text.addTo(game.scene.stage)

        AddForegroundUI();
            
        this.writePage()
    	},
    	
    	jumpVfx:function(x,y)
        {},
        
        collide: function(body, dir) 
        {
            this.player.alive = false;
        },
    	
    	writePage:function()
    	{
    	    /*
            if(game.scene.message) game.scene.message.remove()
            game.scene.message = CreateText(
                this.page
                ,HALF_WIDTH*0.2,
                
            0.111*game.height,0,50)
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
                this.text.setText("");
                NextCinematic();
    	        this.writePage();
            }
    	},
    	
	    start:function()
    	{
    	    game.outroMusic.stop();
    	    GoToScene("Select")
    	},
    	
    	update:function()
    	{
    	    CommonUpdate();
    	},
    	
    	mousedown:function(x,y)
    	{
    	    if(y<game.height*0.9 && y>game.height*0.2)
    	    
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
