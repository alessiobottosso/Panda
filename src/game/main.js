game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() 
    {
        this.container = new game.Container();
        this.container.addTo(this.stage);
        
        this.sprite = new game.Sprite('panda.png');
        this.sprite.anchorCenter();
        //this.sprite.addTo(this.stage);
        
        this.sprite.x = game.width / 2;
        this.sprite.y = game.height / 2;
        
        this.sprite.addTo(this.container);

        myText = new game.SystemText('Hello Panda');
        myText.addTo(this.stage);

        maxY = 0;
        minY = 0;
        
        var camera = new game.Camera(this.sprite);
        camera.addTo(this.container);
    },
    
    update: function() 
    {
        var oldx = this.sprite.x;
        var oldy = this.sprite.y;
        
        this.sprite.x += 25 * game.delta;
        
        // GRAPH DEBUG
        var grap = new game.Graphics();
        grap.drawRect(oldx, oldy, this.sprite.x - oldx, this.sprite.y - oldy);
        grap.addTo(this.container);
        
        if (!game.input.motion) 
        {
            // EDITOR
            if (game.keyboard.down('UP')) this.sprite.y -= 200 * game.delta;
            if (game.keyboard.down('DOWN')) this.sprite.y += 200 * game.delta;
        }
        else
        {
            var accel = game.input.motion.accelerationIncludingGravity;
            //this.sprite.x = game.width / 2 - accel.x * 20;
            this.sprite.y = game.height / 2 - accel.y * 20;
    
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
            }
            else
            {
                myText.text = "";
            }
        }
    }
});

});
game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() 
    {
        this.container = new game.Container();
        this.container.addTo(this.stage);
        
        this.sprite = new game.Sprite('panda.png');
        this.sprite.anchorCenter();
        //this.sprite.addTo(this.stage);
        
        this.sprite.x = game.width / 2;
        this.sprite.y = game.height / 2;
        
        this.sprite.addTo(this.container);

        myText = new game.SystemText('Hello Panda');
        myText.addTo(this.stage);

        maxY = 0;
        minY = 0;
        
        var camera = new game.Camera(this.sprite);
        camera.addTo(this.container);
    },
    
    update: function() 
    {
        var oldx = this.sprite.x;
        var oldy = this.sprite.y;
        
        this.sprite.x += 25 * game.delta;
        
        // GRAPH DEBUG
        var grap = new game.Graphics();
        grap.lineWidth = 10;
        grap.drawRect(oldx, oldy, this.sprite.x - oldx, this.sprite.y - oldy);
        grap.addTo(this.container);
        
        if (!game.input.motion) 
        {
            // EDITOR
            if (game.keyboard.down('UP')) this.sprite.y -= 200 * game.delta;
            if (game.keyboard.down('DOWN')) this.sprite.y += 200 * game.delta;
        }
        else
        {
            var accel = game.input.motion.accelerationIncludingGravity;
            //this.sprite.x = game.width / 2 - accel.x * 20;
            this.sprite.y = game.height / 2 - accel.y * 20;
    
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
            }
            else
            {
                myText.text = "";
            }
        }
    }
});

});
