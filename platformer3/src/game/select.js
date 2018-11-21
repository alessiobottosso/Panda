game.module(
    'game.select'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.createScene('Select', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
    	    AddForegroundUI();
    	    this.rowLocked=2;
            this.text = CreateText(game.name,HALF_WIDTH,
            0.025*game.height,0,25)
            this.text.addTo(game.scene.stage)
            var selectplayer = GetLocalizedString("SELECTPLAYER");
            this.text = CreateText(selectplayer,
            HALF_WIDTH, 0.076*game.height,0,39)
            this.text.addTo(game.scene.stage)
    
    	    this.x=0;
    	    this.y=0;
            this.scalex=107;
            this.scaley=107;
            this.yy = game.height*0.45;
    	    this.xx = HALF_WIDTH- this.scalex*3;
    	    
            var s = new game.Sprite(GREEK_UP)
            s.x = HALF_WIDTH
            s.y = game.height*0.14
            s.anchorCenter();
            s.addTo(game.scene.stage);

            var s = new game.Sprite('block.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.282
            s.scale.y=2.95;
            s.scale.x=8;
            s.anchorCenter();
            s.addTo(game.scene.stage);
    	    
            var s = new game.Sprite(GREEK_DOWN)
            s.x = HALF_WIDTH
            s.y = game.height*0.424
            s.anchorCenter();
            s.addTo(game.scene.stage);

            this.text = CreateText("Surname",HALF_WIDTH,
            0.38*game.height,0,35)
            this.text.addTo(game.scene.stage)



            var s = new game.Sprite(PORTRAIT+'Bg1.png')
            s.x = 0+HALF_WIDTH
            s.y = 8+4+game.height*0.25
            s.anchorCenter();
            s.scale.x=1;
            s.scale.y=1;
            s.addTo(game.scene.stage);
    

            this.plotSelectedImg();

            this.buildGrid();
        

        this.button = new CreateDefaultButton(
            HALF_WIDTH,0.95*game.height,"CONFIRM",30,
            function()
            {  
                game.scene.start();
            });

        this.button.addTo(game.scene.stage);

        
            var s = new game.Sprite(PORTRAIT+'Fg.png')
            
            s.x = this.x*this.scalex;
            s.y = this.y*this.scaley;
            s.scale.x=0.5;
            s.scale.y=0.5;
            this.xx1=-8+this.xx
            this.yy1=-8+this.yy
            s.x+=this.xx1;
            s.y+=this.yy1;
            s.addTo(game.scene.stage);
            this.frame=s;
        
            this.prevX=this.x;
            this.prevY=this.y;


    	},
    	plotSelectedImg: function()
    	{
    	    if(this.selectedImg) this.selectedImg.remove();
            this.selectIdx = this.x+this.y*6;
            //if(this.selectIdx>=6)this.selectIdx = 1;
            var s = new game.Sprite(PORTRAIT+this.selectIdx+'.png')
            s.x = HALF_WIDTH
            s.y = 8+2+game.height*0.25
            s.anchorCenter();
            s.scale.x=1;
            s.scale.y=1;
            s.addTo(game.scene.stage);
            this.selectedImg = s;
                	    

    	},
    	buildGrid:function ()
    	{
    	    
            for(var i=0;i<24;++i)
            {
                var j=(i<MaxPlayer)?i:1;
                var y=~~((i)/6);
                var x=(i)%6;
                this.plot(x,y,PORTRAIT+'Bg.png',0)
                this.plot(x,y,PORTRAIT+j+'.png',0+4,4)
                if(y>=this.rowLocked)
                    this.plot(x,y,PORTRAIT+'Lock.png',4,4)
                if(i==0)
                {
                    this.pressed = this.plot(x,y,PORTRAIT+j+'b.png',0+4,4)
                    this.pressed.alpha=0;
                }
                
            }

    	},
    	plot:function(x,y,name, offset,offset1)
    	{
                var s = new game.Sprite(name)
                s.x = x*this.scalex;
                s.y = y*this.scaley;
                s.scale.x=0.5;
                s.scale.y=0.5;
                s.x+=this.xx+offset;
                s.y+=this.yy+offset;
                s.addTo(game.scene.stage);
                return s
    	},
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                this.start();
            }
            if (key === 'LEFT') 
            {
                PlaySound(SOUND_SELECT);
                this.x--
                if(this.x<0)
                    this.x=0
            }
            if (key === 'RIGHT') 
            {
                PlaySound(SOUND_SELECT);
                this.x++
                if(this.x>5)
                    this.x=5
            }
            if (key === 'UP') 
            {
                PlaySound(SOUND_SELECT);
                this.y--
                if(this.y<0)
                    this.y=0
            }
            if (key === 'DOWN') 
            {
                PlaySound(SOUND_SELECT);
                if(this.y+1<this.rowLocked)
                this.y++
                if(this.y>3)
                    this.y=3
            }
        },
        rndSelect:function()
        {
            var length = this.rowLocked*6 - 1
            this.selectIdx=1+Math.floor((Math.random() * length));
            if(this.selectIdx==0)
                this.rndSelect()
            this.x = this.selectIdx % 6; 
            this.y = ~~(this.selectIdx / 6) ;
            this.plotSelectedImg();
        },
    	start: function()
    	{
    	    if(this.selectIdx==0)
    	    {
    	        this.rndSelect();
    	    }
    	    game.selectIdx = this.selectIdx;
    	    GoToScene('Tutorial');
    	    //GoToScene('Main');
    	},
    	select: function(x, y)
    	{
    	    if (y < game.height*0.40) return;
    	    if (y > game.height*0.80) return;
    	    PlaySound(SOUND_SELECT);
    	    var k=0;
    	    for(var i=0;i<5;++i)
    	    {
    	        if(y<(i)*this.scaley+this.yy)
    	        {
    	            k=i;
    	            break;
    	        }
    	    }

	        if(k-1<this.rowLocked )
            {
        	    if(k>0) 
    	            this.y =k-1;
        	            
        	    var j=-1;
        	    for(var i=0;i<7;++i)
        	    {
        	        if(x<(i)*this.scalex+this.xx)
        	        {
        	            j=i;
        	            break;
        	        }
        	    }
        	    if(j>0) this.x =j-1;
            }
            
            if(this.x==0 && this.y==0)
            {
                this.rndSelect();    
            }
    	},
    	mousedown: function(x, y)
    	{
    	    this.super(x,y)
    	    this.select(x,y);
    	    var x1=this.xx;
    	    var x2=this.xx + 96;
    	    var y1=this.yy;
    	    var y2=this.yy + 96;
    	    if(x>x1 && x<x2 && y>y1&&y<y2)
    	        this.pressed.alpha=1;
        },
    	mouseup: function(x, y)
    	{
    	    this.super(x,y)
    	    this.pressed.alpha=0;
        },
        update:function()
        {
    	    CommonUpdate();
            if(this.prevX!=this.x)
            {
                this.frame.x = this.x*this.scalex+this.xx1;
                this.plotSelectedImg();
            }
            if(this.prevY!=this.y)
            {
                this.frame.y = this.y*this.scaley+this.yy1;
                this.plotSelectedImg();
            }
            this.prevX=this.x;
            this.prevY=this.y;

        }
    	
    });
    


});
