import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class RelojPendulo extends THREE.Object3D {
  constructor() { 
    super();
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.reloj = new THREE.Clock();

    this.cuerpoReloj();
    this.crearPendulo();
  }

  cuerpoReloj(){
    const shape = new THREE.Shape();
    shape.moveTo( 0,14 );
    shape.lineTo( 3, 10 );
    shape.lineTo( 3, 0 );
    shape.lineTo( -3, 0 );
    shape.lineTo( -3, 10 );
    shape.lineTo( 0, 14 );

    const extrudeSettings = {
      steps: 2,
      depth: 4,
      bevelEnabled: false,
    };

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const extrudeMesh = new THREE.Mesh( extrudeGeometry, new THREE.MeshPhongMaterial({color: 'saddlebrown'}) ) ;

    const boxGeom = new THREE.BoxGeometry(3,6,4);
    const box = new THREE.Mesh(boxGeom, new THREE.MeshPhongMaterial({color: 'saddlebrown'}));
    box.translateY(4);
    box.translateZ(3);

    const csg = new CSG();
    csg.union([extrudeMesh]);
    csg.subtract([box]);
    const resultadoCSG = csg.toMesh();
    const objeto = new THREE.Object3D();
    objeto.add(resultadoCSG);
    objeto.position.z = -2;
    this.add(objeto);

    this.cuerpo_reloj = this.objeto;
  }
  crearPendulo(){
    const circulo = new THREE.Shape();
    circulo.moveTo( 0, 0.5 );
    circulo.absarc( 0, 0, 0.5, 0, 2 * Math.PI, false );

    const shape = new THREE.Shape();
    shape.moveTo(0.1, 4);
    shape.lineTo(0.1, 0.5);
    shape.lineTo(-0.1, 0.5);
    shape.lineTo(-0.1, 4);
    
    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    const circGeom = new THREE.ExtrudeGeometry( circulo, extrudeSettings );
    const pendGeom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const mesh1 = new THREE.Mesh( circGeom, new THREE.MeshPhongMaterial({color: 'green'}) ) ;
    const mesh2 = new THREE.Mesh( pendGeom, new THREE.MeshPhongMaterial({color: 'green'}) ) ;
    const objetoRot = new THREE.Object3D();
    objetoRot.add(mesh1);
    objetoRot.add(mesh2);
    objetoRot.position.y=-4;
    const objeto = new THREE.Object3D();
    objeto.add(objetoRot);
    objeto.position.y=6;
    this.add(objeto);

    //ANIMACION
    var origen = { t: -Math.PI/10};
    var fin = {t: Math.PI/10};
    var origen2 = {t: Math.PI/10};
    var fin2 = {t: -Math.PI/10};
    const tiempoDeRecorrido=1000;

    var animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { objeto.rotation.z = -origen.t; })
      .onComplete(() => { animacion2.start() })
      .start();

    var animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { objeto.rotation.z = -origen2.t; })
      .onComplete(() => {animacion1.start()});

    this.rotacionPendulo=objeto;
  }

  update () {
    TWEEN.update();
  }
}

export { RelojPendulo };
