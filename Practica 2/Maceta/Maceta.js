import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Maceta extends THREE.Object3D {
    constructor() {
        super();
        this.createMaceta();
        this.createBambu();
    }

    createMaceta(){
        const materialMaceta = new THREE.MeshNormalMaterial;
        const materialTierra = new THREE.MeshPhongMaterial({color: 'saddlebrown'});

        // Hacemos el exterior de la maceta
        const shape = new THREE.Shape();
        shape.lineTo( 4, 0 );
        shape.lineTo( 4, 4 );
        shape.quadraticCurveTo( 5, 4, 5, 5 ); // dos medias curvas
        shape.quadraticCurveTo( 5, 6, 4, 6 );
        shape.lineTo( 0, 6 );

        const revolucionGeom = new THREE.LatheGeometry(shape.getPoints(), 36);
        const maceta = new THREE.Mesh( revolucionGeom, materialMaceta );

        const cilindroGeom = new THREE.CylinderGeometry(4.0,4.0,1.0,36);
        cilindroGeom.translate(0.0,5.5,0.0);
        
        const vacio = new THREE.Mesh( cilindroGeom, materialMaceta ) ;
        const macetaCSG = new CSG().union([maceta]).subtract([vacio]).toMesh();

        const tierra = new THREE.Mesh( cilindroGeom, materialTierra ) ;
        
        this.add(macetaCSG)
        this.add(tierra);
    }

    createBambu(){

    }

    update () {
    }
}

export { Maceta };
