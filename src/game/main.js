game.module(
    'game.main'
)
.require(
    'plugin.spine'
)
.body(function() {

game.addAsset('panda.png');
game.addAsset('spineboy.atlas');
game.addAsset('spineboy.json');

game.createScene('Main', {
    init: function() 
    {
        this.world = new game.Physics();
        this.world.gravity.y = 0;
        
        this.player = new game.Spine('spineboy.json');
        this.player.position.x = game.width / 2;
        this.player.position.y = game.height / 2;
        this.player.scale.x = 0.35;
        this.player.scale.y = 0.35;
        this.player.play('walk', true);
        
        this.body = new game.Body();
        this.body.position.set(
            this.player.position.x, 
            this.player.position.y );
            
        this.body.velocityLimit.y = 10000;
        
        this.body.mass = 1;
        
        var shape = new game.Rectangle();
        shape.width = this.player.width;
        shape.height = this.player.height;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);
        
        
        this.player.addTo(this.stage);
        
        this.player.isWalking = true;
        this.player.isRunning = false;
        
        //this.container = new game.Container();
        //this.container.addTo(this.stage);
        
        //this.sprite = new game.Sprite('panda.png');
        //this.sprite.anchorCenter();
        //this.sprite.addTo(this.stage);
        
        //this.sprite.x = game.width / 2;
        //this.sprite.y = game.height / 2;
        
        //this.sprite.addTo(this.container);

        myText = new game.SystemText('Hello Panda');
        myText.addTo(this.stage);

        maxY = 0;
        minY = 0;
        
        //var camera = new game.Camera(this.sprite);
        //camera.addTo(this.container);
    },
    
    update: function() 
    {
        this.player.position.copy(this.body.position);
        this.player.position.y += 100;
        
        var width  = this.body.shape.width / 2;
        var height = this.body.shape.height / 2;	
        
        // Top		
        if(this.body.position.y - height < 0) {			
            this.body.position.y -= this.body.position.y - height;			
            this.body.velocity.y *= -0.95;	
            navigator.vibrate(2);
        }       	
        
        // Bottom
        if(this.body.position.y + height > game.system.height) 
        {			
            this.body.position.y += game.system.height - this.body.position.y - height;			
            this.body.velocity.y *= -0.95;	
            navigator.vibrate(2);
        }
        
        // right		
        if(this.body.position.x + width > game.system.width) 
        {			
            this.body.position.x += game.system.width - this.body.position.x - width;			
            this.body.velocity.x *= -0.95;	
            navigator.vibrate(2);
        }
        
        if(this.body.position.x - width < 0) 
        {			
	        this.body.position.x -= this.body.position.x - width;			
	        this.body.velocity.x *= -0.95;	
	        navigator.vibrate(2);
        }	
        
        var oldx = this.player.x;
        var oldy = this.player.y;
        
        //this.sprite.x += 25 * game.delta;
        
        // GRAPH DEBUG
        /*
        var grap = new game.Graphics();
        grap.lineWidth = 2;
        grap.lineColor = '#ff0000';
        grap.drawLine(oldx, oldy, this.player.x, this.player.y);
        */
        
        if (!game.input.motion) 
        {
            // EDITOR
            if (game.keyboard.down('UP')) 
            {
                //this.sprite.y -= 200 * game.delta;
                if (this.player.isWalking === true)
                {
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
                if (this.body.velocity.y >= 0)
                {
                    this.body.velocity.y += 50;	
                }
                else
                {
                    this.body.velocity.y -= 50;	
                }
            }
            else if (game.keyboard.down('DOWN'))
            {
                if (this.player.isWalking === true)
                {
                    //this.sprite.y += 200 * game.delta;
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
                if (this.body.velocity.y >= 0)
                {
                    this.body.velocity.y += 50;	
                }
                else
                {
                    this.body.velocity.y -= 50;	
                }
            }
            else if (game.keyboard.down('RIGHT'))
            {
                if (this.player.isWalking === true)
                {
                    //this.sprite.y += 200 * game.delta;
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
                if (this.body.velocity.x >= 0)
                {
                    this.body.velocity.x += 50;	
                }
                else
                {
                    this.body.velocity.x -= 50;	
                }
            }
            else if (game.keyboard.down('LEFT'))
            {
                if (this.player.isWalking === true)
                {
                    //this.sprite.y += 200 * game.delta;
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
                if (this.body.velocity.x >= 0)
                {
                    this.body.velocity.x += 50;	
                }
                else
                {
                    this.body.velocity.x -= 50;	
                }
            }
            
            else
            {
                //this.player.play('walk', true);
                if (this.player.isWalking === false)
                {
                    this.player.isRunning = false;
                    this.player.isWalking = true;
                    this.player.play('walk', true);
                }
            }
        }
        else
        {
            var accel = game.input.motion.acceleration;
            //this.player.x = game.width / 2 - accel.x * 20;
            //this.player.y = game.height / 2 - accel.y * 20;
            /*
            if (accel.y > maxY)
            {
                maxY = accel.y;
            }
            if (accel.y < minY)
            {
                minY = accel.y;
            }
            */
            
            if (accel.x >= 10)
            {
                if (this.body.velocity.y >= 0)
                {
                    this.body.velocity.x += 500;	
                }
                else
                {
                    this.body.velocity.x -= 500;	
                }
            }
            
            if (accel.y >= 10)
            {
                if (this.body.velocity.y >= 0)
                {
                    this.body.velocity.y += 500;	
                }
                else
                {
                    this.body.velocity.y -= 500;	
                }
            }
    
            //myText.text = "Max Y: " + maxY + " - Min Y: " + minY;
            //myText.text = game.debug.fps;

            if (accel.y >= 15 || accel.y <= -15)
            {
                //myText.text = "VIBRATE";
                //navigator.vibrate(1);
                /*
                if (this.player.isWalking === true)
                {
                    //this.sprite.y += 200 * game.delta;
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
                */
            }
            else
            {
                /*
                myText.text = "";
                
                if (this.player.isWalking === false)
                {
                    this.player.isRunning = false;
                    this.player.isWalking = true;
                    this.player.play('walk', true);
                }
                */
            }
        }
    }
});

});
