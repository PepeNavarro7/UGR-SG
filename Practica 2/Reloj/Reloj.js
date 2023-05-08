import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Reloj extends THREE.Object3D {
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
    
    
    
    ////////////////////////////////////////SUPERFICIE RELOJ///////////////////////////////////////////////////////
    

    
    var superficieBlanca = new THREE.CylinderGeometry (16, 16, 1, 50, 1);
    superficieBlanca.translate(0,-1,0) 
    this.superficieReloj = new THREE.Mesh(superficieBlanca, mat_blanco);
    this.add (this.superficieReloj);
    
    
    
     var superficieMadera = new THREE.CylinderGeometry (17.5, 17.5, 1, 50, 1); 
     superficieMadera.translate(0,-1.5,0) 
     this.circuloReloj = new THREE.Mesh(superficieMadera, mat_marron_madera);
    this.add (this.circuloReloj);
    

////////////////////////////////////////BASE MADERA RELOJ///////////////////////////////////////////////////////    
    
     var cajaMarron = new THREE.BoxGeometry (50,20,50); 
     cajaMarron.translate(0,-12,0) 
     var cajaReloj = new THREE.Mesh(cajaMarron, mat_marron);


    var techoMarron = new THREE.BoxGeometry (25,20,50); 
    techoMarron.translate(25,-12,0) 
    var techoReloj = new THREE.Mesh(techoMarron, mat_marron);
    
    var cajaRoja1 = new THREE.BoxGeometry (50,20,20); 
    cajaRoja1.translate(10,-12,35) 
    cajaRoja1.rotateY(Math.PI/4)
    var quitarTecho = new THREE.Mesh(cajaRoja1, mat_rojo);
    

    var cajaRoja2 = new THREE.BoxGeometry (50,20,20); 
    cajaRoja2.translate(10,-12,-35) 
    cajaRoja2.rotateY(-Math.PI/4)
    
    var quitarTecho2 = new THREE.Mesh(cajaRoja2, mat_rojo);
    
    

    var csg_quitar = new CSG();
    csg_quitar.union([quitarTecho,quitarTecho2]);
    
    var csg_base = new CSG();
    csg_base.union([techoReloj,cajaReloj]);
    
    var csg_final = new CSG();
    csg_final.subtract ([csg_base.toMesh(),csg_quitar.toMesh()]); 
    
    this.techo = csg_final.toMesh();
    this.add(this.techo);
    
    
    
    
    var tejasCaja1 = new THREE.BoxGeometry (47,25,2); 
    tejasCaja1.translate(10,-12,26); 
    tejasCaja1.rotateY(Math.PI/4);
    this.tejasTecho1 = new THREE.Mesh(tejasCaja1, mat_rojo);
    this.add (this.tejasTecho1);
    

    var tejasCaja2 = new THREE.BoxGeometry (47,25,2); 
    tejasCaja2.translate(10,-12,-26); 
    tejasCaja2.rotateY(-Math.PI/4);
    this.tejasTecho2 = new THREE.Mesh(tejasCaja2, mat_rojo);
    this.add (this.tejasTecho2);
    
    
    
    
    
////////////////////////////////////////////RELOJ//////////////////////////////////////////////////////////
        
    
    ///////////////////////////////MARCAS/////////////////////////////// 
    var box = new THREE.BoxGeometry(2,1,1); 
    box.translate(13, 0, 0); 
    
    var box_hora = new THREE.BoxGeometry(2,1,1); 
    box_hora.translate(7, 0, 0); 
    
    ///////////////////////////////AGUJAS///////////////////////////////
    var geoesfera_roja = new THREE.BoxGeometry(3,0.5,0.5); 
    geoesfera_roja.translate(10, 0, 0); 

    var geoesfera_roja_hora = new THREE.BoxGeometry(7,0.5,0.5); 
    geoesfera_roja_hora.translate(3, 0, 0); 

    this.aguja = new THREE.Mesh(geoesfera_roja, mat_negro);
    this.add(this.aguja);
    
    this.aguja_hora = new THREE.Mesh(geoesfera_roja_hora, mat_negro); 
    this.add(this.aguja_hora);
 
 
    ///////////////////////////////METER MARCAS///////////////////////////////
    this.tam_marca = (Math.PI * 2 / 12); //rotacion para una marca

    // Creamos las "horas" y las posicionamos
    for(var i = 0; i < 12; i++){
	var marca = new THREE.Mesh(box, mat_negro);
	marca.rotation.y = (i * this.tam_marca); 
	this.add(marca);
    }
    
    /*for(var i = 0; i < 12; i++){
	var marca_hora = new THREE.Mesh(box_hora, mat_verde);
	marca_hora.rotation.y = (i * this.tam_marca); 
	this.add(marca_hora);
    }*/

    // Para Velocidad independiente del objeto
    this.reloj = new THREE.Clock();
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////ESTO ES PARA LA ANIMACION	VER MAS EN EL UPDATE//////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // this.segundosParaHora = 0;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    
    
  /*  var segundosTranscurridos = this.reloj.getDelta(); //seg desde ultima llamada - para velocidad comun independiente del procesamiento de frames
    
    this.aguja.rotation.y -=  (this.tam_marca * segundosTranscurridos); 
    this.segundosParaHora+=segundosTranscurridos;
    
    //MOVER HORA
    if(this.segundosParaHora>12){
       this.aguja_hora.rotation.y -=this.tam_marca ;
       this.segundosParaHora=0;
     }*/
    
    
  }
}


export { Reloj };
