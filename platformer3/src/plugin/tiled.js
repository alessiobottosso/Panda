game.module(
    'plugin.tiled'
)
.require(
    'engine.loader'
)
.body(function() {

/**
    Tile maps generated with Tiled tile map editor.
    @class Tilemap
    @constructor
    @param {String} json Filename of Tiled JSON file
    @param {Boolean} [skipInits] Skip init functions
**/
game.Tilemap = game.Class.extend({
    /**
        @property {Container} container
    **/
    container: null,
    layers: {},
    tiles: [],
    tilesets: [],
    tileWidth: 0,
    tileHeight: 0,

    staticInit: function(json, skipInits) {
        this.json = game.getJSON(json);
        if (!this.json) throw 'Tilemap ' + json + ' not found';
        
        this.json.properties = this.json.properties || {};

        this.tileWidth = this.json.tilewidth;
        this.tileHeight = this.json.tileheight;
        this.width = this.json.width;
        this.height = this.json.height;
        this.pixelWidth = this.tileWidth * this.width;
        this.pixelHeight = this.tileHeight * this.height;

        this.container = new game.Container();

        if (!skipInits) {
            this.initTilesets();
            this.initLayers();
            this.initTiles();
        }
    },

    /**
        Called when adding layer.
        @method addingLayer
        @param {TileLayer} layer
        @return {Boolean} return false to skip the layer adding
    **/
    addingLayer: function(layer) {
        return true;
    },

    /**
        Init layers.
        @method initLayers
    **/
    initLayers: function() {
        for (var i = 0; i < this.json.layers.length; i++) {
            var layer = new game.TileLayer(this.json.layers[i]);

            if (this.addingLayer(layer)) {
                this.layers[layer.name] = layer;
                var container = new game.Container();
                container.alpha = layer.opacity;
                container.visible = layer.visible;
                container.addTo(this.container);
                this.layers[layer.name].container = container;
            }
        }
    },

    /**
        Init tile sprites.
        @method initTiles
    **/
    initTiles: function() {
        for (var name in this.layers) {
            var container = this.layers[name].container;
            if (!container) continue; // Skipped layer

            this.layers[name].tiles = [];
            var layer = this.layers[name];            
            
            if (!layer.data) continue; // Objects layer
            container.x = layer.x;
            container.y = layer.y;

            var sx = 0;
            var sy = 0;
            var row = 0;
            for (var i = 0; i < layer.data.length; i++) {
                // Skip empty tiles
                if (layer.data[i] === 0) continue;

                if (this.json.orientation === 'isometric') {
                    var x = this.tileWidth * layer.width / 2;
                    x -= row * (this.tileWidth / 2);
                    x += sx * (this.tileWidth / 2);
                    var y = row * (this.tileHeight / 2) + sy * (this.tileHeight / 2);
                    sx++;
                    sy++;
                    if (sx >= layer.width) {
                        sx = 0;
                        sy = 0;
                        row++;
                    }
                }
                else {
                    var x = this.tileWidth * (i % layer.width);
                    var y = this.tileHeight * Math.floor(i / layer.width);
                }

                if (!this.addingTile(this.layers[name], i, x, y)) continue;

                var sprite = this.spriteFromTile(layer.data[i]);
                sprite.position.x = x;
                sprite.position.y = y;
                sprite.tilex = i % layer.width
                sprite.tiley = ~~(i / layer.width)
				sprite.tileid = layer.data[i];
                this.layers[name].tiles.push(sprite);

                if (this.tileAdded(layer, sprite, layer.data[i], x, y, i)) {
                    sprite.addTo(container);
                }
            }
        }
    },

    /**
        Init tilesets.
        @method initTilesets
    **/
    initTilesets: function() {
        for (var i = 0; i < this.json.tilesets.length; i++) {
            var tileset = this.json.tilesets[i];

            var path = tileset.image;

            var tilesInRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
            var tilesInCol = Math.floor(tileset.imageheight / tileset.tileheight);
            var tileCount = tilesInRow * tilesInCol;

            for (var index = 0; index < tileCount; index++) {
                var currentRow = Math.floor(index / tilesInRow);
                var currentCol = Math.floor(index % tilesInRow);

                var x = tileset.tilewidth * Math.floor(index % tilesInRow);
                x += tileset.margin;
                x += tileset.spacing * currentCol;

                var y = tileset.tileheight * Math.floor(index / tilesInRow);
                y += tileset.margin;
                y += tileset.spacing * currentRow;

                var texture = new game.Texture(game.BaseTexture.fromAsset(path), x, y, tileset.tilewidth, tileset.tileheight);
                var tile = new game.Tile(texture, tileset);
                this.tiles.push(tile);
            }

            this.tilesets.push(tileset);
        }
    },

    /**
        Called when adding tile.
        @method addingTile
        @param {TileLayer} layer
        @param {Number} index
        @param {Number} x
        @param {Number} y
        @return {Boolean} return false to skip the tile adding
    **/
    addingTile: function(layer, index, x, y) {
        return true;
    },

    /**
        Called when tile has been added.
        @method tileAdded
        @param {TileLayer} layer
        @param {Sprite} sprite
        @param {Number} index
        @param {Number} x
        @param {Number} y
        @return {Boolean} return false to not add the tile to the tilemap container
    **/
    tileAdded: function(layer, sprite, index, x, y) {
        return true;
    },

    /**
        Creates new Sprite from tile.
        @method spriteFromTile
        @param {Number} index Tile index
        @return {Sprite} New tile Sprite
    **/
    spriteFromTile: function(index) {
        var tile = this.tiles[index - 1];
        if (!tile) throw 'No tile found for index ' + index;
        var texture = tile.texture;
        if (!texture) throw 'No texture found for tile index ' + index;
        return new game.Sprite(texture);
    },

    /**
        Add tilemap to container
        @method addTo
        @param {Container} container
    **/
    addTo: function(container) {
        this.container.addTo(container);
    },

    /**
        Get the layer names defined in the JSON source
        @method getLayerNames
        @return {Array} An array with the layer names
    **/
    getLayerNames: function () {
        return Object.keys(this.json.layers);
    },

    /**
        Get the tile ID at specific coordinates
        @method getTileIdAt
        @param {String} layerName The layer name from which we should get the data
        @param {Number} x x coordinate
        @param {Number} y y coordinate
        @return {Mixed} The ID or false when not found
    **/
    getTileIdAt: function (layerName, x, y) {
        var layer = this.getLayer(layerName);
        var index = y * layer.width + x;

        if (typeof layer.data[index] !== 'undefined') return layer.data[index];
        return false;
    },

    /**
        Gets the layer's tile id's presented in a matrix style array
        @method getLayerMatrix
        @param {String} layerName The layer name from which we should get the data
        @return {Array} Multi-dimensional array, rows and columns, containing tile ID's
    **/
    getLayerMatrix: function (layerName) {
        var layer = this.getLayer(layerName);
        var colCount  = layer.width;
        var rowCount = Math.ceil(layer.data.length / colCount);
        var matrix = [];
        var i = 0;

        for (var y = 0; y < rowCount; y++) {
            var row = [];
            for (var x = 0; x < colCount; x++) {
                row.push(layer.data[i]);
                i++;
            }
            matrix.push(row);
        }

        return matrix;
    },

    /**
        Get tile properties for tileset.
        @method getTileProperties
        @param {Number} index Tileset index
        @return {Object} Tile properties object
    **/
    getTileProperties: function (index) {
        var tileset = this.tilesets[index];
        if (tileset) return false;
        return tileset.tileproperties;
    },

    /**
        Get a specific layer from the JSON file
        @method getLayer
        @return {Mixed} Layer object or false when not found
    **/
    getLayer: function (layerName) {
        for (var i = 0; i < this.json.layers.length; i++) {
            var layer = this.json.layers[i];
            if (layer.name === layerName) return layer;                
        }
        return false;
    },

    /**
        Remove tilemap container from it's parent
        @method remove
    **/
    remove: function() {
        this.container.remove();
    }
});

/**
    Tile that is used in tile maps.
    @class Tile
    @constructor
    @param {Texture} texture
    @param {Object} tileset
**/
game.Tile = game.Class.extend({
    staticInit: function(texture, tileset) {
        this.texture = texture;
        this.tileset = tileset;
    }
});

/**
    @class TileLayer
    @constructor
    @param {Object} data
**/
game.TileLayer = game.Class.extend({
    /**
        List of tile sprites.
        @property {Array} tiles
    **/
    tiles: [],

    staticInit: function(data) {
        game.merge(this, data);
    },

    /**
        Get object by name (if object layer)
        @return {Object}
    **/
    getObject: function(name) {
        if (!this.objects) return;
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) return this.objects[i];
        }
    }
});

game.Loader.inject({
    loadTilesets: function(jsonFilePath, callback) {
        var json = game.json[jsonFilePath];
        var tilesets = json.tilesets;
        for (var i = 0; i < tilesets.length; i++) {
            var tileset = tilesets[i];
            if (tileset.loaded) continue;
            tileset.loaded = true;
            if (!tileset.image && !tileset.source) continue;
            if (tileset.image) {
                var image = game._getFilePath(tileset.image);
                game.paths[tileset.image] = image;
                this.loadImage(image, this.loadTilesets.bind(this, jsonFilePath, callback));
            }
            else if (tileset.source) {
                var filePath = game._getFilePath(tileset.source);
                this.loadFile(filePath, this.parseTSX.bind(this, filePath, callback, i, jsonFilePath));
            }
            return;
        }
        callback();
    },

    parseTSX: function(filePath, callback, i, jsonFilePath, request) {
        if (!request.responseText || request.status === 404) callback('Error loading TSX ' + filePath);

        var responseXML = request.responseXML;
        if (!responseXML || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS) {
            if (typeof window.DOMParser === 'function') {
                var domparser = new DOMParser();
                responseXML = domparser.parseFromString(request.responseText, 'text/xml');
            }
            else {
                var div = document.createElement('div');
                div.innerHTML = request.responseText;
                responseXML = div;
            }
        }

        var tileset = responseXML.getElementsByTagName('tileset');
        if (tileset.length) {
            var image = tileset[0].getElementsByTagName('image');
            var json = game.json[jsonFilePath];
            if (image.length) {
                var imageSource = image[0].getAttribute('source');

                json.tilesets[i].image = imageSource;
                json.tilesets[i].imagewidth = parseInt(image[0].getAttribute('width'));
                json.tilesets[i].imageheight = parseInt(image[0].getAttribute('height'));
                json.tilesets[i].tilewidth = parseInt(tileset[0].getAttribute('tilewidth'));
                json.tilesets[i].tileheight = parseInt(tileset[0].getAttribute('tileheight'));
                json.tilesets[i].spacing = parseInt(tileset[0].getAttribute('spacing'));
                json.tilesets[i].margin = parseInt(tileset[0].getAttribute('margin'));

                var path = game._getFilePath(imageSource);
                game.paths[imageSource] = path;
                this.loadImage(path, this.loadTilesets.bind(this, jsonFilePath, callback));
                return;
            }
        }
        callback('Error parsing TSX ' + filePath);
    },

    parseJSON: function(filePath, callback, request) {
        var oldCallback = callback;
        var me = this;
        callback = function(error) {
            if (error) return oldCallback(error);

            var json = JSON.parse(request.responseText);
            if (json.tilesets) {
                me.loadTilesets(filePath, oldCallback);
                return;
            }

            oldCallback();
        };
        this.super(filePath, callback, request);
    }
});

this.version = '1.1.0';

});
