import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Microfono extends THREE.Object3D {
  constructor() { 
    super();
    this.mat_gris = new THREE.MeshPhongMaterial({color: 0x808080 });
    this.mat_gris_oscuro = new THREE.MeshPhongMaterial({color: 0x696969 });
    this.mat_gris_claro = new THREE.MeshPhongMaterial({color: 0xAEAEAE });

    this.pie(); // constructor del pie
    this.micro(); // constructor del micro
    this.animacionPie(); // metodo que aloja la animacion del pie
    this.animacionMicro();
    this.estirado = true;
    this.contador=0;
  }

  pie(){
    const boxGeom = new THREE.BoxGeometry(2,0.2,2);
    boxGeom.translate(0,0.1,0);
    const caja = new THREE.Mesh(boxGeom,this.mat_gris);

    const cilindroGeom = new THREE.CylinderGeometry(0.4, 0.4, 5); 
    cilindroGeom.translate(0,2.5,0);

    const pieAbajo = new THREE.Mesh(cilindroGeom,this.mat_gris_oscuro);
    pieAbajo.position.y=0.2;

    const pieArriba = new THREE.Mesh(cilindroGeom,this.mat_gris);
    // <- En este paso se escalará el pie en Y
    pieArriba.position.y=5.2;

    const estructura = new THREE.Object3D().add(pieAbajo).add(pieArriba).add(caja);
    this.add(estructura);

    // Refetencia para la animacion
    this.pieScale = pieArriba;
    this.pieScale.userData = this;
    this.pieScale2 = pieAbajo;
    this.pieScale2.userData = this;
  }

  micro(){
    const conoGeom = new THREE.CylinderGeometry(0.001,1,3); 
    const cono = new THREE.Mesh(conoGeom, this.mat_gris_claro);

    const esferaGeom = new THREE.SphereGeometry(1.0);
    const esfera = new THREE.Mesh(esferaGeom, this.mat_gris_claro);
    esfera.position.y = -2;

    const csg = new CSG();
    csg.union([cono,esfera]);
    const resultadoCSG = csg.toMesh();

    resultadoCSG.rotateZ(Math.PI/2+0.4);
    resultadoCSG.position.set(-0.1,10.2,0);

    // Aqui iria la rotacion en y
    this.add(resultadoCSG);

    // Referencia
    this.microfono = resultadoCSG;
    this.microfono.userData = this;
  }

  animacionPie(){
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
  
  animacionMicro(){
    var origen1 = { t: 0};
    var fin1 = {t: Math.PI/2};
    var origen2 = {t: Math.PI/2};
    var fin2 = {t: Math.PI};
    var origen3 = {t: Math.PI};
    var fin3 = {t: 3*Math.PI/2};
    var origen4 = {t: 3*Math.PI/2};
    var fin4 = {t: 2*Math.PI};
    const tiempoDeRecorrido=1000;

    this.animacionMicro1 = new TWEEN.Tween (origen1).to (fin1, tiempoDeRecorrido)
      .onUpdate(() => { this.microfono.rotation.y = origen1.t; })
      .onComplete(() => {/*this.animacion2.start()*/})
      

    this.animacionMicro2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { this.microfono.rotation.y = origen2.t; })
      .onComplete(() => {/*this.animacion1.start()*/});
      
    this.animacionMicro3 = new TWEEN.Tween (origen3).to (fin3, tiempoDeRecorrido)
      .onUpdate(() => { this.microfono.rotation.y = origen3.t; })
      .onComplete(() => {/*this.animacion1.start()*/});
      
    this.animacionMicro4 = new TWEEN.Tween (origen4).to (fin4, tiempoDeRecorrido)
      .onUpdate(() => { this.microfono.rotation.y = origen4.t; })
      .onComplete(() => {/*this.animacion1.start()*/});
  }
  
  recibeClic ( meshConcreto ) {
  
    if(meshConcreto == this.microfono){
       switch(this.contador){
         case 0:
            this.animacionMicro1.start()
            this.contador++;
         break;
         
         case 1:
            this.animacionMicro2.start()
            this.contador++;
         break;
         
         case 2:
            this.animacionMicro3.start()
            this.contador++;
         break;
         
         case 3:
            this.animacionMicro4.start()
            this.contador=0;
         break;
       }
    }
    else{
	    if(this.estirado){
	      this.estirado = false;
	      this.animacion1.start();
	    } else {
	      this.estirado = true;
	      this.animacion2.start();
	    }
    }
  }

  update () {
    TWEEN.update();
  }
}

export { Microfono };
