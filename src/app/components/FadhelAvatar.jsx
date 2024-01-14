import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFBX, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

function FadhelAvatar(props) {
  const {animation} = props;
  const animateRef = useRef();
  const { nodes, materials } = useGLTF("models/avatars/Dembouz.glb");
  const {animations: typingAnimation} = useFBX("models/animations/Typing_Dembouz.fbx");
  const {animations: fallingAnimation} = useFBX("models/animations/Dembouz_Falling.fbx");
  const {animations: wavingAnimation} = useFBX("models/animations/Dembouz_Waving.fbx");

  //head follow controls
  const {headFollow, cursorFollow} = useControls({
    headFollow: false,
    cursorFollow: false
  })

  typingAnimation[0].name = "Typing";
  fallingAnimation[0].name = "Falling";
  wavingAnimation[0].name = "Waving";

  //takes array of animation clip
  const { actions } = useAnimations([typingAnimation[0], fallingAnimation[0], wavingAnimation[0]], animateRef);

  useFrame((state) => {
    if(headFollow){
      animateRef.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if(cursorFollow){
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 1);
      animateRef.current.getObjectByName("Spine2").lookAt(target);
    }
  })

  useEffect(() => {
    if (!animateRef){
      console.log("Terminated before animate");
      return;
    }
    actions[animation].reset().fadeIn(0.5).play();

    return ()=>{
      actions[animation].reset().fadeOut(0.5);
    }
  },[animation]);

  return (
    <group {...props} dispose={null} ref={animateRef}>
    <group rotation-x={-Math.PI /2} scale={[3,3,3]} position={[0,-1,0]}>
    <primitive object={nodes.Hips} />
    <skinnedMesh
      name="EyeLeft"
      geometry={nodes.EyeLeft.geometry}
      material={materials.Wolf3D_Eye}
      skeleton={nodes.EyeLeft.skeleton}
      morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
      morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
    />
    <skinnedMesh
      name="EyeRight"
      geometry={nodes.EyeRight.geometry}
      material={materials.Wolf3D_Eye}
      skeleton={nodes.EyeRight.skeleton}
      morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
      morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
    />
    <skinnedMesh
      name="Wolf3D_Head"
      geometry={nodes.Wolf3D_Head.geometry}
      material={materials.Wolf3D_Skin}
      skeleton={nodes.Wolf3D_Head.skeleton}
      morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
      morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
    />
    <skinnedMesh
      name="Wolf3D_Teeth"
      geometry={nodes.Wolf3D_Teeth.geometry}
      material={materials.Wolf3D_Teeth}
      skeleton={nodes.Wolf3D_Teeth.skeleton}
      morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
      morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Hair.geometry}
      material={materials.Wolf3D_Hair}
      skeleton={nodes.Wolf3D_Hair.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Glasses.geometry}
      material={materials.Wolf3D_Glasses}
      skeleton={nodes.Wolf3D_Glasses.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Body.geometry}
      material={materials.Wolf3D_Body}
      skeleton={nodes.Wolf3D_Body.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
      material={materials.Wolf3D_Outfit_Bottom}
      skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
      material={materials.Wolf3D_Outfit_Footwear}
      skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Top.geometry}
      material={materials.Wolf3D_Outfit_Top}
      skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
    />
  </group>
  </group>
  );
}

useGLTF.preload("models/avatars/Dembouz.glb");

export default FadhelAvatar;