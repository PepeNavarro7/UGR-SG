import * as THREE from '../../libs/three.module.js'
 
class Reloj extends THREE.Object3D {
  constructor(gui) { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.createGUI(gui);
    this.crearHoras();
    this.crearBola();
    this.reloj = new THREE.Clock();
  }

  crearHoras(){
    const verde = new THREE.MeshPhysicalMaterial({color: 'green'});

    /* SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, 
    phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)*/
    const geomEsfera = new THREE.SphereGeometry(1.0);
    const modelo = new THREE.Object3D();

    for (let i = 0; i < 12; i++) {
      const angulo_g = 360/12*i;
      const angulo_r = angulo_g/360.0*2*Math.PI;
      const esfera = new THREE.Mesh(geomEsfera, verde);
      esfera.position.x=5.0 * Math.cos(angulo_r);
      esfera.position.z=5.0 * Math.sin(angulo_r);
      modelo.add(esfera);
    }

    this.add(modelo);
  }
  crearBola(){
    this.angulo = 0.0;
    const rojo = new THREE.MeshPhysicalMaterial({color: 'red'});
    const geomEsfera = new THREE.SphereGeometry(1.0);
    const bola = new THREE.Mesh(geomEsfera, rojo);
    const modelo = new THREE.Object3D();
    modelo.add(bola);
    this.add(modelo);

    //referencias
    this.esfera = modelo;
  }
  createGUI (gui) {
    this.guiControls = {
      velocidad : 1,
    } 
    
    var folder = gui.addFolder ('Luz y ejes');
    folder.add (this.guiControls, 'velocidad', -5, 5, 1).name ('Velocidad (marcas/s):').listen();
  }
  
  setAnimacion (valor) {
    this.animacion = valor;
  }
  update () {
    const velocidad = this.guiControls.velocidad;
    const segundosTranscurridos = this.reloj.getDelta();
    // marcas/s * s * º/marca * rad/º = rad
    //this.angulo+= velocidad * segundosTranscurridos * (360.0/12) * (2 * Math.PI / 360.0);
    this.angulo+=velocidad * segundosTranscurridos * Math.PI / 6;
    this.esfera.position.x=3.0 * Math.cos(this.angulo);
    this.esfera.position.z=3.0 * Math.sin(this.angulo);
  }
}

export { Reloj };
