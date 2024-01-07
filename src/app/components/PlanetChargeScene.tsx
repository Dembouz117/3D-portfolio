
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from "dat.gui";
import ghibliPlaneBackground from "/public/ghibliplane.png";
import nebula from "/public/nebula.jpg";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

interface PlanetChargeProps{
    className?: string | String
}

const PlanetChargeScene: React.FC = ({ className }: PlanetChargeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const effectRan = useRef(false);

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, containerRef.current!.clientWidth/containerRef.current!.clientHeight, 0.1, 1000);
        console.log("client height:",containerRef.current?.clientHeight);
        console.log("client width:", containerRef.current?.clientWidth);
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xffffff, 0);

        //lighting
        const ambientLight = new THREE.AmbientLight(0xff0000, 0.4);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0,0,25);
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
        scene.add(ambientLight);

        //lighting helpers
        const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,10);
        scene.add(dLightHelper);

        if (containerRef.current && effectRan.current) {
        containerRef.current.appendChild(renderer.domElement);
        }

        //test cube
        const geometry = new THREE.BoxGeometry(10,10,10);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
        const cube = new THREE.Mesh(geometry, material);
        const orbit = new OrbitControls(camera, renderer.domElement);
        cube.castShadow = true;
        orbit.update();


        //for my understanding - will remove
        const gridHelper = new THREE.GridHelper(40,20);
        scene.add(gridHelper);

        //core ghibli mesh
        const ghibliSphereGeometry = new THREE.SphereGeometry(5,50,50);
        const ghibliTextureLoader = new THREE.TextureLoader();
        const ghibliSphereMaterial = new THREE.MeshStandardMaterial({ map: ghibliTextureLoader.load(ghibliPlaneBackground.src)});
        const ghibliSphereMesh = new THREE.Mesh(ghibliSphereGeometry, ghibliSphereMaterial);
        scene.add(ghibliSphereMesh);
        ghibliSphereMesh.add(cube);
        cube.position.set(0,0,15);

        //core ghibli lighting 
        const ghibliPointLight = new THREE.PointLight(0x0000ff, 7, 0);
        ghibliPointLight.position.set(ghibliSphereMesh.position.x, ghibliSphereMesh.position.y, ghibliSphereMesh.position.z);
        scene.add(ghibliPointLight);

        //camera
        camera.position.set(-10,30,30);

        const guiOptions = {
            cubeColor:"#ffea00",
            wireframe: false,
            bounceSpeed: 0.01
        }

        let step = 0;

        //model
        const assetLoader = new GLTFLoader();
        const monkeyUrl = new URL("./power_station.glb", import.meta.url);
        assetLoader.load(monkeyUrl.href, (gltf) => {
            scene.add(gltf.scene);
        })

        if (effectRan.current){
            const gui = new dat.GUI();

            gui.addColor(guiOptions, "cubeColor").onChange((e: string)=>{
                cube.material.color.set(e);
            });
            gui.add(guiOptions, "wireframe").onChange((e: boolean) => {
                cube.material.wireframe = e;
            })

            //note that this mutates guiOptions object, hence you can call its value directly
            gui.add(guiOptions, "bounceSpeed", 0, 0.05);

        }
        
        
        //has to be outside animation loop so that they don't keep getting recalculated
        const absoluteDiff = ghibliSphereMesh.position.distanceTo(cube.position);

        // Animation loop
        const animate = (time: number) => {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        step += guiOptions.bounceSpeed;
    

        // const orbitRadius = Math.sqrt(diffBoxSphereX*diffBoxSphereX + diffBoxSphereY*diffBoxSphereY  + diffBoxSphereZ*diffBoxSphereZ);
        const orbitRadius = absoluteDiff;
        cube.position.x = Math.cos(step) * orbitRadius;
        cube.position.y = 15 * Math.sin(4 * step);
        cube.position.z = Math.sin(step) * orbitRadius;
        
        renderer.render(scene, camera);
        };

        animate(10);

        return () => {
        // Dispose of the renderer to prevent memory leaks
        renderer.dispose();
        effectRan.current = true;
        };
    }, []); 


    return <div ref={containerRef} className="w-[5rem] h-[6rem]"/>;

    };

    export default PlanetChargeScene;
