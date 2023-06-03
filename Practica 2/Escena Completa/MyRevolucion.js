import * as THREE from '../libs/three.module.js'
 
class MyRevolucion extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
	
    this.points = [];
    this.points.push (new THREE.Vector3(0.001,-1.5,0));
    this.points.push (new THREE.Vector3(1.0,-1.45,0));
    this.points.push (new THREE.Vector3(1.0,-1.1,0));
    this.points.push (new THREE.Vector3(0.5,-0.7,0));
    this.points.push (new THREE.Vector3(0.4,-0.4,0));
    this.points.push (new THREE.Vector3(0.4,0.5,0));
    this.points.push (new THREE.Vector3(0.5,0.6,0));
    this.points.push (new THREE.Vector3(0.3,0.6,0));
    this.points.push (new THREE.Vector3(0.5,0.8,0));
    this.points.push (new THREE.Vector3(0.55,1.0,0));
    this.points.push (new THREE.Vector3(0.5,1.2,0));
    this.points.push (new THREE.Vector3(0.3,1.45,0));
    this.points.push (new THREE.Vector3(0.001,1.5,0));

    this.mypoints = this.points; //puntos para la revolucion

    // Como material se crea uno a partir de un color
    var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    material.needsUpdate = true;
    
    var latheGeom = new THREE.LatheGeometry(this.points, 12, 0, 2*Math.PI); //Array de perfil, segmentos, angulo inicial y longitud del giro
    //LatheGeometry(points : Array, segments : Integer, phiStart : Float, phiLength : Float)

    // Ya podemos construir el Mesh
    this.latheObject = new THREE.Mesh(latheGeom, material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.latheObject);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    
    this.latheObject.position.y+=1.5;//Lo colocamos sobre plano XZ
    this.latheObject.position.x+=3;
  }
  
  
  crearNuevo() {

    this.latheObject.geometry.dispose();
    var nuevaGeometria = new THREE.LatheGeometry(this.mypoints,this.guiControls.resolucion, 0, this.guiControls.angulo);
    this.latheObject.geometry = nuevaGeometria;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
	this.resolucion = 12;
   	this.angulo = 3.1416*2;
    } 
    
    var that = this;
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'resolucion', 3, 25, 1).name ('Resolucion :').listen().onChange((value) => {this.crearNuevo()});;
    folder.add (this.guiControls, 'angulo', 0.1, 3.1416*2, 0.1).name ('Angulo :').listen().onChange((value) => {this.crearNuevo()});;
    
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    

    
  }
}


export { MyRevolucion };
