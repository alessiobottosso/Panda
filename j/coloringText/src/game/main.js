game.module(
    'game.main'
)
.body(function() {

game.addAsset('minecraft.fnt');

game.createScene('Main', {
    init: function() 
    {
        if(game.auto===undefined)
        {
            game.auto=false;
        }
    for(var j=0;j<100;++j)
    {
        var x=j%10;
        var y=~~(j/10);
        this.createText(70*x,100*y);
        
    }
            
    },
    createText:function(x,y){
    var text=100+Math.random()*900;
    text=~~(text)
    var etext = new game.Text(text);
    etext.addTo(this.stage)
    etext.cache = true;
	etext._cachedSprite.tint = "#668899";
	etext._cachedSprite.tintAlpha = 1; 	
	etext.width=50;
	etext.x=x;
	etext.y=y;
    return etext;        
    },
    update: function() {
        if(game.auto)
        {
            game.scene.doChangeScene();
        }
    },
    doChangeScene:function()
    {
            // var canvasID =this.scenetext._cachedSprite.texture.baseTexture._id;
            // var canvas = document.getElementById(canvasID); //because we are looping //each location has its own canvas ID
            // var context = canvas.getContext('2d');

            // var canvas =this.scenetext._cachedSprite.texture.baseTexture.source;
            // delete canvas
            // this.scenetext._cachedSprite.texture.remove();
            // this.scenetext.remove();
            game.system.setScene("Main");

    },
    keydown: function(key) 
    {
        if (key === 'SPACE') 
        {
            game.scene.doChangeScene();
        }
        if (key === 'A') 
        {
            game.auto=true;
        }
    }

});


});
