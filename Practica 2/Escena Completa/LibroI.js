import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'

//import { Palito } from './Palito.js'

class LibroI extends THREE.Object3D {
  constructor() {
    super();
    
   
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9 });
    var mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });
    this.mat_dorado = new THREE.MeshPhongMaterial({color: 0xFFD700 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    var mat_marron_oscuro = new THREE.MeshPhongMaterial({color: 0x5C452F });
    
    

////////////////////////////////////////BASE MADERA RELOJ///////////////////////////////////////////////////////    

     this.libroI = new THREE.Object3D();
    
     var cajaTapaLibro = new THREE.BoxGeometry (15,20,5);  
     var tapaLibro = new THREE.Mesh(cajaTapaLibro, mat_rojo);
     //this.add(this.tapaLibro);
     
     var quitarLibro = new THREE.BoxGeometry (15,25,4);
     quitarLibro.translate(-1,0,0);
     var quitarLibroMesh = new THREE.Mesh(quitarLibro, mat_marron_madera);
     //this.add(this.quitarLibroMesh);
     
     var csg_final = new CSG();
    csg_final.subtract ([tapaLibro,quitarLibroMesh]); 
    
    this.tapa = csg_final.toMesh();
    this.tapa.userData = this;
    this.libroI.add(this.tapa);
        
    
     var hojas = new THREE.BoxGeometry (13.5,19,4);
     hojas.translate(-0.3,0,0);
     this.hojasMesh = new THREE.Mesh(hojas, mat_marron_madera);
     this.libroI.add(this.hojasMesh);
     
     this.palito1 = this.crearPalito();
     this.palito1.position.x=7.7;
     this.palito1.userData = this;
     this.libroI.add(this.palito1);
     

     
     this.add(this.libroI);
     

     var origen = { t: 0};
      var fin = {t: 9};
      var origen2 = {t: 9};
      var fin2 = {t: 0};
      const tiempoDeRecorrido=1000;

      this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { this.libroI.position.x = origen.t; })
      .onComplete(() => {/*this.animacion2.start()*/})
      

      this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
      .onUpdate(() => { this.libroI.position.x = origen2.t; })
      .onComplete(() => {/*this.animacion1.start()*/});
    
     this.animacion=false;
    
   
  }

  recibeClic ( meshConcreto ) {
    this.animacion=!this.animacion;
    
    if(this.animacion)
       this.animacion1.start();
       
    if(!this.animacion)
       this.animacion2.start();
  }
  
  verAnimacion(){
     return this.animacion;
  }
  
  crearPalito(){
    
     var palito = new THREE.BoxGeometry (0.5,5,1);
     var palitoMesh = new THREE.Mesh(palito, this.mat_dorado);
     return palitoMesh;
  
  }


  createGUI(gui, titleGui){    

  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    

    
    
  }
}


export { LibroI };
