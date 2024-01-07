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

export { createSceneConfig }