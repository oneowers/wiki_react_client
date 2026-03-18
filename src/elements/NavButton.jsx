import React from "react";
import { Link } from "react-router-dom";

const variants = {
  emerald: "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20",
  white: "bg-white text-black hover:bg-gray-100 shadow-xl",
  ghost: "bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md",
  outline: "bg-transparent border border-white/20 text-white hover:bg-white/5"
};

const NavButton = ({ 
  to, 
  onClick, 
  variant = "white", 
  children, 
  className = "", 
  fullWidth = false 
}) => {
  // Базовые стили для всех кнопок
  const baseStyles = "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap";
  
  const combinedClasses = `${baseStyles} ${variants[variant]} ${fullWidth ? "w-full py-4 rounded-2xl" : ""} ${className}`;

  // Если передан пропс 'to', рендерим как Link, иначе как обычную кнопку
  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default NavButton;