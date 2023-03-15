import * as THREE from '../../libs/three.module.js'
 
class Diamante extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();

    const contorno = new THREE.Shape();

    contorno.moveTo(0.0,0.0);
    contorno.lineTo(2.5,2.5);
    contorno.lineTo(0.0,5.0);
    contorno.lineTo(-2.5,2.5);

    const geometry = new THREE.ShapeGeometry( contorno );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); // rojo
    const objeto = new THREE.Mesh( geometry, material ) ;
    this.add( objeto );
  }
  
  update () {}
}

export { Diamante };
