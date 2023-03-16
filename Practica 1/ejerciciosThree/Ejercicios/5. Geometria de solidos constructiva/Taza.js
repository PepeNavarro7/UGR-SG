import * as THREE from '../../libs/three.module.js'
 
class Taza extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();

    const radio_sup = 1.0;
    const radio_inf = 1.0;
    const altura = 2.0;
    const resolucion = 16;
    this.animacion = false;
    this.rotacion = 0.0;

    const geom_cilindro = new THREE.CylinderGeometry(radio_sup,radio_inf,altura,resolucion); 
    const material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    const cilindro = new THREE.Mesh( geom_cilindro, material );
    cilindro.position.set(0.0,altura/2.0,0.0);

    

    const axis = new THREE.AxesHelper (5);
    const objeto = new THREE.Object3D();
    objeto.add(cilindro);
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
      this.rotacion+=0.01;
      // como el orden es scale, rotate, translate, si roto "cilindro" rota sobre su centro
      // porque todavia no ha aplicado el subirlo
      this.cilindro.rotation.set (this.rotacion,this.rotacion,this.rotacion);
      //this.objeto.rotation.set(this.rotacion,this.rotacion,this.rotacion);
    }
  }
}

export { Taza };
