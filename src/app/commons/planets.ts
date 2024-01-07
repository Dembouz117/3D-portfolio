import * as THREE from "three";
import * as dat from "dat.gui";

interface PlanetRingInterface{
    innerRadius: number,
    outerRadius: number,
    texture: string
}

//to create individual planet and its associated invisible 3D object - 3D object placed at origin 
//mesh position to be displaced from the 3D origin via the x axis
const createPlanet = (scene: THREE.Scene, textureLoader: THREE.TextureLoader, size: number, texture: string, position: number, center: THREE.Vector3,ring?:PlanetRingInterface) => {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const obj = new THREE.Object3D();
    obj.add(mesh);
    obj.position.set(...center.toArray());
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const setupLightControls = (pointLight:THREE.PointLight) => {
    const gui = new dat.GUI();
  
    // Create a folder for the point light controls
    const lightFolder = gui.addFolder('Point Light');
  
    // Add controls for intensity and position
    lightFolder.add(pointLight, 'intensity').name('Intensity');
    const positionFolder = lightFolder.addFolder('Position');
    positionFolder.add(pointLight.position, 'x').name('X');
    positionFolder.add(pointLight.position, 'y').name('Y');
    positionFolder.add(pointLight.position, 'z').name('Z');
  
    // Open the folder by default
    lightFolder.open();
  }


export { createPlanet };