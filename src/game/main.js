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
game.addAsset('button.png');

game.createScene('Main', {
    init: function() 
    {
        // Physics world for collisions
        this.world = new game.Physics();
        this.world.gravity.y = 0;
        
        // Walls
        var bottomBody = new game.Body();
        var bottomShape = new game.Rectangle();
        bottomShape.width = game.width;
        bottomShape.height = 1;
        bottomBody.position.x = game.width / 2;
        bottomBody.position.y = game.height;
        bottomBody.collisionGroup = 1;
        bottomBody.static = true;
        
        var upperBody = new game.Body();
        var upperShape = new game.Rectangle();
        upperShape.width = game.width;
        upperShape.height = 1;
        upperBody.position.x = game.width / 2;
        upperBody.position.y = 0;
        upperBody.collisionGroup = 1;
        upperBody.static = true;
        
        var leftBody = new game.Body();
        var leftShape = new game.Rectangle();
        leftShape.width = 2;
        leftShape.height = game.height;
        leftBody.position.x = 0;
        leftBody.position.y = game.height / 2;
        leftBody.collisionGroup = 2;
        leftBody.static = true;
        
        var rightBody = new game.Body();
        var rightShape = new game.Rectangle();
        rightShape.width = 2;
        rightShape.height = game.height;
        rightBody.position.x = game.width;
        rightBody.position.y = game.height / 2;
        rightBody.collisionGroup = 2;
        rightBody.static = true;
        
        bottomBody.addShape(bottomShape);
        bottomBody.addTo(this.world);
        upperBody.addShape(upperShape);
        upperBody.addTo(this.world);
        leftBody.addShape(leftShape);
        leftBody.addTo(this.world);
        rightBody.addShape(rightShape);
        rightBody.addTo(this.world);
        
        // Creates the spine Object
        this.player = new game.Spine('spineboy.json');
        this.player.scale.x = 0.5;
        this.player.scale.y = 0.5;
        // Position it to the center of the screen
        this.player.position.x = game.width / 2;
        this.player.position.y = game.height / 2;
        // Set the looped walk animation
        this.player.play('walk', true);
        
        // Creates the physics body
        this.body = new game.Body();
        this.body.position.set(
            this.player.position.x, 
            this.player.position.y );
            
        this.body.velocityLimit.y = 10000;
        this.body.damping = 0.3;
        this.body.mass = 1;
        
        // Creates the shape for the body
        //var shape = new game.Circle(this.player.width / 1.5);
        var shape = new game.Rectangle();
        shape.width = this.player.width;
        shape.height = this.player.height;

        this.body.addShape(shape);
        this.body.addTo(game.scene.world);
        
        this.body.collideAgainst = [1, 2];
        
        this.body.collide = this.collide.bind(this);
        
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
    
    collide: function(other)
    {
        var width  = this.body.shape.width / 2;
        var height = this.body.shape.height / 2;	
        
        // Top and bottoms walls
        if (other.collisionGroup === 1)
        {
            //Is colliding with the Floor
            //this.body.position.y -= this.body.position.y - height;
            if(this.body.position.y - height < 0) 
            {			
                this.body.position.y -= this.body.position.y - height;	
            }
            else if(this.body.position.y + height > game.system.height) 
            {			
                this.body.position.y += game.system.height - this.body.position.y - height;	
            }
            
            this.body.velocity.y *= -0.95;	
            navigator.vibrate(2);
            return true;
        }
        // Side walls
        else if (other.collisionGroup === 2)
        {
            if(this.body.position.x + width > game.system.width) 
            {			
                this.body.position.x += game.system.width - this.body.position.x - width;			
            }
            else if(this.body.position.x - width < 0) 
            {			
	            this.body.position.x -= this.body.position.x - width;	
            }
            
            //Is colliding with the sie walls
            this.body.velocity.x *= -0.95;	
            navigator.vibrate(2);
        }
    },
    
    update: function() 
    {
        //this.player.rotation += (this.body.velocity.x / 100) * game.delta;
        this.player.position.copy(this.body.position);
        this.player.position.y += 150;
        
        var width  = this.body.shape.width / 2;
        var height = this.body.shape.height / 2;	
        
        /*
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
        
        // Left
        if(this.body.position.x - width < 0) 
        {			
	        this.body.position.x -= this.body.position.x - width;			
	        this.body.velocity.x *= -0.95;	
	        navigator.vibrate(2);
        }	
        */
        
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
            
            if (accel.x >= 5)
            {
                if (this.body.velocity.y >= 0)
                {
                    this.body.velocity.x += 750;	
                }
                else
                {
                    this.body.velocity.x -= 750;	
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

game.createScene('Title', {
    backgroundColor: 'black',
    
    init: function() 
    {
        /*
        var logo = new game.Sprite('logo.png');
        logo.anchorCenter();
        logo.center(this.stage);
        logo.addTo(this.stage);
        logo.scale.x = 0;
        logo.scale.y = 0;   
        
        var tween = new game.Tween(logo.scale); // Pass the property to Tween
        // Define the tween target values
        tween.to(
            {
                x: 1,
                y: 1
            }, 500);
        
        tween.easing ('Back.Out');
        tween.start();
        */
        
        var button = new game.Button('button.png', function()
        {
            game.system.setScene('Main');
        });
        
        button.sprite.position.x = game.width / 2;
        button.sprite.position.y = 900;
        button.sprite.addTo(this.stage);
    }
});

game.createClass('Button', {
    init: function(texture, callback) 
    {
        this.callback = callback;
        this.sprite = new game.Sprite(texture);
        this.sprite.anchorCenter();
        this.sprite.interactive = true;
        this.sprite.mousedown = this.mousedown.bind(this);
        this.sprite.mouseup = this.mouseup.bind(this);
        this.sprite.mouseupoutside = this.mouseup.bind(this);
        this.sprite.click = this.click.bind(this);
    },
    
    mousedown: function()
    {
        this.sprite.scale.x = 0.9;
        this.sprite.scale.y = 0.9;
    },
    
    mouseup: function()
    {
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;
    },
    
    click: function()
    {
        if (typeof this.callback === 'function')
        {
            this.callback();
        }
    }
});

});
