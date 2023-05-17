import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class RelojPendulo extends THREE.Object3D {
  constructor() { 
    super();
    this.animacion = false;
    this.materialNormal = new THREE.MeshNormalMaterial();
    this.materialNormal.flatShading = true;
    this.reloj = new THREE.Clock();

    this.cuerpoReloj();
    this.crearPendulo();
    this.animacionPendulo();
    this.creaReloj();
    this.animacionAgujas();
  }

  cuerpoReloj(){
    const shape = new THREE.Shape();
    shape.moveTo( 0,14 );
    shape.lineTo( 3, 10 );
    shape.lineTo( 3, 0 );
    shape.lineTo( -3, 0 );
    shape.lineTo( -3, 10 );
    shape.lineTo( 0, 14 );

    const extrudeSettings = {
      steps: 2,
      depth: 4,
      bevelEnabled: false,
    };

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const extrudeMesh = new THREE.Mesh( extrudeGeometry, new THREE.MeshPhongMaterial({color: 'saddlebrown'}) ) ;

    const boxGeom = new THREE.BoxGeometry(3,6,4);
    const box = new THREE.Mesh(boxGeom, new THREE.MeshPhongMaterial({color: 'saddlebrown'}));
    box.translateY(4);
    box.translateZ(3);

    const csg = new CSG();
    csg.union([extrudeMesh]);
    csg.subtract([box]);
    const resultadoCSG = csg.toMesh();
    const objeto = new THREE.Object3D();
    objeto.add(resultadoCSG);
    objeto.position.z = -2;
    this.add(objeto);
  }

  crearPendulo(){
    const circulo = new THREE.Shape();
    circulo.moveTo( 0, 0.5 );
    circulo.absarc( 0, 0, 0.5, 0, 2 * Math.PI, false );  
    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };
    const circGeom = new THREE.ExtrudeGeometry( circulo, extrudeSettings );
    const mesh1 = new THREE.Mesh( circGeom, new THREE.MeshPhongMaterial({color: 'green'}) ) ;

    const boxGeom = new THREE.BoxGeometry(0.2,4.0,0.5);    
    const mesh2 = new THREE.Mesh( boxGeom, new THREE.MeshPhongMaterial({color: 'green'}) ) ;
    mesh2.position.y = 2.0;
    const objetoRot = new THREE.Object3D();
    objetoRot.add(mesh1);
    objetoRot.add(mesh2);
    objetoRot.position.y=-4; // lo bajamos para cambiar el eje de rotacion
    const objeto = new THREE.Object3D().add(objetoRot);
    // Aqui sería el giro
    objeto.position.y=6; // situamos en la escena
    this.add(objeto);

    // Refetencia
    this.pendulo = objeto;
  }

  animacionPendulo(){
    var origen = { t: -Math.PI/10};
    var fin = {t: Math.PI/10};
    
    const tiempoDeRecorrido=1000;

    var animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
      .onUpdate(() => { this.pendulo.rotation.z = origen.t; })
      .onComplete(() => { origen.t = -Math.PI/10; })
      .start();

    var animacion2 = new TWEEN.Tween (fin).to (origen, tiempoDeRecorrido)
      .onUpdate(() => { this.pendulo.rotation.z = fin.t; })
      .onComplete(() => { fin.t = Math.PI/10; });

    animacion1.chain(animacion2);
    animacion2.chain(animacion1);
  }

  creaReloj(){
    const objeto = new THREE.Object3D();

    const superficieBlanca = new THREE.CylinderGeometry (16, 16, 0.1, 50, 1);
    superficieBlanca.translate(0,-0.05,0) 
    const superficieReloj = new THREE.Mesh(superficieBlanca, new THREE.MeshPhongMaterial({color: 'white'}));
    objeto.add (superficieReloj);
    
    const superficieMadera = new THREE.CylinderGeometry (17.5, 17.5, 0.1, 50, 1); 
    superficieMadera.translate(0,-0.1,0) 
    const circuloReloj = new THREE.Mesh(superficieMadera, new THREE.MeshPhongMaterial({color: 'brown'}));
    objeto.add (circuloReloj);

    const paloLargo = new THREE.BoxGeometry(12,0.5,0.5); 
    paloLargo.translate(5.5, 0.25, 0); 

    const paloCorto = new THREE.BoxGeometry(7,0.5,0.5); 
    paloCorto.translate(3, 0.25, 0); 

    const agujaLarga = new THREE.Mesh(paloLargo, new THREE.MeshPhongMaterial({color: 'grey'}));
    objeto.add(agujaLarga);
    
    const agujaCorta = new THREE.Mesh(paloCorto, new THREE.MeshPhongMaterial({color: 'black'}));
    objeto.add(agujaCorta);
 
    const box = new THREE.BoxGeometry(2,0.5,1); 
    box.translate(13, 0.25, 0); 

    for(let i = 0; i < 12; i++){
      const marca = new THREE.Mesh(box, new THREE.MeshPhongMaterial({color: 'black'}));
      marca.rotation.y = (i * Math.PI * 2 / 12); 
      objeto.add(marca);
    }

    objeto.scale.set(0.1, 0.1, 0.1)
    objeto.rotateX(Math.PI/2);
    objeto.rotateY(Math.PI/2)
    objeto.position.set(0.0, 9.5, 2.05);

    this.add(objeto);

    // Referencias
    this.agujaLarga = agujaLarga;
    this.agujaCorta = agujaCorta;
  }

  animacionAgujas(){
    const duracion=10; // minutos que debe dar
    const tiempoVuelta=60000; // 60" por vuelta
    const vuelta = 2.0 * Math.PI;

    const origen1 = { t: 0.0};    
    const fin1 = {t: vuelta};
    
    const origen2 = { t: vuelta/60.0 * duracion}; // Pasamos de 10' a 0
    const fin2 = {t: 0.0};    

    var animacion1 = new TWEEN.Tween (origen1).to (fin1, tiempoVuelta)
      .onUpdate(() => { this.agujaLarga.rotation.y = -origen1.t; })
      .onComplete(() => { 
        origen1.t = 0.0; 
      })
      .start();

    var animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoVuelta*duracion)
      .onUpdate(() => { this.agujaCorta.rotation.y = origen2.t; })
      .onComplete(() => { origen2.t = vuelta/6.0; })
      .start();

    animacion1.repeat(duracion-1); // Da 10 vueltas, 10 "minutos"
  }


  update () {
    TWEEN.update();
  }
}

export { RelojPendulo };
