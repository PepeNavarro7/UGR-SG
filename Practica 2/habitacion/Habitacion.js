import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Habitacion extends THREE.Object3D {
  constructor() { 
    super();
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
    const geomParedGrande = new THREE.BoxGeometry (60,40,60);
    const geomParedPeque = new THREE.BoxGeometry (59,40,59);
    const geomVacio = new THREE.BoxGeometry (10,30,10);

    const texture = new THREE.TextureLoader().load('../imgs/ladrillo-mapaNormal.png');
    const materialPared = new THREE.MeshPhongMaterial ({map: texture});

    const meshGrande = new THREE.Mesh (geomParedGrande, materialPared);
    meshGrande.position.y = 20;

    const meshPeque = new THREE.Mesh (geomParedPeque, materialPared);
    meshPeque.position.y = 19;

    const meshVacio = new THREE.Mesh (geomVacio, materialPared);
    meshVacio.position.y = 15;
    meshVacio.position.x = -30;
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
  }
  crearPuerta(){
    const geomPuerta = new THREE.BoxGeometry (0.5,30,10);
    const meshPuerta = new THREE.Mesh (geomPuerta, this.materialNormal);
    meshPuerta.position.y = 15;
    meshPuerta.position.x = -30;
    meshPuerta.position.z = 10;

    const puerta = new THREE.Object3D();
    puerta.add(meshPuerta);
    this.add(puerta);

    // referencia
    this.puerta = puerta;
  }
  update () {

  }
}

export { Habitacion };
