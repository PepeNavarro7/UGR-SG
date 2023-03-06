import * as THREE from '../../libs/three.module.js'
 
class Caja extends THREE.Object3D {
  constructor(gui,titleGui) { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    let boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de las normales
    let boxMat = new THREE.MeshNormalMaterial();
    boxMat.flatShading = false;

    // Ya podemos construir el Mesh
    let box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);

    this.rotacion = 0.0;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = {
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
  }
  
  update () {
    this.rotacion+=0.01;
    this.rotation.set (this.rotacion,this.rotacion,this.rotacion);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { Caja };
