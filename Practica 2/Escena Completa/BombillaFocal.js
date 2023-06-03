import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class BombillaFocal extends THREE.Object3D {
 constructor(gui,titleGui) {
    super();
    
     ///////////////////////////////MATERIALES/////////////////////////////// 
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000}); 
    var mat_rojo_target = new THREE.MeshPhongMaterial({color: 0xFF0000, opacity: 0.1, transparent: true}); 
    var mat_rosa = new THREE.MeshPhongMaterial({color: 0xFB4570}); 
    var mat_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var mat_blanco = new THREE.MeshPhongMaterial({color: 0xE3DAC9, opacity: 0.9, transparent: true});
    var mat_negro = new THREE.MeshPhongMaterial({color: 0x000000 });
    var mat_gris_oscuro = new THREE.MeshPhongMaterial({color: 0x3B3B3B });
    var mat_gris = new THREE.MeshPhongMaterial({color: 0x979797 });
    var mat_gris_semiclaro = new THREE.MeshPhongMaterial({color: 0xC5C5C5 });

    var mat_marron_madera = new THREE.MeshPhongMaterial({color: 0xC19A6B });
    var mat_marron = new THREE.MeshPhongMaterial({color: 0x7C3600 });
    
    
    
    
    //geometrías a usar:
    var cilindroExterior = new THREE.CylinderGeometry (5, 5, 10, 50, 1);
    var cilindroInterior = new THREE.CylinderGeometry (4.7, 4.7, 10, 50, 1); 
    var cilindroAchatado = new THREE.CylinderGeometry (6, 6, 3, 50, 1); 
    var cilindroAchatado2 = new THREE.CylinderGeometry (4, 4, 3, 50, 1); 
    var cilindroBoton = new THREE.CylinderGeometry (3, 3, 4, 50, 1); 
    var cajaInterruptor = new THREE.BoxGeometry (30,10,30); 
    var esfera = new THREE.SphereGeometry (10.0,20,20);
    var esferaTarget = new THREE.SphereGeometry (5.0,20,20);
    
    cilindroInterior.translate(0,0.3,0);
    cajaInterruptor.translate(0,-4,0);
    
    var cilindroInteriorMesh = new THREE.Mesh(cilindroInterior, mat_gris_oscuro);
    var cilindroExteriorMesh = new THREE.Mesh(cilindroExterior, mat_gris_oscuro);
    var cajaInterruptorMesh = new THREE.Mesh(cajaInterruptor, mat_gris_oscuro);
    
    //Creamos objeto CSG y operamos con él
    var csg = new CSG();			//CSG TEMA 3-L4-DIAP 43
    
    csg.union ([cilindroExteriorMesh, cajaInterruptorMesh]);
    csg.subtract([cilindroInteriorMesh]); 

    this.conector = csg.toMesh();
    this.add(this.conector);
    
    cilindroInterior.translate(0,0.2,0);
    cilindroAchatado.translate(0,7,0);
    esfera.translate(14,23,0);
    esferaTarget.translate(30,35,0);
    
    this.cilindroInteriorMesh = new THREE.Mesh(cilindroInterior, mat_gris);
    this.cilindroAchatadoMesh = new THREE.Mesh(cilindroAchatado, mat_gris_semiclaro);
    this.esferaMesh = new THREE.Mesh(esfera, mat_blanco);
    this.esferaTargetMesh = new THREE.Mesh(esferaTarget, mat_rojo_target);
    
    this.add(this.cilindroInteriorMesh);
    this.add(this.cilindroAchatadoMesh);
    this.add(this.esferaMesh);

    
    cilindroAchatado2.translate(4,15,0);
    cilindroAchatado2.rotateZ(-Math.PI/2)
    this.cilindroInterruptorMesh = new THREE.Mesh(cilindroAchatado2, mat_gris_semiclaro);
    this.add(this.cilindroInterruptorMesh);
    
    cilindroBoton.translate(4,17,0);
    cilindroBoton.rotateZ(-Math.PI/2)
    this.cilindroInterruptorBotonMesh = new THREE.Mesh(cilindroBoton, mat_rojo);
    this.cilindroInterruptorBotonMesh.userData = this;
    this.add(this.cilindroInterruptorBotonMesh);
    
    const esferaGeom = new THREE.SphereGeometry(2.0);
    const esfera2 = new THREE.Mesh(esferaGeom, new THREE.MeshPhongMaterial({color: 'silver'}));
    const esferaGeom2 = new THREE.SphereGeometry(1.5);
    const esferaQuitar = new THREE.Mesh(esferaGeom2, new THREE.MeshPhongMaterial({color: 'silver'}));

    const cilindroGeom = new THREE.CylinderGeometry(1, 1, 1.5); 
    cilindroGeom.rotateZ(Math.PI/2);
    const cilindro = new THREE.Mesh(cilindroGeom,new THREE.MeshPhongMaterial({color: 'silver'}));
    cilindro.position.x=-2.5;
    

    const vacioGeom = new THREE.BoxGeometry(4,4,4);
    const vacio = new THREE.Mesh(vacioGeom,new THREE.MeshPhongMaterial({color: 'silver'}))
    vacio.position.x=2;

    const csg2 = new CSG().union([esfera2,cilindro]);
    csg2.subtract([vacio]);
    csg2.subtract([esferaQuitar]);
    const resultado = csg2.toMesh();
    resultado.position.x=3.25;

    const cabeza = new THREE.Object3D().add(resultado);
    cabeza.rotation.z=Math.PI/4;
    cabeza.scale.set(9,9,9);
    cabeza.position.x=-2;
    cabeza.position.y=7;
    this.add(cabeza);
    
        
    this.spotLight = new THREE.SpotLight (0x00FFFF,0,60);
    this.spotLight.position.set (14,23,-5);
    this.spotLight.target.position.set(30,35,0);
    //this.spotLight.target= this.esferaTargetMesh;
    //    this.add(this.esferaTargetMesh);
        this.spotLight.target.updateMatrixWorld();
    this.add(this.spotLight);
	
	this.llaveLuz=false;

  }
  
  recibeClic ( meshConcreto ) {
    this.llaveLuz=!this.llaveLuz;
    
    if(!this.llaveLuz)
      this.spotLight.intensity=0;
    else
      this.spotLight.intensity=0.8;
  }
  
  compruebaLuz(){
     return this.llaveLuz;
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


export { BombillaFocal };
