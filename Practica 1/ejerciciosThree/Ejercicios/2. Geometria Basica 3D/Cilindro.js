import * as THREE from '../../libs/three.module.js'
 
class Cilindro extends THREE.Object3D {
  constructor(gui,titleGui) { // referencia a la gui, y el titulo que tendra la seccion del modelo
    super();

    this.radio_sup = 1.0;
    this.radio_inf = 1.0;
    this.altura = 1.0;
    this.resolucion = 4;
    
    // Se crea la parte de la interfaz que corresponde al modelo
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    let geometry = new THREE.CylinderGeometry(this.radio_sup,this.radio_inf,this.altura,this.resolucion); 
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
      radio_sup : 1.0,
      radio_inf : 1.0,
      altura : 1.0,
      resolucion : 4,
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio_sup', 0.1, 5.0, 0.1).name ('Radio superior: ').listen();
    folder.add (this.guiControls, 'radio_inf', 0.1, 5.0, 0.1).name ('Radio inferior: ').listen();
    folder.add (this.guiControls, 'altura', 0.1, 5.0, 0.1).name ('Altura: ').listen();
    folder.add (this.guiControls, 'resolucion', 3, 12, 1).name ('Resolucion: ').listen();
  }
  
  update () {
    this.rotacion+=0.01;
    this.rotation.set (this.rotacion,this.rotacion,this.rotacion);
    if(this.guiControls.radio_sup != this.radio_sup || this.guiControls.radio_inf != this.radio_inf 
      || this.guiControls.altura != this.altura || this.guiControls.resolucion != this.resolucion){
      this.radio_sup = this.guiControls.radio_sup;
      this.radio_inf = this.guiControls.radio_inf;
      this.altura = this.guiControls.altura;
      this.resolucion = this.guiControls.resolucion;
      this.modelo.geometry.dispose(); 
      /* esto me dijo el profe, accedo al atributo "geometry" del modelo, lo borro con dispose,
       y creo uno nuevo, sin tocar el modelo per se, solo modificando el atributo */
      this.modelo.geometry = new THREE.CylinderGeometry(this.radio_sup,this.radio_inf,this.altura,this.resolucion);
    }
  }
}

export { Cilindro };
