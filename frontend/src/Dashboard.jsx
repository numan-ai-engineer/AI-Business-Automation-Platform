import { useState, useEffect } from "react";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  // AI CONTENT
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  // BUSINESS
  const [budget, setBudget] = useState("");
  const [businessResult, setBusinessResult] = useState("");

  // EMAIL WRITER (NEW)
  const [emailPurpose, setEmailPurpose] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [emailResult, setEmailResult] = useState("");

  // HISTORY
  const [history, setHistory] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ----------------------
  // AI GENERATE
  // ----------------------
  const generate = async () => {
    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
    loadHistory();
  };

  // ----------------------
  // BUSINESS IDEA
  // ----------------------
  const generateBusinessIdea = async () => {
    const res = await fetch("http://localhost:5000/api/ai/business-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget }),
    });

    const data = await res.json();
    setBusinessResult(data.result);
    loadHistory();
  };

  // ----------------------
  // EMAIL GENERATOR
  // ----------------------
  const generateEmail = async () => {
    const res = await fetch("http://localhost:5000/api/ai/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purpose: emailPurpose,
        tone: emailTone,
      }),
    });

    const data = await res.json();
    setEmailResult(data.result);
    loadHistory();
  };

  // ----------------------
  // HISTORY
  // ----------------------
  const loadHistory = async () => {
    const res = await fetch("http://localhost:5000/api/ai/history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "240px", backgroundColor: "#111", color: "white", padding: "20px" }}>
        <h2>🚀 SaaS AI</h2>

        <p onClick={() => setPage("dashboard")} style={{ cursor: "pointer" }}>📊 Dashboard</p>
        <p onClick={() => setPage("ai")} style={{ cursor: "pointer" }}>🤖 AI Generator</p>
        <p onClick={() => setPage("business")} style={{ cursor: "pointer" }}>💡 Business Ideas</p>
        <p onClick={() => setPage("email")} style={{ cursor: "pointer" }}>📧 Email Writer</p>
        <p onClick={() => setPage("history")} style={{ cursor: "pointer" }}>📜 History</p>

        <hr />

        <p onClick={logout} style={{ cursor: "pointer", color: "red" }}>🚪 Logout</p>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div>
            <h1>Dashboard</h1>
            <p>AI SaaS Platform 🚀</p>
          </div>
        )}

        {/* AI */}
        {page === "ai" && (
          <div>
            <h1>🤖 AI Generator</h1>

            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <button onClick={generate}>Generate</button>

            <pre>{result}</pre>
          </div>
        )}

        {/* BUSINESS */}
        {page === "business" && (
          <div>
            <h1>💡 Business Ideas</h1>

            <input value={budget} onChange={(e) => setBudget(e.target.value)} />
            <button onClick={generateBusinessIdea}>Generate</button>

            <pre>{businessResult}</pre>
          </div>
        )}

        {/* EMAIL */}
        {page === "email" && (
          <div>
            <h1>📧 Email Writer</h1>

            <input
              placeholder="Purpose"
              value={emailPurpose}
              onChange={(e) => setEmailPurpose(e.target.value)}
            />

            <input
              placeholder="Tone (formal/friendly)"
              value={emailTone}
              onChange={(e) => setEmailTone(e.target.value)}
            />

            <button onClick={generateEmail}>Generate Email</button>

            <pre>{emailResult}</pre>
          </div>
        )}

        {/* HISTORY */}
        {page === "history" && (
          <div>
            <h1>📜 History</h1>

            {history.map((h) => (
              <div key={h.id}>
                <b>{h.type}</b>
                <p>{h.prompt}</p>
                <pre>{h.result}</pre>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;