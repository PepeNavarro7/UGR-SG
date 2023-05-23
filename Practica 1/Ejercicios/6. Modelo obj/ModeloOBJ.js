import * as THREE from '../../libs/three.module.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import { MTLLoader } from '../../libs/MTLLoader.js'

class ModeloOBJ extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.animacion = false;
    
    const materialLoader = new MTLLoader();
    const objectLoader = new OBJLoader();
    materialLoader.load('../../models/porsche911/911.mtl',
      (materials) => {
        objectLoader.setMaterials(materials);
        objectLoader.load('../../models/porsche911/Porsche_911_GT2.obj',
          (object) => {
            this.add(object);
          },null,null) ;
      } );

    this.position.set(0.0,0.7,0.0)
  }
    
  setAnimacion (valor) {
    this.animacion = valor;
  }
  update () {
    if(this.animacion){
      this.rotateY(0.01);
    }
  }
}

export { ModeloOBJ };
