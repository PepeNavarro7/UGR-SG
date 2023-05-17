import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Flexo extends THREE.Object3D {
  constructor() { 
    super();
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;

    this.cabezal();
    this.brazos();
    this.animacion();

    this.a1=this.a2=this.a3=true;
  }

  cabezal(){
    const esferaGeom = new THREE.SphereGeometry(2.0);
    const esfera = new THREE.Mesh(esferaGeom, new THREE.MeshPhongMaterial({color: 'silver'}));

    const cilindroGeom = new THREE.CylinderGeometry(1, 1, 1.5); 
    cilindroGeom.rotateZ(Math.PI/2);
    const cilindro = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'silver'}));
    cilindro.position.x=-2.5;

    const vacioGeom = new THREE.BoxGeometry(4,4,4);
    const vacio = new THREE.Mesh(vacioGeom,new THREE.MeshPhongMaterial({color: 'silver'}))
    vacio.position.x=2;

    const csg = new CSG().union([esfera,cilindro]);
    csg.subtract([vacio]);
    const resultado = csg.toMesh();
    resultado.position.x=3.25;

    const cabeza = new THREE.Object3D().add(resultado);
    cabeza.rotation.z=-Math.PI/6.0;

    // Referencia
    this.cabeza = cabeza;
    // Picking
    resultado.userData = this;
    this.pickCabeza = resultado;
  }

  brazos(){
    const LARGO = 8.0;
    const ANGULOINF = 5.0 * Math.PI / 12.0; // Angulo del brazo inferior, 0 es estirado 90 es tumbado
    const ANGULOSUP = 5.0 * Math.PI / 12.0; // Angulo del brazo superior, 0 es estirado 90 es tumbado


    const cilindroGeom = new THREE.CylinderGeometry(4, 4, 0.5); 
    cilindroGeom.translate(0.0,0.25,0.0);
    const base = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'gray'}));

    const brazoGeom = new THREE.BoxGeometry(1,LARGO,1);
    brazoGeom.translate(0.0,LARGO/2,0.0);

    const brazoSup = new THREE.Mesh(brazoGeom,new THREE.MeshPhongMaterial({color: 'darkgray'}));
    brazoSup.rotation.z = -ANGULOSUP;
    this.cabeza.position.set(LARGO*Math.sin(ANGULOSUP),LARGO*Math.cos(ANGULOSUP),0);
    const superior = new THREE.Object3D().add(brazoSup).add(this.cabeza);

    const brazoInf = new THREE.Mesh(brazoGeom,new THREE.MeshPhongMaterial({color: 'darkgray'}));
    brazoInf.rotation.z = ANGULOINF;
    superior.position.set(-Math.sin(ANGULOINF)*LARGO,Math.cos(ANGULOINF)*LARGO,0);

    this.add(base).add(superior).add(brazoInf);

    // refetencias
    this.brazoInf=brazoInf;
    this.superior=superior;
    this.brazoSup=brazoSup;
    // picking
    this.pickArriba = brazoSup;
    this.pickAbajo = brazoInf;
    brazoSup.userData = this;
    brazoInf.userData = this;
  }

  animacion(){
    const origen1 = { t: 5.0*Math.PI/12.0};
    const fin1 = {t: Math.PI/12.0};
    const origen2 = { t: 5.0*Math.PI/12.0};
    const fin2 = {t: Math.PI/12.0};
    const origen3 = {t: -Math.PI/6.0};
    const fin3 = {t: Math.PI/6.0};
    const tiempoDeRecorrido=1000;
    const LARGO = 8.0;

    this.animacion1 = new TWEEN.Tween (origen1).to (fin1, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoInf.rotation.z = origen1.t;
        this.superior.position.x = -Math.sin(origen1.t)*LARGO;
        this.superior.position.y = Math.cos(origen1.t)*LARGO;
      })
      .onComplete(() => { origen1.t = 5.0*Math.PI/12.0 })
    this.animacion1V = new TWEEN.Tween (fin1).to (origen1, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoInf.rotation.z = fin1.t;
        this.superior.position.x = LARGO * -Math.sin(fin1.t);
        this.superior.position.y = LARGO * Math.cos(fin1.t);
      })
      .onComplete(() => { fin1.t = Math.PI/12.0 });

    this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoSup.rotation.z = -origen2.t;
        this.cabeza.position.x = LARGO * Math.sin(origen2.t);
        this.cabeza.position.y = LARGO * Math.cos(origen2.t);
      })
      .onComplete(() => { origen2.t = 5.0*Math.PI/12.0 })
    this.animacion2V = new TWEEN.Tween (fin2).to (origen2, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoSup.rotation.z = -fin2.t;
        this.cabeza.position.x = LARGO * Math.sin(fin2.t);
        this.cabeza.position.y = LARGO * Math.cos(fin2.t);        
      })
      .onComplete(() => { fin2.t = Math.PI/12.0 });

    this.animacion3 = new TWEEN.Tween (origen3).to (fin3, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.cabeza.rotation.z = origen3.t;
      })
      .onComplete(() => { origen3.t = -Math.PI/6.0; });
    this.animacion3V = new TWEEN.Tween (fin3).to (origen3, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.cabeza.rotation.z = fin3.t;
      })
      .onComplete(() => { fin3.t = Math.PI/6.0; });

  }

  recibeClic ( meshConcreto ){
    switch(meshConcreto){
      case this.pickAbajo:
        if(this.a1){
          this.a1=false;
          this.animacion1.start();
        } else {
          this.a1=true;
          this.animacion1V.start();
        }
      break;
      case this.pickArriba:
        if(this.a2){
          this.a2=false;
          this.animacion2.start();
        } else {
          this.a2=true;
          this.animacion2V.start();
        }
      break;
      case this.pickCabeza:
        if(this.a3){
          this.a3=false;
          this.animacion3.start();
        } else {
          this.a3=true;
          this.animacion3V.start();
        }
      break;      
      default: break;
    }
  }
  
  update () {
    TWEEN.update();
  }
}

export { Flexo };
