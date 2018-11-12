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
        backgroundColor: "#222222",
        
        init: function() 
    	{
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
    
            this.selected = this.x+this.y*6;
            this.selected = 1;

            var s = new game.Sprite(PORTRAIT+this.selected+'.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.25
            s.anchorCenter();
            s.scale.x=1;
            s.scale.y=1;
            s.addTo(game.scene.stage);

            this.buildGrid();
        

        this.button = new game.ForgeButton(BUTTON_PRESSED, BUTTON_RELEASED,
            HALF_WIDTH,0.9*game.height,"button",{},40,"#555555","#550055",function()
            {  
                GoToScene('Tutorial');
            });

        SetDefaultButtonBehavior(game.scene.button,100);
        this.button.addTo(game.scene.stage);
        

            var s = new game.Sprite(PORTRAIT+'Fg.png')
            s.x = HALF_WIDTH
            s.y = game.height*0.25
            s.anchorCenter();
            s.scale.x=0.5;
            s.scale.y=0.5;
            s.addTo(game.scene.stage);
    
            this.selected = this.x+this.y*6;
            this.selected = 1;

        
    	},
    	
    	buildGrid:function ()
    	{
    	    
            for(var i=0;i<24;++i)
            {
                var j=(i>0)?1:0;
                var x=~~((i)/4);
                var y=(i)%4;

                this.plot(x,y,PORTRAIT+'Bg.png',0,0.5)
                this.plot(x,y,PORTRAIT+j+'.png',+4,0.5)
    
                
            }

    	},
    	plot:function(x,y,name, offset,scale)
    	{
                var s = new game.Sprite(name)
                s.x = x*this.scalex;
                s.y = y*this.scaley;
                s.scale.x=scale;
                s.scale.y=scale;
                s.x+=this.xx;
                s.y+=this.yy+offset;
                s.addTo(game.scene.stage);
    	},
    	start: function(x, y)
    	{
    	    
    	},
    	select: function(x, y)
    	{
    	    
    	},
    	mousedown: function(x, y)
    	{
    	    this.super(x,y)
    	    this.select(x,y);
        },
        update:function()
        {
    	    CommonUpdate();
        }
    	
    });
    


});
