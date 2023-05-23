import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
 
class Recorrido extends THREE.Object3D {
  constructor() {
    super();
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.crearCamino();
    this.crearBola();
    this.animacion();
  }

  crearCamino(){
    //Definición de la curva
    this.splineDer = new THREE.CatmullRomCurve3 ([
      new THREE.Vector3 (0,0,0),

      new THREE.Vector3 (13,0,13), new THREE.Vector3 (16,0,16),
      new THREE.Vector3 (20,0,18), new THREE.Vector3 (24,0,13),

      new THREE.Vector3 (25,0,10), new THREE.Vector3 (26,0,0),

      new THREE.Vector3 (24,0,-13), new THREE.Vector3 (20,0,-18),
      new THREE.Vector3 (16,0,-16), new THREE.Vector3 (13,0,-13),

      new THREE.Vector3 (0,0,0)
    ]);

    this.splineIzq = new THREE.CatmullRomCurve3 ([
      new THREE.Vector3 (0,0,0),

      new THREE.Vector3 (-13,0,13), new THREE.Vector3 (-16,0,16),
      new THREE.Vector3 (-20,0,18), new THREE.Vector3 (-24,0,13),

      new THREE.Vector3 (-25,0,10), new THREE.Vector3 (-26,0,0),

      new THREE.Vector3 (-24,0,-13), new THREE.Vector3 (-20,0,-18),
      new THREE.Vector3 (-16,0,-16), new THREE.Vector3 (-13,0,-13),

      new THREE.Vector3 (0,0,0)
    ]);

    const geometryLineDer = new THREE.BufferGeometry();
    geometryLineDer.setFromPoints(this.splineDer.getPoints(100));

    const geometryLineIzq = new THREE.BufferGeometry();
    geometryLineIzq.setFromPoints(this.splineIzq.getPoints(100));

    var material = new THREE.LineBasicMaterial( { color : 'blue' } );

    // Create the final object to add to the scene
    var curveObjectDer = new THREE.Line( geometryLineDer, material );
    var curveObjectIzq = new THREE.Line( geometryLineIzq, material );

    this.add(curveObjectDer);
    this.add(curveObjectIzq);
  }
  crearBola(){
    const rojo = new THREE.MeshPhysicalMaterial({color: 'red'});
    const geomEsfera = new THREE.SphereGeometry(1.0);
    const bola = new THREE.Mesh(geomEsfera, rojo);
    const modelo = new THREE.Object3D();
    modelo.add(bola);
    this.add(modelo);

    //referencias
    this.esfera = modelo;
  }
  animacion(){
    //Animaciones con TWEEN
    var origen = { p : 0 } ;
    var destino = { p : 1 } ;
    var that = this;

    var movimientoDer = new TWEEN.Tween(origen)
      .to(destino, 8000) //8 segundos
      .easing (TWEEN.Easing.Quartic.InOut)
      .onUpdate (() => {
        var t = origen.p;
        var posicion = that.splineDer.getPointAt(t);
        that.esfera.position.copy(posicion);
        var tangente = that.splineDer.getTangentAt(t);
        posicion.add(tangente);
        that.esfera.lookAt(posicion);
      })
      .onComplete (() => {
        origen.p = 0;
      })
      .start();

    var movimientoIzq = new TWEEN.Tween(origen)
      .to(destino, 4000) //4 segundos
      .easing (TWEEN.Easing.Quartic.InOut)
      .onUpdate (() => {
        var t = origen.p;
        var posicion = that.splineIzq.getPointAt(t);
        that.esfera.position.copy(posicion);
        var tangente = that.splineIzq.getTangentAt(t);
        posicion.add(tangente);
        that.esfera.lookAt(posicion);
      })
      .onComplete (() => {
        origen.p = 0;
      });

    movimientoDer.chain(movimientoIzq);
    movimientoIzq.chain(movimientoDer);
  }
  
  setAnimacion (valor) {
    this.animacion = valor;
  }
  update () {
    TWEEN.update();
  }
}

export { Recorrido };
