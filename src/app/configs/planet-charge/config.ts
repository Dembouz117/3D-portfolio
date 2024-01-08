import * as THREE from "three";

//uses my common scene, render and adjustable camera position
const createSceneConfig = (aspectWidth: number, aspectHeight: number, cameraPoint: THREE.Vector3, cameraOrigin: THREE.Vector3) => {
    

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, aspectWidth/aspectHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});

    //camera position and pointing for ideal viewing of the space station's core
    camera.position.set(...cameraPoint.toArray());
    camera.position.set(...cameraOrigin.toArray());

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(aspectWidth, aspectHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 0);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(aspectWidth, aspectHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 0);

    return { scene, camera, renderer}
}

const lightConfig = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 30);
    directionalLight.position.set(0,0,15);
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;

    return {directionalLight, ambientLight};
}

export { createSceneConfig, lightConfig };