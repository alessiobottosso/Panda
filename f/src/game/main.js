game.module(
    'game.main'
)
.require(
    'plugin.instantgames'
)
.body(function() {
//Same problem. As workaround I use FBInstant.context.chooseAsync() + FBInstant.updateAsync() 
//instead FBInstant.shareAsync().


// Assets by Facebook
game.addAsset('bg_blue.png');
game.addAsset('bg_grey.png');
game.addAsset('btn_opponent.png');
game.addAsset('like.png');
game.addAsset('love.png');

game.createScene('Main', {
    backgroundColor: '#8094ac',
    gameData: {
        gameState : [
            [-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]
        ],
        players: [],
        playerTurn: -1
    },
    playerInfo: {},
    contextInfo: {},
    
    init: function() {
        this.playerInfo.id = FBInstant.player.getID();
        this.playerInfo.name = FBInstant.player.getName();
        console.log(this.playerInfo.id);
        var photo = new game.Sprite('playerPhoto');
        photo.width = 120;
        photo.height = 120;
        photo.position.set(10, 10);
        photo.addTo(this.stage);
        
        var name = new game.SystemText(this.playerInfo.name);
        name.position.set(140, 10);
        name.addTo(this.stage);
        
        this.context = new game.SystemText("context: XXXX" );
        this.context.addTo(this.stage);

        this.context1 = new game.SystemText("XXXX" );
		this.context1.position.set(200, 20);
        this.context1.addTo(this.stage);
        
        this.entryPoint = new game.SystemText("entrypoint" + ": XXXX");
		this.entryPoint.position.set(00, 20);
		this.entryPoint.addTo(this.stage);

        this.lifeTextBox = new game.SystemText("life" + ": XXXX");
		this.lifeTextBox.position.set(200, 0);
		this.lifeTextBox.addTo(this.stage);

        UpdateContext(this.context,this.entryPoint);
        this.life = -1;

        GetData(this.life).then((data)=> {
            this.life = data.life;
            this.lifeTextBox.text = this.life;
            
            this.context1.text = FBInstant.getPlatform();
            });
            
        
        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 300;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.shareAsync.bind(this);
        this.opponentButton.addTo(this.stage);

        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 400;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.updateAsync.bind(this);
        this.opponentButton.addTo(this.stage);

        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 500;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.chooseAsync.bind(this);
        this.opponentButton.addTo(this.stage);

        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 600;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.getd.bind(this);
        this.opponentButton.addTo(this.stage);

        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 700;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.setd.bind(this);
        this.opponentButton.addTo(this.stage);

        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = 200;
        this.opponentButton.y = 800;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.setd2.bind(this);
        this.opponentButton.addTo(this.stage);
    },
        getd: function() {
                GetData(this.life).then((data)=> {
            this.life = data.life;
            this.lifeTextBox.text = this.life;
            });
        },
        
        setd: function() {
                UpdateData((this.life-1));

                //UpdateContext(this.context,this.entryPoint);
        },

        setd2: function() {
                UpdateData(5);

                //UpdateContext(this.context,this.entryPoint);
        },
        
        updateAsync: function() {
            var text ="X just invaded Y's village!";
            var data = { pandaSux : true }
            postUpdateAsync(text, data).then( ()=>{
                UpdateContext(this.context,this.entryPoint);
                
            })
	},
	
    
    chooseAsync: function() {
		//Type: ("NEW_CONTEXT_ONLY" | "INCLUDE_EXISTING_CHALLENGES" | "NEW_PLAYERS_ONLY")
        FBInstant.context.chooseAsync({
            //filters: ['NEW_CONTEXT_ONLY'],
            minSize: 2,
            maxSize: 2
        }).then(() => {
            var text ="text1";
            var data = { data1 : true }
            postUpdateAsync(text, data).then( ()=>{
                UpdateContext(this.context,this.entryPoint);
                
            })
                }
            )
        .catch(function(error) {
			console.log(error.message);
            throw error.message;
        })    
    },
    
    shareAsync: function() {
		/*
        FBInstant.context.chooseAsync({
            filters: ['INCLUDE_EXISTING_CHALLENGES'],
            minSize: 2,
            maxSize: 2
        }).then(this.updateContext.bind(this));
		*/

		//var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gcKEAkwofgEyAAAApJJREFUSMe1Vj1rKkEUnRk1loYVFtIFxEIWRANB7IKNCBYWsYliYam/wEDyCwIRIVjaKEEt0iSghdgsUcg2Spr41UkiuySYkMKNmU0xvH378vJ2d9R3qnXWuefunXPPHagoCvifQOb/+vLysrOzw3Hcx8cHBYNiDrIsb29vI4QQQi6XSzENswTBYBD9AoTw6OhokwTFYhEAgDQAADSbTTN7oeEhL5dLm81GgmrhcDien583cMi5XA5C+OOZX1xcGG43/gIIIUkfY/w7L4QAAAzDiKK41heUy2XygDGuVqukrPl8npBJknR7e7uWTCORCJHN6empoijpdPr4+FhRlEQiQU47k8mspSJVM+12u1KpkJzu7+9LpRIplGFP6JVIFEW17v1+PxqN7u7uBgIBjuN6vR4hHo/Hq5eo2+2q8t/a2hoOh2Sd53l1HQAwm810glh1uF9fX7Xd4Ha7PR7PYrGYTCbatpjP5yzL/iuIHoHV+sdbhNDDw4Oq0W+SpS6RIAh2ux0ZwWKxOByO0WhEp6Krq6tv5qMPAADP82a9SJZlkjvVYIEQLpdLU51cq9VWmFyfn5+NRsMUwfv7+2rTUas6PYL9/f3VCHw+n1k3VR3UPDDGP4ZChrlgjP1+v9aryeLe3p520ev1Utj1wcGBGiibzQqCMBgMYrEYwzAsyyYSicfHx7u7u1QqpXIEg0GKRru5uSFvC4WCvlmenZ2pk4POri8vLzudDnk+Pz+Px+OtVksUxaenp+vr63A4XK/XVe8rFotr3SqSyeTf/nNycmJmr5WqV8n0p7ptIpMSdDqdfr+f/AyFQgihb7pa6+o4n8/f3t7U+T6dTiVJWiwWm7w6Evh8vsPDQ6otkKqgGGPaDv8CndB2NBjOv0gAAAAASUVORK5CYII=';
		var name = FBInstant.player.getName();
		
		var text = name + ' is challenging You!';
		//var text = name + ' is inviting You!';
		var x = 0;
		var y = 0;
		var width = game.width/3;
		var height = game.width/3;

		game.screenshot(function(image) {
			FBInstant.shareAsync({
			intent: 'CHALLENGE',
			image: image,
				text: text,
				data: {payload : "test_test" , payload2 : 1},
			}).then(
				(data) =>{
				console.log('shareAsync() success!');
				},
				error => {
				console.error('shareAsync() ERROR! ' + JSON.stringify(error));
				});
		}, x, y, width, height);
		
    },
});

function UpdateData(energy)
{
    return new Promise(function(resolve, reject) {   
        date = Date.now();
        FBInstant.player.setDataAsync( {
                date: date,
                life: energy,
            }   
        ).then(function() {
            resolve();
        //console.log('data is set');
        }
        ).catch(function(error) {
            reject(error);
    		console.log(error.message);
            throw error.message;
        });
    });
}

function GetData()
{
    return new Promise(function(resolve, reject) {   
        FBInstant.player.getDataAsync(['date', 'life'])
        .then(function(data) {
        console.log('data is loaded');
        if(data)
        {
            console.log(data);
        }
        resolve(data);
        //var achievements = data['achievements'];
        //var currentLife = data['currentLife'];
        }
        ).catch(function(error) {
            reject(error);
    		console.log(error.message);
            throw error.message;
        });
    });
}


function UpdateContext(contextTextBox, entryPointTextBox) 
{
    contextTextBox.text = "context: " + FBInstant.context.getID();
	FBInstant.getEntryPointAsync().then
		(entrypoint => {
		    
		    const entryPointData = FBInstant.getEntryPointData();
		    entryPointTextBox.text = entrypoint + ": " + JSON.stringify(entryPointData);
			}
		).catch(function(error) {
			console.log(error.message);
            throw error.message;
        });

}

function postUpdateAsync(text, data)
{
return new Promise(function(resolve, reject) {   	
            var x = 0;
            var y = 0;
            var width = game.width/3;
            var height = game.width/3;
            game.screenshot(function(image) {
                FBInstant.updateAsync({
                    action: 'CUSTOM',
                    cta:'Play',
                    template: 'play_turn',
                    image: image,
                    text: text,
                    data: data,
                    strategy: 'IMMEDIATE',
					//notification: 'PUSH',
                }).then(
					(data) =>{
					console.log('updateAsync() success!');
					resolve(data);
					//console.log('updateAsync() success!' + JSON.stringify(data));
					//FBInstant.quit();
					},
					error => {
					console.error('updateAsync() ERROR! ' + JSON.stringify(error));
					reject(error);
					});
			}, x, y, width, height);
})  
};


});
