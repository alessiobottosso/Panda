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
        this.text = new game.Text("01 - Select");
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)
        
        this.buildGrid(130,400);
        
        var j=1;
        var s = new game.Sprite(PORTRAIT+j+'.png')

        s.x = HALF_WIDTH
        s.y = game.height*0.20
        s.anchorCenter();
        s.scale.x=1.25;
        s.scale.y=1.25;
        s.addTo(game.scene.stage);

        this.button = new game.ForgeButton(BUTTON_PRESSED, BUTTON_RELEASED,
            HALF_WIDTH,0.9*game.height,"button",{},40,"#555555","#550055",function()
            {  
                GoToScene('Tutorial');
            });
        SetDefaultButtonBehavior(game.scene.button,100);
        this.button.addTo(game.scene.stage);
    
            //GoToScene('Main');
    	},
    	buildGrid:function (xx,yy)
    	{
        var scalex=110*0.75;
        var scaley=150*0.75;
        for(var i=0;i<24;++i)
        {
            var j=(i>0)?1:0;
            var x=~~((i)/4);
            var y=(i)%4;
            
            var s = new game.Sprite(PORTRAIT+j+'.png')
        
            s.x = x*scalex;
            s.y = y*scaley;
            s.scale.x=0.5;
            s.scale.y=0.5;
            s.x+=xx;
            s.y+=yy;
            s.addTo(game.scene.stage);
            
            
        }

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
    	
    });
    


});
