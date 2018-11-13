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
    	    
            this.text = new game.Text("01 - Select");
            this.text.cache=true;
            this.text.anchor.set(0,0);
            this.text.x=game.width/2 - this.text.width/2
            this.text.y+=game.height * 0.05 + this.text.height/2;
            this.text.addTo(game.scene.stage)
    
    	    this.x=0;
    	    this.y=0;
            this.scalex=107;
            this.scaley=107;
            this.yy = game.height*0.4;
    	    this.xx = HALF_WIDTH- this.scalex*3;
    	    

            var s = new game.Sprite(PORTRAIT+'Bg.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.25
            s.anchorCenter();
            s.scale.x=1;
            s.scale.y=1;
            s.addTo(game.scene.stage);
    

            this.plotSelectedImg();

            this.buildGrid();
        

        this.button = new CreateDefaultButton(
            HALF_WIDTH,0.95*game.height,"select",40,
            function()
            {  
                game.scene.start();
            });

        this.button.addTo(game.scene.stage);

        // this.button = new game.ForgeButton(BUTTON_PRESSED, BUTTON_RELEASED,
        //     HALF_WIDTH,0.9*game.height,"button",{},40,"#555555","#550055",function()
        //     {  
        //         game.scene.start();
        //     });

        // SetDefaultButtonBehavior(game.scene.button,100);
        // this.button.addTo(game.scene.stage);
        
            var s = new game.Sprite(PORTRAIT+'Fg.png')
            
            s.x = this.x*this.scalex;
            s.y = this.y*this.scaley;
            s.scale.x=0.5;
            s.scale.y=0.5;
            s.x+=this.xx;
            s.y+=this.yy;
            s.addTo(game.scene.stage);
            this.frame=s;
        
            this.prevX=this.x;
            this.prevY=this.y;
        
    	},
    	plotSelectedImg: function()
    	{
    	    if(this.selectedImg) this.selectedImg.remove();
            this.selectIdx = this.x+this.y*6;
            if(this.selectIdx>3)this.selectIdx = 1;
            var s = new game.Sprite(PORTRAIT+this.selectIdx+'.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.25
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
                var j=(i>0)?1:0;
                var x=~~((i)/4);
                var y=(i)%4;
                this.plot(x,y,PORTRAIT+'Bg.png',0)
                this.plot(x,y,PORTRAIT+j+'.png',+4)
            }

    	},
    	plot:function(x,y,name, offset,scale)
    	{
                var s = new game.Sprite(name)
                s.x = x*this.scalex;
                s.y = y*this.scaley;
                s.scale.x=0.5;
                s.scale.y=0.5;
                s.x+=this.xx;
                s.y+=this.yy+offset;
                s.addTo(game.scene.stage);
    	},
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                this.start();
            }
            if (key === 'LEFT') 
            {
                this.x--
                if(this.x<0)
                    this.x=0
            }
            if (key === 'RIGHT') 
            {
                this.x++
                if(this.x>5)
                    this.x=5
            }
            if (key === 'UP') 
            {
                this.y--
                if(this.y<0)
                    this.y=0
            }
            if (key === 'DOWN') 
            {
                this.y++
                if(this.y>3)
                    this.y=3
            }
        },
    	start: function()
    	{
    	    game.selectIdx = this.selectIdx;
    	    GoToScene('Tutorial');
    	    //GoToScene('Main');
    	},
    	select: function(x, y)
    	{
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
    	    
    	    var k=0;
    	    for(var i=0;i<5;++i)
    	    {
    	        if(y<(i)*this.scaley+this.yy)
    	        {
    	            k=i;
    	            break;
    	        }
    	    }
    	    if(k>0) this.y =k-1;
    	},
    	mousedown: function(x, y)
    	{
    	    this.super(x,y)
    	    this.select(x,y);
        },
        update:function()
        {
    	    CommonUpdate();
            if(this.prevX!=this.x)
            {
                this.frame.x = this.x*this.scalex+this.xx;
                this.plotSelectedImg();
            }
            if(this.prevY!=this.y)
            {
                this.frame.y = this.y*this.scaley+this.yy;
                this.plotSelectedImg();
            }
            this.prevX=this.x;
            this.prevY=this.y;

        }
    	
    });
    


});
