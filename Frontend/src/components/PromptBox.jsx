import React from "react";

function PromptBox({ prompt }) {

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  };

  if (!prompt) return null;

  return (
    <div className="mt-8 bg-white bg-opacity-80 shadow-xl p-6 rounded-xl max-w-lg text-center">

      <p className="mb-4 text-gray-800">{prompt}</p>

      <button
        onClick={copyPrompt}
        className="
        bg-black
        text-red-800
        px-5 py-2
        rounded-lg
        transition
        transform
        hover:scale-110
        hover:bg-gray-900
        active:scale-95
        "
      >
        Copy Prompt
      </button>

    </div>
  );
}

export default PromptBox;