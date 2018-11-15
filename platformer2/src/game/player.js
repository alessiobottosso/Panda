game.module(
    'game.player'
)
.require(
    'game.common'
)
.body(function() {


game.createClass('Player', {
    jumpPower:  1000,
    runSpeed: Speed,
    
    init: function(x, y) {
        var offset = -10;

        // var sheet = new game.SpriteSheet('player.png', 80, 96);
        // this.sprite = new game.Animation(sheet.textures);
        // this.sprite.addAnim('stand', [1, 0, 2, 0], { speed: 10, loop: true });
        // this.sprite.addAnim('run', [3, 4, 5, 4]);
        // this.sprite.addAnim('jump', [6]);
        
        var sheet = new game.SpriteSheet('player1.png', 128, 128);
        this.sprite = new game.Animation(sheet.textures);
        this.sprite.addAnim('stand', [0,0,11,0,12,12], { speed: 5, loop: true });
        this.sprite.addAnim('run', [0, 1, 2, 3,0,4,5,6], { speed: 12, loop: true });
        this.sprite.addAnim('jump', [7,8], { speed: 6, loop: false });
        this.sprite.addAnim('jump1', [9,10], { speed: 6 , loop: false });
        this.sprite.addAnim('feedback', [0,13,14,15,16,15,16], { speed: 6 , loop: false });

        
        this.sprite.anchorCenter();
        this.sprite.position.set(x, y);
        this.sprite.speed = 10;
        this.sprite.play('jump');
        
        this.body = new game.Body();
        this.body.position.set(x, y);
        this.body.collideAgainst.push(0);
        this.body.collideAgainst.push(1);
        var shape = new game.Rectangle(sheet.width*0.5, 0.9*sheet.height + offset);
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);
        this.body.collide = this.collide.bind(this);
        this.onGround=false;
        this.alive=true
        this.jumps=0;
        this.prevPosX = this.sprite.x
    },
    
    collide: function(body, dir) {
        // console.log(dir)
        // if(dir===undefined)
        // {
        //     var a=64;
        //     this.body.position.y-=a;
        //     this.sprite.position.y-=a;
        // }
        if(body.collisionGroup==0)
        {
            if (!this.onGround) {
                // Prevent from stucking into walls
                if (dir === 'UP' || dir === 'DOWN') {
                    var playerLastRight = this.body.last.x + this.body.shape.width / 2;
                    var playerLastLeft = this.body.last.x - this.body.shape.width / 2;
                    var otherLastRight = body.last.x + body.shape.width / 2;
                    var otherLastLeft = body.last.x - body.shape.width / 2;
                    if (playerLastRight <= otherLastLeft) {
                        this.body.position.x = body.position.x - body.shape.width / 2 - this.body.shape.width / 2;
                        return false;
                    }
                    else if (playerLastLeft >= otherLastRight) {
                        this.body.position.x = body.position.x + body.shape.width / 2 + this.body.shape.width / 2;
                        return false;
                    }
                }
            }
            
            if (dir === 'DOWN' || dir === 'UP') this.body.velocity.y = 0
            if (dir === 'DOWN') {
                if (!this.onGround) this.play('stand');
                this.onGround = true;
                this.jumps=0;
            }
            return true;
        }
        else
        {
            this.collideWithObj(body)
        }
    },
    collideWithObj: function (body)
    {
    if(body.gid==2)
    {
        game.scene.maxTime+=FR_TIMEBONUS;
        PlaySound(SOUND_STAR)
    }
    if(body.gid==3)
    {
        game.scene.points++;
        PlaySound(SOUND_PACK)
    }
    if(body.gid==4)
    {
        game.scene.points+=5;
        PlaySound(SOUND_PACK)
    }
    if(body.gid==5)
    {
        game.scene.points+=10;
        PlaySound(SOUND_PACK)
    }
    //console.log(game.scene.points)
    var sprite = body.sprite;
    game.scene.removeFromLists(body);
    sprite.remove();
    body.remove();
    },
    jump: function() {
        if (!this.alive) return;
        if(this.jumps > 1) 
        {
            return;
        }
        this.jumps++;
        this.body.velocity.y = -this.jumpPower;
        this.onGround = false;
        if(this.jumps==1)
        {
            this.play('jump');
            PlaySound(SOUND_JUMP1)
        }
        else
        {
            this.play('jump1');
            PlaySound(SOUND_JUMP2)
        }
        
    },
    
    play: function(anim) {
        if (this.sprite.currentAnim === this.sprite.anims[anim]) return;
        this.sprite.play(anim);
    },
    die: function()
    {
        var block = game.scene.block
        if(!block.isInside(this.sprite.x))
        {
            block = game.scene.previousBlock;
        }
        var w = block.tilemap.tileWidth;
        var h = block.tilemap.tileHeight;
        var v = this.sprite.x- block.startingx;
        var idx = ~~(v/w);
        
        var position = -64+block.blockSafe[idx]*h
        
        this.body.position.y=position;
        this.sprite.y=position;
        this.jumps = 0;
        this.respawn = 10;
        game.scene.maxTime -=FR_TIMEMALUS;
    },    
    update: function() {
        // if(game.scene.loading) 
        // {
        //     this.body.velocity.y=0;
        //     this.body.velocity.x=0;
        //     return;
        // }
        if(this.respawn > 0)
        {
            this.respawn--;
        }
        this.prevPosX = this.sprite.x

        // Fall from edge
        if (this.body.velocity.y > 0 && this.onGround) {
            this.onGround = false;
            this.play('jump');
            //this.jumps++;
        }
        
        if(game.scene.player.sprite.y > FO_DieLevel)
        {
            this.die()
        }

        // Movement
        if(this.alive)
        {
            this.body.velocity.x = this.runSpeed * 0.9 + Math.random() * this.runSpeed*0.1;
        }else
        {
            this.body.velocity.x = 0;
        }
        
                
        // if (game.keyboard.down('RIGHT')) {
        //     this.body.velocity.x = 1*this.runSpeed;
        //     this.sprite.scale.x = 1;
        // }
        // else if (game.keyboard.down('LEFT')) {
        //     this.body.velocity.x = -1*this.runSpeed;
        //     this.sprite.scale.x = -1; // Flip sprite
        // }
        // else this.body.velocity.x = 0;
  
        
        // Change animation
        if (this.onGround) {
            if (this.body.velocity.x === 0) {
                this.play('stand');
            }
            else {
                this.play('run');
            }
        }
        
        // Update sprite position
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
    }
});



});
