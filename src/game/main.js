game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
        var player = new game.Player();
        player.sprite.addTo(this.stage);
    },
    
    update: function() {
        if (!game.input.motion) return;
        var accel = game.input.motion.accelerationIncludingGravity;
        player.sprite.x = game.width / 2 - accel.x * 20;
        player.sprite.y = game.height / 2 - accel.y * 20;
    }
});

game.createClass('Player', {
    init: function() {
        this.sprite = new game.Sprite('panda.png');
    }
});

});
