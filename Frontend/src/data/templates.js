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

  }

  setLoading(false);
};