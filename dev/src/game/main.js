var NAME_SPINE ='Maurice_is_Shaken';
var CHECK=0;
//var NAME_SPINE ='spineboy';

game.module(
    'game.main'
)

// Required Plugins
.require(
    'plugin.spine',
    'plugin.essentials',
    'plugin.p2',
    'plugin.instantgames'
)

.body(function() {

// Required Assets
// Title Screen
game.addAsset('button1.png');
game.addAsset('button2.png');
game.addAsset('energyBut.png');
game.addAsset('click1.wav');
game.addAsset('click2.wav');
game.addAsset('Patrick.fnt');

// Gamplay Scene
game.addAsset(NAME_SPINE +'.atlas');
game.addAsset(NAME_SPINE +'.json');

// Main Menu Scene
game.createScene('MainMenu', {
    backgroundColor: '#ffce53',
    playerInfo: {},
    contextInfo: {},

    init: function()
    {
        game.Input.clickTimeout = 60000;
        // Instant Games Test
        this.playerInfo.id = FBInstant.player.getID();
        this.playerInfo.name = FBInstant.player.getName();
        console.log(this.playerInfo.name);
        this.energy = -1;
 
        GetData().then((data)=> {
            if(data.energy)
            {
                this.energy = data.energy;
                this.updateEnergyText(this.energyText);
                this.updateEnergyText(this.energyText1);
            }
        });
            
        /*
        var photo = new game.Sprite('playerPhoto');
        photo.width = 120;
        photo.height = 120;
        photo.position.set(10, 10);
        photo.addTo(this.stage);
        */
        
        // UI initialization
        this.startButton11 = new game.ForgeButton('button1.png','button2.png',0.5 * game.width, 0.2*game.height,
        'Refresh', {}, 100, 1, '#000000','#FFFFFF', function() {
                game.scene.updateEnergyText(game.scene.energyText);
                game.scene.updateEnergyText(game.scene.energyText1);

        });
        this.startButton11.addTo(this.stage)
        
        this.startButton = new game.ForgeButton('button1.png','button2.png',0.5 * game.width, 0.4*game.height,
        'SOLO PLAY', {}, 100, 1, '#000000','#FFFFFF', function() {
            if(game.scene.energy > 1)
            {
                game.scene.energy -=1;
                UpdateData(game.scene.energy);
                game.system.setScene('Gameplay');
                //game.system.setScene('MainMenu');
            }
        });
        
        this.energyText = this.createEnergyText(this.startButton.sprite2);
        this.energyText1 = this.createEnergyText(this.startButton.sprite);
        
        this.startButton.scaleSpeed =500;
        this.startButton.scaleIn(200);
        this.startButton.rotateAmount=0.017;
        this.startButton.rotateSpeed = 500;
        this.startButton.rotate(false);
        this.startButton.scaleAmount =0.0;
        this.startButton.clickSound = "click1.wav";
        this.startButton.clickSound1 = "click2.wav";
        this.startButton.addTo(this.stage)
        
        
        this.b1 = new game.ForgeButton('button1.png','button2.png',0.5 * game.width, 0.8*game.height,
        'recharge energy', {}, 100, 1, '#000000','#FFFFFF', function() {
            UpdateData(6);
        });
        
        this.b1.scaleSpeed =500;
        this.b1.scaleIn(300);
        this.b1.rotateAmount=0.017;
        this.b1.rotateSpeed = 500;
        this.b1.rotate(false);
        this.b1.scaleAmount =0.0;
        this.b1.clickSound = "click1.wav";
        this.b1.clickSound1 = "click2.wav";
        this.b1.addTo(this.stage)

    },
    
    createEnergyText: function(hook)
    {
        var sprite2 = new game.Sprite('energyBut.png');
        sprite2.anchorCenter();
        sprite2.position.x = 300;
        sprite2.position.y = -100;
        sprite2.addTo(hook);
        
        var etext = new game.Text("x", {});
        etext.addTo(sprite2);
        etext.anchorCenter();
        etext.fontClass.letterSpacing=0;
        
        var size = 120;
        var factor = etext.height / size;
        etext.height =  size;
        etext.width = etext.width / factor;
        etext.position.y=-(size/7);
        etext.position.x=0;
        
        this.updateEnergyText(etext);
        return etext;
    },
    
    updateEnergyText: function(etext)
    {
        etext.parent._worldAlpha=1;
        var text = 'x';
        if(game.scene.energy > 0)
        {
            text = game.scene.energy.toString()-1;
        }
        etext.setText(text);
        etext.cache = true;
        etext._cachedSprite.tint = '#000000';
        etext._cachedSprite.tintAlpha = 1;
    }
});
     
// Custom Classes
game.createClass('ForgeButton', 'Button', {
    //We extend the standard button
    staticInit: function(texture1, texture2, x, y, text, textProps, size, letterSpacing, tint1, tint2, callback) 
    {
        this.super(texture2, x, y, callback);
        this.callback = callback;
        
        this.sprite.alpha=0;
        this.sprite2 = new game.Sprite(texture1);
        this.sprite2.anchorCenter();
        this.sprite2.alpha=1;
        this.sprite2.buttonMode = true;
        
        this.sprite2.position.x = x;
        this.sprite2.position.y = y;
        this.sprite2.interactive = true;
        this.sprite2.mousedown = this.mousedown.bind(this);
        this.sprite2.mouseup = this.mouseup.bind(this);
        this.sprite2.mouseupoutside = this.mouseup.bind(this);

    
        this.text1 = new game.Text(text, textProps);
        this.text1.anchorCenter();
        this.text1.addTo(this.sprite2);
        
        this.text2 = new game.Text(text, textProps);
        this.text2.anchorCenter();
        this.text2.addTo(this.sprite);

        var factor = this.text1.height / size;
        
        this.text1.height = size;
        this.text1.width /= factor;
        this.text1.position.y=-(size/7);
        this.text1.fontClass.letterSpacing=letterSpacing;
        
        this.text1.updateText();
        this.text1.cache = true;
        this.text1._cachedSprite.tint = tint1;
        this.text1._cachedSprite.tintAlpha = 1;
        
        this.text2.height = size;
        this.text2.width /= factor;
        this.text2.position.y=-(size/7);
        this.text2.fontClass.letterSpacing=letterSpacing;
        
        this.text2.updateText();
        this.text2.cache = true;
        this.text2._cachedSprite.tint = tint2;
        this.text2._cachedSprite.tintAlpha = 1; 
        
        this.sprite2.click = this.click.bind(this);
    },
    
    addTo: function(container) {
        this.super(container);
        container.addChild(this.sprite2);
    },
    scaleIn: function(delay) {
        delay = delay || 0;
        this.sprite2.scale.set(0);
        game.Tween.add(this.sprite2.scale, {
            x: 1, y: 1
        }, this.scaleSpeed, {
            easing: this.scaleEasing,
            delay: delay,
            onStart: this._onScaleInStart.bind(this),
            onComplete: this._scaleInEnd.bind(this)
        }).start();
    },
    rotate: function(random) {
        this.super(random),
        this.sprite2.rotation = -this.rotateAmount;
        this.rotateTween = game.Tween.add(this.sprite2, {
            rotation: this.rotateAmount
        }, this.rotateSpeed, {
            repeat: Infinity,
            yoyo: true,
            easing: this.rotateEasing
        }).start();
        if (random) this.rotateTween.currentTime = this.rotateTween.duration.random();
    },
    setPosition: function(x,y)
    {
        
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite2.position.x = x;
        this.sprite2.position.y = y;
        
    },
    mousedown: function()
    {
        if (this.clickSound) game.audio.playSound(this.clickSound);
        this.sprite2.alpha=0;
        this.sprite.alpha=1;
        this.sprite.mousedown();
    },
    mouseup: function()
    {
        if (this.clickSound1) game.audio.playSound(this.clickSound1);

        this.sprite2.alpha=1;
        this.sprite.alpha=0;
        this.sprite.mouseup();
    },
    click: function()
    {
        //if (this.clickSound) game.audio.playSound(this.clickSound);
        
        if (typeof this.callback === 'function')
        {
            this.callback();
        }
    }
});



// Gameplay Scene
game.createScene('Gameplay', {
    backgroundColor: '#ffce53',
   
    init: function() 
    {
        // Define physics world for collisions
        this.world = new game.Physics();
        
        this.world.applyGravity = false;
        this.world.defaultContactMaterial.restitution = 1;
        this.world.defaultContactMaterial.friction = 0.1;
        
        // Collision Callbacks
        this.world.on('beginContact', function(data) 
        {
            // Before collision
        });
        
        this.world.on('impact', function(data) 
        {
            // Collision
            if(game.scene.player.timeScale < game.scene.player.MaxTimeScale)
            {
                game.scene.player.timeScale+= 0.3;
            }
            else
            {
               game.scene.player.timeScale = game.scene.player.MaxTimeScale;
            }

            
            // Vibration Feedback
            navigator.vibrate(5);
            
            // Velocity handling
            if (game.scene.playerBody.velocity[0] >= 0)
            {
                game.scene.playerBody.velocity[0] = Math.min(
                    game.scene.playerBody.velocity[0] *= 0.99,
                    game.scene.limitX);
            }
            else
            {
                game.scene.playerBody.velocity[0] = Math.max(
                    game.scene.playerBody.velocity[0] *= 0.99,
                    -game.scene.limitX);
            }
            if (game.scene.playerBody.velocity[1] >= 0)
            {
                game.scene.playerBody.velocity[1] = Math.min(
                    game.scene.playerBody.velocity[1] *= 0.99,
                    game.scene.limitY);
            }
            else
            {
                game.scene.playerBody.velocity[1] = Math.max(
                    game.scene.playerBody.velocity[1] *= 0.99,
                    -game.scene.limitY);
            }
        });
        
        this.world.on('postStep', function(data) 
        {
            // After collision
        });
        
        var ratio = this.world.ratio;
        
        // Create Screen Walls
        var wallShape, wallBody;
        var wallSize = 100;
        
        // Left wall
        wallShape = new p2.Box({ width: wallSize, height: game.height / ratio });
        wallBody = new game.Body({
            position: [-wallSize / 2, game.height / 2 / ratio]
        });
        
        wallBody.addShape(wallShape);
        this.world.addBody(wallBody);

        // Right wall
        wallShape = new p2.Box({ width: wallSize, height: game.height / ratio });
        wallBody = new game.Body({
            position: [game.width / ratio + wallSize / 2, game.height / 2 / ratio]
        });
        
        wallBody.collisionGroup = 1;
        wallBody.addShape(wallShape);
        this.world.addBody(wallBody);

        // Top wall
        wallShape = new p2.Box({ width: game.width / ratio, height: wallSize });
        wallBody = new game.Body({
            position: [game.width / 2 / ratio, -wallSize / 2]
        });

        wallBody.addShape(wallShape);
        this.world.addBody(wallBody);
        
        // Bottom wall
        wallShape = new p2.Box({ width: game.width / ratio, height: wallSize });
        wallBody = new game.Body({
            position: [game.width / 2 / ratio, game.height / ratio + wallSize / 2]
        });

        wallBody.addShape(wallShape);
        this.world.addBody(wallBody);
        
        // Creates the spine Object
        this.player = new game.Spine(NAME_SPINE +'.json');
        this.player.scale.x = 1;
        this.player.scale.y = 1;
        
        // Position it to the center of the screen
        this.player.position.x = game.width / 2;
        this.player.position.y = game.height / 2;
        // Set the looped walk animation
        if(NAME_SPINE=='spineboy') 
        {
            this.player.play('walk', true);
        }
        else
        {
            this.player.play(NAME_SPINE, true);
        }

        this.player.state.timeScale=1;
        this.player.timeScale=1;
        this.player.MaxTimeScale = 3;
        this.player.TimeScaleBounceDampening = 0.01;
        
        this.playerBody = createBody(this.player.width, this.player.height + 350);
        this.playerBody.addTo(game.scene.world);
        //this.playerBody.velocity[1] += 10;
        
        this.player.addTo(this.stage);
        
        var a=0;
        var b=90;
        var c=250;
        // Debug
        this.maxMotionTextX = new game.SystemText('Max Motion x: 0');
        this.maxMotionTextX.size = 100;
        this.maxMotionTextX.x = c;
        this.maxMotionTextX.y = a;a+=b;
        this.maxMotionTextX.color = 'black';
        this.maxMotionTextX.addTo(this.stage);
        
        this.maxMotionTextY = new game.SystemText('Max Motion y: 0');
        this.maxMotionTextY.size = 100;
        this.maxMotionTextY.x = c;
        this.maxMotionTextY.y = a;a+=b;
        this.maxMotionTextY.color = 'black';
        this.maxMotionTextY.addTo(this.stage);
        
        this.minMotionTextX = new game.SystemText('Min Motion x: 0');
        this.minMotionTextX.size =100;
        this.minMotionTextX.x = c;
        this.minMotionTextX.y = a;a+=b;
        this.minMotionTextX.color = 'black';
        this.minMotionTextX.addTo(this.stage);
        
        this.minMotionTextY = new game.SystemText('Min Motion y: 0');
        this.minMotionTextY.size = 100;
        this.minMotionTextY.x = c;
        this.minMotionTextY.y = a;a+=b;
        this.minMotionTextY.color = 'black';
        this.minMotionTextY.addTo(this.stage);

        this.maxMotionTextX1 = new game.SystemText('Max Motion x: 0');
        this.maxMotionTextX1.size = 24;
        this.maxMotionTextX1.y = 180;
        this.maxMotionTextX1.color = 'black';
        this.maxMotionTextX1.addTo(this.stage);
        
        this.maxMotionTextY1 = new game.SystemText('Max Motion y: 0');
        this.maxMotionTextY1.size = 24;
        this.maxMotionTextY1.y = 210;
        this.maxMotionTextY1.color = 'black';
        this.maxMotionTextY1.addTo(this.stage);
        
        this.minMotionTextX1 = new game.SystemText('Min Motion x: 0');
        this.minMotionTextX1.size = 24;
        this.minMotionTextX1.y = 240;
        this.minMotionTextX1.color = 'black';
        this.minMotionTextX1.addTo(this.stage);
        
        this.minMotionTextY1 = new game.SystemText('Min Motion y: 0');
        this.minMotionTextY1.size = 24;
        this.minMotionTextY1.y = 270;
        this.minMotionTextY1.color = 'black';
        this.minMotionTextY1.addTo(this.stage);
        
        
        this.motionDelta = new game.SystemText('Motion Delta: 0 ms');
        this.motionDelta.size = 24;
        this.motionDelta.y = 150;
        this.motionDelta.color = 'black';
        this.motionDelta.addTo(this.stage);

        this.Score = new game.SystemText('score');
        this.Score.size = 40;
        this.Score.y = 300;
        this.Score.color = 'black';
        this.Score.addTo(this.stage);
        
        this.limitX = 10;
        this.limitY = 10;
        
        // Debug variables
        this.maxX = 0;
        this.maxY = 0;
        this.minY = 0;
        this.minX = 0;
    },
    
    updateScore: function(accel) 
    {
        this.limY=15;
        if(this.sign === undefined)
        {
            this.sign =-1;
        }
        var abs=Math.abs(accel.y);
        if(abs > 5)
        {
            var currentSign = accel.y / abs;
            if(currentSign*this.sign == -1)
            {
                if(this.maxY<limY && this.minY>-limY )
                {
                    CHECK++;
                }
                this.maxX=0; 
                this.maxY=0;
                this.minX=0;
                this.minY=0;
            }
            this.sign = currentSign;
            
            this.Score.text = ('score: ' + CHECK);
        }
    },
    
    update: function() 
    {
        if (this.player.timeScale > 1) 
        {
            this.player.timeScale -=this.player.TimeScaleBounceDampening;
            this.player.state.timeScale = this.player.timeScale;
        }
        else if (this.player.timeScale < 1) 
        {
            this.player.timeScale = 1;
            this.player.state.timeScale = this.player.timeScale;
        }
        // Update player position to match body position
        this.playerBody.angle =0;
        var cosx = Math.cos(this.playerBody.angle);
        var sinx = Math.sin(this.playerBody.angle);
/*        
        this.player.position.x = 
            (this.playerBody.position[0] - 3.0 * sinx) * game.scene.world.ratio;
        this.player.position.y = 
            (this.playerBody.position[1] + 2.5 * cosx) * game.scene.world.ratio;
        */
        this.player.position.x = 
            (this.playerBody.position[0] - 1.0 * sinx) * game.scene.world.ratio;
        this.player.position.y = 
            (this.playerBody.position[1] + 2.0 * cosx) * game.scene.world.ratio;
        
        this.player.rotation = this.playerBody.angle;
        this.motionDelta.text = ('Motion Delta: ' + game.delta);
        if (!game.input.motion) 
        {
            // EDITOR DEBUG LOGIC
            if (game.keyboard.down('UP')) 
            {
                if (this.playerBody.velocity[1] >= 0)
                {
                    this.playerBody.velocity[1] = Math.min(
                        this.playerBody.velocity[1] += 5, this.limitY);
                }
                else
                {
                    this.playerBody.velocity[1] = Math.max(
                        this.playerBody.velocity[1] -= 5, -this.limitY);
                }
            }
            else if (game.keyboard.down('DOWN'))
            {
                if (this.playerBody.velocity[1] >= 0)
                {
                    this.playerBody.velocity[1] = Math.min(
                        this.playerBody.velocity[1] += 5, this.limitY);	
                }
                else
                {
                    this.playerBody.velocity[1] = Math.max(
                        this.playerBody.velocity[1] -= 5, -this.limitY);	
                }
            }
            else if (game.keyboard.down('RIGHT'))
            {
                if (this.playerBody.velocity[0] >= 0)
                {
                    this.playerBody.velocity[0] = Math.min(
                        this.playerBody.velocity[0] += 2, this.limitY);
                }
                else
                {
                    this.playerBody.velocity[0] = Math.max(
                        this.playerBody.velocity[0] -= 2, -this.limitY);
                }
            }
            else if (game.keyboard.down('LEFT'))
            {
                if (this.playerBody.velocity[0] >= 0)
                {
                    this.playerBody.velocity[0] = Math.min(
                        this.playerBody.velocity[0] += 2, this.limitY);
                }
                else
                {
                    this.playerBody.velocity[0] = Math.max(
                        this.playerBody.velocity[0] -= 2, -this.limitY);
                }
            }
        }
        else
        {
            // MOTION INPUT
            var accel = game.input.motion.acceleration;
            var delta = game.input.motion.interval;
            this.updateScore(accel);
            
            if (accel.x > this.maxX)
            {
                this.maxX = accel.x;
            }
            if (accel.y > this.maxY)
            {
                this.maxY = accel.y;
            }
            if (accel.y < this.minY)
            {
                this.minY = accel.y;
            }
            if (accel.x < this.minX)
            {
                this.minX = accel.x;
            }
            
            if (accel.y >= 15)
            {
                if (accel.y <= this.maxY + 0.05 && accel.y >= this.maxY - 0.05)
                {
                    if (game.scene.backgroundColor != 'red')
                    {
                        game.scene.backgroundColor = 'red';
                        game.Timer.add(250, function() 
                        {
                            game.scene.backgroundColor = '#FFCD50';
                        });
                    }
                }
            }
            else if (accel.y <= -15)
            {
                if (accel.y <= this.minY + 0.05 && accel.y >= this.minY - 0.05)
                {
                    if (game.scene.backgroundColor != 'red')
                    {
                        game.scene.backgroundColor = 'red';
                        game.Timer.add(250, function() 
                        {
                            game.scene.backgroundColor = '#FFCD50';
                        });
                    }
                }
            }
            
            if (accel.x >= 5)
            {
                if (this.playerBody.velocity[0] >= 0)
                {
                    //this.playerBody.velocity[0] += 10;	
                }
                else
                {
                    //this.playerBody.velocity[0] -= 10;
                }
            }
            
            if (accel.y >= 5)
            {
                if (this.playerBody.velocity[1] >= 0)
                {
                    this.playerBody.velocity[1] += game.delta * 500
                }
                else
                {
                    this.playerBody.velocity[1] -= game.delta * 500
                }
            }
            
            this.maxMotionTextX.text = ('Max Motion x: ' + this.maxX);
            this.maxMotionTextY.text = ('Max Motion y: ' + this.maxY);
            this.minMotionTextX.text = ('Min Motion x: ' + this.minX);
            this.minMotionTextY.text = ('Min Motion y: ' + this.minY);

            this.maxMotionTextX1.text = ('Motion x: ' + accel.x);
            this.maxMotionTextY1.text = ('Motion y: ' + accel.y);
            this.minMotionTextX1.text = ('Motion vx: ' + this.playerBody.velocity[0]);
            this.minMotionTextY1.text = ('Motion vy: ' + this.playerBody.velocity[1]);
            
            this.motionDelta.text = ('Motion Delta: ' + delta);
        }

    }
});

// Custom Functions
function createBody(width, height)
{
    var body = new game.Body({
        mass: 0.1,
        damping: 0.3,
        //angularDamping: 0.9,
        angularDamping: 0.99999,
        position: [
            game.width / 2 / game.scene.world.ratio,
            game.height / 2 / game.scene.world.ratio
        ],
        angle:  0//Math.random() * Math.PI / 8
    });
        
        
    var shape = new p2.Box({ 
        width: width / game.scene.world.ratio, 
        height: height / game.scene.world.ratio 
    });
        
    body.addShape(shape);
    return body;
};

function GetData()
{
    return new Promise(function(resolve, reject) {   
        FBInstant.player.getDataAsync(['date', 'energy'])
        .then(function(data) {
        console.log('data is loaded');
        if(data)
        {
            console.log(data);
            if(Object.keys(data).length == 0)
            {
                data ={};
                data['date'] = Date.now();
                data['energy'] = 6;
            }
        }
        resolve(data);
        }
        ).catch(function(error) {
            reject(error);
    		console.log(error.message);
            throw error.message;
        });
    });
}

function UpdateData(energy1)
{
    return new Promise(function(resolve, reject) {   
        date = Date.now();
        FBInstant.player.setDataAsync( {
                date: date,
                energy: energy1,
            }   
        ).then(function() {
            resolve();
        //console.log('data is set');
        }
        ).catch(function(error) {
            reject(error);
    		console.log(error.message);
            throw error.message;
        });
    });
}


});