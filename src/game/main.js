game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
        makeFullscreen('pandaDebug');
        var player = new game.Player();
        player.sprite.addTo(this.stage);
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
