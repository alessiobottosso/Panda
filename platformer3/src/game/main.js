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
        
        //try{
        //console.log("scene init");
        var d= 1000
        Lambda=1;
        this.points=0;
        this.time=0;
        this.initialCorrectionX=d/10+00;
        this.startingTime = Date.now();
        this.layers =[];
        
        this.layers.push("layer_08.png");
        this.layers.push("layer_07.png");
        this.layers.push("layer_06.png");
        
         this.layers.push("layer_05.png");
         
        // this.layers.push("layer_04.png");
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
        
        //this.player = new game.Player(1960, 960);
        this.player = new game.Player(d, 1400);
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

        this.maxTime=99;
        this.text = new game.Text(this.maxTime);
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)

        this.maxscore = CreateText(FR_PLAYERMAXSCORE,0,0,0,50);
        this.maxscore.cache=true;
        this.maxscore.anchor.set(0,0);
        this.maxscore.x=game.width*0.96-this.maxscore.width*this.maxscore.scale.x
        this.maxscore.y+=game.height * 0.05 + this.maxscore.height/2;
        this.maxscore.addTo(game.scene.stage)


        this.score = CreateText("0",0,0,0,50);
        this.score.x=this.text.width/2
        this.score.y+=game.height * 0.05 + this.text.height/2;
        this.score.addTo(game.scene.stage)

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
        // this.vfx1 = this.createVFX();
        // this.vfx1.addTo(game.scene.container2)

        // this.vfx2 = this.createVFX();
        // this.vfx2.addTo(game.scene.container2)

        // this.vfx3 = this.createVFX();
        // this.vfx3.addTo(game.scene.container2)

        
        this.vfxindex=0;
    },
    createVFX:function()
    {
        // var speed1 =100;
        // var sheet = new game.SpriteSheet(VFX, 104, 104);
        // var sprite = new game.Animation(sheet.textures);
        // sprite.addAnim('stand', [0,0,11,0,12,12], { speed: 5, loop: true });
        // //sprite.addAnim('a', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
        // //sprite.addAnim('run', [19,20,21,22,23,24,25,26,27,28,29,30,31],  { speed: speed1, loop: false });
        // sprite.anchorCenter();
        
        // sprite.speed = 10;
        // sprite.play('jump1');

        // return sprite;        
    },
    vfxspecial:function(x, y)
    {
        // try{
        // this.vfx1.position.set(x, y);
        // this.vfx1.play('jump1');
        // }
        // catch(e)
        // {
        //     console.log(e);
        // }
    },
    runVfx:function(x,y)
    {
        // return;
        // if(this.vfxindex==0)
        // {
        //     this.vfx2.position.set(x, y);
        //     this.vfx2.play('run');
        //     ++game.scene.vfxindex;
        // }
        // else
        // {
        //     this.vfx3.position.set(x, y);
        //     this.vfx3.play('run');
        //     game.scene.vfxindex=0;
        // }
    },
    jumpVfx:function(x,y)
    {
        // this.vfx1.position.set(x, y);
        // this.vfx1.play('jump');
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
    update:function()
    {
        this.loadingUpdate();
        CommonUpdate();
        if(game.scene.loading) return;
        if(game.scene.timeComputated <0 )
        {
            FR_SCORE = game.scene.points;
            game.scene.loading=true;
            this.text.setText(0);

            //GoToScene("Outro")
            this.containerConnect.visible=true;
            SendEndGame();
        }
        
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
            if(this.timeComputated > 0)
                this.text.setText(this.timeComputated);
        }
        
        if(this.scoreComputated!=this.points)
        {
            this.scoreComputated = this.points;
            this.score.setText(this.points);
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
        if(game.scene.player.sprite.position.x > veryVeryFar)
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
        
        
        if(game.scene.player.sprite.position.x > game.built-game.width)
        {
            this.createBlock(game.built, game.blockIdx);
        }

        if(!updated)
        {
            this.updateBackground();            
        }
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

    createBlock:function(displacementX)
    {
        var index = game.blockIdx
        game.blockIdx++;
        var pRnd = PRnd(Lambda)
        //console.log(pRnd)
        this.prevPrevBlock = this.previousBlock;
        this.previousBlock = this.block;
        
        if(this.prevPrevBlock)
        {
            this.prevPrevBlock.remove();
        }
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
        //console.log("l: "+ Lambda);
        var blockName= 'level'+ pRnd + '.json' ;
        if(TestLevel==true)
        {
            blockName= LEVEL_DESIGN
        }
        this.block = new game.Block(blockName, displacementX, index);
        this.block.imgLayers.forEach(function(element) 
        {
            element.addTo(game.scene.container0)
        });
        
        this.block.tilemap.addTo(this.container0);
        
        this.block.objs.forEach(function(element) 
        {
            element.addTo(game.scene.container0)
        });

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
        if (key === 'LEFT') {
            player.alive=false;
        }
        if (key === 'RIGHT') {
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
    init: function(json, displacementX, index) {
        
        if(!displacementX)
        {
            displacementX=0;
        }
        this.idx = index;
        this.name = json;
        this.tilemap = new game.Tilemap(json);
        this.size = this.tilemap.pixelWidth;
        this.imgLayers=[];
        this.objs=[];
        this.displacementX = displacementX;
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
                layer.objects.forEach(function(obj) 
                {
                    var s = tilemap.spriteFromTile(obj.gid);
                    s.anchor.set(0,0);
                    s.objx=obj.x
                    s.objy=obj.y
                    s.position.y=obj.y-obj.height;
                    s.position.x=obj.x+displacementX
                    s.originalPosx=s.position.x
                    s.originalPosy=s.position.y
                    s.gid = obj.gid;
                    s.id = obj.id;
                    s.bid = index;
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
                
                if(Fake3d)
                if(key==layerBg)
                {
                    var newDisplacement = 0
                    if(game.scene.camera)
                    {
                        LowLimit - game.scene.camera.position.y;
                    }

                    var layer = this.tilemap.layers[key];
                    for (var j = 0; j < layer.tiles.length;++j)
                    {
                        var sprite =layer.tiles[j];
                        sprite.scale.x=XScale
                        var xx = j%layer.width
                        // sprite.position.x = 
                        //     game.scene.initialCorrectionX + displacementX +
                        //     (sprite.position.x-displacementX)*0.9;
                        sprite.position.x = 
                            game.scene.initialCorrectionX +
                            (sprite.position.x)*XScale;
                        sprite.originalPosx = sprite.position.x + displacementX;
                            
                        // if(game.imgDisplacementY)
                        //     sprite.position.y+=game.imgDisplacementY

                    }
                }
                
                for (var j = 0; j < layer.tiles.length;++j)
                {
                    layer.tiles[j].x+= displacementX; 
                }

            }
          }
            
        }
        
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
            if(!IsCloud(tile.tileid))
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
                value= this.blockSafe[idx];
            }
        }   
        
        value=this.blockSafe[0];
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


        //console.log(JSON.stringify(this.blockSafe));

        
        this.blockBodies=[];
        for (var i = 0; i < this.tilemap.layers.main.tiles.length; i++) 
        {
            var tile = layer.tiles[i];
            var body = this.addBodyForTile(tile,i);
            this.blockBodies.push(body);
        }
        
        this.objsBodies=[];
        for (var i = 0; i < this.objs.length; i++) 
        {
            var sprite = this.objs[i];
            var body = this.addBodyForObj(sprite);
            body.id = sprite.id;
            body.gid = sprite.gid;
            body.bid = sprite.bid;
            body.objx=sprite.objx;
            body.objy=sprite.objy;
            body.sprite = sprite;            
            this.objsBodies.push(body);
        }
        
        // this.fgSprites=[];
        // if(this.tilemap.layers.fg)
        // for (var i = 0; i < this.tilemap.layers.fg.tiles.length; i++) 
        // {
        //     var tile = layer.tiles[i];
        //     this.fgSprites.push(tile);
        // }
        this.deltapack=0;
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
        if(body.sprite.bid == this.idx)
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
