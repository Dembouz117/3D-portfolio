
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from "dat.gui";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import nebula from "/public/nebula.jpg";
import mercuryTexture from "/public/mercury_texture.png";
import { createPlanet } from '../commons/planets';

interface PlanetChargeProps{
    className?: string 
}

const PlanetChargeScene: React.FC<PlanetChargeProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const effectRan = useRef(false);

    useEffect(() => {

        const clientWidth = containerRef.current!.clientWidth;
        const clientHeight = containerRef.current!.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, clientWidth/clientHeight, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});

        //camera position for ideal viewing of the space station's core
        const cameraPositionViewCore = new THREE.Vector3(-70, 150, -40);
        camera.position.set(...cameraPositionViewCore.toArray());

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xffffff, 0);

        //lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 10);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 200);
        directionalLight.position.set(0,0,15);
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

        //background
        const backgroundTextureLoader = new THREE.CubeTextureLoader();
        scene.background = backgroundTextureLoader.load([
            nebula.src,
            nebula.src,
            nebula.src,
            nebula.src,
            nebula.src,
            nebula.src
        ])

        //model
        const assetLoader = new GLTFLoader();
        const stationUrl = new URL("/public/models/power_station.glb", import.meta.url);
        const spaceStationCore = new THREE.Vector3(0,25,-170);
        assetLoader.load(stationUrl.href, (gltf) => {
            const spaceStation = gltf.scene;
            scene.add(spaceStation);
            camera.lookAt(spaceStationCore);
            orbit.target.set(...spaceStationCore.toArray());

        });

        //additional planets
        const planetTextureLoader = new THREE.TextureLoader();
        const mercury = createPlanet(scene, planetTextureLoader, 3.2, mercuryTexture.src, 80, spaceStationCore);
        

        if (containerRef.current && effectRan.current) {
        containerRef.current.appendChild(renderer.domElement);
        }

        if(effectRan.current){
            // Create a GUI object
            const gui = new dat.GUI();

            // Define the initial camera properties
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
            scene.add(targetHelper);


            const updateCamera = () => {
                camera.position.set(cameraProperties.positionX, cameraProperties.positionY, cameraProperties.positionZ);
                camera.lookAt(new THREE.Vector3(cameraProperties.targetX, cameraProperties.targetY, cameraProperties.targetZ));
                targetHelper.position.set(cameraProperties.targetX, cameraProperties.targetY, cameraProperties.targetZ);
            }

            // Add camera controls to the GUI
            const cameraFolder = gui.addFolder('Camera');
            const maxClientSize = Math.max(clientHeight, clientWidth);
            cameraFolder.add(cameraProperties, 'positionX', -clientWidth, clientWidth).onChange(updateCamera);
            cameraFolder.add(cameraProperties, 'positionY', -clientHeight, clientHeight).onChange(updateCamera);
            cameraFolder.add(cameraProperties, 'positionZ', -maxClientSize, maxClientSize).onChange(updateCamera);
            cameraFolder.add(cameraProperties, 'targetX', -clientWidth, clientWidth).onChange(updateCamera);
            cameraFolder.add(cameraProperties, 'targetY', -clientHeight, clientHeight).onChange(updateCamera);
            cameraFolder.add(cameraProperties, 'targetZ', -maxClientSize, maxClientSize).onChange(updateCamera);

            const targetHelperFolder = gui.addFolder('targetHelper');
            targetHelperFolder.add(targetHelperProperties, 'positionX').onChange((el) => targetHelper.position.x = el);
        }


        //for my understanding - will remove
        const gridHelper = new THREE.GridHelper(40,20);
        scene.add(gridHelper);



        //orbit controls
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();

        let step = 0;


        const point = new THREE.Vector3(0, 25, -170); // Replace with your specific coordinates

        // Add a point helper to visually represent the position
        const pointHelper = new THREE.Mesh(
        new THREE.SphereGeometry(5), // Sphere geometry to represent the point
        new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Red color for the sphere
        );
        pointHelper.position.copy(point);
        scene.add(pointHelper);

        // Add an AxesHelper to visually represent the orientation
        const axesHelper = new THREE.AxesHelper(10); // Length of the axes
        axesHelper.position.copy(point);
        scene.add(axesHelper);
        

        // Animation loop
        const animate = (time: number) => {
        requestAnimationFrame(animate);
        
        renderer.render(scene, camera);
        };

        animate(10);

        return () => {
        // Dispose of the renderer to prevent memory leaks
        renderer.dispose();
        effectRan.current = true;
        };
    }, []); 


    return <div ref={containerRef} className={`${className??""}`}/>;

    };

    export default PlanetChargeScene;
