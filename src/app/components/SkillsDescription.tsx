import React from "react";


interface skillsInterface{
  skillName: string,
  skills: string[]
}
interface SkillsDescriptionProps{
  className?: string | String,
  skillName:String,
  skillList: string[]
}

const SkillsDescription:React.FC<SkillsDescriptionProps> = ({ className = '', skillName, skillList }) => {

  return (
    <div className="w-2/3 rounded-3xl h-11/12 flex flex-col justify-center font-bungee text-white">
      <div className={`w-full shadow-md rounded-md p-4 ${className} h-full`}>
        <div className="mb-8 text-[6rem]">Skills</div>
        <div className="mb-8 text-2xl">{skillName}</div>
        <div className={"flex flex-wrap w-full space-x-4 inline-block w-8/12"}>
          {skillList.map(skill => <div className="px-2 py-1 border-2 border-white rounded-3xl flex flex-col mb-2" key={skill}>{skill}</div>)}
        </div>
        
      </div>
    </div>
  );

}

export default SkillsDescription