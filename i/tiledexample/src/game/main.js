game.module(
    'game.main'
)
.require(
    'plugin.pixi')
.body(function() {

game.addAsset('sprite.png');

game.createScene('Main', {
    init: function() {
    	this.sprite = new game.TilingSprite('sprite.png', game.width, game.height);
    	this.sprite.addTo(this.stage);
        var filter = new game.filters.CRTFilter();
        filter.vignetting=0.3
        filter.curvature=2;
        var filter1 = new game.filters.RGBSplitFilter();
        filter1.blue[0]=0;
        filter1.blue[1]=0;
        filter1.green[0]=0;
        filter1.green[1]=2;
        filter1.red[0]=-2;
        filter1.red[1]=0;
        
        this.sprite.filters = [filter1,filter];
    	this.sprite2 = new game.Sprite('sprite.png');
    	this.sprite2.anchorCenter();
    	this.sprite2.x = game.width/2
    	this.sprite2.y = game.height/2
    	this.sprite2.addTo(this.stage);
    	
    },

    update: function() {
    	this.sprite.tilePosition.x -= 300 * game.delta;
    	this.sprite.tilePosition.y -= 100 * game.delta;
    },
    keydown: function(key) 
    {
        if (key === 'SPACE') 
        {
            game.system.setScene("Main");
        }
        
    }

});


});
