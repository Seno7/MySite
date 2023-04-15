var world;
var objs = {};
var player;

var scene;
var camera;
var renderer;
var dirL;
var ambL;

var w = window.innerWidth;
var h = window.innerHeight;


const PI = Math.PI;
const BLACK = 0x000000;
const WHITE = 0xDADADA;

const PD = e => e.preventDefault();
const PF = { passive: false };

const FR = (f,r) => ({friction:f,restitution:r});

const LEN = o => Object.keys(o).length;
const FLOOR = n => Math.floor(n);
const RAN = (a,b) => FLOOR(Math.random()*(b-a))+a;

const Vec = (x,y,z) => new CANNON.Vec3(x,y,z);
const Vec10 = (x,y,z) => new CANNON.Vec3(
  x*10, y*10, z*10
);
const Qua = (x,y,z,w) => {
  let q = new CANNON.Quaternion()
  q.setFromAxisAngle(Vec(x,y,z),w);
  return q;
};

const MPM = a => new THREE.MeshPhongMaterial(a);
const MLM = a => new THREE.MeshLambertMaterial(a);

document.addEventListener( "touchmove", PD, PF );


const MAT = (n,f,r) => new CANNON.Material({
  name: n, friction: f, restitution: r
});

const mats = {
  "c_rub": MAT( "c_rub", 0.3, 1.1 ),
  "ground": MAT( "ground", 0.2, 0.3 ),
  "sphere": MAT( "sphere", 0.3, 0.5 ),
  "cube": MAT( "cube", 0.1, 0.5 ),
  "player": MAT( "player", 0.1, 0.1 )
};

const mesh = {
  "ground": MPM({ color: 0x333333 }),
  "sphere": MLM({ color: WHITE }),
  "cube": MLM({ color: WHITE }),
  "player": MLM({ color: BLACK })
};




function start() {
  setWorld();
  setMats();
  setPlayer();
  setObjs();
  animate();
}

function animate() {
  requestAnimationFrame( animate );
  world.step( 1 / 30 );

  for ( let i in objs ) {
    let view = objs[i].view;
    let phy = objs[i].phy;
    view.position.copy( phy.position );
    view.quaternion.copy( phy.quaternion );
  }

  camera.position.set(
    player.pos.x, player.pos.y+8.5, player.pos.z+4.1
  );
  camera.lookAt(0, 5, 0);

  renderer.render( scene, camera );
}




class Plane {
  constructor( mat, w, h ) {
    this.phy = new CANNON.Body({
      shape: new CANNON.Plane(),
      material: mats[mat],
      mass: 0,
      quaternion: Qua( 1, 0, 0, -PI/2 )
    });
    world.add( this.phy );

    this.view = new THREE.Mesh(
      new THREE.PlaneGeometry( w, h ),
      mesh["ground"]
    );
    this.view.rotation.x = -PI / 2;
    this.view.position.y = 0;
    this.view.receiveShadow = true;
    scene.add( this.view );
  }
};

class Sphere {
  constructor( mat, m, r, p, v ) {
    this.phy = new CANNON.Body({
      shape: new CANNON.Sphere(r*10),
      material: mats[mat],
      mass: m,
      position: p,
      angularVelocity: Vec( v.x, v.y, v.z )
    });
    world.add( this.phy );

    this.view = new THREE.Mesh(
      new THREE.SphereGeometry( r*10, 32, 32 ),
      mesh["sphere"]
    );
    this.view.castShadow = true;
    this.view.receiveShadow = true;
    scene.add( this.view );
  }
};

class Cube {
  constructor( mat, m, s, p, v ) {
    this.phy = new CANNON.Body({
      shape: new CANNON.Box(s),
      material: mats[mat],
      mass: m,
      position: p,
      angularVelocity: Vec( v.x, v.y, v.z )
    });
    world.add( this.phy );

    this.view = new THREE.Mesh(
      new THREE.BoxGeometry(
        s.x*2, s.y*2, s.z*2
      ),
      mesh["cube"]
    );
    this.view.castShadow = true;
    this.view.receiveShadow = true;
    scene.add( this.view );
  }
};

class Player {
  constructor( mat, m, p ) {
    this.pos = Vec( p.x, p.y+9, p.z );

    this.phy = new CANNON.Body({
      fixedRotation: true,
      shape: new CANNON.Cylinder( 4, 4, 18, 32 ),
      material: mats[mat],
      mass: m,
      position: this.pos
    });
    world.add( this.phy );

    this.view = new THREE.Mesh(
      new THREE.CylinderGeometry( 4, 4, 18, 32 ),
      mesh["player"]
    );

    this.view.position.set(
      this.pos.x, this.pos.y, this.pos.z
    );

    this.view.castShadow = true;
    this.view.receiveShadow = true;
    scene.add( this.view );
  }

  move(x, y) {
    camera.position.x += x;
    camera.position.y += y;
    this.pos.x += x;
    this.pos.y += y;
  }
};



function setWorld() {
  world = new CANNON.World();
  world.gravity.set( 0, -9.82, 0 );
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;
  world.solver.tolerance = 0.01;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( BLACK, 1, 100 );

  camera = new THREE.PerspectiveCamera(
    30, w/h, 1, 1000
  );

  camera.position.set( 30, 20, 0 );
  camera.lookAt( 0, 5, 0 );
  
  dirL = new THREE.DirectionalLight( WHITE, 2 );
  dirL.position.set( 10, 10, -10 );
  dirL.castShadow = true;
  dirL.shadow.mapSize.width = 1024;
  dirL.shadow.mapSize.height = 1024;
  dirL.shadow.camera.left = -10;
  dirL.shadow.camera.right = 10;
  dirL.shadow.camera.top = 10;
  dirL.shadow.camera.bottom = -10;
  dirL.shadow.camera.far = 100;
  dirL.shadow.camera.near = 0;
  scene.add( dirL );

  ambL = new THREE.AmbientLight( 0x999999 );
  scene.add( ambL );


  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize( w, h );
  renderer.setClearColor( BLACK, 1 );
  renderer.shadowMap.enabled = true;

  let body = document.body;
  body.appendChild( renderer.domElement );
  renderer.render( scene, camera );
}

function setMats() {

  function setCM( a, b, val ) {
    let c = new CANNON.ContactMaterial(
      mats[a], mats[b], val
    );
    world.addContactMaterial( c );
  }

  setCM( "sphere", "sphere", FR( 0.3, 0.7 ) );
  setCM( "sphere", "ground", FR( 0.3, 0.5 ) );
}

function setPlayer() {
  player = new Player(
    "player", 1, Vec10( 0, 0, -2 )
  );
}

function setObjs() {

  function spawnSphere() {
    objs["sphere"+LEN(objs)] = new Sphere(
      "c_rub",
      4,
      1,
      Vec(RAN(-20,20)/10,10,RAN(-20,20)/10),
      Vec(0,0,0)
    );
  }

  function spawnCube() {
    objs["cube"+LEN(objs)] = new Cube(
      "c_rub",
      5,
      Vec10( 0.1, 0.1, 0.1 ),
      Vec10(RAN(-20,20)/100,1,RAN(-20,20)/100),
      Vec(RAN(-PI,PI),RAN(-PI,PI),RAN(-PI,PI))
    );
  }

  objs["plane"] = new Plane( "c_rub", 100, 100 );
  spawnCube();
  setInterval( spawnCube, 1000 );
}



