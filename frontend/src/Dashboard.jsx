import { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const [budget, setBudget] = useState("");
  const [businessResult, setBusinessResult] = useState("");

  const [emailPurpose, setEmailPurpose] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [emailResult, setEmailResult] = useState("");

  const [history, setHistory] = useState([]);

  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  // AI GENERATOR
  const generate = async () => {
    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
    setHistory(await (await fetch("http://localhost:5000/api/ai/history")).json());
  };

  // BUSINESS IDEA
  const generateBusinessIdea = async () => {
    const res = await fetch("http://localhost:5000/api/ai/business-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget }),
    });

    const data = await res.json();
    setBusinessResult(data.result);
    setHistory(await (await fetch("http://localhost:5000/api/ai/history")).json());
  };

  // EMAIL GENERATOR
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
    setHistory(await (await fetch("http://localhost:5000/api/ai/history")).json());
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🚀 AI SaaS</h2>

        <button onClick={() => setPage("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setPage("ai")}>🤖 AI Generator</button>
        <button onClick={() => setPage("business")}>💡 Business Ideas</button>
        <button onClick={() => setPage("email")}>📧 Email Writer</button>
        <button onClick={() => setPage("history")}>📜 History</button>

        <button className="logout" onClick={logout}>🚪 Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div className="card">
            <h1>AI Business Automation Platform 🚀</h1>
            <p>Welcome to your SaaS Dashboard</p>
          </div>
        )}

        {/* AI */}
        {page === "ai" && (
          <div className="card">
            <h1>🤖 AI Generator</h1>

            <input
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={generate}>Generate</button>

            <pre>{result}</pre>
          </div>
        )}

        {/* BUSINESS */}
        {page === "business" && (
          <div className="card">
            <h1>💡 Business Ideas</h1>

            <input
              placeholder="Enter budget..."
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <button onClick={generateBusinessIdea}>Generate</button>

            <pre>{businessResult}</pre>
          </div>
        )}

        {/* EMAIL */}
        {page === "email" && (
          <div className="card">
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
          <div className="card">
            <h1>📜 History</h1>

            {history.map((h) => (
              <div key={h.id} className="history-item">
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