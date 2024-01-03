
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from "dat.gui";
import ghibliPlaneBackground from "../public/ghibliplane.png";

const FirstMesh: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const effectRan = useRef(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x42bbaf);

    //lighting
    const ambientLight = new THREE.AmbientLight(0xff0000, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xFF0000, 1);
    directionalLight.position.set(0,0,20);
    directionalLight.castShadow = true;
    // scene.add(ambientLight);
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    //shadow camera halper
    const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(dLightShadowHelper);
    scene.add(directionalLight);

    //lighting helpers
    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,10);
    scene.add(dLightHelper);

    //FOG
    scene.fog = new THREE.Fog(0xffffff, 0, 100);

    //textures
    const textureLoader = new THREE.TextureLoader();
    //nextJS import images as StaticImage instead of a url
    scene.background = textureLoader.load(ghibliPlaneBackground.src);
    

    //ensures meshes are only added once -> React Strict mode development causes useEffect to run twice
    //renderer itself will reside in the DOM
    if (sceneRef.current && effectRan.current) {
      sceneRef.current.appendChild(renderer.domElement);
    }

    //test cube
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const orbit = new OrbitControls(camera, renderer.domElement);
    cube.position.set(0,0,10);
    cube.castShadow = true;
    orbit.update();

    //PLANE
    const planeGeometry = new THREE.PlaneGeometry(30,30,5);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, side:THREE.DoubleSide});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; 
    plane.position.set(0,0,0);
    scene.add(plane);

    //for my understanding - will remove
    const gridHelper = new THREE.GridHelper(40,20);
    scene.add(gridHelper);


    camera.position.set(-10,30,30);

    const guiOptions = {
        cubeColor:"#ffea00",
        wireframe: false,
        bounceSpeed: 0.01
    }

    let step = 0;


    if (effectRan.current){
        const gui = new dat.GUI();

        gui.addColor(guiOptions, "cubeColor").onChange((e: string)=>{
            cube.material.color.set(e);
        });
        gui.add(guiOptions, "wireframe").onChange((e: boolean) => {
            cube.material.wireframe = e;
        })
        //one other way of doing it for uniformity -> but speed ends up becoming outside the scope
        // gui.add(guiOptions, "bounceSpeed").onChange((e: number) => {
        //     speed = e;
        // })

        //note that this mutates guiOptions object, hence you can call its value directly
        gui.add(guiOptions, "bounceSpeed", 0, 0.05);

    }
    


    // Animation loop
    const animate = (time: number) => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      //ball bounce
        step += guiOptions.bounceSpeed;
        cube.position.y = 10*Math.abs(Math.sin(step));
    
      //hence why inreact three fibre camera is abstracted away as well in a canvas
      renderer.render(scene, camera);
    };

    animate(10);

    // Cleanup function
    return () => {
      // Dispose of the renderer to prevent memory leaks
      renderer.dispose();
      effectRan.current = true;
    };
  }, []); // Empty dependency array to run the effect only once on mount


  return <div ref={sceneRef} />;
// useEffect(()=> {
//     console.log("UseEffect start");
// },[]);
// return <div>FirstMesh</div>
};

export default FirstMesh;
