import { useState } from "react";
import RadialMenu from "@/app/components/RadialMenu";
import SkillsDescription from "./SkillsDescription";

import { useAtom } from "jotai";

//states
import { selectSkillAtom } from "@/app/store/index";


interface skillsInterface{
  skillName: string;
  skills: string[];
}

const SkillsModal = () => {
  const [selectedSkill, setSelectedSkill] = useAtom(selectSkillAtom);
  const [selectedDescription, setSelectedDescription] = useState<skillsInterface>({
    skillName:"Technologies", skills:["MongoDB", "SQL", "Redis", "Prisma", "gRPC", "Stripe", "System Design", "FireBase", "ThreeJs", "Networking", "pyTorch", "sciKit", "Qiskit", "HTML", "CSS"]
  });
  const skills: skillsInterface[] = [
    {
      skillName: "Languages",
      skills:["Java", "TypeScript", "JavScript", "Python", "C", "GoLang"]
    },
    {
      skillName: "Frameworks",
      skills:["React", "Next.Js", "Express", "Node", "React Native"]
    },
    {
      skillName: "Technologies",
      skills:["MongoDB", "SQL", "Redis", "Prisma", "gRPC", "Stripe", "System Design", "FireBase", "ThreeJs", "Networking", "pyTorch", "sciKit", "AWS", "Firebase Cloud Functions", "Docker"]
    },
    {
      skillName:"Communication",
      skills:["People Skills", "Teamwork"]
    }
  ];

  const skillSelectorHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataSkill = e.currentTarget.dataset.skill;
    setSelectedSkill(dataSkill!);
    const matchedSkillDescription = skills.find(skill => skill.skillName===dataSkill);
    setSelectedDescription(matchedSkillDescription!);
  }

  return (
  <div className="flex w-11/12 h-[36rem] inline-block justify-between bg-gray-900 px-6 py-2 mt-4 rounded-3xl">
    <RadialMenu className="w-1/4">
        {skills.map(skill => {
          const matchedSkillName = selectedSkill === skill.skillName;
          return(
            <button className={` ${matchedSkillName?"bg-red-200": "bg-gray-700"} text-bungee rounded-full px-6 py-2 transform transition-transform duration-300 hover:scale-110`}data-skill={skill.skillName} onClick={skillSelectorHandler} key={skill.skillName}>{skill.skillName}</button>
          )
        })}
    </RadialMenu>
    <SkillsDescription skillName={selectedDescription.skillName} skillList={selectedDescription.skills}/>
  </div>
    
  )
}

export default SkillsModal;