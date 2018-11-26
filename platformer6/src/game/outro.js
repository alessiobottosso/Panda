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
    	    this.playerSpawned = false;
    	    this.spawnDelay = 0.7;
    	    this.spawntimer = 0;
    	    
    	    this.scoreDelay = 0.5;
    	    this.scoreTimer = 0;
    	    
    	    this.shownScore = 0;
    	    
    	    this.hasFinished = false;
    	    
    	    PlayMusic(game.outroMusic);

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
            var shape = new game.Rectangle(2200, game.height * 0.1);
            body.addShape(shape);
            body.collide = this.collide.bind(body);
            body.addTo(game.scene.world);

    	    this.timer = 0;
            this.page = 1;

            this.score = 0;

            if(FR_SCORE)
                this.score = FR_SCORE;
    	    
            PlayCinematic(INTRO_OUTRO_JSON, OUTRO, 
                HALF_WIDTH, game.height*0.5);
            
            var label = GetLocalizedString("RESTART");
            this.button = CreateDefaultButton(1*HALF_WIDTH,
                0.95*game.height,label,30,
                function()
                {
                    if (game.playingScoreSound == true)
                    {
                        game.playingScoreSound = true;
                        if (game.scoreSound != null)
                        {
                            game.scoreSound.stop();
                        }
                    }
                    
                    game.scene.start();
                });
            
            var label = GetLocalizedString("SHARE");
            this.button1 = CreateDefaultButton(1*HALF_WIDTH,
                0.05*game.height,label,30,
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
                        app_juve.shareCard(FR_SCORE, 
                        game.selectIdx, game.gname ,FR_SESSIONID);
                    }
                });
                
            this.scoreStep = 0;
            
            if (this.score < 10)
            {
                this.scoreDelay = 0.5;
                this.scoreStep = 1;
            }
            else if (this.score < 50)
            {
                this.scoreDelay = 0.1;
                this.scoreStep = 1;
            }
            else if (this.score < 100)
            {
                this.scoreDelay = 0.05;
                this.scoreStep = 2;
            }
            else if (this.score < 500)
            {
                this.scoreDelay = 0.05;
                this.scoreStep = 5;
            }
            else
            {
                this.scoreDelay = 0.005;
                this.scoreStep = 10; 
            }
            
            this.scoreVisible = false;
            
            AddForegroundUI();
    	},
    	
    	displayScore: function()
    	{
            this.scoreText = CreateText(this.shownScore,HALF_WIDTH,
            0.295*game.height,0,95)
            SetColor(this.scoreText,COLOR_BLACK);
            this.scoreText.addTo(game.scene.stage)
            
            this.scoreVisible = true;
    	},
    	
    	jumpVfx:function(x,y)
        {},
        
        collide: function(body, dir) 
        {
            this.player.alive = false;
        },
    	
	    start:function()
    	{
    	    game.outroMusic.stop();
    	    GoToScene("Select")
    	},
    	
    	update:function()
    	{
    	    CommonUpdate();
    	    
    	    this.spawntimer += game.system.delta;
    	    
    	    if (this.playerSpawned == false && this.spawntimer >= this.spawnDelay)
    	    {
    	        this.playerSpawned = true;
    	        // Create dummy AI player
                this.player = new game.DummyPlayer(-300, game.height*0.75);
                this.player.sprite.addTo(this.stage);
                this.player.jump();
    	    }
    	    
    	    if (this.scoreVisible == true)
    	    {
        	    this.scoreTimer += game.system.delta;
        	    
        	    if (this.shownScore < this.score && 
        	        this.scoreTimer >= this.scoreDelay)
        	    {
        	        this.shownScore = Math.min (
        	                this.shownScore + this.scoreStep, 
        	                this.score);
        	                
        	        this.scoreStep;
        	        this.scoreTimer = 0;
        	        
        	        this.scoreText.setText("");
        	        this.scoreText = CreateText(this.shownScore,HALF_WIDTH,
                        0.295*game.height,0,95)
                    SetColor(this.scoreText,COLOR_BLACK);
                    this.scoreText.addTo(game.scene.stage)
        	    }
        	    else if (this.shownScore >= this.score)
        	    {
        	        if (game.playingScoreSound == true)
        	        {
        	            game.playingScoreSound = false;
        	            
        	            if (game.scoreSound != null)
        	            {
        	                game.scoreSound.stop();
        	            }
        	        }
        	        
        	        if (!this.hasFinished)
        	        {
        	            this.hasFinished = true;
        	            NextCinematic();
        	        }
        	    }
    	    }
    	},
    	
	
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                this.start();
            }
        },
    });
});
