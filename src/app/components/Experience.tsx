import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";
import FadhelAvatar from "@/app/components/FadhelAvatar";


const Experience = () => {
  const {animation} = useControls({
    animation:{
    value: "Typing",
    options: ["Typing", "Falling", "Waving"]
  }})
  return (
    <>
        <OrbitControls/>
        <group position-y={-2}>
          <FadhelAvatar animation={animation}/>
        </group>
        <ambientLight intensity={2}/>
    </>
  )
}


export default Experience;