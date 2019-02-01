game.module(
    'game.main'
)
.require(
    'plugin.three'
)
.body(function() {
    
game.addAsset('logo.png');
game.addAsset('logo1.png');
game.addAsset('panda.png');
game.addAsset('penguin.obj');

game.createScene('Main', {
    init: function() {
        game.system.setScene("StressTest");

//         var scene = new THREE.Scene();
        
//         var camera = new THREE.PerspectiveCamera(60, game.width / game.height);
// 		camera.position.z = 200;
        
//         var light = new THREE.AmbientLight();
// 		scene.add(light);
		
// 		var container = new game.Container3D(scene, camera);
// 		container.addTo(this.stage);
		
//         this.box = new game.Box3D('logo.png', 60);
//         this.box.addTo(scene);
		
// 		var sprite = new game.Sprite('panda.png');
//         sprite.center(this.stage);
//         sprite.addTo(this.stage);
    },
    
    update: function() {
        // this.box.mesh.rotation.x -= 1 * game.delta;
        // this.box.mesh.rotation.y -= 1 * game.delta;
        
        // this.brick.mesh.rotation.x -= 1 * game.delta;
        // this.brick.mesh.rotation.y -= 1 * game.delta;
    }
});

game.createScene('StressTest', {
    
    init: function() {
        var scene = new THREE.Scene();
        this.Scene=scene;

        var camera = new THREE.PerspectiveCamera(60, game.width / game.height);
		camera.position.z = 50;
		//camera.position.y = -200;
		//camera.rotation.x = +1.4;
		
		this.Cam = camera;
        
        var light = new THREE.AmbientLight();
		scene.add(light);
		
		var container = new game.Container3D(scene, camera);
		container.addTo(this.stage);
		
 		//this.brick = new game.Plane3D('logo1.png', 60,60,1,1,{wireframe:true});
 		
 		
//  		this.brick = new game.Plane3D('logo1.png', 60,60,1,1, {side: THREE.DoubleSide, transparent: true, depthWrite: false});
//  		this.brick.mesh.position.z -=500 + Math.random()*200-100;
//  		this.brick.mesh.position.x += Math.random()*200-100;
//  		this.brick.mesh.position.y += Math.random()*200-100;
//  		//this.brick.mesh.rotation.z +=1;
//  		this.brick.addTo(scene);
        

        //material = new THREE.MeshPhongMaterial(  'logo1.png'  );
        
        //material = THREE.Object3D.initMaterial(  'logo1.png'  );
        
        
//  		this.brick = new game.Plane3D('logo1.png', 60,60,1,1, {side: THREE.DoubleSide, transparent: true, depthWrite: false});
//  		this.brick.addTo(scene);

 

        //  var sprite = new game.Sprite('logo1.png');
        //  sprite.center(this.stage);
        //  sprite.addTo(this.stage);
        
        this.a=0;
    },
    spawn: function()
    {
  		this.brick = new game.Plane3D('logo1.png', 60,60,1,1, {side: THREE.DoubleSide, transparent: true, depthWrite: false});
		this.brick.mesh.position.z =  this.Cam.position.z - Math.random()*500-2000;
 		this.brick.mesh.position.x += -150+ Math.random()*200-100;
 		this.brick.mesh.position.y += Math.random()*200-100;
 		this.brick.addTo(this.Scene);
 		
  		this.brick = new game.Plane3D('logo1.png', 60,60,1,1, {side: THREE.DoubleSide, transparent: true, depthWrite: false});
		this.brick.mesh.position.z =  this.Cam.position.z - Math.random()*500-2000;
 		this.brick.mesh.position.x += 150+Math.random()*200-100;
 		this.brick.mesh.position.y += Math.random()*200-100;
 		this.brick.addTo(this.Scene);
 		
 		
   
    },
    update: function() {
        // this.box.mesh.rotation.x -= 1 * game.delta;
        // this.box.mesh.rotation.y -= 1.5 * game.delta;
        //this.brick.mesh.rotation.x -= 1 * game.delta;
        //this.brick.mesh.rotation.z -= 1.5 * game.delta;
        // this.brick.mesh.position.y -= 40 * game.delta;
        // if(this.brick.mesh.position.y<-100)
        // {
        //     this.brick.mesh.position.y =0;
        // }
        if(Math.random()>0.69)
        {
            this.spawn();
        }
        this.Cam.position.z -= 200 * game.delta;

    }
});

game.createScene('Scrolling', {
    init: function() {
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera(60, game.width / game.height);
		camera.position.z = 100;
		camera.position.y = -200;
		camera.rotation.x = +1.4;
        
        var light = new THREE.AmbientLight();
		scene.add(light);
		
		var container = new game.Container3D(scene, camera);
		container.addTo(this.stage);
		
        this.box = new game.Box3D('logo.png', 60);

 		this.brick = new game.Plane3D('logo.png', 60,60,1,1,[]);
 		this.brick.addTo(scene);
 		//this.brick.mesh.rotation.x += -0.9;

        // this.box = new game.Box3D([
        //     0x6738c0,
        //     0x53b339,
        //     0xde9a60,
        //     0xba368d,
        //     0xffffff,
        //     0x666666
        // ], 60);
        //this.box.addTo(scene);
        
        this.a=0;
    },
    
    update: function() {
        // this.box.mesh.rotation.x -= 1 * game.delta;
        // this.box.mesh.rotation.y -= 1.5 * game.delta;
        //this.brick.mesh.rotation.x -= 1 * game.delta;
        //this.brick.mesh.rotation.z -= 1.5 * game.delta;
        this.brick.mesh.position.y -= 40 * game.delta;
        if(this.brick.mesh.position.y<-100)
        {
            this.brick.mesh.position.y =0;
        }


    }
});

game.createScene('Shapes', {
    init: function() {
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera(60, game.width / game.height);
		camera.position.z = 200;
        
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
		scene.add(directionalLight);
		
		var container = new game.Container3D(scene, camera);
		container.addTo(this.stage);
		
		var box = new game.Box3D(0x6738c0, 30);
		box.mesh.rotation.x = -1;
        box.addTo(scene);
		
		var sphere = new game.Sphere3D(0x53b339, 20);
		sphere.mesh.position.x = 50;
        sphere.addTo(scene);
        
        var plane = new game.Plane3D(0xde9a60, 30, 30);
        plane.mesh.position.y = 50;
        plane.addTo(scene);
        
        var cylinder = new game.Cylinder3D(0xba368d, 10, 20, 100);
        cylinder.mesh.position.x = -50;
        cylinder.addTo(scene);
    }
});

game.createScene('Isometric', {
    boxes: [],
    
    init: function() {
        var scene = new THREE.Scene();
        
        var ratio = game.width / game.height;
        var distance = 50;
        var camera = new THREE.OrthographicCamera(-distance * ratio, distance * ratio, distance, -distance);
        camera.position.set(distance, distance, distance);
        camera.lookAt(scene.position);
        camera.position.y = 110;
        
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
		directionalLight.position.set(100, 0, 0);
		scene.add(directionalLight);
		
		var container = new game.Container3D(scene, camera);
		container.addTo(this.stage);
		
		for (var i = 0; i < 13; i++) {
            var box = new game.Box3D('logo.png', 10);
            box.mesh.position.y = i * 10;
            box.mesh.rotation.y -= i * 0.2;
            box.addTo(scene);
            this.boxes.push(box);
		}
    },
    
    update: function() {
        for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            box.mesh.rotation.y -= 1 * game.delta;
        }
    }
});

game.createScene('OBJexample', {
    backgroundColor: '#00b9ef',
    
    init: function() {
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera(60, game.width / game.height);
        camera.position.z = 100;
        
        var light = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(light);
        
        var container = new game.Container3D(scene, camera);
        container.addTo(this.stage);
        
        this.penguin = game.getOBJ('penguin.obj');
        this.penguin.scale.set(50, 50, 50);
        scene.add(this.penguin);
    },
    
    update: function() {
        this.penguin.rotation.y += 1 * game.delta;
    }
});

});
