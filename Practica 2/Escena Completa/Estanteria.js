import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'

import { MyOBJ } from './MyOBJ.js'
import { Libro } from './Libro.js'
import { LibroI } from './LibroI.js'
import { LibroII } from './LibroII.js'
import { LibroV } from './LibroV.js'
import { LibroX } from './LibroX.js' 
import { MyRevolucion } from './MyRevolucion.js'
 
class Estanteria extends THREE.Object3D {
  constructor(gui,titleGui, points) {
    super();
    
    this.createGUI(gui,titleGui);
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9 });
    var mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    var mat_marron_oscuro = new THREE.MeshPhongMaterial({color: 0x5C452F });
    
    

////////////////////////////////////////BASE MADERA RELOJ///////////////////////////////////////////////////////    
    
     var cajaMarron = new THREE.BoxGeometry (100,100,40); 
     var cajaReloj = new THREE.Mesh(cajaMarron, mat_marron_oscuro);

    
    var cajaRoja1 = new THREE.BoxGeometry (90,30,35); 
    cajaRoja1.translate(0,25,3) ;
    var balda1 = new THREE.Mesh(cajaRoja1, mat_rojo);

    var cajaRoja2 = new THREE.BoxGeometry (90,40,35); 
    cajaRoja2.translate(0,-17,3) ;
    var balda2 = new THREE.Mesh(cajaRoja2, mat_rojo);

    
    var csg_final = new CSG();
    csg_final.subtract ([cajaReloj,balda1]); 
    csg_final.subtract ([balda2]); 
    
    this.techo = csg_final.toMesh();
   // this.techo.userData = this;
    this.add(this.techo);
    

    
    this.pato = new MyOBJ();
    this.add(this.pato);
    
    this.pato.scale.set(0.6,0.6,0.6);
    this.pato.position.y = -37.5;
    this.pato.rotation.z = -Math.PI/2;
    this.pato.position.x = 20.0;
    
    this.peon = new MyRevolucion();
    this.add(this.peon);
    
    this.peon.scale.set(10.0,10.0,10.0);
    this.peon.position.y = -37.5;
    this.peon.position.x = -50.0;
    
    for(var i = 0; i < 17 ; i++) {

       if(i==12){
          this.libroV = new LibroV();
          this.add(this.libroV);
          this.libroV.position.y = 20;
          this.libroV.position.x = -42;
          this.libroV.rotation.y = -Math.PI/2;
          this.libroV.position.x += 5.1*i;
       }    
       
       else if(i==10){
          this.libroII = new LibroII();
          this.add(this.libroII);
          this.libroII.position.y = 20;
          this.libroII.position.x = -42;
          this.libroII.rotation.y = -Math.PI/2;
          this.libroII.position.x += 5.1*i;
       }    
       
       else if(i==3){
          this.libroX = new LibroX();          
          this.add(this.libroX);
          this.libroX.position.y = 20;
          this.libroX.position.x = -42;
          this.libroX.rotation.y = -Math.PI/2;
          this.libroX.position.x += 5.1*i;
          //this.libroX.position.z = 9;
       }    
       else if(i==7){
          this.libroI = new LibroI();
          this.add(this.libroI);
          this.libroI.position.y = 20;
          this.libroI.position.x = -42;
          this.libroI.rotation.y = -Math.PI/2;
          this.libroI.position.x += 5.1*i;
       }
       else{
          this.libro = new Libro();
          this.add(this.libro);
          this.libro.position.y = 20;
          this.libro.position.x = -42;
          this.libro.rotation.y = -Math.PI/2;
          this.libro.position.x += 5.1*i;
       }
    
    }
    
    
    
    
}

  compruebaPuzle(){
     if(this.libroI.verAnimacion() && this.libroX.verAnimacion() && this.libroV.verAnimacion() && !this.libroII.verAnimacion() ){
        return true;
     } else{
        return false;
     }
  }

  createGUI(gui, titleGui){    

  }
  
  update () {

    TWEEN.update();    
  }
}


export { Estanteria };
