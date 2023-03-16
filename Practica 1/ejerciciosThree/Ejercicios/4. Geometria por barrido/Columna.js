import * as THREE from '../../libs/three.module.js'
import { Corazon } from './Corazon.js'
 
class Columna extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    //Create a closed wavey loop
    const curve = new THREE.CatmullRomCurve3( [
      new THREE.Vector3( 0, 0, 5 ),
      new THREE.Vector3( 5, 5, 0 ),
      new THREE.Vector3( 0, 10, -5 ),
      new THREE.Vector3( -5, 15, 0 ),
      new THREE.Vector3( 0, 20, 5 ),
      new THREE.Vector3( 5, 25, 0 ),
      new THREE.Vector3( 0, 30, -5 ),
      new THREE.Vector3( -5, 35, 0 ),
      new THREE.Vector3( 0, 40, 5)
    ] );

    const corazon = new Corazon();
    const shape = corazon.getShape();

    const extrudeSettings = {
      //steps: 2, // — int. Number of points used for subdividing segments along the depth of the extruded spline
      //depth: , // — float. Depth to extrude the shape
      //bevelEnabled: false, // — bool. Apply beveling to the shape
      //bevelThickness: 1,// — float. How deep into the original shape the bevel goes
      //bevelSize: 1, //  float. Distance from the shape outline that the bevel extends
      //bevelOffset: 0, // — float. Distance from the shape outline that the bevel starts
      //bevelSegments: 1 // — int. Number of bevel layers
      extrudePath: curve, // — THREE.Curve. A 3D spline path along which the shape should be extruded
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    const modelo = new THREE.Mesh( geometry, material ) ;
    modelo.scale.set(0.05,0.05,0.05);
    const objeto = new THREE.Object3D();
    const axis = new THREE.AxesHelper (5);
    objeto.add(modelo);
    objeto.add(axis);
    this.add( objeto );
  }
  
  update () {}
}

export { Columna };
