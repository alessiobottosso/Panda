game.module(
    'game.main'
)
.body(function() {


game.addAsset('test1.fnt');
//game.addAsset('test1_0.png');
//game.addAsset('example.json');

game.createScene('Main', {
        init: function() {
            this.text = new game.Text('Hello Panda!');
            this.text.addTo(this.stage);
            
            this.text.fontClass.letterSpacing = 1
            this.text.updateText();
            
            this.text.cache = true;
            this.text._cachedSprite.tint = '#FFFFFF';
            this.text._cachedSprite.tintAlpha = 0;
        },
        
        mousedown: function() {
            this.text.fontClass.letterSpacing = 10
            this.text.updateText();
            this.text._cachedSprite.tint = '#00ff00';
            this.text._cachedSprite.tintAlpha = 0.5;
        },
    
        mouseup: function() {
            this.text.fontClass.letterSpacing = 1
            this.text.updateText();
            this.text._cachedSprite.tint = '#FFFFFF';
            this.text._cachedSprite.tintAlpha = 0;
        }
    });
});

//https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/


