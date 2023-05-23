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
    const rojo = new THREE.MeshPhongMaterial({color: 'red'});
    const geomEsfera = new THREE.SphereGeometry(1.0);
    const esfera = new THREE.Mesh(geomEsfera, rojo);
    esfera.position.x = 3.0; // Separamos la bola del eje, para poder girarla
    const modelo = new THREE.Object3D();
    modelo.add(esfera);
    this.add(modelo);
    
    //referencias
    this.modelo = modelo;
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
    // marcas/seg * seg * rad/marca
    this.modelo.rotation.y += velocidad * segundosTranscurridos * Math.PI/6;
  }
}

export { Reloj };
