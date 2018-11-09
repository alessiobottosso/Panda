 game.module(
    'game.main'
)
.body(function() {
    
game.addAsset('bg.jpg');
game.addAsset('layer_01.png');
game.addAsset('layer_02.png');
game.addAsset('layer_03.png');
game.addAsset('layer_04.png');
game.addAsset('layer_05.png');
game.addAsset('layer_06.png');
game.addAsset('layer_07.png');
game.addAsset('layer_08.png');


game.addAsset('obstacle.png');
game.addAsset('player.atlas');

game.createScene('Main', {
    init: function() {
        this.layers =[];
        this.layers.push("layer_08.png");
        this.layers.push("layer_07.png");
        this.layers.push("layer_06.png");
        this.layers.push("layer_05.png");
        this.layers.push("layer_04.png");
        this.layers.push("layer_03.png");
        this.layers.push("layer_02.png");
        this.layers.push("layer_01.png");

        this.world = new game.Physics();
        this.world.gravity.y = 2000;
        
        var body = new game.Body();
        var shape = new game.Rectangle();
        shape.width = game.width;
        shape.height = 60;
        
        body.position.x = game.width / 2;
        body.position.y = game.height - 110;
        body.collisionGroup = 1;
        body.mass=0;
        //body.static = true;
        body.addShape(shape);
        body.addTo(this.world);
        this.floor = body;
        
        this.bgLayer=[];    
        this.layers.forEach(function(element) {
        
        var layer = new game.TilingSprite(element);
        layer.addTo(game.scene.stage);
        game.scene.bgLayer.push(layer);
                
        });
        
        this.obstacleLayer = new game.Container();
        this.playerLayer = new game.Container();
        this.obstacleLayer.addTo(this.stage);
        this.playerLayer.addTo(this.stage);
        
        this.player = new game.Player();
        this.player.sprite.addTo(this.playerLayer);
        this.heightdispl = 0;
        game.Timer.add(2000, this.spawnObstacle.bind(this), true);
        game.Timer.add(3000, this.changeHeight.bind(this), true);
        this.displacement=0;
    },
    
    spawnObstacle: function() {
        var obstacle = new game.Obstacle();
    },
    
    changeHeight: function() {
        //var obstacle = new game.Obstacle();
        if(!this.changed)
        {
            this.changed=0;
        }
        this.changed++;
        this.heightdispl = this.changed*10;
        game.scene.floor.position.y = game.height - 110 - this.heightdispl;
    },
    
    mousedown: function() {
        this.player.jump();
    },
    
    update: function() {
        var i=0;

        var newDisplacement = 765.5 - game.scene.player.sprite.y;
        var disp = this.displacement -  newDisplacement
        this.displacement = newDisplacement;
        
        console.log(disp)
        
        this.bgLayer.forEach(function(element) 
        {
        element.tilePosition.x -= (i*75+-25) * game.delta;
        element.tilePosition.y-= (game.scene.bgLayer.length -i)*(disp/50)
        ++i;
        });

    }
});

game.createClass('Player', {
    init: function() {
        this.sprite = new game.Animation('player.atlas');
        this.sprite.speed = 15;
        this.sprite.play();
        this.sprite.anchorCenter();
        
        this.body = new game.Body();
        this.body.position.x = 200;
        this.body.position.y = 300;
        this.body.collideAgainst = [1, 2];
        this.body.velocityLimit.y = 1400;
        var shape = new game.Rectangle();
        shape.width = this.sprite.width;
        shape.height = this.sprite.height;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);
        
        this.body.collide = this.collide.bind(this);
        this.jumps=0;
    },
    
    collide: function(other) {
        if (other.collisionGroup === 1) {
            this.onGround = true;
            this.body.mass = 0;
            this.body.velocity.y = 0;
            this.jumps = 0;
            return true;
        }
        else if (other.collisionGroup === 2) {
            this.body.collideAgainst.length = 0;
            this.body.velocity.y = -600;
            this.body.mass = 1;
            this.sprite.stop();
            
            game.Timer.add(3000, function() {
                game.system.setScene('Main');
            });
            
            this.dead = true;
        }
    },
    
    jump: function() {
        if (this.dead === true) return;
        if(this.jumps > 1)
        {
            return;
        }
        this.jumps++;
        this.body.velocity.y = -1400;
        this.body.mass = 1;
        this.onGround = false;
    },
    
    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
    }
});

game.createClass('Obstacle', {
    init: function() {
        this.sprite = new game.Sprite('obstacle.png');
        this.sprite.addTo(game.scene.obstacleLayer);
        this.sprite.anchorCenter();
        
        this.body = new game.Body();
        var shape = new game.Rectangle();
        shape.width = this.sprite.width;
        shape.height = this.sprite.height;
        this.body.velocity.x = -500;
        this.body.mass = 0;
        this.body.position.x = game.width + shape.width / 2;
        this.body.position.y = game.height -120 - game.scene.heightdispl - shape.height / 2;
        this.body.collisionGroup = 2;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);
    },
    
    remove: function() {
        this.sprite.remove();
        this.body.remove();
        game.scene.removeObject(this);
        if (!game.scene.player.dead &&game.scene.addScore)  game.scene.addScore();
    },
    
    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
        if (this.sprite.position.x + this.sprite.width / 2 < 0) this.remove();
    }
});

});
