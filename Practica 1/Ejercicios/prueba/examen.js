import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
import * as TWEEN from '../../libs/tween.esm.js'

class Examen extends THREE.Object3D {
    constructor (gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        this.jaula();

        //INICIO DE LA MANZANA
        var geometriaPiramide = new THREE.ConeGeometry(0.5, 1, 3);
        var geometriaToroide = new THREE.TorusGeometry(5, 10, 20, 100);
        var materialManzana = new THREE.MeshPhongMaterial({color: 0xff0000});

        var cuerpoManzana = new THREE.Mesh(geometriaToroide, materialManzana);
        cuerpoManzana.scale.set(0.3, 0.3, 0.3);
        cuerpoManzana.rotation.x = Math.PI/2;
        cuerpoManzana.position.y = 5;

        var raboManzana = new THREE.Mesh(geometriaPiramide, materialManzana);
        raboManzana.rotation.x = Math.PI;
        raboManzana.position.y = 8;
        
        var manzana = new THREE.Object3D();
        manzana.add(cuerpoManzana).add(raboManzana);
        //FIN DE LA MANZANA

        //INICIO CUERDA
        var materialCuerda = new THREE.MeshBasicMaterial({color: 0xffff00});
        var geometriaLinea1 = new THREE.BufferGeometry();
        geometriaLinea1.setFromPoints([new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, 20, -2,5)]);
        var geometriaLinea2 = new THREE.BufferGeometry();
        geometriaLinea2.setFromPoints([new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, 20, 2,5)])

        var linea1 = new THREE.Line(geometriaLinea1, materialCuerda);
        var linea2 = new THREE.Line(geometriaLinea2, materialCuerda);

        //FIN CUERDA

        //INICIO PENDULO
        //Los desplazo debajo del eje z antes de unirlos
        manzana.position.y = -20;
        linea1.position.y = linea2.position.y = -20;

        this.pendulo1 = new THREE.Object3D();
        this.pendulo1.add(manzana).add(linea1).add(linea2);

        this.pendulo2 = new THREE.Object3D();
        this.pendulo2.add(manzana.clone()).add(linea1.clone()).add(linea2.clone());

        this.add(this.pendulo1);
        this.add(this.pendulo2);
        //FIN PENDULO

        //INICIO ANIMACION
        var origen = { t:0};
        var fin = {t:Math.PI/6};
        var origen2 = {t:Math.PI/6};
        var fin2 = {t: 0};
        var origen3 = {t:0};
        var fin3 = {t:Math.PI/6};
        var origen4 = {t:Math.PI/6};
        var fin4 = {t:0};
        var tiempoDeRecorrido = 1000;

        var animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
        .onUpdate(() => {
          this.pendulo1.rotation.z = -origen.t;
        }).onComplete(() => {animacion2.start()}).start();

        var animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido/2)
        .onUpdate(() => {
          this.pendulo1.rotation.z = -origen2.t;
        }).onComplete(() => {animacion3.start()});

        var animacion3 = new TWEEN.Tween (origen3).to (fin3, tiempoDeRecorrido)
        .onUpdate(() => {
          this.pendulo2.rotation.z = origen3.t;
        }).onComplete(() => {animacion4.start()});

        var animacion4 = new TWEEN.Tween (origen4).to (fin4, tiempoDeRecorrido/2)
        .onUpdate(() => {
          this.pendulo2.rotation.z = origen4.t;
        }).onComplete(() => {animacion1.start()});

        this.pendulo1.position.set(-4.5, 20, 0);
        this.pendulo2.position.set(4.5, 20, 0);

    }
    jaula(){
      //INICIO DE LA JAULA
      var geometriaPalos = new THREE.CylinderGeometry(0.5, 0.5, 20, 15);
      var geometriaPalosUnion = new THREE.CylinderGeometry(0.5, 0.5, 5, 15);
      var materialPalos = new THREE.MeshNormalMaterial();


      var paloVertical1 = new THREE.Mesh(geometriaPalos, materialPalos);
      var paloVertical2 = new THREE.Mesh(geometriaPalos, materialPalos);
      var paloHorizontal1 = new THREE.Mesh(geometriaPalos, materialPalos);
      var paloHorizontal2 = new THREE.Mesh(geometriaPalos, materialPalos);
      var paloUnion1 = new THREE.Mesh(geometriaPalosUnion, materialPalos);
      var paloUnion2 = new THREE.Mesh(geometriaPalosUnion, materialPalos);

      paloVertical1.position.y = paloVertical2.position.y = 10;
      paloVertical1.position.x = -20;
      paloVertical2.position.x = 20;

      paloHorizontal1.scale.y = paloHorizontal2.scale.y = 2
      paloHorizontal1.rotation.z = paloHorizontal2.rotation.z = Math.PI/2;
      paloHorizontal1.position.y = paloHorizontal2.position.y = 20;
      paloHorizontal1.position.z = -2.5;
      paloHorizontal2.position.z = 2.5;

      paloUnion1.rotation.x = paloUnion2.rotation.x = Math.PI/2;
      paloUnion1.position.y = paloUnion2.position.y = 20;
      paloUnion1.position.x = -20;
      paloUnion2.position.x = 20;

      this.add(paloVertical1).add(paloVertical2);
      this.add(paloHorizontal1).add(paloHorizontal2);
      this.add(paloUnion1).add(paloUnion2);
      //FIN DE LA JAULA
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
        } 
        
        // Se crea una sección para los controles de la caja
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        
      }
      

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

       TWEEN.update();
      }
}

export { Examen };