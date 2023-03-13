import * as THREE from '../../libs/three.module.js'
 
class Icosaedro extends THREE.Object3D {
  constructor(gui,titleGui) { // referencia a la gui, y el titulo que tendra la seccion del modelo
    super();

    this.radio = 1.0;
    this.subdivision = 0;
    
    // Se crea la parte de la interfaz que corresponde al modelo
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    let geometry = new THREE.IcosahedronGeometry(this.radio,this.subdivision);
    // Como material se crea uno a partir de las normales
    let material = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.modelo = new THREE.Mesh (geometry, material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.modelo);

    this.rotacion = 0.0;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño del modelo
    this.guiControls = {
      radio : 1.0,
      subdivision : 0,
    }
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1, 5, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'subdivision', 0, 3, 1).name ('Subdivision: ').listen();
  }
  
  update () {
    this.rotacion+=0.01;
    this.rotation.set (this.rotacion,this.rotacion,this.rotacion);
    if(this.guiControls.radio != this.radio || this.guiControls.subdivision != this.subdivision){
      this.radio = this.guiControls.radio;
      this.subdivision = this.guiControls.subdivision;
      this.modelo.geometry.dispose(); 
      /* esto me dijo el profe, accedo al atributo "geometry" del modelo, lo borro con dispose,
       y creo uno nuevo, sin tocar el modelo per se, solo modificando el atributo */
      this.modelo.geometry = new THREE.IcosahedronGeometry(this.radio,this.subdivision);
    }
  }
}

export { Icosaedro };
