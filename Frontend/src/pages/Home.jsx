import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = ["coding", "writing", "image", "study"];

  const handleClick = (category) => {
    navigate(`/generate/${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">

      {/* Title */}
      <h1 className="
      text-7xl
      font-extrabold
      text-white
      tracking-widest
      mt-10
      animate-fadeSlide
      drop-shadow-2xl
      ">
        AI Prompt Generator
      </h1>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-10 mt-32">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className="
            bg-black
            text-red-700
            px-12 py-6
            rounded-xl
            shadow-xl
            font-semibold
            text-lg
            transition
            transform
            hover:scale-110
            hover:bg-gray-900
            hover:shadow-red-700/50
            active:scale-95
            "
          >
            {cat.toUpperCase()}
          </button>
        ))}

      </div>

    </div>
  );
}

export default Home;