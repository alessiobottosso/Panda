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
        this.player = new game.Spine('spineboy.json');
        this.player.position.x = game.width / 2;
        this.player.position.y = game.height / 2;
        this.player.scale.x = 0.35;
        this.player.scale.y = 0.35;
        this.player.play('walk', true);
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
        var oldx = this.player.x;
        var oldy = this.player.y;
        
        //this.sprite.x += 25 * game.delta;
        
        // GRAPH DEBUG
        /*
        var grap = new game.Graphics();
        grap.lineWidth = 20;
        grap.drawRect(oldx, oldy, this.sprite.x - oldx, this.sprite.y - oldy);
        grap.addTo(this.container);
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
            var accel = game.input.motion.accelerationIncludingGravity;
            //this.sprite.x = game.width / 2 - accel.x * 20;
            //this.sprite.y = game.height / 2 - accel.y * 20;
    
            if (accel.y > maxY)
            {
                maxY = accel.y;
            }
            if (accel.y < minY)
            {
                minY = accel.y;
            }
    
            //myText.text = "Max Y: " + maxY + " - Min Y: " + minY;
    
            if (accel.y >= 15 || accel.y <= -15)
            {
                myText.text = "VIBRATE";
                navigator.vibrate(5);
                
                if (this.player.isWalking === true)
                {
                    //this.sprite.y += 200 * game.delta;
                    this.player.isWalking = false;
                    this.player.isRunning = true;
                    this.player.play('run', true);
                }
            }
            else
            {
                myText.text = "";
                
                if (this.player.isWalking === false)
                {
                    this.player.isRunning = false;
                    this.player.isWalking = true;
                    this.player.play('walk', true);
                }
            }
        }
    }
});

});
