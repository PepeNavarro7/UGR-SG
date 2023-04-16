import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
//'../libs/CSG-v2.js'
 
class Pendulo extends THREE.Object3D {
  constructor(gui) { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.createGUI(gui);
    this.crearPrimerPendulo();
    this.crearSegundoPendulo();
  }

  crearPrimerPendulo(){
    const verde = new THREE.MeshPhysicalMaterial({color: 'green'});
    const rojo = new THREE.MeshPhysicalMaterial({color: 'red'});

    /* BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, 
    heightSegments : Integer, depthSegments : Integer)*/
    const geomPeque = new THREE.BoxGeometry(4,4,4);
    const cuboPeque1 = new THREE.Mesh(geomPeque, verde);

    const geomGrande = new THREE.BoxGeometry(4,5.0,4);
    geomGrande.translate(0.0,-2.5,0.0); // Situamos el eje encima del prisma, para que solo crezca hacia abajo
    const cuboGrande = new THREE.Mesh(geomGrande,rojo);
    cuboGrande.position.y = -2.0;

    const cuboPeque2 = new THREE.Mesh(geomPeque, verde);

    const modelo = new THREE.Object3D();
    modelo.add(cuboPeque1);
    modelo.add(cuboGrande);
    modelo.add(cuboPeque2);
    this.add(modelo);

    // Referencias
    this.cuboPeque2 = cuboPeque2;
    this.cuboGrande = cuboGrande;
  }
  crearSegundoPendulo(){
    const azul = new THREE.MeshPhysicalMaterial({color: 'blue'});

    const geometria = new THREE.BoxGeometry(2,10,2);
    geometria.translate(0.0,-5,0.0); 
    const cubo = new THREE.Mesh(geometria, azul);
    cubo.position.y=1.0;    

    const modelo = new THREE.Object3D();
    modelo.add(cubo);
    modelo.position.z=3.0;
    this.add(modelo);

    // Referencias
    this.objeto2 = modelo;
    this.cuboAzul = cubo;
  }
  createGUI (gui) {
    this.guiControls1 = {
      longitud : 5,
      giro : 0,
    } 
    this.guiControls2 = {
      longitud : 10,
      posicion : 10,
      giro : 0,
    } 
    
    var folder1 = gui.addFolder ('Primer Pendulo');
    folder1.add (this.guiControls1, 'longitud', 5, 10, 1).name ('Longitud:').listen();
    folder1.add (this.guiControls1, 'giro', -45, 45, 1).name ('Giro:').listen();

    var folder2 = gui.addFolder ('Segundo Pendulo');
    folder2.add (this.guiControls2, 'longitud', 10, 20, 1).name ('Longitud:').listen();
    folder2.add (this.guiControls2, 'posicion', 10, 90, 1).name ('Posicion (%):').listen();
    folder2.add (this.guiControls2, 'giro', -45, 45, 1).name ('Giro:').listen();
  }
  
  setAnimacion (valor) {
    this.animacion = valor;
  }
  update () {
    const longitudRojo = this.guiControls1.longitud;
    const longitudAzul = this.guiControls2.longitud;
    const giroPendulos = this.guiControls1.giro / 360.0 * 2.0 * Math.PI;
    const giroPendulo2 = this.guiControls2.giro / 360.0 * 2.0 * Math.PI;
    const descenso = 2.0 + longitudRojo * this.guiControls2.posicion / 100.0;

    this.cuboPeque2.position.y = -(4.0 + longitudRojo);
    this.cuboGrande.scale.y = longitudRojo / 5.0;
    
    this.cuboAzul.scale.y = longitudAzul/10.0;
    this.objeto2.rotation.z = giroPendulo2;
    this.objeto2.position.y = -descenso;

    this.rotation.z=giroPendulos;
  }
}

export { Pendulo };
