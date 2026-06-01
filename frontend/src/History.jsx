import { useEffect, useState } from "react";

function History() {
  const [data, setData] = useState([]);

  const loadHistory = async () => {
    const res = await fetch("http://localhost:5000/api/ai/history");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 AI History</h2>

      {data.length === 0 ? (
        <p>No history found</p>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h4>Prompt:</h4>
            <p>{item.prompt}</p>

            <h4>Result:</h4>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {item.result}
            </pre>
          </div>
        ))
      )}
    </div>
  );
}

export default History;