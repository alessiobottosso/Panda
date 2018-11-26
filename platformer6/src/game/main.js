 game.module(
    'game.main'
)
.require(
    'game.common',
    'game.myloader',
    'game.tutorial',
    'game.select',
    'game.intro',
    'game.error',
    'game.outro',
    'game.preloading',
    'game.player',
    'game.dummyplayer',
    'game.poisson',
    'plugin.spine',
    'plugin.essentials',
    'plugin.tiled'
)
.body(function() {


game.createScene('Main', {
    gravity: 2000,
    
    init: function() {
        
        FR_VALIDATION_TOKEN=[];
        FR_TIMESFALLEN=0;
        FR_TIMESSTARS=0;
        
        game.mainMusic.play();
        //try{
        //console.log("scene init");
        var d= 500
        this.blockConstruction=0;
        this.displacementX=0;
        this.scoreBouncingTimer=0;
        this.scoreBouncingDone=false;
        Lambda=1;
        this.points=0;
        this.time=0;
        this.initialCorrectionX=d/10+00;
        this.startingTime = Date.now();
        this.layers =[];
        
        this.layers.push("layer_08.png");
        //this.layers.push("layer_07.png");
        this.layers.push("layer_06.png");
        this.layers.push("layer_05.png");
         
        this.layers.push("layer_04.png");
        // this.layers.push("layer_03.png");

        this.bgLayer=[];    
        this.layers.forEach(function(element) {
        var layer = new game.TilingSprite(element);
        
        layer.addTo(game.scene.stage);
        game.scene.bgLayer.push(layer);
        });
        



        this.world = new game.Physics();
        this.world.gravity.y = this.gravity;
        
        this.container = new game.Container();
        this.container.addTo(this.stage);

        this.container0 = new game.Container();
        this.container0.addTo(this.container);

        this.container1 = new game.Container();
        this.container1.addTo(this.container);

        this.container2 = new game.Container();
        this.container2.addTo(this.container);

        game.disp =0;
        game.built=0;
        game.blockIdx=0;
        this.createBlock(game.built);
        this.updateContructionLogic();
        this.updateContructionLogic();
        this.updateContructionLogic();
        this.updateContructionLogic();
        
        //this.player = new game.Player(1960, 960);
        this.player = new game.Player(d, 1460);
        game.imgDisplacementY = 0;

        //this.block.imgLayers[0].position.x+=this.initialCorrectionX;
        
        this.player.sprite.addTo(this.container1);
        
        this.camera = new game.Camera(this.player.sprite);
        this.camera.addTo(this.container);
        this.camera.setPosition(this.player.sprite.x,this.player.sprite.y);
        this.camera.offset.x=game.width/10
        this.camera.offset.y=game.height * 5/10
        this.camera.sensorSize.x=100; 
        this.camera.sensorSize.y=200;   
        this.camera.limit = new game.Rectangle(Infinity, LowLimit, -Infinity, -Infinity);
        this.camera.maxSpeed=FR_SPEED+100;
        this.camera.threshold=2; 
        this.displacement=0;

        this.maxTime=60*2;


        this.text1 = CreateText(this.format1(this.maxTime),
            0,0,0,60, {align:"center"});
        this.text1.anchorCenter();
        this.text1.x+=HALF_WIDTH;
        this.text1.y+=game.height * 0.052 + this.text1.height/2;
        this.text1.y+=2;
        SetColor(this.text1,"#000000",0.7)
        this.text1.addTo(game.scene.stage)

        this.text = CreateText(this.format1(this.maxTime),
            0,0,0,60, {align:"center"});
        this.text.anchorCenter();
        this.text.x+=HALF_WIDTH;
        this.text.y+=game.height * 0.052 + this.text.height/2;
        this.text.addTo(game.scene.stage)




        this.score1 = CreateText1(game.name,0,0,0,16.5, {});
        this.score1.x+=25;
        this.score1.y+=2+game.height * 0.136 + this.score1.height/2;
        SetColor(this.score1,"#000000",0.7)
        this.score1.addTo(game.scene.stage)

        this.score1 = CreateText1(game.name,0,0,0,16.5, {});
        this.score1.x+=25;
        this.score1.y+=game.height * 0.136 + this.score1.height/2;
        this.score1.cache = true;
        this.score1.addTo(game.scene.stage)

        this.scoreb = CreateText1("00000000",0,0,0,30, {});
        this.scoreb.x+=25;
        this.scoreb.y+=2+(game.height * 0.16) + this.scoreb.height/2;
        SetColor(this.scoreb,"#000000",0.7)

        this.scoreb.addTo(game.scene.stage)

        this.score = CreateText1("00000000",0,0,0,30, {});
        this.score.x+=25;
        this.score.y+=game.height * 0.16 + this.score.height/2;
        this.score.addTo(game.scene.stage)

        this.border = new game.Sprite(BORDER);
        this.border.anchorCenter();
        this.border.x+=game.width*0.85;
        this.border.y+=game.height*0.08;
        this.border.addTo(game.scene.stage)

        var v= this.fill(FR_PLAYERMAXSCORE.toString());
        this.maxscore = CreateText(v,
            0,0,0,22);
        this.maxscore.cache=true;
        SetColor(this.maxscore,COLOR_DOVEGRAY)
        this.maxscore.anchor.set(0,0);
        this.maxscore.x=game.width*0.94-this.maxscore.width*this.maxscore.scale.x
        this.maxscore.y+=game.height * 0.04 + this.maxscore.height/2;
        this.maxscore.addTo(game.scene.stage)

        this.score1 = CreateText1("HIGH SCORE",
            0,0,0,28, {});
        this.score1.x+=game.width*0.90-this.maxscore.width*this.maxscore.scale.x
        this.score1.y+=game.height * 0.008 + this.score1.height/2;
        SetColor(this.score1,COLOR_DOVEGRAY,0.7)
        this.score1.addTo(game.scene.stage)


        this.initialCorrectionX=0;
        //console.log("end scene init");
        // }
        // catch(e)
        // {
        //     console.log(e);
        // }
        this.timeComputated=0;
        this.scoreComputated=0;
        
        AddForegroundUI();
        
        this.containerConnect = new game.Container();
        this.containerConnect.addTo(game.scene.stage);

        this.blackLayer = new game.Sprite("block.png");
        this.blackLayer.tint='#000000'
        this.blackLayer.alpha=0.8;
        this.blackLayer.width=game.width;
        this.blackLayer.height=game.height;
        this.blackLayer.addTo(this.containerConnect);
        
        var star = new game.Sprite(LOADING_STAR);
        star.x=game.width*0.3;
        star.y=game.height*0.5;
        star.alpha=0;
        star.anchorCenter();
        star.addTo(this.containerConnect);
        this.star1=star;
        var star = new game.Sprite(LOADING_STAR);
        star.x=game.width*0.5;
        star.y=game.height*0.5;
        star.alpha=0;
        star.anchorCenter();
        star.addTo(this.containerConnect);
        this.star2=star;
        var star = new game.Sprite(LOADING_STAR);
        star.x=game.width*0.7;
        star.y=game.height*0.5;
        star.alpha=0;
        star.anchorCenter();
        star.addTo(this.containerConnect);
        this.star3=star;
        
        this.containerConnect.visible=0;

        this.timer=0;
        this.stepb=0;
        this.steps=[];
        this.loading=false;
        this.loadingStars=0;
        
        //TODO do this better!
        this.createVFX();

        var portrait = new game.Sprite("portraitBg2.png");
        portrait.x=game.width*0.1;
        portrait.y=game.height*0.075;
        portrait.anchorCenter();
        portrait.addTo(game.scene.stage)
        
        var num=0
        if(game.selectIdx)
            num=game.selectIdx;
        var portrait = new game.Sprite("portrait"+ num +".png");
        portrait.x=game.width*0.1;
        portrait.y=game.height*0.075;
        
        portrait.scale.x=0.5;
        portrait.scale.y=0.5;
        portrait.anchorCenter();
        portrait.addTo(game.scene.stage)
        
        
        // this.vfx3 = this.createVFX();
        // this.vfx3.addTo(game.scene.container2)

        
        this.vfxindex=0;
        
        var sprite = new game.Sprite("Stadium_quinta.png");
        //sprite.tint='#000000'
        //sprite.alpha=0.8;
        //sprite.width=game.width/4;
        sprite.x+=2000
        sprite.y+=796
        //sprite.height=game.height;
        sprite.addTo(game.scene.container2);
        this.stadiumBlock=sprite;

        //Play Cinematic
        /*
        PlayCinematic(INTRO_OUTRO_JSON, GAMEPLAY, 
            HALF_WIDTH, game.height * 0.48);
        */
    },
    format1:function(param)
    {
        var v1=~~(param/60);
        var v2=(param%60);
        
        var res = this.fillVariant(v1.toString(), 2);
        
        res+=":"+this.fillVariant(v2.toString(), 2);
        return res
    },
    createVFX:function()
    {
        var sheet = new game.SpriteSheet(VFX, 104, 104);
        this.vfx1 = new game.Animation(sheet.textures);
        this.vfx1.addAnim('jump', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],  { speed: 20, loop: false });
        this.vfx1.anims.jump.loop=false;
        this.vfx1.anchorCenter();
        this.vfx1.addTo(game.scene.container2)

        var sheet = new game.SpriteSheet(VFX2, 104, 104);
        this.vfx2 = new game.Animation(sheet.textures);
        this.vfx2.addAnim('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],  { speed: 30, loop: false });
        //this.vfx2.anims.run.loop=false;
        this.vfx2.anchorCenter();
        this.vfx2.addTo(game.scene.container2)

        var sheet = new game.SpriteSheet(VFX2, 104, 104);
        this.vfx2b = new game.Animation(sheet.textures);
        this.vfx2b.addAnim('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],  { speed: 30, loop: false });
        //this.vfx2.anims.run.loop=false;
        this.vfx2b.anchorCenter();
        this.vfx2b.addTo(game.scene.container2)
        
        var sheet = new game.SpriteSheet(VFX3, 104, 104);
        this.vfx3 = new game.Animation(sheet.textures);
        this.vfx3.addAnim('idle', [0,1,2,3,4,5,6,7,8],  { speed: 10, loop: false });
        this.vfx3.addAnim('fade', [9,10,11,12,13,14,15,16,17,18,19,20],  { speed: 20, loop: false });
        //this.vfx2.anims.run.loop=false;
        this.vfx3.anchorCenter();
        this.vfx3.addTo(game.scene.container2)
        
        var sheet = new game.SpriteSheet(VFX4, 104, 104);
        this.vfx4 = new game.Animation(sheet.textures);
        this.vfx4.addAnim('idle', [0,1,2,3,4,5],  { speed: 30, loop: false });
        this.vfx4.addAnim('fade', [6,7,8,9,10,11,12,13,14,15,16,17,18],  { speed:  20, loop: false });
        //this.vfx2.anims.run.loop=false;
        this.vfx4.anchorCenter();
        this.vfx4.addTo(game.scene.container2)
        
        var sheet = new game.SpriteSheet(VFX5, 160, 64);
        this.vfx5 = new game.Animation(sheet.textures);
        this.vfx5.addAnim('jump', [0,1,2,3,4,5,6],  { speed: 20, loop: false });
        this.vfx5.anchorCenter();
        this.vfx5.addTo(game.scene.container2)

        var sheet = new game.SpriteSheet(VFX6, 100, 84);
        this.vfx6 = new game.Animation(sheet.textures);
        this.vfx6.addAnim('one', [1,2,3,4,5,0],  { speed: 10, loop: false });
        this.vfx6.addAnim('two', [6,7,8,9,10,0],  { speed: 10, loop: false });
        this.vfx6.addAnim('three', [11,12,13,14,15,0],  { speed: 10, loop: false });
        this.vfx6.addAnim('time', [16,17,18,19,20,0],  { speed: 10, loop: false });
        this.vfx6.anchorCenter();
        this.vfx6.addTo(game.scene.container2)
        
        
        //Frame: 0 - 5
        
    },
    starVfx:function(x,y)
    {
        this.vfx4.position.set(x, y);
        this.vfx4.play('fade');

        this.vfx6.position.set(x, y-64);
        this.vfx6.play('time');
    },
    packVfx:function(x,y,t)
    {
        this.vfx3.position.set(x, y);
        this.vfx3.play('fade');
        if(t==0)
        {
            this.vfx6.position.set(x, y-64);
            this.vfx6.play('one');
        }
        if(t==1)
        {
            this.vfx6.position.set(x, y-64);
            this.vfx6.play('two');
        }
        if(t==2)
        {
            this.vfx6.position.set(x, y-64);
            this.vfx6.play('three');
        }
    },
    runVfx:function(x,y)
    {
        if(this.vfxindex==0)
        {
            this.vfx2.position.set(x, y);
            this.vfx2.play('run');
            ++game.scene.vfxindex;
        }
        else
        {
            this.vfx2b.position.set(x, y);
            this.vfx2b.play('run');
            game.scene.vfxindex=0;
        }
    },
    jumpVfx:function(x,y)
    {
        this.vfx1.position.set(x, y);
        this.vfx1.play('jump');
    },
    jumpVfx1:function(x,y)
    {
        this.vfx5.position.set(x, y);
        this.vfx5.play('jump');
    },
    mousedown: function(x, y)
    {
    	this.super(x,y)
        this.player.jump();
    },
    loadingUpdate:function()
    {
        if(this.loading)
        {
            this.loadingStars++;
            var v = this.loadingStars + 0
            if(v>128) v=v-128;
            if(v>64)
                this.star1.alpha =  ((128-v ))/64
            else
                this.star1.alpha =  ((v ))/64
            var v = this.loadingStars + 16
            if(v>128) v=v-128;
            if(v>64)
                this.star2.alpha =  ((128-v ))/64
            else
                this.star2.alpha =  ((v ))/64
            
            var v = this.loadingStars + 32
            if(v>128) v=v-128;
            if(v>64)
                this.star3.alpha =  ((128-v ))/64
            else
                this.star3.alpha =  ((v ))/64
            
            if(this.loadingStars>128)
            {
                this.loadingStars=0;
            }
        }
    },
    changeTime:function(value)
    {
        var v1=this.format1(value)
        this.text.setText(v1);
        if(this.text1)
        {
            this.text1.setText(v1);
            if(value>10)
            {
                SetColor(this.text1,"#000000",0.7)
                
            }
            else
            {
                SetColor(this.text1,"#FF0000",0.7)
                if(value>0)
                    PlaySound(SOUND_TIME);
            }
        }
    },
    updateContructionLogic:function()
    {
        if(game.scene.blockConstruction==1) 
        {
            this.dressBlock();
            game.scene.blockConstruction=2
        }else
        if(game.scene.blockConstruction==2) 
        {
            this.calculateBlockSafe();
            game.scene.blockConstruction=3
        }else
        if(game.scene.blockConstruction==3)
        {
            this.createColliders();
            game.scene.blockConstruction=4
        }else
        if(game.scene.blockConstruction==4)
        {
            this.createObjColliders();    
            game.scene.blockConstruction=5
        }else
        if(game.scene.blockConstruction==5)
        {
            this.finalizeBlock();    
            game.scene.blockConstruction=0
        }
    },
    update:function()
    {
        
        if(this.scoreBouncingTimer!=0  && this.scoreBouncingDone==false)
        {
            var max= 314/2;
            var amp = 5*(max-this.scoreBouncingTimer)/max
            this.scoreb.y+=amp*Math.sin(this.scoreBouncingTimer/2);
            this.score.y+=amp*Math.sin(this.scoreBouncingTimer/2);
            this.scoreBouncingTimer++;
            if(this.scoreBouncingTimer==max)
            {
                this.scoreBouncingTimer=0;
            }
        }
        this.loadingUpdate();
        CommonUpdate();
        if(game.scene.loading) return;
        if(game.scene.timeComputated <0 )
        {
            FR_SCORE = game.scene.points;
            game.scene.loading=true;
            this.changeTime(0)

            //GoToScene("Outro")
            this.containerConnect.visible=true;
            SendEndGame(); 
            game.mainMusic.stop();
        }
        
        this.updateContructionLogic();
        
        if(this.steps.length>10)
        {
            var s= this.steps.shift();
            s.body.remove();
            s.remove();
        }
        if(this.steps.length>0)
        {

            var top = this.steps[this.steps.length-1];
            if (top.body.alive==false)
            {
                var s= this.steps.pop();
                s.body.remove();
                s.remove();
            }else
            {
                //var s= this.steps.pop();
                //s.body.remove();
                if(!top.sounded)
                {
                    top.sounded=true; 
                    var pos = game.scene.player.sprite.position;
                    this.runVfx(pos.x,pos.y)
                    if(this.stepb==0)
                    {
                        PlaySound(SOUND_STEP1)
                        this.stepb=1
                    }else
                    {
                        PlaySound(SOUND_STEP2)
                        this.stepb=0
                    }
                }
            }
            
        }
        
        var a=0;
        //TODO
        var v=Date.now()-this.startingTime;
        var v1 = this.maxTime*1000
        if(this.timeComputated != ~~((v1-v)/1000))
        {
            a=1;
            this.timeComputated = ~~((v1-v)/1000)
            if(this.timeComputated >= 0)
            {
                this.changeTime(this.timeComputated)
            }
        }
        
        if(this.scoreComputated!=this.points)
        {
            this.scoreComputated = this.points;
            var stringed = this.fill(this.points.toString())
            this.score.setText(stringed);
            this.scoreb.setText(stringed);
            SetColor(this.scoreb,"#000000",0.7)
            if(this.points > FR_PLAYERMAXSCORE)
            {
              this.scoreBouncingTimer=1;  
              this.scoreBouncingDone=true;
            }
        }
        
        //if(!game.scene) return;
        var newDisplacement = LowLimit - game.scene.camera.position.y;
        var disp = this.displacement -  newDisplacement
        game.disp = disp;
        this.displacement = newDisplacement;

        var updated=false;

        var veryVeryFar=10000;
        if(this.block)
        {
            veryVeryFar+=this.block.size
        }
        
        var delta=game.built - game.scene.block.tilemap.pixelWidth;
        if(game.scene.blockConstruction==0 && game.scene.player.sprite.position.x > veryVeryFar)
        {
            game.scene.player.sprite.position.x -= delta;
            game.scene.player.body.position.x -= delta;
            game.scene.camera._setPosition(
                game.scene.camera.offset.x + game.scene.camera.position.x - delta,
                game.scene.camera.offset.y + game.scene.camera.position.y )
            
            game.built=game.scene.block.size;
            game.scene.block.moveX(delta)
            
            for(var i=0;i<this.steps.length;++i)
            {
                this.steps[i].x-=delta;
            }
            updated=true;
        }
        
        
        if(game.scene.blockConstruction==0 && game.scene.player.sprite.position.x > game.built-game.width)
        {
            this.createBlock(game.built, game.blockIdx);
        }
        
        if(!updated)
        {
            this.updateBackground();            
        }
        
        if(game.scene.blockConstruction==0)
        if(this.block)
        {
            this.block.update();
        }
        if(this.previousBlock)
        {
            this.previousBlock.update();
        }
        
        // if(Fake3d)
        // {
        //     if( !updated)
        //     {
        //     this.updateSkewdLayer(game.scene.block);
        //         if(game.scene.previousBlock)
        //         {
        //             //console.log("prev");
        //             this.updateSkewdLayer(game.scene.previousBlock);
        //         }
        //     }
        // }
        //console.log(game.scene.player.sprite.x)
        //console.log(this.timer)
        
        //TODO
        var PESTE=1
        if(PESTE)
        if(game.scene.player.alive && game.scene.player.onGround && this.timer>=12   )
        {
            this.timer=0;
            var s = new game.Sprite("t1.png")
            s.x = game.scene.player.body.position.x-16  ;
            s.y = game.scene.player.body.position.y+35
            s.scale.x=4;
            s.scale.y=4;
            s.addTo(game.scene.container1)
            this.steps.push(s);
            
            var body = new game.Body();
            var x = game.scene.player.body.position.x+40
            var y = s.y
            body.position.set(x, y);
            body.static = false;
            body.mass=0;
            var shape = new game.Rectangle(60, 50);
            body.collisionGroup=3;
            body.addShape(shape);
            body.collideAgainst.push(0);
            body.alive=false;
            body.collide = this.collide.bind(body);

            body.addTo(game.scene.world);
            
            s.body=body;
        }
        
        this.timer++;
    },
    fillVariant:function(string1,variant)
    {
        if(string1.length<variant)
        {
            return this.fillVariant("0"+string1)
        }
        else
        return string1;
    },
    fill:function(string1)
    {
        if(string1.length<PointSize)
        {
            return this.fill("0"+string1)
        }
        else
        return string1;
    },
    collide: function(body, dir) {
        if(body.collisionGroup==0)
        {
            if(body != game.scene.player.body)
            {
                
                if(IsWalkable(body.tileid))
                {
                    this.alive=true;
                }    
            }
        }
    },
    removePrevPrev:function()
    {
        if(game.scene.prevPrevBlock)
        {
            if(game.scene.prevPrevBlock.idx == 0)
            {
                game.scene.stadiumBlock.remove();
            }
            game.scene.prevPrevBlock.remove();
        }
    },
    createBlock:function(displacementX)
    {
        var index = game.blockIdx
        game.blockIdx++;
        var pRnd = PRnd(Lambda)
        //console.log(pRnd)
        this.prevPrevBlock = this.previousBlock;
        this.previousBlock = this.block;
        this.removePrevPrev();        
        
        if(index==0)
        {
            pRnd=0;
        }
        else  
        {
            pRnd++;
        }
        if(pRnd > MaxLevel)
        {
            pRnd=MaxLevel;
        }
        
        if((1+index) % 3==0)
        {
            Lambda++;
        }
        if(Lambda > MaxLambda)
        {
            Lambda=MaxLambda;
        }
        
        var blockName= 'level'+ pRnd + '.json' ;
        if(TestLevel==true)
        {
            blockName= LEVEL_DESIGN
        }
        if(LEVEL_DESIGN_SEQUENTIAL)
        {
            pRnd = (index) % (MaxLevel+1)   
            blockName= 'level'+ pRnd + '.json' ;
        }
        this.blockConstruction=1;
        this.block = new game.Block(blockName, displacementX, index, pRnd);
        // this.dressBlock();
        // this.calculateBlockSafe();
        // //console.log(JSON.stringify(this.blockSafe));
        // this.createColliders();
        // this.createObjColliders();        
        //this.finalizeBlock();
    },
    dressBlock:function(){game.scene.block.dressBlock()},
    calculateBlockSafe:function(){game.scene.block.calculateBlockSafe()},
    createColliders:function(){game.scene.block.createColliders()},
    createObjColliders:function(){game.scene.block.createObjColliders()},
    finalizeBlock:function()
    {
        game.scene.block.imgLayers.forEach(function(element) 
        {
            element.addTo(game.scene.container0)
        });
        
        game.scene.block.tilemap.addTo(game.scene.container0);
        
        game.scene.block.objs.forEach(function(element) 
        {
            element.addTo(game.scene.container0)
        });

        game.scene.blockConstruction=0;
        game.built += this.block.tilemap.pixelWidth
        //console.log(game.built);
    },
    updateSkewdLayer: function( block) 
    {
        block.updateSkewdLayer();
    },
    updateBackground: function(key) 
    {
        var player = game.scene.player
        var diff = player.prevPosX - player.sprite.x;
        var disp = game.disp
        var i=0;
        this.bgLayer.forEach(function(element) 
        {
            element.tilePosition.x -= (i*(-diff*2)) * game.delta;
            element.tilePosition.y+= (game.scene.bgLayer.length-i)*(disp/40) * 60  * game.delta
            ++i;
        });

        // if(Fake3d)
        // {
        //     this.updateLayerImg(game.scene.block ,diff,60 * disp);
        //     this.updateLayerImg(game.scene.previousBlock,diff,60*disp);
        // }
    },
    updateLayerImg:function(block,diff,disp)
    {
        if(block)
        {
            for (var i=0;i<block.imgLayers.length;++i)
            {
                img = block.imgLayers[i];
                img.position.x+=(XSpeed *(-diff)) * game.delta;
                //img.position.y+= 0.1*disp * game.delta
                game.imgDisplacementY = img.position.y-img.offsety;
            }
        }
        
    },
    removeFromLists:function(body)
    {
        var done = false;
        if(this.block)
            done = this.block.removeFromLists(body);
        if(!done && this.previousBlock )
            done = this.previousBlock.removeFromLists(body);
        return done;        
    },
    keydown: function(key) 
    {
        var player = game.scene.player;
        if (key === 'SPACE') 
        {
            this.player.jump();
        }
        if (FR_DEBUG && key === 'LEFT') {
            player.alive=false;
        }
        if (FR_DEBUG && key === 'RIGHT') {
            player.alive=true;
        }
        if (FR_DEBUG && key === 'UP') 
        {
            game.scene.player.body.velocity.y = -1000;
        }
        if (FR_DEBUG && key === 'Down') 
        {
            game.scene.player.body.velocity.x = -1000;
        }
    }
});

game.createClass('Block', {
    init: function(json, displacementX, index, id) {
        
        if(!displacementX)
        {
            displacementX=0;
        }
        this.id = id;
        this.idx = index;
        this.name = json;
        this.tilemap = new game.Tilemap(json);
        this.size = this.tilemap.pixelWidth;
        this.imgLayers=[];
        this.objs=[];
        this.displacementX = displacementX;
        
        // this.dressBlock();
        // this.calculateBlockSafe();
        // //console.log(JSON.stringify(this.blockSafe));
        // this.createColliders();
        // this.createObjColliders();        
        this.deltapack=0;
    },
    dressBlock:function()
    {
        for (var key in this.tilemap.layers) 
        {
          if (this.tilemap.layers.hasOwnProperty(key)) 
          {
            var layer = this.tilemap.layers[key];
            //console.log(layer);
            
            if(layer.image && layer.visible)
            {
                
                var s = new game.Sprite(layer.image)
                var offsetx=layer.offsetx?layer.offsetx:0
                var offsety=layer.offsety?layer.offsety:0
                s.position.y=offsety
                s.offsety=layer.offsety
                // if(game.imgDisplacementY)
                //     s.position.y+=game.imgDisplacementY
                
                s.position.x=offsetx+this.displacementX
                s.scale.x=XScale;
                this.imgLayers.push(s);
            }else
            if(layer.objects)
            {
                var tilemap=this.tilemap;
                var objs = this.objs;
                var index = this.idx;
                var id = this.id;
                var displacementX = this.displacementX;
                layer.objects.forEach(function(obj) 
                {
                    var s = tilemap.spriteFromTile(obj.gid);
                    s.anchor.set(0,0);
                    s.objx=obj.x
                    s.objy=obj.y
                    s.position.y=obj.y-obj.height;
                    s.position.x=obj.x + displacementX;
                    s.originalPosx=s.position.x
                    s.originalPosy=s.position.y
                    s.gid = obj.gid;
                    s.id = obj.id;
                    s.bidx = index;
                    s.bidd = id;
                    objs.push(s);
                    //
                 //game.scene.bgLayer.push(layer);
                });
            }else
            if(layer.data)
            {
                var tilemap=this.tilemap
                if(key==layerSx)
                {
                    var layer = this.tilemap.layers[key];
                    for (var j = 0; j < layer.tiles.length;++j)
                    {
                        var sprite =layer.tiles[j];
                        sprite.anchor.set(sprite.width,0);
                        sprite.x+=(sprite.width+1)
                        if(!Fake3d)
                            sprite.scale.x=0.3
                    }
                }
                if(key==layerDx)
                {
                    var layer = this.tilemap.layers[key];
                    for (var j = 0; j < layer.tiles.length;++j)
                    {
                        var sprite =layer.tiles[j];
                        sprite.anchor.set(0,0);
                        if(!Fake3d)
                            sprite.scale.x=0.3
                    }
                }
                
                for (var j = 0; j < layer.tiles.length;++j)
                {
                    layer.tiles[j].x+= this.displacementX; 
                }

            }
          }
            
        }

    },
    calculateBlockSafe:function()
    {
        var layer = this.tilemap.layers.main;
        this.blockSafe=[];  
        var w = this.tilemap.layers.main.width
        var min =w;
        
        for (var i = 0; i < w; i++) 
        {
            this.blockSafe.push(0);
        }   
        
        var length = layer.tiles.length;
        for (var i = 0; i < length; i++)
        {
            var tile = layer.tiles[-1+ length-i];
            //if(tile.tileid)
//console.log(tile)
            if(!IsCloud(tile.tileid))
            {
                if(tile.tilex!==undefined)
                {
                    
                    if(tile.tilex<min)
                    {
                        min = tile.tilex;
                        this.startingx = tile.position.x
                    }
                    var bs = this.blockSafe[tile.tilex];
                    if(tile.tiley == bs || bs==0)
                    {
                        this.blockSafe[tile.tilex] = tile.tiley-1
                    }
                }
            }
            //console.log(JSON.stringify(this.blockSafe));
        }

        var value=0;
        for (var i = 0; i < w; i++) 
        {
            var idx = -1+w-i;
            if(this.blockSafe[idx] == 0)
            {
                this.blockSafe[idx] = value;
            }
            else
            {
                value = this.blockSafe[idx];
            }
        }   
        
        value = this.blockSafe[0];
        for (var i = 0; i < w; i++) 
        {
            var idx = i;
            if(this.blockSafe[idx] == 0)
            {
                this.blockSafe[idx] = value;
            }
            else
            {
                value= this.blockSafe[idx];
            }
        }   
    },
    createObjColliders:function()
    {
        this.objsBodies=[];
        for (var i = 0; i < this.objs.length; i++) 
        {
            var sprite = this.objs[i];
            var body = this.addBodyForObj(sprite);
            body.id = sprite.id;
            body.gid = sprite.gid;
            body.bidd = sprite.bidd;
            body.objx=sprite.objx;
            body.objy=sprite.objy;
            body.sprite = sprite;            
            this.objsBodies.push(body);
        }
    },
    createColliders:function()
    {
        var layer = this.tilemap.layers.main;
        this.blockBodies=[];
        if(!FR_PASSTROUGH)
        for (var i = 0; i < this.tilemap.layers.main.tiles.length; i++) 
        {
            var tile = layer.tiles[i];
            var body = this.addBodyForTile(tile,i);
            this.blockBodies.push(body);
        }
    },
    update:function()
    {
        for (var i = 0; i < this.objs.length; i++) 
        {
            var obj = this.objs[i];
            obj.position.y=obj.originalPosy+3*Math.sin(obj.position.x+this.deltapack/20);
        }
        this.deltapack+=1;
    },
    
    isInside:function(x)
    {
      if(x<this.startingx)  return false;
      return true;
    },
    // updateSkewdLayer:function()
    // {
    //     var block=this
    //     kFactor=900;
    //     var tilemap=block.tilemap
    //     for (var key in tilemap.layers) {
    //       if (tilemap.layers.hasOwnProperty(key)) 
    //       {
              
    //           if(key==layerBg)
    //           {
    //              var diff = game.scene.player.prevPosX - game.scene.player.sprite.x;
    //              var layer = tilemap.layers[key];
    //              for (var j = 0; j < layer.tiles.length;++j)
    //              {
    //                 layer.tiles[j].position.x-= XSpeed*diff * game.delta;

    //                 //layer.tiles[j].position.y+= 6*game.disp * game.delta;
    //              }
    //           }
             
    //          if(key==layerSx)
    //          {
    //             var layer = tilemap.layers[key];
    //             var size=0
    //             if(layer.tiles.length>0)
    //             size=layer.tiles[0].width/2;
    //             var camPos = game.scene.camera.position.x 
    //             for (var j = 0; j < layer.tiles.length;++j)
    //             {
    //                 var p = layer.tiles[j].x;
                    
    //                 var diff = camPos - (p)
    //                 if(diff>-block.size)
    //                 {
    //                     //console.log("diff:" + diff);
    //                     var v = -game.width/2 -diff;
    //                     if(v > block.size/2)
    //                     {
    //                         v = v-block.size
    //                     }
    //                     var kk=(v/kFactor)
    //                     if(kk<1)
    //                     if(v>0)
    //                     {
    //                         layer.tiles[j].scale.x= kk;
    //                     }
    //                     else
    //                     {
    //                         layer.tiles[j].scale.x = 0.00;
    //                     }
    //                 }
    //             }
    //          }
    //          if(key==layerDx)
    //          {
    //             var layer = tilemap.layers[key];
    //             var size=0
    //             if(layer.tiles.length>0)
    //             size=layer.tiles[0].width/2;
    //             var camPos = game.scene.camera.position.x 
    //             for (var j = 0; j < layer.tiles.length;++j)
    //             {
    //                 var p = layer.tiles[j].x;
                    
    //                 var diff = camPos - (p)
    //                 if(diff>-block.size)
    //                 {
    //                     // console.log("diff:" + diff);
    //                     var v = game.width -(game.width/2 -diff);
    //                     if(v > block.size/2)
    //                     {
    //                         v = v-block.size
    //                     }
    //                     var kk=(v/kFactor)
    //                     if(kk<1)
    //                     if(v>0)
    //                     {
    //                         layer.tiles[j].scale.x= kk;
    //                     }
    //                     else
    //                     {
    //                         layer.tiles[j].scale.x = 0.00;
    //                     }
    //                 }
    //             }
    //          }
             
             
    //       }
    //     }
        
  
    // },
    moveX:function(displacementX){
        this.startingx -=displacementX
        this.displacementX-=displacementX
        for (var i = 0; i < this.objs.length; i++) 
        {
            var obj = this.objs[i];
            obj.position.x-=displacementX;
        }
        for (var i = 0; i < this.objsBodies.length; i++) 
        {
            var obj = this.objsBodies[i];
            obj.position.x-=displacementX;
        }
        
        for (var i = 0; i < this.blockBodies.length; i++) 
        {
            var obj = this.blockBodies[i];
            obj.position.x-=displacementX;
        }
        for (var i = 0; i < this.imgLayers.length; i++) 
        {
            var obj = this.imgLayers[i];
            obj.position.x-=displacementX;
        }
        
        for (var key in this.tilemap.layers) 
        {
          if (this.tilemap.layers.hasOwnProperty(key)) 
          {
            var layer = this.tilemap.layers[key];
            for (var i = 0; i < layer.tiles.length; i++) 
            {
                var tile = layer.tiles[i];
                tile.position.x-= displacementX;
            }
          }
        }
     },
    indexOfId:function(array, body){
        for(var i=0;i<array.length;++i)
        {
            if(array[i].id == body.id)
            {
                return i;
            }
        }
        return -1;
    },
    removeFromLists:function(body)
    {
        var done = false;
        if(body.sprite.bidx == this.idx)
        {
            var index = this.indexOfId(this.objsBodies,body);
            if (index > -1) {
            //TODO this can be improved splice!!
                this.objsBodies.splice(index, 1);
            }
            var index = this.indexOfId(this.objs,body);
            if (index > -1) {
            //TODO this can be improved splice!!
                this.objs.splice(index, 1);
            }
            done=true;   
        }
        return done;
    },
    remove:function(){
        for (var i = 0; i < this.blockBodies.length; i++)
        {
            this.blockBodies[i].remove();
        }
        this.tilemap.remove();

        for (var i = 0; i < this.imgLayers.length; i++) 
        {
            this.imgLayers[i].remove();
        }
        this.imgLayers=[];
        for (var i = 0; i < this.objs.length; i++) 
        {
            this.objs[i].remove();
        }
        this.objs=[];
        for (var i = 0; i < this.objsBodies.length; i++) 
        {
            this.objsBodies[i].remove();
        }
        this.objsBodies=[];
        
    },
    addBodyForTile: function(tile) 
    {
        //console.log(tile);
        var body = new game.Body();
        body.tileid = tile.tileid;
        var x = tile.x + this.tilemap.tileWidth / 2;
        var y = tile.y + this.tilemap.tileHeight / 2;
        body.position.set(x, y);
        body.static = true;
        var shape = new game.Rectangle(this.tilemap.tileWidth, this.tilemap.tileHeight);
        body.addShape(shape);
        body.addTo(game.scene.world);
        return body;
    },
    addBodyForObj: function(objSprite) {
        var body = new game.Body();
        var x = objSprite.x + objSprite.width / 2;
        var y = objSprite.y + objSprite.height / 2;
        body.position.set(x, y);
        body.collisionGroup=1;
        body.static = true;
        var shape = new game.Rectangle(objSprite.width * 0.9, 0.9*objSprite.height);
        body.addShape(shape);
        body.addTo(game.scene.world);
        return body;
    }

});



});
