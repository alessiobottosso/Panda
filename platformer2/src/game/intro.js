game.module(
    'game.intro'
)
.require(
    'game.common',
    'plugin.essentials',
)
.body(function() {

    game.createScene('Intro', 
    {
        backgroundColor: BACKGROUND_COLOR,
        
        init: function() 
    	{
        this.text = new game.Text("00 - Intro");
        this.text.cache=true;
        this.text.anchor.set(0,0);
        this.text.x=game.width/2 - this.text.width/2
        this.text.y+=game.height * 0.05 + this.text.height/2;
        this.text.addTo(game.scene.stage)

        
        this.button = CreateDefaultButton(HALF_WIDTH,0.95*game.height,"Skip",35,
            function()
            {
                game.scene.start();
            });

            
        AddForegroundUI();
    	},
        update:function()
        {
    	    CommonUpdate();
        },
        keydown: function(key) 
        {
            if (key === 'SPACE') 
            {
                game.scene.start();
            }
        },
    	start: function()
    	{
    	    GoToScene('Select');
    	},

    });


});
