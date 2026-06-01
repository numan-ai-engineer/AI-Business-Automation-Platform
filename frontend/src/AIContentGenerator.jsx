import { useState } from "react";

function AIContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <h2>🤖 AI Content Generator</h2>

      <input
        type="text"
        placeholder="Enter topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button onClick={generate} style={{ marginLeft: "10px" }}>
        Generate
      </button>

      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}

export default AIContentGenerator;