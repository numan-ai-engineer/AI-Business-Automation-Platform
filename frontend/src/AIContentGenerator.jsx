function AIContentGenerator() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🤖 AI Content Generator</h2>

      <input
        type="text"
        placeholder="Enter Topic"
        style={{
          padding: "10px",
          width: "300px"
        }}
      />

      <br />
      <br />

      <button>
        Generate Content
      </button>

      <br />
      <br />

      <textarea
        rows="10"
        cols="60"
        placeholder="Generated content will appear here..."
      />
    </div>
  );
}

export default AIContentGenerator;