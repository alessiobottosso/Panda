game.config = {
    name: 'Hands Masters',

    system: {
        width: 1125,
        height: 2436,
        rotateScreen: true,
        scale: true,
        center: true,
        resize: false,
        startScene: "MainMenu"
    },
    
    instantGames: {
        system: {
            resize: true
        },
        
        debug: {
            verbose: false, // Turn on console messages
            context: 1, // Current context index
            player: 0, // Current player index
            entryPointData: {} // Custom entryPointData
        },
        
        config: {
            instant_games: {
                platform_version: 'RICH_GAMEPLAY',
                custom_update_templates: {
                    play_turn: {
                        example: 'Edgar played their move'
                    }
                }
            }
        }
    },

    debug: {
        enabled: true,
        showInfo: true,
        position: 'bottom',
        panelUpdate: 50,
        sensorColor: '#ffffff'
    }
};
