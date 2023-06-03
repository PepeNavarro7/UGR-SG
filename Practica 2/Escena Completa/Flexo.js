import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Flexo extends THREE.Object3D {
  constructor() { 
    super();
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    
    this.mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });

    this.base();
    this.cabezal();
    this.brazos();
    this.animacion();

    this.a1=this.a2=this.a3=true;
  }

  base(){
    const cilindroGeom = new THREE.CylinderGeometry(4, 4, 0.5); 
    cilindroGeom.translate(0.0,0.25,0.0);
    const base = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'gray'}));
    
    var madera = new THREE.BoxGeometry (10,1.5,10); 
    madera.translate(0,-0.7,0);
    this.maderaMesh = new THREE.Mesh(madera, this.mat_marron_madera);
    this.add(this.maderaMesh).add(base);
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

    const brazoGeom = new THREE.BoxGeometry(1,LARGO,1); // Creo la geometria de los brazos y bajamos el eje
    const material = new THREE.MeshPhongMaterial({color: 'darkgray'});
    brazoGeom.translate(0.0,LARGO/2,0.0);

    const brazoSup = new THREE.Mesh(brazoGeom,material);
    brazoSup.rotation.z = -ANGULOSUP;
    this.cabeza.position.set(LARGO*Math.sin(ANGULOSUP),LARGO*Math.cos(ANGULOSUP),0);
    const superior = new THREE.Object3D().add(brazoSup).add(this.cabeza);

    const brazoInf = new THREE.Mesh(brazoGeom,material);
    brazoInf.rotation.z = ANGULOINF;
    superior.position.set(-Math.sin(ANGULOINF)*LARGO,Math.cos(ANGULOINF)*LARGO,0);

    this.add(superior).add(brazoInf);;

    // referencias
    this.brazoInf=brazoInf;
    this.superior=superior;

    // picking
    this.pickArriba = brazoSup;
    this.pickAbajo = brazoInf;
    brazoSup.userData = this;
    brazoInf.userData = this;
  }

  animacion(){
    const origenInferior = { t: 5.0*Math.PI/12.0};
    const finInferior = {t: Math.PI/12.0};
    const origenSup = { t: 0.0 };
    const finSup = { t: Math.PI / 3.0 };
    const origenCabeza = {t: -Math.PI/6.0};
    const finCabeza = {t: Math.PI/6.0};
    const tiempoDeRecorrido=1000;
    const LARGO = 8.0;

    // No rotamos el objeto completo (inferior) sino solo el brazo inferior para que el superior se quede fijo
    // Como ocurriría en un flexo real
    this.animacionInferior = new TWEEN.Tween (origenInferior).to (finInferior, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoInf.rotation.z = origenInferior.t;
        this.superior.position.x = -Math.sin(origenInferior.t)*LARGO;
        this.superior.position.y = Math.cos(origenInferior.t)*LARGO;
      })
      .onComplete(() => { origenInferior.t = 5.0*Math.PI/12.0 })
    this.animacionInferior2 = new TWEEN.Tween (finInferior).to (origenInferior, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.brazoInf.rotation.z = finInferior.t;
        this.superior.position.x = LARGO * -Math.sin(finInferior.t);
        this.superior.position.y = LARGO * Math.cos(finInferior.t);
      })
      .onComplete(() => { finInferior.t = Math.PI/12.0 });
    // Animacion de la parte superior, el brazo y la cabeza
    this.animacionSuperior = new TWEEN.Tween (origenSup).to (finSup, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.superior.rotation.z = origenSup.t;
      })
      .onComplete(() => { origenSup.t = 0.0 })
    this.animacionSuperior2 = new TWEEN.Tween (finSup).to (origenSup, tiempoDeRecorrido)
      .onUpdate(() => {     
        this.superior.rotation.z = finSup.t;  
      })
      .onComplete(() => { finSup.t = Math.PI / 3.0 });
    // Animacion de la cabeza
    this.animacionCabeza = new TWEEN.Tween (origenCabeza).to (finCabeza, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.cabeza.rotation.z = origenCabeza.t;
      })
      .onComplete(() => { origenCabeza.t = -Math.PI/6.0; });
    this.animacionCabeza2 = new TWEEN.Tween (finCabeza).to (origenCabeza, tiempoDeRecorrido)
      .onUpdate(() => { 
        this.cabeza.rotation.z = finCabeza.t;
      })
      .onComplete(() => { finCabeza.t = Math.PI/6.0; });
  }

  recibeClic ( meshConcreto ){
    switch(meshConcreto){
      case this.pickAbajo:
        if(this.a1){
          this.a1=false;
          this.animacionInferior.start();
        } else {
          this.a1=true;
          this.animacionInferior2.start();
        }
      break;
      case this.pickArriba:
        if(this.a2){
          this.a2=false;
          this.animacionSuperior.start();
        } else {
          this.a2=true;
          this.animacionSuperior2.start();
        }
      break;
      case this.pickCabeza:
        if(this.a3){
          this.a3=false;
          this.animacionCabeza.start();
        } else {
          this.a3=true;
          this.animacionCabeza2.start();
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
