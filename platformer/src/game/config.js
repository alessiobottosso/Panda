game.config = {
    name: 'Platformer',
    audio: {
        stopOnSceneChange: false
    },
    system: {
        width: 768,
        height: 1024,
        scale: true ,
        center: true,
        rotateScreen: false,
        resize: false,
        startScene:"Preloading",
        loader:"myLoader"
    },
    
    renderer: {
        roundPixels: true,
        scaleMode:'nearest'
    }
};
