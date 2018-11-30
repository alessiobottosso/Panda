game.module(
    'game.main'
)
.body(function() {

game.addAsset('sprite.png');

game.createScene('Main', {
    init: function() {
    	this.sprite = new game.TilingSprite('sprite.png', game.width, game.height);
    	this.sprite.addTo(this.stage);

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
