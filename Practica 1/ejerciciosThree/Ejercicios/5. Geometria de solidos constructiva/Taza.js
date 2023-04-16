import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
//'../libs/CSG-v2.js'
 
class Taza extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.animacion = false;
    const material = new THREE.MeshNormalMaterial();
    material.flatShading = true;

    /*CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, 
    radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, 
    thetaStart : Float, thetaLength : Float)*/
    const geom_cilindro = new THREE.CylinderGeometry(1.0,1.0,2.0,32); 
    geom_cilindro.translate(0.0,1.0,0.0);
    const cilindro = new THREE.Mesh( geom_cilindro, material );
    //cilindro.position.set(0.0,1.0,0.0);
    

    /*TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, 
    tubularSegments : Integer, arc : Float)*/
    const geom_toro = new THREE.TorusGeometry(0.5,0.1,12,48);
    geom_toro.translate(-1,1,0.0);
    const toro = new THREE.Mesh( geom_toro, material );
    //toro.position.set(-1,1,0.0);

    const geom_vacio = new THREE.CylinderGeometry(0.9,0.9,2.0,32); 
    geom_vacio.translate(0.0,1.0,0.0);
    const vacio = new THREE.Mesh( geom_vacio, material );
    //vacio.position.set(0.0,1.1,0.0);
    

    const tazaCSG = new CSG()
    tazaCSG.union([cilindro]);
    tazaCSG.union([toro]);
    tazaCSG.subtract([vacio]);
    const resultadoCSG = tazaCSG.toMesh();

    const axis = new THREE.AxesHelper(5);
    const objeto = new THREE.Object3D();
    objeto.add(resultadoCSG);
    this.add(objeto);
    this.add(axis);

    this.objeto = objeto;
    this.cilindro = cilindro;
  }
  
  
  setAnimacion (valor) {
    this.animacion = valor;
  }
  update () {
    if(this.animacion){
      this.objeto.rotateY(0.01);
    }
  }
}

export { Taza };
