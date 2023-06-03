import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
 import { Bombilla } from './Bombilla.js'
 import { BombillaFocal } from './BombillaFocal.js'
 import { BombillaDireccional } from './BombillaDireccional.js'
 
class TresBombillas extends THREE.Object3D {
 constructor(gui,titleGui) {
    super();
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9 });
    var mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });
    var mat_gris_oscuro = new THREE.MeshPhongMaterial({color: 0x3B3B3B });
    var mat_gris = new THREE.MeshPhongMaterial({color: 0x979797 });
    var mat_gris_semiclaro = new THREE.MeshPhongMaterial({color: 0xC5C5C5 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    
    
    
    
    var madera = new THREE.BoxGeometry (40,10,150); 
    madera.translate(0,-14,0);
    this.maderaMesh = new THREE.Mesh(madera, mat_marron_madera);
    this.add(this.maderaMesh);
    
    this.bombilla1 = new BombillaFocal();
    this.add(this.bombilla1);
    
    this.bombilla2 = new BombillaDireccional();
    this.add(this.bombilla2);
    this.bombilla2.position.z = -50;
    
    this.bombilla3 = new Bombilla();
    this.add(this.bombilla3);
    this.bombilla3.position.z = 50;

  }
  
  compruebaPuzle(){
     var valorSalida=0;
     
     if(this.bombilla1.compruebaLuz()){
        valorSalida+=1;
     }
     
     if(this.bombilla2.compruebaLuz()){
        valorSalida+=1;
     }
     
     if(this.bombilla3.compruebaLuz()){
        valorSalida+=1;
     }
     
     if(valorSalida==2){
       return true;
     } else{
       return false;
     }
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    
    //this.conector.rotation.y += 0.02;
    
  }
}


export { TresBombillas };
