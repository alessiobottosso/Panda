game.module(
    'game.myloader'
)
.body(function() {

    game.createClass("myLoader", "Loader", {
        init: function(e) {
            var t = 40
              , i = 2 * t + 2 + t - 1
              , s = 6;
            this.bar = new game.Graphics,
            this.bar.beginFill("#222222"),
            this.bar.drawRect(0, 0, 2+ i*0.75, s),
            this.bar.scale.set(5, 5),
            this.bar.position.set(
                game.system.width / 2 - 4 * i / 2,
                game.system.height / 2 - 4 * s / 2),
            this.bar.addTo(this.stage);
            
            for (var n = game.Texture.fromImage(
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsJChou/OwccAAAABdJREFUCNdj+P///38GBob/TAxQQBIDACmfBQiabBwGAAAAAElFTkSuQmCC"),
                o = 0; t > o; o++) {
            
                var a = new game.Sprite(n);
                a.position.x = 1 + 2.27 * o,
                a.position.y = 1,
                a.scale.y=0.5,
                a.visible = !1,
                a.addTo(this.bar)
            }
            
            100 === this.percent && this.onProgress(100)
        },
        onProgress: function() {
            for (var e = Math.ceil(this.bar.children.length / 100 * this.percent),
                t = 0; e - 1 >= t; t++)
                this.bar.children[t].visible = !0
        },
        onComplete: function() {
            game.Timer.add(200, this.changeScene.bind(this))
        },
        changeScene: function() {
            game.system.setScene(this.scene)
        }
    })


});
