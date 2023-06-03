import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Habitacion extends THREE.Object3D {

     
  constructor() { 
    super();
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    this.mat_naranja = new THREE.MeshPhongMaterial({color: 0xFFA500 });

    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.reloj = new THREE.Clock();

    this.crearSuelo();
    this.crearParedes();
    this.crearPuerta();
  }

  crearSuelo(){
    // La geometría es una caja con muy poca altura
    const geometryGround = new THREE.BoxGeometry (100,0.2,100);
    
    // El material se hará con una textura de madera
    const texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    const materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    const suelo = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    suelo.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (suelo);
  }

  crearParedes(){
    const geomParedGrande = new THREE.BoxGeometry (100,40,100);
    const geomParedPeque = new THREE.BoxGeometry (99,40,99);
    const geomVacio = new THREE.BoxGeometry (10,30,10);

    const texture = new THREE.TextureLoader().load('../imgs/ladrillo-mapaNormal.png');
    //const texture = new THREE.TextureLoader().load('../imgs/abeja.jpg');
    const textureNormal = new THREE.TextureLoader().load('../imgs/ladrillo-mapaNormal.png');
    const materialPared = new THREE.MeshPhongMaterial ({map:texture, normalMap: textureNormal});
    materialPared.normalScale.set(1, 1)

    const meshGrande = new THREE.Mesh (geomParedGrande, materialPared);
    meshGrande.position.y = 20;

    const meshPeque = new THREE.Mesh (geomParedPeque, materialPared);
    meshPeque.position.y = 19;

    const meshVacio = new THREE.Mesh (geomVacio, materialPared);
    meshVacio.position.y = 15;
    meshVacio.position.x = -50;
    meshVacio.position.z = 10;

    const paredesCSG = new CSG()
    paredesCSG.union([meshGrande]);
    paredesCSG.subtract([meshPeque]);
    paredesCSG.subtract([meshVacio]);
    
    
    const resultadoCSG = paredesCSG.toMesh();

    const paredes = new THREE.Object3D();
    paredes.add(resultadoCSG);
    this.add(paredes);

    // referencia
    this.paredes = paredes;
    this.animacion=false;
  }
  crearPuerta(){
    const geomPuerta = new THREE.BoxGeometry (2,30,10);
    geomPuerta.translate(0,15,5);
    const puerta = new THREE.Mesh (geomPuerta, this.materialNormal);
    
    const geomPomo1 = new THREE.BoxGeometry (0.5,2,7);
    const pomo1 = new THREE.Mesh (geomPomo1, this.mat_naranja);
    
    const geomPomo2 = new THREE.BoxGeometry (0.5,7,2);
    const pomo2 = new THREE.Mesh (geomPomo2, this.mat_naranja);
    
    const toroGeom = new THREE.TorusGeometry (4,0.5,20,30); 
    toroGeom.rotateY(Math.PI/2);
    const pomo3 = new THREE.Mesh (toroGeom, this.mat_naranja);

    const pomoCSG = new CSG()
    pomoCSG.union([pomo1,pomo2,pomo3]);
    

    const pomoFinal =pomoCSG.toMesh()
    pomoFinal.position.y = 15;
    pomoFinal.position.x = 2;
    pomoFinal.position.z = 5;
         
    const puertafin = new THREE.Object3D();
    puertafin.add(puerta).add(pomoFinal);
    puertafin.position.y = 0;
    puertafin.position.x = -50;
    puertafin.position.z = 5;

    pomoFinal.userData = this;
    this.add(puertafin);

//ANIMACION
    var origen = { t: 0};
    var fin = {t: Math.PI/2};
    var origen2 = {t: Math.PI/2};
    var fin2 = {t: 0};
    var origen3 = { t: 0};
    var fin3 = {t: Math.PI/2};
    var fin4 = { t: 0};
    var origen4 = {t: Math.PI/2};
    const tiempoDeRecorrido=2000;
    const tiempoDeRecorrido2=1000;

    this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { puertafin.rotation.y = origen.t; })
      .onComplete(() => {/*this.animacion2.start()*/})
      

    this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { puertafin.rotation.y = origen2.t; })
      .onComplete(() => {this.animacion4.start()});
      
    this.animacion3 = new TWEEN.Tween (origen3).to (fin3, tiempoDeRecorrido2)
      .onUpdate(() => { pomoFinal.rotation.x = origen3.t; })
      .onComplete(() => {this.animacion1.start()});
      
    this.animacion4 = new TWEEN.Tween (origen4).to (fin4, tiempoDeRecorrido2)
      .onUpdate(() => { pomoFinal.rotation.x = origen4.t; })
      .onComplete(() => {/*this.animacion1.start()*/});

    // referencia
    this.puerta = puerta;
  }
  
  abrirPuerta(){
    this.animacion1.start();
  }
  
  recibeClic ( meshConcreto ) {
    this.animacion=!this.animacion;
    
    if(this.animacion)
       this.animacion3.start();
       
    if(!this.animacion)
       this.animacion2.start();
  }
  
  update () {
    TWEEN.update();
  }
}

export { Habitacion };
