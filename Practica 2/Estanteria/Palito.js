import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'


class Palito extends THREE.Object3D {
  constructor(gui,titleGui, points) {
    super();
    
    this.createGUI(gui,titleGui);
    
    ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9 });
    var mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });
    var mat_dorado = new THREE.MeshPhongMaterial({color: 0xFFD700 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    var mat_marron_oscuro = new THREE.MeshPhongMaterial({color: 0x5C452F });
    
    

////////////////////////////////////////BASE MADERA RELOJ///////////////////////////////////////////////////////    
    

     
     var palito = new THREE.BoxGeometry (0.5,5,1);
     this.palitoMesh = new THREE.Mesh(palito, mat_dorado);
     this.add(this.palitoMesh);
     

     

    
   
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


export { Palito };
