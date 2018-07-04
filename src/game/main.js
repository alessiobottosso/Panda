game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
        var player = new game.Player();
        player.sprite.addTo(this.stage);
    }
});

game.createClass('Player', {
    init: function() {
        this.sprite = new game.Sprite('panda.png');
    }
});

});
