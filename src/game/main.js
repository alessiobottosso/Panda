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

        myText = new game.SystemText('Hello Panda');
        myText.addTo(this.stage);

        maxY = 0;
        minY = 0;
    },
    
    update: function() 
    {
        if (!game.input.motion) return;
        var accel = game.input.motion.accelerationIncludingGravity;
        this.sprite.x = game.width / 2 - accel.x * 20;
        this.sprite.y = game.height / 2 - accel.y * 20;

        if (accel.y > maxY)
        {
            maxY = accel.y;
        }
        if (accel.y < minY)
        {
            minY = accel.y;
        }

        //myText.text = "Max Y: " + maxY + " - Min Y: " + minY;

        if (accel.y >= 15 || accel.y <= -15)
        {
            myText.text = "VIBRATE";
            navigator.vibrate(10);
        }
        else
        {
            myText.text = "";
        }
    }
});

});
