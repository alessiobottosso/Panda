game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
        this.sprite = new game.Sprite('panda.png');
        this.sprite.anchorCenter();
        this.sprite.addTo(this.stage);
    },
    
    update: function() {
        if (!game.input.motion) return;
        var accel = game.input.motion.accelerationIncludingGravity;
        this.sprite.x = game.width / 2 - accel.x * 20;
        this.sprite.y = game.height / 2 - accel.y * 20;

        if ((this.sprite.y >= ((game.height / 2) + 5)) || (this.sprite.y < ((game.height / 2) - 5)))
        {
            navigator.vibrate(200);
        }
    }
});

});
