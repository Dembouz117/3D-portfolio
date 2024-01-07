
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from "dat.gui";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import nebula from "/public/nebula.jpg";
import mercuryTexture from "/public/mercury_texture.png";
import lavaPlanetTexture from "/public/lava_texture.jpeg";
import marsTexture from "/public/mercury_texture.png";
import mossPlanetTexture from "/public/moss_planet_texture.jpeg";
import { createPlanet } from '../commons/planets';
import { createSceneConfig } from "../configs/planet-charge/config"

interface PlanetChargeProps{
    className?: string 
}



const PlanetChargeScene: React.FC<PlanetChargeProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const effectRan = useRef(false);

    useEffect(() => {

        const clientWidth = containerRef.current!.clientWidth;
        const clientHeight = containerRef.current!.clientHeight;
        const spaceStationCore = new THREE.Vector3(0,25,-170);
        const cameraPositionViewCore = new THREE.Vector3(-70, 150, -40);

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(90, clientWidth/clientHeight, 0.1, 2000);
        // const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        const { scene, camera, renderer } = createSceneConfig(clientWidth, clientHeight, spaceStationCore);

        //camera position for ideal viewing of the space station's core
        camera.position.set(...cameraPositionViewCore.toArray());



        //lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 10);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 30);
        directionalLight.position.set(0,0,15);
        directionalLight.castShadow = true;

        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;

        // const pointLight = new THREE.PointLight(0xffff00,300000);

        const pointLights = [
            new THREE.Vector3(0,25,-170),
            new THREE.Vector3(0,40,-170),
            new THREE.Vector3(40,25,-170),
            new THREE.Vector3(0,25,-140),
            new THREE.Vector3(40,0,-170),
            new THREE.Vector3(70,0,-120),
            new THREE.Vector3(70,25,-200),
            new THREE.Vector3(40,0,-200),
            new THREE.Vector3(0,40,-200),
        ]
        pointLights.forEach(el => {
            const pointLight = new THREE.PointLight(0xffff00,300000);
            pointLight.position.set(...el.toArray());
            pointLight.castShadow = true;
            scene.add(pointLight);
        })
        scene.add(directionalLight);
        scene.add(ambientLight);

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

        let spaceStation:THREE.Group<THREE.Object3DEventMap>;
        assetLoader.load(stationUrl.href, (gltf) => {
            spaceStation = gltf.scene;
            scene.add(spaceStation);
            camera.lookAt(spaceStationCore);
            orbit.target.set(...spaceStationCore.toArray());
            if(spaceStation){
                console.log("space station instantiated");
                // pointLight.position.copy(spaceStationCore);
            }
            
        });

        //additional planets
        const planetTextureLoader = new THREE.TextureLoader();
        const mercury = createPlanet(scene, planetTextureLoader, 6, mercuryTexture.src, 80, spaceStationCore);
        const lavaPlanet = createPlanet(scene, planetTextureLoader, 10, lavaPlanetTexture.src, 120, spaceStationCore);
        const mars = createPlanet(scene, planetTextureLoader, 12, marsTexture.src, -150, spaceStationCore);
        const mossPlanet = createPlanet(scene, planetTextureLoader, 8, mossPlanetTexture.src, -80, spaceStationCore);
        

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
            // scene.add(targetHelper);
            targetHelper.position.set(100,100,100);


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

        const point = new THREE.Vector3(0, 25, -170); 

        

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            //self-rotations
            mercury.mesh.rotateY(0.004);
            lavaPlanet.mesh.rotateY(0.002);
            mossPlanet.mesh.rotateY(0.02);
            mars.mesh.rotateY(0.018);


            //Around-sun-rotation
            mercury.obj.rotateY(0.01);
            lavaPlanet.obj.rotateY(0.02);
            mossPlanet.obj.rotateY(0.003);
            mars.obj.rotateY(0.008);
            
            renderer.render(scene, camera);
        };

        animate();

        return () => {
        renderer.dispose();
        effectRan.current = true;
        };
    }, []); 


    return <div ref={containerRef} className={`${className??""}`}/>;

    };

    export default PlanetChargeScene;
