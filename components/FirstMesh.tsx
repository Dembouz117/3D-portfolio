
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from "dat.gui";

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

    //ensures meshes are only added once -> React Strict mode development causes useEffect to run twice
    //renderer itself will reside in the DOM
    if (sceneRef.current && effectRan.current) {
      sceneRef.current.appendChild(renderer.domElement);
    }

    //test cube
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const orbit = new OrbitControls(camera, renderer.domElement);
    cube.position.set(0,10,10);
    orbit.update();

    //PLANE
    const planeGeometry = new THREE.PlaneGeometry(30,30,5);
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.DoubleSide});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    //for my understanding - will remove
    const gridHelper = new THREE.GridHelper(40,20);
    scene.add(gridHelper);


    camera.position.set(-10,30,30);

    const guiOptions = {
        cubeColor:"#ffea00",
        wireframe: false
    }
    if (effectRan.current){
        const gui = new dat.GUI();

        gui.addColor(guiOptions, "cubeColor").onChange((e: string)=>{
            cube.material.color.set(e);
        });
        gui.add(guiOptions, "wireframe").onChange((e: boolean) => {
            cube.material.wireframe = e;
        })

    }
    
    let step = 0;
    let speed = 0.01;

    // Animation loop
    const animate = (time: number) => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      //ball bounce
        step += speed;
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
