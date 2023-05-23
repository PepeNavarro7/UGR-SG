import * as THREE from '../../libs/three.module.js'
 
class Linea extends THREE.Object3D {
  constructor() {
    super();

    // Puntos
    let points3 = [];
    // Se añaden puntos al array mediante unas cuantas instrucciones como la siguiente
    // definimos el contorno a revolucionar
    points3.push (new THREE.Vector3 (0.0, 5.0, 0));
    points3.push (new THREE.Vector3 (2.5, 5.0, 0));
    points3.push (new THREE.Vector3 (2.5, 0.0, 0));
    points3.push (new THREE.Vector3 (0.0, 0.0, 0));

    
    let material = new THREE.MeshNormalMaterial();
    
    // Para crear una línea visible, como en el vídeo
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints (points3);
    let contorno = new THREE.Line (geometry, material);
    this.add(contorno);
  }
  
  update () {}
}

export { Linea };
