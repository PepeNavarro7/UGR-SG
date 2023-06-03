
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'

// Clases de mi proyecto
import { Habitacion } from './Habitacion.js'
import { TresBombillas } from './TresBombillas.js'
import { Estanteria } from './Estanteria.js'
import { Reloj } from './Reloj.js'
import { RelojPendulo } from './RelojPendulo.js'
import { Microfono } from './Microfono.js'
import { Flexo } from './Flexo.js'
import { Maceta } from './Maceta.js'
import { MyRevolucion } from './MyRevolucion.js'


class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Construimos los distinos elementos que tendremos en la escena
    this.gui = this.createGUI ();
    this.initStats();
    this.createLights ();
    
    this.createCamera ();
    this.controlador = new PointerLockControls ( this.getCamera(), this.renderer.domElement );

    this.creacionModelos();
    this.modelos = [this.habitacion,this.tresBombillas,this.estanteria,
      this.reloj,this.relojPendulo,this.microfono,this.flexo,this.maceta];
    for (let i = 0; i < this.modelos.length; i++) {
      this.add(this.modelos[i]);
    }   
    
    //Añadir booleanos qye cambian con onkeyup y onkeydown y luego lo movemos en el 
    this.moverAvanzar=false;
    this.moverAtras=false;
    this.moverIzd=false;
    this.moverDrch=false;
    this.ratonLock=false;
   
    //PICKING
    this.modelosInteractuables = [this.reloj,this.microfono,this.flexo,this.tresBombillas,this.estanteria];
    this.modelosInteractuablesConHabitacion = [this.reloj,this.microfono,this.flexo,this.tresBombillas, this.estanteria,this.habitacion];
    this.raton = new THREE.Vector2();
    this.raycasterRaton = new THREE.Raycaster();    
  }

  creacionModelos(){
    // Por último creamos los modelos
    this.habitacion = new Habitacion();
    
    var hitBoxHabitacion = new THREE.Box3();
    hitBoxHabitacion.setFromObject(this.habitacion);
    //var hitBoxHabitacionVisible = new THREE.Box3Helper( hitBoxHabitacion, 0xFFFF00);
    
    //AÑADIR TresBombillas
    this.tresBombillas = new TresBombillas();
    this.tresBombillas.scale.set(0.15,0.15,0.15);
    //tresBombillas.rotateY(Math.PI/2);
    this.tresBombillas.position.y = 20;
    this.tresBombillas.position.z = -20;//47.5;
    this.tresBombillas.position.x = -45;
    
    var hitBoxTresBombillas = new THREE.Box3();
    hitBoxTresBombillas.setFromObject(this.tresBombillas);
    //var hitBoxTresBombillasVisible = new THREE.Box3Helper( hitBoxTresBombillas, 0xFFFF00);
    
    //AÑADIR Estanteria
    this.estanteria = new Estanteria();
    this.estanteria.scale.set(0.3,0.3,0.3);
    this.estanteria.position.z = -43.5;
    this.estanteria.position.y = 15;
    
    var hitBoxEstanteria = new THREE.Box3();
    hitBoxEstanteria.setFromObject(this.estanteria);
    //var hitBoxEstanteriaVisible = new THREE.Box3Helper( hitBoxEstanteria, 0xFFFF00);
    
    //AÑADIR Reloj
    this.reloj = new Reloj();
    this.reloj.scale.set(0.1,0.1,0.1);
    this.reloj.rotateZ(Math.PI/2);
    this.reloj.position.y = 20;
    this.reloj.position.x = 47;
    this.reloj.position.z = -23;
    
    var hitBoxReloj = new THREE.Box3();
    hitBoxReloj.setFromObject(this.reloj);
    //var hitBoxRelojVisible = new THREE.Box3Helper( hitBoxReloj, 0xFFFF00);
    
    //AÑADIR RelojPendulo
    const relojPendulo = new RelojPendulo();
    relojPendulo.scale.set(2,2,2);
    relojPendulo.rotateY(Math.PI/2);
    relojPendulo.position.x = -45;
    relojPendulo.position.z = 43;
    this.relojPendulo = relojPendulo;
    
    var hitBoxRelojPendulo = new THREE.Box3();
    hitBoxRelojPendulo.setFromObject(relojPendulo);
    //var hitBoxRelojPenduloVisible = new THREE.Box3Helper( hitBoxRelojPendulo, 0xFFFF00);
    
    //AÑADIR Microfono
    const microfono = new Microfono();
    microfono.scale.set(1.7,1.7,1.7);
    //microfono.rotateY(3*Math.PI/4);
    //microfono.position.y = 20;
    microfono.position.x = 30;
    microfono.position.z = 15;
    this.microfono = microfono;
    
    var hitBoxMicrofono = new THREE.Box3();
    hitBoxMicrofono.setFromObject(microfono);
    //var hitBoxMicrofonoVisible = new THREE.Box3Helper( hitBoxMicrofono, 0xFFFF00);
    
    //AÑADIR Flexo
    const flexo = new Flexo();
    //flexo.scale.set(1.7,1.7,1.7);
    flexo.rotateY(Math.PI);
    flexo.position.y = 20;
    flexo.position.z = 44;
    flexo.position.x = 10;
    this.flexo=flexo;
    
    var hitBoxFlexo = new THREE.Box3();
    hitBoxFlexo.setFromObject(flexo);
    //var hitBoxFlexoVisible = new THREE.Box3Helper( hitBoxFlexo, 0xFFFF00);
    
    //AÑADIR Flexo
    const maceta = new Maceta();
    //maceta.position.y = 20;
    maceta.position.z = -43.5;
    maceta.position.x = -21;
    this.maceta=maceta;
    
    var hitBoxMaceta = new THREE.Box3();
    hitBoxMaceta.setFromObject(maceta);
    //var hitBoxMacetaVisible = new THREE.Box3Helper( hitBoxMaceta, 0xFFFF00);

    //HITBOXES VISIBLES
    /*
    this.add(hitBoxHabitacionVisible);
    hitBoxHabitacionVisible.visible=true;
    
    this.add(hitBoxTresBombillasVisible);
    hitBoxTresBombillasVisible.visible=true;
    
    this.add(hitBoxEstanteriaVisible);
    hitBoxEstanteriaVisible.visible=true;
    
    this.add(hitBoxRelojVisible);
    hitBoxRelojVisible.visible=true;
    
    this.add(hitBoxRelojPenduloVisible);
    hitBoxRelojPenduloVisible.visible=true;
    
    this.add(hitBoxMicrofonoVisible);
    hitBoxMicrofonoVisible.visible=true;
    
    this.add(hitBoxFlexoVisible);
    hitBoxFlexoVisible.visible=true;
    
    this.add(hitBoxMacetaVisible);
    hitBoxMacetaVisible.visible=true;*/
  }

  initStats() {
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (10, 20, 10);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,20,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    
   /* // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;//*/
  }
  
   onDocumentMouseDown (event){ 
     this.raton.x = (event.clientX/window.innerWidth) * 2-1;
     this.raton.y = 1-2 * (event.clientY/window.innerHeight);
     this.raycasterRaton.setFromCamera(this.raton,this.camera);
     
     if(this.reloj.compruebaPuzle() && this.estanteria.compruebaPuzle() && this.tresBombillas.compruebaPuzle()){
	      var pickedObjets = this.raycasterRaton.intersectObjects(this.modelosInteractuablesConHabitacion, true);
     } else{
        var pickedObjets = this.raycasterRaton.intersectObjects(this.modelosInteractuables, true);
     }
     
     if(pickedObjets.length > 0) {        
      var objetoElegido = pickedObjets[0].object;
      
      if(objetoElegido.userData){
        objetoElegido.userData.recibeClic(objetoElegido);
      }
     }
  };

 onKeyDown = function (event){
	switch(event.code){
	   case 'KeyW':
	      this.moverAvanzar=true;	      
	   break;
	   
	   case 'KeyS':
	      this.moverAtras=true;
	   break;
	   
	   case 'KeyA':
	      this.moverIzd=true;
	   break;
	   
	   case 'KeyD':
	      this.moverDrch=true;
	   break;
	   
	}
  }
  
  onKeyUp = function (event){
	switch(event.code){
	   case 'KeyW':
	      this.moverAvanzar=false;	      
	   break;
	   
	   case 'KeyS':
	      this.moverAtras=false;
	   break;
	   
	   case 'KeyA':
	      this.moverIzd=false;
	   break;
	   
	   case 'KeyD':
	      this.moverDrch=false;
	   break;
	  
	}
  }
  
  onKeyPress = function (event){
	switch(event.code){
	   case 'KeyE':
	      if(!this.ratonLock){
	          this.controlador.lock();
	          this.ratonLock=true;
	      } 
	      else if(this.ratonLock){
	          this.controlador.unlock();
	          this.ratonLock=false;
	      }
	   break;
	}
  }
  
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario, aunque no tiene opciones propias, solo se sumaran las de los objetos
    var gui = new GUI();
    this.guiControls ={
      animacion : false,
    }

    /*var folder = gui.addFolder("Luz y Ejes")
    folder.add (this.guiControls, 'animacion')
      .name ('Giro continuo: ')
      .onChange ( (value) => this.setAnimacion (value) );*/
    return gui;
  }
  /*setAnimacion (valor) {
    for (let i = 0; i < this.modelos.length; i++) {
      this.modelos[i].setAnimacion(valor);
    }
  }*/
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    //var ambientLight = new THREE.AmbientLight(0x00FF00, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }

  createAxis(){
    const axis = new THREE.AxesHelper(10);
    this.add(axis);
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }
  
  colisiones (){
     const raycaster = new THREE.Raycaster();
     var posicion = this.camera.position; 
     var direccion = new THREE.Vector3( );
     this.controlador.getDirection(direccion);
     
     var eje = new THREE.Vector3(0,1,0);
     
     if(this.moverAvanzar && this.moverIzd){
	direccion.applyAxisAngle(eje,Math.PI/4);
     }

     else if(this.moverAvanzar && this.moverDrch){
	direccion.applyAxisAngle(eje,-Math.PI/4);
     }

     else if(this.moverAtras && this.moverIzd){
	direccion.applyAxisAngle(eje,3*Math.PI/4);
     }

     else if(this.moverAtras && this.moverDrch){
	direccion.applyAxisAngle(eje,-3*Math.PI/4);
     }
     
     else if(this.moverAtras){
	direccion.applyAxisAngle(eje,Math.PI);
     }

     else if(this.moverIzd){
	direccion.applyAxisAngle(eje,Math.PI/2);
     }

     else if(this.moverDrch){
	direccion.applyAxisAngle(eje,-Math.PI/2);
     }
     
     
     
     raycaster.set(posicion,direccion.normalize());
     
     var impactados = raycaster.intersectObjects(this.modelos, true);

     if(impactados.length > 0){
	var distanciaMasCercano = impactados[0].distance;
	
	for(let i=1;i<impactados.length;i++){
	    if(distanciaMasCercano>impactados[i].distance){
	       distanciaMasCercano=impactados[i].distance;
	    }
	    
	}
	
	if(distanciaMasCercano<5){ 
	
		if(this.moverAvanzar){
	     	   this.controlador.moveForward(-1);
		}
	     
		if(this.moverAtras){
			this.controlador.moveForward(1);
		}
	     
		if(this.moverIzd){
			this.controlador.moveRight(1);
		}
	     
		if(this.moverDrch){
			this.controlador.moveRight(-1);
		}
		
		if(this.moverAvanzar && this.moverIzd){
			this.controlador.moveRight(1);
			this.controlador.moveForward(-1);
		}
		
		if(this.moverAvanzar && this.moverDrch){
			this.controlador.moveRight(-1);
			this.controlador.moveForward(-1);
		}
		
		if(this.moverAtras && this.moverIzd){
			this.controlador.moveRight(1);
			this.controlador.moveForward(1);
		}
		
		if(this.moverAtras && this.moverDrch){
			this.controlador.moveRight(-1);
			this.controlador.moveForward(1);
		}
	}
	
     } 
  }

  update () {
    if (this.stats) this.stats.update();
    
      //  this.colisiones();
    
        // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    //this.cameraControl.update();
    // this.controlador.update();
     
     if(this.moverAvanzar){
     	this.controlador.moveForward(1);
     }
     
     if(this.moverAtras){
     	this.controlador.moveForward(-1);
     }
     
     if(this.moverIzd){
     	this.controlador.moveRight(-1);
     }
     
     if(this.moverDrch){
     	this.controlador.moveRight(1);
     }
     
     this.colisiones();
     
    
    // Se actualiza el resto del modelo
    //Update de los objetos
    for (let i = 0; i < this.modelos.length; i++) {
      this.modelos[i].update();
    }
    



    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
  
  
}

/// La función   main
$(function () {
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  window.addEventListener ("keyup", (event) => scene.onKeyUp(event));
  
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
  
  window.addEventListener ("keypress", (event) => scene.onKeyPress(event));
  
   window.addEventListener ("click", (event) => scene.onDocumentMouseDown(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
