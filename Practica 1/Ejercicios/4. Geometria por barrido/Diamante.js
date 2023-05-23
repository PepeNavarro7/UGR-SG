import * as THREE from '../../libs/three.module.js'
 
class Diamante extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();

    const contorno = new THREE.Shape();

    contorno.moveTo(0.0,0.0);
    contorno.lineTo(2.5,2.5);
    contorno.lineTo(0.0,5.0);
    contorno.lineTo(-2.5,2.5);

    const extrudeSettings = {
      //steps: 2, // — int. Number of points used for subdividing segments along the depth of the extruded spline
      depth: 0.5, // — float. Depth to extrude the shape
      bevelEnabled: true, // — bool. Apply beveling to the shape
      //bevelThickness: 1,// — float. How deep into the original shape the bevel goes
      //bevelSize: 1, //  float. Distance from the shape outline that the bevel extends
      //bevelOffset: 0, // — float. Distance from the shape outline that the bevel starts
      //bevelSegments: 1 // — int. Number of bevel layers
      // extrudePath — THREE.Curve. A 3D spline path along which the shape should be extruded
    };

    const geometry = new THREE.ExtrudeGeometry( contorno, extrudeSettings );
    const material = new THREE.MeshNormalMaterial();
    //const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); // rojo
    material.flatShading = true;
    const modelo = new THREE.Mesh( geometry, material ) ;
    const objeto = new THREE.Object3D();
    const axis = new THREE.AxesHelper (5);
    objeto.add(modelo);
    objeto.add(axis);
    this.add( objeto );
  }
  
  update () {}
}

export { Diamante };
