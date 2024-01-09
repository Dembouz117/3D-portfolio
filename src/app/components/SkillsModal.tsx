import RadialMenu from "@/app/components/RadialMenu";
import SkillsDescription from "./SkillsDescription";

const SkillsModal = () => {
  return (
  <div className="flex w-11/12 h-[36rem] inline-block justify-between bg-blue-200 px-6 py-2 mt-4 rounded-3xl">
    <RadialMenu className="w-1/4 bg-red-200">
        <button className="text-bungee rounded-full bg-red-200 px-6 py-2">Languages</button>
        <button className="text-bungee rounded-full bg-red-200 px-6 py-2">Frameworks</button>
        <button className="text-bungee rounded-full bg-red-200 px-6 py-2">Technologies</button>
        <button className="text-bungee rounded-full bg-red-200 px-6 py-2">Communication</button>
    </RadialMenu>
    <SkillsDescription className="inline-block w-2/3 bg-gray-300">Hello World</SkillsDescription>
  </div>
    
  )
}

export default SkillsModal;