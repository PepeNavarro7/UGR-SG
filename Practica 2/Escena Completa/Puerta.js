import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Puerta extends THREE.Object3D {

     
  constructor() { 
    super();
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9 });
    this.mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });
    var mat_dorado = new THREE.MeshPhongMaterial({color: 0xFFD700 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    var mat_marron_oscuro = new THREE.MeshPhongMaterial({color: 0x5C452F });

    
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.reloj = new THREE.Clock();

   // this.crearSuelo();
   // this.crearParedes();
    this.crearPuerta();
  }

  
  crearPuerta(){
    const geomPuerta = new THREE.BoxGeometry (2,30,10);
    geomPuerta.translate(0,15,5);
    const puerta = new THREE.Mesh (geomPuerta, this.materialNormal);
    puerta.position.y = 0;
    puerta.position.x = -50;
    puerta.position.z = 5;
    
     const geomPomo1 = new THREE.BoxGeometry (2,2,5);
    geomPomo1.translate(0,15,5);
    const pomo1 = new THREE.Mesh (geomPomo1, this.mat_negro);
    pomo1.position.y = 0;
    pomo1.position.x = -48;
    pomo1.position.z = 5;
    
    const puetaCSG = new CSG()
    puetaCSG.union([pomo1,puerta]);

    puerta.userData = this;
    this.add(puerta);
     this.add(pomo1);


//ANIMACION
    var origen = { t: 0};
    var fin = {t: Math.PI/2};
    var origen2 = {t: Math.PI/2};
    var fin2 = {t: 0};
    const tiempoDeRecorrido=2000;

    this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { puerta.rotation.y = origen.t; })
      .onComplete(() => {/*this.animacion2.start()*/})
      

    this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { puerta.rotation.y = origen2.t; })
      .onComplete(() => {/*this.animacion1.start()*/});

    // referencia
    this.puerta = puerta;
  }
  
  abrirPuerta(){
     this.animacion1.start();
  }
  
  recibeClic ( meshConcreto ) {
    console.log("AAAA");
    this.animacion=!this.animacion;
    
    if(this.animacion)
       this.animacion1.start();
       
    if(!this.animacion)
       this.animacion2.start();
  }
  
  update () {
    
        TWEEN.update();

  }
}

export { Puerta };
