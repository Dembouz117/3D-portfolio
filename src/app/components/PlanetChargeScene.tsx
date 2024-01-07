
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
import { createSceneConfig } from "../configs/planet-charge/config";
import { addCameraGUIHelper } from "../commons/gui-helpers/helpers";

interface PlanetChargeProps{
    className?: string 
}



const PlanetChargeScene: React.FC<PlanetChargeProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const effectRan = useRef(false);

    useEffect(() => {

        const clientWidth = containerRef.current!.clientWidth;
        const clientHeight = containerRef.current!.clientHeight;
        const spaceStationCore = new THREE.Vector3(50,25,-170);
        const spaceStationCoreRadius = 20;
        const cameraPositionViewCore = new THREE.Vector3(-63, 64, 0.9);
        const { scene, camera, renderer } = createSceneConfig(clientWidth, clientHeight, spaceStationCore, cameraPositionViewCore);

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

            //gui camera helpers
            addCameraGUIHelper(camera, gui, clientWidth, clientHeight);

        }

        //orbit controls
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();        

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
