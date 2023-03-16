import * as THREE from '../../libs/three.module.js'
 
class Corazon extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();

    const heartShape = new THREE.Shape();
    this.shape = heartShape;

    // He copiado la forma del corazón

    heartShape.moveTo( 25, 25 );
    heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
    heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
    heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

    const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
    const material = new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh( geometry, material );
    /* 1. Los escalados, el orden de los distintos ejes no es importante
    2. Las rotaciones, primero sobre Z, luego sobre Y, por último sobre X
    3. Las traslaciones, el orden de los distintos ejes no es importante */
    mesh.scale.set (0.05,0.05,0.05);
    mesh.rotateX(Math.PI);
    mesh.position.set(-1.25,4.75,0.0);

    const axis = new THREE.AxesHelper (5);
    const objeto = new THREE.Object3D();
    objeto.add(mesh);
    objeto.add(axis);
    this.add(objeto);
  }
  
  update () {}
  getShape(){
    return this.shape;
  }
}

export { Corazon };
