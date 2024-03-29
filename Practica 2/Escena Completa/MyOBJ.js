import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
 
class MyOBJ extends THREE.Object3D {
  constructor(/*gui,titleGui, points*/) {
    super();
    
    //this.createGUI(gui,titleGui);
    //Como en los apuntes 		TEMA 3 DIAP 56
    // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
    var materialLoader = new MTLLOADER.MTLLoader();
    var objectLoader = new OBJLOADER.OBJLoader();

    // Cada funcion load('archivo', function(materials/object))
    materialLoader.load('../models/Bird/12248_Bird_v1_L2.mtl', //Cambio la ruta para poner la ruta relativa
    
    (materials) => {
	objectLoader.setMaterials (materials);
	objectLoader.load('../models/Bird/12248_Bird_v1_L2.obj',
	
	(object) => {
	    this.modelo = object;
     	    this.add(this.modelo);
	},null,null);
	});

    //Objeto padre es this - se esta creando hijo, por tanto le afectaran las transformaciones al padre
    this.position.y = -15;
    this.rotation.x = -Math.PI/2;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
     	animacion : false,
     }

     var folder = gui.addFolder (titleGui);
     
     folder.add (this.guiControls, 'animacion').name ('Animacion : ');
     //No usamos onchange porque no vamos a cambiar nada mas en el codigo ni listen porque
     // listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    
    if(this.guiControls.animacion)
	this.rotation.z += 0.01;
    
  }
}


export { MyOBJ };
