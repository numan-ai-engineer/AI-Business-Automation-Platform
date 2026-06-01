import { useState, useEffect } from "react";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const [budget, setBudget] = useState("");
  const [businessResult, setBusinessResult] = useState("");

  const [history, setHistory] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // AI CONTENT GENERATOR
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
    loadHistory();
  };

  // AI BUSINESS IDEA GENERATOR
  const generateBusinessIdea = async () => {
    const res = await fetch(
      "http://localhost:5000/api/ai/business-idea",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
        }),
      }
    );

    const data = await res.json();

    setBusinessResult(data.result);
    loadHistory();
  };

  // LOAD HISTORY
  const loadHistory = async () => {
    const res = await fetch("http://localhost:5000/api/ai/history");

    const data = await res.json();

    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          backgroundColor: "#111",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>🚀 AI SaaS</h2>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("ai")}
        >
          🤖 AI Generator
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("business")}
        >
          💡 Business Ideas
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("history")}
        >
          📜 History
        </p>

        <hr />

        <p
          onClick={logout}
          style={{
            cursor: "pointer",
            color: "red",
          }}
        >
          🚪 Logout
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
        }}
      >
        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div>
            <h1>📊 Dashboard</h1>

            <p>Welcome to AI Business Automation Platform 🚀</p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  width: "220px",
                }}
              >
                <h3>🤖 AI Generator</h3>
                <p>Create AI content instantly</p>
              </div>

              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  width: "220px",
                }}
              >
                <h3>💡 Business Ideas</h3>
                <p>Generate startup ideas</p>
              </div>

              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  width: "220px",
                }}
              >
                <h3>📜 History</h3>
                <p>View previous generations</p>
              </div>
            </div>
          </div>
        )}

        {/* AI GENERATOR */}
        {page === "ai" && (
          <div>
            <h1>🤖 AI Content Generator</h1>

            <input
              type="text"
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                padding: "10px",
                width: "350px",
              }}
            />

            <button
              onClick={generate}
              style={{
                marginLeft: "10px",
                padding: "10px",
              }}
            >
              Generate
            </button>

            <pre
              style={{
                marginTop: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {result}
            </pre>
          </div>
        )}

        {/* BUSINESS IDEAS */}
        {page === "business" && (
          <div>
            <h1>💡 AI Business Idea Generator</h1>

            <input
              type="number"
              placeholder="Enter budget in PKR..."
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{
                padding: "10px",
                width: "350px",
              }}
            />

            <button
              onClick={generateBusinessIdea}
              style={{
                marginLeft: "10px",
                padding: "10px",
              }}
            >
              Generate Ideas
            </button>

            <pre
              style={{
                marginTop: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {businessResult}
            </pre>
          </div>
        )}

        {/* HISTORY */}
        {page === "history" && (
          <div>
            <h1>📜 History</h1>

            {history.length === 0 ? (
              <p>No history yet</p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <h4>{item.type?.toUpperCase() || "CONTENT"}</h4>

                  <b>Prompt:</b>
                  <p>{item.prompt}</p>

                  <b>Result:</b>

                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {item.result}
                  </pre>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;