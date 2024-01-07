import * as THREE from "three";
import * as dat from "dat.gui";

const cameraProperties = {
    positionX: 0,
    positionY: 0,
    positionZ: 5,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    };

const targetHelperProperties = {
    positionX: 0,
    positionY: 0,
    positionZ: 0
}

// Add a point helper to visualize the camera target
const targetHelper = new THREE.Mesh(
new THREE.SphereGeometry(10),
new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
// scene.add(targetHelper);
targetHelper.position.set(100,100,100);


const updateCamera = (camera: THREE.Camera) => {
    camera.position.set(cameraProperties.positionX, cameraProperties.positionY, cameraProperties.positionZ);
    camera.lookAt(new THREE.Vector3(cameraProperties.targetX, cameraProperties.targetY, cameraProperties.targetZ));
    targetHelper.position.set(cameraProperties.targetX, cameraProperties.targetY, cameraProperties.targetZ);
}




const addCameraGUIHelper = (camera:THREE.Camera, gui: dat.GUI, lowerLimit:number, upperLimit: number) => {
    const cameraFolder = gui.addFolder('Camera');
    const maxClientSize = Math.max(lowerLimit, upperLimit);
    const updateCameraCallback = () => updateCamera(camera);
    cameraFolder.add(cameraProperties, 'positionX', -lowerLimit, upperLimit).onChange(updateCameraCallback);
    cameraFolder.add(cameraProperties, 'positionY', -lowerLimit, upperLimit).onChange(updateCameraCallback);
    cameraFolder.add(cameraProperties, 'positionZ', -maxClientSize, maxClientSize).onChange(updateCameraCallback);
    cameraFolder.add(cameraProperties, 'targetX', -lowerLimit, lowerLimit).onChange(updateCameraCallback);
    cameraFolder.add(cameraProperties, 'targetY', -upperLimit, upperLimit).onChange(updateCameraCallback);
    cameraFolder.add(cameraProperties, 'targetZ', -maxClientSize, maxClientSize).onChange(updateCameraCallback);
    
    const targetHelperFolder = gui.addFolder('targetHelper');
    targetHelperFolder.add(targetHelperProperties, 'positionX').onChange((el) => targetHelper.position.x = el);
}

export { addCameraGUIHelper };