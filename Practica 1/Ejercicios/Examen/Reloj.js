import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
 
class Reloj extends THREE.Object3D {
  constructor() { // referencia a la gui, y el titulo que tendra la seccion de la caja
    super();
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.crearRevolucion();
    this.crearMarcas();
    this.crearBolaExt();
    this.crearBolaInt();
    this.reloj = new THREE.Clock();
  }

  crearRevolucion(){
    
    const verde = new THREE.MeshPhongMaterial({color: 'green'});
    //Create a closed wavey loop
    const curva2D = new THREE.CatmullRomCurve3( [
      new THREE.Vector2( 0, 0),
      new THREE.Vector2( 0.001, 0),
      new THREE.Vector2( 4, 0),
      new THREE.Vector2( 6, 0),
      new THREE.Vector2( 8, 0.5),
      new THREE.Vector2( 9, 1),
      new THREE.Vector2( 8, 2),
      new THREE.Vector2( 6, 1),
      new THREE.Vector2( 4, 2),
      new THREE.Vector2( 2, 1),
      new THREE.Vector2( 1.5, 1.25),
      new THREE.Vector2( 1, 1.5),
      new THREE.Vector2( 0.5, 4),
      new THREE.Vector2( 0, 4)    
    ] );

    const puntos = curva2D.getPoints( 100 );
    //LatheGeometry(points : Array, segments : Integer, phiStart : Float, phiLength : Float)
    const geomRevolucion = new THREE.LatheGeometry(puntos);
    const objeto = new THREE.Mesh( geomRevolucion, verde );
    this.add(objeto);
  }

  crearMarcas(){
    /*BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, 
    heightSegments : Integer, depthSegments : Integer) */
    const geomMarcaExt = new THREE.BoxGeometry(0.25,0.25,1.0);
    const geomMarcaInt = new THREE.BoxGeometry(0.25,0.25,1.0);
    const modeloMarcas = new THREE.Object3D();
    geomMarcaExt.translate(0.0,0.0,-8.0);
    geomMarcaInt.translate(0.0,0.0,-4.0);

    for (let i = 0; i < 12; i++) {
      const marcaExt = new THREE.Mesh(geomMarcaExt, this.materialNormal);
      const marcaInt = new THREE.Mesh(geomMarcaInt, this.materialNormal);
      marcaExt.rotation.y=Math.PI/6.0*i;
      marcaInt.rotation.y=Math.PI/6.0*i;
      marcaExt.position.y=2.15;
      marcaInt.position.y=2.15;
      modeloMarcas.add(marcaExt);
      modeloMarcas.add(marcaInt);
    }

    this.add(modeloMarcas);
  }
  crearBolaExt(){
    const rojo = new THREE.MeshPhongMaterial({color: 'red'});
    /*SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, 
    phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float) */
    const geomEsfera = new THREE.SphereGeometry(0.7);
    const esfera = new THREE.Mesh(geomEsfera, rojo);
    esfera.position.z = -6.0; // Separamos la bola del eje, para poder girarla
    const modeloEsferaExt = new THREE.Object3D();
    modeloEsferaExt.add(esfera);
    modeloEsferaExt.position.y=2.0;
    this.add(modeloEsferaExt);
    
    //referencia
    this.esferaExt = modeloEsferaExt;
    this.angulo = 0.0;
  }
  crearBolaInt(){
    const azul = new THREE.MeshPhongMaterial({color: 'blue'});
    const geomEsfera = new THREE.SphereGeometry(0.7);
    const esfera = new THREE.Mesh(geomEsfera, azul);
    esfera.position.z = -2.0; // Separamos la bola del eje, para poder girarla
    const modeloEsferaInt = new THREE.Object3D();
    modeloEsferaInt.add(esfera);
    modeloEsferaInt.position.y=2.0;
    this.add(modeloEsferaInt);
    
    const origen = {p: 0.0};
    const destino = {p: Math.PI/6.0};
    this.movimiento = new TWEEN.Tween(origen)
      .to(destino,1000)
      .onUpdate(()=>{ modeloEsferaInt.rotation.y = origen.p; })
      .onComplete(()=>{
        origen.p = destino.p;
        destino.p += Math.PI/6.0;
      });
    //referencia
    this.esferaInt = modeloEsferaInt;
  }
  update () {
    const velocidad = 1.0
    const segundosTranscurridos = this.reloj.getDelta();
    // marcas/seg * seg * rad/marca
    this.angulo+= velocidad * segundosTranscurridos * Math.PI/6;
    this.esferaExt.rotation.y -= velocidad * segundosTranscurridos * Math.PI/6;
    if(Math.sin(this.angulo)>=0.0 && Math.sin(this.angulo)<=0.1){
      this.movimiento.start();
    }
    TWEEN.update();
  }
}

export { Reloj };
