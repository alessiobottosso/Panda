game.module(
    'game.main'
)
.body(function() {

game.addAsset('minecraft.fnt');

game.createScene('Main', {
    init: function() 
    {
    var text=Math.random()*1000;
    text=~~(text)
    var etext = new game.Text(text);
    etext.addTo(this.stage)
    
        
        etext.cache = true;
		etext._cachedSprite.tint = "#668899";
		etext._cachedSprite.tintAlpha = 1; 	
	this.scenetext = etext
    },

    update: function() {
        
    },
    keydown: function(key) 
    {
        if (key === 'SPACE') 
        {
            this.scenetext._cachedSprite.texture.remove();
            this.scenetext.remove();
            game.system.setScene("Main");
        }
        
    }

});


});
