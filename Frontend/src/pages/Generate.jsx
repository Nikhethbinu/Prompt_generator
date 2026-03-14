import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Generate() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {

    if (!topic) return;

    setLoading(true);

    try {

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          category
        })
      });

      const data = await response.json();

      setPrompt(data.prompt);

    } catch (error) {

      console.error("Error generating prompt:", error);
      setPrompt("Failed to generate prompt.");

    }

    setLoading(false);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="
        absolute top-6 right-6
        bg-black
        text-red-800
        px-4 py-2
        rounded-lg
        transition
        transform
        hover:scale-110
        hover:bg-gray-900
        active:scale-95
        "
      >
        Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-white animate-zoomIn">
        {category.toUpperCase()} Prompt Generator
      </h2>

      <textarea
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        className="border p-3 rounded-lg w-80 resize-none overflow-hidden"
      />

      <button
        onClick={generatePrompt}
        className="
        bg-black
        text-red-800
        px-6 py-3
        rounded-lg
        mt-4
        transition
        transform
        hover:scale-110
        hover:bg-gray-900
        active:scale-95
        "
      >
        Generate
      </button>

      {loading && (
        <div className="mt-6 animate-pulse text-white">
          Generating...
        </div>
      )}

      {prompt && !loading && (
        <div className="mt-6 bg-white bg-opacity-90 shadow p-6 rounded-xl max-w-lg text-center animate-zoomIn">

          <p className="mb-4 text-gray-800">{prompt}</p>

          <button
            onClick={copyPrompt}
            className="
            bg-black
            text-red-800
            px-4 py-2
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
      )}

    </div>
  );
}

export default Generate;