import React from "react";


interface IPropsSidebarMenuItem {
  path: string;
  title: string;
  icon?: React.ReactNode; 
  className?: string; 
}

export const NavBarItemComponent: React.FC<IPropsSidebarMenuItem> = ({
  path,
  title,
  icon, 
  className = "", 
}) => {
  return (
    <div className={className}>
      <a href={path}>
        {icon && <span>{icon}</span>} {}
        {title}
      </a>
    </div>
  );
};
