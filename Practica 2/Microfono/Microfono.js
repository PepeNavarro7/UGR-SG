import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Microfono extends THREE.Object3D {
  constructor() { 
    super();
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;

    this.pie(); // constructor del pie
    this.micro(); // constructor del micro
    this.animacion(); // metodo que aloja la animacion del pie
    this.estirado = true;
  }

  pie(){
    const boxGeom = new THREE.BoxGeometry(2,0.2,2);
    boxGeom.translate(0,0.1,0);
    const caja = new THREE.Mesh(boxGeom,new THREE.MeshPhongMaterial({color: 'red'}));

    const cilindroGeom = new THREE.CylinderGeometry(0.4, 0.4, 5); 
    cilindroGeom.translate(0,2.5,0);

    const pieAbajo = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'green'}));
    pieAbajo.position.y=0.2;

    const pieArriba = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'blue'}));
    // <- En este paso se escalará el pie en Y
    pieArriba.position.y=5.2;

    const estructura = new THREE.Object3D().add(pieAbajo).add(pieArriba).add(caja);

    this.add(estructura);

    // Refetencia para la animacion
    this.pieScale = pieArriba;
  }

  micro(){
    const conoGeom = new THREE.CylinderGeometry(0.001,1,3); 
    const cono = new THREE.Mesh(conoGeom, new THREE.MeshPhongMaterial({color: 'yellow'}));

    const esferaGeom = new THREE.SphereGeometry(1.0);
    const esfera = new THREE.Mesh(esferaGeom, new THREE.MeshPhongMaterial({color: 'yellow'}));
    esfera.position.y = -2;

    const csg = new CSG();
    csg.union([cono,esfera]);
    const resultadoCSG = csg.toMesh();

    resultadoCSG.rotateZ(Math.PI/2+0.4);
    resultadoCSG.position.set(-0.1,0.45,0);

    const estructura = new THREE.Object3D().add(resultadoCSG);
    // <- Aqui iria la rotacion en y
    estructura.position.y=10.2; // En la animacion reescribimos esta línea
    this.add(estructura);

    this.microfono = estructura;
  }

  animacion(){
    const origen = { t: 1.0};
    const fin = {t: 0.0};
    const tiempoDeRecorrido=2000;

    this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.pieScale.scale.y = origen.t;  // El pie se achica
        this.microfono.position.y = 5.2 + 5.0*origen.t; // Y por tanto el micro cambia su altura
      })
      .onComplete(() => { origen.t = 1.0; });

    this.animacion2 = new TWEEN.Tween (fin).to (origen, tiempoDeRecorrido)
      .onUpdate(() => {
        this.pieScale.scale.y = fin.t;  // El pie se agranda
        this.microfono.position.y = 5.2 + 5.0*fin.t; // Y el micro sube
      }) 
      .onComplete(() => { fin.t = 0.0; });
  }
  anima(){
    if(this.estirado){
      this.estirado = false;
      this.animacion1.start();
    } else {
      this.estirado = true;
      this.animacion2.start();
    }
  }

  update () {
    TWEEN.update();
  }
}

export { Microfono };
