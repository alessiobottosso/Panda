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

        var text = new game.Text('Hello Panda');
        text.addTo(this.stage);
    },
    
    update: function() {
        if (!game.input.motion) return;
        var accel = game.input.motion.accelerationIncludingGravity;
        this.sprite.x = game.width / 2 - accel.x * 20;
        this.sprite.y = game.height / 2 - accel.y * 20;

        text.setText ("Accel y: " + accel.y);

        if (accel.y >= 15 || accel.y <= -15)
        {
            navigator.vibrate(200);
        }
    }
});

});
