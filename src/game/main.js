game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', 
{
    init: function() 
    {
        var player = new game.Player();
        player.sprite.addTo(this.stage);
        
        var tween = new game.Tween(player.sprite.position);
        tween.to({ x: 200, y: 200 }, 2000);
        tween.start();

        game.Timer.add(1000, function() 
        {
            makeFullscreen('canvas');
            tween.pause();
            var remaining = tween.duration - tween.currentTime;
        });
    }
});

function makeFullscreen(id)
{	var el = document.getElementById(id);	
    if	(el.requestFullScreen) el.requestFullScreen();	
    else if	(el.webkitRequestFullScreen) el.webkitRequestFullScreen();	
    else if	(el.mozRequestFullScreen   ) el.mozRequestFullScreen();
}


game.createClass('Player', {
    init: function() {
        this.sprite = new game.Sprite('panda.png');
    }
});

});
