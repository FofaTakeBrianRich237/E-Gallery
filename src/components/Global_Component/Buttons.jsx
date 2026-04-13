import { useState } from 'react';

function Buttons({ name, icon: Icon, className = "", func }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      style={{
        background: isHovered ? "black" : "linear-gradient(to right, #facc15, #eab308, #ca8a04)",
        color: "white",
        border: isHovered ? "2px solid white" : "none",
        fontFamily: "Afrik",
        fontWeight: "bold",
        borderRadius: "15px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={func}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      <span>{name}</span>
      {Icon && <Icon />}
    </button>
  );
}

export default Buttons;