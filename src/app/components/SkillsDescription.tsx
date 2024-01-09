import React from "react";

interface SkillsDescriptionProps{
    children?: React.ReactNode,
    className?: string | String
}

const SkillsDescription:React.FC<SkillsDescriptionProps> = ({ children, className }) => {
  return (
    <div className={`${className??""}`}>
        { children }
    </div>
  )
}

export default SkillsDescription