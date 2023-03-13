
// Clases de la biblioteca

import * as THREE from '../../libs/three.module.js'
import { GUI } from '../../libs/dat.gui.module.js'
import { TrackballControls } from '../../libs/TrackballControls.js'
import { Stats } from '../../libs/stats.module.js'

// Clases de mi proyecto

import { Caja } from './Caja.js'
import { Cono } from './Cono.js'
import { Cilindro } from './Cilindro.js'
import { Esfera } from './Esfera.js'

 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
        
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    
    // Tendremos una cámara
    this.createCamera ();
    
    this.createAxis();    
    
    // Por último creamos los modelos
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    let caja = new Caja(this.gui, "Dimensiones de la Caja");
    caja.position.x = 8.0;

    let cono = new Cono(this.gui, "Dimensiones del Cono");
    cono.position.x = 8.0;
    cono.position.y = 8.0;

    let cilindro = new Cilindro(this.gui, "Dimensiones del Cilindro");
    cilindro.position.x = -4.0;
    cilindro.position.y = 8.0;

    let esfera = new Esfera(this.gui, "Dimensión de la Esfera");
    esfera.position.x = -16.0;
    esfera.position.y = 8.0;
    esfera.position.z = 4.0;

    this.objetos = [caja, cono, cilindro, esfera];
    for (let i = 0; i < this.objetos.length; i++) {
      this.add(this.objetos[i]);
    }
  }
  
  createAxis(){
    // Ejes centrales, aunque luego cada objeto tendrá los suyos propios
    let axis = new THREE.AxesHelper (5);
    axis.position.x = -4.0;

    let axis_caja = new THREE.AxesHelper (5);
    axis_caja.position.x = 8.0;

    let axis_cono = new THREE.AxesHelper (5);
    axis_cono.position.x = 8.0;
    axis_cono.position.y = 8.0

    let axis_cilindro = new THREE.AxesHelper (5);
    axis_cilindro.position.x = -4.0;
    axis_cilindro.position.y = 8.0

    let axis_esfera = new THREE.AxesHelper (5);
    axis_esfera.position.x = -16.0;
    axis_esfera.position.y = 8.0;
    axis_esfera.position.z = 4.0;

    let arr_axis = [axis, axis_caja, axis_cono, axis_cilindro, axis_esfera];
    for (let i = 0; i < arr_axis.length; i++) {
      this.add(arr_axis[i]);
    }
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (20, 10, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario, aunque no tiene opciones propias, solo se sumaran las de los objetos
    var gui = new GUI();
    this.guiControls ={
      plano :false
    }

    var folder = gui.addFolder("Luz y Ejes")
    folder.add (this.guiControls, 'plano')
      .name ('Sombreado plano : ')
      .onChange ( (value) => this.setSombreadoPlano (value) );
    
    return gui;
  }

  /*setSombreadoPlano (valor) {
    for (let i = 0; i < this.objetos.length; i++) {
      this.objetos[i].setSombreadoPlano(valor)
    }
  }*/
  
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

  update () {
    // Se actualizan los elementos de la escena para cada frame

    //Update de los objetos
    for (let i = 0; i < this.objetos.length; i++) {
      this.objetos[i].update();
    }
    
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

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
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
