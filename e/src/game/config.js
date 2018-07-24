game.config = {
    name: 'Instant Games example',

    system: {
        width: 768,
        height: 1024,
        scale: true,
        center: true,
        resize: false
    },
    
    instantGames: {
        system: {
            resize: true
        },
        
        debug: {
            verbose: true, // Turn on console messages
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
    }
};
