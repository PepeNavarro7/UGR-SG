import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Maceta extends THREE.Object3D {
    constructor() {
        super();
        this.createMaceta();
        this.createBambu();
        this.createHojas();
    }

    createMaceta(){
        const texturaMaceta= new THREE.TextureLoader().load('../imgs/arcilla.avif');
        const materialMaceta = new THREE.MeshPhongMaterial({map: texturaMaceta});
        const texturaTierra = new THREE.TextureLoader().load('../imgs/ground_sand.jpg');
        const materialTierra = new THREE.MeshPhongMaterial ({color: 'saddlebrown', map: texturaTierra});

        // Hacemos el exterior de la maceta
        const shape = new THREE.Shape();
        shape.lineTo( 4, 0 );
        shape.lineTo( 4, 4 );
        shape.quadraticCurveTo( 5, 4, 5, 5 ); // 2 curvas para formar 1/2 circunferencia
        shape.quadraticCurveTo( 5, 6, 4, 6 );
        shape.lineTo( 0, 6 );

        const revolucionGeom = new THREE.LatheGeometry(shape.getPoints(), 36);
        const maceta = new THREE.Mesh( revolucionGeom, materialMaceta );

        const cilindroGeom = new THREE.CylinderGeometry(4.0,4.0,1.0,36);
        cilindroGeom.translate(0.0,5.5,0.0);

        const vacio = new THREE.Mesh( cilindroGeom, materialMaceta ) ;
        const macetaCSG = new CSG().union([maceta]).subtract([vacio]).toMesh();

        const tierra = new THREE.Mesh( cilindroGeom, materialTierra ) ;
        
        this.add(macetaCSG).add(tierra);
    }

    createBambu(){
        const materialBambu = new THREE.MeshPhongMaterial({color: 'green'});        
        const v1 = new THREE.Vector3(-1.5, 6, -1);
        const v2 = new THREE.Vector3(1.5, 24, 1);
        const curve = new THREE.LineCurve3( v1, v2);
        const geometry = new THREE.TubeGeometry(curve);
        const texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        const material = new THREE.MeshPhongMaterial ({color: 'green', map: texture});
        const mesh = new THREE.Mesh( geometry, material );
        this.add( mesh );
    }
    createHojas(){
        const texture = new THREE.TextureLoader().load('../imgs/leaf.jpeg');
        const materialHoja = new THREE.MeshPhongMaterial ({map: texture});

        const heartShape = new THREE.Shape();
        heartShape.moveTo( 25, 25 );
        heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
        heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
        heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

        const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        // Transformo la hoja para que quede como quiero
        geometry.scale(0.02,0.02,0.02);
        geometry.rotateX(Math.PI);
        geometry.translate(-0.5,1.925,0.08);

        const hoja1 = new THREE.Mesh( geometry, materialHoja );
        hoja1.scale.set(0.8,1.0,1.0);
        hoja1.rotateZ(-Math.PI/2.0);
        hoja1.position.set(0.7,13.0,0.0);

        const hoja2 = new THREE.Mesh( geometry, materialHoja );
        hoja2.scale.set(0.7,0.8,1.0);
        hoja2.rotation.set(0.0,-4*Math.PI/4,-Math.PI/2);
        hoja2.position.set(-0.4,18.0,0.0);

        this.add(hoja1).add(hoja2);
    }

    update () {
    }
}

export { Maceta };
