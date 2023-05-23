import * as THREE from '../../libs/three.module.js'
 
class Revolucion extends THREE.Object3D {
  constructor(gui,titleGui) { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.createGUI(gui,titleGui); 

    this.resolucion = 3;
    this.angulo = Math.PI / 4;
    // Puntos
    let points3 = [];
    // Se añaden puntos al array mediante unas cuantas instrucciones como la siguiente
    // definimos el contorno a revolucionar
    points3.push (new THREE.Vector3 (0.0, 0.0, 0));
    points3.push (new THREE.Vector3 (2.5, 0.0, 0));
    points3.push (new THREE.Vector3 (2.5, 5.0, 0));
    points3.push (new THREE.Vector3 (0.0, 5.0, 0));    
    this.points = points3; // referencia para llamarlo desde fuera

    // LatheGeometry(points : Array, segments : Integer, phiStart : Float, phiLength : Float)
    let geometry_c = new THREE.LatheGeometry(points3, this.resolucion, 0.0, 2.0*Math.PI);
    let geometry = new THREE.LatheGeometry(points3, this.resolucion, 0.0, this.angulo);
    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;

    // Para crear la figura por revolución
    this.objeto_revolucion = new THREE.Mesh (geometry, this.material);
    this.objeto_c = new THREE.Mesh(geometry_c,this.material);
    this.objeto_c.position.x += 8.0;
    this.add(this.objeto_revolucion);
    this.add(this.objeto_c);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = {
      resolucion : 3,
      angulo : 1.0,
    } 
    let max_c = 2.0 * Math.PI;
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'resolucion', 3, 16, 1).name ('Resolución: ').listen();
    folder.add (this.guiControls, 'angulo', 0.0, max_c, 0.1).name ('Ángulo: ').listen();
  }

  setSombreadoPlano (valor) {
    this.material.flatShading = valor;
    this.material.needsUpdate = true;
  }
  
  update () {
    if(this.guiControls.resolucion != this.resolucion || this.guiControls.angulo != this.angulo){
      this.resolucion = this.guiControls.resolucion;
      this.angulo = this.guiControls.angulo;
      this.objeto_revolucion.geometry.dispose(); 
      this.objeto_c.geometry.dispose();
      this.objeto_revolucion.geometry = new THREE.LatheGeometry(this.points, this.resolucion, 0.0, this.angulo);
      this.objeto_c.geometry = new THREE.LatheGeometry(this.points, this.resolucion, 0.0, 2.0*Math.PI);
    }
  }
}

export { Revolucion };
