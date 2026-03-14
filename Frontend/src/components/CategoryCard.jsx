import React from "react";

function CategoryCard({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      bg-black 
      text-red-800
      px-8 py-4
      rounded-xl
      shadow-lg
      font-semibold
      transition
      transform
      hover:scale-110
      hover:bg-gray-900
      active:scale-95
      "
    >
      {name}
    </button>
  );
}

export default CategoryCard;