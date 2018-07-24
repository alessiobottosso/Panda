game.module(
    'game.main'
)
.require(
    'plugin.instantgames'
)
.body(function() {

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
        
        var photo = new game.Sprite('playerPhoto');
        photo.width = 120;
        photo.height = 120;
        photo.position.set(10, 10);
        photo.addTo(this.stage);
        
        var name = new game.SystemText(this.playerInfo.name);
        name.position.set(140, 10);
        name.addTo(this.stage);
        
        var test1 = new game.SystemText("context: " + FBInstant.context.getID());
        test1.addTo(this.stage);
        
        this.updateContext();
        
        if (this.contextInfo.valid) return;
        
        this.opponentButton = new game.Sprite('btn_opponent.png');
        this.opponentButton.x = game.width / 2 - this.opponentButton.width / 2;
        this.opponentButton.y = game.height / 2 - this.opponentButton.height / 2;
        this.opponentButton.interactive = true;
        this.opponentButton.click = this.chooseOpponent.bind(this);
        this.opponentButton.addTo(this.stage);
    },
    
    updateContext: function() {
        this.contextInfo.id = FBInstant.context.getID();
        this.contextInfo.type = FBInstant.context.getType();
        // As the game supports only 2 players, games with 3 players or more are not considered valid
        var checkSize = FBInstant.context.isSizeBetween(3, null);
        this.contextInfo.valid = checkSize === null ? false : !checkSize.answer;
        if (this.contextInfo.type === 'SOLO') this.contextInfo.valid = false;
        if (checkSize === null && this.contextInfo.type === 'THREAD') this.contextInfo.valid = true;
        
        if (this.contextInfo.valid && !this.server) {
            if (this.opponentButton) this.opponentButton.remove();
            console.log("context: " + FBInstant.context.getID());
            console.log("contextType: " + FBInstant.context.getType());
            this.server = new game.Server(this.contextInfo.id, this.serverLoaded.bind(this));
        }
    },
    
    serverLoaded: function(error) {
        console.log("serverloading.. ");
        this.server.load(['gameData'], this.gameDataLoaded.bind(this));
    },
    
    gameDataLoaded: function(serverData) {
        console.log("gamedataloaded.. ");
        if (!serverData || !serverData.gameData || serverData.gameData.ended) {
            this.gameData.players.push(this.playerInfo.id);
            this.gameData.playerTurn = 0;
            this.saveGameData(this.startGame.bind(this));
        } else {
            this.gameData = serverData.gameData;
            
            if (this.gameData.players.length === 1 && this.gameData.players[0] !== this.playerInfo.id) {
                this.gameData.players.push(this.playerInfo.id);
                this.saveGameData(this.startGame.bind(this));
            }
            else {
                this.startGame();
            }
        }
    },
    
    saveGameData: function(callback) {
        this.server.save({
            gameData: this.gameData
        }, function(error) {
            if (typeof callback === 'function') callback();
        });
    },
    
    startGame: function() {
        this.playerInfo.index = this.gameData.players.indexOf(this.playerInfo.id);
        
        var text = this.gameData.playerTurn === this.playerInfo.index ? 'Your turn' : 'Wait your turn';
        var turnText = new game.SystemText(text);
        turnText.align = 'center';
        turnText.x = game.width / 2;
        turnText.y = 80;
        turnText.size = 40;
        turnText.addTo(this.stage);
        
        var board = new game.Board(this.gameData.gameState);
        board.center(this.stage);
        board.addTo(this.stage);
    },
    
    chooseOpponent: function() {
        FBInstant.context.chooseAsync({
            filters: ['INCLUDE_EXISTING_CHALLENGES'],
            minSize: 2,
            maxSize: 2
        }).then(this.updateContext.bind(this));
    },
    
    sendUpdate: function(text) {
        game.Timer.add(100, function() {
            var x = 0;
            var y = game.height / 2 - game.width / 2;
            var width = game.width;
            var height = game.width;
            game.screenshot(function(image) {
                FBInstant.updateAsync({
                    action: 'CUSTOM',
                    cta: {
                        default: 'Play',
                        localizations: {
                            ja_JP: 'プレイ',
                            en_US: 'Play',
                            fr_FR: 'Jouer'
                        }
                    },
                    template: 'play_turn',
                    image: image,
                    text: text,
                    data: {},
                    strategy: 'IMMEDIATE',
                }).then(function() {
                    FBInstant.quit();
                });
            }, x, y, width, height);
        });
    }
});

game.createClass('Board', 'Container', {
    init: function(gameState) {
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                var color = (x + y) % 2 ? 'blue' : 'grey';
                var tile = new game.Sprite('bg_' + color + '.png');
                tile.x = x * tile.width;
                tile.y = y * tile.height;
                tile.addTo(this);
                
                var state = gameState[y][x];
                if (state > -1) {
                    var icon = state === 0 ? 'like' : 'love';
                    var button = new game.Sprite(icon + '.png');
                    button.center(tile);
                    button.addTo(tile);
                }
                else if (game.scene.gameData.playerTurn === game.scene.playerInfo.index) {
                    tile.interactive = true;
                    tile.click = this.playerMove.bind(this, tile, y, x);
                }
            }
        }
    },
    
    playerMove: function(tile, y, x) {
        if (this.moved) return;
        this.moved = true;
        
        var playerIndex = game.scene.playerInfo.index;
        var icon = playerIndex === 0 ? 'like' : 'love';
        var button = new game.Sprite(icon + '.png');
        button.center(tile);
        button.addTo(tile);
        
        game.scene.gameData.gameState[y][x] = playerIndex;
        
        var text = game.scene.playerInfo.name + ' played their move';
        game.scene.gameData.playerTurn = playerIndex === 0 ? 1 : 0;
        
        if (this.checkWon()) {
            text = game.scene.playerInfo.name + ' won the game!';
            game.scene.gameData.ended = true;
        }
        else if (this.checkDraw()) {
            text = 'Draw! Rematch?';
            game.scene.gameData.ended = true;
        }
        
        game.scene.saveGameData(function() {
            game.scene.sendUpdate(text);
        });
    },
    
    checkWon: function() {
        var gameState = game.scene.gameData.gameState;
        var matchRow =
            this.checkMatch(gameState[0]) ||
            this.checkMatch(gameState[1]) ||
            this.checkMatch(gameState[2]);
        var matchColumn =
            this.checkMatch([gameState[0][0], gameState[1][0], gameState[2][0]]) ||
            this.checkMatch([gameState[0][1], gameState[1][1], gameState[2][1]]) ||
            this.checkMatch([gameState[0][2], gameState[1][2], gameState[2][2]]);
        var matchAcross =
            this.checkMatch([gameState[0][0], gameState[1][1], gameState[2][2]]) ||
            this.checkMatch([gameState[2][0], gameState[1][1], gameState[0][2]]);
    
        var won = matchRow || matchColumn || matchAcross;
        return won;
    },
    
    checkDraw: function() {
        for (var y = 0; y < 3; y++) {
            if (game.scene.gameData.gameState[y].indexOf(-1) !== -1) return false;
        }
        return true;
    },
    
    checkMatch: function(cells) {
        return (cells[0] !== -1) && (cells[0] === cells[1]) && (cells[1] === cells[2]);
    }
});

game.createClass('Server', {
    init: function(contextID, loadCallback) {
        this.loadCallback = loadCallback;
        console.log("server 1 ");

        FBInstant.context.getStoresAsync({
            status: 'ACTIVE',
            contextID: contextID
        }).then(this.loaded.bind(this)).catch(this.initDone.bind(this));
    },
    
    initDone: function(error) {
        console.log("initdone start ");
        if (error) 
        {
            console.log("initdone err " + error.message);
            /*
            if(error.message!="Failed to fetch requested matches")
            {
                throw error.message;
            }
            */
        }
        if (typeof this.loadCallback === 'function') this.loadCallback();
    },
    
    loaded: function(stores) {
        console.log(stores);
        if (stores.length === 0) {
            console.log("creating...");
            this.create();
        }
        else {
            this.store = stores[0];
            this.initDone();
            console.log("initdone 1 ");
        }
    },
    
    create: function() {
        console.log("creating.. ");
        FBInstant.context.createStoreAsync('match').then(this.created.bind(this)).catch(this.initDone.bind(this));
    },
    
    created: function(store) {
        this.store = store;
        this.initDone();
        console.log("created 1 ");
    },

    save: function(data, callback) {
        if (!this.store) throw 'No store found';
        
        this.store.saveDataAsync(data).then(function() {
            callback();
            console.log("saving.. ");
        }).catch(function(error) {
            throw error.message;
        });
    },

    load: function(data, callback) {
        if (!this.store) throw 'No store found';
        
        this.store.getDataAsync(data).then(function(storeData) {
            console.log("loading.. ");
            callback(storeData);
        }).catch(function(error) {
            throw error.message;
        });
    }
});

});
