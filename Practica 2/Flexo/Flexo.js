import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Flexo extends THREE.Object3D {
  constructor() { 
    super();
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;

    this.cabezal();
  }

  cabezal(){
    const esferaGeom = new THREE.SphereGeometry(1.0);
    const esfera = new THREE.Mesh(esferaGeom, new THREE.MeshPhongMaterial({color: 'gray'}));

    const cilindroGeom = new THREE.CylinderGeometry(1, 1, 1.5); 
    cilindroGeom.rotateZ(Math.PI/2);
    const cilindro = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'gray'}));
    cilindro.position.x=1;

    this.add(esfera).add(cilindro);
  }
  
  update () {
  }
}

export { Flexo };
